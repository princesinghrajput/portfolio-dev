"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";

const CursorPet: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [mood, setMood] = useState<"awake" | "sleepy" | "happy" | "excited">("awake");
    const [idleTimer, setIdleTimer] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [isBlinking, setIsBlinking] = useState(false);
    
    // Store mouse offset for the SVG eyes and 2.5D face parallax
    const mouseX = useSpring(0, { stiffness: 200, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 200, damping: 30 });
    const faceX = useSpring(0, { stiffness: 100, damping: 40 });
    const faceY = useSpring(0, { stiffness: 100, damping: 40 });
    const containerRef = useRef<HTMLDivElement>(null);
    const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastScrollYRef = useRef(0);

    // Initial greeting based on time of day
    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            const hour = new Date().getHours();
            if (hour < 12) setMessage("Good morning! I'm your loyal puppy assistant.");
            else if (hour < 18) setMessage("Good afternoon! Let's build something awesome.");
            else setMessage("Good evening! Sniffing out some code?");
            
            setTimeout(() => setMessage(null), 5000);
        }, 1500);
    }, []);

    // Random Blinking Algorithm for extreme realism
    useEffect(() => {
        let isSubscribed = true;
        const blinkLoop = () => {
            if (!isSubscribed) return;
            setIsBlinking(true);
            setTimeout(() => {
                if (isSubscribed) setIsBlinking(false);
            }, 150); // Blink duration
            // Schedule next blink randomly between 2s and 7s
            setTimeout(blinkLoop, Math.random() * 5000 + 2000);
        };
        const timeout = setTimeout(blinkLoop, 3000);
        return () => {
            isSubscribed = false;
            clearTimeout(timeout);
        };
    }, []);

    // Idle tracking, Eye tracking, and 2.5D Parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setIdleTimer(0);
            if (mood === "sleepy") {
                setMood("awake");
                setMessage("Oh, you're back!");
                setTimeout(() => setMessage(null), 3000);
            }
            
            if (!containerRef.current) return;
            // Get center of the dog avatar container
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate absolute distance of cursor from the dog for the eyes
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const distance = Math.min(Math.sqrt(dx * dx + dy * dy) / 10, 3.5); // Max pupil movement
            
            const angle = Math.atan2(dy, dx);
            mouseX.set(Math.cos(angle) * distance);
            mouseY.set(Math.sin(angle) * distance);

            // 2.5D Face Parallax mapping (face turns slightly towards mouse)
            const fX = Math.max(-4, Math.min(4, (dx / window.innerWidth) * 15));
            const fY = Math.max(-3, Math.min(3, (dy / window.innerHeight) * 15));
            faceX.set(fX);
            faceY.set(fY);
        };

        const handleActivity = () => {
            setIdleTimer(0);
        };

        // Scroll listener to trigger a cute reading message when scrolling deep
        const handleScroll = () => {
            handleActivity();
            
            const scrollY = window.scrollY;
            if (scrollY > 1200 && lastScrollYRef.current <= 1200 && !message && mood !== "sleepy") {
                setMessage("Wow, you're reading a lot! He's impressive, huh? 📖👀");
                setMood("happy");
                setTimeout(() => {
                    setMessage(null);
                    setMood("awake");
                }, 4000);
            }
            lastScrollYRef.current = scrollY;
        };

        // Smart Element Hovering (Dog comments on what you hover over)
        const handleElementHover = (e: MouseEvent) => {
            handleActivity();
            const target = e.target as HTMLElement;
            if (mood === "sleepy" || mood === "excited" || message) return;
            
            const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
            if (isClickable && Math.random() < 0.05) { // 5% chance on any hover to speak to not be annoying
                setMessage(Math.random() > 0.5 ? "Ooh, click it! 🐾" : "That looks interesting! 👀");
                setMood("happy");
                setTimeout(() => { setMessage(null); setMood("awake"); }, 3000);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("click", handleActivity);
        window.addEventListener("mouseover", handleElementHover);

        const interval = setInterval(() => {
            setIdleTimer((prev) => prev + 1);
        }, 1000);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("click", handleActivity);
            window.removeEventListener("mouseover", handleElementHover);
            clearInterval(interval);
        };
    }, [mood, mouseX, mouseY, faceX, faceY, message]);

    // Triggers sleepy mood after 15 seconds of no activity
    useEffect(() => {
        if (idleTimer > 15 && mood !== "sleepy") {
            setMood("sleepy");
            setMessage("Zzz... Wake me up if you need me...");
            setTimeout(() => setMessage(null), 4000);
            
            // gently settle tracking to center while sleeping
            mouseX.set(0);
            mouseY.set(0);
            faceX.set(0);
            faceY.set(0);
        }
    }, [idleTimer, mood, mouseX, mouseY, faceX, faceY]);

    // Humanized interactions on click (The Awww Algorithm)
    const handlePetClick = () => {
        setClickCount(prev => prev + 1);
        
        // Reset click accumulation after 3 seconds
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = setTimeout(() => setClickCount(0), 3000);

        // Excited Mode Trigger (3+ rapid clicks)
        if (clickCount >= 3) {
            setMood("excited");
            setMessage("WOOHOO! I LOVE YOU! HIRE MY HUMAN! 🐾❤️✨");
            setTimeout(() => {
                setMood("awake");
                setMessage(null);
                setClickCount(0);
            }, 3500);
            return;
        }

        // Contextual Portfolio Praise Phrases
        const portfolioPhrases = [
            "Prince built this portfolio from scratch! He's a good human! 🐶💻",
            "I'm his Rubber Duck. We fix all the Next.js bugs together! 🦆🐾",
            "He writes such clean code... it makes my tail wag! ✨",
            "Hire him so he can buy me more premium dog treats! 🥩🦴",
            "Did you see his projects? I helped by barking at the mailman! 📬🐕",
            "He's a 10x developer... and gives 10x ear scratches! ❤️",
            "His architecture is as solid as a good, strong bone. 🦴",
            "*Pant pant* Don't forget to check out his resume! 📄👀",
            "I love when he codes in React. I think he's 'Reacting' to me! 😂"
        ];
        
        setMessage(portfolioPhrases[Math.floor(Math.random() * portfolioPhrases.length)]);
        setMood("happy");
        
        setTimeout(() => {
            setMood(prevMood => (prevMood === "excited" ? "excited" : "awake"));
            setMessage(prevMsg => (prevMsg === "WOOHOO! I LOVE YOU! HIRE MY HUMAN! 🐾❤️✨" ? prevMsg : null));
        }, 4000);
    };

    if (!isVisible) return null;

    return (
        <div 
            className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none" 
        >
            {/* Speech Bubble / Chat Message */}
            <AnimatePresence>
                {message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="mb-4 bg-primary text-primary-foreground px-5 py-3 rounded-2xl border dark:border-primary border-primary rounded-br-none shadow-2xl max-w-[250px] text-sm font-medium origin-bottom-right drop-shadow-xl z-50 pointer-events-auto"
                    >
                        {message}
                        {/* Sleepy indicator */}
                        {mood === "sleepy" && (
                            <motion.span
                                className="absolute -top-4 -right-2 text-xl"
                                animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3] }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                            >
                                💤
                            </motion.span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SVG Fluffy Dog Container */}
            <motion.div
                ref={containerRef}
                className="w-24 h-24 relative cursor-pointer pointer-events-auto"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handlePetClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                    mood === "excited"
                        ? { y: [0, -18, 0], scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }
                        : mood === "happy" 
                            ? { y: [0, -6, 0] } 
                            : mood === "sleepy"
                                ? { scale: [1, 0.98, 1], y: [0, 2, 0] } 
                                : { y: 0 } // sit still when awake
                }
                transition={{
                    repeat: mood === "awake" ? 0 : Infinity,
                    duration: mood === "excited" ? 0.3 : mood === "happy" ? 0.35 : mood === "sleepy" ? 3.5 : 4.5,
                    ease: "easeInOut"
                }}
            >
                {/* High-Fidelity Geometric Gray & White Puppy SVG */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl overflow-visible">
                    {/* Shadow under the dog */}
                    <ellipse cx="50" cy="95" rx="35" ry="5" fill="rgba(0,0,0,0.15)" className="dark:fill-black/30" />
                    
                    {/* Ears - Smooth floppy ovals */}
                    <motion.g 
                        animate={ mood === "sleepy" ? { rotate: -15, y: 3 } : (mood === "happy" || mood === "excited") ? { rotate: [0, -15, 15, 0] } : { rotate: 0 } } 
                        transition={{ duration: 0.2, repeat: (mood === "happy" || mood === "excited") ? Infinity : 0 }}
                        style={{ transformOrigin: "25px 35px" }}
                    >
                        {/* Left Ear */}
                        <ellipse cx="20" cy="50" rx="14" ry="28" fill="#757A82" transform="rotate(15 20 50)" />
                        <ellipse cx="22" cy="52" rx="10" ry="22" fill="#A8ADB5" transform="rotate(15 22 52)" /> {/* Inner ear */}
                    </motion.g>

                    <motion.g 
                        animate={ mood === "sleepy" ? { rotate: 15, y: 3 } : (mood === "happy" || mood === "excited") ? { rotate: [0, 15, -15, 0] } : { rotate: 0 } }
                        transition={{ duration: 0.2, repeat: (mood === "happy" || mood === "excited") ? Infinity : 0, delay: 0.1 }}
                        style={{ transformOrigin: "75px 35px" }}
                    >
                        {/* Right Ear */}
                        <ellipse cx="80" cy="50" rx="14" ry="28" fill="#757A82" transform="rotate(-15 80 50)" />
                        <ellipse cx="78" cy="52" rx="10" ry="22" fill="#A8ADB5" transform="rotate(-15 78 52)" />
                    </motion.g>

                    {/* Dark Grey Outer Head Base (Perfect smooth dome) */}
                    <ellipse cx="50" cy="48" rx="38" ry="34" fill="#888E96" />
                    
                    {/* 2.5D Parallax Group - The face physically points toward the cursor */}
                    <motion.g style={{ x: faceX, y: faceY }}>
                        {/* Smooth White Face Mask / Snout */}
                        <ellipse cx="50" cy="64" rx="34" ry="24" fill="#F7F8F9" />
                        
                        {/* White Forehead Stripe (Blends seamlessly into snout) */}
                        <path d="M 36 21 Q 50 10 64 21 Q 58 45 61 55 L 39 55 Q 42 45 36 21 Z" fill="#F7F8F9" />

                        {/* Cute Grey Fur Tufts styling on cheeks */}
                        <path d="M 12 55 Q 5 60 14 62" stroke="#888E96" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M 88 55 Q 95 60 86 62" stroke="#888E96" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M 44 14 L 46 8 L 50 12 L 54 8 L 56 14 Z" fill="#888E96" /> {/* Top hair tuft */}

                        {/* Eyes - Giant white expressive cartoon circles */}
                        {(mood === 'sleepy' || isBlinking) ? (
                            <>
                                <path d="M 28 47 Q 34 52 40 47" stroke="#4A4D52" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                                <path d="M 60 47 Q 66 52 72 47" stroke="#4A4D52" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                            </>
                        ) : (mood === 'happy' || mood === 'excited') ? (
                            <>
                                <path d="M 28 45 Q 34 35 40 45" stroke="#4A4D52" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                                <path d="M 60 45 Q 66 35 72 45" stroke="#4A4D52" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                                {mood === 'excited' && (
                                    <>
                                        <path d="M 34 50 Q 34 40 40 45" stroke="#4A4D52" strokeWidth="2" fill="none" strokeLinecap="round" />
                                        <path d="M 66 50 Q 66 40 72 45" stroke="#4A4D52" strokeWidth="2" fill="none" strokeLinecap="round" />
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                {/* Eye Sclera */}
                                <circle cx="34" cy="45" r="10" fill="#FFFFFF" />
                                <circle cx="66" cy="45" r="10" fill="#FFFFFF" />
                                
                                {/* Tracking Pupils */}
                                <motion.circle cx="34" cy="45" r="6.5" fill="#22252A" style={{ x: mouseX, y: mouseY }} />
                                <motion.circle cx="66" cy="45" r="6.5" fill="#22252A" style={{ x: mouseX, y: mouseY }} />
                                
                                {/* Premium Catchlights */}
                                <motion.circle cx="32" cy="41" r="2.5" fill="white" style={{ x: mouseX, y: mouseY }} />
                                <motion.circle cx="64" cy="41" r="2.5" fill="white" style={{ x: mouseX, y: mouseY }} />
                                
                                <motion.ellipse cx="36" cy="48" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.6" style={{ x: mouseX, y: mouseY }} />
                                <motion.ellipse cx="68" cy="48" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.6" style={{ x: mouseX, y: mouseY }} />
                            </>
                        )}

                        {/* Expressive Eyebrows */}
                        <path d="M 28 30 Q 34 26 40 32" stroke="#5C6066" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M 72 30 Q 66 26 60 32" stroke="#5C6066" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                        {/* Cute Big Dark Oval Nose */}
                        <ellipse cx="50" cy="58" rx="8.5" ry="6" fill="#44474A" />
                        {/* Nose highlight bridge */}
                        <ellipse cx="48" cy="55.5" rx="3.5" ry="1.5" fill="#FFFFFF" opacity="0.4" /> 

                        {/* Mouth and Tongue */}
                        {(mood === 'happy' || mood === 'excited') ? (
                            <>
                                <path d="M 40 68 Q 50 78 60 68" stroke="#44474A" strokeWidth="2" fill="none" strokeLinecap="round" />
                                {/* Panting tongue dropping down */}
                                <motion.path 
                                    d="M 45 69 L 45 78 C 45 84 55 84 55 78 L 55 69 Z" 
                                    fill="#F06B78" 
                                    animate={{ scaleY: [1, 1.3, 1] }} 
                                    transition={{ repeat: Infinity, duration: mood === 'excited' ? 0.15 : 0.25 }}
                                    style={{ transformOrigin: "50px 69px" }}
                                /> 
                                <path d="M 50 69 L 50 79" stroke="#D1505D" strokeWidth="1.5" fill="none" opacity="0.6" /> {/* tongue crease */}
                            </>
                        ) : (
                            <>
                                {/* Smiling mouth connecting to nose */}
                                <path d="M 50 64 L 50 69" stroke="#44474A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                <path d="M 50 69 Q 40 76 34 70" stroke="#44474A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                <path d="M 50 69 Q 60 76 66 70" stroke="#44474A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                                
                                {/* Cute little tongue peeking out */}
                                <motion.path 
                                    d="M 46.5 70.5 L 46.5 75 C 46.5 79 53.5 79 53.5 75 L 53.5 70.5 Z" 
                                    fill="#F06B78" 
                                    animate={ mood === "sleepy" ? { scale: 0 } : { scale: [1, 1.05, 1] } }
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    style={{ transformOrigin: "50px 70px" }}
                                />
                                <path d="M 50 70.5 L 50 76" stroke="#D1505D" strokeWidth="1" fill="none" opacity="0.6" />
                            </>
                        )}
                    </motion.g>

                    {/* Blush on Hover */}
                    <AnimatePresence>
                        {isHovered && mood !== 'sleepy' && (
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <ellipse cx="28" cy="62" rx="5" ry="3.5" fill="#FF8C9D" opacity="0.5" />
                                <ellipse cx="72" cy="62" rx="5" ry="3.5" fill="#FF8C9D" opacity="0.5" />
                            </motion.g>
                        )}
                    </AnimatePresence>

                    {/* Paws Resting At The Edge */}
                    <motion.g 
                        animate={ mood === "sleepy" ? { y: 2 } : (mood === "happy" || mood === "excited") ? { y: [0, -6, 0] } : { y: 0 } }
                        transition={{ repeat: (mood === "happy" || mood === "excited") ? Infinity : 0, duration: mood === "excited" ? 0.2 : 0.3 }}
                    >
                        <ellipse cx="32" cy="85" rx="8" ry="10" fill="#FFFFFF" stroke="#C5C8CC" strokeWidth="1.5" />
                        <path d="M 29 88 L 29 93 M 32 89 L 32 94 M 35 88 L 35 93" stroke="#C5C8CC" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.g>

                    <motion.g 
                        animate={ mood === "sleepy" ? { y: 2 } : (mood === "happy" || mood === "excited") ? { y: [0, -6, 0] } : { y: 0 } }
                        transition={{ repeat: (mood === "happy" || mood === "excited") ? Infinity : 0, duration: mood === "excited" ? 0.2 : 0.3, delay: 0.1 }}
                    >
                        <ellipse cx="68" cy="85" rx="8" ry="10" fill="#FFFFFF" stroke="#C5C8CC" strokeWidth="1.5" />
                        <path d="M 65 88 L 65 93 M 68 89 L 68 94 M 71 88 L 71 93" stroke="#C5C8CC" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.g>
                </svg>

                {/* Floating Hearts Particle System */}
                <AnimatePresence>
                    {(isHovered || mood === 'happy' || mood === 'excited') && mood !== 'sleepy' && (
                        <>
                            <motion.div
                                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                                animate={{ opacity: 1, scale: 1.4, y: -25, x: 10 }}
                                exit={{ opacity: 0, scale: 0, y: -35 }}
                                transition={{ duration: 0.5 }}
                                className="absolute top-0 right-0 text-red-500 z-10 select-none pointer-events-none drop-shadow-md"
                            >
                                ❤️
                            </motion.div>
                            
                            {mood === 'excited' && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1.2, y: -45, x: -15 }}
                                        transition={{ delay: 0.15, duration: 0.5 }}
                                        className="absolute top-2 right-4 text-pink-500 z-10 select-none pointer-events-none drop-shadow-md"
                                    >
                                        💖
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0, y: 0 }}
                                        animate={{ opacity: 1, scale: 1.8, y: -35, x: -30 }}
                                        transition={{ delay: 0.25, duration: 0.5 }}
                                        className="absolute top-6 right-8 text-red-500 z-10 select-none pointer-events-none drop-shadow-xl"
                                    >
                                        ❤️
                                    </motion.div>
                                </>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export const MobileCatPet = CursorPet;
export default CursorPet;