"use client";

import React from "react";
import { FlipWords } from "./ui/words";

export function FlipWordsDemo() {
  const words = [
    "senior software engineer",
    "building scalable systems",
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
