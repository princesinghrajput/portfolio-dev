"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform, animate } from "framer-motion";

const CursorPet: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [facingLeft, setFacingLeft] = useState(false);
    const [isSleeping, setIsSleeping] = useState(false);
    const [isStretching, setIsStretching] = useState(false);
    const [isGrooming, setIsGrooming] = useState(false);
    const [isPurring, setIsPurring] = useState(false);
    const [isPlayful, setIsPlayful] = useState(false);
    const [isSitting, setIsSitting] = useState(false);
    const [blinkState, setBlinkState] = useState<"open" | "half" | "closed">("open");
    const [tailWag, setTailWag] = useState(0);
    const [earTwitch, setEarTwitch] = useState<"none" | "left" | "right" | "both">("none");
    const [mood, setMood] = useState<"happy" | "curious" | "sleepy" | "playful" | "content">("happy");

    const lastMoveTime = useRef(Date.now());
    const lastX = useRef(0);
    const lastY = useRef(0);
    const velocityX = useRef(0);
    const velocityY = useRef(0);
    const isIdleAnimation = useRef(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // More realistic spring physics for cat movement
    const springConfig = { damping: 25, stiffness: 100, mass: 1.2 };
    const petX = useSpring(cursorX, springConfig);
    const petY = useSpring(cursorY, springConfig);

    // Realistic bounce based on velocity
    const bounce = useTransform(petY, (y) => {
        if (!isMoving) return 0;
        const speed = Math.abs(velocityY.current);
        return Math.sin(Date.now() / 80) * Math.min(speed * 0.3, 5);
    });

    // Natural blinking behavior
    useEffect(() => {
        if (isSleeping) return;

        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setBlinkState("half");
                setTimeout(() => {
                    setBlinkState("closed");
                    setTimeout(() => {
                        setBlinkState("half");
                        setTimeout(() => setBlinkState("open"), 50);
                    }, 100);
                }, 50);
            }
        }, 3000 + Math.random() * 2000);

        return () => clearInterval(blinkInterval);
    }, [isSleeping]);

    // Realistic ear twitching
    useEffect(() => {
        const earInterval = setInterval(() => {
            if (Math.random() > 0.8 && !isSleeping) {
                const twitches = ["left", "right", "both", "none"];
                setEarTwitch(twitches[Math.floor(Math.random() * twitches.length)] as any);
                setTimeout(() => setEarTwitch("none"), 200);
            }
        }, 2000);

        return () => clearInterval(earInterval);
    }, [isSleeping]);

    // Realistic idle behaviors
    useEffect(() => {
        const behaviorInterval = setInterval(() => {
            const timeSinceMove = Date.now() - lastMoveTime.current;

            if (isIdleAnimation.current) return;

            if (timeSinceMove > 15000 && !isSleeping) {
                // Fall asleep
                setIsSleeping(true);
                setMood("sleepy");
                setIsSitting(false);
            } else if (timeSinceMove > 10000 && !isSitting) {
                // Sit down
                setIsSitting(true);
                setMood("content");
            } else if (timeSinceMove > 7000 && Math.random() > 0.7) {
                // Random grooming
                isIdleAnimation.current = true;
                setIsGrooming(true);
                setMood("content");
                setTimeout(() => {
                    setIsGrooming(false);
                    isIdleAnimation.current = false;
                }, 3000);
            } else if (timeSinceMove > 5000 && Math.random() > 0.8) {
                // Random stretch
                isIdleAnimation.current = true;
                setIsStretching(true);
                setTimeout(() => {
                    setIsStretching(false);
                    isIdleAnimation.current = false;
                }, 2000);
            } else if (timeSinceMove > 3000 && Math.random() > 0.9) {
                // Playful moment
                setIsPlayful(true);
                setMood("playful");
                setTimeout(() => setIsPlayful(false), 1500);
            }
        }, 1000);

        return () => clearInterval(behaviorInterval);
    }, [isSleeping, isSitting]);

    // Tail wagging behavior
    useEffect(() => {
        const tailInterval = setInterval(() => {
            if (isMoving) {
                setTailWag(Math.random() * 20 - 10);
            } else if (isPlayful || mood === "curious") {
                setTailWag(Math.sin(Date.now() / 200) * 15);
            } else if (isSitting || mood === "content") {
                setTailWag(Math.sin(Date.now() / 1000) * 5);
            } else {
                setTailWag(0);
            }
        }, 50);

        return () => clearInterval(tailInterval);
    }, [isMoving, isPlayful, mood, isSitting]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const targetX = e.clientX - 25;
        const targetY = e.clientY + 35;

        // Calculate velocity for realistic physics
        const deltaX = e.clientX - lastX.current;
        const deltaY = e.clientY - lastY.current;
        velocityX.current = deltaX;
        velocityY.current = deltaY;
        const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        cursorX.set(targetX);
        cursorY.set(targetY);

        // Determine direction with hysteresis
        if (deltaX < -3) {
            setFacingLeft(true);
        } else if (deltaX > 3) {
            setFacingLeft(false);
        }

        lastX.current = e.clientX;
        lastY.current = e.clientY;

        // Wake up and start moving
        if (speed > 1) {
            setIsMoving(true);
            setIsSleeping(false);
            setIsSitting(false);
            setIsGrooming(false);
            setIsStretching(false);
            isIdleAnimation.current = false;

            // Fast movement = playful, slow = curious
            if (speed > 15) {
                setMood("playful");
                setIsPlayful(true);
                setIsPurring(false);
            } else if (speed > 5) {
                setMood("happy");
                setIsPlayful(false);
            } else {
                setMood("curious");
            }

            lastMoveTime.current = Date.now();
        }

        // Stop moving animation after cursor stops
        setTimeout(() => {
            if (Date.now() - lastMoveTime.current > 150) {
                setIsMoving(false);
                setIsPlayful(false);
            }
        }, 200);
    }, [cursorX, cursorY]);

    useEffect(() => {
        const checkMobile = () => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            setIsVisible(!isMobile);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

    if (!isVisible) return null;

    // Eye rendering based on state
    const renderEyes = () => {
        if (isSleeping) {
            return (
                <>
                    <path d="M38,36 Q42,38 46,36" stroke="#2a2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M54,36 Q58,38 62,36" stroke="#2a2a2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </>
            );
        }

        const eyeHeight = blinkState === "closed" ? 1 : blinkState === "half" ? 3 : 6;
        const pupilSize = isPlayful ? 7 : mood === "curious" ? 6 : 4.5;

        return (
            <>
                {/* Left eye */}
                <ellipse cx="42" cy="36" rx="5" ry={eyeHeight} fill="#f0e68c" />
                <ellipse cx="42" cy="36" rx={pupilSize} ry={pupilSize * (eyeHeight / 6)} fill="#1a1a1a" />
                {blinkState === "open" && (
                    <circle cx="40" cy="34" r="1.5" fill="#ffffff" opacity="0.9" />
                )}

                {/* Right eye */}
                <ellipse cx="58" cy="36" rx="5" ry={eyeHeight} fill="#f0e68c" />
                <ellipse cx="58" cy="36" rx={pupilSize} ry={pupilSize * (eyeHeight / 6)} fill="#1a1a1a" />
                {blinkState === "open" && (
                    <circle cx="56" cy="34" r="1.5" fill="#ffffff" opacity="0.9" />
                )}
            </>
        );
    };

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999]"
            style={{ x: petX, y: petY }}
        >
            <motion.div
                style={{ y: bounce }}
                animate={{
                    scaleX: facingLeft ? -1 : 1,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <div className="relative">
                    <motion.div
                        className="relative"
                        animate={
                            isStretching
                                ? {
                                    scaleX: [1, 1.3, 1],
                                    scaleY: [1, 0.9, 1],
                                }
                                : isGrooming
                                    ? {
                                        rotate: [0, -15, -10, -15, 0],
                                    }
                                    : isMoving
                                        ? {
                                            rotate: [0, -3, 0, 3, 0],
                                            y: [0, -1, 0, -1, 0],
                                        }
                                        : isSleeping
                                            ? {
                                                scaleY: [1, 1.03, 1],
                                            }
                                            : isSitting
                                                ? {
                                                    y: [0, 1, 0],
                                                }
                                                : {}
                        }
                        transition={{
                            repeat: isMoving || isSleeping || isSitting ? Infinity : 0,
                            duration: isMoving ? 0.25 : isStretching ? 1.5 : isGrooming ? 0.5 : isSleeping ? 3 : 4,
                            ease: "easeInOut",
                        }}
                    >
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 100 100"
                            className="drop-shadow-xl"
                        >
                            {/* Body - more realistic shape */}
                            <ellipse
                                cx="50"
                                cy={isSitting ? "68" : "65"}
                                rx={isSitting ? "32" : "30"}
                                ry={isSitting ? "20" : "24"}
                                fill="#6b5b5b"
                            />
                            <ellipse
                                cx="50"
                                cy={isSitting ? "68" : "65"}
                                rx={isSitting ? "28" : "26"}
                                ry={isSitting ? "16" : "20"}
                                fill="#7a6a6a"
                                opacity="0.6"
                            />

                            {/* Chest/Belly fur */}
                            <ellipse cx="50" cy={isSitting ? "70" : "68"} rx="14" ry="12" fill="#d4c4b0" opacity="0.9" />

                            {/* Head - rounder, more cat-like */}
                            <circle cx="50" cy="38" r="22" fill="#6b5b5b" />
                            <circle cx="50" cy="38" r="20" fill="#7a6a6a" opacity="0.7" />

                            {/* Ears - more realistic triangular shape */}
                            <motion.g
                                animate={earTwitch === "left" || earTwitch === "both" ? { rotate: -10 } : {}}
                                transition={{ duration: 0.1 }}
                                style={{ transformOrigin: "35px 30px" }}
                            >
                                <polygon points="28,22 38,38 22,36" fill="#6b5b5b" />
                                <polygon points="30,26 36,36 26,34" fill="#d4a5a5" />
                            </motion.g>

                            <motion.g
                                animate={earTwitch === "right" || earTwitch === "both" ? { rotate: 10 } : {}}
                                transition={{ duration: 0.1 }}
                                style={{ transformOrigin: "65px 30px" }}
                            >
                                <polygon points="72,22 62,38 78,36" fill="#6b5b5b" />
                                <polygon points="70,26 64,36 74,34" fill="#d4a5a5" />
                            </motion.g>

                            {/* Face marking - lighter patch */}
                            <ellipse cx="50" cy="42" rx="18" ry="16" fill="#8a7a7a" opacity="0.8" />

                            {/* Eyes - realistic cat eyes */}
                            {renderEyes()}

                            {/* Nose - realistic triangle */}
                            <polygon points="50,44 47,47 53,47" fill="#d4a5a5" />

                            {/* Mouth - subtle cat smile */}
                            <path
                                d="M50,47 L48,48 Q47,49 46,48.5"
                                stroke="#4a3a3a"
                                strokeWidth="1.2"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <path
                                d="M50,47 L52,48 Q53,49 54,48.5"
                                stroke="#4a3a3a"
                                strokeWidth="1.2"
                                fill="none"
                                strokeLinecap="round"
                            />

                            {/* Whiskers - thinner and more realistic */}
                            <line x1="28" y1="40" x2="12" y2="38" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                            <line x1="28" y1="44" x2="12" y2="45" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                            <line x1="28" y1="48" x2="14" y2="52" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.6" />
                            <line x1="72" y1="40" x2="88" y2="38" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                            <line x1="72" y1="44" x2="88" y2="45" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.7" />
                            <line x1="72" y1="48" x2="86" y2="52" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.6" />

                            {/* Tail - more realistic and expressive */}
                            <motion.path
                                d={
                                    isSitting
                                        ? "M75,72 Q85,78 82,85"
                                        : isMoving
                                            ? "M78,68 Q98,58 94,40"
                                            : isSleeping
                                                ? "M75,70 Q70,78 72,85"
                                                : "M78,68 Q95,60 90,45"
                                }
                                stroke="#6b5b5b"
                                strokeWidth="7"
                                strokeLinecap="round"
                                fill="none"
                                animate={{
                                    d: isSitting
                                        ? [
                                            "M75,72 Q85,78 82,85",
                                            `M75,72 Q${85 + tailWag * 0.3},78 ${82 + tailWag * 0.2},85`,
                                        ]
                                        : isMoving
                                            ? [
                                                "M78,68 Q98,58 94,40",
                                                "M78,68 Q102,62 98,45",
                                                "M78,68 Q98,58 94,40",
                                            ]
                                            : isSleeping
                                                ? ["M75,70 Q70,78 72,85"]
                                                : [
                                                    "M78,68 Q95,60 90,45",
                                                    `M78,68 Q${95 + tailWag * 0.5},${60 + tailWag * 0.3} ${90 + tailWag * 0.4},45`,
                                                ],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: isMoving ? 0.15 : isSleeping ? 0 : 0.5,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Tail tip - lighter color */}
                            <motion.circle
                                cx={isSitting ? 82 : isMoving ? 94 : isSleeping ? 72 : 90}
                                cy={isSitting ? 85 : isMoving ? 40 : isSleeping ? 85 : 45}
                                r="4"
                                fill="#8a7a7a"
                                animate={{
                                    cx: isSitting
                                        ? 82 + tailWag * 0.2
                                        : isMoving
                                            ? [94, 98, 94]
                                            : isSleeping
                                                ? 72
                                                : 90 + tailWag * 0.4,
                                    cy: isSitting
                                        ? 85
                                        : isMoving
                                            ? [40, 45, 40]
                                            : isSleeping
                                                ? 85
                                                : 45,
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: isMoving ? 0.15 : 0.5,
                                }}
                            />

                            {/* Front paws - realistic animation */}
                            {!isSitting && (
                                <>
                                    <motion.ellipse
                                        cx="38"
                                        cy="85"
                                        rx="5"
                                        ry="4"
                                        fill="#6b5b5b"
                                        animate={
                                            isMoving
                                                ? { y: [0, -6, 0], x: [0, 2, 0] }
                                                : {}
                                        }
                                        transition={{
                                            repeat: Infinity,
                                            duration: 0.2,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <motion.ellipse
                                        cx="62"
                                        cy="85"
                                        rx="5"
                                        ry="4"
                                        fill="#6b5b5b"
                                        animate={
                                            isMoving
                                                ? { y: [0, -6, 0], x: [0, -2, 0] }
                                                : {}
                                        }
                                        transition={{
                                            repeat: Infinity,
                                            duration: 0.2,
                                            delay: 0.1,
                                            ease: "easeInOut",
                                        }}
                                    />
                                </>
                            )}

                            {/* Paw details */}
                            {!isMoving && !isSitting && (
                                <>
                                    <circle cx="36" cy="85" r="1" fill="#5a4a4a" />
                                    <circle cx="40" cy="85" r="1" fill="#5a4a4a" />
                                    <circle cx="60" cy="85" r="1" fill="#5a4a4a" />
                                    <circle cx="64" cy="85" r="1" fill="#5a4a4a" />
                                </>
                            )}
                        </svg>
                    </motion.div>

                    {/* Status indicators */}
                    <motion.div
                        className="absolute -top-8 left-1/2 -translate-x-1/2 text-base"
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{
                            opacity: isSleeping || isGrooming || mood === "curious" || isPlayful ? 1 : 0,
                            scale: isSleeping || isGrooming || mood === "curious" || isPlayful ? 1 : 0,
                            y: isSleeping || isGrooming || mood === "curious" || isPlayful ? 0 : 10,
                        }}
                        transition={{ type: "spring", damping: 10 }}
                    >
                        {isSleeping && <span>💤</span>}
                        {isGrooming && !isSleeping && <span>🧼</span>}
                        {isPlayful && !isSleeping && <span>✨</span>}
                        {mood === "curious" && !isSleeping && !isGrooming && !isPlayful && <span>❓</span>}
                    </motion.div>

                    {/* Paw prints trail when running fast */}
                    {isMoving && Math.abs(velocityX.current) > 10 && (
                        <motion.div
                            className="absolute top-8 left-1/2 text-xs opacity-60"
                            animate={{ opacity: [0.6, 0], scale: [1, 0.5], y: [0, 15] }}
                            transition={{ duration: 0.8 }}
                            key={Date.now()}
                        >
                            🐾
                        </motion.div>
                    )}

                    {/* Heart when content */}
                    {mood === "content" && !isMoving && !isSleeping && (
                        <motion.div
                            className="absolute -top-10 left-1/2 -translate-x-1/2 text-sm"
                            animate={{
                                y: [0, -5, 0],
                                opacity: [0.8, 1, 0.8],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                            }}
                        >
                            💕
                        </motion.div>
                    )}
                </div>
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