"use client";

import { Dock, DockIcon } from "./ui/dock";
import React from "react";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export type IconProps = React.HTMLAttributes<SVGElement>;

const socialLinks = [
  { href: "https://github.com/princesinghrajput", icon: Github, label: "GitHub", color: "hover:text-purple-400 hover:bg-purple-500/10" },
  { href: "https://www.linkedin.com/in/prince-kumar-05/", icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-500 hover:bg-blue-500/10" },
  { href: "https://x.com/its_me_prince1_", icon: Twitter, label: "Twitter", color: "hover:text-sky-400 hover:bg-sky-500/10" },
  { href: "mailto:psr8084@gmail.com", icon: Mail, label: "Email", color: "hover:text-red-400 hover:bg-red-500/10" },
];

export function DockDemo() {
  return (
    <div className="shrink-0 inline-flex">
      <Dock className="bg-card/70 border border-border rounded-2xl backdrop-blur-md shadow-sm px-2">
        {socialLinks.map((link, index) => (
          <DockIcon key={index} className="rounded-xl overflow-hidden hover:bg-muted/50 transition-colors">
            <a
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-full h-full text-muted-foreground ${link.color} transition-colors duration-200`}
              aria-label={link.label}
            >
              <link.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
            </a>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
