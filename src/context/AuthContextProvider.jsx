"use client";
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { updateAuthCookie, deleteCookie } from "@/lib/auth/cookiesManager";
import { auth } from "@/lib/firebase/firebaseConfig";
import { getData } from "@/services/services";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authUserData, setAuthUserData] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDB = await getData(`users/${user.uid}`);
                console.log(userDB);
                if (userDB) {
                    const textData = userDB?.userData?.textData;
                    if (textData) {
                        const textDataObject = JSON.parse(textData);
                        console.log(textDataObject);
                        userDB.userData.textData = textDataObject;
                    }
                }
                updateAuthCookie("accessToken", user.auth.currentUser.stsTokenManager.accessToken, 360);
                setAuthUserData({ ...user, ...userDB });
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
