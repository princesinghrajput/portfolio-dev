"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useState } from "react";

export const ShinyButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 font-semibold text-white transition-all duration-500 ease-out 
                 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full hover:scale-105"
      style={{
        backgroundSize: "200% 100%",
        backgroundPosition: isHovered ? "100% 0%" : "0% 0%",
      }}
    >
      <Bot className="w-4 h-4 md:w-5 md:h-5 animate-pulse" />
      <span className="relative text-sm md:text-base">
        Ask Me
        <span className="absolute -top-2 -right-1 px-1.5 py-0.5 text-[10px] md:text-xs text-white bg-red-500 rounded-full animate-bounce">
          AI
        </span>
      </span>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
    </motion.button>
  );
}; 