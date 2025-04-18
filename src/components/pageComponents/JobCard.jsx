"use client";
import Image from "next/image";
import { useState, useContext } from "react";
import { useRouter } from "next13-progressbar";
import { toast } from "sonner";

import { JobContext } from "@/context/JobProvider";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";

import { POST_METHOD } from "@/services/services";

export default function JobCard({ job, authUserData }) {
    const { setJobData } = useContext(JobContext);
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [JobRequirements, setJobRequirements] = useState(null);
    const [saved, setSaved] = useState(job.isSaved);

    const router = useRouter();

    const getDetail = async () => {
        const response = await fetch("/api/jobdetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: job.url,
            }),
        });
        const result = await response.json();
        if (result.success) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(result.data, "text/html"); // Chuyển thành DOM
            const title = doc.querySelectorAll(".sc-1671001a-4.gDSEwb");
            const [jobDes, jobReq] = title;
            // setJobDescription(jobDes.innerText.trim().replaceAll("•	", " "));
            // setJobRequirements(jobReq.innerText.trim().replaceAll("•	", " "));
            setJobDescription(jobDes);
            setJobRequirements(jobReq);
        }
    };

    const handleOpen = async (val) => {
        setShowDetail(val);
        if (val) {
            setLoading(true);
            await getDetail();
            setLoading(false);
        } else {
            setJobDescription(null);
            setJobRequirements(null);
        }
    };

    const handleInterview = () => {
        if (JobRequirements) {
            const paragraphs = JobRequirements.querySelectorAll("p");

            let JobRequirementsHandle = "";
            paragraphs.forEach((p) => {
                JobRequirementsHandle += "\n" + p.textContent.trim() + "\n";
            });

            setJobData({
                uid: authUserData?.uid,
                jobId: job.jobId,
                jobTitle: job.title,
                skills: job.skills,
                jobRequirements: JobRequirementsHandle,
                jobRequirementsElement: JobRequirements.innerHTML,
                candidateDescription: authUserData?.userData.textData.review,
            });
            router.push("/jobs/interview");
        }
    };

    const handleSavedJob = async () => {
        try {
            if (saved) {
                const result = await POST_METHOD("users/unsave-job", { userId: authUserData.uid, jobId: job._id });
                if (result?.success) {
                    setSaved(false);
                    toast.success("Đã xóa công việc khỏi danh sách");
                }
            } else {
                const result = await POST_METHOD("users/save-job", { userId: authUserData.uid, jobId: job._id });
                if (result?.success) {
                    setSaved(true);
                    toast.success("Đã lưu công việc vào danh sách");
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    return (
        <div className="w-full border rounded-xl  mb-4 p-3">
            <div className="">
                <div className="flex">
                    <Image
                        className="w-28  h-28 md:w-[148px] md:h-[148px] rounded-md object-contain mr-4 bg-white p-1"
                        width={150}
                        height={150}
                        src={job.companyLogo || "/company-default-logo.svg"}
                        alt={job.company}
                    />

                    <div className="w-full">
                        <div className="flex justify-between w-full">
                            <div className="flex-1 pr-3">
                                <Dialog className="w-full" open={showDetail} onOpenChange={(val) => handleOpen(val)}>
                                    <DialogTrigger asChild>
                                        <p className="text-base cursor-pointer font-bold text-wrap  truncate line-clamp-2">{job.title}</p>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] flex flex-col p-0 gap-0">
                                        <DialogHeader className={"flex flex-row space-y-0 w-full p-3"}>
                                            <DialogTitle className="min-w-fit">
                                                <Image
                                                    className="w-16  h-16 md:w-[96px] md:h-[96px] rounded-md object-contain mr-4 bg-white p-1"
                                                    width={150}
                                                    height={150}
                                                    src={job.companyLogo || "/company-default-logo.svg"}
                                                    alt={job.company}
                                                />
                                            </DialogTitle>
                                            <DialogDescription className="flex flex-col w-full items-start justify-start ">
                                                <span className="text-base md:text-lg text-left  cursor-pointer font-bold text-wrap text-foreground truncate line-clamp-2">
                                                    {job.title}
                                                </span>
                                                <span className="text-sm text-left  text-foreground/60 text-wrap  truncate line-clamp-2">{job.company}</span>
                                                <span className="text-sm text-left  text-foreground text-wrap  truncate line-clamp-2 mt-1">
                                                    {job.locationVI} - <span className="text-foreground">{job.jobLevelVI}</span>
                                                </span>
                                            </DialogDescription>
                                        </DialogHeader>
                                        <ScrollArea className="h-screen p-3">
                                            {!loading ? (
                                                <div className="w-full h-fit">
                                                    <p className="text-sm text-foreground/80" dangerouslySetInnerHTML={{ __html: jobDescription?.innerHTML }}></p>
                                                    <p
                                                        className="text-sm text-foreground/80 border-foreground/50 border-t pt-3 mt-2"
                                                        dangerouslySetInnerHTML={{ __html: JobRequirements?.innerHTML }}
                                                    ></p>
                                                </div>
                                            ) : (
                                                "Loading..."
                                            )}
                                        </ScrollArea>
                                        <DialogFooter className={"flex flex-row justify-between items-end px-3 pb-3"}>
                                            <a
                                                href={job.url || "#"}
                                                target="_blank"
                                                className="bg-green-600 text-white inline-block px-2 py-1 rounded-full text-sm  hover:bg-green-500 "
                                            >
                                                Truy cập job {">>"}
                                            </a>
                                            <div className="flex-1 flex justify-end items-center">
                                                <Button
                                                    onClick={handleSavedJob}
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 mr-8 rounded-full border-none flex items-center justify-center"
                                                >
                                                    {!saved ? <Bookmark className="!w-5 !h-5" /> : <BookmarkCheck className="!w-5 !h-5 text-green-500" />}
                                                </Button>

                                                <PulsatingButton
                                                    disabled={JobRequirements ? false : true}
                                                    onClick={handleInterview}
                                                    variant="outline"
                                                    className="font-bold min-w-28"
                                                >
                                                    {JobRequirements ? " Phỏng vấn" : <Loader2 className="animate-spin" />}
                                                </PulsatingButton>
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <p className="text-sm text-foreground/80 text-wrap  truncate line-clamp-2">{job.company}</p>
                            </div>
                            <Button onClick={handleSavedJob} variant="outline" size="sm" className="h-8 w-8 rounded-full border-none flex items-center justify-center">
                                {!saved ? <Bookmark className="!w-5 !h-5" /> : <BookmarkCheck className="!w-5 !h-5 text-green-500" />}
                            </Button>
                        </div>
                        <div className="flex flex-col w-full mt-2">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2">
                                <p className="text-sm border border-foreground/30 min-w-fit w-fit px-2 py-1 rounded-full mb-1 md:mb-0 text-foreground/70">
                                    {job.location}
                                </p>
                                <p className="text-sm hidden md:block  text-gray-500">•</p>
                                <p className="text-sm border px-2 py-1 rounded-full border-foreground/30 w-fit  text-wrap text-foreground/70 truncate line-clamp-1">
                                    {job.skills}
                                </p>
                            </div>
                            <div className="flex ">
                                <div className="flex flex-col  min-[840px]:items-center min-[840px]:space-x-2 min-[840px]:flex-row mb-2">
                                    <p className="text-sm border dark:border-green-500 dark:text-green-500 border-green-600 text-green-700 w-fit px-2 py-1 rounded-full mb-1 min-[840px]:mb-0 ">
                                        {job.salary}
                                    </p>
                                    {job.semanticScore && (
                                        <>
                                            <p className="text-sm hidden min-[840px]:block  text-gray-500">•</p>
                                            <p className="text-sm border px-2 py-1 rounded-full w-fit border-orange-500 text-orange-500">Phù hợp {job.semanticScore}%</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-foreground/70">Hết hạn vào {new Date(job.expiredOn).toLocaleDateString("vi-VN")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
