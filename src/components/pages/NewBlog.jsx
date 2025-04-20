"use client"; // Đánh dấu đây là Client Component (nếu dùng App Router)
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useContext, useRef } from "react";
import { POST_METHOD } from "@/services/services";
import MDView from "@/components/pageComponents/MDView";
import MDEditor from "@/components/pageComponents/MDEditor";
import { Button } from "../ui/button";

import { AuthContext } from "@/context/AuthContextProvider";

export default function NewBlog() {
    const { authUserData } = useContext(AuthContext);
    const [markdown, setMarkdown] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const router = useRouter();

    const postBlog = async () => {
        if (!title.trim()) {
            toast.warning("Không được để trống tiêu đề!");
            titleRef.current.focus();
            return;
        } else if (!markdown.trim()) {
            toast.warning("Không được để trống nội dung!");
            return;
        } else {
            setIsLoading(true);
            toast("Đang đăng bài viết...");
            const result = await POST_METHOD("blogs", {
                authorUid: authUserData.uid,
                content: markdown.trim(),
                title: title.trim(),
            });
            if (result?.success) {
                toast.success("Đăng bài viết thành công!");
                router.push("/blog/" + result?.data._id);
            } else {
                toast.error("Đăng bài viết thất bại!");
            }
            setIsLoading(false);
        }
    };
    return (
        <div className="w-full px-5">
            <h1 className="text-2xl font-bold mb-2">Viết blog mới</h1>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col mb-3 gap-3 sm:flex-row">
                <input
                    required={true}
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Tiêu đề"
                    className="w-full block border rounded-lg  p-2 text-xl font-semibold outline-none bg-white text-black"
                />
                <Button type="submit" onClick={postBlog} disabled={isLoading} className="bg-green-600 text-white font-bold h-11 hover:bg-green-500">
                    {!isLoading ? "Đăng bài viết" : "Đang xử lý"}
                </Button>
            </form>
            <MDEditor value={markdown} onChange={setMarkdown} />
            {markdown && (
                <div className="w-full flex flex-col items-center">
                    <div className="text-2xl w-full max-w-4xl font-bold mb-1 mt-6">Bản xem trước</div>
                    <div className="border max-w-4xl w-full rounded-lg p-2">
                        <MDView content={markdown} />
                    </div>
                    <Button onClick={postBlog} disabled={isLoading} className="bg-green-600 max-w-4xl mt-8 w-full text-white font-bold h-11 hover:bg-green-500">
                        {!isLoading ? "Đăng bài viết" : "Đang xử lý"}
                    </Button>
                </div>
            )}
        </div>
    );
}
