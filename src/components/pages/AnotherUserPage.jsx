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
        <div className=" w-full flex flex-col items-center  relative z-0">
            <div className=" bg-background container mx-auto px-4">
                <div className=" w-full grid grid-cols-1 md:grid-cols-3 gap-6 ">
                    {/* Profile Summary */}
                    <div className="md:col-span-1 mt-24 md:mt-0 relative z-20 -mb-20">
                        <Card className=" sticky top-24 z-10">
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
                                {userData?.user?.profile?.Address && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                        <MapPin className="h-4 w-4" />
                                        <span className="text-sm">{userData?.user?.profile?.Address}</span>
                                    </div>
                                )}
                                {userData?.user?.profile?.Years_of_experience && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                        <Briefcase className="h-4 w-4" />
                                        <span className="text-sm">{userData?.user?.profile?.Years_of_experience}</span>
                                    </div>
                                )}
                                {userData?.user?.profile?.University && (
                                    <div className="flex items-center gap-2 text-foreground/70">
                                        <GraduationCap className="h-4 w-4" />
                                        <span className="text-sm">{userData?.user?.profile?.University}</span>
                                    </div>
                                )}

                                <Separator />

                                {userData?.user?.profile?.Skills && (
                                    <>
                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium">Kỹ năng</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {userData?.user?.profile?.Skills.split(",").map((skill, index) => {
                                                    return (
                                                        <Badge key={index} className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-sm`}>
                                                            {skill}
                                                        </Badge>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <Separator />
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs Content */}
                    <div className="md:col-span-2 w-full min-h-screen pt-20  md:pt-24">
                        <h2 className="text-xl  font-bold my-2">Bài viết của {userData?.userRecord?.displayName}</h2>
                        <SavedBlogTab otherUid={uid} authUserData={authUserData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
