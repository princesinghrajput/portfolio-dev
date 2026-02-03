"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

const CursorPet: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [facingLeft, setFacingLeft] = useState(false);
    const [isSleeping, setIsSleeping] = useState(false);
    const [mood, setMood] = useState<"happy" | "curious" | "sleepy">("happy");
    const lastMoveTime = useRef(Date.now());
    const lastX = useRef(0);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Slower, more playful spring for cute following
    const springConfig = { damping: 20, stiffness: 80, mass: 1 };
    const petX = useSpring(cursorX, springConfig);
    const petY = useSpring(cursorY, springConfig);

    // Bounce effect when moving
    const bounce = useTransform(petX, (x) => {
        if (!isMoving) return 0;
        return Math.sin(Date.now() / 100) * 3;
    });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const targetX = e.clientX - 20;
        const targetY = e.clientY + 30;

        cursorX.set(targetX);
        cursorY.set(targetY);

        // Detect direction
        if (e.clientX < lastX.current - 5) {
            setFacingLeft(true);
        } else if (e.clientX > lastX.current + 5) {
            setFacingLeft(false);
        }
        lastX.current = e.clientX;

        setIsMoving(true);
        setIsSleeping(false);
        setMood("happy");
        lastMoveTime.current = Date.now();

        // Stop moving animation after cursor stops
        setTimeout(() => {
            if (Date.now() - lastMoveTime.current > 100) {
                setIsMoving(false);
            }
        }, 150);
    }, [cursorX, cursorY]);

    useEffect(() => {
        // Only show on desktop
        const checkMobile = () => {
            const isMobile = window.matchMedia("(max-width: 1024px)").matches;
            setIsVisible(!isMobile);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        window.addEventListener("mousemove", handleMouseMove);

        // Mood and sleep cycles
        const moodInterval = setInterval(() => {
            const timeSinceMove = Date.now() - lastMoveTime.current;

            if (timeSinceMove > 8000) {
                setIsSleeping(true);
                setMood("sleepy");
            } else if (timeSinceMove > 4000) {
                setMood("curious");
            }
        }, 1000);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(moodInterval);
        };
    }, [handleMouseMove]);

    if (!isVisible) return null;

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
                transition={{ duration: 0.15 }}
            >
                <div className="relative">
                    {/* The Cat */}
                    <motion.div
                        className="relative"
                        animate={
                            isMoving
                                ? {
                                    rotate: [0, -5, 0, 5, 0],
                                    y: [0, -2, 0, -2, 0],
                                }
                                : isSleeping
                                    ? {
                                        rotate: [0, 2, 0, -2, 0],
                                        scale: [1, 1.02, 1, 1.02, 1],
                                    }
                                    : {}
                        }
                        transition={{
                            repeat: Infinity,
                            duration: isMoving ? 0.3 : 2,
                            ease: "easeInOut",
                        }}
                    >
                        {/* Cat SVG - Cute style */}
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 100 100"
                            className="drop-shadow-lg"
                        >
                            {/* Body */}
                            <ellipse cx="50" cy="65" rx="28" ry="22" fill="#4a4a4a" />

                            {/* Head */}
                            <circle cx="50" cy="38" r="24" fill="#5a5a5a" />

                            {/* Ears */}
                            <polygon points="30,25 38,42 22,38" fill="#5a5a5a" />
                            <polygon points="70,25 62,42 78,38" fill="#5a5a5a" />
                            <polygon points="32,28 37,38 26,36" fill="#ffb6c1" />
                            <polygon points="68,28 63,38 74,36" fill="#ffb6c1" />

                            {/* Face */}
                            <ellipse cx="50" cy="42" rx="16" ry="14" fill="#6a6a6a" />

                            {/* Eyes */}
                            {isSleeping ? (
                                <>
                                    <path d="M38,36 Q42,40 46,36" stroke="#222" strokeWidth="2" fill="none" />
                                    <path d="M54,36 Q58,40 62,36" stroke="#222" strokeWidth="2" fill="none" />
                                </>
                            ) : (
                                <>
                                    <ellipse cx="42" cy="36" rx={isMoving ? 4 : 5} ry={isMoving ? 5 : 6} fill="#222" />
                                    <ellipse cx="58" cy="36" rx={isMoving ? 4 : 5} ry={isMoving ? 5 : 6} fill="#222" />
                                    <circle cx={isMoving ? 44 : 43} cy="35" r="2" fill="#fff" />
                                    <circle cx={isMoving ? 60 : 59} cy="35" r="2" fill="#fff" />
                                </>
                            )}

                            {/* Nose */}
                            <ellipse cx="50" cy="44" rx="3" ry="2" fill="#ffb6c1" />

                            {/* Mouth */}
                            <path d="M50,46 Q47,50 44,48" stroke="#222" strokeWidth="1.5" fill="none" />
                            <path d="M50,46 Q53,50 56,48" stroke="#222" strokeWidth="1.5" fill="none" />

                            {/* Whiskers */}
                            <line x1="30" y1="42" x2="18" y2="40" stroke="#3a3a3a" strokeWidth="1" />
                            <line x1="30" y1="46" x2="18" y2="48" stroke="#3a3a3a" strokeWidth="1" />
                            <line x1="70" y1="42" x2="82" y2="40" stroke="#3a3a3a" strokeWidth="1" />
                            <line x1="70" y1="46" x2="82" y2="48" stroke="#3a3a3a" strokeWidth="1" />

                            {/* Tail */}
                            <motion.path
                                d="M78,70 Q95,60 90,45"
                                stroke="#4a4a4a"
                                strokeWidth="6"
                                strokeLinecap="round"
                                fill="none"
                                animate={
                                    isMoving
                                        ? { d: ["M78,70 Q95,60 90,45", "M78,70 Q100,65 95,50", "M78,70 Q95,60 90,45"] }
                                        : isSleeping
                                            ? { d: "M78,70 Q88,75 85,80" }
                                            : { d: ["M78,70 Q95,60 90,45", "M78,70 Q92,55 88,42", "M78,70 Q95,60 90,45"] }
                                }
                                transition={{ repeat: Infinity, duration: isMoving ? 0.2 : 2 }}
                            />

                            {/* Front paws when running */}
                            {isMoving && (
                                <>
                                    <motion.ellipse
                                        cx="35"
                                        cy="82"
                                        rx="6"
                                        ry="4"
                                        fill="#4a4a4a"
                                        animate={{ y: [0, -4, 0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.2 }}
                                    />
                                    <motion.ellipse
                                        cx="65"
                                        cy="82"
                                        rx="6"
                                        ry="4"
                                        fill="#4a4a4a"
                                        animate={{ y: [0, -4, 0, -4, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.2, delay: 0.1 }}
                                    />
                                </>
                            )}
                        </svg>
                    </motion.div>

                    {/* Speech bubble / Status */}
                    <motion.div
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm whitespace-nowrap"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: isSleeping || mood === "curious" ? 1 : 0,
                            scale: isSleeping || mood === "curious" ? 1 : 0,
                        }}
                    >
                        {isSleeping && <span>💤</span>}
                        {mood === "curious" && !isSleeping && <span>❓</span>}
                    </motion.div>

                    {/* Sparkle trail when happy and moving */}
                    {isMoving && (
                        <motion.div
                            className="absolute -bottom-1 left-1/2 text-xs"
                            animate={{ opacity: [1, 0], y: [0, 10], scale: [1, 0.5] }}
                            transition={{ duration: 0.5 }}
                            key={Date.now()}
                        >
                            ✨
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CursorPet;
