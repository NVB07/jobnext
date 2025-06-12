// User Image Service - Gọi API server thay vì upload trực tiếp lên Cloudinary
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const uploadUserImage = async (file, uid) => {
    try {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("uid", uid);

        const response = await fetch(`${SERVER_URL}/user-images/upload`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Upload failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};

export const getUserImages = async (uid) => {
    try {
        const response = await fetch(`${SERVER_URL}/user-images/${uid}`, {
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Get images failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};

export const deleteUserImage = async (imageId, uid) => {
    try {
        const response = await fetch(`${SERVER_URL}/user-images/${imageId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Delete image failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};

export const permanentDeleteUserImage = async (imageId, uid) => {
    try {
        const response = await fetch(`${SERVER_URL}/user-images/${imageId}/permanent`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Permanent delete failed:", error);
        return {
            success: false,
            error: error.message,
        };
    }
};
