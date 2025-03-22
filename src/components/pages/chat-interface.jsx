"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Edit, Menu, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatSidebar from "@/components/pageComponents/chat-sidebar";
import ChatInput from "@/components/pageComponents/chat-input";

export default function ChatInterface() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);
    // Sample messages for the current chat
    const [messages, setMessages] = useState([]);
    // Function to scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Auto-scroll when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSendMessage = (message) => {
        if (message.trim()) {
            setMessages([
                ...messages,
                {
                    id: messages.length + 1,
                    role: "user",
                    content: message,
                },
            ]);

            // Simulate assistant response
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        role: "assistant",
                        content: "Đây là phản hồi mẫu từ trợ lý AI.",
                    },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="flex pt-[80px] px-5 h-full bg-background">
            {/* Sidebar - always visible on desktop, overlay on mobile */}
            <div
                className={`${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-all duration-300 fixed inset-0 z-30 w-full h-full  md:translate-x-0 md:w-72 md:relative md:z-0 md:border-r md:border-border`}
            >
                <ChatSidebar onToggleSidebar={toggleSidebar} />
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
                {/* Header - different for mobile and desktop */}
                <header className="h-14 border-b border-border flex items-center px-4 justify-between">
                    {/* Mobile header */}
                    <div className="md:hidden flex w-full items-center justify-between">
                        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                            <Menu className="h-5 w-5" />
                        </Button>

                        <Button variant="ghost" size="icon">
                            <RefreshCw className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Desktop header */}
                    <div className="hidden md:flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">tên đoạn chat</div>

                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                Xóa đoạn chat
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Chat Messages */}
                <ScrollArea className="flex-1 overflow-y-auto ">
                    <div className=" mx-5">
                        {messages.map((message) => (
                            <div key={message.id} className={`mb-6 ${message.role === "user" ? "text-right" : "text-left"}`}>
                                <div
                                    className={`inline-block text-sm max-w-[85%] sm:max-w-[80%] md:max-w-[70%] p-3 rounded-lg ${
                                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <div className="flex items-center justify-center ">
                                <div className="text-center px-4">
                                    <h2 className="text-2xl font-bold opacity-60 mb-6 mt-10">Tôi có thể giúp gì cho bạn?</h2>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="border-t  p-4">
                    <div className=" mx-auto">
                        <ChatInput onSendMessage={handleSendMessage} />
                        <div className="text-xs text-center text-gray-500 mt-2">Dữ liệu được cung cấp bởi Gemini-flash-2.0</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
