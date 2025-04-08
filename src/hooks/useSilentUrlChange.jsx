"use client";

import { useCallback } from "react";

// Custom hook để thay đổi URL mà không rerender
export function useSilentUrlChange() {
    const changeUrlSilently = useCallback((url) => {
        if (typeof window !== "undefined") {
            window.history.replaceState({}, "", url);
        }
    }, []);

    return changeUrlSilently;
}
