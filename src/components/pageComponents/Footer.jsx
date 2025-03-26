"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Footer = () => {
    const urlPath = usePathname();
    if (urlPath === "/chatbot") {
        return null;
    }

    return (
        <div className="w-full px-5 border-t py-5 mt-14 bg-background">
            <footer>
                <div className="flex flex-wrap min-[790px]:flex-row  justify-between items-start">
                    <div>
                        <div className="flex items-center  min-[790px]:mb-0 mb-7">
                            <Image src={"/logo.png"} width={80} height={80} alt="logo" className="rounded-xl" />
                            <div>
                                <p className="ml-3 text-4xl font-bold">JobNext</p>
                                <p className="text-sm ml-3 text-gray-500">JobNext - Định hướng tư vấn nghề nghiệp</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start  min-[790px]:mb-0 mb-7">
                        <p className="text-base mb-2 font-bold ">Hỗ trợ</p>
                        <div className="flex flex-col items-start ">
                            <Link href={"/terms"} className="text-sm text-gray-500 hover:text-primary hover:underline">
                                Điều khoản sử dụng
                            </Link>
                            <Link href={"/privacy"} className="text-sm text-gray-500 hover:text-primary hover:underline">
                                Chính sách bảo mật
                            </Link>
                        </div>
                    </div>
                    <div>
                        <p className="text-base  font-bold ">Liên hệ</p>
                        <p className="text-sm mt-2 text-gray-500">
                            <span className="text-foreground">Email:</span> nvbinh.zzz@gmail.com
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="text-foreground">Điện thoại:</span> <span>0395 432 155</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            <span className="text-foreground">Địa chỉ:</span> Thanh Trì - Hà Nội
                        </p>
                    </div>
                </div>
                <p className="text-sm w-full mt-5 text-gray-500">© 2025 JobNext. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Footer;
