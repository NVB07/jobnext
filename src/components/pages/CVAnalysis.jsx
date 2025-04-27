"use client";
import MDView from "../pageComponents/MDView";
import { useState, useContext } from "react";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/AuthContextProvider";

const CVAnalysis = () => {
    const { authUserData } = useContext(AuthContext);
    const [showData, setShowData] = useState(false);
    console.log("CVAnalysis", authUserData?.userData?.cloudinaryUrl);

    const handleShowData = () => {
        setShowData(!showData);
    };
    return (
        <div className=" min-[490px]:pt-[72px] pt-16 px-5 h-full bg-background">
            <h2 className="text-2xl font-bold mt-10 mb-2">Phân tích - gợi ý chỉnh sửa - tạo CV</h2>

            <div className="flex flex-col gap-4 mt-5 border-b pb-3">
                <p className="text-xl font-bold text-foreground/80">Dữ liệu đã tải lên</p>
                {authUserData?.userData ? (
                    <Button onClick={handleShowData} className="w-32 font-bold bg-gradient-to-r from-orange-500 to-purple-500 text-white  ">
                        {showData ? "Ẩn CV" : "Xem CV"}
                    </Button>
                ) : (
                    "Bạn chưa tải lên CV nào"
                )}
                {showData && authUserData?.userData?.cloudinaryUrl && (
                    <iframe className="w-full h-screen " src={authUserData?.userData?.cloudinaryUrl} frameBorder="0"></iframe>
                )}
                {showData && !authUserData?.userData?.cloudinaryUrl && (
                    <div className="w-full  flex items-center justify-center">
                        <p className="text-xl font-bold text-foreground/80">form</p>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-4 mt-5">
                <p className="text-xl font-bold text-foreground/80">Đề xuất chỉnh sửa CV</p>
                {authUserData?.userData?.textData?.recomend ? <MDView content={authUserData?.userData?.textData.recomend} /> : null}
            </div>
        </div>
    );
};

export default CVAnalysis;
