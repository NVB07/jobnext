"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import { Bookmark, Ellipsis, Link2, Flag, Trash2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getData } from "@/services/services";

const BlogItem = ({ authorUid, blogId, myBlog = false, title, tag, content, createTime }) => {
    const [authorData, setAuthorData] = useState();

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const getAuthor = async () => {
            const response = await getData(`users/${authorUid}`);
            // console.log(response);

            setAuthorData(response);
        };
        getAuthor();
    }, []);

    return (
        <div className="w-full border rounded-xl  mb-4 p-3">
            <div className="w-full flex justify-between h-">
                <Link href={`user/${authorUid}`} variant="ghost" className="p-0 flex items-center  hover:opacity-80 h-[30px] hover:bg-transparent rounded-full  mb-5">
                    {authorData ? (
                        <Image
                            className="w-6 h-6 rounded-full -mr-1 overflow-hidden"
                            src={authorData?.photoURL}
                            alt="Profile image"
                            width={24}
                            height={24}
                            aria-hidden="true"
                        />
                    ) : (
                        <Skeleton className="w-6 h-6 rounded-full" />
                    )}
                    <p className="font-semibold ml-2 text-sm  ">{authorData?.displayName}</p>
                </Link>
                <div className="flex items-start">
                    <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 mr-1">
                        <Bookmark className="!w-5 !h-5" />
                    </Button>

                    <Popover modal={false}>
                        <PopoverTrigger className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-accent">
                            <Ellipsis className="!w-5 !h-5" />
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-1" align="end">
                            <Button variant="ghost" className="w-full flex justify-start h-8">
                                <Link2 />
                                <p className="text-sm">Sao chép liên kết</p>
                            </Button>
                            <Button variant="ghost" className="w-full flex justify-start h-8">
                                <Flag />
                                <p className="text-sm">Báo cáo</p>
                            </Button>
                            {/* my Blog */}
                            {myBlog && (
                                <Button variant="ghost" className="w-full flex justify-start h-8">
                                    <Trash2 color="#ef4444" />
                                    <p className="text-sm text-red-500">Xóa</p>
                                </Button>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Link href={`/blog/${blogId}`} className="w-full cursor-pointer">
                <div className="w-full">
                    <h1 className="text-xl font-bold">{title.length > 85 ? title.slice(0, 85) + "..." : title}</h1>
                </div>
                <div className="w-full">
                    <p className="text-gray-500 block w-full text-sm">{content.length > 230 ? content.slice(0, 230) + "..." : content}</p>
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
