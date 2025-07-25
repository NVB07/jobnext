"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Building, MapPin, Loader2, ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { JobContext } from "@/context/JobProvider";
import { AuthContext } from "@/context/AuthContextProvider";

import { GET_METHOD } from "@/services/services";

export default function JobDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { authUserData } = useContext(AuthContext);
    const { setJobData } = useContext(JobContext);
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [jobDescription, setJobDescription] = useState(null);
    const [jobRequirements, setJobRequirements] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [imgError, setImgError] = useState(false);

    // Fetch user data

    // Fetch job data
    useEffect(() => {
        async function fetchJobData() {
            try {
                setLoading(true);
                const jobData = await GET_METHOD(`jobs/${id}`);

                setJob(jobData);
                // If job has URL, try to fetch detailed content
                if (jobData.url && jobData.jobSource !== "admin") {
                    fetchJobDetails(jobData.url);
                } else {
                    setJobDescription(jobData.description);
                    setJobRequirements(jobData.jobRequirement);
                }
            } catch (error) {
                console.error("Error fetching job:", error);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchJobData();
        }
    }, [id]);

    // Fetch job details from the source URL
    const fetchJobDetails = async (url) => {
        try {
            setDetailLoading(true);
            const response = await fetch("/api/jobdetail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url }),
            });

            const result = await response.json();
            if (result.success && result.data) {
                // Data is already processed on server side
                setJobDescription(result.data.jobDescription);
                setJobRequirements(result.data.jobRequirements);
            } else {
                console.error("Failed to fetch job details:", result.error);
                // Set fallback content
                setJobDescription("Không thể tải mô tả công việc từ nguồn gốc");
                setJobRequirements("Không thể tải yêu cầu công việc từ nguồn gốc");
            }
        } catch (error) {
            console.error("Error fetching job details:", error);
            setJobDescription("Không thể tải mô tả công việc từ nguồn gốc");
            setJobRequirements("Không thể tải yêu cầu công việc từ nguồn gốc");
        } finally {
            setDetailLoading(false);
        }
    };

    // Handle image error
    const handleImageError = () => {
        setImgError(true);
    };

    // Handle interview
    const handleInterview = () => {
        if (!authUserData) {
            toast.error("Bạn cần đăng nhập để phỏng vấn");
            return;
        }

        if (job.jobSource !== "admin") {
            if (jobRequirements) {
                setJobData({
                    uid: authUserData?.uid,
                    jobId: job.jobId,
                    jobTitle: job.title,
                    skills: job.skills,
                    jobRequirements: jobRequirements,
                    jobRequirementsElement: jobRequirements,
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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Đang tải thông tin công việc...</p>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-red-500 font-medium">Không tìm thấy thông tin công việc</p>
                <Link href="/jobs" className="mt-4">
                    <Button variant="outline" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Quay lại danh sách công việc
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-6 max-w-5xl mt-16">
            <div className="flex justify-between items-center mb-6">
                <Link href="/jobs">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Quay lại</span>
                    </Button>
                </Link>
            </div>

            <Card className="mb-6 border-foreground/30 shadow-sm">
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                    <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-lg flex items-center justify-center bg-white border border-gray-100 p-1">
                        <img
                            className="w-full h-full object-contain"
                            width={150}
                            height={150}
                            src={imgError ? "/company-default-logo.svg" : job.companyLogo || "/company-default-logo.svg"}
                            alt={job.company}
                            onError={handleImageError}
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-blue-500 mb-2">{job.title}</h1>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center text-foreground/80">
                                <Building className="h-4 w-4 mr-2 text-blue-600" />
                                <span>{job.company}</span>
                            </div>
                            <div className="flex items-center text-foreground/80">
                                <MapPin className="h-4 w-4 mr-2 text-pink-600" />
                                <span>{job.locationVI || job.location}</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4 mt-2 text-sm">
                        <div>
                            <span className="font-medium">Ngành nghề:</span>
                            <span className="ml-2">{job.groupJobFunctionV3NameVI || job.groupJobFunctionV3Name || "N/A"}</span>
                        </div>
                        <div>
                            <span className="font-medium">Mức lương:</span>
                            <span className="ml-2 font-semibold text-green-600">{job.salary || "Thỏa thuận"}</span>
                        </div>
                        <div>
                            <span className="font-medium">Cấp bậc:</span>
                            <span className="ml-2">{job.jobLevelVI || job.jobLevel || "N/A"}</span>
                        </div>
                        <div>
                            <span className="font-medium">Ngày hết hạn:</span>
                            <span className="ml-2">{job.expiredOn ? new Date(job.expiredOn).toLocaleDateString("vi-VN") : "N/A"}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card className="mb-6 border-foreground/30 shadow-sm">
                <CardHeader>
                    <h2 className="text-lg font-semibold">Hành động</h2>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex items-center gap-2 mb-3 px-3">
                        <div className="flex items-center gap-2  ">
                            <Button
                                onClick={handleInterview}
                                size="sm"
                                className="rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 hover:from-purple-700 hover:via-pink-700 hover:to-orange-700 text-white border-0 shadow-md"
                            >
                                Phỏng vấn
                            </Button>
                        </div>

                        {job.url && (
                            <div className=" pl-2 border-l border-foreground/70">
                                <a
                                    href={job.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs gap-1 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 px-4 py-2 rounded-full text-white hover:from-blue-700 hover:via-blue-800 hover:to-blue-900"
                                >
                                    <span>Mở trang gốc</span>
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {job.skills && (
                <Card className="mb-6 border-foreground/30 shadow-sm">
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Kỹ năng yêu cầu</h2>
                    </CardHeader>
                    <CardContent className="pt-0">
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
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 gap-6">
                {detailLoading ? (
                    <Card className="border-foreground/30 shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                            <p className="text-muted-foreground">Đang tải nội dung chi tiết...</p>
                        </CardContent>
                    </Card>
                ) : jobDescription || jobRequirements ? (
                    <>
                        {jobDescription && (
                            <Card className="border-foreground/30 shadow-sm">
                                <CardHeader>
                                    <h2 className="text-lg font-semibold">Mô tả công việc</h2>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-base text-foreground/80 whitespace-pre-line">{jobDescription}</p>
                                </CardContent>
                            </Card>
                        )}

                        {jobRequirements && (
                            <Card className="border-foreground/30 shadow-sm">
                                <CardHeader>
                                    <h2 className="text-lg font-semibold">Yêu cầu công việc</h2>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-base text-foreground/80 whitespace-pre-line">{jobRequirements}</p>
                                </CardContent>
                            </Card>
                        )}
                    </>
                ) : job.url ? (
                    <Card className="border-foreground/30 shadow-sm">
                        <CardContent className="py-8 text-center">
                            <p className="text-orange-500 font-medium mb-2">Không thể tải nội dung chi tiết từ nguồn gốc.</p>
                            <p className="text-sm text-muted-foreground">
                                Bạn có thể xem thông tin đầy đủ tại trang gốc bằng cách nhấp vào nút &quot;Mở trang gốc &quot; phía trên.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-foreground/30 shadow-sm">
                        <CardContent className="py-8 text-center">
                            <p className="text-orange-500 font-medium">Công việc không có URL liên kết với nguồn gốc.</p>
                            <p className="text-sm text-muted-foreground mt-2">Không có thông tin chi tiết bổ sung.</p>
                        </CardContent>
                    </Card>
                )}

                {job.contact && (
                    <Card className="border-foreground/30 shadow-sm">
                        <CardHeader>
                            <h2 className="text-lg font-semibold">Ứng tuyển</h2>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <p className="text-base text-foreground/80 whitespace-pre-line">{job.contact}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
