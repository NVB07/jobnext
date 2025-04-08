"use client";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { JobContext } from "@/context/JobProvider";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
const CustomInterview = ({ authUserData }) => {
    const { setJobData } = useContext(JobContext);
    const [checkbox, setCheckbox] = useState(true);
    const [jobTitle, setJobTitle] = useState("");
    const [jobDes, setJobDes] = useState("");
    const [candidate, setCandidate] = useState("");
    const router = useRouter();

    const changeChecked = () => {
        setCheckbox((prev) => !prev);
    };

    const handleData = () => {
        if (!jobTitle.trim()) {
            toast.error("Phải điền tên công việc");
            return;
        }
        if (!jobDes.trim()) {
            toast.error("Phải điền mô tả công việc");
            return;
        }
        if (!candidate.trim() && !checkbox) {
            toast.error("Phải điền thông tin mô tả về bạn");
            return;
        }

        if (jobTitle.trim() && jobDes.trim() && checkbox) {
            setJobData({
                uid: authUserData?.uid,
                jobTitle: jobTitle.trim(),
                jobRequirements: jobDes.trim(),
                candidateDescription: authUserData?.userData.textData.review,
            });
            router.push("/jobs/interview");
        }
        if (jobTitle.trim() && jobDes.trim() && !checkbox) {
            setJobData({
                uid: authUserData?.uid,
                jobTitle: jobTitle.trim(),
                jobRequirements: jobDes.trim(),
                candidateDescription: candidate.trim(),
            });
            router.push("/jobs/interview");
        }
        return;
    };

    return (
        <div className="w-full">
            <h1 className="text-xl font-bold mb-3">Tạo phỏng vấn với thông tin tùy chỉnh</h1>
            <div className="mb-4">
                <div className="font-bold">
                    <span className="text-red-500">*</span> Tên công việc
                </div>
                <div className="flex flex-col items-center min-[490px]:flex-row ">
                    <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Tiêu đề công việc" className="h-11  min-[490px]:mr-3 !text-base" />
                    <RainbowButton onClick={handleData} className="font-bold min-w-full mt-3  min-[490px]:mt-0 min-[490px]:min-w-fit rounded-md">
                        Tạo phỏng vấn
                    </RainbowButton>
                </div>
            </div>
            <div className="mb-4">
                <div className="font-bold">
                    <span className="text-red-500">*</span> Yêu cầu công việc
                </div>
                <Textarea
                    value={jobDes}
                    onChange={(e) => setJobDes(e.target.value)}
                    placeholder="Yêu cầu công việc, mô tả công việc"
                    className="w-full !text-base min-h-56"
                />
            </div>
            <div className="mb-4">
                <div className="font-bold">
                    <span className="text-red-500">*</span> Thông tin của bạn
                </div>
                <div className="flex mt-2 mb-3 items-center">
                    <Checkbox checked={checkbox} onCheckedChange={() => changeChecked()} id="useMyData" />
                    <Label htmlFor="useMyData" className="ml-1 cursor-pointer">
                        Dùng thông tin đã tải lên
                    </Label>
                </div>
                {!checkbox && (
                    <>
                        <Textarea
                            value={candidate}
                            onChange={(e) => setCandidate(e.target.value)}
                            placeholder="Mô tả về kiến thức, kĩ năng, kinh nghiệm"
                            className="w-full !text-base min-h-56"
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomInterview;
