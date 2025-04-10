"use client";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { POST_METHOD } from "@/services/services";
import JobCard from "../JobCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const perPage = 20;
const maxVisiblePages = 5;

const fetchJobs = async ({ queryKey }) => {
    const [, page, authUserData] = queryKey;
    const result = await POST_METHOD(`jobs/search?page=${page}&perPage=${perPage}`, {
        skill: authUserData?.userData.textData.cvLabel.Skills,
        groupJobFunctionV3Name: authUserData?.userData.textData.cvLabel.Industry,
        jobLevel: authUserData?.userData.textData.cvLabel.Rank,
        location: authUserData?.userData.textData.cvLabel.Address,
        review: authUserData?.userData.textData.review,
    });

    if (!result?.success) throw new Error("Lỗi khi tải dữ liệu");
    return result;
};

const Recommend = ({ authUserData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const topRef = useRef(null);

    const {
        data: matchingJobs,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["matchingJobs", currentPage, authUserData],
        queryFn: fetchJobs,
        keepPreviousData: true, // Giữ dữ liệu trang trước trong khi tải trang mới
        staleTime: 1000 * 60 * 15, // Cache dữ liệu trong 15 phút
    });

    const getPageRange = () => {
        const totalPages = matchingJobs?.pagination.totalPages || 1;
        const halfRange = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= (matchingJobs?.pagination.totalPages || 1)) {
            setCurrentPage(page);
            topRef.current?.scrollIntoView();
        }
    };

    return (
        <div className="w-full">
            <div ref={topRef} className="absolute top-0" />
            <h1 className="text-xl font-bold mb-3">Công việc phù hợp với kĩ năng của bạn</h1>

            {isLoading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">Lỗi tải dữ liệu</p>}

            {matchingJobs?.data?.length > 0
                ? matchingJobs.data.map((job) => <JobCard key={job.jobId} job={job} authUserData={authUserData} />)
                : !isLoading && <p>Không có job</p>}

            {matchingJobs?.data?.length > 0 && (
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            {getPageRange().map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage} className="cursor-pointer">
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={currentPage === (matchingJobs?.pagination.totalPages || 1) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <p className="w-full mt-3 text-center text-gray-500 text-sm">
                        {"("}
                        {currentPage}/{matchingJobs?.pagination.totalPages || 1}
                        {")"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Recommend;
