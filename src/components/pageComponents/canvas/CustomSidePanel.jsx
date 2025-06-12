"use client";
const MAIN_URL = process.env.NEXT_PUBLIC_MAIN_URL;

import { useState, useEffect } from "react";
import React from "react";
import { observer } from "mobx-react-lite";

import { SectionTab } from "polotno/side-panel";
import MdPhotoLibrary from "@meronex/icons/md/MdPhotoLibrary";

import ReactDOMServer from "react-dom/server";

import { FaDownload, FaIcons, FaImage } from "react-icons/fa6";

import * as Fa5Icons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as Fa6Icons from "react-icons/fa6";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as DiIcons from "react-icons/di";
import * as MdIcons from "react-icons/md";
import * as Hi2Icons from "react-icons/hi2";
import * as Io5Icons from "react-icons/io5";

import { GET_METHOD, POST_METHOD } from "@/services/services";
import { uploadUserImage, getUserImages, deleteUserImage } from "@/services/userImageService";

const allIcons = {
    ...FcIcons,
    ...Fa5Icons,
    ...Fa6Icons,
    ...BsIcons,
    ...AiIcons,
    ...DiIcons,
    ...MdIcons,
    ...Hi2Icons,
    ...Io5Icons,
};

export const LogoPanel = observer(() => {
    return;
});

export const LogoSection = {
    name: "logo",
    Tab: () => (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: 5 }}>
            <a target="_blank" href={MAIN_URL}>
                <img src="/logo.png" style={{ width: 40, height: 40, borderRadius: 8, boxShadow: "0 0 25px #000" }} />
            </a>
        </div>
    ),
    Panel: LogoPanel,
};

export const TemplatesPanel = observer(({ store, setCId, authUserData, refreshCvs, templates }) => {
    const applyTemplate = (jsonString) => {
        const jsonReal = JSON.parse(jsonString);
        store.loadJSON(jsonReal);
    };

    const addNew = async () => {
        // Đặt cid về null trước khi tạo mới
        if (authUserData?.uid) {
            setCId(null);

            try {
                store.clear();
                store.addPage({
                    width: 595.2755905511812,
                    height: 841.8897637795276,
                    unit: "cm",
                    dpi: 72,
                });
                // Lưu CV mới ngay lập tức
                const json = store.toJSON();
                const created = await POST_METHOD("cv", {
                    json: JSON.stringify(json),
                    uid: authUserData.uid,
                    name: `CV mới ${new Date().toLocaleTimeString()}`,
                });

                if (created?.success) {
                    setCId(created.data._id);
                    // Refresh danh sách CV sau khi tạo mới thành công
                    if (refreshCvs?.current) {
                        refreshCvs.current();
                    }
                }
            } catch (err) {
                console.error("❌ Lỗi khi tạo CV mới:", err);
            }
        } else {
            // Vẫn clear store mặc dù không có UID
            store.clear();
            store.addPage({
                width: 595.2755905511812,
                height: 841.8897637795276,
                unit: "cm",
                dpi: 72,
            });
            setCId(null);
        }
    };

    return (
        <div style={{ height: "100vh", overflowY: "auto", paddingBottom: 20 }}>
            <div className="grid grid-cols-2 gap-2">
                <button title={"add new"} onClick={addNew} className="border shadow  rounded-md hover:shadow-slate-600 ">
                    <img src={"/addnew.png"} alt="template" className="border-b rounded-t-md" />

                    <p className="m-0 py-1">new</p>
                </button>
                {templates.map((item, index) => {
                    return (
                        <button title={item?.name} onClick={() => applyTemplate(item.json)} className="border shadow  rounded-md hover:shadow-slate-600 " key={index}>
                            <img src={item.preview} alt="template" className="border-b rounded-t-md" />
                            {item?.name ? (
                                <p className="m-0 py-1">{item?.name?.length > 15 ? item?.name?.slice(0, 15) + "..." : item?.name}</p>
                            ) : (
                                <p className="m-0 py-1">{index}</p>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});

// define the new custom section
export const TemplatesSection = {
    name: "custom-templates",
    Tab: (props) => (
        <SectionTab name="Templates" {...props}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: 24 }}>
                <MdPhotoLibrary />
            </div>
        </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: TemplatesPanel,
};

export const IconsPanel = observer(({ store }) => {
    const addIconToCanvas = (name, Icon) => {
        // Tạo SVG string từ component Lucide
        const svgString = ReactDOMServer.renderToString(<Icon size={100} strokeWidth={1.5} stroke="transparent" />);

        // Chuyển đổi thành data URL
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;

        const activePage = store.activePage;

        // Thêm element SVG vào page
        activePage.addElement({
            type: "svg",
            src: dataUrl,
            width: 50,
            height: 50,
            x: 200, // Đặt trung tâm vào vị trí con trỏ
            y: 200,
            name: `icon-${name}`,
        });
    };

    // Số lượng icon hiển thị trên mỗi trang
    const [iconsPerPage] = useState(100);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    // Lọc icon theo tên nếu có tìm kiếm
    const filteredIcons = Object.entries(allIcons).filter(([name, _]) => name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Phân trang icons
    const startIndex = currentPage * iconsPerPage;
    const displayedIcons = filteredIcons.slice(startIndex, startIndex + iconsPerPage);

    return (
        <div className="flex flex-col h-full">
            {/* Thanh tìm kiếm */}
            <div className="p-2 border-b">
                <input
                    type="text"
                    placeholder="Tìm icon..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(0); // Reset về trang đầu khi tìm kiếm
                    }}
                />
            </div>

            {/* Grid hiển thị icons */}
            <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-4 gap-1 p-2">
                    {displayedIcons.map(([name, Icon]) => (
                        <div
                            title={name}
                            key={name}
                            className="border rounded p-2 flex items-center justify-center cursor-pointer hover:bg-slate-300"
                            onClick={() => addIconToCanvas(name, Icon)}
                        >
                            <Icon size={32} color="#666" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Điều hướng phân trang */}
            {filteredIcons.length > iconsPerPage && (
                <div className="p-2 border-t flex justify-between items-center">
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={currentPage === 0}
                        onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                    >
                        Trước
                    </button>
                    <span>
                        Trang {currentPage + 1} / {Math.ceil(filteredIcons.length / iconsPerPage)}
                    </span>
                    <button
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        disabled={(currentPage + 1) * iconsPerPage >= filteredIcons.length}
                        onClick={() =>
                            setCurrentPage((prev) => {
                                const maxPage = Math.ceil(filteredIcons.length / iconsPerPage) - 1;
                                return Math.min(maxPage, prev + 1);
                            })
                        }
                    >
                        Sau
                    </button>
                </div>
            )}
        </div>
    );
});

export const IconsSection = {
    name: "custom-icons",
    Tab: (props) => (
        <SectionTab name="Icons" {...props}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: 24 }}>
                <FaIcons />
            </div>
        </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: IconsPanel,
};

export const PhotosPanel = observer(({ store, authUserData }) => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);

    // Load ảnh của user khi component mount
    useEffect(() => {
        const loadUserImages = async () => {
            if (!authUserData?.uid) return;

            setLoading(true);
            try {
                const result = await getUserImages(authUserData.uid);
                if (result.success) {
                    setUploadedImages(result.data);
                } else {
                    console.error("❌ Load images failed:", result.error);
                }
            } catch (error) {
                console.error("❌ Load images error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUserImages();
    }, [authUserData?.uid]);

    const handleFileUpload = async (files) => {
        if (!files || files.length === 0) return;

        if (!authUserData?.uid) {
            alert("Vui lòng đăng nhập để upload ảnh!");
            return;
        }

        setUploading(true);

        try {
            for (const file of files) {
                // Kiểm tra file type
                if (!file.type.startsWith("image/")) {
                    alert("Vui lòng chỉ upload file ảnh!");
                    continue;
                }

                // Upload qua server API
                const result = await uploadUserImage(file, authUserData.uid);

                if (result.success) {
                    // Thêm ảnh mới vào danh sách
                    setUploadedImages((prev) => [result.data, ...prev]);
                } else {
                    alert(`Lỗi upload ${file.name}: ${result.error}`);
                }
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Có lỗi xảy ra khi upload ảnh!");
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        handleFileUpload(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        handleFileUpload(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    const addImageToCanvas = (imageData) => {
        const activePage = store.activePage;

        // Tính toán kích thước phù hợp cho canvas
        const maxWidth = 300;
        const maxHeight = 300;
        let { width, height } = imageData;

        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
        }

        activePage.addElement({
            type: "image",
            src: imageData.cloudinaryUrl, // Sử dụng cloudinaryUrl từ database
            width,
            height,
            x: 100,
            y: 100,
            name: `image-${imageData.fileName}`,
        });
    };

    const handleDeleteImage = async (imageId, index) => {
        if (!authUserData?.uid) {
            alert("Vui lòng đăng nhập!");
            return;
        }

        try {
            const result = await deleteUserImage(imageId, authUserData.uid);
            if (result.success) {
                setUploadedImages((prev) => prev.filter((_, i) => i !== index));
            } else {
                alert(`Lỗi xóa ảnh: ${result.error}`);
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Có lỗi xảy ra khi xóa ảnh!");
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Authentication Check */}
            {!authUserData?.uid && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center">
                        <div className="text-blue-600 mr-2">ℹ️</div>
                        <div>
                            <p className="text-sm text-blue-800 font-medium">Cần đăng nhập để sử dụng tính năng này</p>
                            <p className="text-xs text-blue-700">Ảnh của bạn sẽ được lưu riêng biệt và bảo mật</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-4 mb-4 text-center transition-colors ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"} ${
                    !authUserData?.uid ? "opacity-50" : ""
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                    disabled={uploading || !authUserData?.uid}
                />
                <label htmlFor="image-upload" className={`cursor-pointer ${uploading || !authUserData?.uid ? "opacity-50" : ""}`}>
                    <FaImage className="mx-auto mb-2 text-3xl text-gray-400" />
                    {uploading ? (
                        <p className="text-blue-500">Đang upload...</p>
                    ) : (
                        <>
                            <p className="text-sm text-gray-600">{authUserData?.uid ? "Click để chọn ảnh hoặc kéo thả vào đây" : "Cần đăng nhập để upload ảnh"}</p>
                            <p className="text-xs text-gray-400 mt-1">Hỗ trợ: JPG, PNG, GIF</p>
                        </>
                    )}
                </label>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center text-gray-500 py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-sm">Đang tải ảnh...</p>
                </div>
            )}

            {/* Uploaded Images Grid */}
            <div className="flex-grow overflow-y-auto">
                {uploadedImages.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                        {uploadedImages.map((image, index) => (
                            <div key={image._id} className="relative group">
                                <img
                                    src={image.cloudinaryUrl}
                                    alt={image.fileName}
                                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                                    onClick={() => addImageToCanvas(image)}
                                    title={`Click để thêm vào canvas: ${image.fileName}`}
                                />
                                <button
                                    onClick={() => handleDeleteImage(image._id, index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Xóa ảnh"
                                >
                                    ×
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b opacity-0 group-hover:opacity-100 transition-opacity">
                                    {image.fileName.length > 15 ? image.fileName.slice(0, 15) + "..." : image.fileName}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div className="text-center text-gray-500 py-8">
                            <FaImage className="mx-auto mb-2 text-2xl" />
                            <p className="text-sm">{authUserData?.uid ? "Chưa có ảnh nào được upload" : "Đăng nhập để xem ảnh của bạn"}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
});

export const PhotosSection = {
    name: "custom-photos",
    Tab: (props) => (
        <SectionTab name="Photos" {...props}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", fontSize: 24 }}>
                <FaImage />
            </div>
        </SectionTab>
    ),
    Panel: PhotosPanel,
};

export const DownloadPanel = observer(({ store }) => {
    const allPage = store.pages.length;
    const pagesArray = Array.from({ length: allPage }, (_, index) => store.pages[index].id);
    const [selectedPages, setSelectedPages] = useState(pagesArray);

    const isAllSelected = selectedPages.length === allPage;

    const handleCheckboxChange = (id) => {
        setSelectedPages((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedPages([]); // bỏ chọn tất cả
        } else {
            setSelectedPages(pagesArray); // chọn tất cả
        }
    };

    const downloadPDF = async () => {
        await store.saveAsPDF({ pixelRatio: 5, fileName: "myCV.pdf", pageIds: selectedPages });
    };
    const downloadPNG = async () => {
        await store.saveAsImage({ pixelRatio: 5, fileName: "myCV.png", pageIds: selectedPages });
    };

    const downloadJSON = () => {
        const json = store.toJSON();
        const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "design.json"; // Tên file muốn lưu
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    return (
        <div style={{ width: "100%" }}>
            <div className="w-full flex flex-col p-3 border-2 rounded-lg mb-3">
                <p className="font-bold">Chọn trang tải xuống</p>
                <label className="flex items-center mt-1">
                    <input type="checkbox" className="mr-1" checked={isAllSelected} onChange={handleSelectAll} />
                    Chọn tất cả
                </label>
                {pagesArray.map((id, index) => (
                    <label key={id} className="flex items-center mt-1">
                        <input type="checkbox" className="mr-1" checked={selectedPages.includes(id)} onChange={() => handleCheckboxChange(id)} />
                        Trang {index + 1}
                    </label>
                ))}
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
                {/* <button onClick={downloadJSON} style={{ width: "100%", background: "green", padding: 5, borderRadius: 8, color: "white" }}>
                    Xuất Json
                </button>
                <button onClick={downloadPNG} style={{ width: "100%", background: "green", padding: 10, borderRadius: 8, color: "white" }}>
                    Tải xuống PNG
                </button> */}
                <button onClick={downloadPDF} style={{ width: "100%", background: "blue", padding: 10, borderRadius: 8, color: "white" }}>
                    Tải xuống PDF
                </button>
            </div>
        </div>
    );
});

export const DownloadSection = {
    name: "download",
    Tab: (props) => (
        <SectionTab name="download" {...props}>
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", fontSize: 24, color: "blue" }}>
                <FaDownload />
            </div>
        </SectionTab>
    ),
    // we need observer to update component automatically on any store changes
    Panel: DownloadPanel,
};
