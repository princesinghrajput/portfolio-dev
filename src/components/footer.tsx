"use client";

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import Link from "next/link";
import { FC, SVGProps } from "react";
import { Heart, ArrowUp, Github, Linkedin, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { href: "https://x.com/its_me_prince1_", icon: Twitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/prince-kumar-05/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/princesinghrajput", icon: Github, label: "GitHub" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 sm:py-12 mt-8 sm:mt-12 border-t border-border mb-24 lg:mb-0">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-1">
            <TooltipProvider>
              {socialLinks.map((link, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                      <Link
                        href={link.href}
                        target="_blank"
                        className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted active:bg-muted active:scale-95 transition-all duration-200"
                      >
                        <link.icon className="h-4 w-4" />
                      </Link>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent><p>{link.label}</p></TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          {/* Copyright */}
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground order-last sm:order-none">
            Made with <Heart className="w-3.5 h-3.5 text-[hsl(12,76%,61%)] animate-pulse" fill="currentColor" /> by{" "}
            <Link href="https://linktr.ee/prince" target="_blank" className="font-semibold text-foreground hover:text-primary transition-colors">
              Prince
            </Link>
          </p>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border hover:border-primary/40 transition-all duration-200"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            <span className="hidden sm:inline">Back to top</span>
          </motion.button>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <p className="text-[10px] sm:text-xs text-muted-foreground/60">
            © {currentYear} Prince Kumar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}