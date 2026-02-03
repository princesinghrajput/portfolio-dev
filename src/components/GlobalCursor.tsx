"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

// Custom cursor component
export const CustomCursor: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 500, mass: 0.1 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const trailConfig = { damping: 25, stiffness: 180, mass: 0.15 };
    const trailX = useSpring(cursorX, trailConfig);
    const trailY = useSpring(cursorY, trailConfig);

    useEffect(() => {
        const isMobile = window.matchMedia("(max-width: 1024px)").matches;
        if (isMobile) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.style.cursor === "pointer" ||
                window.getComputedStyle(target).cursor === "pointer";
            setIsPointer(!!isClickable);
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <>
            <style jsx global>{`
        @media (min-width: 1025px) {
          * { cursor: none !important; }
        }
      `}</style>

            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
                style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
            >
                <motion.div
                    className="rounded-full bg-white"
                    animate={{ width: isClicking ? 5 : isPointer ? 10 : 6, height: isClicking ? 5 : isPointer ? 10 : 6 }}
                    transition={{ duration: 0.1 }}
                />
            </motion.div>

            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
            >
                <motion.div
                    className="rounded-full border border-primary/40"
                    animate={{ width: isClicking ? 20 : isPointer ? 40 : 28, height: isClicking ? 20 : isPointer ? 40 : 28 }}
                    transition={{ duration: 0.15 }}
                />
            </motion.div>
        </>
    );
};

// Chasing Cat that tries to BITE the cursor!
export const CursorPet: React.FC = () => {
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
        setCatPos({ x: 80, y: window.innerHeight - 100 });
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

const GlobalCursor: React.FC = () => {
    return (
        <>
            <CustomCursor />
            <CursorPet />
        </>
    );
};

export default GlobalCursor;
