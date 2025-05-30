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

// 🚀 UPGRADED: Enhanced fetchJobs with new endpoint and fallback
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
    body.method = "transformer"; // Add method for better matching

    try {
        // 🚀 PRIMARY: Try new hybrid-search endpoint first
        console.log("🚀 Trying new hybrid-search endpoint...");
        const result = await POST_METHOD(`jobs/hybrid-search?page=${page}&perPage=${perPage}`, body);

        if (result?.success) {
            console.log(`✅ Hybrid endpoint success ${result.searchInfo?.cached ? "(cached ⚡)" : "(fresh 🔥)"}`);
            return result;
        }
        throw new Error("Hybrid endpoint failed");
    } catch (primaryError) {
        console.warn("❌ Hybrid endpoint failed, trying fallback...", primaryError.message);

        try {
            // 🗝️ FALLBACK: Use old search endpoint
            const fallbackResult = await POST_METHOD(`jobs/search?page=${page}&perPage=${perPage}`, body);

            if (!fallbackResult?.success) throw new Error("Lỗi khi tải dữ liệu");

            console.log("✅ Fallback endpoint success");
            // Add fallback indicator
            fallbackResult.searchInfo = {
                cached: false,
                method: "fallback",
                endpoint: "jobs/search",
            };

            return fallbackResult;
        } catch (fallbackError) {
            console.error("❌ Both endpoints failed:", {
                primary: primaryError.message,
                fallback: fallbackError.message,
            });
            throw new Error("Không thể tải dữ liệu công việc");
        }
    }
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

        // 🔧 FIX: Reset to page 1 when filters change to prevent empty pages
        setCurrentPage(1);
    };

    // 🔥 ENHANCED: Updated query with better caching strategy
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
        staleTime: 1000 * 60 * 5, // Reduced from 15 to 5 minutes for fresher data
        cacheTime: 1000 * 60 * 30, // Keep in cache for 30 minutes
        refetchOnWindowFocus: false, // Don't refetch on window focus
        retry: 1, // Only retry once since we have fallback in fetchJobs
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

    // 🎨 NEW: Cache status indicator component
    const CacheStatusIndicator = () => {
        if (!matchingJobs?.searchInfo) return null;

        const { cached, method, endpoint } = matchingJobs.searchInfo;

        // if (cached) {
        //     return (
        //         <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded-lg">
        //             <div className="flex items-center gap-2 text-sm text-green-700">
        //                 <span className="text-lg">⚡</span>
        //                 <span className="font-medium">Kết quả được tải từ cache - Siêu nhanh!</span>
        //             </div>
        //         </div>
        //     );
        // }

        // if (method === "fallback") {
        //     return (
        //         <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
        //             <div className="flex items-center gap-2 text-sm text-yellow-700">
        //                 <span className="text-lg">🔄</span>
        //                 <span className="font-medium">Sử dụng endpoint dự phòng</span>
        //             </div>
        //         </div>
        //     );
        // }

        return (
            <div className="mb-3 p-2 bg-blue-50/10 border rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-500">
                    <span className="text-lg">🔥</span>
                    <span className="font-medium">Kết quả mới nhất</span>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full">
            <div ref={topRef} className="absolute top-0" />
            <h1 className="text-xl font-bold mb-3">Công việc phù hợp với bạn</h1>

            {/* 🚀 NEW: Performance status indicator */}
            <CacheStatusIndicator />

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

            {/* 🔄 ENHANCED: Better loading and error states */}
            {isLoading && (
                <div className="flex items-center gap-2 p-4 text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span>Đang tìm kiếm công việc phù hợp...</span>
                </div>
            )}

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 font-medium">⚠️ Lỗi tải dữ liệu</p>
                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                </div>
            )}

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
                        {/* 🆕 NEW: Show total jobs count */}
                        {matchingJobs?.pagination?.totalJobs && <span className="ml-2">• {matchingJobs.pagination.totalJobs} công việc</span>}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Recommend;
