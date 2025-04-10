"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { POST_METHOD } from "@/services/services";
import JobCard from "./JobCard";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SearchBar({ authUserData }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [jobCategory, setJobCategory] = useState("");
    const [experienceLevel, setExperienceLevel] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [allJobs, setAllJobs] = useState({ data: [], pagination: {} });
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const topRef = useRef(null);
    const popoverRef = useRef(null);

    const perPage = 10;
    const maxVisiblePages = 5;

    const getPageRange = () => {
        const totalPages = allJobs.pagination.totalPages;
        const halfRange = Math.floor(maxVisiblePages / 2); // 2 trang trước, 2 trang sau
        let start = Math.max(1, currentPage - halfRange);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        // Điều chỉnh nếu ở đầu hoặc cuối
        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    useEffect(() => {
        const fetchBlogs = async () => {
            const result = await POST_METHOD(`jobs/search-no-match?page=${currentPage}&perPage=${perPage}`, {});
            if (result?.success) {
                setAllJobs(result);
            }
        };
        fetchBlogs();
    }, []);

    // Hàm chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= allJobs.pagination.totalPages) {
            setCurrentPage(page);
            topRef.current?.scrollIntoView();
        }
    };

    const activeFiltersCount = [location, jobCategory, experienceLevel].filter(Boolean).length;
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const handleLocationChange = useCallback((value) => {
        setLocation(value);
    }, []);

    const handleJobCategoryChange = useCallback((value) => {
        setJobCategory(value);
    }, []);

    const handleExperienceLevelChange = useCallback((value) => {
        setExperienceLevel(value);
    }, []);

    useEffect(() => {
        const getJobFilter = async () => {
            const result = await POST_METHOD(`jobs/search-no-match?page=${currentPage}&perPage=${perPage}`, {
                skill: searchQuery,
                location: location,
                category: jobCategory,
                jobLevel: experienceLevel,
            });
            if (result?.success) {
                setAllJobs(result);
            }
        };
        getJobFilter();
    }, [currentPage]);

    const handleSearch = useCallback(
        async (e) => {
            setCurrentPage(1);
            e.preventDefault();
            console.log({
                searchQuery,
                location,
                jobCategory,
                experienceLevel,
            });
            const result = await POST_METHOD(`jobs/search-no-match?page=${1}&perPage=${perPage}`, {
                skill: searchQuery,
                location: location,
                category: jobCategory,
                jobLevel: experienceLevel,
            });
            if (result?.success) {
                setAllJobs(result);
                topRef.current?.scrollIntoView();
            }
        },
        [searchQuery, location, jobCategory, experienceLevel]
    );

    const clearLocation = () => setLocation("");
    const clearJobCategory = () => setJobCategory("");
    const clearExperienceLevel = () => setExperienceLevel("");

    return (
        <div className="w-full">
            <div ref={topRef} className="absolute top-0" />
            <form
                onSubmit={handleSearch}
                className="sticky bg-background z-[50] w-auto top-[70px] ml-14 -mt-[70px] min-[490px]:top-[76px] md:w-full md:pt-[84px] md:-mt-[84px] md:ml-0 md:top-0 md:pb-2"
            >
                <div className="flex items-center gap-2 p-2 rounded-lg border">
                    <div className="relative flex-1 flex items-center">
                        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Tìm kiếm việc làm, kỹ năng"
                            className="pl-9 border-none shadow-none focus-visible:ring-0"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />

                        {/* Selected filters display */}
                        <div className="min-[990px]:flex items-center gap-1 ml-2 hidden">
                            {location && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-foreground/10 rounded-md text-sm">
                                    <span className="truncate max-w-[100px]">{vietnameseProvinces.find((p) => p === location) || location}</span>
                                    <button type="button" onClick={clearLocation} className="text-gray-500 hover:text-gray-700">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            )}

                            {jobCategory && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-foreground/10 rounded-md text-sm">
                                    <span className="truncate max-w-[100px]">{jobCategoriesMap[jobCategory] || jobCategory}</span>
                                    <button type="button" onClick={clearJobCategory} className="text-gray-500 hover:text-gray-700">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            )}

                            {experienceLevel && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-foreground/10 rounded-md text-sm">
                                    <span className="truncate max-w-[100px]">{experienceLevelsMap[experienceLevel] || experienceLevel}</span>
                                    <button type="button" onClick={clearExperienceLevel} className="text-gray-500 hover:text-gray-700">
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Filters popover */}
                    <div ref={popoverRef}>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 relative bg-foreground/5" type="button" onClick={() => setIsOpen(!isOpen)}>
                                    <SlidersHorizontal className="h-4 w-4 text-foreground/70" />
                                    <p className="absolute pr-1 bottom-0 text-sm right-0">{activeFiltersCount}</p>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80  p-4" alignOffset={-53} align="end">
                                <div className="grid gap-4 w-full">
                                    <div className="space-y-2 w-full ">
                                        <h4 className="font-medium text-sm">Địa điểm</h4>
                                        <div className="flex gap-1">
                                            <Select value={location} className="w-full" onValueChange={handleLocationChange}>
                                                <SelectTrigger>
                                                    <div className="truncate text-left">
                                                        <SelectValue placeholder="Chọn địa điểm" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent align="end">
                                                    <SelectGroup>
                                                        {vietnameseProvinces.map((province) => (
                                                            <SelectItem key={province} value={province}>
                                                                {province}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Button variant="ghost" onClick={clearLocation} className="h-9 w-9 bg-foreground/10">
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm">Ngành nghề</h4>
                                        <div className="flex gap-1">
                                            <Select value={jobCategory} className="w-full" onValueChange={handleJobCategoryChange}>
                                                <SelectTrigger className="w-full">
                                                    <div className="truncate w-[200px] text-left">
                                                        <SelectValue placeholder="Chọn ngành nghề" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent align="end">
                                                    <SelectGroup>
                                                        {Object.entries(jobCategoriesMap).map(([value, label]) => (
                                                            <SelectItem key={value} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Button variant="ghost" onClick={clearJobCategory} className="h-9 w-9 bg-foreground/10">
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="font-medium text-sm">Kinh nghiệm</h4>
                                        <div className="flex gap-1">
                                            <Select value={experienceLevel} className="flex-1" onValueChange={handleExperienceLevelChange}>
                                                <SelectTrigger>
                                                    <div className="truncate w-[200px] text-left">
                                                        <SelectValue placeholder="Chọn kinh nghiệm" />
                                                    </div>
                                                </SelectTrigger>
                                                <SelectContent align="end">
                                                    <SelectGroup>
                                                        {Object.entries(experienceLevelsMap).map(([value, label]) => (
                                                            <SelectItem key={value} value={value}>
                                                                {label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Button variant="ghost" onClick={clearExperienceLevel} className="h-9 w-9 bg-foreground/10">
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Search button */}
                    <Button type="submit" size="icon" className="h-9 w-9 min-h-9 min-w-9 ">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </form>
            <div className="w-full">
                {allJobs?.data?.length > 0
                    ? allJobs.data.map((job) => <JobCard key={job.jobId} job={job} authUserData={authUserData} />)
                    : !loading && <p>Không có job</p>}
            </div>
            {allJobs?.data?.length > 0 && (
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
                                    className={currentPage === (allJobs?.pagination.totalPages || 1) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                    <p className="w-full mt-3 text-center text-gray-500 text-sm">
                        {"("}
                        {currentPage}/{allJobs?.pagination.totalPages || 1}
                        {")"}
                    </p>
                </div>
            )}
        </div>
    );
}

const vietnameseProvinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
];

const jobCategoriesMap = {
    "Academic/Education": "Học thuật/Giáo dục",
    "Accounting/Auditing": "Kế toán/Kiểm toán",
    "Administration/Office Support": "Hành chính/Hỗ trợ văn phòng",
    "Agriculture/Livestock/Fishery": "Nông nghiệp/Chăn nuôi/Thủy sản",
    "Architecture/Construction": "Kiến trúc/Xây dựng",
    "Art, Media & Printing/Publishing": "Nghệ thuật, Truyền thông & In ấn/Xuất bản",
    "Banking & Financial Services": "Ngân hàng & Dịch vụ tài chính",
    "CEO & General Management": "CEO & Quản lý chung",
    "Customer Service": "Dịch vụ khách hàng",
    Design: "Thiết kế",
    "Engineering & Sciences": "Kỹ thuật & Khoa học",
    "Food and Beverage": "Thực phẩm và Đồ uống",
    "Government/NGO": "Chính phủ/Tổ chức phi chính phủ",
    "Healthcare/Medical Services": "Chăm sóc sức khỏe/Dịch vụ y tế",
    "Hospitality/Tourism": "Khách sạn/Du lịch",
    "Human Resources/Recruitment": "Nhân sự/Tuyển dụng",
    "Information Technology/Telecommunications": "Công nghệ thông tin/Viễn thông",
    Insurance: "Bảo hiểm",
    Legal: "Pháp lý",
    "Logistics/Import Export/Warehouse": "Hậu cần/Xuất nhập khẩu/Kho bãi",
    Manufacturing: "Sản xuất",
    "Marketing, Advertising/Communications": "Marketing, Quảng cáo/Truyền thông",
    Pharmacy: "Dược phẩm",
    "Real Estate": "Bất động sản",
    "Retail/Consumer Products": "Bán lẻ/Sản phẩm tiêu dùng",
    Sales: "Bán hàng",
    Technician: "Kỹ thuật viên",
    "Textiles, Garments/Footwear": "Dệt may, May mặc/Giày dép",
    Transportation: "Vận tải",
    Others: "Khác",
};

const experienceLevelsMap = {
    "Intern/Student": "Thực tập sinh/Sinh viên",
    "Fresher/Entry level": "Mới tốt nghiệp/Mới vào nghề",
    "Experienced (non-manager)": "Có kinh nghiệm (không phải quản lý)",
    Manager: "Quản lý",
    "Director and above": "Giám đốc trở lên",
};
