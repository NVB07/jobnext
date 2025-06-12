"use client";
import Toolbar from "polotno/toolbar/toolbar";
import { useContext, useState, useEffect } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import RightPanel from "@/components/pageComponents/canvas/RightPanel";
import { AuthContext } from "@/context/AuthContextProvider";
import { FileIcon } from "lucide-react";
import { GET_METHOD } from "@/services/services";

const CVSheet = ({ store, cid, setCId, myCvs, setMyCvs }) => {
    const { authUserData } = useContext(AuthContext);

    return (
        <Sheet>
            <SheetTrigger className="flex items-center justify-center gap-1 px-2 py-1 rounded-sm bg-blue-500 text-white">
                <FileIcon size={16} />
                <span>My CVs</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="text-xl font-bold p-2 bg-foreground/10">My CVs</SheetTitle>
                <SheetDescription></SheetDescription>
                <RightPanel authUserData={authUserData} store={store} setCId={setCId} cid={cid} myCvs={myCvs} setMyCvs={setMyCvs} />
            </SheetContent>
        </Sheet>
    );
};

const TextFormattingToolbar = ({ store }) => {
    const selectedElement = store.selectedElements[0];
    const isText = selectedElement?.type === "text";

    const handleListFormat = (type) => {
        if (!isText) return;

        const text = selectedElement.text;
        const lines = text.split("\n");
        const formattedLines = lines.map((line, index) => {
            if (type === "ul") {
                return `• ${line}`;
            } else if (type === "ol") {
                return `${index + 1}. ${line}`;
            }
            return line;
        });

        selectedElement.set({
            text: formattedLines.join("\n"),
        });
    };

    if (!isText) return null;

    return (
        <ButtonGroup minimal={true}>
            <Button icon="list" onClick={() => handleListFormat("ul")} title="Unordered List" />
            <Button icon="numbered-list" onClick={() => handleListFormat("ol")} title="Ordered List" />
        </ButtonGroup>
    );
};

const CustomToolBar = ({ store, cid, setCId, refreshCvs }) => {
    const { authUserData } = useContext(AuthContext);
    const [myCvs, setMyCvs] = useState([]);

    const fetchCvs = async () => {
        if (authUserData) {
            const result = await GET_METHOD(`cv/${authUserData.uid}`);
            if (result?.success) setMyCvs(result.data);
        }
    };

    useEffect(() => {
        fetchCvs();
    }, [authUserData]);

    // Expose fetchCvs to parent through refreshCvs prop
    useEffect(() => {
        if (refreshCvs) {
            refreshCvs.current = fetchCvs;
        }
    }, [refreshCvs, fetchCvs]);

    return (
        <Toolbar
            store={store}
            components={{
                ImageRemoveBackground: () => null,
                TextAiWrite: () => null,
                TextFormatting: () => <TextFormattingToolbar store={store} />,
                ActionControls: () => <CVSheet store={store} cid={cid} setCId={setCId} myCvs={myCvs} setMyCvs={setMyCvs} />,
            }}
        />
    );
};
export default CustomToolBar;
