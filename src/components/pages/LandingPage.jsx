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
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

import { NotebookPen, BotMessageSquare } from "lucide-react";
import { ArrowRight } from "lucide-react";
import IconGroup2 from "@/components/ui/IconGroup2";

import Login from "@/components/pageComponents/Login";
import ResendVerificationToast from "@/components/pageComponents/ResendVerificationToast";

const LandingPage = () => {
    const { authUserData } = useContext(AuthContext);

    return (
        <div className="w-full  pt-24  ">
            <div className="w-full flex justify-center pb-8">{authUserData && !authUserData?.emailVerified ? <ResendVerificationToast user={authUserData} /> : null}</div>
            <div className="min-[490px]:hidden w-full flex items-center justify-center mb-6">
                <Image src={"/logo.png"} width={80} height={80} alt="logo" className="rounded-xl" />
            </div>
            <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
                <span
                    className={cn(
                        `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                    )}
                >
                    JobNext - AI
                </span>
            </AnimatedGradientText>
            <div className=" text-center mt-8 px-3 w-full overflow-hidden">
                <SparklesText
                    sparklesCount={20}
                    className="text-4xl min-[490px]:text-5xl min-[760px]:text-6xl font-medium font-sans mb-5"
                    text="Định hướng tư vấn nghề nghiệp với AI"
                />
                <SparklesText
                    sparklesCount={20}
                    className="text-4xl min-[490px]:text-5xl min-[760px]:text-6xl font-medium font-sans"
                    text="Tìm việc phù hợp và phát triển kỹ năng!"
                />
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
                ) : (
                    <RainbowButton className="rounded-full">
                        <p className="mr-1"> Bắt đầu </p>
                        <ArrowRight />
                    </RainbowButton>
                )}
            </div>
            <div className="w-full flex flex-col px-5 justify-center items-center mt-14 ">
                <div className="text-center mb-12">
                    <p className="text-2xl font-bold"> Hoạt động như thế nào?</p>
                    <p className="max-w-[600px] mt-5 opacity-75">
                        Tìm kiếm việc làm từ nhiều nguồn tuyển dụng. Nhận đề xuất công việc phù hợp dựa trên CV và kỹ năng của bạn. Trải nghiệm phỏng vấn ảo và nhận đánh
                        giá chi tiết.
                    </p>
                </div>
                <div className="w-full flex flex-col  justify-center items-center min-[680px]:flex-row mb-4">
                    <CardContainer className="inter-var mx-4 mb-5 min-[680px]:mb-0">
                        <CardBody className="bg-gray-50 relative group/card flex flex-col items-center dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] min-[680px]:w-44 w-full h-auto rounded-xl p-6 border  ">
                            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white ">
                                <div className="bg-[#7e7e7e37] rounded-full w-16 h-16 flex items-center justify-center">
                                    <NotebookPen width={40} height={40} />
                                </div>
                            </CardItem>
                            <CardItem as="p" translateZ="60" className="font-bold mt-2 ">
                                Blog
                            </CardItem>
                            <CardItem translateZ="60" className="w-full text-sm mt-3 text-neutral-500 dark:text-neutral-300">
                                Khám phá các bài viết hữu ích với những thông tin giá trị về việc làm và kỹ năng.
                            </CardItem>
                            <div className="flex justify-between items-center mt-5">
                                <CardItem translateZ={10} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs ">
                                    <Link href={"/blog"}>Xem thêm</Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var mx-4 mb-5 min-[680px]:mb-0">
                        <CardBody className="bg-gray-50 relative group/card flex flex-col items-center dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] min-[680px]:w-44 w-full h-auto rounded-xl p-6 border  ">
                            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white ">
                                <div className="bg-[#7e7e7e37] rounded-full w-16 h-16 flex items-center justify-center">
                                    <BotMessageSquare width={40} height={40} />
                                </div>
                            </CardItem>
                            <CardItem as="p" translateZ="60" className="font-bold mt-2 ">
                                Chatbot AI
                            </CardItem>
                            <CardItem translateZ="60" className="w-full text-sm mt-3 text-neutral-500 dark:text-neutral-300">
                                Trợ lý thông minh hỗ trợ bạn tìm kiếm việc làm, phân tích CV và đề xuất kỹ năng cần học.
                            </CardItem>
                            <div className="flex justify-between items-center mt-5">
                                <CardItem translateZ={10} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs ">
                                    <Link href={"/chatbot"}> Xem thêm</Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                    <CardContainer className="inter-var mx-4 mb-5 min-[680px]:mb-0">
                        <CardBody className="bg-gray-50 relative group/card flex flex-col items-center dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] min-[680px]:w-44 w-full h-auto rounded-xl p-6 border  ">
                            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white ">
                                <div className="bg-[#7e7e7e37] rounded-full w-16 h-16 flex items-center justify-center">
                                    <IconGroup2 width={40} height={40} />
                                </div>
                            </CardItem>
                            <CardItem as="p" translateZ="60" className="font-bold mt-2 ">
                                Phỏng Vấn Ảo
                            </CardItem>
                            <CardItem translateZ="60" className="w-full text-sm mt-3 text-neutral-500 dark:text-neutral-300">
                                Trải nghiệm phỏng vấn thực tế với AI, đánh giá năng lực và nhận phản hồi chi tiết.
                            </CardItem>
                            <div className="flex justify-between items-center mt-5">
                                <CardItem translateZ={10} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs ">
                                    <Link href={"/virtual-interview"}> Xem thêm</Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
            <div className="w-full px-5 my-12">
                <div className="relative w-full h-fit  overflow-hidden border border-[#65656542]  rounded-xl p-5">
                    <div className="flex flex-col min-[760px]:flex-row ">
                        <div className="w-full min-[760px]:w-4/5">
                            <p className="text-4xl font-semibold  min-[760px]:text-left ">Kết nối tài năng, chắc bước tương lai !</p>
                            <p className="opacity-60 mt-5">
                                Với công nghệ phân tích dữ liệu từ AI, chúng tôi không chỉ mang đến những gợi ý công việc chính xác, phù hợp với kỹ năng và kinh nghiệm
                                của bạn, mà còn hỗ trợ bạn xây dựng một lộ trình sự nghiệp vững chắc. Từ việc tối ưu CV, nâng cao kỹ năng phỏng vấn cho đến cập nhật xu
                                hướng ngành nghề, chúng tôi đồng hành cùng bạn trên từng bước tiến đến thành công.
                            </p>
                        </div>
                        <div className="w-full min-[760px]:w-1/5 flex justify-center">
                            <Globe className="relative overflow-hidden mx-0 w-64 min-[900px]:w-48" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full px-5">
                <div className="mt-14 px-5 min-[490px]:px-5 relative flex flex-col min-[1024px]:flex-row border border-[#65656542] rounded-xl p-5 bg-[hsl(var(--background)/87%)] ">
                    <div className="min-[1024px]:w-1/2 w-full ">
                        <HeroVideoDialog
                            className="block dark:hidden "
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/JsNvHJsufhI?controls=1&showinfo=0&rel=0&autoplay=0&loop=1&mute=0"
                            thumbnailSrc="https://i.pinimg.com/736x/90/aa/93/90aa931cdccf629e5efc24f898e896d3.jpg"
                            thumbnailAlt="Hero Video"
                        />
                        <HeroVideoDialog
                            className="hidden dark:block "
                            animationStyle="from-center"
                            videoSrc="https://www.youtube.com/embed/JsNvHJsufhI?controls=1&showinfo=0&rel=0&autoplay=0&loop=1&mute=0"
                            thumbnailSrc="https://i.pinimg.com/736x/90/aa/93/90aa931cdccf629e5efc24f898e896d3.jpg"
                            thumbnailAlt="Hero Video"
                        />
                    </div>
                    <div className="min-[1024px]:w-1/2 w-full mt-4 min-[1024px]:mt-0 min-[1024px]:px-4 ">
                        <p className="text-4xl font-semibold"> Tìm công việc mơ ước của bạn một cách nhanh chóng.</p>
                        <ul className="mt-5 text-base opacity-75">
                            <li className="before:content-['•'] before:mr-2 flex items-start">Cá nhân hóa hồ sơ ứng tuyển để tạo ấn tượng tốt nhất với doanh nghiệp</li>
                            <li className="before:content-['•'] before:mr-2 flex items-start">Giải pháp tiếp thị số cho tương lai</li>
                            <li className="before:content-['•'] before:mr-2 flex items-start">Khám phá hàng ngàn cơ hội việc làm trên nền tảng tuyển dụng</li>
                            <li className="before:content-['•'] before:mr-2 flex items-start">Nhận đề xuất công việc phù hợp với kỹ năng và kinh nghiệm của bạn</li>
                            <li className="before:content-['•'] before:mr-2 flex items-start">Tìm kiếm việc làm dễ dàng với hệ thống gợi ý thông minh</li>
                            <li className="before:content-['•'] before:mr-2 flex items-start">Công cụ phỏng vấn ảo giúp bạn tự tin hơn trước nhà tuyển dụng</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-14 min-[490px]:px-5 px-0 overflow-x-hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
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
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
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
