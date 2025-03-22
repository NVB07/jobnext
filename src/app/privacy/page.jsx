const PrivacyPage = () => {
    return (
        <div className="min-[880px]:px-20 w-full px-5 pt-24">
            <div className="font-bold text-3xl ">CHÍNH SÁCH BẢO MẬT</div>
            <p className="text-sm w-full text-gray-500 pb-3 border-b mb-5">Ngày cập nhật: 01/02/2025</p>
            <h2 className="text-xl uppercase font-bold">1. Thu thập thông tin cá nhân</h2>
            <div className="opacity-70">
                <p>Khi sử dụng dịch vụ của chúng tôi, bạn có thể được yêu cầu cung cấp các thông tin cá nhân như:</p>
                <ul className="list-disc pl-5">
                    <li>Họ và tên</li>
                    <li>Địa chỉ email</li>
                    <li>Số điện thoại</li>
                    <li>Thông tin đăng nhập (tên người dùng, mật khẩu)</li>
                </ul>
                <p>Chúng tôi chỉ thu thập thông tin cá nhân khi bạn tự nguyện cung cấp.</p>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">2. Sử dụng thông tin cá nhân</h2>
            <div className="opacity-70">
                <p>Thông tin cá nhân được thu thập sẽ được sử dụng cho các mục đích sau:</p>
                <ul className="list-disc pl-5">
                    <li>Cung cấp và quản lý dịch vụ</li>
                    <li>Xử lý các yêu cầu, thắc mắc từ bạn</li>
                    <li>Cải thiện chất lượng dịch vụ</li>
                    <li>Gửi thông báo về các cập nhật hoặc thay đổi liên quan đến dịch vụ</li>
                </ul>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">3. Bảo mật thông tin</h2>
            <div className="opacity-70">
                <p>Chúng tôi cam kết bảo mật thông tin cá nhân của bạn bằng các biện pháp an ninh phù hợp.</p>
                <p>
                    Tuy nhiên, không có phương thức truyền tải nào qua Internet hoặc phương thức lưu trữ điện tử nào là an toàn tuyệt đối, do đó chúng tôi không thể đảm
                    bảo an toàn tuyệt đối cho thông tin của bạn.
                </p>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">4. Chia sẻ thông tin với bên thứ ba</h2>
            <div className="opacity-70">
                <p>Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba.</p>
                <p>Thông tin của bạn chỉ được chia sẻ trong các trường hợp sau:</p>
                <ul className="list-disc pl-5">
                    <li>Khi có sự đồng ý của bạn</li>
                    <li>Khi cần thiết để cung cấp dịch vụ hoặc thực hiện yêu cầu của bạn</li>
                    <li>Khi pháp luật yêu cầu</li>
                </ul>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">5. Quyền của bạn</h2>
            <div className="opacity-70">
                <p>Bạn có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa thông tin cá nhân của mình.</p>
                <p>Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua thông tin liên hệ được cung cấp trên trang web.</p>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">6. Thay đổi chính sách bảo mật</h2>
            <div className="opacity-70">
                <p>Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên trang web của chúng tôi.</p>
                <p>Việc tiếp tục sử dụng dịch vụ sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các thay đổi đó.</p>
                <p>Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách bảo mật này, xin vui lòng liên hệ với chúng tôi qua thông tin liên hệ trên trang web.</p>
            </div>
        </div>
    );
};

export default PrivacyPage;
