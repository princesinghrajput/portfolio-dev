"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Music, Book, Code2, Gamepad2, Globe, Moon, Lightbulb, Heart, Sparkles, Compass } from "lucide-react";

const funFacts = [
    { icon: Coffee, text: "Runs on chai, not coffee ☕", color: "text-amber-500" },
    { icon: Moon, text: "Best code written at 2 AM 🌙", color: "text-indigo-400" },
    { icon: Book, text: "Psychology books > fiction 📚", color: "text-emerald-400" },
    { icon: Globe, text: "Fascinated by how cultures think 🌍", color: "text-blue-400" },
    { icon: Music, text: "Lo-fi is the debugger's anthem 🎵", color: "text-pink-400" },
    { icon: Code2, text: "Wrote first code at 15 👨‍💻", color: "text-cyan-400" },
    { icon: Gamepad2, text: "Strategy games > shooters 🎮", color: "text-purple-400" },
    { icon: Lightbulb, text: "Ideas > Execution (working on it!) 💡", color: "text-yellow-400" },
];

const interests = [
    { label: "Systems Thinking", emoji: "🧠" },
    { label: "Human Psychology", emoji: "🔮" },
    { label: "Minimalist Design", emoji: "✨" },
    { label: "Open Source", emoji: "💻" },
    { label: "Cultural Anthropology", emoji: "🌏" },
    { label: "Philosophy", emoji: "📖" },
];

const currentlyLearning = [
    { item: "Rust", emoji: "🦀", progress: 30, color: "from-orange-500 to-red-500" },
    { item: "System Design", emoji: "🏗️", progress: 60, color: "from-blue-500 to-purple-500" },
    { item: "Playing Guitar", emoji: "🎸", progress: 15, color: "from-pink-500 to-rose-500" },
];

const FunFacts: React.FC = () => {
    const [revealedFacts, setRevealedFacts] = useState<number[]>([]);
    const [showSecret, setShowSecret] = useState(false);

    const handleRevealFact = (index: number) => {
        if (!revealedFacts.includes(index)) {
            setRevealedFacts([...revealedFacts, index]);
        }
    };

    const allRevealed = revealedFacts.length === funFacts.length;

    return (
        <section className="py-10 sm:py-12">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Heart className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Beyond the Code</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                    More Than a <span className="gradient-text">Developer</span>
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Sure, I write code. But I also spend time understanding why people do what they do, how different cultures approach problems, and finding beauty in systems that just <em>work</em>.
                </p>
            </div>

            {/* Fun Facts Grid - Tap to Reveal */}
            <div className="mb-8 sm:mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Random facts about me
                    </h3>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {revealedFacts.length}/{funFacts.length} discovered
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {funFacts.map((fact, index) => {
                        const isRevealed = revealedFacts.includes(index);
                        const IconComponent = fact.icon;
                        return (
                            <motion.button
                                key={index}
                                onClick={() => handleRevealFact(index)}
                                className={`relative group p-3 sm:p-4 rounded-xl border text-left min-h-[80px] sm:min-h-[100px] transition-all duration-300 ${isRevealed
                                        ? "bg-gradient-to-br from-card to-muted/50 border-primary/30 shadow-lg shadow-primary/5"
                                        : "bg-muted/30 border-border/50 hover:border-primary/40 hover:bg-muted/50 cursor-pointer"
                                    }`}
                                whileHover={!isRevealed ? { scale: 1.03, y: -3 } : {}}
                                whileTap={!isRevealed ? { scale: 0.97 } : {}}
                            >
                                <AnimatePresence mode="wait">
                                    {isRevealed ? (
                                        <motion.div
                                            key="revealed"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col justify-center h-full"
                                        >
                                            <p className="text-xs sm:text-sm text-foreground font-medium leading-snug">
                                                {fact.text}
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="hidden"
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            className="flex flex-col items-center justify-center h-full gap-1"
                                        >
                                            <motion.div
                                                animate={{ y: [0, -3, 0] }}
                                                transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
                                            >
                                                <IconComponent className={`w-6 h-6 ${fact.color} opacity-60`} />
                                            </motion.div>
                                            <span className="text-[10px] text-muted-foreground/70">tap me!</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Easter Egg */}
                <AnimatePresence>
                    {allRevealed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-5 text-center"
                        >
                            <motion.button
                                onClick={() => setShowSecret(!showSecret)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 text-sm font-medium text-foreground border border-primary/20 hover:border-primary/40 transition-all"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                🎉 You found all 8! {showSecret ? "Hide my philosophy" : "Bonus: my coding philosophy"}
                            </motion.button>
                            <AnimatePresence>
                                {showSecret && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 p-4 rounded-xl bg-card border border-border"
                                    >
                                        <p className="text-sm text-muted-foreground italic">
                                            &quot;The best code is the code you didn&apos;t have to write. But if you have to write it, make it so clean that future-you sends past-you a thank-you note.&quot;
                                        </p>
                                        <p className="text-xs text-muted-foreground/60 mt-2">— Me, probably at 3 AM</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Two Column - Interests + Currently Learning */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Interests */}
                <motion.div
                    className="card-premium p-4 sm:p-5"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                >
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Compass className="w-4 h-4 text-primary" />
                        Rabbit holes I enjoy
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {interests.map((interest, i) => (
                            <motion.span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all cursor-default border border-transparent hover:border-primary/20"
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                <span>{interest.emoji}</span>
                                <span>{interest.label}</span>
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Currently Learning */}
                <motion.div
                    className="card-premium p-4 sm:p-5"
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                >
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Book className="w-4 h-4 text-primary" />
                        Currently leveling up
                    </h3>
                    <div className="space-y-4">
                        {currentlyLearning.map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-sm text-foreground flex items-center gap-1.5">
                                        <span>{item.emoji}</span>
                                        <span>{item.item}</span>
                                    </span>
                                    <span className="text-[10px] text-muted-foreground font-mono">{item.progress}%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${item.progress}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground/60 mt-3 italic">
                        * Progress is subjective and may decrease after a Netflix binge
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FunFacts;
