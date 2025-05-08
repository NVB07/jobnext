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
const getCookie = (key) => {
    console.log(Cookies.get(key));

    return Cookies.get(key); // 👉 Trả về undefined nếu không có
};
export { updateAuthCookie, deleteCookie, getCookie };
