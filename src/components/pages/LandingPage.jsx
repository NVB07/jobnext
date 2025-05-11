"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContextProvider";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Marquee } from "@/components/magicui/marquee";
import { Globe } from "@/components/magicui/globe";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { BoxReveal } from "@/components/magicui/box-reveal";

import { BookOpen, FileText, Users, ArrowRight, Star } from "lucide-react";

import Login from "@/components/pageComponents/Login";
import PersonalInfoUpload from "../pageComponents/personal-info-upload";
import ResendVerificationToast from "@/components/pageComponents/ResendVerificationToast";

const LandingPage = () => {
    const { authUserData, setReload } = useContext(AuthContext);
    const carousel = ["/carousel/1.png", "/carousel/2.png", "/carousel/3.png", "/carousel/4.png", "/carousel/5.png", "/carousel/6.png", "/carousel/7.png"];
    return (
        <div className="w-full flex flex-col items-center relative z-10 bg-[hsl(var(--background)/40%)]  pt-24  ">
            <div className="container">
                <div className="w-full flex justify-center pb-8">
                    {authUserData && !authUserData?.emailVerified ? <ResendVerificationToast user={authUserData} /> : null}
                </div>
                <div className="min-[490px]:hidden w-full relative flex items-center justify-center mb-6">
                    <Image src={"/logo.png"} width={80} height={80} alt="logo" className="rounded-xl" />
                </div>
                <AnimatedGradientText>
                    🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                    <span
                        className={cn(
                            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                        )}
                    >
                        NLP - JobNext - AI
                    </span>
                </AnimatedGradientText>
                <div className=" text-center mt-8 px-3 w-full h-full pb-3  overflow-hidden">
                    <div className="w-full ">
                        <SparklesText
                            sparklesCount={20}
                            className="text-4xl min-[490px]:text-5xl min-[760px]:text-6xl font-medium font-sans mb-5"
                            text="Định hướng nghề nghiệp"
                        />
                        <SparklesText
                            sparklesCount={20}
                            className="text-4xl h-fit min-[490px]:text-5xl min-[760px]:text-6xl  font-medium font-sans"
                            text="Tìm việc phù hợp và phát triển kỹ năng!"
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center mt-16 relative z-10">
                    {!authUserData ? (
                        <div>
                            <Login>
                                <RainbowButton className="rounded-full">
                                    <p className="mr-1"> Đăng nhập </p>
                                    <ArrowRight />
                                </RainbowButton>
                            </Login>
                        </div>
                    ) : !authUserData?.userData ? (
                        <PersonalInfoUpload uid={authUserData?.uid} setReload={setReload} />
                    ) : (
                        <Link className="" href={"/jobs"}>
                            <RainbowButton className="rounded-full">
                                <p className="mr-1"> Bắt đầu ngay </p>
                                <ArrowRight />
                            </RainbowButton>
                        </Link>
                    )}
                </div>
                <div className="w-full flex flex-col px-5 justify-center items-center mt-14 ">
                    <div className="text-center mb-12">
                        <p className="text-2xl font-bold"> Hoạt động như thế nào?</p>
                        <p className="max-w-[600px] mt-5 opacity-75">
                            Tìm kiếm việc làm từ nguồn tuyển dụng uy tín. Nhận đề xuất công việc phù hợp dựa trên CV và kỹ năng của bạn. Trải nghiệm phỏng vấn ảo và nhận
                            đánh giá chi tiết.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="  bg-purple-500/10 transition-all">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="h-8 w-8 text-purple-400" />
                                </div>
                                <CardTitle className="text-xl">Blog</CardTitle>
                            </CardHeader>
                            <CardContent className=" text-center">Khám phá các bài viết hữu ích với những thông tin giá trị về việc làm và kỹ năng.</CardContent>
                            <CardFooter className="justify-center pt-2">
                                <Link
                                    href={"/blog"}
                                    className="flex w-fit px-3 h-9 rounded-full items-center justify-center text-white bg-purple-400 hover:bg-purple-500"
                                >
                                    Truy cập <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className=" bg-pink-500/10 transition-all">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16  bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-pink-400" />
                                </div>
                                <CardTitle className="text-xl">CV</CardTitle>
                            </CardHeader>
                            <CardContent className=" text-center">Phân tích CV, đề xuất cải thiện và tạo CV linh hoạt phù hợp với vị trí ứng tuyển của bạn.</CardContent>
                            <CardFooter className="justify-center pt-2">
                                <Link
                                    href={"/CV-analysis"}
                                    className="flex w-fit px-3 h-9 rounded-full items-center justify-center text-white bg-pink-400 hover:bg-pink-500"
                                >
                                    Truy cập <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </CardFooter>
                        </Card>

                        <Card className=" bg-purple-500/10 transition-all">
                            <CardHeader className="text-center">
                                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-purple-400" />
                                </div>
                                <CardTitle className="text-xl">Phỏng Vấn Ảo</CardTitle>
                            </CardHeader>
                            <CardContent className=" text-center">Trải nghiệm phỏng vấn thực tế với AI, đánh giá năng lực và nhận phản hồi chi tiết.</CardContent>
                            <CardFooter className="justify-center pt-2">
                                <Link
                                    href={"/jobs"}
                                    className="flex w-fit px-3 h-9 rounded-full items-center justify-center text-white bg-purple-400 hover:bg-purple-500"
                                >
                                    Truy cập <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className="w-full px-5 py-12">
                    <div className="bg-gradient-to-r   from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-8 border bg-[hsl(var(--background)/50%)]">
                        <div className="flex flex-col h-full min-[1024px]:flex-row gap-8 items-start">
                            <div className="flex-1">
                                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                                    <p className="text-4xl font-semibold">
                                        CV Creator<span className="text-[#5046e6]">.</span>
                                    </p>
                                </BoxReveal>

                                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                                    <p className="text-foreground/70 mb-4">Kéo thả dễ dàng - Tùy biến linh hoạt</p>
                                </BoxReveal>

                                <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                                    <p className="text-foreground/70 mb-4">
                                        👉 Việc tạo ra một bản CV chuyên nghiệp không còn là việc dành riêng cho dân thiết kế hay dân công nghệ. Chỉ với một vài thao tác
                                        kéo – thả đơn giản, bất kỳ ai cũng có thể tự tay thiết kế một bản CV ấn tượng, đúng với phong cách cá nhân của mình.
                                    </p>
                                    <p className="text-foreground/70 mb-4">
                                        👉 Không cần cài đặt phần mềm phức tạp hay mất thời gian học cách sử dụng công cụ rườm rà – mọi thứ đều có trong một giao diện
                                        trực quan, thân thiện, dễ sử dụng.
                                    </p>
                                    <p className="text-foreground/70 mb-4">
                                        Dù là người mới bắt đầu hay đã từng tạo CV trước đó, trải nghiệm thiết kế trên CV Creator sẽ giúp bạn cảm thấy dễ dàng, nhanh
                                        chóng và thú vị hơn bao giờ hết !
                                    </p>
                                </BoxReveal>

                                <div className="mt-2">
                                    <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                                        <a
                                            href={"/cv"}
                                            target="_blank"
                                            className="flex w-fit font-bold text-lg px-3 h-9 rounded-full items-center justify-center text-white bg-pink-400 hover:bg-pink-500"
                                        >
                                            Tạo CV <ArrowRight className="ml-2 h-5 w-5" />
                                        </a>
                                    </BoxReveal>
                                </div>
                            </div>
                            <div className="flex-1 w-full">
                                <Carousel
                                    loop
                                    plugins={[
                                        Autoplay({
                                            delay: 3000,
                                        }),
                                    ]}
                                    className="w-full"
                                >
                                    <CarouselContent>
                                        {carousel.map((item, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-0">
                                                    <Card>
                                                        <CardContent className="flex p-0 aspect-video">
                                                            <Image src={item} className="rounded-xl" alt="carousel" width={900} height={160} />
                                                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <div className="flex justify-center gap-2 mt-4">
                                        <CarouselPrevious className="static translate-y-0" />
                                        <CarouselNext className="static translate-y-0" />
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full px-5 relative ">
                    <div className="relative w-full h-fit bg-[hsl(var(--background)/40%)]  bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 overflow-hidden border border-[#65656542]  rounded-xl p-5">
                        <div className="flex flex-col min-[760px]:flex-row ">
                            <div className="w-full min-[760px]:w-4/5">
                                <p className="text-4xl font-semibold  min-[760px]:text-left ">Kết nối tài năng, chắc bước tương lai !</p>
                                <p className="opacity-60 mt-5">
                                    Với công nghệ phân tích dữ liệu NLP kết hợp AI, chúng tôi không chỉ mang đến những gợi ý công việc chính xác, phù hợp với kỹ năng và
                                    kinh nghiệm của bạn, mà còn hỗ trợ bạn xây dựng một lộ trình sự nghiệp vững chắc. Từ việc tối ưu CV, nâng cao kỹ năng phỏng vấn cho
                                    đến cập nhật xu hướng ngành nghề, chúng tôi đồng hành cùng bạn trên từng bước tiến đến thành công.
                                </p>
                            </div>
                            <div className="w-full min-[760px]:w-1/5 flex justify-center">
                                <Globe className="relative overflow-hidden mx-0 w-64 min-[900px]:w-48" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full px-5">
                    <div className="mt-14  bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 px-5 min-[490px]:px-5 relative flex flex-col min-[1024px]:flex-row border border-[#65656542] rounded-xl p-5 bg-[hsl(var(--background)/40%)] ">
                        <div className="min-[1024px]:w-1/2 w-full ">
                            <HeroVideoDialog
                                className="block "
                                animationStyle="from-center"
                                videoSrc="https://www.youtube.com/embed/JsNvHJsufhI?controls=1&showinfo=0&rel=0&autoplay=0&loop=1&mute=0"
                                thumbnailSrc="https://i.pinimg.com/736x/90/aa/93/90aa931cdccf629e5efc24f898e896d3.jpg"
                                thumbnailAlt="Hero Video"
                            />
                        </div>
                        <div className="min-[1024px]:w-1/2 w-full mt-4 min-[1024px]:mt-0 min-[1024px]:px-4 ">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Tìm công việc mơ ước của bạn một cách nhanh chóng.</h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ">
                                            <Star className="h-3 w-3 text-purple-500" />
                                        </div>
                                        <p className="text-foreground/70">Cá nhân hóa hồ sơ ứng tuyển để tạo ấn tượng tốt nhất với doanh nghiệp</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ">
                                            <Star className="h-3 w-3 text-purple-500 light:" />
                                        </div>
                                        <p className="text-foreground/70">Giải pháp tiếp thị số cho tương lai</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ">
                                            <Star className="h-3 w-3 text-purple-500 light:" />
                                        </div>
                                        <p className="text-foreground/70">Khám phá hàng ngàn cơ hội việc làm trên nền tảng tuyển dụng</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ">
                                            <Star className="h-3 w-3 text-purple-500 light:" />
                                        </div>
                                        <p className="text-foreground/70">Nhận đề xuất công việc phù hợp với kỹ năng và kinh nghiệm của bạn</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ">
                                            <Star className="h-3 w-3 text-purple-500 light:" />
                                        </div>
                                        <p className="text-foreground/70">Tìm kiếm việc làm dễ dàng với hệ thống gợi ý thông minh</p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center ">
                                            <Star className="h-3 w-3 text-purple-500 light:" />
                                        </div>
                                        <p className="text-foreground/70">Công cụ phỏng vấn ảo giúp bạn tự tin hơn trước nhà tuyển dụng</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-14 min-[490px]:px-5 px-0 overflow-x-hidden">
                    <Marquee pauseOnHover className="[--duration:20s] ">
                        {firstRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="[--duration:20s]">
                        {secondRow.map((review) => (
                            <ReviewCard key={review.username} {...review} />
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "Phân tích CV tự động và đề xuất công việc phù hợp dựa trên kỹ năng, kinh nghiệm của ứng viên.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "Hỗ trợ tối ưu CV, gợi ý chỉnh sửa để tăng khả năng thu hút nhà tuyển dụng.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "Tích hợp hệ thống phỏng vấn ảo, giúp ứng viên luyện tập và cải thiện kỹ năng trả lời phỏng vấn.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "Thu thập và cập nhật danh sách việc làm từ các nền tảng tuyển dụng hàng đầu, giúp ứng viên tiếp cận nhiều cơ hội hơn.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "Gợi ý các kỹ năng cần thiết để nâng cao năng lực, đáp ứng yêu cầu của thị trường lao động.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "Hỗ trợ kết nối tìm kiếm việc làm, giúp quy trình tìm việc diễn ra nhanh chóng và hiệu quả hơn.",
        img: "https://avatar.vercel.sh/james",
    },
];

var firstRow = reviews.slice(0, reviews.length / 2);
var secondRow = reviews.slice(reviews.length / 2);

var ReviewCard = ({ img, name, username, body }) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-pink-500/10"
                // dark styles
                // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};
