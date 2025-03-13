"use client";

import React, { useState } from "react";
import { Home, Info, Code, TerminalIcon, Bot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/darkmode";
import { ShinyButton } from "../ui/shiny-button";
import AskMe from "../AskMe";

const navbarItems = [
    {
        name: "Home",
        href: "/",
        icon: Home,
    },
    {
        name: "Projects",
        href: "/projects",
        icon: TerminalIcon,
    },
    {
        name: "Skills",
        href: "/skills",
        icon: Code,
    },
    {
        name: "About",
        href: "/about",
        icon: Info,
    },
   
];

const Navbar = () => {
    const pathname = usePathname();
    const [isAskMeOpen, setIsAskMeOpen] = useState(false);

    return (
        <>
            <nav className="z-50 lg:sticky max-w-[90%] m-auto lg:top-0">
                {/* Desktop Navbar */}
                <section className="flex w-full justify-between items-center m-auto p-2">
                    <Link href="/" className="uppercase text-3xl font-bold tracking-widest relative">
                        PS<span className="text-blue-700 font-bold text-8xl absolute -bottom-2">.</span>
                    </Link>
                    <div className="hidden lg:flex gap-5 min-w-96 justify-center items-center backdrop-blur-lg p-2">
                        {navbarItems.map((item) => {
                            const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;
                            return (
                                <Link href={item.href} key={item.name} className={`${isActive ? "text-blue-700" : "text-gray-800 dark:text-gray-200"} flex items-center justify-center gap-2 uppercase hover:text-blue-500 duration-200 ease-linear w-36 font-medium text-center`}>
                                    <item.icon /> {item.name}
                                </Link>
                            );
                        })}
                        <ShinyButton onClick={() => setIsAskMeOpen(true)} />
                    </div>
                    <ModeToggle />
                </section>

                {/* Mobile Navbar */}
                <section className="fixed z-50 md:w-[30rem] md:m-auto lg:hidden bottom-10 left-0 right-0 flex flex-wrap justify-center w-full">
                    <div className="flex items-center gap-4 px-6 py-3 bg-black/20 dark:bg-white/5 backdrop-blur-lg rounded-full">
                        {navbarItems.map((item) => {
                            const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} className={`${isActive ? "text-blue-700" : "text-gray-800 dark:text-gray-200"}`}>
                                    <item.icon className="w-5 h-5" />
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => setIsAskMeOpen(true)}
                            className="relative text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-500 transition-colors"
                        >
                            <Bot className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        </button>
                    </div>
                </section>
            </nav>
            <AskMe isOpen={isAskMeOpen} onClose={() => setIsAskMeOpen(false)} />
        </>
    );
};

export default Navbar;
