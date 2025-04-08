"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";

import { AuthContext } from "@/context/AuthContextProvider";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

import { House, NotebookPen, BotMessageSquare, MoonStar, CircleUser, Sun, BriefcaseBusiness } from "lucide-react";
import IconGroup2 from "@/components/ui/IconGroup2";

import Login from "@/components/pageComponents/Login";

const Header = () => {
    const { authUserData } = useContext(AuthContext);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const urlPath = usePathname();
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="w-full flex justify-center pt-0 fixed top-0 min-[490px]:pt-2 z-50 max-w-4xl ">
            <div className="w-full max-w-4xl min-[490px]:px-4 px-1 h-16 backdrop-blur-lg bg-[hsl(var(--background)/87%)] border border-[#65656542] min-[490px]:rounded-3xl rounded-none flex items-center min-[490px]:justify-between justify-center">
                <Link href={"/"} className="hidden items-center justify-between min-[490px]:flex h-full">
                    <Image src={"/logo.png"} width={40} height={40} alt="logo" className="rounded-xl" />
                    <p className=" min-[570px]:inline-block hidden ml-1.5 font-bold text-xl ">JobNext</p>
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
                                {authUserData ? (
                                    <Link
                                        className={` w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors ${
                                            urlPath === "/chatbot" && "border-2 border-current]"
                                        }`}
                                        href={"/chatbot"}
                                    >
                                        <BotMessageSquare />
                                    </Link>
                                ) : (
                                    <Login>
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors">
                                            <BotMessageSquare />
                                        </div>
                                    </Login>
                                )}
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>AI chatbot</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                {authUserData ? (
                                    <Link
                                        className={` w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors ${
                                            urlPath === "/jobs" && "border-2 border-current]"
                                        }`}
                                        href={"/jobs"}
                                    >
                                        <BriefcaseBusiness />
                                    </Link>
                                ) : (
                                    <Login>
                                        <div className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors">
                                            <BriefcaseBusiness />
                                        </div>
                                    </Login>
                                )}
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>
                                <p>Jobs</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                {mounted ? (
                                    <div
                                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                                        className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors"
                                    >
                                        {theme === "light" ? <Sun /> : <MoonStar />}
                                    </div>
                                ) : (
                                    <div className=" opacity-20  w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors">
                                        <Sun />
                                    </div>
                                )}
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>{theme === "light" ? <p>Light mode</p> : <p>Dark mode</p>}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <Separator orientation="vertical" />
                    <TooltipProvider delayDuration={8} disableHoverableContent>
                        <Tooltip>
                            <TooltipTrigger className="w-fit mx-1 min-[420px]:mx-2 rounded-full">
                                {authUserData ? (
                                    <Link
                                        href={`/user/${authUserData.uid}`}
                                        className=" w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors"
                                    >
                                        {/* <CircleUser /> */}
                                        {authUserData?.photoURL ? (
                                            <Image src={authUserData.photoURL} width={30} height={30} alt="user" className="rounded-full" />
                                        ) : (
                                            <Image src={"/avatar-default.jpg"} width={30} height={30} alt="user" className="rounded-full" />
                                        )}
                                    </Link>
                                ) : (
                                    <Login>
                                        <div className=" w-12 h-12 flex items-center justify-center rounded-full hover:bg-[#7e7e7e37] transition-colors" href={"/user"}>
                                            <CircleUser />
                                        </div>
                                    </Login>
                                )}
                            </TooltipTrigger>
                            <TooltipContent sideOffset={8}>{authUserData ? <p>{authUserData.displayName}</p> : <p>User</p>}</TooltipContent>
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
