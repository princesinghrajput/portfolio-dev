"use client";
import React, { useState } from "react";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "./ui/use-toast";

const CopyCmd = () => {
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = () => {
        const textToCopy = "npx prince-dev";
        navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);

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
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-muted/60 border border-border font-mono text-sm cursor-pointer select-none transition-all duration-200 hover:bg-muted hover:border-primary/40"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <span className="text-primary transition-transform duration-200 group-hover:scale-110">
                {copied ? <ClipboardCheck size={16} /> : <Clipboard size={16} />}
            </span>
            <span className="text-foreground">npx prince-dev</span>
        </motion.button>
    );
};

export default CopyCmd;