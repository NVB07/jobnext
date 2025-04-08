"use client";
import { createContext, useState } from "react";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobData, setJobData] = useState(null);

    return <JobContext.Provider value={{ jobData, setJobData }}>{children}</JobContext.Provider>;
};
