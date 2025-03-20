"use client";
import { sendEmailVerification } from "firebase/auth";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const ResendVerificationToast = ({ user }) => {
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (user?.metadata?.createdAt) {
            const createdAt = parseInt(user.metadata.createdAt, 10);
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - createdAt) / 1000);
            const remainingTime = Math.max(60 - elapsedSeconds, 0);
            setCountdown(remainingTime);
            setCanResend(remainingTime === 0);
        }
    }, [user]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleResendVerification = async () => {
        try {
            await sendEmailVerification(user);
            toast.success("Email xác thực đã được gửi lại!");
            setCountdown(60); // Reset countdown khi gửi thành công
            setCanResend(false);
        } catch (error) {
            console.error("Lỗi gửi lại email xác thực:", error);
            toast.error("Không thể gửi lại email xác thực. Vui lòng thử lại sau.");
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    // Nếu không hiển thị, trả về null để unmount hoàn toàn
    if (!isVisible) {
        return null;
    }

    return (
        <div className="w-full relative max-w-[720px] p-4 border rounded-lg shadow-md bg-[#c6c7004d]">
            <button className=" absolute flex items-center justify-center top-2 right-2 w-6 h-6 text-3xl text-gray-500 hover:text-foreground" onClick={handleClose}>
                ×
            </button>

            <div className="text-lg font-bold mb-1">Xác thực tài khoản!</div>

            <div className="text-sm opacity-75 ">Kiểm tra email và nhấn liên kết xác thực tài khoản. Tài khoản sẽ bị xóa sau 15 phút nếu không xác thực.</div>
            <div className="text-sm opacity-75  ">Bạn có thể tắt cảnh báo này nếu như đã xác thực tài khoản.</div>
            <button
                className={`mt-2 font-medium  text-blue-500 ${!canResend ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleResendVerification}
                disabled={!canResend}
            >
                Gửi lại liên kết xác thực
            </button>
            {!canResend && <p className="text-sm opacity-75">Vui lòng chờ {countdown} giây để gửi lại.</p>}
        </div>
    );
};

export default ResendVerificationToast;
