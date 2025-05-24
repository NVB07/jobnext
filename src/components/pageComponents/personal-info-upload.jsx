"use client";

import { useState } from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { FileText, Upload } from "lucide-react";
import { uploadCV, uploadText } from "@/services/services";
import { toast } from "sonner";
import Link from "next/link";

export default function PersonalInfoUpload({
    children = <RainbowButton className="text-base">Tải lên thông tin cá nhân</RainbowButton>,
    uid,
    setReload,
    inUserPage = false,
}) {
    const [open, setOpen] = useState(false);
    const [personalInfo, setPersonalInfo] = useState("");
    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("upload");
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
            } else {
                alert("Vui lòng tải lên tệp PDF");
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile.type === "application/pdf") {
                setFile(droppedFile);
            } else {
                alert("Vui lòng tải lên tệp PDF");
            }
        }
    };

    const handleSubmit = async () => {
        if (!uid) {
            toast.error("Vui lòng đăng nhập để tiếp tục!");
            return;
        }
        setIsProcessing(true);
        try {
            if (activeTab === "input" && personalInfo) {
                const result = await uploadText(uid, personalInfo);
                toast.success(result?.message || "Cập nhật thông tin văn bản thành công!");
                setReload((prev) => !prev);
            } else if (activeTab === "upload" && file) {
                const result = await uploadCV(uid, file);
                toast.success(result?.message || "Cập nhật thông tin PDF thành công!");
                setReload((prev) => !prev);
            } else {
                toast.warning("Vui lòng nhập thông tin hoặc tải lên tệp PDF!");
                return;
            }

            setOpen(false);
            setPersonalInfo("");
            setFile(null);
        } catch (error) {
            toast.error(
                <div className="w-full">
                    <div className="text-sm font-bold">Lỗi tải dữ liệu !</div>
                    <div className="text-sm font-normal">Đã xảy ra lỗi, vui lòng thử lại!</div>
                </div>
            );
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !isProcessing && setOpen(val)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tải lên thông tin cá nhân</DialogTitle>
                    <DialogDescription>Vui lòng nhập thông tin cá nhân hoặc tải lên tệp PDF chứa thông tin của bạn.</DialogDescription>
                </DialogHeader>
                <div
                    className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("pdf-upload")?.click()}
                >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div className="text-center">
                        <p className="text-sm font-medium">Kéo và thả tệp PDF vào đây hoặc nhấp để chọn tệp</p>
                        <p className="text-xs text-muted-foreground mt-1">Chỉ chấp nhận tệp PDF</p>
                    </div>
                    <Input id="pdf-upload" type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} disabled={isProcessing} />
                    {file && (
                        <div className="flex items-center gap-2 text-sm mt-2">
                            <FileText className="h-4 w-4" />
                            <span>{file.name}</span>
                        </div>
                    )}
                </div>
                {isProcessing && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-white z-50 w-full h-full p-2">
                        <div className="text-lg font-semibold">Đang xử lý...</div>
                    </div>
                )}
                {/* <Tabs defaultValue="upload" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Tải lên CV (PDF)</TabsTrigger>
                        <TabsTrigger value="input">Nhập thông tin</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="mt-4">
                       
                    </TabsContent>
                    <TabsContent value="input" className="mt-4">
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="personal-info">Thông tin cá nhân</Label>
                                <textarea
                                    readOnly={isProcessing}
                                    id="personal-info"
                                    placeholder="Nhập thông tin cá nhân của bạn, bao gồm kĩ năng, kinh nghiệm làm việc,vị trí ứng tuyển, v.v."
                                    className="min-h-[100px] p-2 border rounded-md w-full"
                                    value={personalInfo}
                                    onChange={(e) => setPersonalInfo(e.target.value)}
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs> */}

                <DialogFooter>
                    <div className="w-full gap-2 sm:flex-row flex flex-col justify-between">
                        {!inUserPage && (
                            <Link className="h-9 flex items-center justify-center px-2 bg-foreground/10 hover:bg-foreground/15 rounded-lg" href={`/user/${uid}/update`}>
                                Nhập thông tin thủ công
                            </Link>
                        )}
                        <Button type="submit" onClick={handleSubmit} disabled={isProcessing}>
                            {isProcessing ? "Đang xử lý..." : "Tải lên"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
