"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";

const Login = ({ children = <Button>Đăng nhập</Button> }) => {
    const id = useId();
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="w-full max-w-sm p-6">
                <div className="flex flex-col items-center gap-2">
                    <div className="flex size-11 shrink-0 items-center  justify-center" aria-hidden="true">
                        <Image src="/logo.png" alt="Origin UI" width={44} height={44} className="rounded-md" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center mt-2">Đăng nhập JobNext</DialogTitle>
                        <DialogDescription className="sm:text-center">Chúng tôi cần một vài thông tin để bạn bắt đầu.</DialogDescription>
                    </DialogHeader>
                </div>

                <form className="space-y-5">
                    <div className="space-y-4">
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-name`}>Tên</Label>
                            <Input id={`${id}-name`} placeholder="Matt Welsh" type="text" required />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-email`}>Email</Label>
                            <Input id={`${id}-email`} placeholder="hi@gmail.com" type="email" required />
                        </div>
                        <div className="*:not-first:mt-2">
                            <Label htmlFor={`${id}-password`}>Mật Khẩu</Label>
                            <Input id={`${id}-password`} placeholder="Nhập mật khẩu của bạn" type="password" required />
                        </div>
                    </div>
                    <Button type="button" className="w-full">
                        Đăng nhập
                    </Button>
                </form>

                <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
                    <span className="text-muted-foreground text-xs">Hoặc</span>
                </div>

                <Button variant="outline">Đăng nhập với Google</Button>

                <p className="text-muted-foreground text-center text-xs">
                    Hãy chắc chắn bạn đồng ý với
                    <Link href={"/terms"} className="underline mx-1">
                        điều khoản
                    </Link>
                    của chúng tôi.
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default Login;
