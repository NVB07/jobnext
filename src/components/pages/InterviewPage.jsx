"use client";

import { useState, useRef, useEffect, useContext, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Send, Ellipsis, RefreshCcw, Info, ExternalLink, Eye } from "lucide-react";
import { BookmarkIcon, BuildingIcon, MapPinIcon, ExternalLinkIcon, Loader2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { POST_METHOD, GET_METHOD, DELETE_METHOD, PUT_METHOD } from "@/services/services";
import { auth } from "@/firebase/firebaseConfig";
import { AuthContext } from "@/context/AuthContextProvider";
import { toast } from "sonner";
import { useRouter } from "next13-progressbar";

export default function InterviewPage() {
    const { authUserData } = useContext(AuthContext);
    const pathname = usePathname();
    const router = useRouter();
    const [messages, setMessages] = useState([]);
    const [chatData, setChatData] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [restartLoading, setRestartLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [JobRequirements, setJobRequirements] = useState(null);
    const [dialogImgError, setDialogImgError] = useState(false);

    const getDetail = async () => {
        const response = await fetch("/api/jobdetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: chatData?.job?.url,
            }),
        });
        const result = await response.json();
        if (result.success) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(result.data, "text/html"); // Chuyển thành DOM
            const title = doc.querySelectorAll(".sc-1671001a-4.gDSEwb");
            const [jobDes, jobReq] = title;
            const jobDesContent = jobDes.querySelector(".sc-1671001a-6.dVvinc");
            const jobReqContent = jobReq.querySelector(".sc-1671001a-6.dVvinc");

            setJobDescription(
                jobDesContent.innerHTML
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/p>/gi, "\n")
                    .replaceAll("", "-")
                    .replace(/<[^>]+>/g, "")
                    .trim()
            );
            setJobRequirements(
                jobReqContent.innerHTML
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/p>/gi, "\n")
                    .replaceAll("", "-")
                    .replace(/<[^>]+>/g, "")
                    .trim()
            );
        }
    };

    const handleOpen = async (val) => {
        setShowDetail(val);
        if (val) {
            setLoading(true);
            await getDetail();
            setLoading(false);
        } else {
            setJobDescription(null);
            setJobRequirements(null);
        }
    };

    const handleDialogImageError = useCallback(() => {
        setDialogImgError(true);
    }, []);

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
                            let message = {};
                            try {
                                const raw = item.parts[0].text.replace(/```json|```/g, "").trim();

                                message = JSON.parse(raw);
                            } catch (error) {
                                const raw = item.parts[0].text;
                                const messageMatch = raw.match(/"message"\s*:\s*"([^"]+)"/);
                                const passMatch = raw.match(/"pass"\s*:\s*(\d+|null)/);
                                const stateMatch = raw.match(/"state"\s*:\s*(true|false)/);

                                message = {
                                    message: messageMatch ? messageMatch[1] : "",
                                    role: "model",
                                    pass: passMatch ? (passMatch[1] === "null" ? null : parseInt(passMatch[1])) : null,
                                    state: stateMatch ? stateMatch[1] === "true" : null,
                                };
                            }

                            return message;
                        }
                    });
                    setMessages(resultChat);
                }
            }
        };
        getInterview();
    }, [authUserData]);

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
            let messageObj = {};

            try {
                const raw = result.result.replace(/```json|```/g, "").trim();
                messageObj = JSON.parse(raw);
            } catch (error) {
                const raw = result.result;
                const messageMatch = raw.match(/"message"\s*:\s*"([^"]+)"/);
                const passMatch = raw.match(/"pass"\s*:\s*(\d+|null)/);
                const stateMatch = raw.match(/"state"\s*:\s*(true|false)/);

                messageObj = {
                    message: messageMatch ? messageMatch[1] : "",
                    role: "model",
                    pass: passMatch ? (passMatch[1] === "null" ? null : parseInt(passMatch[1])) : null,
                    state: stateMatch ? stateMatch[1] === "true" : null,
                };
            }

            setMessages((prevMessages) => [...prevMessages, messageObj]);
        } else {
            toast.error("Có lỗi xảy ra! Vui lòng thử lại sau");
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

    const handleRestartInterview = async () => {
        if (!authUserData?.uid || !chatData) {
            toast.error("Không có thông tin để khởi động lại phỏng vấn");
            return;
        }

        setRestartLoading(true);
        try {
            const user = auth.currentUser;
            if (!user) {
                toast.error("Phiên đăng nhập đã hết hạn");
                return;
            }

            const token = await user.getIdToken();
            const currentInterviewId = pathname.slice(16);

            // Gọi API restart interview - chỉ reset chatHistory, giữ nguyên ID
            const restartResult = await PUT_METHOD(
                `interviews/restart/${currentInterviewId}`,
                {}, // Không cần body data vì server lấy thông tin từ interview hiện tại
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            );

            if (restartResult && restartResult.success) {
                // Reload trang để cập nhật chatData mới
                window.location.reload();
                toast.success("Đã khởi động lại phỏng vấn thành công!");
            } else {
                console.error("Restart result:", restartResult);
                toast.error("Có lỗi xảy ra khi khởi động lại phỏng vấn");
            }
        } catch (error) {
            console.error("Error restarting interview:", error);
            toast.error("Có lỗi xảy ra khi khởi động lại phỏng vấn");
        } finally {
            setRestartLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-4xl pt-[75px]  h-screen">
            {/* Header */}
            <div className="flex justify-between items-center    ">
                <h1 className="text-lg font-bold text-wrap  truncate line-clamp-2 px-2">{chatData ? chatData.jobTitle : ""}</h1>

                <Popover>
                    <PopoverTrigger>
                        <div className="w-8 h-8 rounded-lg border border-foreground/10 hover:bg-foreground/5 transition-colors flex items-center justify-center">
                            <Ellipsis className="w-5 h-5 text-foreground/70" />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-56 p-3">
                        <div className="flex flex-col gap-1">
                            {/* Thông tin phỏng vấn */}
                            <div className="pb-2 border-b border-foreground/10">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="w-full justify-start h-9 px-2 hover:bg-foreground/5 transition-colors">
                                            <Eye className="w-4 h-4 mr-2 text-blue-600" />
                                            <span className="text-sm font-medium">Xem thông tin</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[95%] md:max-w-[80%] max-h-[90%] p-0 flex flex-col gap-0">
                                        <DialogHeader className={"px-3 pt-4"}>
                                            <DialogTitle className="text-left">Phỏng vấn: {chatData?.jobTitle}</DialogTitle>
                                            <DialogDescription className="hidden"></DialogDescription>
                                        </DialogHeader>
                                        <ScrollArea className="h-screen overflow-auto px-4 py-3">
                                            <div className="w-full h-fit">
                                                <div className="w-full">
                                                    <p className="font-semibold block text-base text-foreground">Thông tin công việc:</p>
                                                    <p className="text-sm text-foreground/80 whitespace-pre-line">{chatData?.jobRequirement}</p>
                                                    {chatData?.skills && (
                                                        <div className="w-full mt-2 text-sm text-foreground/80 text-left">
                                                            <span className="text-foreground/90 font-semibold">Yêu cầu kỹ năng:</span> {chatData?.skills}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="w-full mt-3 border-t pt-2 text-left">
                                                    <p className="font-semibold block text-base text-foreground">Thông tin của bạn:</p>
                                                    <p className="text-foreground/80 text-sm">{chatData?.candidateDescription}</p>
                                                </div>
                                            </div>
                                        </ScrollArea>
                                    </DialogContent>
                                </Dialog>

                                {chatData?.job?._id && (
                                    <Button variant="ghost" size="sm" className="w-full justify-start h-9 px-2 hover:bg-foreground/5 transition-colors mt-1">
                                        <Link href={`/jobs/${chatData?.job?._id}`} className="w-full h-full flex items-center">
                                            <ExternalLink className="w-4 h-4 mr-2 text-green-600" />
                                            <span className="text-sm font-medium">Xem tin tuyển dụng</span>
                                        </Link>
                                    </Button>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="pt-2">
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full justify-start h-9 px-2 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                                            disabled={restartLoading}
                                        >
                                            {restartLoading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin mr-2 text-red-600" />
                                                    <span className="text-sm font-medium">Đang tạo lại...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <RefreshCcw className="h-4 w-4 mr-2 text-red-600" />
                                                    <span className="text-sm font-medium">Phỏng vấn lại</span>
                                                </>
                                            )}
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Xác nhận phỏng vấn lại</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Bạn có chắc muốn bắt đầu lại cuộc phỏng vấn này?
                                                <br />
                                                <strong>Lịch sử phỏng vấn hiện tại sẽ bị xóa hoàn toàn.</strong>
                                                <br />
                                                Hành động này không thể hoàn tác.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleRestartInterview} className="bg-red-600 hover:bg-red-700" disabled={restartLoading}>
                                                {restartLoading ? "Đang xử lý..." : "Xác nhận"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            <ScrollArea className="flex-1 overflow-y-auto ">
                <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                    {messages.length > 0 &&
                        messages.map((message, index) => (
                            <div key={index} className={`mb-6 flex w-full text-right ${message.role !== "model" ? "justify-end" : "justify-start"}`}>
                                <div
                                    style={{ wordBreak: "break-word" }}
                                    className={`inline-block break-words  text-base ${
                                        message.role !== "model" ? "max-w-[85%]  sm:max-w-[80%] md:max-w-[80%] " : "max-w-[80%]"
                                    } text-left p-2 rounded-lg whitespace-pre-line ${message.role !== "model" ? "bg-primary text-background" : "bg-foreground/10 "}`}
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
