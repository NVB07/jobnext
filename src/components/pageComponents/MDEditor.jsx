// components/MarkdownEditor.js
import dynamic from "next/dynamic";
import "@/lib/CSS/default-primitive.css";
import "react-markdown-editor-lite/lib/index.css";
import { POST_METHOD } from "@/services/services";
// Tải động MarkdownEditor mà không dùng SSR
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false, // Tắt server-side rendering
});

import MarkdownIt from "markdown-it";

// Khởi tạo parser Markdown
const mdParser = new MarkdownIt({ breaks: true });

const MDEditor = ({ value, onChange }) => {
    const handleEditorChange = ({ html, text }) => {
        // console.log("HTML:", html, "Text:", text);
        if (onChange) onChange(text); // Truyền giá trị text lên parent component nếu cần
    };

    // const handleImageUpload = (file, callback) => {
    //     // Giả lập upload ảnh lên server hoặc xử lý file
    //     // Trong thực tế, bạn có thể dùng FormData để gửi file lên API
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const imageUrl = e.target.result; // URL tạm thời từ file (base64)
    //         // Thay bằng URL thực tế nếu bạn upload lên server
    //         callback(imageUrl); // Truyền URL để chèn vào Markdown
    //     };
    //     reader.readAsDataURL(file); // Chuyển file thành base64 để hiển thị ngay

    //     // Ví dụ upload lên server (giả lập):
    //     /*
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     fetch('/api/upload', {
    //       method: 'POST',
    //       body: formData,
    //     })
    //       .then((res) => res.json())
    //       .then((data) => callback(data.url)); // URL từ server
    //     */
    // };
    const handleImageUpload = async (file, callback) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            // Gửi yêu cầu sử dụng POST_METHOD
            const data = await POST_METHOD("blogs/upload-image", formData, {
                "Content-Type": "multipart/form-data",
            });

            if (data && data.url) {
                callback(data.url); // Chèn URL từ Cloudinary vào Markdown
            } else {
                throw new Error("Không nhận được URL ảnh từ server");
            }
        } catch (error) {
            console.error("Lỗi tải ảnh:", error);
            alert("Không thể tải ảnh lên. Vui lòng thử lại!");
        }
    };
    return (
        <div className="w-full">
            <MdEditor
                value={value}
                style={{ height: "600px" }}
                renderHTML={(text) => mdParser.render(text)} // Render Markdown thành HTML
                onChange={handleEditorChange}
                placeholder="Viết nội dung"
                onImageUpload={handleImageUpload}
                className="rounded-md overflow-hidden"
            />
        </div>
    );
};

export default MDEditor;
