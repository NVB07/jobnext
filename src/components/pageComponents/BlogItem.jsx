"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import { Bookmark, Ellipsis, Link2, Flag, Trash2, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./Login";

import { GET_METHOD, DELETE_METHOD, POST_METHOD } from "@/services/services";

const BlogItem = ({
    authorUid,
    blogId,
    myBlog = false,
    save,
    title,
    tag,
    content,
    createTime,
    setBlogChange,
    onSaveToggle,
    authUserData,
    inUserPage = false,
    onDeleteBlog,
}) => {
    const [authorData, setAuthorData] = useState();
    const [openOption, setOpenOption] = useState(false);
    const [isSaved, setIsSaved] = useState(save);

    useEffect(() => {
        setIsSaved(save);
    }, [save]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const handleCopyLink = () => {
        const currentUrl = new URL(window.location.href);
        const baseUrl = currentUrl.origin;
        navigator.clipboard
            .writeText(baseUrl + "/blog/" + blogId)
            .then(() => {
                toast.success("Đã sao chép liên kết bài viết");
                setOpenOption(false);
            })
            .catch((err) => {
                toast.error("Lỗi khi sao chép liên kết");
            });
    };
    useEffect(() => {
        if (!inUserPage) {
            const getAuthor = async () => {
                const response = await GET_METHOD(`users/${authorUid}?isOtherId=true`);

                if (response?.success) {
                    setAuthorData(response.userRecord);
                }
            };

            getAuthor();
        } else {
            setAuthorData(authUserData);
        }
    }, []);
    const deleteBlog = async () => {
        const result = await DELETE_METHOD(`blogs/${blogId}`);
        if (result?.success) {
            toast.success("Xóa blog thành công");
            setBlogChange((pre) => !pre);
            onDeleteBlog(blogId);
        } else {
            toast.error("Lỗi khi xóa blog");
        }
    };
    return (
        <div className="w-full border rounded-xl bg-card  mb-4 p-3">
            <div className="w-full flex justify-between h-">
                <div className="p-0 flex items-center rounded-full  mb-5">
                    {authorData ? (
                        <Image
                            className="w-6 h-6 rounded-full -mr-1 overflow-hidden"
                            src={authorData?.photoURL || "/avatar-default.jpg"}
                            alt="Profile image"
                            width={24}
                            height={24}
                            aria-hidden="true"
                        />
                    ) : (
                        <Skeleton className="w-6 h-6 rounded-full" />
                    )}
                    <p className="font-semibold ml-2 text-sm  ">{authorData?.displayName}</p>
                </div>
                <div className="flex items-start">
                    {/* {authUserData ? (
                        <Button onClick={handleSavedJob} size="icon" variant="ghost" className="rounded-full w-8 h-8 mr-1">
                            {!isSaved ? <Bookmark className="!w-5 !h-5" /> : <BookmarkCheck className="!w-5 !h-5 text-green-500" />}
                        </Button>
                    ) : (
                        <Login>
                            <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 mr-1">
                                <Bookmark className="!w-5 !h-5" />
                            </Button>
                        </Login>
                    )} */}

                    <Popover modal={true} open={openOption} onOpenChange={() => setOpenOption((prev) => !prev)}>
                        <PopoverTrigger className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent">
                            <Ellipsis className="!w-5 !h-5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1 bg-background" align="end">
                            <Button onClick={handleCopyLink} variant="ghost" className="w-full hover:bg-foreground/5 flex justify-start h-8">
                                <Link2 />
                                <p className="text-sm">Sao chép liên kết</p>
                            </Button>
                            {/* <Button variant="ghost" className="w-full flex justify-start h-8">
                                <Flag />
                                <p className="text-sm">Báo cáo</p>
                            </Button> */}
                            {/* my Blog */}
                            {/* {myBlog && (
                                <Button onClick={deleteBlog} variant="ghost" className="w-full hover:bg-foreground/5 flex justify-start h-8">
                                    <Trash2 color="#ef4444" />
                                    <p className="text-sm text-red-500">Xóa</p>
                                </Button>
                            )} */}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Link href={`/blog/${blogId}`} className="w-full hover:text-blue-500 cursor-pointer">
                <div className="w-full">
                    <h1 className="text-base md:text-xl font-bold">{title.length > 85 ? title.slice(0, 85) + "..." : title}</h1>
                </div>
                <div className="w-full">
                    <p className="text-gray-500 block w-full text-sm">
                        {content.length > 230 ? content.slice(0, 230).replaceAll("*", "").replaceAll("#", "").replaceAll("`", "").replaceAll("+", "") + "..." : content}
                    </p>
                </div>
            </Link>
            <div className="w-full flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                    {tag.map((tag, index) => {
                        return (
                            <Button key={index} variant="outline" className=" hover:opacity-80  h-[30px] rounded-full">
                                <p className="">{tag}</p>
                            </Button>
                        );
                    })}
                </div>
                <p className="text-sm">{formatDate(createTime)}</p>
            </div>
        </div>
    );
};

export default BlogItem;
