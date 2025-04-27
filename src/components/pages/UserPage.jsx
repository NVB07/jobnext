// "use client";
// import { useContext, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { signOut } from "firebase/auth";
// import { auth } from "@/lib/firebase/firebaseConfig";
// import { deleteCookie } from "@/lib/auth/cookiesManager";

// import { AuthContext } from "@/context/AuthContextProvider";
// import { GET_METHOD } from "@/services/services";

// const UserPage = () => {
//     const { authUserData } = useContext(AuthContext);
//     const router = useRouter();
//     const handleSignOut = () => {
//         signOut(auth);
//         deleteCookie("accessToken");
//         router.push("/");
//     };
//     useEffect(() => {
//         if (authUserData) {
//             const fetchUserData = async () => {
//                 const userData = await GET_METHOD("users/" + authUserData.uid);
//             };
//             fetchUserData();
//         }
//     }, [authUserData]);
//     return (
//         <div>
//             <div className="flex justify-center">
//                 {authUserData ? (
//                     <div>
//                         <div>{authUserData.displayName}</div>
//                         <div>{authUserData.email}</div>
//                         <div>{authUserData.uid}</div>
//                         <div>{authUserData.photoURL}</div>

//                         <button onClick={handleSignOut}>Sign out</button>
//                     </div>
//                 ) : (
//                     <div>Chưa đăng nhập</div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default UserPage;

"use client";

import { useState, useEffect, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Bookmark, Clock, FileText, User, Calendar, Briefcase, MapPin, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { deleteCookie } from "@/lib/auth/cookiesManager";

import { AuthContext } from "@/context/AuthContextProvider";
import { GET_METHOD } from "@/services/services";
import SavedJob from "../pageComponents/interviewTabs/SavedJob";
import InterviewHistory from "../pageComponents/interviewTabs/InterviewHistory";

export default function UserProfile() {
    const { authUserData } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("blogs");
    const router = useRouter();
    const handleSignOut = () => {
        signOut(auth);
        deleteCookie("accessToken");
        router.push("/");
    };

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
                                        <AvatarImage src="/avatar-default.jpg" alt="Avatar" />
                                        <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-500  text-xl">NN</AvatarFallback>
                                    </Avatar>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardTitle className="mt-4 text-xl">Nguyễn Văn A</CardTitle>
                                <CardDescription className="text-zinc-400">Frontend Developer</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm">Hà Nội, Việt Nam</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Briefcase className="h-4 w-4" />
                                    <span className="text-sm">3 năm kinh nghiệm</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <GraduationCap className="h-4 w-4" />
                                    <span className="text-sm">Đại học Bách Khoa Hà Nội</span>
                                </div>

                                <Separator className="" />

                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium">Kỹ năng</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary" className=" hover:bg-zinc-700">
                                            React
                                        </Badge>
                                        <Badge variant="secondary" className=" hover:bg-zinc-700">
                                            TypeScript
                                        </Badge>
                                        <Badge variant="secondary" className=" hover:bg-zinc-700">
                                            Next.js
                                        </Badge>
                                        <Badge variant="secondary" className=" hover:bg-zinc-700">
                                            Tailwind CSS
                                        </Badge>
                                        <Badge variant="secondary" className=" hover:bg-zinc-700">
                                            UI/UX
                                        </Badge>
                                    </div>
                                </div>
                                <button onClick={handleSignOut}>Sign out</button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs Content */}
                    <div className="md:col-span-2 w-full min-h-screen">
                        <Tabs defaultValue="blogs" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="bg-background pt-20  md:pt-24 sticky top-0 z-10 ">
                                <TabsList className="grid grid-cols-4 border  rounded-lg   ">
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
                                    <TabsTrigger value="edit-profile" className="data-[state=active]:">
                                        <User className="h-4 w-4 mr-2" />
                                        <span className="hidden sm:inline">Hồ sơ</span>
                                    </TabsTrigger>
                                </TabsList>
                                {activeTab === "blogs" && <h2 className="text-xl font-bold my-2">Quản lý bài viết</h2>}
                                {activeTab === "saved-jobs" && <h2 className="text-xl font-bold my-2">Công việc đã lưu</h2>}
                                {activeTab === "interviews" && <h2 className="text-xl font-bold my-2">Lịch phỏng vấn</h2>}
                            </div>

                            {/* Blog Management */}
                            <TabsContent value="blogs" className="space-y-4 w-full">
                                <div className="space-y-4 pr-4">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <BlogCard key={item} />
                                    ))}
                                </div>
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
                            <TabsContent value="edit-profile" className="space-y-6">
                                <Card className=" border-zinc-800">
                                    <CardHeader>
                                        <CardTitle>Thông tin cá nhân</CardTitle>
                                        <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                                            <div className="relative">
                                                <Avatar className="h-24 w-24">
                                                    <AvatarImage src="/avatar-default.jpg" alt="Avatar" />
                                                    <AvatarFallback className="bg-gradient-to-r from-orange-400 to-pink-500  text-2xl">NN</AvatarFallback>
                                                </Avatar>
                                                <Button size="sm" variant="secondary" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="grid gap-4 flex-1">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="name">Họ và tên</Label>
                                                    <Input id="name" defaultValue="Nguyễn Văn A" className=" border-zinc-700" />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input id="email" type="email" defaultValue="example@gmail.com" className=" border-zinc-700" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Chức danh</Label>
                                            <Input id="title" defaultValue="Frontend Developer" className=" border-zinc-700" />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="location">Địa điểm</Label>
                                            <Input id="location" defaultValue="Hà Nội, Việt Nam" className=" border-zinc-700" />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="experience">Kinh nghiệm</Label>
                                            <Select defaultValue="3">
                                                <SelectTrigger className=" border-zinc-700">
                                                    <SelectValue placeholder="Chọn số năm kinh nghiệm" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 năm</SelectItem>
                                                    <SelectItem value="2">2 năm</SelectItem>
                                                    <SelectItem value="3">3 năm</SelectItem>
                                                    <SelectItem value="4">4 năm</SelectItem>
                                                    <SelectItem value="5">5+ năm</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="education">Học vấn</Label>
                                            <Input id="education" defaultValue="Đại học Bách Khoa Hà Nội" className=" border-zinc-700" />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="bio">Giới thiệu bản thân</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder="Viết một vài dòng về bản thân bạn"
                                                className="min-h-[100px]  border-zinc-700"
                                                defaultValue="Frontend Developer với 3 năm kinh nghiệm làm việc với React, TypeScript và Next.js. Tôi đam mê xây dựng giao diện người dùng đẹp mắt và trải nghiệm người dùng tuyệt vời."
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="ml-auto bg-gradient-to-r from-orange-400 to-pink-500 hover:from-orange-500 hover:to-pink-600">
                                            Lưu thay đổi
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
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
