import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        // Lấy dữ liệu từ body
        const { url } = await request.json();

        // Validation cơ bản
        if (!url) {
            return NextResponse.json({ error: "URL là bắt buộc" }, { status: 400 });
        }
        const response = await axios.get(url);
        return NextResponse.json(
            {
                success: true,
                data: response.data,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ success: false, error: "Lỗi xử lý request" }, { status: 500 });
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
