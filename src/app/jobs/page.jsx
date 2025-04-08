"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";

import NoCVData from "@/components/pages/NoCVData";
import JobsPage from "@/components/pages/JobsPage";
const VirtualJobsPage = () => {
    const { authUserData, setReload } = useContext(AuthContext);

    return (
        <div className=" w-full min-h-screen">
            {authUserData && authUserData?.userData ? (
                <JobsPage authUserData={authUserData} />
            ) : (
                <div className="mt-36">
                    <NoCVData uid={authUserData?.uid} setReload={setReload} />
                </div>
            )}
        </div>
    );
};

export default VirtualJobsPage;
