"use client";
import React, { useState } from "react";
import { Check, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "./ui/use-toast";

const CopyCmd = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = () => {
        const textToCopy = "npx prince-dev";
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2500);
                toast({
                    title: "Copied to clipboard",
                    description: "Paste the command in your terminal :3",
                });
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! An error occurred",
                    description: "There was a problem copying the text. Please try again later.",
                });
                console.error("An error occurred:", error);
            });
    };

    return (
        <motion.button
            onClick={handleCopyToClipboard}
            className="hidden sm:inline-flex group relative items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-muted/70 border border-border font-mono text-xs sm:text-sm cursor-pointer select-none transition-all duration-300 hover:bg-muted hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
        >
            <motion.span
                className="p-1.5 rounded-lg bg-primary/10 text-primary"
                animate={{ rotate: copied ? 360 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <AnimatePresence mode="wait">
                    {copied ? (
                        <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Check size={14} className="sm:w-4 sm:h-4" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="terminal"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Terminal size={14} className="sm:w-4 sm:h-4" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.span>

            <span className="text-foreground font-medium">npx prince-dev</span>

            <AnimatePresence>
                {copied && (
                    <motion.span
                        className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500 text-white shadow-lg"
                        initial={{ scale: 0, opacity: 0, y: 5 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0, opacity: 0, y: 5 }}
                        transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    >
                        Copied!
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default CopyCmd;