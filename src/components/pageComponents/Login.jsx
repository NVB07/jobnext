"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
// import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { createData } from "@/services/services";

const schema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
    username: yup.string().when("confirmPassword", (confirmPassword, field) => (confirmPassword ? field.required("Tên người dùng là bắt buộc") : field)),
});

const AuthDialog = ({ children = <Button>Đăng nhập</Button> }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ resolver: yupResolver(schema) });

    const googleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (result._tokenResponse?.isNewUser) {
                await createData("users", {
                    _id: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                });
            }
        } catch (error) {
            console.error("Google Sign-in Error:", error);
        }
    };

    const onSubmit = (data) => {
        console.log(isRegister ? "Đăng ký dữ liệu:" : "Đăng nhập dữ liệu:", data);
    };

    return (
        <Dialog
            onOpenChange={(isOpen) => {
                setOpenDialog(isOpen);
                setIsRegister(false);
                reset();
            }}
            open={openDialog}
        >
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-full max-w-sm p-6">
                <div className="flex flex-col items-center gap-2">
                    <Image src="/logo.png" alt="JobNext" width={44} height={44} className="rounded-md" />
                    <DialogHeader>
                        <DialogTitle className="text-center mt-2">{isRegister ? "Đăng ký JobNext" : "Đăng nhập JobNext"}</DialogTitle>
                        <DialogDescription className="sm:text-center">
                            {isRegister ? "Chúng tôi cần một vài thông tin để bạn bắt đầu" : "Đăng nhập để tiếp tục sử dụng dịch vụ"}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {isRegister && (
                        <div>
                            <Label htmlFor="username">Tên người dùng</Label>
                            <Input id="username" {...register("username")} placeholder="Nhập tên của bạn" />
                            <p className="text-red-500 text-xs">{errors.username?.message}</p>
                        </div>
                    )}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" {...register("email")} placeholder="hi@gmail.com" type="email" />
                        <p className="text-red-500 text-xs">{errors.email?.message}</p>
                    </div>
                    <div>
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input id="password" {...register("password")} placeholder="Nhập mật khẩu của bạn" type="password" />
                        <p className="text-red-500 text-xs">{errors.password?.message}</p>
                    </div>
                    {isRegister && (
                        <div>
                            <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                            <Input id="confirmPassword" {...register("confirmPassword")} placeholder="Nhập lại mật khẩu" type="password" />
                            <p className="text-red-500 text-xs">{errors.confirmPassword?.message}</p>
                        </div>
                    )}
                    <Button className="w-full" type="submit">
                        {isRegister ? "Đăng ký" : "Đăng nhập"}
                    </Button>
                </form>

                <div className="flex items-center gap-3 before:flex-1 before:h-px before:bg-border after:flex-1 after:h-px after:bg-border">
                    <span className="text-xs text-muted-foreground">Hoặc</span>
                </div>
                <Button variant="outline" onClick={googleSignIn}>
                    Đăng nhập với Google
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-3">
                    {isRegister ? "Bạn đã có tài khoản?" : "Bạn chưa có tài khoản?"}
                    <button
                        className="underline mx-1 text-blue-400"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            reset();
                        }}
                    >
                        {isRegister ? "Đăng nhập" : "Đăng ký"}
                    </button>
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default AuthDialog;
