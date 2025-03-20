const TermsPage = () => {
    return (
        <div className="min-[880px]:px-20 px-5 pt-24">
            <h1 className="font-bold text-3xl ">ĐIỀU KHOẢN DỊCH VỤ</h1>
            <p className="text-sm w-full text-gray-500 pb-3 border-b mb-5">Ngày cập nhật: 01/02/2025</p>
            <h2 className="text-xl uppercase font-bold">1. ĐĂNG KÝ</h2>
            <p className="opacity-70">
                Để sử dụng dịch vụ, bạn phải tạo một tài khoản theo yêu cầu của hệ thống. Bạn cam kết rằng việc sử dụng tài khoản phải tuân thủ các quy định của chúng
                tôi. Đồng thời, tất cả các thông tin bạn cung cấp phải đúng, chính xác và đầy đủ tại thời điểm đăng ký.
            </p>

            <h2 className="text-xl uppercase font-bold mt-4">2. QUYỀN TRUY CẬP VÀ THU THẬP THÔNG TIN</h2>
            <div className="opacity-70">
                <p>Khi sử dụng hệ thống, bạn thừa nhận rằng chúng tôi có quyền thu thập các thông tin sau:</p>
                <ul className="list-disc pl-5">
                    <li>
                        <strong>Thông tin cá nhân</strong>: Họ tên, số điện thoại, email, ảnh đại diện...
                    </li>
                    <li>
                        <strong>Thông tin nghề nghiệp</strong>: Kinh nghiệm làm việc, sở thích, kỹ năng, định hướng nghề nghiệp, CV...
                    </li>
                    <li>
                        <strong>Dữ liệu tương tác</strong>: Hành vi sử dụng hệ thống nhằm cải thiện trải nghiệm người dùng.
                    </li>
                </ul>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">3. TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM</h2>
            <p className="opacity-70">
                Chúng tôi không cam kết rằng dịch vụ sẽ không bị lỗi hoặc gián đoạn. Chúng tôi không đảm bảo rằng dịch vụ không chứa các yếu tố độc hại như virus, mã
                độc...
            </p>

            <h2 className="text-xl uppercase font-bold mt-4">4. GIỚI HẠN TRÁCH NHIỆM PHÁP LÝ</h2>
            <div className="opacity-70">
                <p>Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất, thiệt hại nào phát sinh từ:</p>
                <ul className="list-disc pl-5">
                    <li>Việc bạn sử dụng hoặc không thể sử dụng dịch vụ.</li>
                    <li>Mọi lỗi kỹ thuật, gián đoạn hoặc sự cố hệ thống.</li>
                    <li>Việc xử lý dữ liệu cá nhân của bạn bởi bên thứ ba.</li>
                    <li>Mọi thiệt hại liên quan đến thiết bị cá nhân của bạn.</li>
                </ul>
            </div>

            <h2 className="text-xl uppercase font-bold mt-4">5. THAY ĐỔI ĐIỀU KHOẢN</h2>
            <p className="opacity-70">
                Chúng tôi có quyền thay đổi, cập nhật điều khoản sử dụng bất cứ lúc nào. Những thay đổi sẽ có hiệu lực ngay sau khi được công bố. Bạn có trách nhiệm theo
                dõi và cập nhật điều khoản mới nhất.
            </p>
        </div>
    );
};

export default TermsPage;
