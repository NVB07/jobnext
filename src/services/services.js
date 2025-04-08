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
        console.log("đang tải lên cv");

        const response = await axios.post(`${SeverLink}users/uploadcv`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Tải lên CV thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải lên CV:", error.response?.data || error.message);
        throw error;
    }
};
const uploadText = async (uid, text) => {
    try {
        const response = await axios.post(`${SeverLink}users/uploadtext`, { uid, text });

        console.log("Tải lên văn bản thành công:", response.data);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi tải lên văn bản:", error.response?.data || error.message);
        throw error;
    }
};

export { POST_METHOD, GET_METHOD, PATCH_METHOD, DELETE_METHOD, uploadCV, uploadText };
