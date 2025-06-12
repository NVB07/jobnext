"use client";
import { useState, useEffect, useRef } from "react";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from "polotno";
import { Workspace } from "polotno/canvas/workspace";
import { SidePanel } from "polotno/side-panel";
import { PagesTimeline } from "polotno/pages-timeline";
import { ZoomButtons } from "polotno/toolbar/zoom-buttons";
import { createStore } from "polotno/model/store";
import { Tooltip } from "polotno/canvas/tooltip";
import { DEFAULT_SECTIONS } from "polotno/side-panel";
import { TemplatesSection, IconsSection, DownloadSection, LogoSection, TemplatesPanel, PhotosSection, PhotosPanel } from "./CustomSidePanel";
import CustomToolBar from "./CustomToolBar";
import { POST_METHOD, PATCH_METHOD } from "@/services/services";
import "./CanvasStyle.css";

// Tạo store đơn giản
const store = createStore({
    key: "",
});
store.addPage({
    width: 595.2755905511812,
    height: 841.8897637795276,
    unit: "cm",
    dpi: 72,
});

const useAutoSave = (store, uid, cid, setCId, refreshCvs) => {
    const timeoutRef = useRef(null);
    const isSavingRef = useRef(false);

    useEffect(() => {
        const requestSave = async () => {
            if (isSavingRef.current) return;

            isSavingRef.current = true;

            try {
                const json = store.toJSON();
                if (!cid) {
                    const created = await POST_METHOD("cv", { json: JSON.stringify(json), uid: uid });

                    if (created?.success) {
                        setCId(created.data._id);
                        // Refresh danh sách CV sau khi auto-save tạo CV mới
                        if (refreshCvs?.current) {
                            refreshCvs.current();
                        }
                    }
                } else {
                    const update = await PATCH_METHOD(`cv/${cid}`, { json: JSON.stringify(json) });

                    if (update?.success) {
                    }
                }
            } catch (err) {
                console.error("❌ Save failed:", err);
            } finally {
                isSavingRef.current = false;
            }
        };

        const handleChange = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                requestSave();
                timeoutRef.current = null;
            }, 1500);
        };

        // Đăng ký sự kiện thay đổi
        const unsubscribe = store.on("change", handleChange);

        return () => {
            // Hủy đăng ký sự kiện khi component unmount
            unsubscribe();

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [store, uid, cid, setCId, refreshCvs]);
};

const Editor = () => {
    const { authUserData } = useContext(AuthContext);
    const [cid, setCId] = useState(null);
    const refreshCvsRef = useRef(null);

    useAutoSave(store, authUserData?.uid, cid, setCId, refreshCvsRef);

    // Tạo custom sections với authUserData truyền vào
    const customSections = [
        LogoSection,
        {
            ...TemplatesSection,
            Panel: (props) => <TemplatesPanel {...props} setCId={setCId} authUserData={authUserData} refreshCvs={refreshCvsRef} />,
        },
        IconsSection,
        {
            ...PhotosSection,
            Panel: (props) => <PhotosPanel {...props} authUserData={authUserData} />,
        },
        ...DEFAULT_SECTIONS.filter((section) => section.name !== "templates")
            .filter((section) => section.name !== "photos")
            .filter((section) => section.name !== "upload"),
        DownloadSection,
    ];

    return (
        <div className="relative flex h-screen w-full">
            <PolotnoContainer style={{ height: "100vh" }}>
                <SidePanelWrap>
                    <SidePanel store={store} sections={customSections} defaultSection="custom-templates" />
                </SidePanelWrap>
                <WorkspaceWrap>
                    <CustomToolBar store={store} cid={cid} setCId={setCId} refreshCvs={refreshCvsRef} />
                    <Workspace
                        store={store}
                        components={{
                            Tooltip,
                            TextAiWrite: () => null,
                        }}
                    />
                    <ZoomButtons store={store} />
                    <PagesTimeline store={store} />
                </WorkspaceWrap>
            </PolotnoContainer>
        </div>
    );
};

export default Editor;
