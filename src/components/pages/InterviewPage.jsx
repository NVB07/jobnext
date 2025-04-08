"use client";

import { useState, useRef, useEffect, useContext } from "react";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Send, Trash2 } from "lucide-react";

import { POST_METHOD, GET_METHOD } from "@/services/services";
import { auth } from "@/firebase/firebaseConfig";
import { JobContext } from "@/context/JobProvider";
import { useSilentUrlChange } from "@/hooks/useSilentUrlChange";
export default function InterviewPage() {
    const { jobData } = useContext(JobContext);
    const pathname = usePathname();
    const [messages, setMessages] = useState([]);
    const [chatData, setChatData] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);
    const changeUrlSilently = useSilentUrlChange();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            const newHeight = Math.max(
                36,
                Math.min(
                    textareaRef.current.scrollHeight, // Content height
                    150 // Maximum height
                )
            );

            textareaRef.current.style.height = `${newHeight}px`;
        }
    }, [inputValue]);

    useEffect(() => {
        const getInterview = async () => {
            const path = pathname.slice(16);
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                const result = await GET_METHOD(`interviews`, { interviewId: path }, { Authorization: `Bearer ${token}` });
                if (result) {
                    setChatData(result.result);
                    console.log(result.result);

                    const newArr = result.result.chatHistory.slice(1);
                    const resultChat = newArr.map((item, index) => {
                        if (index % 2 !== 0) {
                            return {
                                id: index,
                                role: "user",
                                message: item.parts[0].text,
                                state: true,
                            };
                        } else {
                            const message = item.parts[0].text.replace(/```json|```/g, "").trim();
                            return JSON.parse(message);
                        }
                    });
                    setMessages(resultChat);
                }
            }
        };
        getInterview();
    }, []);

    const createInterview = async (answer = "") => {
        const user = auth.currentUser;
        const token = await user.getIdToken();

        const bodyReq = {
            jobRequirement: chatData.jobRequirement,
            jobId: chatData.jobId,
            skills: chatData.skills,
            jobTitle: chatData.jobTitle,
            answer: answer,
        };
        const result = await POST_METHOD("interviews", bodyReq, { Authorization: `Bearer ${token}` });
        if (result) {
            const messageObj = JSON.parse(result.result.replace(/```json|```/g, "").trim());
            setMessages((prevMessages) => [...prevMessages, messageObj]);
        }
    };

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const currentMessage = inputValue.trim();
            setInputValue("");

            setMessages((prev) => [
                ...prev,
                {
                    id: prev.length + 1,
                    role: "user",
                    message: currentMessage,
                    state: true,
                },
            ]);

            await createInterview(currentMessage);
        }
    };

    const handleKeyDown = (e) => {
        // Submit on Enter without Shift key
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent default to avoid new line
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col w-full max-w-4xl pt-[75px] h-screen">
            {/* Header */}
            <div className="flex justify-between items-center   ">
                <h1 className="text-lg font-bold text-wrap  truncate line-clamp-2">{chatData ? chatData.jobTitle : ""}</h1>
                <Button onClick={() => console.log(pathname)} variant="icon" className="text-red-500 hover:bg-foreground/5">
                    <Trash2 />
                </Button>
            </div>

            <ScrollArea className="flex-1 overflow-y-auto ">
                <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                    {messages.length > 0 &&
                        messages.map((message, index) => (
                            <div key={index} className={`mb-6 flex w-full text-right ${message.role !== "model" ? "justify-end" : "justify-start"}`}>
                                <div
                                    style={{ wordBreak: "break-word" }}
                                    className={`inline-block break-words  text-base ${
                                        message.role !== "model" ? "max-w-[85%]  sm:max-w-[80%] md:max-w-[80%] " : "max-w-full"
                                    } text-left p-3 rounded-lg whitespace-pre-line ${message.role !== "model" ? "bg-muted text-foreground" : "bg-transparent"}`}
                                >
                                    {message.message}
                                </div>
                            </div>
                        ))}

                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>
            {/* Input Area */}
            <div className=" w-full pt-1">
                <div className="flex items-end space-x-2 border rounded-lg p-2">
                    <Textarea
                        disabled={!messages[messages.length - 1]?.state}
                        ref={textareaRef}
                        placeholder="Trả lời phỏng vấn"
                        className="flex-1 text-base  border-none focus-visible:ring-0 shadow-none focus-visible:ring-offset-0  resize-none min-h-[36px] max-h-[150px] py-2 px-3 overflow-y-auto no-scrollbar"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={!inputValue.trim() ? true : false}
                        className={`${inputValue.trim() ? "bg-blue-500 hover:bg-blue-500" : ""}`}
                        onClick={handleSendMessage}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
                <div className="text-center my-1 text-xs text-gray-500">Dữ liệu được cung cấp bởi Gemini-flash-2.0</div>
            </div>
        </div>
    );
}
