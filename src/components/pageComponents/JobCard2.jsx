"use client";

import { BookmarkIcon, BuildingIcon, MapPinIcon, ExternalLinkIcon, Loader2, Eye } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import Image from "next/image";
import { useState, useContext, useCallback } from "react";
import { useRouter } from "next13-progressbar";
import { toast } from "sonner";
import Link from "next/link";
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
            const jobDesContent = jobDes.querySelector(".sc-1671001a-6.dVvinc");
            const jobReqContent = jobReq.querySelector(".sc-1671001a-6.dVvinc");

            // setJobDescription(jobDes.innerText.trim().replaceAll("•	", " "));
            // setJobRequirements(jobReq.innerText.trim().replaceAll("•	", " "));
            setJobDescription(
                jobDesContent.innerHTML
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/p>/gi, "\n")
                    .replaceAll("", "-")
                    .replace(/<[^>]+>/g, "")
                    .trim()
            );
            setJobRequirements(
                jobReqContent.innerHTML
                    .replace(/<br\s*\/?>/gi, "\n")
                    .replace(/<\/p>/gi, "\n")
                    .replaceAll("", "-")
                    .replace(/<[^>]+>/g, "")
                    .trim()
            );
        }
    };

    const handleOpen = async (val) => {
        setShowDetail(val);
        if (val) {
            setLoading(true);
            if (job.jobSource !== "admin") {
                await getDetail();
            } else {
                setJobDescription(job.description);
                setJobRequirements(job.jobRequirement);
            }
            setLoading(false);
        } else {
            setJobDescription(null);
            setJobRequirements(null);
        }
    };

    const handleInterview = () => {
        if (job.jobSource !== "admin") {
            if (JobRequirements) {
                setJobData({
                    uid: authUserData?.uid,
                    jobId: job.jobId,
                    jobTitle: job.title,
                    skills: job.skills,
                    jobRequirements: JobRequirements,
                    candidateDescription: authUserData?.userData.review,
                    jobSource: job.jobSource,
                });
                router.push("/jobs/interview");
            }
        } else {
            setJobData({
                uid: authUserData?.uid,
                jobId: job.jobId,
                jobSource: job.jobSource,
                jobTitle: job.title,
                skills: job.skills,
                jobRequirements: job.jobRequirement,
                jobRequirementsElement: job.jobRequirement,
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
        // Use hybridScore from matchData if available, otherwise fallback to semanticScore
        const displayScore = job.matchData?.hybridScore ? parseFloat(job.matchData.hybridScore) : job.semanticScore;

        if (displayScore >= 80) {
            return "url(#gradient-high)";
        } else if (displayScore >= 60) {
            return "url(#gradient-medium)";
        } else {
            return "url(#gradient-low)";
        }
    };

    // Get the display score for rendering
    const getDisplayScore = () => {
        // Priority: hybridScore > semanticScore
        if (job.matchData?.hybridScore) {
            return Math.round(parseFloat(job.matchData.hybridScore));
        }
        return Math.round(job.semanticScore || 0);
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

                                    {/* AI Detected Skills */}
                                    {job.matchData && job.matchData.detectedSkills && job.matchData.detectedSkills.length > 0 && (
                                        <>
                                            {job.matchData.detectedSkills.slice(0, 3).map((skill, index) => {
                                                // Only show if not already in job.skills
                                                if (!job.skills.toLowerCase().includes(skill.toLowerCase())) {
                                                    return (
                                                        <Badge
                                                            key={`detected-${index}`}
                                                            className="bg-gradient-to-r from-gray-400 to-gray-500 text-white border border-gray-300 shadow-sm opacity-75"
                                                        >
                                                            🔍 {skill}
                                                        </Badge>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </>
                                    )}
                                </div>

                                {/* AI Skills Info */}
                                {job.matchData && job.matchData.detectedSkills && job.matchData.detectedSkills.length > 0 && (
                                    <div className="text-xs text-gray-500 mt-1">🔍 AI phát hiện thêm {job.matchData.detectedSkills.length} kỹ năng</div>
                                )}
                            </div>
                        </div>

                        <div className="mt-5 md:mt-0 md:ml-6 flex flex-col items-center justify-start">
                            {(job.semanticScore || job.matchData?.hybridScore) && (
                                <>
                                    <div className="relative w-20 h-20 group cursor-help">
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
                                                strokeDasharray={`${(2 * Math.PI * 45 * getDisplayScore()) / 100} ${2 * Math.PI * 45 * (1 - getDisplayScore() / 100)}`}
                                                strokeDashoffset={2 * Math.PI * 45 * 0.25}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-base font-bold bg-gradient-to-r from-purple-500 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                                                {getDisplayScore()}%
                                            </span>
                                        </div>

                                        {/* Hover Tooltip for Score Breakdown */}
                                        {job.matchData && job.matchData.breakdown && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg min-w-48">
                                                    <div className="font-semibold text-center mb-2">Score Breakdown</div>
                                                    <div className="space-y-1">
                                                        <div className="flex justify-between">
                                                            <span className="text-purple-300">Semantic:</span>
                                                            <span>{job.matchData.breakdown.semantic}%</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-green-300">Keywords:</span>
                                                            <span>{job.matchData.breakdown.tfidf}%</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-blue-300">Skills:</span>
                                                            <span>{job.matchData.breakdown.skillMatch}%</span>
                                                        </div>
                                                        {job.matchData.detectedSkills && job.matchData.detectedSkills.length > 0 && (
                                                            <div className="border-t border-gray-700 pt-2 mt-2">
                                                                <div className="text-gray-300 text-xs">Detected Skills:</div>
                                                                <div className="text-xs text-gray-400">
                                                                    {job.matchData.detectedSkills.slice(0, 3).join(", ")}
                                                                    {job.matchData.detectedSkills.length > 3 && "..."}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {/* Arrow */}
                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Fallback tooltip for non-hybrid scores */}
                                        {job.matchData && !job.matchData.breakdown && job.semanticScore && (
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                                                <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg min-w-32">
                                                    <div className="font-semibold text-center mb-1">Match Score</div>
                                                    <div className="text-center">
                                                        <span className="text-purple-300">{job.matchData.method === "hybrid" ? "Hybrid" : "Semantic"}:</span>
                                                        <span className="ml-2">{getDisplayScore()}%</span>
                                                    </div>
                                                    {job.matchData.detectedSkills && job.matchData.detectedSkills.length > 0 && (
                                                        <div className="border-t border-gray-700 pt-2 mt-2">
                                                            <div className="text-gray-300 text-xs">Detected Skills:</div>
                                                            <div className="text-xs text-gray-400">
                                                                {job.matchData.detectedSkills.slice(0, 2).join(", ")}
                                                                {job.matchData.detectedSkills.length > 2 && "..."}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {/* Arrow */}
                                                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs font-medium mt-1 text-center">
                                        <div>Mức độ phù hợp</div>
                                        {/* Method Indicator */}
                                        {job.matchData && job.matchData.method && (
                                            <div className="flex items-center justify-center mt-1">
                                                {job.matchData.method === "hybrid" && (
                                                    <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-sm">
                                                        🧠 Hybrid
                                                    </span>
                                                )}
                                                {job.matchData.method === "transformer" && (
                                                    <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-sm">
                                                        🤖 AI
                                                    </span>
                                                )}
                                                {job.matchData.method === "tfidf" && (
                                                    <span className="text-xs px-2 py-0.5 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full shadow-sm">
                                                        ⚡ Fast
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <p className="text-sm mt-3 text-foreground/70">Hết hạn vào {new Date(job.expiredOn).toLocaleDateString("vi-VN")}</p>
                    <div className="flex justify-between mt-6">
                        <div className="flex items-center gap-2">
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
                                        <span className="mr-2">Xem nhanh</span>
                                        <Eye className="w-4 h-4" />
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

                                            {/* Score Information in Dialog */}
                                            {(job.semanticScore || job.matchData?.hybridScore) && (
                                                <div className="flex items-center gap-3 mt-2 p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100 w-full">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                            {getDisplayScore()}%
                                                        </span>
                                                        {job.matchData && job.matchData.method && (
                                                            <span
                                                                className={`text-xs px-2 py-1 rounded-full text-white ${
                                                                    job.matchData.method === "hybrid"
                                                                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                                                                        : job.matchData.method === "transformer"
                                                                        ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                                                        : "bg-gradient-to-r from-green-500 to-blue-500"
                                                                }`}
                                                            >
                                                                {job.matchData.method === "hybrid"
                                                                    ? "🧠 Hybrid"
                                                                    : job.matchData.method === "transformer"
                                                                    ? "🤖 AI"
                                                                    : "⚡ Fast"}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Detailed Breakdown */}
                                                    {job.matchData && job.matchData.breakdown && (
                                                        <div className="flex-1 grid grid-cols-3 gap-2 text-xs">
                                                            <div className="text-center">
                                                                <div className="text-purple-600 font-medium">{job.matchData.breakdown.semantic}%</div>
                                                                <div className="text-gray-500">Semantic</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-green-600 font-medium">{job.matchData.breakdown.tfidf}%</div>
                                                                <div className="text-gray-500">Keywords</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-blue-600 font-medium">{job.matchData.breakdown.skillMatch}%</div>
                                                                <div className="text-gray-500">Skills</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <ScrollArea className="h-screen p-3">
                                        {!loading ? (
                                            job.jobSource !== "admin" && (jobDescription || JobRequirements) ? (
                                                <div className="w-full h-fit">
                                                    {/* <p className="text-sm text-foreground/80" dangerouslySetInnerHTML={{ __html: jobDescription?.innerHTML }}></p>
                                                <p
                                                    className="text-sm text-foreground/80 border-foreground/50 border-t pt-3 mt-2"
                                                    dangerouslySetInnerHTML={{ __html: JobRequirements?.innerHTML }}
                                                ></p> */}
                                                    <div className="flex flex-col gap-2">
                                                        <h1 className="text-lg font-bold">Mô tả công việc</h1>
                                                        <p className="text-sm text-foreground/80 whitespace-pre-line">{jobDescription}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 border-foreground/50 border-t pt-3 mt-2">
                                                        <h1 className="text-lg font-bold">Yêu cầu công việc</h1>
                                                        <p className="text-sm text-foreground/80  whitespace-pre-line">{JobRequirements}</p>
                                                    </div>
                                                </div>
                                            ) : job.jobSource === "admin" && (jobDescription || JobRequirements) ? (
                                                <div className="w-full h-fit">
                                                    <div className="flex flex-col gap-2">
                                                        <h1 className="text-lg font-bold">Mô tả công việc</h1>
                                                        <p className="text-sm text-foreground/80 whitespace-pre-line">{job.description}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 border-foreground/50 border-t pt-3 mt-2">
                                                        <h1 className="text-lg font-bold">Yêu cầu công việc</h1>
                                                        <p className="text-sm text-foreground/80  whitespace-pre-line">{job.jobRequirement}</p>
                                                    </div>
                                                    <div className="flex flex-col gap-2 border-foreground/50 border-t pt-3 mt-2">
                                                        <h1 className="text-lg font-bold">Ứng tuyển</h1>
                                                        <p className="text-sm text-foreground/80  whitespace-pre-line">{job.contact}</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center text-orange-500 font-bold">Công việc đã hết hạn hoặc bị xóa</div>
                                            )
                                        ) : (
                                            "Loading..."
                                        )}
                                    </ScrollArea>
                                    <DialogFooter className={"flex flex-row justify-between items-end px-3 pb-3"}>
                                        {job?.url && (
                                            <a
                                                href={job.url || "#"}
                                                target="_blank"
                                                className="border border-green-500 text-green-500 inline-block px-2 py-1 rounded-full text-sm  hover:bg-accent "
                                            >
                                                Truy cập job {">>"}
                                            </a>
                                        )}
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
                        </div>
                        <Link
                            href={`/jobs/${job._id}`}
                            className="flex items-center justify-center gap-2 rounded-full border px-2 h-8 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            <span className="mr-2">Xem chi tiết</span>
                            <ExternalLinkIcon className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
