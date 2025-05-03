"use client";
import MDView from "../pageComponents/MDView";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";
import Link from "next/link";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CVAnalysis = () => {
    const { authUserData } = useContext(AuthContext);

    return (
        <div className=" min-[490px]:pt-[72px] pt-16 px-5 w-full h-full bg-background">
            <h2 className="text-2xl font-bold mt-10 mb-2">Phân tích - gợi ý chỉnh sửa - tạo CV</h2>

            <div className="w-full flex flex-col gap-4 mt-5 border-b pb-3">
                <p className="text-xl font-bold text-foreground/80">Dữ liệu đã tải lên</p>
                {authUserData?.userData?.PDF_CV_URL ? (
                    <div className="flex gap-2">
                        <Dialog className="w-full flex items-center justify-center">
                            <DialogTrigger asChild>
                                <Button className="w-32 font-bold bg-gradient-to-r from-orange-500 to-purple-500 text-white  ">Xem CV</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] h-full flex items-center justify-center">
                                <DialogHeader className="w-full h-full ">
                                    <DialogTitle>CV của bạn</DialogTitle>
                                    <p className="text-orange-500">Dữ liệu trên CV có thể khác nếu như bạn đã cập nhật hồ sơ mới trên hệ thống</p>
                                    <DialogDescription className="w-full h-full mt-2 rounded-md overflow-hidden">
                                        <iframe className="w-full h-full" src={authUserData?.userData?.PDF_CV_URL} frameBorder="0"></iframe>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Dialog className="w-full flex items-center justify-center">
                            <DialogTrigger asChild>
                                <Button className="w-32 font-bold bg-gradient-to-r from-orange-500 to-purple-500 text-white  ">Xem thông tin</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] h-full  flex items-center justify-center">
                                <DialogHeader className="w-full h-full ">
                                    <DialogTitle>Dữ liệu của bạn</DialogTitle>
                                    <DialogDescription className="text-blue-500">
                                        <Link href={`/user/${authUserData.uid}/update`}>Bạn có thể cập nhật hồ sơ mới tại đây</Link>
                                    </DialogDescription>

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
                                                    { label: "Các thành tích và giải thưởng", value: authUserData?.userData?.profile.Achievements_awards },
                                                    { label: "Hoạt động ngoại khóa", value: authUserData?.userData?.profile.Extracurricular_activities },
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
                                                            {item.value ? <span>{item.value}</span> : <span className="text-orange-500">Chưa cung cấp</span>}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                ) : authUserData?.userData?.profile ? (
                    <Dialog className="w-full flex items-center justify-center">
                        <DialogTrigger asChild>
                            <Button className="w-32 font-bold bg-gradient-to-r from-orange-500 to-purple-500 text-white  ">Xem thông tin</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[95%] md:max-w-[60%] max-h-[90%] h-full  flex items-center justify-center">
                            <DialogHeader className="w-full h-full ">
                                <DialogTitle>Dữ liệu của bạn</DialogTitle>
                                <DialogDescription className="text-blue-500">
                                    <Link href={`/user/${authUserData.uid}/update`}>Bạn có thể cập nhật hồ sơ mới tại đây</Link>
                                </DialogDescription>

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
                                                { label: "Các thành tích và giải thưởng", value: authUserData?.userData?.profile.Achievements_awards },
                                                { label: "Hoạt động ngoại khóa", value: authUserData?.userData?.profile.Extracurricular_activities },
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
                                                        {item.value ? <span>{item.value}</span> : <span className="text-orange-500">Chưa cung cấp</span>}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                ) : (
                    <p className="text-orange-600"> Không có dữ liệu</p>
                )}
            </div>
            <div className="flex flex-col gap-4 mt-5">
                <p className="text-xl font-bold text-foreground/80">Đề xuất chỉnh sửa CV</p>
                {authUserData?.userData?.recommend ? <MDView content={authUserData?.userData?.recommend} /> : <p className="text-orange-600"> Không có đề xuất</p>}
            </div>
        </div>
    );
};

export default CVAnalysis;
