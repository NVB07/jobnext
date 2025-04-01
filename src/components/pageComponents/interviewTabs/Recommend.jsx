"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { Bookmark, BookmarkCheck, Ellipsis, Link2, Flag, Trash2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createData } from "@/services/services";

const Recommend = ({ authUserData }) => {
    console.log("view recommend", authUserData);

    const [matchingJobs, setmatchingJobs] = useState({ data: [], pagination: {} });
    const [currentPage, setCurrentPage] = useState(1);
    const topRef = useRef(null);
    const perPage = 20;
    const maxVisiblePages = 5;

    const getPageRange = () => {
        const totalPages = matchingJobs.pagination.totalPages;
        const halfRange = Math.floor(maxVisiblePages / 2); // 2 trang trước, 2 trang sau
        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        // Điều chỉnh nếu ở đầu hoặc cuối
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            // const result = await getData("blogs", currentPage, perPage);
            const result = await createData(`jobs/search?page=${currentPage}&perPage=${perPage}`, {
                // skill: authUserData?.userData.textData.cvLabel.Skills,
                review: authUserData?.userData.textData.review,
                // location: authUserData?.userData.textData.cvLabel.Address,
            });
            if (result?.success) {
                console.log(result.data);

                setmatchingJobs(result);
            }
        };
        fetchBlogs();
    }, [currentPage]);
    const handlePageChange = (page) => {
        if (page >= 1 && page <= matchingJobs.pagination.totalPages) {
            setCurrentPage(page);
            topRef.current?.scrollIntoView();
        }
    };

    return (
        <div className="w-full ">
            <div ref={topRef} className="absolute top-0" />
            <h1 className="text-xl font-bold mb-3">Công việc phù hợp với kĩ năng của bạn</h1>
            {/* <button onClick={handelGetdata}>getdata</button> */}
            <div className="flex items-center mb-4">
                <div className="text-xl font-bold mr-2">Nền tảng</div>
                <Select defaultValue="apple">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Apple" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Chọn nền tảng</SelectLabel>
                            <SelectItem value="apple">vietnamworks</SelectItem>
                            {/* <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem> */}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                {matchingJobs.data.map((job) => (
                    <JobCard key={job.jobId} job={job} />
                ))}
            </div>
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
                    {matchingJobs.pagination.totalPages > getPageRange()[getPageRange().length - 1] && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={currentPage === matchingJobs.pagination.totalPages ? "pointer-events-none opacity-50 " : "cursor-pointer"}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <p className="w-full mt-3 text-center text-gray-500 text-sm">
                {"("}
                {currentPage}/{matchingJobs?.pagination.totalPages}
                {")"}
            </p>
        </div>
    );
};

export default Recommend;

function JobCard({ job }) {
    return (
        <div className="w-full border rounded-xl  mb-4 p-3">
            <div className="flex ">
                <Image
                    className="w-16  h-16 md:w-[148px] md:h-[148px] rounded-md object-contain mr-4 bg-white p-1"
                    width={150}
                    height={150}
                    src={job.companyLogo}
                    alt={job.company}
                />
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <div className="flex-1 pr-3">
                            <a href={job.url} target="_blank" className="text-base font-bold text-wrap  truncate line-clamp-2">
                                {job.title}
                            </a>
                            <p className="text-sm text-foreground/80 text-wrap  truncate line-clamp-2">{job.company}</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 w-8 rounded-full border-none flex items-center justify-center">
                            <Bookmark className="!w-5 !h-5" />
                            {/* <BookmarkCheck className="!w-5 !h-5" /> */}
                        </Button>
                    </div>
                    <div className="flex flex-col w-full mt-2">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2">
                            <p className="text-sm border border-foreground/30 min-w-fit w-fit px-2 py-1 rounded-full mb-1 md:mb-0 text-foreground/70">{job.location}</p>
                            <p className="text-sm hidden md:block  text-gray-500">•</p>
                            <p className="text-sm border px-2 py-1 rounded-full border-foreground/30 w-fit  text-wrap text-foreground/70 truncate line-clamp-1">
                                {job.skills}
                            </p>
                        </div>
                        <div className="flex ">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2">
                                <p className="text-sm border dark:border-green-500 dark:text-green-500 border-green-600 text-green-700 w-fit px-2 py-1 rounded-full mb-1 md:mb-0 ">
                                    {job.salary}
                                </p>
                                <p className="text-sm hidden md:block  text-gray-500">•</p>
                                <p className="text-sm border px-2 py-1 rounded-full w-fit border-orange-500 text-orange-500">
                                    Phù hợp với CV của bạn:{job.semanticScore}%
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-foreground/70">Hết hạn vào {new Date(job.expiredOn).toLocaleDateString("vi-VN")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
