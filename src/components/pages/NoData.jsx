import Image from "next/image";

const NoData = ({ title = "Chưa có thông tin cá nhân", subTitle = "" }) => {
    return (
        <div className="w-full min-h-[calc(100vh-250px)] mt-20">
            <div className="flex flex-col items-center justify-center h-full   ">
                <Image src="/nodata.svg" alt="JobNext" width={300} height={300} className="rounded-lg  min-[780px]:w-[400px]" priority />
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4">
                        <p className="text-3xl font-bold mb-2 text-center">{title}</p>
                        <p className="text-center opacity-70">{subTitle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoData;
