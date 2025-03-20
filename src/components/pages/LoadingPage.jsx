import Image from "next/image";
// import { Loader2 } from "lucide-react";
const LoadingPage = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center  animate-scale-pulse">
                <Image src={"/logo.png"} width={128} height={128} alt="logo" className="w-32 h-32 rounded" />
                <p className=" mt-6 font-bold text-5xl"> JobNext</p>
            </div>
        </div>
    );
};

export default LoadingPage;
