import Image from "next/image";
import Login from "@/components/pageComponents/Login";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
// import { Suspense } from "react";

const NoUser = () => {
    return (
        <div className="w-full min-h-[calc(100vh-250px)] mt-20">
            <div className="flex flex-col items-center justify-center h-full  min-[780px]:flex-row ">
                <Image src="/loginBg.svg" alt="JobNext" width={300} height={300} className="rounded-lg  min-[780px]:w-[400px]" priority />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4">
                        <p className="text-3xl font-bold mb-2 text-center">Bạn chưa đăng nhập</p>
                        <p className="text-center opacity-70">Hãy đăng nhập để tiếp tục sử dụng dịch vụ của chúng tôi !</p>
                    </div>
                    <Login>
                        <div className="cursor-pointer">
                            <AnimatedGradientText>
                                ✅ <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                                <span
                                    className={cn(
                                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                                    )}
                                >
                                    <span className="text-lg font-semibold"> Đăng nhập ngay</span>
                                </span>
                            </AnimatedGradientText>
                        </div>
                    </Login>
                </div>
            </div>
        </div>
    );
};

export default NoUser;
