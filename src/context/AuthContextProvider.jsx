"use client";
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { updateAuthCookie, deleteCookie } from "@/lib/auth/cookiesManager";
import { auth } from "@/lib/firebase/firebaseConfig";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authUserData, setAuthUserData] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user);
                updateAuthCookie("accessToken", user.auth.currentUser.stsTokenManager.accessToken, 360);
                setAuthUserData(user);
            } else {
                setAuthUserData(null);
            }
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
    }, [authUserData?.auth.currentUser.stsTokenManager.accessToken]);

    return <AuthContext.Provider value={{ authUserData, setAuthUserData }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
