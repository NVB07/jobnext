"use client";
import { useEffect, useState } from "react";

const withPopstateRerender = (WrappedComponent) => {
    return function PopstateWrapper(props) {
        const [key, setKey] = useState(0);

        useEffect(() => {
            const handlePopState = () => {
                setKey((prev) => prev + 1);
            };

            window.addEventListener("popstate", handlePopState);
            return () => {
                window.removeEventListener("popstate", handlePopState);
            };
        }, []);

        return <WrappedComponent key={key} {...props} />;
    };
};

export default withPopstateRerender;
