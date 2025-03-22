"use client";

import { useState } from "react";
import { Plus, Globe, MessageSquare, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChatInput({ onSendMessage }) {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message);
        setMessage("");
    };

    return (
        <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-center border rounded-lg bg-background">
                <Button type="button" variant="ghost" size="icon" className="ml-1">
                    <Plus className="h-5 w-5" />
                </Button>

                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Hỏi bất kỳ điều gì"
                    className="flex-1 py-3 px-2 bg-transparent focus:outline-none text-sm"
                />

                <div className="flex items-center mr-1">
                    <Button type="button" variant="ghost" size="icon">
                        <Globe className="h-5 w-5" />
                    </Button>

                    <Button type="button" variant="ghost" size="icon" className="hidden sm:flex">
                        <MessageSquare className="h-5 w-5" />
                    </Button>

                    <Button type="submit" variant="ghost" size="icon" className="bg-black text-white rounded-full hover:bg-gray-800 h-9 w-9" disabled={!message.trim()}>
                        <Mic className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </form>
    );
}
