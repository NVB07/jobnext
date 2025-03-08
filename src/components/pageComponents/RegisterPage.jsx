"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";

// Schema validate với Yup
const schema = yup.object().shape({
    username: yup.string().required("Tên người dùng là bắt buộc"),
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Mật khẩu không khớp")
        .required("Xác nhận mật khẩu là bắt buộc"),
});

export default function RegisterDialog({ children }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            console.log("Dữ liệu đăng ký:", data);
            // Xử lý đăng ký (Gọi API backend)
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            setLoading(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-full max-w-sm p-6 bg-[#121212] rounded-xl shadow-lg">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex size-11 shrink-0 items-center justify-center" aria-hidden="true">
                        <Image src="/logo.png" alt="JobNext" width={44} height={44} className="rounded-md" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center mt-2 text-white">Đăng ký JobNext</DialogTitle>
                        <DialogDescription className="sm:text-center text-gray-400">Tạo tài khoản để tiếp tục</DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label className="text-gray-400" htmlFor="username">
                            Tên người dùng
                        </Label>
                        <Input type="text" id="username" {...register("username")} placeholder="Nhập tên của bạn" />
                        <p className="text-red-500 text-sm">{errors.username?.message}</p>
                    </div>

                    <div>
                        <Label className="text-gray-400" htmlFor="email">
                            Email
                        </Label>
                        <Input type="email" id="email" {...register("email")} placeholder="Nhập email" />
                        <p className="text-red-500 text-sm">{errors.email?.message}</p>
                    </div>

                    <div>
                        <Label className="text-gray-400" htmlFor="password">
                            Mật khẩu
                        </Label>
                        <Input type="password" id="password" {...register("password")} placeholder="Nhập mật khẩu" />
                        <p className="text-red-500 text-sm">{errors.password?.message}</p>
                    </div>

                    <div>
                        <Label className="text-gray-400" htmlFor="confirmPassword">
                            Xác nhận mật khẩu
                        </Label>
                        <Input type="password" id="confirmPassword" {...register("confirmPassword")} placeholder="Nhập lại mật khẩu" />
                        <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
                    </div>

                    <Button className="w-full" disabled={loading}>
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </Button>
                </form>

                <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-gray-600 after:h-px after:flex-1 after:bg-gray-600">
                    <span className="text-gray-400 text-xs">Hoặc</span>
                </div>

                <Button variant="outline">Tiếp tục với Google</Button>

                <p className="text-gray-400 text-center text-xs">
                    Bằng việc đăng ký, bạn đồng ý với{" "}
                    <Link href={"/terms"} className="text-blue-400 hover:underline">
                        điều khoản
                    </Link>
                    của chúng tôi.
                </p>
            </DialogContent>
        </Dialog>
    );
}
