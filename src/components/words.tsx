"use client";

import React from "react";
import { FlipWords } from "./ui/words";

export function FlipWordsDemo() {
  // More fun and personality-driven phrases mixed with professional titles
  const words = [
    "team lead",
    "systems architect",
    "software engineer",
    "MERN stack dev",
    "chai enthusiast",
    "curious builder",
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
