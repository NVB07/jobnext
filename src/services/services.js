import axios from "axios";

const SeverLink = process.env.NEXT_PUBLIC_SERVER_LINK;

const createData = async (urlPath, data = null, headers = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios.post(SeverLink + urlPath, data, { headers });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error.response?.data || error.message);
        return null;
    }
};

const getData = async (urlPath, headers = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios.get(SeverLink + urlPath, { headers });
        return response.data; // Trả về dữ liệu từ response
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.response?.data || error.message);
        return null; // Ném lỗi để xử lý bên ngoài (nếu cần)
    }
};

const updateData = async (url, data, headers = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios.patch(SeverLink + url, data, { headers });
        return response.data; // Trả về dữ liệu từ response
    } catch (error) {
        console.error("Lỗi khi cập nhật dữ liệu:", error.response?.data || error.message);
        return null; // Ném lỗi để xử lý bên ngoài
    }
};

const deleteData = async (url, headers = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios.delete(SeverLink + url, { headers });
        return response.data; // Trả về dữ liệu từ response (nếu có)
    } catch (error) {
        console.error("Lỗi khi xóa dữ liệu:", error.response?.data || error.message);
        return null; // Ném lỗi để xử lý bên ngoài
    }
};

export { createData, getData, updateData, deleteData };
