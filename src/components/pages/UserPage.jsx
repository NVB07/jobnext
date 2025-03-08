"use client";
import { useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfig";

import { AuthContext } from "@/context/AuthContextProvider";

const UserPage = () => {
    const { authUserData } = useContext(AuthContext);
    return (
        <div>
            <div className="flex justify-center">
                {authUserData ? (
                    <div>
                        <div>{authUserData.displayName}</div>
                        <div>{authUserData.email}</div>
                        <div>{authUserData.uid}</div>
                        <div>{authUserData.photoURL}</div>

                        <button onClick={() => signOut(auth)}>Sign out</button>
                    </div>
                ) : (
                    <div>Chưa đăng nhập</div>
                )}
            </div>
        </div>
    );
};

export default UserPage;
