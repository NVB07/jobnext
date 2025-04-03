import Image from "next/image";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { cn } from "@/lib/utils";
import PersonalInfoUpload from "../pageComponents/personal-info-upload";

const NoCVData = ({ uid = null }) => {
    return (
        <div className="w-full min-h-[calc(100vh-250px)] mt-20">
            <div className="flex flex-col items-center justify-center h-full  min-[780px]:flex-row ">
                <Image src="/nodata.svg" alt="JobNext" width={300} height={300} className="rounded-lg  min-[780px]:w-[400px]" priority />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4">
                        <p className="text-3xl font-bold mb-2 text-center">Chưa có thông tin cá nhân</p>
                        <p className="text-center opacity-70">Hãy cung cấp thông tin cá nhân để tiếp tục sử dụng dịch vụ của chúng tôi!</p>
                    </div>
                    <PersonalInfoUpload uid={uid}>
                        <div className="cursor-pointer">
                            <AnimatedGradientText>
                                ✒️ <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                                <span
                                    className={cn(
                                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                                    )}
                                >
                                    <span className="text-lg font-semibold">Nhập thông tin cá nhân hoặc tải lên CV của bạn</span>
                                </span>
                            </AnimatedGradientText>
                        </div>
                    </PersonalInfoUpload>
                </div>
            </div>
        </div>
    );
};

export default NoCVData;
