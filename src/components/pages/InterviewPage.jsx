"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { Menu, RefreshCw } from "lucide-react";
import Recommend from "@/components/pageComponents/interviewTabs/Recommend";

const InterviewPage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <div className="w-full min-h-screen pt-24 px-5 flex justify-center relative ">
            <Tabs defaultValue="recommend" className="w-full h-full flex">
                <TabsList className="  flex-col h-full items-start md:sticky top-24 z-10 bg-background pr-0">
                    <div
                        className={`${
                            sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-all duration-300 fixed inset-0 z-30 w-full h-full  md:translate-x-0 md:w-72 md:relative md:z-0 `}
                    >
                        <div className="md:hidden flex items-center justify-between p-4 border-b  md:mt-0 mt-16 bg-background ">
                            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
                                <X className="h-5 w-5 " />
                            </Button>
                        </div>
                        <div className="hidden md:block md:mb-3">
                            <h1 className="text-xl font-bold text-foreground">Danh mục</h1>
                        </div>
                        <div className="w-full h-full bg-background">
                            <TabsTrigger
                                className="w-full bg-background mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="recommend"
                                onClick={toggleSidebar}
                            >
                                <span className="text-left block w-full text-base font-medium"> Việc làm phù hợp {"(TopCV)"}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="searchjobs"
                                onClick={toggleSidebar}
                            >
                                <span className="text-left block w-full text-base font-medium">Tìm kiếm việc khác {"(TopCV)"}</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="history"
                                onClick={toggleSidebar}
                            >
                                <span className="text-left block w-full text-base font-medium">Lịch sử phỏng vấn</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="savedjobs"
                                onClick={toggleSidebar}
                            >
                                <span className="text-left block w-full text-base font-medium">Việc làm đã lưu</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="custom"
                                onClick={toggleSidebar}
                            >
                                <span className="text-left block w-full text-base font-medium">Tạo phỏng vấn tùy chỉnh</span>
                            </TabsTrigger>
                        </div>
                    </div>
                </TabsList>

                <div className="  w-full min-h-screen md:border-l border-border md:pl-5">
                    <div className="md:hidden flex w-full items-center justify-between ">
                        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                            <Menu className="h-5 w-5" />
                        </Button>

                        <Button variant="ghost" size="icon">
                            <RefreshCw className="h-5 w-5" />
                        </Button>
                    </div>
                    <TabsContent value="recommend" className="mt-0">
                        <Recommend />
                    </TabsContent>
                    <TabsContent value="searchjobs">searchjobsrfg.</TabsContent>
                    <TabsContent value="history">history</TabsContent>
                    <TabsContent value="savedjobs">savedjobs</TabsContent>
                    <TabsContent value="custom">custom.</TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default InterviewPage;
