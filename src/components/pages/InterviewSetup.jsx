"use client";
import { useState, useContext } from "react";
import { JobContext } from "@/context/JobProvider";
import Image from "next/image";
import { useRouter } from "next13-progressbar";
import Link from "next/link";

import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { auth } from "@/firebase/firebaseConfig";
import { POST_METHOD, GET_METHOD } from "@/services/services";
const InterviewSetup = () => {
    const { jobData } = useContext(JobContext);

    const [loading, setLoading] = useState(false);
    console.log("jobData", jobData);
    const router = useRouter();

    const handleInterview = async () => {
        const user = auth.currentUser;
        const token = await user.getIdToken();
        try {
            setLoading(true);
            if (jobData) {
                const resultGet = await GET_METHOD(
                    `interviews/getInterviewByJobRequirement`,
                    { jobRequirement: jobData.jobRequirements },
                    { Authorization: `Bearer ${token}` }
                );
                if (resultGet.state) {
                    router.push(`interview/${resultGet.interviewId}`);
                } else {
                    const bodyReq = {
                        jobRequirement: jobData.jobRequirements,
                        jobRequirementsElement: jobData.jobRequirementsElement,
                        candidateDescription: jobData.candidateDescription,
                        jobId: jobData.jobId,
                        skills: jobData.skills,
                        jobTitle: jobData.jobTitle,
                        uid: jobData.uid,
                    };
                    const resultPost = await POST_METHOD("interviews", bodyReq, { Authorization: `Bearer ${token}` });
                    if (resultPost) {
                        router.push(`interview/${resultPost.interviewId}`);
                    }
                }
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching interview data:", error);
        }
    };

    if (jobData)
        return (
            <div className="flex flex-col w-full max-w-4xl pt-[75px] ">
                <div className="flex flex-col w-full h-fullrounded-lg  p-4">
                    <h2 className="text-2xl font-bold mb-4">Chuẩn bị phỏng vấn</h2>
                    <p className="mb-4 font-bold">Công việc : {jobData.jobTitle}</p>
                    <div className="w-full mb-3">
                        <p>⚠️ Để hệ thống có thể đánh giá chính xác năng lực của bạn, hãy lưu ý những điều sau:</p>
                        <ul className="list-disc list-inside text-foreground/80 text-sm pl-4">
                            <li>Đọc kỹ mô tả công việc mà bạn đã chọn.</li>
                            <li> Chuẩn bị kiến thức chuyên môn liên quan đến vị trí ứng tuyển.</li>
                            <li>Trả lời các câu hỏi một cách trung thực, đúng với năng lực và kinh nghiệm thật sự của bạn.</li>
                        </ul>
                        <p className="text-foreground/80 mt-1"> Chúc bạn có buổi phỏng vấn hiệu quả!</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {!loading ? (
                            <PulsatingButton disabled={loading} onClick={handleInterview} pulseColor="#22c55e" className="bg-green-500 font-bold ">
                                Bắt đầu phỏng vấn
                            </PulsatingButton>
                        ) : (
                            <PulsatingButton pulseColor="" className="bg-green-500 font-bold  cursor-default">
                                Đang tạo phỏng vấn ...
                            </PulsatingButton>
                        )}
                    </div>
                    <div className="w-full mt-3">
                        <div className="font-bold">Yêu cầu công việc :</div>
                        {jobData.jobRequirementsElement ? (
                            <div
                                className="text-sm text-foreground/80 border-foreground/50   mt-2"
                                dangerouslySetInnerHTML={{ __html: jobData?.jobRequirementsElement }}
                            ></div>
                        ) : (
                            <div className="text-sm text-foreground/80 border-foreground/50   mt-2"> {jobData.jobRequirements}</div>
                        )}
                    </div>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col w-full max-w-4xl pt-[75px] ">
            <div className="w-full min-h-[calc(100vh-250px)]">
                <div className="flex flex-col items-center justify-center h-full  min-[780px]:flex-row ">
                    <Image src="/nodata.svg" alt="JobNext" width={300} height={300} className="rounded-lg  min-[780px]:w-[400px]" priority />
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center mb-4">
                            <p className="text-3xl font-bold mb-2 text-center">Không có thông tin công việc!</p>
                            <p className="text-center opacity-70">Hãy tìm công việc để phỏng vấn.</p>
                            <div className=" flex flex-col md:flex-row space-x-1 items-center mt-4">
                                <Link
                                    href="/jobs?tab=recommend"
                                    className="mt-4 bg-blue-600 text-white px-2 py-1 border  hover:bg-blue500 rounded-full transition duration-200"
                                >
                                    Việc làm phù hợp
                                </Link>
                                <Link
                                    href="/jobs?tab=searchjobs"
                                    className="mt-4 px-2 py-1 bg-blue-600 text-white border hover:bg-blue-500  rounded-full transition duration-200"
                                >
                                    Tìm việc làm khác
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InterviewSetup;
