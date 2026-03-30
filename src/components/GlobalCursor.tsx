"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import CursorPet from "./CursorPet";

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

const GlobalCursor: React.FC = () => {
    return (
        <>
            <CustomCursor />
            <CursorPet />
        </>
    );
};

export default GlobalCursor;
