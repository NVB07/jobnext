"use client";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ellipsis, Link2 } from "lucide-react";
import { toast } from "sonner";
import MDView from "../pageComponents/MDView";
import Image from "next/image";
import withPopstateRerender from "../pageComponents/WithPopstateRerender";
import { Skeleton } from "@/components/ui/skeleton";

const BlogDetail = ({ data }) => {
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
            .writeText(baseUrl + "/blog/" + data?._id)
            .then(() => {
                toast.success("Đã sao chép liên kết bài viết");
                setOpenOption(false);
            })
            .catch((err) => {
                toast.error("Lỗi khi sao chép liên kết");
            });
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (!data) {
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
        <div className="px-1 flex  flex-col items-center ">
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
                <Card className="w-full max-w-4xl">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-2xl border-b border-foreground pb-2 font-bold">{data?.title}</h1>
                        </CardTitle>
                        <CardDescription className="pt-3 flex justify-between">
                            <div className="flex ">
                                <Image src={"/logo.png"} width={50} height={50} alt={"admin"} className="w-[50px] h-[50px] rounded-full" />
                                <div className="ml-3">
                                    <p className="text-lg text-foreground font-medium ">JobNext</p>
                                    <p className="text-sm text-foreground/80 font-medium ">{handleConvertDate(data?.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <Popover modal={true} open={openOption} onOpenChange={() => setOpenOption((prev) => !prev)}>
                                    <PopoverTrigger className="w-8 h-8 rounded-full flex items-center  justify-center hover:bg-accent">
                                        <Ellipsis className="!w-5 !h-5" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-48 p-1 bg-background" align="end">
                                        <Button onClick={handleCopyLink} variant="ghost" className="w-full  flex justify-start h-8">
                                            <Link2 />
                                            <p className="text-sm">Sao chép liên kết</p>
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full">{data?.content ? <MDView content={data?.content} /> : null}</CardContent>
                    <CardFooter className="w-full">
                        <p className="text-foreground/70 w-full text-sm border-t border-foreground pt-3 mt-8 flex gap-2">
                            {data?.tags.map((tag) => (
                                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white" key={tag}>
                                    {tag}
                                </Badge>
                            ))}
                        </p>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default withPopstateRerender(BlogDetail);
