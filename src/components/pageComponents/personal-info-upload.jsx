"use client";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { FileText, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { uploadText, uploadCVWithProgress } from "@/services/services";
import { toast } from "sonner";
import Link from "next/link";

// Sử dụng global state để theo dõi trạng thái tải lên trên toàn ứng dụng
let globalUploadingState = false;
const uploadingListeners = new Set();

const setGlobalUploading = (state) => {
    globalUploadingState = state;
    // Thông báo cho tất cả các component đang lắng nghe
    uploadingListeners.forEach((listener) => listener(state));
};

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
    const [isGlobalUploading, setIsGlobalUploading] = useState(globalUploadingState);
    const progressToastId = useRef(null);
    const savedFileRef = useRef(null);

    // Lắng nghe thay đổi global uploading state
    useEffect(() => {
        const listener = (state) => {
            setIsGlobalUploading(state);
        };

        // Đăng ký listener
        uploadingListeners.add(listener);

        // Cleanup khi component unmount
        return () => {
            uploadingListeners.delete(listener);
        };
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
            } else {
                toast.error("Vui lòng tải lên tệp PDF");
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
                toast.error("Vui lòng tải lên tệp PDF");
            }
        }
    };

    const showProgressToast = (message, progress, status) => {
        const getStatusIcon = () => {
            if (status === "error") {
                return <AlertCircle className="h-5 w-5 text-red-500" />;
            } else if (status === "completed" || status === "uploaded" || status === "analyzed") {
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            } else {
                return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
            }
        };

        const content = (
            <div className="w-full">
                <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon()}
                    <div className="text-sm font-semibold">{message}</div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-1.5 overflow-hidden dark:bg-gray-700">
                    <div
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{
                            width: `${progress}%`,
                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
                        }}
                    />
                </div>

                <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                        {status === "analyzing" && "Phân tích bằng AI..."}
                        {status === "uploading" && "Đang tải lên..."}
                        {status === "completed" && "Hoàn thành!"}
                    </span>
                    <span className="font-medium">{progress}%</span>
                </div>

                {progress >= 60 && progress < 100 && status === "analyzing" && (
                    <div className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 italic">Quá trình phân tích có thể mất vài phút...</div>
                )}
            </div>
        );

        if (progressToastId.current) {
            toast.message(content, {
                id: progressToastId.current,
                duration: progress >= 100 ? 3000 : Infinity,
            });
        } else {
            progressToastId.current = toast.message(content, {
                duration: Infinity,
                className: "bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700",
            });
        }

        // Nếu hoàn thành, reset toast ID sau vài giây
        if (progress >= 100) {
            setTimeout(() => {
                progressToastId.current = null;
                setGlobalUploading(false);
            }, 3000);
        }
    };

    const updateProgressStep = (status, currentProgress) => {
        const statusMessages = {
            start: { message: "Bắt đầu xử lý file PDF", icon: "loading" },
            checking: { message: "Kiểm tra thông tin người dùng", icon: "loading" },
            deleting_old: { message: "Đang xóa CV cũ", icon: "loading" },
            delete_old_success: { message: "Xóa CV cũ thành công", icon: "success" },
            delete_old_failed: { message: "Xóa CV cũ thất bại, tiếp tục quá trình", icon: "warning" },
            no_old_cv: { message: "Không có CV cũ cần xóa", icon: "info" },
            uploading: { message: "Đang tải CV lên cloud", icon: "loading" },
            uploaded: { message: "Tải CV lên cloud thành công", icon: "success" },
            analyzing: { message: "Đang phân tích CV", icon: "loading" },
            analyzed: { message: "Phân tích CV thành công", icon: "success" },
            parsing: { message: "Đang xử lý dữ liệu", icon: "loading" },
            completed: { message: "Hoàn tất quá trình", icon: "success" },
        };

        const stepInfo = statusMessages[status] || { message: "Đang xử lý...", icon: "loading" };
        showProgressToast(stepInfo.message, currentProgress, status);
    };

    const reopenDialog = () => {
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!uid) {
            toast.error("Vui lòng đăng nhập để tiếp tục!");
            return;
        }

        // Lưu file hiện tại vào ref để sử dụng khi cần thử lại
        if (file) {
            savedFileRef.current = file;
        }

        // Đóng dialog ngay lập tức
        setOpen(false);

        // Đặt cả local và global state
        setIsProcessing(true);
        setGlobalUploading(true);
        progressToastId.current = null;

        try {
            if (activeTab === "input" && personalInfo) {
                progressToastId.current = toast.loading("Đang xử lý văn bản...");
                const result = await uploadText(uid, personalInfo);
                toast.success(result?.message || "Cập nhật thông tin văn bản thành công!", {
                    id: progressToastId.current,
                });
                progressToastId.current = null;
                setReload((prev) => !prev);
            } else if (activeTab === "upload" && savedFileRef.current) {
                // Hiển thị toast ban đầu
                progressToastId.current = toast.loading("Đang chuẩn bị tải lên...");

                await uploadCVWithProgress(uid, savedFileRef.current, {
                    onProgress: (data) => {
                        updateProgressStep(data.status, data.progress);
                    },
                    onComplete: (data) => {
                        toast.success(data?.message || "Cập nhật thông tin PDF thành công!", {
                            id: progressToastId.current,
                        });
                        progressToastId.current = null;
                        setReload((prev) => !prev);
                        savedFileRef.current = null; // Xóa file đã lưu sau khi thành công
                    },
                    onError: (error) => {
                        // Hiển thị lỗi với nút thử lại
                        toast.error(
                            <div className="w-full">
                                <div className="text-sm mb-2">{error.message || "Đã xảy ra lỗi, vui lòng thử lại!"}</div>
                                <Button variant="outline" size="sm" onClick={reopenDialog} className="w-full text-xs h-8 mt-1">
                                    Thử lại
                                </Button>
                            </div>,
                            {
                                id: progressToastId.current,
                                duration: 5000,
                            }
                        );
                        progressToastId.current = null;
                        setGlobalUploading(false);
                    },
                });
            } else {
                toast.warning("Vui lòng nhập thông tin hoặc tải lên tệp PDF!");
                setIsProcessing(false);
                setGlobalUploading(false);
                setOpen(true); // Mở lại dialog nếu không có file
                return;
            }

            setPersonalInfo("");
            setFile(null);
        } catch (error) {
            // Hiển thị lỗi với nút thử lại
            toast.error(
                <div className="w-full">
                    <div className="text-sm mb-2">{error.message || "Đã xảy ra lỗi, vui lòng thử lại!"}</div>
                    <Button variant="outline" size="sm" onClick={reopenDialog} className="w-full text-xs h-8 mt-1">
                        Thử lại
                    </Button>
                </div>,
                {
                    id: progressToastId.current,
                    duration: 5000,
                }
            );
            progressToastId.current = null;
            setGlobalUploading(false);
        } finally {
            setIsProcessing(false);
        }
    };

    // Xác định xem có nên disable button không
    const isButtonDisabled = isProcessing || isGlobalUploading || !file;

    // Tạo phiên bản riêng của children với trạng thái disabled phù hợp
    const childrenWithProps = React.isValidElement(children)
        ? React.cloneElement(children, {
              disabled: isGlobalUploading,
              className: `${children.props.className || ""} ${isGlobalUploading ? "opacity-50 cursor-not-allowed" : ""}`,
          })
        : children;

    return (
        <Dialog open={open} onOpenChange={(val) => !isProcessing && !isGlobalUploading && setOpen(val)}>
            <DialogTrigger asChild disabled={isGlobalUploading}>
                {childrenWithProps}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Tải lên thông tin cá nhân</DialogTitle>
                    <DialogDescription>Vui lòng nhập thông tin cá nhân hoặc tải lên tệp PDF chứa thông tin của bạn.</DialogDescription>
                </DialogHeader>
                <div
                    className={`border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-4 ${
                        isGlobalUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-muted/50"
                    } transition-colors`}
                    onDragOver={!isGlobalUploading ? handleDragOver : undefined}
                    onDrop={!isGlobalUploading ? handleDrop : undefined}
                    onClick={() => !isGlobalUploading && document.getElementById("pdf-upload")?.click()}
                >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div className="text-center">
                        <p className="text-sm font-medium">Kéo và thả tệp PDF vào đây hoặc nhấp để chọn tệp</p>
                        <p className="text-xs text-muted-foreground mt-1">Chỉ chấp nhận tệp PDF</p>
                    </div>
                    <Input
                        id="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isProcessing || isGlobalUploading}
                    />
                    {file && (
                        <div className="flex items-center gap-2 text-sm mt-2">
                            <FileText className="h-4 w-4" />
                            <span>{file.name}</span>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <div className="w-full gap-2 sm:flex-row flex flex-col justify-between">
                        {!inUserPage && (
                            <Link
                                className={`h-9 flex items-center justify-center px-2 bg-foreground/10 hover:bg-foreground/15 rounded-lg ${
                                    isGlobalUploading ? "opacity-50 pointer-events-none" : ""
                                }`}
                                href={isGlobalUploading ? "#" : `/user/${uid}/update`}
                                onClick={(e) => isGlobalUploading && e.preventDefault()}
                            >
                                Nhập thông tin thủ công
                            </Link>
                        )}
                        <Button type="submit" onClick={handleSubmit} disabled={isButtonDisabled}>
                            {isProcessing ? "Đang xử lý..." : "Tải lên"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
