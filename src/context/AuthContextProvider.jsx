"use client";
import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/firebaseConfig";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authUserData, setAuthUserData] = useState(null);
    const [firstLoading, setFirstLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user);
                const idToken = await user.getIdToken();

                console.log("idToken", idToken);
                setAuthUserData(user);
            } else {
                setAuthUserData(null);
            }

            setFirstLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={{ firstLoading, authUserData, setAuthUserData }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
