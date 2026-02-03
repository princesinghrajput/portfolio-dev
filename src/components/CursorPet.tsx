"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Chasing Cat that tries to BITE the cursor!
const CursorPet: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [catPos, setCatPos] = useState({ x: 50, y: 0 }); // Start at bottom left
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
    const [isWalking, setIsWalking] = useState(false);
    const [facingLeft, setFacingLeft] = useState(false);
    const [walkCycle, setWalkCycle] = useState(0);
    const [isBiting, setIsBiting] = useState(false);
    const [biteCount, setBiteCount] = useState(0);
    const [mood, setMood] = useState<"hunting" | "happy" | "sleepy">("hunting");
    const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
    const [showMessage, setShowMessage] = useState("");

    const lastMoveTime = useRef(Date.now());
    const animationRef = useRef<number>();
    const catSpeed = 3; // pixels per frame

    // Messages when cat bites
    const biteMessages = ["Nom! 😋", "Got you! 🎯", "Yum! 😸", "Munch! 🐱", "Gotcha! ✨", "Nyaa~ 😻"];

    // Initialize position on mount
    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 1024px)").matches;
        if (isMobile) return;

        setIsVisible(true);
        // Start at bottom-left corner
        setCatPos({ x: 80, y: typeof window !== 'undefined' ? window.innerHeight - 100 : 0 });
    }, []);

    // Track cursor position
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY });
            lastMoveTime.current = Date.now();
            if (mood === "sleepy") setMood("hunting");
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mood]);

    // Main game loop - cat chases cursor
    useEffect(() => {
        if (!isVisible) return;

        const gameLoop = () => {
            setCatPos(prev => {
                const dx = cursorPos.x - prev.x - 30; // offset to center of cat
                const dy = cursorPos.y - prev.y - 30;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate eye tracking
                if (distance > 0) {
                    const maxOffset = 3;
                    setEyeOffset({
                        x: (dx / distance) * Math.min(distance / 80, 1) * maxOffset,
                        y: (dy / distance) * Math.min(distance / 80, 1) * maxOffset,
                    });
                }

                // Check if close enough to bite!
                if (distance < 40 && !isBiting) {
                    setIsBiting(true);
                    setBiteCount(c => c + 1);
                    setShowMessage(biteMessages[Math.floor(Math.random() * biteMessages.length)]);
                    setTimeout(() => {
                        setIsBiting(false);
                        setShowMessage("");
                    }, 600);
                    return prev; // Don't move while biting
                }

                // If too close or biting, don't move
                if (distance < 50 || isBiting) {
                    setIsWalking(false);
                    return prev;
                }

                // Move towards cursor
                setIsWalking(true);
                setFacingLeft(dx < 0);

                const speed = Math.min(catSpeed, distance * 0.05); // Slow down when close
                const moveX = (dx / distance) * speed;
                const moveY = (dy / distance) * speed;

                return {
                    x: prev.x + moveX,
                    y: prev.y + moveY,
                };
            });

            animationRef.current = requestAnimationFrame(gameLoop);
        };

        animationRef.current = requestAnimationFrame(gameLoop);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isVisible, cursorPos, isBiting, biteMessages]);

    // Walk cycle animation
    useEffect(() => {
        if (!isWalking) return;
        const interval = setInterval(() => {
            setWalkCycle(prev => (prev + 1) % 8);
        }, 80);
        return () => clearInterval(interval);
    }, [isWalking]);

    // Sleepy mood when idle
    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastMoveTime.current > 8000) {
                setMood("sleepy");
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!isVisible) return null;

    const isSleeping = mood === "sleepy";

    // Walking leg positions
    const getLegOffsets = () => {
        const offsets = [
            { fl: -8, fr: 4, bl: 4, br: -4 },
            { fl: -4, fr: 6, bl: 6, br: -2 },
            { fl: 0, fr: 4, bl: 4, br: 0 },
            { fl: 4, fr: 0, bl: 0, br: 4 },
            { fl: 6, fr: -4, bl: -4, br: 6 },
            { fl: 4, fr: -6, bl: -6, br: 4 },
            { fl: 0, fr: -4, bl: -4, br: 0 },
            { fl: -4, fr: 0, bl: 0, br: -4 },
        ];
        return isWalking ? offsets[walkCycle] : { fl: 0, fr: 0, bl: 0, br: 0 };
    };

    const legs = getLegOffsets();

    return (
        <motion.div
            className="fixed pointer-events-none z-[9998]"
            style={{ left: catPos.x, top: catPos.y }}
        >
            <motion.div animate={{ scaleX: facingLeft ? -1 : 1 }} transition={{ duration: 0.15 }}>
                {/* Body bounce */}
                <motion.div
                    animate={
                        isBiting
                            ? { scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }
                            : isWalking
                                ? { y: walkCycle % 2 === 0 ? -2 : 0 }
                                : isSleeping
                                    ? { y: [0, 2, 0], scale: [1, 1.02, 1] }
                                    : { y: [0, -1, 0] }
                    }
                    transition={{ duration: isBiting ? 0.3 : isWalking ? 0.08 : 2, repeat: isBiting ? 0 : Infinity }}
                >
                    <svg width="60" height="65" viewBox="0 0 100 110" className="drop-shadow-lg">
                        <defs>
                            <radialGradient id="furGrad" cx="50%" cy="30%" r="70%">
                                <stop offset="0%" stopColor="#a0aec7" />
                                <stop offset="100%" stopColor="#6a7a9a" />
                            </radialGradient>
                            <radialGradient id="faceGrad" cx="50%" cy="40%" r="60%">
                                <stop offset="0%" stopColor="#d8e2f0" />
                                <stop offset="100%" stopColor="#b5c5d8" />
                            </radialGradient>
                        </defs>

                        {/* Back legs */}
                        <ellipse cx="32" cy={92 + legs.bl} rx="7" ry="12" fill="url(#furGrad)" />
                        <ellipse cx="68" cy={92 + legs.br} rx="7" ry="12" fill="url(#furGrad)" />

                        {/* Body */}
                        <ellipse cx="50" cy="72" rx="30" ry="24" fill="url(#furGrad)" />
                        <ellipse cx="50" cy="66" rx="14" ry="12" fill="#c8d4e8" opacity="0.5" />

                        {/* Front legs */}
                        <ellipse cx="35" cy={95 + legs.fl} rx="6" ry="14" fill="url(#furGrad)" />
                        <ellipse cx="65" cy={95 + legs.fr} rx="6" ry="14" fill="url(#furGrad)" />

                        {/* Paws */}
                        {isWalking && (
                            <>
                                <ellipse cx="35" cy={105 + legs.fl} rx="5" ry="3" fill="#8595a8" />
                                <ellipse cx="65" cy={105 + legs.fr} rx="5" ry="3" fill="#8595a8" />
                            </>
                        )}

                        {/* Tail */}
                        <motion.path
                            d={isSleeping ? "M78,75 Q88,85 82,95" : "M78,72 Q98,55 92,35"}
                            stroke="url(#furGrad)"
                            strokeWidth="8"
                            strokeLinecap="round"
                            fill="none"
                            animate={
                                isWalking
                                    ? { d: ["M78,72 Q95,50 88,30", "M78,72 Q100,60 95,40", "M78,72 Q95,50 88,30"] }
                                    : { d: ["M78,72 Q95,55 90,38", "M78,72 Q92,60 88,42", "M78,72 Q95,55 90,38"] }
                            }
                            transition={{ repeat: Infinity, duration: isWalking ? 0.25 : 2 }}
                        />

                        {/* Head */}
                        <circle cx="50" cy="38" r="28" fill="url(#furGrad)" />

                        {/* Ears */}
                        <polygon points="24,16 34,42 12,34" fill="url(#furGrad)" />
                        <polygon points="76,16 66,42 88,34" fill="url(#furGrad)" />
                        <polygon points="26,20 32,38 16,32" fill="#ffb8c8" />
                        <polygon points="74,20 68,38 84,32" fill="#ffb8c8" />

                        {/* Face */}
                        <ellipse cx="50" cy="44" rx="20" ry="18" fill="url(#faceGrad)" />

                        {/* Eyes - tracking cursor */}
                        {isSleeping ? (
                            <>
                                <path d="M32,40 Q40,46 48,40" stroke="#4a5568" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                <path d="M52,40 Q60,46 68,40" stroke="#4a5568" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            </>
                        ) : (
                            <>
                                {/* Eye whites */}
                                <ellipse cx="38" cy="38" rx="10" ry={isBiting ? 6 : 9} fill="#fff" stroke="#4a5568" strokeWidth="0.5" />
                                <ellipse cx="62" cy="38" rx="10" ry={isBiting ? 6 : 9} fill="#fff" stroke="#4a5568" strokeWidth="0.5" />

                                {/* Iris - follows cursor */}
                                <ellipse cx={38 + eyeOffset.x} cy={38 + eyeOffset.y} rx="6" ry="6" fill="#5a9060" />
                                <ellipse cx={62 + eyeOffset.x} cy={38 + eyeOffset.y} rx="6" ry="6" fill="#5a9060" />

                                {/* Pupils */}
                                <ellipse cx={38 + eyeOffset.x * 1.3} cy={38 + eyeOffset.y * 1.3} rx={isBiting ? 4 : 3} ry={isBiting ? 4 : 4} fill="#1a1a2e" />
                                <ellipse cx={62 + eyeOffset.x * 1.3} cy={38 + eyeOffset.y * 1.3} rx={isBiting ? 4 : 3} ry={isBiting ? 4 : 4} fill="#1a1a2e" />

                                {/* Highlights */}
                                <circle cx={40 + eyeOffset.x * 0.5} cy="35" r="2.5" fill="#fff" opacity="0.9" />
                                <circle cx={64 + eyeOffset.x * 0.5} cy="35" r="2.5" fill="#fff" opacity="0.9" />
                            </>
                        )}

                        {/* Blush */}
                        <ellipse cx="26" cy="50" rx="6" ry="3" fill="#ffb8c8" opacity="0.6" />
                        <ellipse cx="74" cy="50" rx="6" ry="3" fill="#ffb8c8" opacity="0.6" />

                        {/* Nose */}
                        <path d="M50,52 L47,49 Q45,47 47,46 Q50,44 50,46 Q50,44 53,46 Q55,47 53,49 Z" fill="#ff8fab" />

                        {/* Mouth - open when biting! */}
                        {isBiting ? (
                            <>
                                <ellipse cx="50" cy="60" rx="8" ry="6" fill="#ff6b8a" />
                                <ellipse cx="50" cy="58" rx="6" ry="3" fill="#2d1f2f" />
                                {/* Teeth */}
                                <polygon points="45,56 47,60 43,60" fill="#fff" />
                                <polygon points="55,56 53,60 57,60" fill="#fff" />
                            </>
                        ) : (
                            <>
                                <path d="M50,54 Q44,60 40,55" stroke="#6a7a9a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                <path d="M50,54 Q56,60 60,55" stroke="#6a7a9a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </>
                        )}

                        {/* Whiskers */}
                        <g>
                            <line x1="28" y1="46" x2="8" y2="42" stroke="#9aaaba" strokeWidth="1" />
                            <line x1="28" y1="52" x2="6" y2="52" stroke="#9aaaba" strokeWidth="1" />
                            <line x1="28" y1="58" x2="8" y2="62" stroke="#9aaaba" strokeWidth="1" />
                            <line x1="72" y1="46" x2="92" y2="42" stroke="#9aaaba" strokeWidth="1" />
                            <line x1="72" y1="52" x2="94" y2="52" stroke="#9aaaba" strokeWidth="1" />
                            <line x1="72" y1="58" x2="92" y2="62" stroke="#9aaaba" strokeWidth="1" />
                        </g>
                    </svg>

                    {/* Bite message popup */}
                    <AnimatePresence>
                        {showMessage && (
                            <motion.div
                                className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg text-sm font-medium whitespace-nowrap"
                                initial={{ opacity: 0, scale: 0, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0, y: -10 }}
                            >
                                {showMessage}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Sleep indicator */}
                    {isSleeping && (
                        <motion.span
                            className="absolute -top-2 -right-2 text-xl"
                            animate={{ y: [0, -4, 0], opacity: [0.7, 1, 0.7] }}
                            transition={{ repeat: Infinity, duration: 1.8 }}
                        >
                            💤
                        </motion.span>
                    )}

                    {/* Bite counter */}
                    {biteCount > 0 && (
                        <motion.div
                            className="absolute -top-6 -left-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full font-bold"
                            key={biteCount}
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1 }}
                        >
                            {biteCount} 🍪
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

// Mobile Cat Pet - A simplified, tappable cat for mobile devices
const MobileCatPet: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [mood, setMood] = useState<"happy" | "sleepy" | "playful" | "purring">("happy");
    const [showEmoji, setShowEmoji] = useState(false);

    const moods = ["happy", "sleepy", "playful", "purring"] as const;
    const moodEmojis = {
        happy: "😊",
        sleepy: "💤",
        playful: "✨",
        purring: "💕"
    };

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            setIsVisible(isMobile);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleTap = () => {
        const currentIndex = moods.indexOf(mood);
        const nextIndex = (currentIndex + 1) % moods.length;
        setMood(moods[nextIndex]);
        setShowEmoji(true);
        setTimeout(() => setShowEmoji(false), 1500);
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed bottom-20 left-4 z-[9998] cursor-pointer"
            onClick={handleTap}
            whileTap={{ scale: 0.9 }}
        >
            <div className="relative">
                {/* Emoji indicator */}
                {showEmoji && (
                    <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg"
                        initial={{ opacity: 0, y: 5, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {moodEmojis[mood]}
                    </motion.div>
                )}

                <motion.svg
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    className="drop-shadow-lg"
                    animate={
                        mood === "sleepy"
                            ? { scaleY: [1, 1.02, 1] }
                            : mood === "playful"
                                ? { rotate: [0, -5, 5, 0] }
                                : mood === "purring"
                                    ? { scale: [1, 1.03, 1] }
                                    : {}
                    }
                    transition={{
                        repeat: Infinity,
                        duration: mood === "sleepy" ? 3 : mood === "playful" ? 0.5 : 2,
                        ease: "easeInOut"
                    }}
                >
                    {/* Body */}
                    <ellipse cx="50" cy="68" rx="32" ry="20" fill="#6b5b5b" />
                    <ellipse cx="50" cy="68" rx="28" ry="16" fill="#7a6a6a" opacity="0.6" />
                    <ellipse cx="50" cy="70" rx="14" ry="12" fill="#d4c4b0" opacity="0.9" />

                    {/* Head */}
                    <circle cx="50" cy="38" r="22" fill="#6b5b5b" />
                    <circle cx="50" cy="38" r="20" fill="#7a6a6a" opacity="0.7" />

                    {/* Ears */}
                    <polygon points="28,22 38,38 22,36" fill="#6b5b5b" />
                    <polygon points="30,26 36,36 26,34" fill="#d4a5a5" />
                    <polygon points="72,22 62,38 78,36" fill="#6b5b5b" />
                    <polygon points="70,26 64,36 74,34" fill="#d4a5a5" />

                    {/* Face marking */}
                    <ellipse cx="50" cy="42" rx="18" ry="16" fill="#8a7a7a" opacity="0.8" />

                    {/* Eyes */}
                    {mood === "sleepy" ? (
                        <>
                            <path d="M38,36 Q42,38 46,36" stroke="#2a2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            <path d="M54,36 Q58,38 62,36" stroke="#2a2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        </>
                    ) : (
                        <>
                            <ellipse cx="42" cy="36" rx="5" ry="6" fill="#f0e68c" />
                            <ellipse cx="42" cy="36" rx={mood === "playful" ? 6 : 4} ry={mood === "playful" ? 6 : 4} fill="#1a1a1a" />
                            <circle cx="40" cy="34" r="1.5" fill="#ffffff" opacity="0.9" />
                            <ellipse cx="58" cy="36" rx="5" ry="6" fill="#f0e68c" />
                            <ellipse cx="58" cy="36" rx={mood === "playful" ? 6 : 4} ry={mood === "playful" ? 6 : 4} fill="#1a1a1a" />
                            <circle cx="56" cy="34" r="1.5" fill="#ffffff" opacity="0.9" />
                        </>
                    )}

                    {/* Nose */}
                    <polygon points="50,44 47,47 53,47" fill="#d4a5a5" />

                    {/* Mouth */}
                    <path d="M50,47 L48,48 Q47,49 46,48.5" stroke="#4a3a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    <path d="M50,47 L52,48 Q53,49 54,48.5" stroke="#4a3a3a" strokeWidth="1.2" fill="none" strokeLinecap="round" />

                    {/* Whiskers */}
                    <line x1="28" y1="40" x2="12" y2="38" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                    <line x1="28" y1="44" x2="12" y2="45" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                    <line x1="72" y1="40" x2="88" y2="38" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                    <line x1="72" y1="44" x2="88" y2="45" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />

                    {/* Tail */}
                    <motion.path
                        d="M75,70 Q70,78 72,85"
                        stroke="#6b5b5b"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                        animate={{
                            d: mood === "happy"
                                ? ["M75,70 Q70,78 72,85", "M75,70 Q75,78 77,85", "M75,70 Q70,78 72,85"]
                                : mood === "playful"
                                    ? ["M75,70 Q65,75 67,82", "M75,70 Q80,75 78,82"]
                                    : ["M75,70 Q70,78 72,85"]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: mood === "playful" ? 0.3 : 2,
                            ease: "easeInOut"
                        }}
                    />
                </motion.svg>

                {/* Tap hint */}
                <motion.div
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground/60 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    tap me!
                </motion.div>
            </div>
        </motion.div>
    );
};

export { MobileCatPet };
export default CursorPet;