"use client"; // Đánh dấu đây là Client Component (nếu dùng App Router)

import { useState } from "react";
import MDView from "@/components/pageComponents/MDView";
import MDEditor from "@/components/pageComponents/MDEditor";

export default function NewBlog() {
    const [markdown, setMarkdown] = useState("");

    return (
        <div className="w-full px-5">
            <h1 className="text-2xl font-bold mb-2">Viết blog mới</h1>
            <input type="text" placeholder="Tiêu đề" className="w-full block border rounded mb-3 p-2 text-xl font-semibold outline-none bg-white text-black" />
            <MDEditor value={markdown} onChange={setMarkdown} />
            {markdown && (
                <>
                    <h1 className="text-2xl font-bold mb-1 mt-4">Bản xem trước</h1>
                    <div className="border rounded-lg p-2">
                        <MDView content={markdown} />
                    </div>
                </>
            )}
        </div>
    );
}
