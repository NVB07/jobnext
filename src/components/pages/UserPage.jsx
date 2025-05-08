"use client";

import { useState, useContext } from "react";
import { useRouter } from "next13-progressbar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Pencil, Bookmark, Clock, FileText, Calendar, Briefcase, MapPin, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { deleteCookie } from "@/lib/auth/cookiesManager";

import { AuthContext } from "@/context/AuthContextProvider";
import SavedJob from "../pageComponents/interviewTabs/SavedJob";
import InterviewHistory from "../pageComponents/interviewTabs/InterviewHistory";
import SavedBlogTab from "../pageComponents/userTabs/SavedBlogTab";

export default function UserProfile({ uid }) {
    const { authUserData } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("blogs");
    const router = useRouter();
    const handleSignOut = () => {
        signOut(auth);
        deleteCookie("accessToken");

        location.href = "/";
    };

    const handleNextPae = () => {
        router.push(`/user/${authUserData?.uid}/update`);
    };
    if (uid !== authUserData?.uid) {
        return <div className="mt-24">Trang cua nguoi khac</div>;
    }

    return (
        <div className=" w-full  relative z-0">
            <div className=" bg-background w-full mx-auto px-4">
                <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    {/* Profile Summary */}
                    <div className="md:col-span-1 mt-24 md:mt-0 relative z-20 -mb-20">
                        <Card className=" sticky top-24 z-10">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={authUserData?.photoURL || "/avatar-default.jpg"} alt="Avatar" />
                                        <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-500  text-xl">Jobnext</AvatarFallback>
                                    </Avatar>
                                    <Button onClick={handleNextPae} variant="ghost" size="icon" className="rounded-full">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardTitle className="mt-4 text-xl">{authUserData?.displayName}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {authUserData?.userData?.profile?.Address && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm">{authUserData?.userData?.profile?.Address}</span>
                                    </div>
                                )}
                                {authUserData?.userData?.profile?.Years_of_experience && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                        <Briefcase className="h-4 w-4" />
                                        <span className="text-sm">{authUserData?.userData?.profile?.Years_of_experience}</span>
                                    </div>
                                )}
                                {authUserData?.userData?.profile?.University && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                        <GraduationCap className="h-4 w-4" />
                                        <span className="text-sm">{authUserData?.userData?.profile?.University}</span>
                                    </div>
                                )}

                                <Separator />

                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Kỹ năng</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {authUserData?.userData?.profile?.Skills &&
                                            authUserData?.userData?.profile?.Skills.split(",").map((skill, index) => {
                                                return (
                                                    <Badge key={index} className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-sm`}>
                                                        {skill}
                                                    </Badge>
                                                );
                                            })}
                                    </div>
                                </div>
                                <Separator />
                                <Button variant="destructive" onClick={handleSignOut}>
                                    Đăng xuất
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs Content */}
                    <div className="md:col-span-2 w-full min-h-screen">
                        <Tabs defaultValue="blogs" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="bg-background pt-20  md:pt-24 sticky top-0 z-10 ">
                                <TabsList className="grid grid-cols-3   ">
                                    <TabsTrigger value="blogs" className="data-[state=active]:">
                                        <FileText className="h-4 w-4 mr-2" />
                                        <span className="hidden sm:inline">Bài viết</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="saved-jobs" className="data-[state=active]:">
                                        <Bookmark className="h-4 w-4 mr-2" />
                                        <span className="hidden sm:inline">Đã lưu</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="interviews" className="data-[state=active]:">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span className="hidden sm:inline">Phỏng vấn</span>
                                    </TabsTrigger>
                                </TabsList>
                                {activeTab === "blogs" && <h2 className="text-xl font-bold my-2">Quản lý bài viết</h2>}
                                {activeTab === "saved-jobs" && <h2 className="text-xl font-bold my-2">Công việc đã lưu</h2>}
                                {activeTab === "interviews" && <h2 className="text-xl font-bold my-2">Lịch phỏng vấn</h2>}
                            </div>

                            {/* Blog Management */}
                            <TabsContent value="blogs" className="space-y-4 w-full">
                                <SavedBlogTab authUserData={authUserData} />
                            </TabsContent>

                            {/* Saved Jobs */}
                            <TabsContent value="saved-jobs" className="space-y-4 w-full">
                                <SavedJob authUserData={authUserData} />
                            </TabsContent>

                            {/* Interview History */}
                            <TabsContent value="interviews" className="space-y-4">
                                <InterviewHistory authUserData={authUserData} />
                            </TabsContent>

                            {/* Edit Profile */}
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Blog Card Component
function BlogCard() {
    return (
        <Card className="w-full border-zinc-800 overflow-hidden">
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/4">
                    <div className="h-40 sm:h-full  relative">
                        <img src="/avatar-default.jpg" alt="Blog thumbnail" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="sm:w-3/4 p-4">
                    <div className="flex justify-between items-start">
                        <Badge className="bg-orange-500 hover:bg-orange-600 mb-2">Công nghệ</Badge>
                        <div className="text-zinc-500 text-sm">12/04/2023</div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">10 thủ thuật React giúp tăng hiệu suất ứng dụng của bạn</h3>
                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4">
                        Khám phá các kỹ thuật tối ưu hóa hiệu suất React mới nhất để giúp ứng dụng của bạn chạy nhanh hơn và mượt mà hơn. Bài viết này sẽ hướng dẫn bạn
                        cách áp dụng các phương pháp hay nhất...
                    </p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-zinc-500"
                            >
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span className="text-zinc-500 text-sm">1.2K</span>
                        </div>
                        <Button variant="ghost" size="sm">
                            Chỉnh sửa
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

// Job Card Component
function JobCard() {
    return (
        <Card className="w-full border-zinc-800">
            <CardHeader className="pb-2">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <div className="h-12 w-12 rounded  flex items-center justify-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                        </div>
                        <div>
                            <CardTitle className="text-base">Frontend Developer</CardTitle>
                            <CardDescription className="text-zinc-400">TechVision Company</CardDescription>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-pink-500">
                        <Bookmark className="h-5 w-5 fill-current" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className=" border-zinc-700">
                        Full-time
                    </Badge>
                    <Badge variant="outline" className=" border-zinc-700">
                        Remote
                    </Badge>
                    <Badge variant="outline" className=" border-zinc-700">
                        15-20M VND
                    </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className=" hover:bg-zinc-700">
                        React
                    </Badge>
                    <Badge variant="secondary" className=" hover:bg-zinc-700">
                        TypeScript
                    </Badge>
                    <Badge variant="secondary" className=" hover:bg-zinc-700">
                        Next.js
                    </Badge>
                </div>
                <p className="text-zinc-400 text-sm line-clamp-2">
                    Chúng tôi đang tìm kiếm một Frontend Developer có kinh nghiệm để tham gia vào đội ngũ phát triển sản phẩm mới của công ty...
                </p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div className="text-zinc-500 text-sm">Hà Nội</div>
                <div className="text-zinc-500 text-sm">Đã lưu 2 ngày trước</div>
            </CardFooter>
        </Card>
    );
}

// Interview Card Component
function InterviewCard() {
    return (
        <Card className=" border-zinc-800">
            <CardHeader className="pb-2">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <div className="h-12 w-12 rounded  flex items-center justify-center">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                        </div>
                        <div>
                            <CardTitle className="text-base">Frontend Developer</CardTitle>
                            <CardDescription className="text-zinc-400">TechVision Company</CardDescription>
                        </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">Đã hoàn thành</Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">15/04/2023 - 14:00</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className=" border-zinc-700">
                        Vòng 1
                    </Badge>
                    <Badge variant="outline" className=" border-zinc-700">
                        Phỏng vấn kỹ thuật
                    </Badge>
                </div>
                <p className="text-zinc-400 text-sm">Phỏng vấn trực tuyến với đội ngũ kỹ thuật về kiến thức React, TypeScript và các dự án đã làm.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                    Xem chi tiết
                </Button>
                <Button variant="ghost" size="sm" className="text-zinc-400">
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" x2="12" y1="3" y2="15" />
                    </svg>
                    Tải xuống ghi chú
                </Button>
            </CardFooter>
        </Card>
    );
}
