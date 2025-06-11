"use client";

import { useState, useEffect } from "react";
import { Progress } from "./progress";
import Image from "next/image";

const Loading = ({ authCompleted = false }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const interval = 50; // Update every 50ms for smooth animation
        let estimatedDuration = 2000; // Default estimation

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;

            // If auth completed, speed up progress to reach 100%
            if (authCompleted) {
                setProgress(100);
                clearInterval(timer);
                return;
            }

            // Normal progressive loading with smart estimation
            // Progress slower initially, then faster as time goes on
            let calculatedProgress;
            if (elapsed < 1000) {
                // First second: reach ~30%
                calculatedProgress = (elapsed / 1000) * 30;
            } else if (elapsed < 2000) {
                // Second second: reach ~70%
                calculatedProgress = 30 + ((elapsed - 1000) / 1000) * 40;
            } else {
                // After 2s: slowly approach 95% but don't complete
                calculatedProgress = 70 + ((elapsed - 2000) / 2000) * 25;
                calculatedProgress = Math.min(calculatedProgress, 95);
            }

            setProgress(Math.min(calculatedProgress, 95)); // Cap at 95% until auth completes
        }, interval);

        return () => clearInterval(timer);
    }, [authCompleted]);

    return (
        <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
            <div className="flex flex-col items-center space-y-6">
                {/* Logo */}
                <div className="relative">
                    <Image src="/logo.png" alt="Logo" width={120} height={120} className="animate-pulse rounded-md" priority />
                </div>

                {/* Loading text */}
                <div className="text-lg font-medium text-foreground">Đang tải...</div>

                {/* Progress bar */}
                <div className="w-64">
                    <Progress value={progress} className="h-2" />
                </div>

                {/* Loading dots animation */}
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
