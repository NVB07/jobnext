"use client";

import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatSidebar({ onToggleSidebar }) {
    // Sample chat history data with icons
    const featuredChats = [
        { id: "chatgpt", title: "ChatGPT", icon: "🤖" },
        { id: "canva", title: "Canva", icon: "🎨" },
        { id: "copilot", title: "Code Copilot", icon: "🤖" },
        { id: "kham-pha", title: "Khám phá GPT", icon: "🔍" },
    ];

    const chatGroups = [
        {
            title: "Hôm nay",
            chats: [
                { id: 1, title: "CV cho nhân viên kinh doanh" },
                { id: 2, title: "Cài đặt spaCy lỗi" },
            ],
        },
        {
            title: "Hôm qua",
            chats: [
                { id: 3, title: "Gemini và NLP" },
                { id: 4, title: "Cài word2vec lỗi make" },
                { id: 5, title: "So khớp CV ID" },
                { id: 6, title: "Blog Chatbot Phỏng Vấn" },
            ],
        },
        {
            title: "7 ngày trước đó",
            chats: [
                { id: 7, title: "Xử lý dữ liệu AI" },
                { id: 8, title: "Cấu hình Cloudinary dự án" },
                { id: 9, title: "JSX Gradient Text Component" },
                { id: 10, title: "Chuyển TypeScript sang JSX" },
                { id: 11, title: "Tắt eslint rule" },
                { id: 12, title: "Countdown gửi lại liên kết" },
                { id: 13, title: "Middleware bảo vệ trang" },
            ],
        },
    ];

    return (
        <div className="pt-16 flex flex-col h-full bg-background">
            {/* Mobile header with close button - only visible on mobile */}
            <div className="md:hidden flex items-center justify-between p-4 border-b ">
                <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="ml-auto">
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* New Chat Button */}
            <div className="p-3">
                <Button variant="outline" className="w-full justify-start text-left text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Cuộc trò chuyện mới</span>
                </Button>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto mt-2">
                {/* Chat History */}
                <div>
                    {chatGroups.map((group, index) => (
                        <div key={index} className="mb-4">
                            <h3 className="px-3 py-1 text-xs font-medium text-gray-500">{group.title}</h3>
                            <ul>
                                {group.chats.map((chat) => (
                                    <li key={chat.id}>
                                        <Button variant="ghost" className="w-full justify-start text-left px-3 py-2 text-sm hover:opacity-80 rounded-none truncate">
                                            {chat.title}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
