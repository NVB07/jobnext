"use client";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";

import LoadingPage from "@/components/pages/LoadingPage";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authUserData, setAuthUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setAuthUserData(1);
            setLoading(false);
        }, 500);
    }, []);

    useEffect(() => {
        const protectedRoutes = ["/chatbot", "/virtual-interview"];
        const currentPath = window.location.pathname;

        if (!loading && !authUserData && protectedRoutes.includes(currentPath)) {
            router.push("/");
        }
    }, [authUserData, loading]);
    return (
        <AuthContext.Provider value={{ authUserData, setAuthUserData }}>
            {!loading ? children : <LoadingPage />} {/* Ẩn nội dung khi đang xác định user */}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
