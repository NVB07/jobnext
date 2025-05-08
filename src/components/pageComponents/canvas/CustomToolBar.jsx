"use client";
import Toolbar from "polotno/toolbar/toolbar";
import { useContext } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import RightPanel from "@/components/pageComponents/canvas/RightPanel";
import { AuthContext } from "@/context/AuthContextProvider";
import { FileIcon } from "lucide-react";

const CVSheet = ({ store, cid, setCId }) => {
    const { authUserData } = useContext(AuthContext);

    return (
        <Sheet>
            <SheetTrigger className="flex items-center justify-center gap-1 px-2 py-1 rounded-sm hover:bg-gray-100">
                <FileIcon size={16} />
                <span>My CVs</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
                <SheetTitle className="text-xl font-bold p-2 bg-foreground/10">My CVs</SheetTitle>
                <SheetDescription></SheetDescription>
                <RightPanel authUserData={authUserData} store={store} setCId={setCId} cid={cid} />
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

const CustomToolBar = ({ store, cid, setCId }) => {
    return (
        <Toolbar
            store={store}
            components={{
                ImageRemoveBackground: () => null,
                TextAiWrite: () => null,
                TextFormatting: () => <TextFormattingToolbar store={store} />,
                ActionControls: () => <CVSheet store={store} cid={cid} setCId={setCId} />,
            }}
        />
    );
};
export default CustomToolBar;
