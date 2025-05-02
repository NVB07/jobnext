"use client";

import { useRef, memo, useEffect, useContext, useState } from "react";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useRouter } from "next13-progressbar";
import { PATCH_METHOD } from "@/services/services";
import isEqual from "lodash/isEqual";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

import { AuthContext } from "@/context/AuthContextProvider";

const schema = yup.object().shape({
    fullName: yup.string().required("Họ tên không được để trống"),
    birthYear: yup
        .string()
        .trim()
        .test("birthYear-format", "Năm sinh không đúng định dạng", (value) => {
            if (!value) return true; // Không nhập thì cho qua
            const formats = [
                /^\d{4}$/, // yyyy
                /^(0?[1-9]|1[0-2])\/\d{4}$/, // mm/yyyy
                /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/, // dd/mm/yyyy
            ];
            return formats.some((regex) => regex.test(value));
        }),
    address: yup.string().required("Địa chỉ không được để trống"),
    phone: yup
        .string()
        .transform((value) => value?.replace(/\s+/g, "") || "") // xoá khoảng trắng nếu có
        .test("is-valid-phone", "Số điện thoại không hợp lệ", (value) => {
            if (!value) return true; // Nếu rỗng thì cho qua
            return /^[0-9]{10,11}$/.test(value); // Nếu có thì phải đúng
        })
        .nullable()
        .notRequired(),
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    portfolio: yup.string().url("URL portfolio không hợp lệ").nullable(),
    careerGoal: yup.string().nullable(),
    university: yup.string().nullable(),
    gpa: yup.string().nullable(),
    major: yup.string().nullable(),
    graduationYear: yup.string().nullable(),
    achievements: yup.string().nullable(),
    activities: yup.string().nullable(),
    hobbies: yup.string().nullable(),
    appliedPosition: yup.string().nullable(),
    level: yup.string().required("Vui lòng chọn cấp bậc"),
    career: yup.string().required("Vui lòng chọn ngành nghề"),
    workExperience: yup.string().nullable(),
    experienceYears: yup.string().required("Vui lòng chọn số năm kinh nghiệm"),
    projects: yup.string().nullable(),
    skills: yup.string().required("Vui lòng nhập kỹ năng"),
    reference: yup.string().nullable(),
});

const UserDataForm = memo(function UserDataForm() {
    const formRef = useRef(null);
    const { authUserData, setReload } = useContext(AuthContext);
    const [initialization, setInitialization] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear + 10 - i);

    const vietnameseProvinces = [
        "An Giang",
        "Bà Rịa - Vũng Tàu",
        "Bắc Giang",
        "Bắc Kạn",
        "Bạc Liêu",
        "Bắc Ninh",
        "Bến Tre",
        "Bình Định",
        "Bình Dương",
        "Bình Phước",
        "Bình Thuận",
        "Cà Mau",
        "Cần Thơ",
        "Cao Bằng",
        "Đà Nẵng",
        "Đắk Lắk",
        "Đắk Nông",
        "Điện Biên",
        "Đồng Nai",
        "Đồng Tháp",
        "Gia Lai",
        "Hà Giang",
        "Hà Nam",
        "Hà Nội",
        "Hà Tĩnh",
        "Hải Dương",
        "Hải Phòng",
        "Hậu Giang",
        "Hòa Bình",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Phú Yên",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "TP Hồ Chí Minh",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái",
    ];

    const jobCategoriesMap = {
        "Academic/Education": "Học thuật/Giáo dục",
        "Accounting/Auditing": "Kế toán/Kiểm toán",
        "Administration/Office Support": "Hành chính/Hỗ trợ văn phòng",
        "Agriculture/Livestock/Fishery": "Nông nghiệp/Chăn nuôi/Thủy sản",
        "Architecture/Construction": "Kiến trúc/Xây dựng",
        "Art, Media & Printing/Publishing": "Nghệ thuật, Truyền thông & In ấn/Xuất bản",
        "Banking & Financial Services": "Ngân hàng & Dịch vụ tài chính",
        "CEO & General Management": "CEO & Quản lý chung",
        "Customer Service": "Dịch vụ khách hàng",
        Design: "Thiết kế",
        "Engineering & Sciences": "Kỹ thuật & Khoa học",
        "Food and Beverage": "Thực phẩm và Đồ uống",
        "Government/NGO": "Chính phủ/Tổ chức phi chính phủ",
        "Healthcare/Medical Services": "Chăm sóc sức khỏe/Dịch vụ y tế",
        "Hospitality/Tourism": "Khách sạn/Du lịch",
        "Human Resources/Recruitment": "Nhân sự/Tuyển dụng",
        "Information Technology/Telecommunications": "Công nghệ thông tin/Viễn thông",
        Insurance: "Bảo hiểm",
        Legal: "Pháp lý",
        "Logistics/Import Export/Warehouse": "Hậu cần/Xuất nhập khẩu/Kho bãi",
        Manufacturing: "Sản xuất",
        "Marketing, Advertising/Communications": "Marketing, Quảng cáo/Truyền thông",
        Pharmacy: "Dược phẩm",
        "Real Estate": "Bất động sản",
        "Retail/Consumer Products": "Bán lẻ/Sản phẩm tiêu dùng",
        Sales: "Bán hàng",
        Technician: "Kỹ thuật viên",
        "Textiles, Garments/Footwear": "Dệt may, May mặc/Giày dép",
        Transportation: "Vận tải",
        Others: "Khác",
    };

    const experienceLevelsMap = {
        "Intern/Student": "Thực tập sinh/Sinh viên",
        "Fresher/Entry level": "Mới tốt nghiệp/Mới vào nghề",
        "Experienced \\(non-manager\\)": "Có kinh nghiệm (không phải quản lý)",
        Manager: "Quản lý",
        "Director and above": "Giám đốc trở lên",
    };

    const experienceYearsMap = ["Chưa có kinh nghiệm", "1 năm", "2 năm", "3 năm", "4 năm", "5 năm", "Trên 5 năm"];

    const refs = {
        fullName: useRef(null),
        birthYear: useRef(null),
        address: useRef(null),
        phone: useRef(null),
        email: useRef(null),
        portfolio: useRef(null),
        careerGoal: useRef(null),
        university: useRef(null),
        gpa: useRef(null),
        major: useRef(null),
        graduationYear: useRef(null),
        achievements: useRef(null),
        activities: useRef(null),
        hobbies: useRef(null),
        appliedPosition: useRef(null),
        level: useRef(null),
        career: useRef(null),
        workExperience: useRef(null),
        experienceYears: useRef(null),
        projects: useRef(null),
        skills: useRef(null),
        reference: useRef(null),
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            fullName: authUserData?.userData?.profile?.Name || "",
            birthYear: authUserData?.userData?.profile?.DOB || "",
            address: authUserData?.userData?.profile?.Address || "",
            phone: authUserData?.userData?.profile?.Phone_Number || "",
            email: authUserData?.userData?.profile?.Email || "",
            portfolio: authUserData?.userData?.profile?.LinkedInPortfolio || "",
            careerGoal: authUserData?.userData?.profile?.Career_objective || "",
            university: authUserData?.userData?.profile?.University || "",
            gpa: authUserData?.userData?.profile?.GPA || "",
            major: authUserData?.userData?.profile?.Major || "",
            graduationYear: authUserData?.userData?.profile?.Graduated_year || "",
            achievements: authUserData?.userData?.profile?.Achievements_awards || "",
            activities: authUserData?.userData?.profile?.Extracurricular_activities || "",
            hobbies: authUserData?.userData?.profile?.Interests || "",
            appliedPosition: authUserData?.userData?.profile?.Job_position || "",
            level: authUserData?.userData?.profile?.Rank || "",
            career: authUserData?.userData?.profile?.Industry || "",
            workExperience: authUserData?.userData?.profile?.Work_Experience || "",
            experienceYears: authUserData?.userData?.profile?.Years_of_experience || "",
            projects: authUserData?.userData?.profile?.Projects || "",
            skills: authUserData?.userData?.profile?.Skills || "",
            reference: authUserData?.userData?.profile?.References || "",
        },

        resolver: yupResolver(schema),
    });
    useEffect(() => {
        const firstErrorField = Object.keys(refs).find((field) => errors[field]);

        if (firstErrorField && refs[firstErrorField]?.current) {
            refs[firstErrorField].current.focus?.();
            refs[firstErrorField].current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [errors]);

    useEffect(() => {
        if (authUserData?.userData) {
            reset({
                fullName: authUserData?.userData?.profile?.Name || "",
                birthYear: authUserData?.userData?.profile?.DOB || "",
                address: authUserData?.userData?.profile?.Address || "",
                phone: authUserData?.userData?.profile?.Phone_Number || "",
                email: authUserData?.userData?.profile?.Email || "",
                portfolio: authUserData?.userData?.profile?.LinkedInPortfolio || "",
                careerGoal: authUserData?.userData?.profile?.Career_objective || "",
                university: authUserData?.userData?.profile?.University || "",
                gpa: authUserData?.userData?.profile?.GPA || "",
                major: authUserData?.userData?.profile?.Major || "",
                graduationYear: authUserData?.userData?.profile?.Graduated_year || "",
                achievements: authUserData?.userData?.profile?.Achievements_awards || "",
                activities: authUserData?.userData?.profile?.Extracurricular_activities || "",
                hobbies: authUserData?.userData?.profile?.Interests || "",
                appliedPosition: authUserData?.userData?.profile?.Job_position || "",
                level: authUserData?.userData?.profile?.Rank || "",
                career: authUserData?.userData?.profile?.Industry || "",
                workExperience: authUserData?.userData?.profile?.Work_Experience || "",
                experienceYears: authUserData?.userData?.profile?.Years_of_experience || "",
                projects: authUserData?.userData?.profile?.Projects || "",
                skills: authUserData?.userData?.profile?.Skills || "",
                reference: authUserData?.userData?.profile?.References || "",
            });
            setInitialization(false);
        } else setInitialization(false);
    }, [authUserData]);

    const handleReset = () => {
        reset({
            fullName: "",
            birthYear: "",
            address: "",
            phone: "",
            email: "",
            portfolio: "",
            careerGoal: "",
            university: "",
            gpa: "",
            major: "",
            graduationYear: "",
            achievements: "",
            activities: "",
            hobbies: "",
            appliedPosition: "",
            level: "",
            career: "",
            workExperience: "",
            experienceYears: "",
            projects: "",
            skills: "",
            reference: "",
        });
        toast.success("Đã reset form thành công!");
    };
    const onSubmit = async (data) => {
        setIsLoading(true);
        const oldData = {
            fullName: authUserData?.userData?.profile?.Name || "",
            birthYear: authUserData?.userData?.profile?.DOB || "",
            address: authUserData?.userData?.profile?.Address || "",
            phone: authUserData?.userData?.profile?.Phone_Number || "",
            email: authUserData?.userData?.profile?.Email || "",
            portfolio: authUserData?.userData?.profile?.LinkedInPortfolio || "",
            careerGoal: authUserData?.userData?.profile?.Career_objective || "",
            university: authUserData?.userData?.profile?.University || "",
            gpa: authUserData?.userData?.profile?.GPA || "",
            major: authUserData?.userData?.profile?.Major || "",
            graduationYear: authUserData?.userData?.profile?.Graduated_year || "",
            achievements: authUserData?.userData?.profile?.Achievements_awards || "",
            activities: authUserData?.userData?.profile?.Extracurricular_activities || "",
            hobbies: authUserData?.userData?.profile?.Interests || "",
            appliedPosition: authUserData?.userData?.profile?.Job_position || "",
            level: authUserData?.userData?.profile?.Rank || "",
            career: authUserData?.userData?.profile?.Industry || "",
            workExperience: authUserData?.userData?.profile?.Work_Experience || "",
            experienceYears: authUserData?.userData?.profile?.Years_of_experience || "",
            projects: authUserData?.userData?.profile?.Projects || "",
            skills: authUserData?.userData?.profile?.Skills || "",
            reference: authUserData?.userData?.profile?.References || "",
        };
        if (isEqual(data, oldData)) {
            toast.warning("Không có thay đổi nào để cập nhật!");
            setIsLoading(false);
            return;
        }
        const dataUpdate = {
            Name: data.fullName,
            DOB: data.birthYear,
            Phone_Number: data.phone,
            Address: data.address,
            Email: data.email,
            LinkedInPortfolio: data.portfolio,
            Career_objective: data.careerGoal,
            University: data.university,
            Major: data.major,
            GPA: data.gpa,
            Graduated_year: data.graduationYear,
            Achievements_awards: data.achievements,
            Extracurricular_activities: data.activities,
            Interests: data.hobbies,
            Job_position: data.appliedPosition,
            Rank: data.level,
            Industry: data.career,
            Work_Experience: data.workExperience,
            Years_of_experience: data.experienceYears,
            Projects: data.projects,
            Skills: data.skills,
            References: data.reference,
        };
        const response = await PATCH_METHOD(`users/${authUserData.uid}`, { profile: dataUpdate });

        if (response?.success) {
            setReload((prev) => !prev);
            toast.success("Cập nhật thông tin thành công!");
            router.push("/");
            setIsLoading(false);
        } else {
            toast.error("Cập nhật thông tin thất bại!");
            setIsLoading(false);
        }
    };
    if (initialization) return <div className="w-full h-screen flex items-center justify-center">Đang khởi tạo...</div>;
    return (
        <div className="container w-full mx-auto py-8 px-4">
            <div className="w-full max-w-4xl mx-auto ">
                <h1 className="text-2xl font-bold mb-2">Chỉnh sửa hồ sơ</h1>
                <h3 className="text-sm mb-6 text-orange-500 border p-2 rounded-md border-orange-500/70">
                    ⚠️ Thông tin bạn cung cấp sẽ được sử dụng để cá nhân hóa trải nghiệm của bạn. Chúng tôi sẽ dựa trên dữ liệu này để đề xuất công việc phù hợp, tạo CV
                    và gợi ý chỉnh sửa CV. Hãy đảm bảo nhập đầy đủ và chính xác để nhận được những tư vấn và cơ hội tốt nhất.
                </h3>
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-8 ">
                    <div type="multiple" className="w-full ">
                        {/* Thông tin cá nhân */}
                        <div value="section-1">
                            <div className="text-lg font-semibold text-green-600">Hồ sơ cá nhân</div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">
                                            Họ tên <span className="text-red-500">*</span>
                                        </Label>

                                        <Input id="fullName" name="fullName" placeholder="Nguyen Van A" {...register("fullName")} />

                                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName?.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="birthYear">
                                            Năm sinh <span className="text-red-500">*</span>
                                        </Label>
                                        <Input id="birthYear" name="birthYear" placeholder="dd/mm/yyyy hoặc mm/yyyy hoặc yyyy" {...register("birthYear")} />

                                        {errors.birthYear && <p className="text-red-500 text-sm">{errors.birthYear.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address">
                                            Địa chỉ <span className="text-red-500">*</span>
                                        </Label>
                                        <Controller
                                            name="address"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <div>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger ref={refs.address} id="address">
                                                                <SelectValue placeholder="Chọn địa chỉ" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {vietnameseProvinces.map((province) => (
                                                                    <SelectItem key={province} value={province}>
                                                                        {province}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Số điện thoại</Label>
                                        <Input id="phone" ref={refs.phone} placeholder="0987654321" {...register("phone")} />
                                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="Email">
                                            Email <span className="text-red-500">*</span>
                                        </Label>
                                        <Input id="Email" {...register("email")} placeholder="jonhDoe@gmail.com" />
                                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="portfolio">LinkedIn/Portfolio</Label>
                                        <Input ref={refs.portfolio} id="portfolio" placeholder="LinkedIn/Portfolio" {...register("portfolio")} />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="careerGoals">Mục tiêu nghề nghiệp</Label>
                                        <Textarea
                                            {...register("careerGoal")}
                                            id="careerGoals"
                                            placeholder="Mô tả ngắn gọn về mục tiêu nghề nghiệp của bạn"
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Học vấn */}
                        <div value="section-2" className="w-full mt-8">
                            <div className="text-lg font-semibold text-green-600">Học vấn</div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="university">Tên trường đại học</Label>
                                        <Input id="university" {...register("university")} placeholder="Đại học Ngoại Thương" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="gpa">Điểm GPA</Label>
                                        <Input id="gpa" {...register("gpa")} placeholder="3.5/4.0" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="major">Chuyên ngành</Label>
                                        <Input id="major" {...register("major")} placeholder="Quản trị kinh doanh" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="graduationYear">Năm tốt nghiệp hoặc dự kiến</Label>
                                        <Controller
                                            name="graduationYear"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger id="graduationYear">
                                                            <SelectValue placeholder="Chọn năm tốt nghiệp" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {years.map((year) => (
                                                                <SelectItem key={`grad-${year}`} value={year.toString()}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="achievements">Các thành tích và giải thưởng</Label>
                                        <Textarea
                                            {...register("achievements")}
                                            id="achievements"
                                            placeholder="Liệt kê các thành tích và giải thưởng nếu có"
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="extracurricular">Hoạt động ngoại khóa liên quan đến công việc</Label>
                                        <Textarea
                                            {...register("activities")}
                                            id="extracurricular"
                                            placeholder="Mô tả các hoạt động ngoại khóa liên quan đến công việc nếu có"
                                            className="min-h-[100px]"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="hobbies">Sở thích</Label>
                                        <Textarea id="hobbies" placeholder="Sở thích" {...register("hobbies")} className="min-h-[100px]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Thông tin nghề nghiệp */}
                        <div value="section-3" className="w-full mt-8">
                            <div className="text-lg font-semibold text-green-600">Thông tin nghề nghiệp</div>
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-1">
                                    <div className="space-y-2">
                                        <Label htmlFor="positionApplied">Vị trí ứng tuyển</Label>
                                        <Input {...register("appliedPosition")} id="positionApplied" placeholder="Quản trị kinh doanh" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="level">
                                            Vị trí cấp bậc <span className="text-red-500">*</span>
                                        </Label>
                                        <Controller
                                            name="level"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <div>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger ref={refs.level} id="level">
                                                                <SelectValue placeholder="Chọn cấp bậc" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {Object.entries(experienceLevelsMap).map(([value, label]) => (
                                                                        <SelectItem key={value} value={value}>
                                                                            {label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.level && <p className="text-red-500 text-sm">{errors.level.message}</p>}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="career">
                                            Ngành nghề <span className="text-red-500">*</span>
                                        </Label>
                                        <Controller
                                            name="career"
                                            control={control}
                                            render={({ field }) => {
                                                return (
                                                    <div>
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger ref={refs.career} id="career">
                                                                <SelectValue placeholder="Chọn ngành nghề" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    {Object.entries(jobCategoriesMap).map(([value, label]) => (
                                                                        <SelectItem key={value} value={value}>
                                                                            {label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        {errors.career && <p className="text-red-500 text-sm">{errors.career.message}</p>}
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="workExperience">Kinh nghiệm làm việc</Label>
                                        <Textarea
                                            id="workExperience"
                                            {...register("workExperience")}
                                            placeholder={
                                                "Lịch sử công việc từ gần đây nhất đến xa nhất:\n- Tên công ty: ...\n- Chức danh: ...\n- Thời gian: ...\n- Trách nhiệm: ...\n- Thành tích: ..."
                                            }
                                            className="min-h-[200px]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="yearsOfExperience">
                                            Số năm kinh nghiệm <span className="text-red-500">*</span>
                                        </Label>
                                        <Controller
                                            name="experienceYears"
                                            control={control}
                                            render={({ field }) => (
                                                <div>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger ref={refs.experienceYears} id="experienceYears">
                                                            <SelectValue placeholder="Chọn số năm kinh nghiệm" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {experienceYearsMap.map((year) => (
                                                                <SelectItem key={year} value={year}>
                                                                    {year}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    {errors.experienceYears && <p className="text-red-500 text-sm">{errors.experienceYears.message}</p>}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="projects">Các dự án đã làm</Label>
                                        <Textarea
                                            {...register("projects")}
                                            id="projects"
                                            placeholder={
                                                "Mô tả các dự án đã làm:\n- Tên dự án: ...\n- Công ty: ...\n- Công nghệ/công cụ sử dụng: ...\n- Vị trí trong dự án: ..."
                                            }
                                            className="min-h-[200px]"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="skills">
                                            Kỹ năng <span className="text-red-500">*</span>
                                        </Label>
                                        <Textarea
                                            ref={refs.skills}
                                            {...register("skills")}
                                            id="skills"
                                            placeholder="Liệt kê các kỹ năng chuyên môn và kỹ năng mềm của bạn"
                                        />
                                        {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="reference">Người tham chiếu</Label>
                                        <Textarea
                                            {...register("reference")}
                                            id="reference"
                                            placeholder={
                                                "Thông tin người tham chiếu (nếu có):\n- Tên: ...\n- Chức vụ: ...\n- Công ty: ...\n- Số điện thoại: ...\n- Email: ..."
                                            }
                                            className="min-h-[150px]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <Button onClick={handleReset} variant="outline" type="reset">
                            Xóa form
                        </Button>
                        <Button disabled={isLoading} onClick={handleSubmit} className="bg-gradient-to-r from-orange-500 to-purple-500 text-white font-bold" type="submit">
                            {!isLoading ? (
                                " Lưu Thông tin"
                            ) : (
                                <p className="flex justify-center items-center space-x-2">
                                    Đang lưu thông tin
                                    <span className="ml-2">
                                        <Loader2 className="animate-spin" />
                                    </span>
                                </p>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default UserDataForm;
