"use client";
import { useState, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import Recommend from "@/components/pageComponents/interviewTabs/Recommend";
import InterviewHistory from "../pageComponents/interviewTabs/InterviewHistory";
import CustomInterview from "../pageComponents/interviewTabs/CustomInterview";

import { AuthContext } from "@/context/AuthContextProvider";
const JobsPage = () => {
    const { authUserData } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const [tab, setTab] = useState(() => {
        const tab = searchParams.get("tab");
        if (tab === "recommend" || tab === null) {
            return "recommend";
        } else if (tab === "searchjobs") {
            return "searchjobs";
        } else if (tab === "history") {
            return "history";
        } else if (tab === "savedjobs") {
            return "savedjobs";
        } else if (tab === "custom") {
            return "custom";
        } else {
            return "recommend";
        }
    });
    const toggleSidebar = (tabValue) => {
        setSidebarOpen(!sidebarOpen);
        if (tabValue) {
            setTab(tabValue);
            router.push(`/jobs?tab=${tabValue}`);
        }
    };

    return (
        <div className="w-full min-h-screen pt-16 min-[490px]:pt-[72px] md:pt-24 px-5 flex justify-center relative ">
            <Tabs activationMode="manual" value={tab} defaultValue="recommend" className="w-full h-full flex">
                <TabsList className="  flex-col h-full items-start md:sticky top-24 z-10 bg-background pr-0">
                    <div
                        className={`${
                            sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        } transition-all duration-300 fixed inset-0 z-30 w-full h-full  md:translate-x-0 md:w-72 md:relative md:z-0 `}
                    >
                        <div className="md:hidden flex items-center justify-between p-8  border-b  md:mt-0 mt-16 bg-background ">
                            {/* <Button variant="ghost" size="icon" onClick={() => toggleSidebar()} className="ml-auto">
                                <X className="h-5 w-5 " />
                            </Button> */}
                        </div>
                        <div className="hidden md:block md:mb-3">
                            <h1 className="text-xl font-bold text-foreground">Danh mục</h1>
                        </div>
                        <div className="w-full h-full bg-background pt-4 md:pt-0 ">
                            <TabsTrigger
                                className="w-full bg-background mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="recommend"
                                onClick={() => toggleSidebar("recommend")}
                            >
                                <span className="text-left block w-full text-base font-medium"> Việc làm phù hợp </span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="searchjobs"
                                onClick={() => toggleSidebar("searchjobs")}
                            >
                                <span className="text-left block w-full text-base font-medium">Tìm kiếm việc khác </span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="history"
                                onClick={() => toggleSidebar("history")}
                            >
                                <span className="text-left block w-full text-base font-medium">Lịch sử phỏng vấn</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="savedjobs"
                                onClick={() => toggleSidebar("savedjobs")}
                            >
                                <span className="text-left block w-full text-base font-medium">Việc làm đã lưu</span>
                            </TabsTrigger>
                            <TabsTrigger
                                className="w-full mb-2 data-[state=active]:bg-foreground/10 hover:bg-foreground/5 rounded-s-md rounded-e-none"
                                value="custom"
                                onClick={() => toggleSidebar("custom")}
                            >
                                <span className="text-left block w-full text-base font-medium">Tạo phỏng vấn tùy chỉnh</span>
                            </TabsTrigger>
                        </div>
                    </div>
                </TabsList>

                <div className="  w-full min-h-screen md:border-l border-border md:pl-5">
                    <div className="md:hidden sticky top-[64px] min-[490px]:top-[72px] pt-4 bg-background z-10 flex w-full items-center justify-between ">
                        <Button variant="ghost" size="icon" onClick={() => toggleSidebar()}>
                            <Menu className="h-5 w-5" />
                        </Button>

                        {/* <Button variant="ghost" size="icon">
                            <RefreshCw className="h-5 w-5" />
                        </Button> */}
                    </div>
                    <TabsContent value="recommend" className="mt-0">
                        <Recommend authUserData={authUserData} />
                    </TabsContent>
                    <TabsContent value="searchjobs">searchjobsrfg.</TabsContent>
                    <TabsContent value="history">
                        <InterviewHistory authUserData={authUserData} />
                    </TabsContent>
                    <TabsContent value="savedjobs">savedjobs</TabsContent>
                    <TabsContent value="custom">
                        <CustomInterview authUserData={authUserData} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};

export default JobsPage;
