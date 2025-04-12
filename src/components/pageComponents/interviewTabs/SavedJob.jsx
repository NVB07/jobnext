"use client";

import { useState, useEffect } from "react";
import { GET_METHOD } from "@/services/services";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import JobCard from "../JobCard";
import NoData from "@/components/pages/NoData";

const SavedJob = ({ authUserData }) => {
    const [savedJobs, setSavedJobs] = useState({ data: [], pagination: {} });

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const maxVisiblePages = 5;

    const getPageRange = () => {
        const totalPages = savedJobs.pagination.totalPages;
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
        if (page >= 1 && page <= savedJobs.pagination.totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    useEffect(() => {
        const getSavedJobs = async () => {
            const result = await GET_METHOD(`users/saved-jobs/${authUserData.uid}?page=${currentPage}&perPage=${perPage}`, {}, {});
            if (result?.success) {
                setSavedJobs(result);
            }
        };
        getSavedJobs();
    }, [currentPage]);

    return (
        <div className="w-full">
            <h1 className="text-xl font-bold mb-3">Những công việc đã lưu</h1>
            <div>
                {savedJobs?.data.length > 0 ? (
                    savedJobs.data.map((item) => {
                        const jobSaved = { ...item, isSaved: true };
                        return <JobCard key={item._id} job={jobSaved} authUserData={authUserData} />;
                    })
                ) : (
                    <NoData title="Bạn chưa lưu công việc nào" />
                )}
            </div>
            {savedJobs?.data.length > 0 && (
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
                        {savedJobs.pagination.totalPages > getPageRange()[getPageRange().length - 1] && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={currentPage === savedJobs.pagination.totalPages ? "pointer-events-none opacity-50 " : "cursor-pointer"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default SavedJob;
