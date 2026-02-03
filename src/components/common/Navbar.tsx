"use client";

import React, { useState, useEffect } from "react";
import { Home, Code, TerminalIcon, Bot, FileText, Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/darkmode";
import AskMe from "../AskMe";
import { motion, AnimatePresence } from "framer-motion";

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
            {/* Top Navigation Bar - Always visible */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-3"}`}>
                <div className={`max-w-5xl mx-auto px-4 sm:px-6 transition-all duration-300 ${scrolled
                    ? "bg-background/90 backdrop-blur-md border border-border rounded-full shadow-lg"
                    : ""
                    }`}>
                    <section className="flex w-full justify-between items-center py-2 px-1">
                        {/* Logo */}
                        <Link href="/" className="group">
                            <div className="text-xl sm:text-2xl font-bold tracking-tight">
                                <span className="text-foreground group-hover:text-primary transition-colors duration-200">
                                    Prince
                                </span>
                                <span className="text-primary">.</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation - Center */}
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

                        {/* Right Side - Resume, AI, Dark Mode */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {/* Resume Link - Always visible */}
                            <Link
                                href="/assests/resume.pdf"
                                target="_blank"
                                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                            >
                                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">Resume</span>
                            </Link>

                            {/* Ask AI Button - Desktop only */}
                            <button
                                onClick={() => setIsAskMeOpen(true)}
                                className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                            >
                                <Bot className="w-4 h-4" />
                                Ask AI
                            </button>

                            {/* Dark Mode Toggle - Always visible */}
                            <ModeToggle />
                        </div>
                    </section>
                </div>
            </nav>

            {/* Mobile Navigation - Bottom Bar */}
            <section className="fixed lg:hidden bottom-0 left-0 right-0 z-50 pb-safe">
                <div className="mx-3 sm:mx-4 mb-3 sm:mb-4">
                    <motion.div
                        className="flex items-center justify-around gap-1 px-2 py-2 bg-background/95 backdrop-blur-md rounded-2xl border border-border shadow-xl"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        {/* Nav Items */}
                        {navbarItems.map((item) => {
                            const isActive = (pathname.includes(item.href) && item.href.length > 1) || pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} className="flex-1 max-w-[60px]">
                                    <motion.div
                                        className={`flex flex-col items-center gap-0.5 py-2 rounded-xl transition-all duration-200 ${isActive
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground"
                                            }`}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="text-[9px] font-medium">{item.name}</span>
                                    </motion.div>
                                </Link>
                            );
                        })}

                        {/* AI Button - Mobile */}
                        <motion.button
                            onClick={() => setIsAskMeOpen(true)}
                            className="flex-1 max-w-[60px]"
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="flex flex-col items-center gap-0.5 py-2 rounded-xl bg-primary/10 text-primary">
                                <Bot className="w-5 h-5" />
                                <span className="text-[9px] font-medium">Ask AI</span>
                            </div>
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            <AskMe isOpen={isAskMeOpen} onClose={() => setIsAskMeOpen(false)} />
        </>
    );
};

export default Navbar;
