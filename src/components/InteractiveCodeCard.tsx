"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw, Coffee, Sparkles } from "lucide-react";

interface RawLine {
  text: string;
}

const RAW_LINES: RawLine[] = [
  { text: "const prince: Developer = {" },
  { text: '  name: "Prince",' },
  { text: '  role: "Senior Software Engineer",' },
  { text: '  company: "Pixory",' },
  { text: '  experience: "3+ Years",' },
  { text: '  focus: "Architecture", // click to cycle' },
  { text: "  coffee: 3, // click to add" },
  { text: "  isAwesome: true," },
  { text: "};" },
];

export const InteractiveCodeCard: React.FC = () => {
  const [coffeeCount, setCoffeeCount] = useState(3);
  const [focusIndex, setFocusIndex] = useState(0);
  const focusAreas = ["Architecture", "Scalability", "AI Agents", "Observability", "Real-Time"];

  // Typing state
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    let isCancelled = false;
    let timeoutId: NodeJS.Timeout;

    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setIsTypingFinished(false);

    let line = 0;
    let char = 0;

    const typeNext = () => {
      if (isCancelled) return;

      if (line >= RAW_LINES.length) {
        setIsTypingFinished(true);
        return;
      }

      const targetText = RAW_LINES[line].text;

      if (char < targetText.length) {
        char++;
        setCurrentLineIndex(line);
        setCurrentCharIndex(char);

        const charTyped = targetText[char - 1];
        let delay = 24; // Fast, authentic typing speed (~40 WPM coding speed)
        if (charTyped === " ") delay = 32;
        if (charTyped === "," || charTyped === ":") delay = 70;

        timeoutId = setTimeout(typeNext, delay);
      } else {
        // Line finished: pause slightly like pressing Enter
        line++;
        char = 0;
        setCurrentLineIndex(line);
        setCurrentCharIndex(0);
        timeoutId = setTimeout(typeNext, 120);
      }
    };

    // Kick off typing with small initial delay
    timeoutId = setTimeout(typeNext, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [replayCount]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReplayCount((c) => c + 1);
  };

  const handleCoffeeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCoffeeCount((prev) => prev + 1);
  };

  const handleFocusClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFocusIndex((prev) => (prev + 1) % focusAreas.length);
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto">
      {/* Terminal Editor Frame - Light & Dark Compatible */}
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c1017] shadow-xl shadow-zinc-200/50 dark:shadow-black/50 transition-colors duration-200">
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-zinc-50 dark:bg-[#121820] border-b border-zinc-200 dark:border-zinc-800 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]/90 transition-transform hover:scale-110" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 transition-transform hover:scale-110" />
            <div
              onClick={handleReplay}
              className="w-3 h-3 rounded-full bg-[#27c93f]/90 transition-transform hover:scale-110 cursor-pointer"
              title="Click green dot to re-run typing animation"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>prince.config.ts</span>
          </div>

          <button
            onClick={handleReplay}
            className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
            title="Replay typing animation"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">rerun</span>
          </button>
        </div>

        {/* Code Content Area */}
        <div className="p-3.5 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto min-h-[235px] sm:min-h-[255px]">
          <div className="space-y-1">
            {RAW_LINES.map((rawLine, idx) => {
              // Line not reached yet
              if (idx > currentLineIndex && !isTypingFinished) {
                return null;
              }

              const isCurrentlyTypingThisLine = idx === currentLineIndex && !isTypingFinished;
              const isLineCompleted = idx < currentLineIndex || isTypingFinished;

              return (
                <div key={idx} className="flex items-baseline">
                  {/* Line Number */}
                  <span className="w-5 sm:w-6 text-[11px] text-zinc-300 dark:text-zinc-600 select-none shrink-0 font-mono text-right mr-3">
                    {idx + 1}
                  </span>

                  {/* Line Content */}
                  <div className="flex-1 min-w-0">
                    {/* While actively typing this line character-by-character */}
                    {isCurrentlyTypingThisLine ? (
                      <span className="text-zinc-800 dark:text-zinc-200 whitespace-pre">
                        {rawLine.text.slice(0, currentCharIndex)}
                        <span className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-4 bg-emerald-500 dark:bg-emerald-400 ml-0.5 align-middle animate-pulse" />
                      </span>
                    ) : isLineCompleted ? (
                      /* Highlighted code once line is typed */
                      <LineRenderer
                        lineIndex={idx}
                        focus={focusAreas[focusIndex]}
                        coffeeCount={coffeeCount}
                        onFocusClick={handleFocusClick}
                        onCoffeeClick={handleCoffeeClick}
                        isTypingFinished={isTypingFinished}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal / Editor Statusline */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-50 dark:bg-[#10151c] border-t border-zinc-200 dark:border-zinc-800 text-[10px] sm:text-[11px] font-mono select-none">
          <div className="flex items-center gap-2">
            <span
              className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider text-[9px] ${
                isTypingFinished
                  ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              }`}
            >
              {isTypingFinished ? "NORMAL" : "INSERT"}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500 hidden xs:inline">
              {isTypingFinished ? "interactive" : "typing..."}
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 dark:text-zinc-500 text-[10px]">
            <span>
              Ln {Math.min(currentLineIndex + 1, 9)}, Col{" "}
              {isTypingFinished ? 2 : currentCharIndex}
            </span>
            <span className="hidden sm:inline">TypeScript</span>
          </div>
        </div>
      </div>

      {/* Subtle Hint */}
      <p className="mt-2.5 text-[11px] text-zinc-400 dark:text-zinc-500 text-center font-mono select-none">
        psst... try clicking on focus & coffee!
      </p>
    </div>
  );
};

// Syntax Highlighting Line Component
interface LineRendererProps {
  lineIndex: number;
  focus: string;
  coffeeCount: number;
  onFocusClick: (e: React.MouseEvent) => void;
  onCoffeeClick: (e: React.MouseEvent) => void;
  isTypingFinished: boolean;
}

const LineRenderer: React.FC<LineRendererProps> = ({
  lineIndex,
  focus,
  coffeeCount,
  onFocusClick,
  onCoffeeClick,
  isTypingFinished,
}) => {
  switch (lineIndex) {
    case 0:
      return (
        <span>
          <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{" "}
          <span className="text-blue-600 dark:text-sky-300 font-medium">prince</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <span className="text-amber-600 dark:text-amber-400">Developer</span>{" "}
          <span className="text-zinc-400 dark:text-zinc-500">= </span>
          <span className="text-yellow-600 dark:text-yellow-400">{"{"}</span>
        </span>
      );

    case 1:
      return (
        <span className="pl-3 sm:pl-4">
          <span className="text-zinc-700 dark:text-zinc-300">name</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <span className="text-emerald-600 dark:text-emerald-400">&quot;Prince&quot;</span>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
        </span>
      );

    case 2:
      return (
        <span className="pl-3 sm:pl-4">
          <span className="text-zinc-700 dark:text-zinc-300">role</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <span className="text-emerald-600 dark:text-emerald-400">&quot;Senior Software Engineer&quot;</span>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
        </span>
      );

    case 3:
      return (
        <span className="pl-3 sm:pl-4">
          <span className="text-zinc-700 dark:text-zinc-300">company</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <span className="text-emerald-600 dark:text-emerald-400">&quot;Pixory&quot;</span>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
        </span>
      );

    case 4:
      return (
        <span className="pl-3 sm:pl-4">
          <span className="text-zinc-700 dark:text-zinc-300">experience</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <span className="text-amber-600 dark:text-amber-400">&quot;3+ Years&quot;</span>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
        </span>
      );

    case 5:
      return (
        <span className="pl-3 sm:pl-4 flex items-center flex-wrap">
          <span className="text-zinc-700 dark:text-zinc-300">focus</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <motion.button
            onClick={onFocusClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 mx-1 px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300/80 dark:border-zinc-700 cursor-pointer text-xs font-mono text-primary font-medium transition-colors"
            title="Click to cycle focus area!"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span>&quot;{focus}&quot;</span>
          </motion.button>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
          <span className="text-zinc-400 dark:text-zinc-500 text-[10px] sm:text-[11px] ml-2 italic select-none">
            // click to cycle
          </span>
        </span>
      );

    case 6:
      return (
        <span className="pl-3 sm:pl-4 flex items-center flex-wrap">
          <span className="text-zinc-700 dark:text-zinc-300">coffee</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <motion.button
            onClick={onCoffeeClick}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.92 }}
            className="inline-flex items-center gap-1.5 mx-1 px-2 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold text-xs cursor-pointer transition-colors"
            title="Click to add coffee!"
          >
            <Coffee className="w-3.5 h-3.5 text-amber-500" />
            <span>{coffeeCount}</span>
          </motion.button>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
          <span className="text-zinc-400 dark:text-zinc-500 text-[10px] sm:text-[11px] ml-2 italic select-none">
            // click to add
          </span>
        </span>
      );

    case 7:
      return (
        <span className="pl-3 sm:pl-4">
          <span className="text-zinc-700 dark:text-zinc-300">isAwesome</span>
          <span className="text-zinc-400 dark:text-zinc-500">: </span>
          <span className="text-purple-600 dark:text-purple-400 font-bold">true</span>
          <span className="text-zinc-400 dark:text-zinc-500">,</span>
          {isTypingFinished && (
            <span className="inline-block w-2 sm:w-2.5 h-3.5 sm:h-4 bg-emerald-500 dark:bg-emerald-400 ml-2 align-middle animate-pulse" />
          )}
        </span>
      );

    case 8:
      return (
        <span>
          <span className="text-yellow-600 dark:text-yellow-400">{"}"}</span>
          <span className="text-zinc-400 dark:text-zinc-500">;</span>
        </span>
      );

    default:
      return null;
  }
};

export default InteractiveCodeCard;
