"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileText, Info, Calendar, MapPin, GraduationCap } from "lucide-react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import Link from "next/link";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import NoData from "./NoData";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CVAnalysis() {
    const { authUserData } = useContext(AuthContext);
    const [danhGiaChung, setDanhGiaChung] = useState("");
    const [deXuatChinhSua, setDeXuatChinhSua] = useState("");
    const [luuY, setLuuY] = useState("");

    function formatToVNTime(isoString) {
        const date = new Date(isoString); // JS tự đổi sang giờ local (GMT+7 nếu là VN)

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    function tachNoiDungMarkdown(md) {
        const parts = md.split(/\*\*LƯU Ý:\*\*/);
        if (parts.length < 2) return { error: "Không tìm thấy phần III. LƯU Ý" };

        const [beforeLuuY, luuY] = parts;
        const [danhGia, deXuat] = beforeLuuY.split(/\*\*ĐỀ XUẤT CHỈNH SỬA CHI TIẾT:\*\*/);

        if (!danhGia || !deXuat) return { error: "Không tìm thấy phần I hoặc II" };

        return {
            danhGiaChung: danhGia.trim(),
            deXuatChinhSua: deXuat.trim(),
            luuY: luuY.trim(),
        };
    }
    useEffect(() => {
        if (authUserData?.userData?.recommend) {
            const ketQua = tachNoiDungMarkdown(authUserData?.userData?.recommend);
            setDanhGiaChung(ketQua.danhGiaChung.replace(/\*\*ĐÁNH GIÁ CHUNG:\*\*\s*/, ""));
            setDeXuatChinhSua(ketQua.deXuatChinhSua.replace(/\*\*ĐỀ XUẤT CHỈNH SỬA CHI TIẾT:\*\*\s*/, ""));
            setLuuY(ketQua.luuY.replace(/\*\*LƯU Ý:\*\*\s*/, ""));
        }
    }, [authUserData?.userData?.recommend]);

    if (!authUserData?.userData?.recommend) {
        return (
            <div className="min-h-screen min-[490px]:pt-[72px] pt-16 px-5 w-full h-full bg-background">
                <div className=" mx-auto py-8 px-4">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Phân tích - gợi ý chỉnh sửa - tạo CV</h1>
                    <NoData title="Không có dữ liệu" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen min-[490px]:pt-[72px] pt-16 px-5 w-full h-full bg-background">
            <div className=" mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Phân tích - gợi ý chỉnh sửa - tạo CV</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="md:col-span-2 border-0 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-t-lg">
                            <CardTitle className="text-xl">Tổng quan CV của bạn</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                {danhGiaChung.includes("Ưu điểm:") && danhGiaChung.includes("Nhược điểm:") ? (
                                    <>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Ưu điểm:</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {danhGiaChung
                                                    .split("Ưu điểm:")[1]
                                                    .split("Nhược điểm:")[0]
                                                    .split("- ")
                                                    .filter((item) => item.trim())
                                                    .map((item, index) => (
                                                        <li key={index} className="text-slate-700 dark:text-slate-300">
                                                            {item.trim()}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">Nhược điểm:</h3>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {danhGiaChung
                                                    .split("Nhược điểm:")[1]
                                                    .split("- ")
                                                    .filter((item) => item.trim())
                                                    .map((item, index) => (
                                                        <li key={index} className="text-slate-700 dark:text-slate-300">
                                                            {item.trim()}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </>
                                ) : (
                                    <p>{danhGiaChung}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg">
                            <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg">
                                <CardTitle className="text-xl">Hành động</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-4">
                                        <Dialog className="w-full flex items-center justify-center">
                                            <DialogTrigger asChild>
                                                <Button variant="secondary" className="w-full text-left">
                                                    <FileText className="mr-2 h-4 w-4" />
                                                    Xem CV
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] h-full flex items-center justify-center">
                                                <DialogHeader className="w-full h-full ">
                                                    <DialogTitle>CV của bạn</DialogTitle>
                                                    <p className="text-orange-500">Dữ liệu trên CV có thể khác nếu như bạn đã cập nhật hồ sơ mới trên hệ thống</p>
                                                    <DialogDescription className="w-full h-full mt-2 rounded-md overflow-hidden">
                                                        {authUserData?.userData?.PDF_CV_URL ? (
                                                            <iframe className="w-full h-full" src={authUserData?.userData?.PDF_CV_URL} frameBorder="0"></iframe>
                                                        ) : (
                                                            <NoData title="Không có CV" />
                                                        )}
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog className="w-full flex items-center justify-center">
                                            <DialogTrigger asChild>
                                                <Button variant="secondary" className="w-full">
                                                    <Info className="mr-2 h-4 w-4" /> Xem thông tin
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] h-full  flex items-center justify-center">
                                                <DialogHeader className="w-full h-full ">
                                                    <DialogTitle>Dữ liệu của bạn</DialogTitle>
                                                    <DialogDescription className="text-blue-500">
                                                        <Link href={`/user/${authUserData?.uid}/update`}>Bạn có thể cập nhật hồ sơ mới tại đây</Link>
                                                    </DialogDescription>

                                                    {authUserData?.userData?.profile ? (
                                                        <ScrollArea className="w-full h-full mt-2 rounded-md overflow-hidden">
                                                            <Table>
                                                                <TableBody>
                                                                    {[
                                                                        { label: "Họ tên", value: authUserData?.userData?.profile.Name },
                                                                        { label: "Ngày sinh", value: authUserData?.userData?.profile.DOB },
                                                                        { label: "Số điện thoại", value: authUserData?.userData?.profile.Phone_Number },
                                                                        { label: "Địa chỉ", value: authUserData?.userData?.profile.Address },
                                                                        { label: "Email", value: authUserData?.userData?.profile.Email },
                                                                        { label: "LinkedIn/Portfolio", value: authUserData?.userData?.profile.LinkedInPortfolio },
                                                                        { label: "Mục tiêu nghề nghiệp", value: authUserData?.userData?.profile.Career_objective },
                                                                        { label: "Trường đại học", value: authUserData?.userData?.profile.University },
                                                                        { label: "Chuyên ngành", value: authUserData?.userData?.profile.Major },
                                                                        { label: "GPA", value: authUserData?.userData?.profile.GPA },
                                                                        { label: "Năm tốt nghiệp", value: authUserData?.userData?.profile.Graduated_year },
                                                                        {
                                                                            label: "Các thành tích và giải thưởng",
                                                                            value: authUserData?.userData?.profile.Achievements_awards,
                                                                        },
                                                                        {
                                                                            label: "Hoạt động ngoại khóa",
                                                                            value: authUserData?.userData?.profile.Extracurricular_activities,
                                                                        },
                                                                        { label: "Sở thích", value: authUserData?.userData?.profile.Interests },
                                                                        { label: "Vị trí ứng tuyển", value: authUserData?.userData?.profile.Job_position },
                                                                        { label: "Vị trí cấp bậc", value: authUserData?.userData?.profile.Rank },
                                                                        { label: "Ngành nghề", value: authUserData?.userData?.profile.Industry },
                                                                        { label: "Kinh nghiệm làm việc", value: authUserData?.userData?.profile.Work_Experience },
                                                                        { label: "Số năm kinh nghiệm", value: authUserData?.userData?.profile.Years_of_experience },
                                                                        { label: "Các dự án đã làm", value: authUserData?.userData?.profile.Projects },
                                                                        { label: "Kỹ năng", value: authUserData?.userData?.profile.Skills },
                                                                        { label: "Người tham chiếu", value: authUserData?.userData?.profile.References },
                                                                    ].map((item, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell className="font-medium text-left">{item.label}</TableCell>
                                                                            <TableCell className="text-left">
                                                                                {item.value ? (
                                                                                    <span>{item.value}</span>
                                                                                ) : (
                                                                                    <span className="text-orange-500">Chưa cung cấp</span>
                                                                                )}
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </ScrollArea>
                                                    ) : (
                                                        <NoData title="Không có dữ liệu" />
                                                    )}
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    <a
                                        href={`/cv`}
                                        target="_blank"
                                        className="w-full  bg-violet-600 hover:bg-violet-700 text-white flex items-center justify-center rounded-md py-2"
                                    >
                                        <FileText className="mr-2 h-4 w-4" /> Tạo CV mới
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
                                <CardTitle className="text-xl">Thông tin CV</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <Calendar className="h-4 w-4 text-orange-500" />
                                        <span>Cập nhật: {formatToVNTime(authUserData?.updatedAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <MapPin className="h-4 w-4 text-orange-500" />
                                        <span>
                                            Vị trí: {authUserData?.userData?.profile.Job_position ? authUserData?.userData?.profile.Job_position : "Chưa cung cấp"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                                        <GraduationCap className="h-4 w-4 text-orange-500" />
                                        <span>
                                            Kinh nghiệm:{" "}
                                            {authUserData?.userData?.profile.Years_of_experience ? authUserData?.userData?.profile.Years_of_experience : "Chưa cung cấp"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                        <CardTitle className="text-xl">Đề xuất chỉnh sửa CV</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                            <div className="space-y-6">
                                {/* Phần đề xuất chỉnh sửa */}
                                {deXuatChinhSua && typeof deXuatChinhSua === "string" && (
                                    <div>
                                        <h3 className="font-semibold text-lg mb-3 text-emerald-600">Đề xuất chỉnh sửa:</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            {deXuatChinhSua
                                                .split("- ")
                                                .filter((item) => item.trim())
                                                .map((item, index) => (
                                                    <li key={index} className="text-slate-700 dark:text-slate-300">
                                                        {item.trim()}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Phần lưu ý */}
                                {luuY && typeof luuY === "string" && luuY.trim() !== "" && (
                                    <div className="mt-6 pt-4 border-t">
                                        <h3 className="font-semibold text-lg mb-3 text-amber-600">Lưu ý:</h3>
                                        <ul className="list-disc pl-5 space-y-2">
                                            {luuY
                                                .split("- ")
                                                .filter((item) => item.trim())
                                                .map((item, index) => (
                                                    <li key={index} className="text-slate-700 dark:text-slate-300">
                                                        {item.trim()}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
