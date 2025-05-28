"use client";

import JobCard from "../pageComponents/JobCard2";

export default function HybridJobCardDemo() {
    // Sample job data with hybrid matching information
    const sampleJobs = [
        {
            _id: "demo-1",
            title: "Frontend React Developer",
            company: "TechCorp Vietnam",
            companyLogo: "/company-default-logo.svg",
            location: "Ho Chi Minh City",
            locationVI: "TP.HCM",
            jobLevel: "junior",
            jobLevelVI: "Junior",
            salary: "15-25 triệu VNĐ",
            skills: "React, JavaScript, HTML, CSS",
            semanticScore: 85, // Legacy score for backward compatibility
            expiredOn: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
            isSaved: false,
            jobSource: "admin",
            description: "Phát triển giao diện người dùng với React và các công nghệ hiện đại.",
            jobRequirement: "2+ năm kinh nghiệm React, JavaScript ES6+, HTML5, CSS3, Git",
            contact: "hr@techcorp.vn",

            // Hybrid matching data - newer format
            matchData: {
                method: "hybrid",
                hybridScore: "94.50", // This is the primary score used
                breakdown: {
                    semantic: "89.20",
                    tfidf: "96.80",
                    skillMatch: "97.30",
                },
                detectedSkills: ["frontend", "javascript", "react", "html", "css", "git", "ui", "responsive"],
            },
        },
        {
            _id: "demo-2",
            title: "Full Stack Developer",
            company: "Startup Innovation",
            companyLogo: "/company-default-logo.svg",
            location: "Hanoi",
            locationVI: "Hà Nội",
            jobLevel: "middle",
            jobLevelVI: "Middle",
            salary: "20-35 triệu VNĐ",
            skills: "Node.js, React, MongoDB, Express",
            semanticScore: 78, // This will be displayed since no hybridScore
            expiredOn: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            isSaved: true,
            jobSource: "admin",
            description: "Phát triển ứng dụng web full stack với Node.js và React.",
            jobRequirement: "3+ năm kinh nghiệm Node.js, React, MongoDB, REST API",
            contact: "jobs@startup.vn",

            matchData: {
                method: "transformer",
                // No breakdown for transformer method
                detectedSkills: ["fullstack", "nodejs", "react", "mongodb", "backend", "api", "express"],
            },
        },
        {
            _id: "demo-3",
            title: "Python Backend Developer",
            company: "Data Analytics Co",
            companyLogo: "/company-default-logo.svg",
            location: "Da Nang",
            locationVI: "Đà Nẵng",
            jobLevel: "senior",
            jobLevelVI: "Senior",
            salary: "25-40 triệu VNĐ",
            skills: "Python, Django, PostgreSQL, Docker",
            semanticScore: 65, // This will be displayed since no hybridScore
            expiredOn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            isSaved: false,
            jobSource: "admin",
            description: "Phát triển hệ thống backend với Python và Django.",
            jobRequirement: "4+ năm kinh nghiệm Python, Django, PostgreSQL, Docker",
            contact: "recruit@dataanalytics.vn",

            matchData: {
                method: "tfidf",
                // No breakdown for tfidf method
                detectedSkills: ["python", "backend", "django", "postgresql", "docker", "api", "database"],
            },
        },
        {
            _id: "demo-4",
            title: "Legacy Job (Backward Compatibility)",
            company: "Old System Corp",
            companyLogo: "/company-default-logo.svg",
            location: "Remote",
            locationVI: "Remote",
            jobLevel: "middle",
            jobLevelVI: "Middle",
            salary: "18-28 triệu VNĐ",
            skills: "JavaScript, Vue.js, PHP",
            semanticScore: 72, // Only semantic score, no matchData
            expiredOn: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
            isSaved: false,
            jobSource: "admin",
            description: "Phát triển web application với Vue.js và PHP backend.",
            jobRequirement: "2+ năm kinh nghiệm Vue.js, PHP, MySQL",
            contact: "hr@oldsystem.vn",

            // No matchData - testing backward compatibility
        },
    ];

    // Sample auth user data
    const authUserData = {
        uid: "demo-user",
        userData: {
            review: "Frontend developer với 3 năm kinh nghiệm React, JavaScript",
        },
    };

    return (
        <div className="container mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">🚀 Hybrid Job Matching Demo</h1>
                <p className="text-gray-600 mb-4">Demo các trường hợp matching khác nhau với score display logic mới</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <div className="font-semibold text-purple-800 mb-1">🧠 Hybrid (Job 1)</div>
                        <div className="text-purple-700">
                            Hiển thị: hybridScore (94%)
                            <br />
                            Tooltip: Detailed breakdown
                        </div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <div className="font-semibold text-blue-800 mb-1">🤖 Transformer (Job 2)</div>
                        <div className="text-blue-700">
                            Hiển thị: semanticScore (78%)
                            <br />
                            Tooltip: Simple method info
                        </div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                        <div className="font-semibold text-green-800 mb-1">⚡ TF-IDF (Job 3)</div>
                        <div className="text-green-700">
                            Hiển thị: semanticScore (65%)
                            <br />
                            Tooltip: Simple method info
                        </div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                        <div className="font-semibold text-gray-800 mb-1">📜 Legacy (Job 4)</div>
                        <div className="text-gray-700">
                            Hiển thị: semanticScore (72%)
                            <br />
                            Tooltip: No tooltip (backward compatibility)
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6">
                {sampleJobs.map((job) => (
                    <div key={job._id} className="border rounded-lg p-4 bg-white shadow-sm">
                        <div className="mb-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {job.matchData.method === "hybrid" && "🧠 Hybrid Matching"}
                                {job.matchData.method === "transformer" && "🤖 AI Matching"}
                                {job.matchData.method === "tfidf" && "⚡ Fast Matching"}
                            </h3>
                            <div className="text-sm text-gray-600">
                                Method: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{job.matchData.method}</span>
                                <span className="ml-4">
                                    Display Score:{" "}
                                    <span className="font-semibold text-purple-600">
                                        {job.matchData?.hybridScore ? `${Math.round(parseFloat(job.matchData.hybridScore))}%` : `${job.semanticScore}%`}
                                    </span>
                                </span>
                                {job.matchData.breakdown && (
                                    <div className="mt-2">
                                        <span className="text-gray-500">Breakdown:</span>
                                        <span className="ml-2">
                                            Semantic {job.matchData.breakdown.semantic}% + Keywords {job.matchData.breakdown.tfidf}% + Skills{" "}
                                            {job.matchData.breakdown.skillMatch}%
                                        </span>
                                    </div>
                                )}
                                {!job.matchData.breakdown && (
                                    <div className="mt-1 text-gray-500">
                                        <span className="italic">No detailed breakdown available for {job.matchData.method} method</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <JobCard job={job} authUserData={authUserData} />
                    </div>
                ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Cập nhật Score System</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>
                        ✅ <strong>Smart Score Display</strong>: Ưu tiên hiển thị hybridScore, fallback về semanticScore
                    </li>
                    <li>
                        ✅ <strong>Method-aware tooltips</strong>: Hiển thị breakdown chi tiết cho hybrid, tooltip đơn giản cho các method khác
                    </li>
                    <li>
                        ✅ <strong>Enhanced Score Calculation</strong>: - Hybrid: 55% Semantic + 25% TF-IDF + 20% Skills - Transformer: Semantic matching với AI
                        enhancement - TF-IDF: Fast keyword-based matching
                    </li>
                    <li>
                        ✅ <strong>Method indicators</strong>: Badge hiển thị phương pháp matching (🧠 Hybrid, 🤖 AI, ⚡ Fast)
                    </li>
                    <li>
                        ✅ <strong>AI detected skills</strong>: Hiển thị thêm kỹ năng được AI phát hiện với icon 🔍
                    </li>
                    <li>
                        ✅ <strong>Backward compatibility</strong>: Hỗ trợ cả data format cũ và mới
                    </li>
                    <li>
                        ✅ <strong>Responsive design</strong>: Tối ưu cho cả desktop và mobile
                    </li>
                </ul>

                <div className="mt-4 p-3 bg-white rounded border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-800">💡 Logic hiển thị score:</p>
                    <p className="text-sm text-blue-700 mt-1">
                        JobCard sẽ ưu tiên hiển thị <code className="bg-blue-100 px-1 rounded">job.matchData.hybridScore</code> nếu có, nếu không sẽ fallback về{" "}
                        <code className="bg-blue-100 px-1 rounded">job.semanticScore</code> để đảm bảo backward compatibility.
                    </p>
                </div>
            </div>
        </div>
    );
}
