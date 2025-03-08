/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Bookmark, Ellipsis, Link2, Flag, Trash2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
const BlogItem = ({ author = "", myBlog = false, title = "", content = "", createTime = "" }) => {
    return (
        <div className="w-full border rounded-xl  mb-4 p-3">
            <div className="w-full flex justify-between h-">
                <Button variant="ghost" className="p-0 hover:opacity-80  h-[30px] hover:bg-transparent rounded-full  mb-5">
                    <Image
                        className="w-6 h-6 rounded-full -mr-1 overflow-hidden"
                        src="https://avatar.vercel.sh/james"
                        alt="Profile image"
                        width={24}
                        height={24}
                        aria-hidden="true"
                    />
                    <p className="font-bold text-sm">@georgelucas</p>
                </Button>
                <div className="flex items-start">
                    <Button size="icon" variant="ghost" className="rounded-full w-8 h-8 mr-1">
                        <Bookmark className="!w-5 !h-5" />
                    </Button>
                    {/* <Button size="icon" variant="ghost" className="rounded-full w-8 h-8">
                        <Ellipsis className="!w-5 !h-5" />
                    </Button> */}
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
            <Link href={"/blog/1"} className="w-full">
                <h1 className="text-xl font-bold">Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.</h1>
            </Link>
            <div className="w-full">
                <p className="text-gray-500 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem ut iusto porro. Iste animi nemo ipsa ullam impedit, amet dignissimos aperiam! Voluptate,
                    omnis! Accusantium, qui totam recusandae sequi quasi labore?
                </p>
            </div>
            <div className="w-full flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                    {/* tag name cho blog */}
                    <Button variant="outline" className=" hover:opacity-80  h-[30px] rounded-full">
                        <p className="">Web</p>
                    </Button>
                    <Button variant="outline" className=" hover:opacity-80  h-[30px] rounded-full">
                        <p className="">developer</p>
                    </Button>
                </div>
                <p className="text-sm">2 giờ trước</p>
            </div>
        </div>
    );
};

export default BlogItem;
