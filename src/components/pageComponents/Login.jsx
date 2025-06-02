"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { updateAuthCookie, deleteCookie } from "@/lib/auth/cookiesManager";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    sendEmailVerification,
    deleteUser,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase/firebaseConfig";
import { POST_METHOD } from "@/services/services";

const loginSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup
        .string()
        .min(6, "Mật khẩu ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 ký tự viết hoa")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 ký tự viết thường")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 ký tự số")
        .required("Mật khẩu là bắt buộc"),
});
const registerSchema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: yup
        .string()
        .min(6, "Mật khẩu ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất 1 ký tự viết hoa")
        .matches(/[a-z]/, "Mật khẩu phải có ít nhất 1 ký tự viết thường")
        .matches(/[0-9]/, "Mật khẩu phải có ít nhất 1 ký tự số")
        .required("Mật khẩu là bắt buộc"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
    username: yup.string().when("confirmPassword", (confirmPassword, field) => (confirmPassword ? field.required("Tên người dùng là bắt buộc") : field)),
});

const Login = ({ children = <Button>Đăng nhập</Button> }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const searchParams = useSearchParams();

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },

        reset,
    } = useForm({ resolver: yupResolver(isRegister ? registerSchema : loginSchema) });

    const googleSignIn = async () => {
        try {
            const next = searchParams.get("next");
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (result._tokenResponse?.isNewUser) {
                try {
                    await POST_METHOD("users", {
                        _id: user.uid,

                        uid: user.uid,
                    });
                } catch (dbError) {
                    console.error("Failed to create user data:", dbError);
                    await deleteUser(user);
                    throw new Error("Registration failed due to database error");
                }
            }
            updateAuthCookie("accessToken", user.stsTokenManager.accessToken, 360);
            updateAuthCookie("uid", user.uid, 360);
            setOpenDialog(false);
            location.href = next || "/";
        } catch (error) {
            console.error("Google Sign-in Error:", error);
            deleteCookie("accessToken");
            toast.error(
                <div className="w-full">
                    <div className="text-sm font-bold">Đăng nhập thất bại</div>
                    <div className="text-sm font-normal">{error.message}</div>
                </div>
            );
        }
    };
    const handleRegister = async (data) => {
        try {
            const next = searchParams.get("next");
            // Tạo tài khoản với email và password
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;
            await POST_METHOD("users", {
                _id: user.uid,
                uid: user.uid,
            });
            await updateProfile(user, {
                displayName: data.username,
            });

            // Gửi email xác thực
            await sendEmailVerification(user);

            // Tạo dữ liệu user trong database

            updateAuthCookie("accessToken", user.stsTokenManager.accessToken, 360);
            updateAuthCookie("uid", user.uid, 360);
            setOpenDialog(false);
            location.href = next || "/";
            reset();
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            deleteCookie("accessToken");
            toast.error(
                <div className="w-full">
                    <div className="text-sm font-bold">Đăng ký không thành công</div>
                    <div className="text-sm font-normal">{error.message}</div>
                </div>
            );
        }
    };

    const handleLogin = async (data) => {
        try {
            const next = searchParams.get("next");
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            toast.success("Đăng nhập thành công");
            updateAuthCookie("accessToken", user.stsTokenManager.accessToken, 360);
            updateAuthCookie("uid", user.uid, 360);
            setOpenDialog(false);
            reset();
            location.href = next || "/";
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            deleteCookie("accessToken");
            toast.error(
                <div className="w-full">
                    <div className="text-sm font-bold">Lỗi đăng nhập</div>
                    <div className="text-sm font-normal">{error.message}</div>
                </div>
            );
        }
    };

    const onSubmit = (data) => {
        if (isRegister) {
            handleRegister(data);
        } else {
            handleLogin(data);
        }
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
                    <Image src="/logo.png" alt="JobNext" width={44} height={44} className="rounded-md" priority />
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

export default Login;
