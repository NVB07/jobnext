import axios from "axios";
import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function POST(request) {
    try {
        // Lấy dữ liệu từ body
        const { url } = await request.json();

        // Validation cơ bản
        if (!url) {
            return NextResponse.json({ error: "URL là bắt buộc" }, { status: 400 });
        }

        // Fetch HTML với compression và timeout
        const response = await axios.get(url, {
            timeout: 10000, // 10 seconds timeout
            headers: {
                "Accept-Encoding": "gzip, deflate, br",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            },
        });

        // Parse HTML using JSDOM (more efficient than DOMParser for server-side)
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Extract only the necessary content
        const sections = document.querySelectorAll(".sc-1671001a-4.gDSEwb");

        if (!sections || sections.length < 2) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Không tìm thấy nội dung chi tiết",
                },
                { status: 404 }
            );
        }

        const [jobDesSection, jobReqSection] = sections;

        // Extract job description
        const jobDesContent = jobDesSection.querySelector(".sc-1671001a-6.dVvinc");
        const jobReqContent = jobReqSection.querySelector(".sc-1671001a-6.dVvinc");

        if (!jobDesContent || !jobReqContent) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Không tìm thấy nội dung chi tiết",
                },
                { status: 404 }
            );
        }

        // Process content on server side
        const processContent = (htmlContent) => {
            return (
                htmlContent
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/p>/gi, "\n")
                    // .replaceAll("", "-")
                    .replace(/<[^>]+>/g, "")
                    .trim()
            );
        };

        const jobDescription = processContent(jobDesContent.innerHTML);
        const jobRequirements = processContent(jobReqContent.innerHTML);

        return NextResponse.json(
            {
                success: true,
                data: {
                    jobDescription,
                    jobRequirements,
                },
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "public, max-age=3600", // Cache for 1 hour
                },
            }
        );
    } catch (error) {
        console.error("Error fetching job details:", error);

        if (error.code === "ECONNABORTED") {
            return NextResponse.json(
                {
                    success: false,
                    error: "Timeout khi tải thông tin chi tiết",
                },
                { status: 408 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: "Lỗi xử lý request",
            },
            { status: 500 }
        );
    }
}
// try {
//     const { url } = req.body;
//     const response = await axios.get(url);
//     res.json({
//         success: true,
//         data: response.data,
//     });
// } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
// }
