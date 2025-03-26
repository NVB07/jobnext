"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";

import NoCVData from "@/components/pages/NoCVData";
import InterviewPage from "@/components/pages/InterviewPage";
const VirtualInterviewPage = () => {
    const { authUserData } = useContext(AuthContext);
    return (
        <div className=" w-full min-h-screen">
            {authUserData && authUserData?.userData ? (
                <InterviewPage authUserData={authUserData} />
            ) : (
                <div className="mt-36">
                    <NoCVData />
                </div>
            )}
        </div>
    );
};

export default VirtualInterviewPage;
