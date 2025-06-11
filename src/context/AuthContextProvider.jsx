"use client";
import { jsonrepair } from "jsonrepair";
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { updateAuthCookie, deleteCookie } from "@/lib/auth/cookiesManager";
import { auth } from "@/lib/firebase/firebaseConfig";
import { GET_METHOD } from "@/services/services";
import Loading from "@/components/ui/Loading";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authUserData, setAuthUserData] = useState(null);
    const [reload, setReload] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [authCompleted, setAuthCompleted] = useState(false);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDB = await GET_METHOD(`users/${user.uid}`);

                if (userDB?.success) {
                    setAuthUserData({ ...userDB.user, ...user });
                }
                updateAuthCookie("accessToken", user.auth.currentUser.stsTokenManager.accessToken, 360);
            } else {
                setAuthUserData(null);
            }

            // Auth completed, signal to Loading component
            setAuthCompleted(true);

            // Small delay to ensure progress reaches 100% smoothly
            setTimeout(() => {
                setIsLoading(false);
            }, 200);
        });

        const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                updateAuthCookie("accessToken", token, 360); // Cập nhật cookie
            } else {
                deleteCookie("accessToken");
            }
        });

        return () => {
            unsubscribeAuth();
            unsubscribeToken();
        };
    }, [authUserData?.auth.currentUser.stsTokenManager.accessToken, reload]);

    if (isLoading) {
        return (
            <AuthContext.Provider value={{ authUserData, setAuthUserData, setReload, isLoading }}>
                <Loading authCompleted={authCompleted} />
            </AuthContext.Provider>
        );
    }

    return <AuthContext.Provider value={{ authUserData, setAuthUserData, setReload, isLoading }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
