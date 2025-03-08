// "use client";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// import Image from "next/image";
// import Link from "next/link";
// import { useId, useContext } from "react";
// import { signInWithPopup, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";

// import { auth } from "@/lib/firebase/firebaseConfig";
// import { createData } from "@/services/services";

// import { AuthContext } from "@/context/AuthContextProvider";

// //register
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// // Schema validate với Yup
// const schema = yup.object().shape({
//     username: yup.string().required("Tên người dùng là bắt buộc"),
//     email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
//     password: yup.string().min(6, "Mật khẩu ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
//     confirmPassword: yup
//         .string()
//         .oneOf([yup.ref("password")], "Mật khẩu không khớp")
//         .required("Xác nhận mật khẩu là bắt buộc"),
// });

// const Login = ({ children = <Button>Đăng nhập</Button> }) => {
//     const id = useId();
//     const googleSignIn = async () => {
//         try {
//             const googleProvider = new GoogleAuthProvider();
//             const result = await signInWithPopup(auth, googleProvider);
//             const user = result.user;

//             console.log("Signed in with Google:", user);

//             if (result._tokenResponse?.isNewUser) {
//                 await createData("users", {
//                     _id: user.uid,
//                     displayName: user.displayName,
//                     photoURL: user.photoURL,
//                     email: user.email,
//                     emailVerified: user.emailVerified,
//                     uid: user.uid,
//                 });
//             }
//         } catch (error) {
//             console.error("Error logging in with Google:", error);
//         }
//     };
//     return (
//         <Dialog>
//             <DialogTrigger asChild>{children}</DialogTrigger>
//             <DialogContent className="w-full max-w-sm p-6">
//                 <div className="flex flex-col items-center gap-2">
//                     <div className="flex size-11 shrink-0 items-center  justify-center" aria-hidden="true">
//                         <Image src="/logo.png" alt="Origin UI" width={44} height={44} className="rounded-md" />
//                     </div>
//                     <DialogHeader>
//                         <DialogTitle className="sm:text-center mt-2">Đăng nhập JobNext</DialogTitle>
//                         <DialogDescription className="sm:text-center">Chúng tôi cần một vài thông tin để bạn bắt đầu.</DialogDescription>
//                     </DialogHeader>
//                 </div>

//                 <form className="space-y-5">
//                     <div className="space-y-4">
//                         <div className="*:not-first:mt-2">
//                             <Label htmlFor={`${id}-email`}>Email</Label>
//                             <Input id={`${id}-email`} placeholder="hi@gmail.com" type="email" required />
//                         </div>
//                         <div className="*:not-first:mt-2">
//                             <Label htmlFor={`${id}-password`}>Mật Khẩu</Label>
//                             <Input id={`${id}-password`} placeholder="Nhập mật khẩu của bạn" type="password" required />
//                         </div>
//                     </div>
//                     <Button type="button" className="w-full">
//                         Đăng nhập
//                     </Button>
//                 </form>

//                 <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
//                     <span className="text-muted-foreground text-xs">Hoặc</span>
//                 </div>

//                 <Button variant="outline" onClick={googleSignIn}>
//                     Đăng nhập với Google
//                 </Button>
//                 <p className="text-muted-foreground text-center text-xs">
//                     Hãy chắc chắn bạn đồng ý với
//                     <Link href={"/terms"} className="underline mx-1 text-blue-400">
//                         điều khoản
//                     </Link>
//                     của chúng tôi.
//                 </p>
//                 <div className="text-muted-foreground text-center text-xs mt-3">
//                     Bạn chưa có tài khoản?
//                     <button className="underline mx-1 px-0 p-0 py-0 text-blue-400">Đăng ký</button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// };

// function RegisterDialog({ children }) {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm({
//         resolver: yupResolver(schema),
//     });

//     const [loading, setLoading] = useState(false);

//     const onSubmit = async (data) => {
//         setLoading(true);
//         try {
//             console.log("Dữ liệu đăng ký:", data);
//             // Xử lý đăng ký (Gọi API backend)
//             setTimeout(() => {
//                 setLoading(false);
//             }, 2000);
//         } catch (error) {
//             console.error("Lỗi đăng ký:", error);
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog>
//             <DialogTrigger asChild>{children}</DialogTrigger>
//             <DialogContent className="w-full max-w-sm p-6 bg-[#121212] rounded-xl shadow-lg">
//                 <div className="flex flex-col items-center gap-2">
//                     <div className="flex size-11 shrink-0 items-center justify-center" aria-hidden="true">
//                         <Image src="/logo.png" alt="JobNext" width={44} height={44} className="rounded-md" />
//                     </div>
//                     <DialogHeader>
//                         <DialogTitle className="sm:text-center mt-2 text-white">Đăng ký JobNext</DialogTitle>
//                         <DialogDescription className="sm:text-center text-gray-400">Tạo tài khoản để tiếp tục</DialogDescription>
//                     </DialogHeader>
//                 </div>

//                 <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//                     <div>
//                         <Label className="text-gray-400" htmlFor="username">
//                             Tên người dùng
//                         </Label>
//                         <Input type="text" id="username" {...register("username")} placeholder="Nhập tên của bạn" />
//                         <p className="text-red-500 text-sm">{errors.username?.message}</p>
//                     </div>

//                     <div>
//                         <Label className="text-gray-400" htmlFor="email">
//                             Email
//                         </Label>
//                         <Input type="email" id="email" {...register("email")} placeholder="Nhập email" />
//                         <p className="text-red-500 text-sm">{errors.email?.message}</p>
//                     </div>

//                     <div>
//                         <Label className="text-gray-400" htmlFor="password">
//                             Mật khẩu
//                         </Label>
//                         <Input type="password" id="password" {...register("password")} placeholder="Nhập mật khẩu" />
//                         <p className="text-red-500 text-sm">{errors.password?.message}</p>
//                     </div>

//                     <div>
//                         <Label className="text-gray-400" htmlFor="confirmPassword">
//                             Xác nhận mật khẩu
//                         </Label>
//                         <Input type="password" id="confirmPassword" {...register("confirmPassword")} placeholder="Nhập lại mật khẩu" />
//                         <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
//                     </div>

//                     <Button className="w-full" disabled={loading}>
//                         {loading ? "Đang đăng ký..." : "Đăng ký"}
//                     </Button>
//                 </form>

//                 <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-gray-600 after:h-px after:flex-1 after:bg-gray-600">
//                     <span className="text-gray-400 text-xs">Hoặc</span>
//                 </div>

//                 <Button variant="outline">Tiếp tục với Google</Button>

//                 <p className="text-gray-400 text-center text-xs">
//                     Bằng việc đăng ký, bạn đồng ý với{" "}
//                     <Link href={"/terms"} className="text-blue-400 hover:underline">
//                         điều khoản
//                     </Link>
//                     của chúng tôi.
//                 </p>
//             </DialogContent>
//         </Dialog>
//     );
// }

// export { RegisterDialog, Login };

"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
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
                isOpen === false && setIsRegister(false);
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
