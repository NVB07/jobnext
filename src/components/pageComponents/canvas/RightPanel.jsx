"use client ";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { DELETE_METHOD } from "@/services/services";
import { Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RightPanel = ({ authUserData, store, setCId, cid, myCvs, setMyCvs }) => {
    const loadCV = (item) => {
        setCId(item._id);

        const jsonReal = JSON.parse(item.json);
        store.loadJSON(jsonReal);
    };
    const deleteCV = async (item) => {
        const result = await DELETE_METHOD(`cv/${item._id}`);
        if (result?.success) {
            setMyCvs(myCvs.filter((cv) => cv._id !== item._id));

            if (cid === item._id) {
                store.clear();
                store.addPage({
                    width: 595.2755905511812,
                    height: 841.8897637795276,
                    unit: "cm",
                    dpi: 72,
                });

                setCId(null);
            }
        }
    };
    return (
        <ScrollArea className="w-full relative h-screen">
            <div className="flex flex-col gap-4 p-2">
                {myCvs.map((item, index) => {
                    return (
                        <div key={index} className="flex justify-between gap-1">
                            <Button
                                onClick={() => loadCV(item)}
                                className={` ${
                                    cid === item._id
                                        ? "bg-blue-500 flex-1 hover:bg-blue-500"
                                        : "flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                                }`}
                            >
                                {item.name}
                            </Button>
                            {/* <Button variant="outline" size="icon" className=" bg-red-500 hover:bg-red-600 text-white hover:text-white">
                                <Trash size={16} />
                            </Button> */}
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="icon" className=" bg-red-500 hover:bg-red-600 text-white hover:text-white">
                                        <Trash size={16} />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Bạn có chắc chắn muốn xóa CV này?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Việc xóa <span className="text-blue-500">{item.name}</span> này sẽ không thể khôi phục lại.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteCV(item)} className=" bg-red-500 hover:bg-red-600 text-white hover:text-white">
                                            Xóa
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    );
                })}
            </div>
        </ScrollArea>
    );
};

export default RightPanel;
