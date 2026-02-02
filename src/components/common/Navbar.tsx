"use client";

import React, { useState, useEffect } from "react";
import { Home, Info, Code, TerminalIcon, Bot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/darkmode";
import AskMe from "../AskMe";
import { motion } from "framer-motion";

const navbarItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/projects", icon: TerminalIcon },
    { name: "Skills", href: "/skills", icon: Code },
    { name: "About", href: "/about", icon: Info },
];

const Navbar = () => {
    const pathname = usePathname();
    const [isAskMeOpen, setIsAskMeOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}>
                <div className={`max-w-5xl mx-auto px-4 transition-all duration-300 ${scrolled
                    ? "bg-background/80 backdrop-blur-md border border-border rounded-full shadow-soft"
                    : ""
                    }`}>
                    <section className="flex w-full justify-between items-center py-2.5 px-2">
                        {/* Logo */}
                        <Link href="/" className="group">
                            <div className="text-2xl font-bold tracking-tight">
                                <span className="text-foreground group-hover:text-primary transition-colors duration-200">
                                    Prince
                                </span>
                                <span className="text-primary">.</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-muted/50">
                            {navbarItems.map((item) => {
                                const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;
                                return (
                                    <Link href={item.href} key={item.name}>
                                        <div className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            }`}>
                                            <item.icon className="w-4 h-4" />
                                            {item.name}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right side */}
                        <div className="hidden lg:flex items-center gap-3">
                            <button
                                onClick={() => setIsAskMeOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                            >
                                <Bot className="w-4 h-4" />
                                Ask AI
                            </button>
                            <ModeToggle />
                        </div>
                    </section>
                </div>

                {/* Mobile Navigation */}
                <section className="fixed lg:hidden bottom-4 left-4 right-4 z-50">
                    <div className="flex items-center justify-between gap-2 px-4 py-3 mx-auto max-w-sm bg-background/95 backdrop-blur-md rounded-2xl border border-border shadow-medium">
                        {navbarItems.map((item) => {
                            const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href}>
                                    <div className={`p-2.5 rounded-xl transition-all duration-200 ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        }`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                </Link>
                            );
                        })}

                        <button
                            onClick={() => setIsAskMeOpen(true)}
                            className="p-2.5 rounded-xl bg-primary/10 text-primary"
                        >
                            <Bot className="w-5 h-5" />
                        </button>

                        <div className="pl-2 border-l border-border">
                            <ModeToggle />
                        </div>
                    </div>
                </section>
            </nav>

            <AskMe isOpen={isAskMeOpen} onClose={() => setIsAskMeOpen(false)} />
        </>
    );
};

export default Navbar;
