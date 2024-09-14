"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "./ui/linkpreview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <p className="text-neutral-500 dark:text-neutral-400 mt-0 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        I also create{" "}
        <LinkPreview url="https://github.com/princesinghrajput" className="font-bold">
          Animated Websites
        </LinkPreview>{" "}
        and{" "} have worked over projects like{ " "}
        <LinkPreview url="https://github.com/princesinghrajput" className="font-bold">
          DeCentr-Freelance
        </LinkPreview>{" "}
        and Personal Spotify.
      </p>
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
        Other small projects include mini-games like{" "}
        <LinkPreview url="https://flappy-bird-prince.vercel.app/" className="font-bold">
          Flappy Bird
        </LinkPreview>{" "} and {" "}
        <LinkPreview url="https://rock-paper-scissors-mauve-eight.vercel.app/" className="font-bold">
          Rock Paper Scissors
        </LinkPreview>{" "} 
      
      </p>
    </div>
  );
}
