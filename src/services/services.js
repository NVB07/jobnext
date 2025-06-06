import axios from "axios";

const SeverLink = process.env.NEXT_PUBLIC_SERVER_LINK;

const POST_METHOD = async (urlPath, data = null, headers = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios.post(SeverLink + urlPath, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error.response?.data || error.message);
        return null;
    }
};

// const GET_METHOD = async (urlPath, body = {}, headers = { "Content-Type": "application/json" }) => {
//     try {
//         const response = await axios.get(SeverLink + urlPath, body, { headers });
//         return response.data; // Trả về dữ liệu từ response
//     } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
//         return null; // Ném lỗi để xử lý bên ngoài (nếu cần)
//     }
// };

const GET_METHOD = async (urlPath, params = {}, headers = {}) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...headers, // Merge headers truyền vào với headers mặc định
            },
            params, // Truyền params đúng cách cho GET request
        };

        const response = await axios.get(SeverLink + urlPath, config);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
        return null;
    }
};

const PATCH_METHOD = async (url, data, headers = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios.patch(SeverLink + url, data, { headers });
        return response.data; // Trả về dữ liệu từ response
    } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu:", error.response?.data || error.message);
        return null; // Ném lỗi để xử lý bên ngoài
    }
};

// const DELETE_METHOD = async (url, headers = { "Content-Type": "application/json" }) => {
//     try {
//         const response = await axios.delete(SeverLink + url, { headers });
//         return response.data; // Trả về dữ liệu từ response (nếu có)
//     } catch (error) {
//         console.error("Lỗi khi xóa dữ liệu:", error.response?.data || error.message);
//         return null; // Ném lỗi để xử lý bên ngoài
//     }
// };
const DELETE_METHOD = async (url, token, headers = { "Content-Type": "application/json" }) => {
    try {
        const authHeaders = {
            ...headers,
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.delete(SeverLink + url, { headers: authHeaders });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error.response?.data || error.message);
        return null;
    }
};

const uploadCV = async (uid, file) => {
    try {
        const formData = new FormData();
        formData.append("cv", file);
        formData.append("uid", uid);

        const response = await axios.post(`${SeverLink}users/uploadcv`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải lên CV:", error.response?.data || error.message);
        throw error;
    }
};

const uploadCVWithProgress = (uid, file, callbacks = {}) => {
    return new Promise((resolve, reject) => {
        try {
            const formData = new FormData();
            formData.append("cv", file);
            formData.append("uid", uid);

            // Tạo URL cho SSE request
            const url = `${SeverLink}users/uploadcv`;

            // Thiết lập fetch với method POST
            const fetchOptions = {
                method: "POST",
                body: formData,
                headers: {}, // Không cần Content-Type, browser sẽ tự thêm với boundary
            };

            // Thực hiện fetch để bắt đầu quá trình upload
            fetch(url, fetchOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Tạo EventSource từ response
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();

                    // Xử lý chunk dữ liệu từ stream
                    const processChunk = ({ done, value }) => {
                        if (done) {
                            return;
                        }

                        const chunk = decoder.decode(value, { stream: true });
                        const lines = chunk.split("\n\n");

                        lines.forEach((line) => {
                            if (!line.trim()) return;

                            try {
                                // Tách event name và data
                                const eventMatch = line.match(/event: (.*)\n/);
                                const dataMatch = line.match(/data: (.*)/);

                                if (eventMatch && dataMatch) {
                                    const eventName = eventMatch[1];
                                    const data = JSON.parse(dataMatch[1]);

                                    // Xử lý các sự kiện
                                    switch (eventName) {
                                        case "processing":
                                            if (callbacks.onProgress) {
                                                callbacks.onProgress(data);
                                            }
                                            break;
                                        case "done":
                                            if (callbacks.onComplete) {
                                                callbacks.onComplete(data);
                                            }
                                            resolve(data);
                                            break;
                                        case "error":
                                            if (callbacks.onError) {
                                                callbacks.onError(data);
                                            }
                                            reject(new Error(data.message || "Lỗi không xác định"));
                                            break;
                                    }
                                }
                            } catch (err) {
                                console.error("Lỗi khi xử lý SSE chunk:", err, line);
                            }
                        });

                        // Tiếp tục đọc chunk tiếp theo
                        return reader.read().then(processChunk);
                    };

                    // Bắt đầu đọc stream
                    reader.read().then(processChunk);
                })
                .catch((error) => {
                    if (callbacks.onError) {
                        callbacks.onError({ message: error.message });
                    }
                    reject(error);
                });
        } catch (error) {
            if (callbacks.onError) {
                callbacks.onError({ message: error.message });
            }
            reject(error);
        }
    });
};

const uploadText = async (uid, text) => {
    try {
        const response = await axios.post(`${SeverLink}users/uploadtext`, { uid, text });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải lên văn bản:", error.response?.data || error.message);
        throw error;
    }
};

export { POST_METHOD, GET_METHOD, PATCH_METHOD, DELETE_METHOD, uploadCV, uploadText, uploadCVWithProgress };
