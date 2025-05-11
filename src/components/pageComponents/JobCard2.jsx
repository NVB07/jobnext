"use client";

import { BookmarkIcon, BuildingIcon, MapPinIcon, ExternalLinkIcon, Loader2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import { useState, useContext, useCallback } from "react";
import { useRouter } from "next13-progressbar";
import { toast } from "sonner";

import { JobContext } from "@/context/JobProvider";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";

import { POST_METHOD } from "@/services/services";

export default function JobCard({ job, authUserData }) {
    const { setJobData } = useContext(JobContext);
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [jobDescription, setJobDescription] = useState(null);
    const [JobRequirements, setJobRequirements] = useState(null);
    const [saved, setSaved] = useState(job.isSaved);
    const [imgError, setImgError] = useState(false);
    const [dialogImgError, setDialogImgError] = useState(false);

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
                candidateDescription: authUserData?.userData.review,
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
                    toast.success("Đã bỏ lưu công việc ");
                }
            } else {
                const result = await POST_METHOD("users/save-job", { userId: authUserData.uid, jobId: job._id });
                if (result?.success) {
                    setSaved(true);
                    toast.success("Đã lưu công việc ");
                }
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra");
        }
    };

    const getMatchGradient = () => {
        if (job.semanticScore >= 80) {
            return "url(#gradient-high)";
        } else if (job.semanticScore >= 60) {
            return "url(#gradient-medium)";
        } else {
            return "url(#gradient-low)";
        }
    };

    const handleImageError = useCallback(() => {
        setImgError(true);
    }, []);

    const handleDialogImageError = useCallback(() => {
        setDialogImgError(true);
    }, []);

    return (
        <div className="w-full my-3 rounded-2xl border bg-card  hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
                {/* <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div> */}

                <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start">
                        <div className="flex-grow">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-white rounded-xl shrink-0 flex items-center justify-center border overflow-hidden border-gray-100 shadow-sm">
                                    <Image
                                        className="w-full h-full object-contain"
                                        width={96}
                                        height={96}
                                        src={imgError ? "/company-default-logo.svg" : job?.companyLogo || "/company-default-logo.svg"}
                                        alt={job.company}
                                        onError={handleImageError}
                                    />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold  md:line-clamp-2">{job.title}</h3>
                                    <div className="flex items-center mt-2 text-sm  ">
                                        <BuildingIcon className="w-4 h-4 mr-1.5 shrink-0 text-purple-500" />
                                        <span className="text-foreground/80">{job.company}</span>
                                    </div>
                                    <div className="flex items-center mt-1.5 text-sm ">
                                        <MapPinIcon className="w-4 h-4 mr-1.5 shrink-0 text-pink-500" />
                                        <span className="text-foreground/80">
                                            {job.locationVI} - {job.jobLevelVI}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-2 rounded-lg">
                                <div className="font-medium text-sm ">Mức lương:</div>
                                <div className="w-fit font-semibold bg-gradient-to-r from-green-500  to-purple-500 bg-clip-text text-transparent">{job.salary}</div>
                            </div>

                            <div className="mt-5">
                                <div className="font-medium text-sm   mb-2">Kỹ năng yêu cầu:</div>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.split(",").map((skill, index) => {
                                        const gradientClass = ["from-purple-500 to-indigo-500", "from-pink-500 to-purple-500", "from-orange-500 to-pink-500"][index % 3];

                                        return (
                                            <Badge key={index} className={`bg-gradient-to-r ${gradientClass} text-white border-0 shadow-sm`}>
                                                {skill}
                                            </Badge>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 md:mt-0 md:ml-6 flex flex-col items-center justify-start">
                            {job.semanticScore && (
                                <>
                                    <div className="relative w-20 h-20">
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            <defs>
                                                <linearGradient id="gradient-high" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#8B5CF6" />
                                                    <stop offset="100%" stopColor="#4F46E5" />
                                                </linearGradient>
                                                <linearGradient id="gradient-medium" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#EC4899" />
                                                    <stop offset="100%" stopColor="#8B5CF6" />
                                                </linearGradient>
                                                <linearGradient id="gradient-low" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#F59E0B" />
                                                    <stop offset="100%" stopColor="#EC4899" />
                                                </linearGradient>
                                            </defs>

                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#ccc" strokeWidth="10" />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke={getMatchGradient()}
                                                strokeWidth="10"
                                                strokeDasharray={`${(2 * Math.PI * 45 * job.semanticScore) / 100} ${2 * Math.PI * 45 * (1 - job.semanticScore / 100)}`}
                                                strokeDashoffset={2 * Math.PI * 45 * 0.25}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-base font-bold bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                                                {job.semanticScore}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium  -500 mt-1">Mức độ phù hợp</div>
                                </>
                            )}
                        </div>
                    </div>
                    <p className="text-sm mt-3 text-foreground/70">Hết hạn vào {new Date(job.expiredOn).toLocaleDateString("vi-VN")}</p>
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="outline"
                            size="sm"
                            className={`rounded-full border border-foreground/70 text-foreground/70  ${
                                saved ? " text-pink-500  border-pink-500 hover:text-pink-500 " : " "
                            }`}
                            onClick={handleSavedJob}
                        >
                            <BookmarkIcon className={`w-4 h-4 mr-1 ${saved ? "fill-pink-500 stroke-pink-500 " : ""}`} />
                            Lưu
                        </Button>
                        <Dialog className="w-full" open={showDetail} onOpenChange={(val) => handleOpen(val)}>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    className="rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white border-0 shadow-md"
                                >
                                    <span className="mr-2">Xem chi tiết</span>
                                    <ExternalLinkIcon className="w-4 h-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] flex flex-col p-0 gap-0">
                                <DialogHeader className={"flex flex-row space-y-0 w-full p-3"}>
                                    <DialogTitle className="min-w-fit">
                                        <Image
                                            className="w-16  h-16 md:w-[96px] md:h-[96px] rounded-md object-contain mr-4 bg-white p-1"
                                            width={150}
                                            height={150}
                                            src={dialogImgError ? "/company-default-logo.svg" : job.companyLogo || "/company-default-logo.svg"}
                                            alt={job.company}
                                            onError={handleDialogImageError}
                                        />
                                    </DialogTitle>
                                    <DialogDescription className="flex flex-col w-full items-start justify-start ">
                                        <span className="text-base md:text-lg text-left  cursor-pointer font-bold text-wrap text-foreground truncate line-clamp-2">
                                            {job.title}
                                        </span>
                                        <span className="text-sm text-left flex items-center  text-foreground/80 text-wrap  truncate line-clamp-2">
                                            <BuildingIcon className="w-4 h-4 mr-1.5 shrink-0 text-purple-500" />
                                            {job.company}
                                        </span>
                                        <span className="text-sm flex items-center text-left  text-foreground/80 text-wrap  truncate line-clamp-2 mt-1">
                                            <MapPinIcon className="w-4 h-4 mr-1.5 shrink-0 text-pink-500" /> {job.locationVI + " - " + job.jobLevelVI}
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
                                        className="border border-green-500 text-green-500 inline-block px-2 py-1 rounded-full text-sm  hover:bg-accent "
                                    >
                                        Truy cập job {">>"}
                                    </a>
                                    <div className="flex-1 flex justify-end items-center">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className={`rounded-full mr-5 border border-foreground/70 text-foreground/70  ${
                                                saved ? " text-pink-500  border-pink-500 hover:text-pink-500 " : " "
                                            }`}
                                            onClick={handleSavedJob}
                                        >
                                            <BookmarkIcon className={`w-4 h-4 mr-1 ${saved ? "fill-pink-500 stroke-pink-500 " : ""}`} />
                                            Lưu
                                        </Button>

                                        <Button
                                            disabled={JobRequirements ? false : true}
                                            onClick={handleInterview}
                                            variant="outline"
                                            className="rounded-full w-32 text-base font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white border-0 shadow-md"
                                        >
                                            {JobRequirements ? " Phỏng vấn" : <Loader2 className="animate-spin" />}
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        {/* <Button
                            size="sm"
                            className="rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white border-0 shadow-md"
                            onClick={() => handleInterview()}
                        >
                            <span className="mr-2">Xem chi tiết</span>
                            <ExternalLinkIcon className="w-4 h-4" />
                        </Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
