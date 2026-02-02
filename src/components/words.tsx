"use client";

import React from "react";
import { FlipWords } from "./ui/words";

export function FlipWordsDemo() {
  const words = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Tech Explorer"
  ];

  return (
    <p className="body-lg">
      <span className="text-foreground">I'm a </span>
      <FlipWords
        words={words}
        className="font-semibold text-primary"
      />
    </p>
  );
}
