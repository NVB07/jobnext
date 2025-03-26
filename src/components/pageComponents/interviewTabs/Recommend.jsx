"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";

import { Bookmark, BookmarkCheck, Ellipsis, Link2, Flag, Trash2 } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { getData } from "@/services/services";
const Recommend = () => {
    const matchingJobs = [
        {
            id: 1,
            title: "React Developer",
            link: "https://github.com/",
            company: "Digital Solutions",
            location: "Hà Nội",
            experience: "2-4 năm",
            logo: "/logo.png",
        },
        {
            id: 2,
            title: "Frontend Engineer Frontend Engineer Frontend Engineer Frontend Engineer Frontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend EngineerFrontend Engineer",
            link: "https://github.com/",
            company: "Tech Innovators",
            location: "Hồ Chí Minh",
            experience: "1-3 năm",
            logo: "/logo.png",
        },
        {
            id: 3,
            title: "Frontend Engineer",
            link: "https://github.com/",
            company: "Tech Innovators",
            location: "Hồ Chí Minh",
            experience: "1-3 năm",
            logo: "/logo.png",
        },
        {
            id: 4,
            title: "Frontend Engineer",
            link: "https://github.com/",
            company: "Tech Innovators",
            location: "Hồ Chí Minh",
            experience: "1-3 năm",
            logo: "/logo.png",
        },
        {
            id: 5,
            title: "Frontend Engineer",
            link: "https://github.com/",
            company: "Tech Innovators",
            location: "Hồ Chí Minh",
            experience: "1-3 năm",
            logo: "/logo.png",
        },
        {
            id: 6,
            title: "Frontend Engineer",
            link: "https://github.com/",
            company: "Tech Innovators",
            location: "Hồ Chí Minh",
            experience: "1-3 năm",
            logo: "/logo.png",
        },
    ];

    return (
        <div className="w-full ">
            <h1 className="text-xl font-bold mb-3">Công việc phù hợp với kĩ năng của bạn</h1>
            <div>
                {matchingJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};

export default Recommend;

function JobCard({ job }) {
    return (
        <div className="w-full border rounded-xl  mb-4 p-3">
            <div className="flex ">
                <Image className="w-16  h-16 md:w-28 md:h-28 rounded-md mr-4" width={84} height={84} src={job.logo} alt={job.company} />
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <div className="flex-1 pr-3">
                            <h2 className="text-base font-bold text-wrap  truncate line-clamp-2">{job.title}</h2>
                            <p className="text-sm text-gray-500 text-wrap  truncate line-clamp-2">{job.company}</p>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 w-8 rounded-full border-none flex items-center justify-center">
                            <Bookmark className="!w-5 !h-5" />
                            {/* <BookmarkCheck className="!w-5 !h-5" /> */}
                        </Button>
                    </div>
                    <div className="flex flex-col w-full mt-2">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2">
                            <p className="text-sm border w-fit px-2 py-1 rounded-full mb-1 md:mb-0 text-gray-500">{job.location}</p>
                            <p className="text-sm hidden md:block  text-gray-500">•</p>
                            <p className="text-sm border px-2 py-1 rounded-full w-fit  text-gray-500">{job.experience} kinh nghiệm</p>
                        </div>
                        <div className="flex ">
                            <div className="flex flex-col md:flex-row md:items-center md:space-x-2 mb-2">
                                <p className="text-sm border w-fit px-2 py-1 rounded-full mb-1 md:mb-0 text-gray-500">3-5tr</p>
                                <p className="text-sm hidden md:block  text-gray-500">•</p>
                                <p className="text-sm border px-2 py-1 rounded-full w-fit  text-gray-500">Phù hợp với bạn: 35%</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">Đăng 1 tuần trước</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
