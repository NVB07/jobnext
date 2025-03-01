"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { House, NotebookPen, BotMessageSquare, MoonStar, CircleUser, Sun } from "lucide-react";
import IconGroup2 from "@/components/ui/IconGroup2";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const urlPath = usePathname();
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };
    return (
        <div className="w-full flex justify-center pt-0 fixed top-0 min-[490px]:pt-2 z-50 ">
            <div className="w-full max-w-[720px] min-[490px]:px-4 px-1 h-16 backdrop-blur-lg bg-[hsl(var(--background)/87%)] border border-[#65656542] min-[490px]:rounded-3xl rounded-none flex items-center min-[490px]:justify-between justify-center">
                <Link href={"/"} className="hidden items-center justify-between min-[490px]:flex h-full">
                    <Image src={"/logo.png"} width={40} height={40} alt="logo" className="rounded-xl" />
                    <p className=" min-[570px]:inline-block hidden ml-1.5 font-bold text-xl"> JobNext</p>
                </Link>
                <div className="flex items-center  justify-center h-full py-2">
                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                <Link
                                    className={` w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors ${
                                        urlPath === "/" && "border border-current] "
                                    } `}
                                    href={"/"}
                                >
                                    <House />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>Home</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Separator orientation="vertical" />

                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                <Link
                                    className={` w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors ${
                                        urlPath.includes("/blog") && "border-2 border-current]"
                                    }`}
                                    href={"/blog"}
                                >
                                    <NotebookPen />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>Blog</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                <Link
                                    className={` w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors ${
                                        urlPath === "/chatbot" && "border-2 border-current]"
                                    }`}
                                    href={"/chatbot"}
                                >
                                    <BotMessageSquare />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>AI chatbot</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                <Link
                                    className={` w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors ${
                                        urlPath === "/virtual-interview" && "border-2 border-current]"
                                    }`}
                                    href={"/virtual-interview"}
                                >
                                    <IconGroup2 />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>Virtual interview</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <button
                        title="Toggle mode"
                        onClick={toggleTheme}
                        className="mx-1 min-[420px]:mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors"
                    >
                        {theme === "light" ? <Sun /> : <MoonStar />}
                    </button>

                    <Separator orientation="vertical" />
                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                <Link className=" w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors" href={"/user"}>
                                    <CircleUser />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>User</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Separator orientation="vertical" className="bg-transparent" />
                </div>
                <BorderBeam duration={10} size={100} />
            </div>
        </div>
    );
};

export default Header;
