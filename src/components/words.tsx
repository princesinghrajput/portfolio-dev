"use client";

import React from "react";
import { FlipWords } from "./ui/words";

export function FlipWordsDemo() {
  // More fun and personality-driven phrases
  const words = [
    "curious builder",
    "system thinker",
    "chai enthusiast",
    "culture explorer",
    "minimalist designer",
    "full-stack dev",
  ];

  return (
    <p className="body-lg">
      <span className="text-muted-foreground">I&apos;m a </span>
      <FlipWords
        words={words}
        className="font-semibold text-foreground"
      />
    </p>
  );
}
