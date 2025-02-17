"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { House, NotebookPen, BotMessageSquare, Settings, CircleUser } from "lucide-react";
import IconGroup2 from "@/components/ui/IconGroup2";

const Header = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };
    return (
        <div className="w-full flex justify-center fixed top-2 z-50">
            <div className="w-full max-w-[720px] px-4 h-16 backdrop-blur-lg bg-[hsl(var(--background)/87%)] border border-[#65656542] rounded-3xl flex items-center justify-between">
                <Link href={"/"} className="flex items-center justify-between  h-full">
                    <Image src={"/logo.png"} width={40} height={40} alt="logo" className="rounded-xl" />
                    <p className="ml-1.5 font-bold text-xl"> JobNext</p>
                </Link>
                <div className="flex items-center justify-between h-full py-2">
                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link className="mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors" href={"/"}>
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
                            <TooltipTrigger>
                                <Link className="mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors" href={"/blog"}>
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
                            <TooltipTrigger>
                                <Link className="mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors" href={"/chatbot"}>
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
                            <TooltipTrigger>
                                <Link
                                    className="mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors"
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
                    <button onClick={toggleTheme} className="mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors">
                        <Settings />
                    </button>

                    <Separator orientation="vertical" />
                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link className="mx-2 w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors" href={"/user"}>
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
