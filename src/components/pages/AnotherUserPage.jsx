"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next13-progressbar";
import Image from "next/image";
import { GET_METHOD } from "@/services/services";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Pencil, Bookmark, Clock, FileText, Calendar, Briefcase, MapPin, GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { AuthContext } from "@/context/AuthContextProvider";
import SavedBlogTab from "../pageComponents/userTabs/SavedBlogTab";
export default function AnotherUserPage({ uid }) {
    const { authUserData } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const res = await GET_METHOD(`users/${uid}?isOtherId=true`);
            if (res?.success) {
                setUserData(res);
            }
        };
        fetchUserData();
    }, [uid]);

    return (
        <div className=" w-full flex flex-col items-center  z-0">
            <div className=" bg-background  min-h-screen pt-20 w-full md:pt-24 mx-auto px-4">
                <div className=" w-full flex justify-center ">
                    {/* Profile Summary */}
                    <div className="md:col-span-1 md:mt-0 max-w-4xl w-full -mb-20">
                        <Card className="">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Image
                                        src={userData?.userRecord?.photoURL ? userData.userRecord.photoURL : "/avatar-default.jpg"}
                                        alt="Avatar"
                                        width={80}
                                        height={80}
                                        className="rounded-full"
                                    />
                                    <Badge className="rounded-full">Trang của {userData?.userRecord?.displayName}</Badge>
                                </div>
                                <CardTitle className="mt-4 text-xl">{userData?.userRecord?.displayName}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-center text-lg font-bold">Bạn không có quyền truy cập trang này</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
