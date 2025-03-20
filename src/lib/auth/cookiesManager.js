import Cookies from "js-cookie";

const updateAuthCookie = (key, value, time) => {
    Cookies.set(key, value, {
        expires: time,
        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS
        sameSite: "Strict", // Ngăn chặn CSRF
    });
};
const deleteCookie = (key) => {
    Cookies.remove(key);
};

export { updateAuthCookie, deleteCookie };
