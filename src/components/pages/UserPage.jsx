"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";
import { deleteCookie } from "@/lib/auth/cookiesManager";

import { AuthContext } from "@/context/AuthContextProvider";

const UserPage = () => {
    const { authUserData } = useContext(AuthContext);
    const router = useRouter();
    const handleSignOut = () => {
        signOut(auth);
        deleteCookie("accessToken");
        router.push("/");
    };
    return (
        <div>
            <div className="flex justify-center">
                {authUserData ? (
                    <div>
                        <div>{authUserData.displayName}</div>
                        <div>{authUserData.email}</div>
                        <div>{authUserData.uid}</div>
                        <div>{authUserData.photoURL}</div>

                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                ) : (
                    <div>Chưa đăng nhập</div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
