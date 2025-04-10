"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { auth } from "@/firebase/firebaseConfig";

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
                {interviews?.data.length > 0
                    ? interviews.data.map((item) => {
                          return <HistoryItem key={item._id} interview={item} setReload={setReload} />;
                      })
                    : null}
            </div>
            {interviews?.data.length > 0 && (
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

const HistoryItem = ({ interview, setReload }) => {
    const score = interview.chatHistory[interview.chatHistory.length - 1].parts[0].text.replace(/```json|```/g, "").trim();
    const scoreObj = JSON.parse(score);
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
        <div className="flex flex-col gap-2 w-full mb-4 p-4  rounded-lg border">
            <div className="flex justify-between items-center mb-2">
                <Link href={`/jobs/interview/${interview._id}`} className="text-lg font-semibold text-wrap truncate line-clamp-1">
                    {interview.jobTitle}
                </Link>
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
            {interview.skills && (
                <p className="text-sm border border-foreground/50 px-2 py-1 rounded-full w-fit text-wrap text-foreground/70 truncate line-clamp-1">{interview.skills}</p>
            )}
            <p className={`text-sm border px-2 py-1 rounded-full w-fit ${scoreObj.pass ? "text-green-500 border-green-500 " : "border-orange-500 text-orange-500"} `}>
                {scoreObj.pass ? "Pass " + scoreObj.pass + "%" : "Chưa hoàn thành"}
            </p>
            <span className="text-gray-500 text-sm">Thời gian tạo: {convertDate(interview.createdAt)}</span>
        </div>
    );
};
