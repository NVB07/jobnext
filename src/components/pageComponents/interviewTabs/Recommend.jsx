"use client";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { POST_METHOD } from "@/services/services";
// import JobCard from "../JobCard";
import JobCard from "../JobCard2";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import NoData from "@/components/pages/NoData";

const perPage = 20;
const maxVisiblePages = 5;

const fetchJobs = async ({ queryKey }) => {
    const [, page, authUserData, filters] = queryKey;
    const { address, rank, skills } = filters;

    const body = {};

    if (skills) body.skill = authUserData?.userData.profile.Skills;
    if (rank) body.jobLevel = authUserData?.userData.profile.Rank;
    if (address) body.location = authUserData?.userData.profile.Address;
    body.groupJobFunctionV3Name = authUserData?.userData.profile.Industry;
    body.review = authUserData?.userData.review;
    body.uid = authUserData?.uid;

    const result = await POST_METHOD(`jobs/search?page=${page}&perPage=${perPage}`, body);

    if (!result?.success) throw new Error("Lỗi khi tải dữ liệu");
    return result;
};

const Recommend = ({ authUserData }) => {
    const [checkbox, setCheckbox] = useState(true);
    const [adddressCheckbox, setAdddressCheckbox] = useState(true);
    const [rankCheckbox, setRankCheckbox] = useState(true);
    const [industryCheckbox, setIndustryCheckbox] = useState(true);
    const [skillsCheckbox, setSkillsCheckbox] = useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const topRef = useRef(null);

    const changeChecked = (item) => {
        if (item === "address") {
            setAdddressCheckbox((prev) => !prev);
        } else if (item === "rank") {
            setRankCheckbox((prev) => !prev);
        } else if (item === "industry") {
            setIndustryCheckbox((prev) => !prev);
        } else if (item === "skills") {
            setSkillsCheckbox((prev) => !prev);
        }
    };

    // const {
    //     data: matchingJobs,
    //     isLoading,
    //     error,
    // } = useQuery({
    //     queryKey: ["matchingJobs", currentPage, authUserData],
    //     queryFn: fetchJobs,
    //     keepPreviousData: true, // Giữ dữ liệu trang trước trong khi tải trang mới
    //     staleTime: 1000 * 60 * 15, // Cache dữ liệu trong 15 phút
    // });
    const {
        data: matchingJobs,
        isLoading,
        error,
    } = useQuery({
        queryKey: [
            "matchingJobs",
            currentPage,
            authUserData,
            {
                address: adddressCheckbox,
                rank: rankCheckbox,

                skills: skillsCheckbox,
            },
        ],
        queryFn: fetchJobs,
        keepPreviousData: true,
        staleTime: 1000 * 60 * 15,
    });

    const getPageRange = () => {
        const totalPages = matchingJobs?.pagination.totalPages || 1;
        const halfRange = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= (matchingJobs?.pagination.totalPages || 1)) {
            setCurrentPage(page);
            topRef.current?.scrollIntoView();
        }
    };

    return (
        <div className="w-full">
            <div ref={topRef} className="absolute top-0" />
            <h1 className="text-xl font-bold mb-3">Công việc phù hợp với bạn</h1>
            <div className="flex flex-col xl:flex-row gap-3">
                <div className="flex  gap-3">
                    {authUserData?.userData.profile.Address && (
                        <div className="flex items-center mb-4">
                            <Checkbox checked={adddressCheckbox} onCheckedChange={() => changeChecked("address")} id="adddressCheckbox" />
                            <Label htmlFor="adddressCheckbox" className="ml-1 cursor-pointer">
                                {authUserData?.userData.profile.Address}
                            </Label>
                        </div>
                    )}
                    {authUserData?.userData.profile.Rank && (
                        <div className="flex items-center mb-4">
                            <Checkbox checked={rankCheckbox} onCheckedChange={() => changeChecked("rank")} id="rankCheckbox" />
                            <Label htmlFor="rankCheckbox" className="ml-1 cursor-pointer">
                                {authUserData?.userData.profile.Rank}
                            </Label>
                        </div>
                    )}
                </div>
                {/* {authUserData?.userData.profile.Industry && (
                    <div className="flex items-center mb-4">
                        <Checkbox checked={industryCheckbox} onCheckedChange={() => changeChecked("industry")} id="industryCheckbox" />
                        <Label htmlFor="industryCheckbox" className="ml-1 cursor-pointer">
                            {authUserData?.userData.profile.Industry.length > 40
                                ? `${authUserData?.userData.profile.Industry.slice(0, 40)}...`
                                : authUserData?.userData.profile.Industry}
                        </Label>
                    </div>
                )} */}
                {authUserData?.userData.profile.Skills && (
                    <div className="flex items-center mb-4">
                        <Checkbox checked={skillsCheckbox} onCheckedChange={() => changeChecked("skills")} id="skillsCheckbox" />
                        <Label htmlFor="skillsCheckbox" title={authUserData?.userData.profile.Skills} className="ml-1 cursor-pointer">
                            {authUserData?.userData.profile.Skills.length > 50
                                ? `${authUserData?.userData.profile.Skills.slice(0, 50)}...`
                                : authUserData?.userData.profile.Skills}
                        </Label>
                    </div>
                )}
            </div>
            {isLoading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">Lỗi tải dữ liệu</p>}

            {matchingJobs?.data?.length > 0
                ? matchingJobs.data.map((job) => <JobCard key={job.jobId} job={job} authUserData={authUserData} />)
                : !isLoading && <NoData title="Không tìm thấy công việc nào" subTitle="Có thể tìm thấy việc làm nếu bỏ chọn bộ lọc" />}

            {matchingJobs?.pagination?.totalPages > 1 && (
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                            {getPageRange().map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink onClick={() => handlePageChange(page)} isActive={page === currentPage} className="cursor-pointer">
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={currentPage === (matchingJobs?.pagination.totalPages || 1) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <p className="w-full mt-3 text-center text-gray-500 text-sm">
                        {"("}
                        {currentPage}/{matchingJobs?.pagination.totalPages || 1}
                        {")"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Recommend;
