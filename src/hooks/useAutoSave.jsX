"use client";
import { useEffect, useRef } from "react";
import { POST_METHOD, PATCH_METHOD } from "../services/services";

export function useAutoSave(store, uid, cvid, setCId) {
    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!store || !uid) return;

        const requestSave = () => {
            if (timeoutRef.current) return;
            console.log("change");

            timeoutRef.current = setTimeout(async () => {
                timeoutRef.current = null;

                try {
                    const json = store.toJSON();
                    if (!cvid) {
                        const created = await POST_METHOD("cv", { json: JSON.stringify(json), uid: uid });

                        if (created?.success) {
                            console.log("Created CV:", created);
                            setCId(created.data._id);
                        }
                    } else {
                        const update = await PATCH_METHOD(`cv/${cvid}`, { json: JSON.stringify(json) });

                        if (update?.success) {
                            console.log("Updated CV:", update);
                            setCId(update.data._id);
                        }
                    }
                } catch (err) {
                    console.error("❌ Save failed:", err);
                }
            }, 1000);
        };

        const unsubscribe = store.on("change", requestSave);

        return () => {
            unsubscribe();
            clearTimeout(timeoutRef.current);
        };
    }, [store, uid, cvid, setCId]);
}
