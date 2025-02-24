"use client";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
    const [authUserData, setAuthUserData] = useState(null);
    return <AuthContext.Provider value={{ authUserData, setAuthUserData }}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
