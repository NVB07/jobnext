"use client";
import { useState, useEffect } from "react";

import BlogItem from "@/components/pageComponents/BlogItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { GET_METHOD } from "@/services/services";
import withPopstateRerender from "../pageComponents/WithPopstateRerender";
const BlogPage = () => {
    const [blogData, setBlogData] = useState({ data: [], pagination: {} });
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;
    const maxVisiblePages = 5;

    const getPageRange = () => {
        const totalPages = blogData.pagination.totalPages;
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
            // const result = await GET_METHOD("blogs", currentPage, perPage);
            const result = await GET_METHOD(`blogs?page=${currentPage}&perPage=${perPage}`);
            if (result?.success) {
                setBlogData(result);
            }
        };
        fetchBlogs();
    }, [currentPage]);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= blogData.pagination.totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="w-full min-[490px]:pt-[72px] pt-16 px-5  min-h-screen ">
            <div className="flex min-[820px]:flex-row flex-col mt-2 overflow-visible justify-center gap-4">
                <div className="w-full min-[820px]:max-w-4xl min-[820px]:border-l min-[820px]:pl-4">
                    <h1 className="text-2xl w-full  font-bold">Đọc để khám phá</h1>
                    <div className="w-full mt-1 text-gray-500">Khám phá thông tin hữu ích liên quan tới nghề nghiệp </div>
                    <div className="w-full mt-4">
                        {blogData?.data.length !== 0 ? (
                            blogData?.data.map((blog) => (
                                <BlogItem key={blog._id} blogId={blog._id} tag={blog.tags} content={blog.content} createTime={blog.createdAt} title={blog.title} />
                            ))
                        ) : (
                            <>
                                <div className=" w-full border rounded-xl  mb-4 p-3">
                                    <div className=" h-12">
                                        <div className="flex items-center">
                                            <Skeleton className="w-6 h-6 rounded-full" />
                                            <Skeleton className="w-52 h-5 ml-1 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Skeleton className="h-7 w-full mb-1 rounded-2xl" />
                                        <Skeleton className="h-4 mt-1 w-full rounded-full" />
                                        <Skeleton className="h-4 mt-1 w-1/3 rounded-full" />
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-2">
                                        <div className="w-full flex">
                                            <Skeleton className="h-8 mt-1 w-20 rounded-full" />
                                            <Skeleton className="h-8 mt-1 w-16 ml-2 rounded-full" />
                                        </div>
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                    </div>
                                </div>
                                <div className=" w-full border rounded-xl  mb-4 p-3">
                                    <div className=" h-12">
                                        <div className="flex items-center">
                                            <Skeleton className="w-6 h-6 rounded-full" />
                                            <Skeleton className="w-52 h-5 ml-1 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Skeleton className="h-7 w-full mb-1 rounded-2xl" />
                                        <Skeleton className="h-7 w-1/2 rounded-2xl" />
                                        <Skeleton className="h-4 mt-1 w-full rounded-full" />
                                        <Skeleton className="h-4 mt-1 w-1/3 rounded-full" />
                                    </div>
                                    <div className="w-full flex justify-between items-center mt-2">
                                        <div className="w-full flex">
                                            <Skeleton className="h-8 mt-1 w-20 rounded-full" />
                                            <Skeleton className="h-8 mt-1 w-16 ml-2 rounded-full" />
                                        </div>
                                        <Skeleton className="h-5 w-20 rounded-full" />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    {blogData.pagination.totalPages > 1 && (
                        <div className="w-full">
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
                                    {blogData.pagination.totalPages > getPageRange()[getPageRange().length - 1] && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={currentPage === blogData.pagination.totalPages ? "pointer-events-none opacity-50 " : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                            <p className="w-full mt-3 text-center text-gray-500 text-sm">
                                {"("}
                                {currentPage}/{blogData?.pagination.totalPages}
                                {")"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default withPopstateRerender(BlogPage);
