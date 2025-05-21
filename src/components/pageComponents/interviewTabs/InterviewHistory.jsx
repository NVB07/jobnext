"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { auth } from "@/firebase/firebaseConfig";
import NoData from "@/components/pages/NoData";
import { GET_METHOD, DELETE_METHOD } from "@/services/services";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { BookmarkIcon, BuildingIcon, MapPinIcon, ExternalLinkIcon, BadgeCheck, FolderRoot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const InterviewHistory = ({ authUserData }) => {
    const [interviews, setInterviews] = useState({ data: [], pagination: {} });
    const [currentPage, setCurrentPage] = useState(1);
    const [reload, setReload] = useState(false);

    // const [reload, s] = useState(1);
    const perPage = 10;
    const maxVisiblePages = 5;

    const getPageRange = () => {
        const totalPages = interviews.pagination.totalPages;
        const halfRange = Math.floor(maxVisiblePages / 2); // 2 trang trước, 2 trang sau
        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        // Điều chỉnh nếu ở đầu hoặc cuối
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };
    const handlePageChange = (page) => {
        if (page >= 1 && page <= interviews.pagination.totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    useEffect(() => {
        const getInterviews = async () => {
            const user = auth.currentUser;
            const token = await user.getIdToken();
            const result = await GET_METHOD(
                `interviews/getInterviewByUid?uid=${authUserData.uid}&page=${currentPage}&perPage=${perPage}`,
                {},
                { Authorization: `Bearer ${token}` }
            );
            if (result?.success) {
                setInterviews(result);
            }
        };
        getInterviews();
    }, [currentPage, reload]);

    return (
        <div className="w-full">
            <h1 className="text-xl font-bold mb-3">Những công việc đã phỏng vấn</h1>
            <div>
                {interviews?.data.length > 0 ? (
                    interviews.data.map((item) => {
                        return <HistoryItem key={item._id} interview={item} setReload={setReload} />;
                    })
                ) : (
                    <NoData title="Bạn chưa phỏng vấn công việc nào" subTitle="Lịch sử phỏng vấn sẽ được hiển thị ở đây" />
                )}
            </div>
            {interviews?.pagination.totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={currentPage === 1 ? "pointer-events-none opacity-50 " : "cursor-pointer"}
                            />
                        </PaginationItem>
                        {getPageRange().map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage} className="cursor-pointer">
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {interviews.pagination.totalPages > getPageRange()[getPageRange().length - 1] && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === interviews.pagination.totalPages ? "pointer-events-none opacity-50 " : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default InterviewHistory;

function HistoryItem({ interview, setReload }) {
    let scoreObj = {};
    try {
        const raw = interview.chatHistory[interview.chatHistory.length - 1].parts[0].text.replace(/```json|```/g, "").trim();
        scoreObj = JSON.parse(raw);
    } catch (error) {
        const raw = interview.chatHistory[interview.chatHistory.length - 1].parts[0].text;

        // Lấy chuỗi JSON gốc (dù có thể lỗi format)
        const messageMatch = raw.match(/"message"\s*:\s*"([^"]+)"/);
        const passMatch = raw.match(/"pass"\s*:\s*(\d+|null)/);
        const stateMatch = raw.match(/"state"\s*:\s*(true|false)/);

        scoreObj = {
            message: messageMatch ? messageMatch[1] : "",
            pass: passMatch ? (passMatch[1] === "null" ? null : parseInt(passMatch[1])) : null,
            state: stateMatch ? stateMatch[1] === "true" : null,
        };
    }
    const convertDate = (dateString) => {
        const date = new Date(dateString);

        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();

        const formatted = `${hours}:${minutes} - ${day}/${month}/${year}`;
        return formatted;
    };
    const deleteInterview = async () => {
        const user = auth.currentUser;
        const token = await user.getIdToken();
        const result = await DELETE_METHOD(`interviews/deleteInterview/${interview._id}`, token);
        if (result?.success) {
            setReload((prev) => !prev);
            toast.success("Xóa thành công");
        } else {
            toast.error("Lỗi khi xóa");
            console.log("Delete failed");
        }
    };

    return (
        <div className="w-full rounded-2xl border  hover:shadow-lg transition-all duration-300 overflow-hidden my-3">
            <div className="relative">
                <div className="p-6">
                    <div className="flex flex-row items-start">
                        <div className="flex-grow">
                            <div className="flex items-start gap-4">
                                <div>
                                    <h3 className="text-xl font-bold  md:line-clamp-2">{interview.jobTitle}</h3>
                                    <div className="flex items-center mt-2 text-sm ">
                                        <FolderRoot className={"w-4 h-4 mr-1 shrink-0 text-blue-500"} />
                                        <span className={"text-foreground/60 text-xs"}>
                                            {interview.jobSource === "admin" || interview.jobSource === "vietnamworks" ? " có sẵn trên hệ thống" : "tự tạo"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {interview.skills && (
                                <div className="mt-5">
                                    <div className="font-medium text-sm  mb-2">Kỹ năng yêu cầu:</div>
                                    <div className="flex flex-wrap gap-2">
                                        {interview.skills.split(",").map((skill, index) => {
                                            const gradientClass = ["from-purple-500 to-indigo-500", "from-pink-500 to-purple-500", "from-orange-500 to-pink-500"][
                                                index % 3
                                            ];

                                            return (
                                                <Badge key={index} className={`bg-gradient-to-r ${gradientClass} text-white border-0 shadow-sm`}>
                                                    {skill}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            <div className="mt-5">
                                <div className="font-medium text-sm">Trạng thái:</div>
                                <div className="mt-1">
                                    {!scoreObj.state && scoreObj.pass === null && (
                                        <div className="font-medium text-sm flex items-center text-red-500">Phỏng vấn bị hủy</div>
                                    )}

                                    {!scoreObj.state && scoreObj.pass !== null && <div className="font-medium text-sm flex items-center text-green-500">Hoàn thành</div>}

                                    {scoreObj.state && scoreObj.pass === null && (
                                        <div className="font-medium text-sm flex items-center text-orange-500">Chưa hoàn thành phỏng vấn</div>
                                    )}
                                </div>
                            </div>
                            {scoreObj.pass && (
                                <div className="w-full lg:w-2/3 mt-4">
                                    <div className="font-medium text-sm flex items-center mb-1">Tỉ lệ đạt:</div>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-base font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-600 bg-clip-text text-transparent">
                                            {scoreObj.pass}%
                                        </span>
                                        <Progress className="h-3" value={scoreObj.pass} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className=" mt-0 ml-6 flex flex-col items-center justify-start">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="icon" className="text-red-500 rounded-full w-9 h9 hover:bg-foreground/5">
                                        <Trash2 />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bạn có chắc muốn xóa cuộc phỏng vấn?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-foreground/80 text-base">{interview.jobTitle}</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction onClick={deleteInterview} className="bg-red-500 hover:bg-red-400 text-white">
                                            Xóa
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <div className="font-medium text-sm flex items-end text-foreground/70 ">Thời gian tạo: {convertDate(interview.createdAt)}</div>

                        <Link
                            href={`/jobs/interview/${interview._id}`}
                            className="rounded-full flex items-center px-3 py-2 text-sm bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white border-0 shadow-md"
                        >
                            <span className="mr-2">Xem phỏng vấn</span>
                            <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
