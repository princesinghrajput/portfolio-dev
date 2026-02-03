"use client";

import { Dock, DockIcon } from "./ui/dock";
import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

const socialLinks = [
  { href: "https://github.com/princesinghrajput", icon: Github, label: "GitHub", color: "hover:text-purple-400" },
  { href: "https://www.linkedin.com/in/prince-kumar-05/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500" },
  { href: "https://x.com/its_me_prince1_", icon: Twitter, label: "Twitter", color: "hover:text-sky-400" },
  { href: "mailto:psr8084@gmail.com", icon: Mail, label: "Email", color: "hover:text-red-400" },
];

export function DockDemo() {
  return (
    <Dock className="bg-muted/70 border border-border rounded-2xl backdrop-blur-md shadow-lg px-1">
      {socialLinks.map((link, index) => (
        <DockIcon key={index}>
          <motion.a
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-muted-foreground ${link.color} transition-all duration-200`}
            aria-label={link.label}
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
          >
            <link.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
          </motion.a>
        </DockIcon>
      ))}
    </Dock>
  );
}
