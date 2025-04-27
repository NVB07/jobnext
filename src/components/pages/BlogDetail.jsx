"use client";
import { useContext, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bookmark, Ellipsis, Link2, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import MDView from "../pageComponents/MDView";
import Image from "next/image";
import Login from "../pageComponents/Login";
import { POST_METHOD, GET_METHOD } from "@/services/services";
import { AuthContext } from "@/context/AuthContextProvider";
import withPopstateRerender from "../pageComponents/WithPopstateRerender";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetail = ({ data }) => {
    const [blogData, setBlogData] = useState(data);
    const { authUserData } = useContext(AuthContext);
    const [save, setSave] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleConvertDate = (timestamp) => {
        const date = new Date(timestamp);
        const formatted = date.toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh", // để chuyển sang múi giờ Việt Nam
        });
        return formatted;
    };
    const handleCopyLink = () => {
        const currentUrl = new URL(window.location.href);
        const baseUrl = currentUrl.origin;
        navigator.clipboard
            .writeText(baseUrl + "/blog/" + blogData?.blogData._id)
            .then(() => {
                toast.success("Đã sao chép liên kết bài viết");
                setOpenOption(false);
            })
            .catch((err) => {
                toast.error("Lỗi khi sao chép liên kết");
            });
    };
    useEffect(() => {
        if (authUserData) {
            const checkSaved = blogData?.blogData?.savedBy.includes(authUserData?.uid);
            setSave(checkSaved);
        }
    }, [blogData?.blogData?.savedBy, authUserData]);

    useEffect(() => {
        const fetchData = async () => {
            if (data) {
                const blogData = await GET_METHOD("blogs/" + data.blogData._id);
                if (blogData) {
                    const authorData = await GET_METHOD("users/" + blogData.authorUid);
                    if (authorData?.success) setBlogData({ blogData, authorData: authorData.userRecord });
                }
            }
            setLoading(false);
        };
        fetchData();
    }, [save]);

    const handleSavedJob = async () => {
        try {
            if (save) {
                const result = await POST_METHOD("blogs/unsave-blog", {
                    blogId: blogData?.blogData._id,
                    userId: authUserData.uid,
                });
                if (result?.success) {
                    setSave(false);
                    toast.success("Đã xóa blog khỏi danh sách");
                }
            } else {
                const result = await POST_METHOD("blogs/save-blog", {
                    blogId: blogData?.blogData._id,
                    userId: authUserData.uid,
                });
                if (result?.success) {
                    setSave(true);
                    toast.success("Đã lưu blog ");
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    if (!blogData) {
        return (
            <div className="w-full h-[calc(100vh-360px)] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center pb-24">
                    <p className="p-4  rounded-lg text-3xl mb-2">❌</p>
                    <p className="font-bold text-lg mb-2">Bài viết không tồn tại hoặc đã bị xóa</p>
                    <Link href={"/blog"} className="px-3 py-2 rounded-full bg-green-600 text-white">
                        Xem bài viết khác
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className=" px-5 flex justify-center ">
            {loading ? (
                <div className="w-full max-w-4xl">
                    <div className=" border-none shadow-none text-white">
                        <div>
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-4/5 " />
                                <div className="flex items-center gap-3 ">
                                    <Skeleton className="h-10 w-10 rounded-full " />
                                    <div className="flex flex-col gap-2">
                                        <Skeleton className="h-4 w-24 " />

                                        <Skeleton className="h-3 w-32 " />
                                    </div>

                                    <div className="ml-auto flex items-center gap-2">
                                        <Skeleton className="h-8 w-8 rounded-md " />
                                        <Skeleton className="h-8 w-8 rounded-md " />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 mt-5">
                            <Skeleton className="h-4 w-full " />
                            <Skeleton className="h-4 w-full " />
                            <Skeleton className="h-4 w-11/12 " />
                            <Skeleton className="h-4 w-full " />
                            <Skeleton className="h-4 w-4/5 " />

                            <div className="py-2"></div>

                            <Skeleton className="h-4 w-full " />
                            <Skeleton className="h-4 w-full " />
                            <Skeleton className="h-4 w-3/4 " />

                            {/* Tags skeleton */}
                            <div className="flex gap-2 mt-4">
                                <Skeleton className="h-6 w-28 rounded-full " />
                                <Skeleton className="h-6 w-32 rounded-full " />
                                <Skeleton className="h-6 w-24 rounded-full " />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl">
                    <h1 className="text-2xl border-b border-foreground pb-2 font-bold">{blogData?.blogData.title}</h1>
                    <div className="flex items-center justify-between mt-4 mb-4">
                        <div className="flex ">
                            <Image
                                src={blogData?.authorData.photoURL || "/avatar-default.jpg"}
                                width={50}
                                height={50}
                                alt={blogData?.authorData.displayName}
                                className="w-[50px] h-[50px] rounded-full"
                            />
                            <div className="ml-3">
                                <p className="text-lg font-medium ">{blogData?.authorData.displayName}</p>
                                <p className="text-sm text-foreground/80 font-medium ">{handleConvertDate(blogData?.blogData.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {authUserData ? (
                                <Button onClick={handleSavedJob} size="icon" variant="ghost" className="rounded-full w-8 h-8 mr-1">
                                    {!save ? <Bookmark className="!w-5 !h-5" /> : <BookmarkCheck className="!w-5 !h-5 text-green-500" />}
                                </Button>
                            ) : (
                                <Login>
                                    <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 mr-1">
                                        <Bookmark className="!w-5 !h-5" />
                                    </Button>
                                </Login>
                            )}
                            <Popover modal={true} open={openOption} onOpenChange={() => setOpenOption((prev) => !prev)}>
                                <PopoverTrigger className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent">
                                    <Ellipsis className="!w-5 !h-5" />
                                </PopoverTrigger>
                                <PopoverContent className="w-48 p-1" align="end">
                                    <Button onClick={handleCopyLink} variant="ghost" className="w-full flex justify-start h-8">
                                        <Link2 />
                                        <p className="text-sm">Sao chép liên kết</p>
                                    </Button>
                                    {/* <Button variant="ghost" className="w-full flex justify-start h-8">
                                <Flag />
                                <p className="text-sm">Báo cáo</p>
                            </Button> */}
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {blogData?.blogData.content ? <MDView content={blogData?.blogData.content} /> : null}

                    <p className="text-foreground/70 text-sm border-t border-foreground pt-3 mt-8">{blogData?.blogData?.savedBy.length} người đã lưu</p>
                </div>
            )}
        </div>
    );
};

export default withPopstateRerender(BlogDetail);
