"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

import NoData from "@/components/pages/NoData";
import BlogItem from "@/components/pageComponents/BlogItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { POST_METHOD } from "@/services/services";
import withPopstateRerender from "@/components/pageComponents/WithPopstateRerender";
const SavedBlogTab = ({ authUserData, otherUid = null }) => {
    const [blogData, setBlogData] = useState({ data: [], pagination: {} });
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsChange, setBlogChange] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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

    // Thêm hàm để cập nhật trạng thái lưu của blog cục bộ
    const handleBlogSaveToggle = (blogId, isSaved) => {
        setBlogData((prevData) => ({
            ...prevData,
            data: prevData.data.map((blog) =>
                blog._id === blogId
                    ? {
                          ...blog,
                          savedBy: isSaved ? [...blog.savedBy, authUserData?.uid] : blog.savedBy.filter((uid) => uid !== authUserData?.uid),
                      }
                    : blog
            ),
        }));
    };

    const handleDeleteBlog = (blogId) => {
        setBlogData((prevData) => ({
            ...prevData,
            data: prevData.data.filter((blog) => blog._id !== blogId),
        }));
    };

    useEffect(() => {
        if (authUserData && otherUid === null) {
            setIsLoading(true);
            const fetchBlogs = async () => {
                const result = await POST_METHOD(`blogs/my-blogs?page=${currentPage}&perPage=${perPage}`, { uid: authUserData.uid });
                if (result?.success) {
                    setBlogData(result);
                }
                setIsLoading(false);
            };
            fetchBlogs();
        }
        if (authUserData && otherUid !== null) {
            setIsLoading(true);
            const fetchBlogs = async () => {
                const result = await POST_METHOD(`blogs/my-blogs?page=${currentPage}&perPage=${perPage}`, { uid: otherUid });
                if (result?.success) {
                    setBlogData(result);
                }
                setIsLoading(false);
            };
            fetchBlogs();
        }
    }, [currentPage, authUserData, otherUid]);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= blogData.pagination.totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return (
        <div className="w-full min-h-screen">
            <div className="flex min-[820px]:flex-row flex-col overflow-visible gap-4">
                <div className="w-full">
                    <div className="w-full mt-4">
                        {isLoading ? (
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
                        ) : blogData?.data.length !== 0 ? (
                            blogData?.data.map((blog) => (
                                <BlogItem
                                    key={blog._id}
                                    blogId={blog._id}
                                    tag={blog.tags}
                                    save={authUserData ? blog.savedBy.includes(authUserData?.uid) : false}
                                    authorUid={otherUid ? otherUid : authUserData?.uid}
                                    content={blog.content}
                                    createTime={blog.createdAt}
                                    title={blog.title}
                                    myBlog={true}
                                    setBlogChange={setBlogChange}
                                    onSaveToggle={handleBlogSaveToggle}
                                    authUserData={authUserData}
                                    inUserPage={otherUid ? false : true}
                                    onDeleteBlog={handleDeleteBlog}
                                />
                            ))
                        ) : (
                            <NoData title={`${otherUid ? "Người dùng này" : "Bạn"} chưa có bài viết nào`} subTitle="Đi đến trang bài viết để tạo bài viết" />
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

export default withPopstateRerender(SavedBlogTab);
