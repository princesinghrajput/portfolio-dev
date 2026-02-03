"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Music, Book, Code2, Gamepad2, Globe, Moon, Lightbulb, Heart, Sparkles, Compass } from "lucide-react";
import SpotifyNowPlaying from "./SpotifyNowPlaying";

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
        <section className="py-4 sm:py-10">
            {/* Header - More compact on mobile */}
            <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                        <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <span className="text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Beyond the Code</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                    More Than a <span className="gradient-text">Developer</span>
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed hidden sm:block">
                    Sure, I write code. But I also spend time understanding why people do what they do.
                </p>
            </div>

            {/* Fun Facts - Horizontal scroll on mobile */}
            <div className="mb-4 sm:mb-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5 sm:gap-2">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        Random facts
                    </h3>
                    <span className="text-[9px] sm:text-xs text-muted-foreground bg-muted px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                        {revealedFacts.length}/{funFacts.length}
                    </span>
                </div>

                {/* Mobile: Horizontal scroll, Desktop: Grid */}
                <div className="sm:hidden -mx-4 px-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                        {funFacts.map((fact, index) => {
                            const isRevealed = revealedFacts.includes(index);
                            const IconComponent = fact.icon;
                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleRevealFact(index)}
                                    className={`snap-start flex-shrink-0 relative w-[120px] p-2.5 rounded-lg border text-left transition-all duration-300 ${isRevealed
                                        ? "bg-gradient-to-br from-card to-muted/50 border-primary/30"
                                        : "bg-muted/30 border-border/50 active:bg-muted/50"
                                        }`}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isRevealed ? (
                                        <p className="text-[10px] text-foreground font-medium leading-snug">
                                            {fact.text}
                                        </p>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full gap-0.5 py-2">
                                            <IconComponent className={`w-5 h-5 ${fact.color} opacity-60`} />
                                            <span className="text-[8px] text-muted-foreground/70">tap!</span>
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop: Grid */}
                <div className="hidden sm:grid sm:grid-cols-4 gap-3">
                    {funFacts.map((fact, index) => {
                        const isRevealed = revealedFacts.includes(index);
                        const IconComponent = fact.icon;
                        return (
                            <motion.button
                                key={index}
                                onClick={() => handleRevealFact(index)}
                                className={`relative group p-4 rounded-xl border text-left min-h-[100px] transition-all duration-300 ${isRevealed
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
                                            <p className="text-sm text-foreground font-medium leading-snug">
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
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Interests - Horizontal scroll on mobile */}
                <motion.div
                    className="card-premium p-3 sm:p-4"
                    whileTap={{ scale: 0.98 }}
                >
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                        <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        Interests
                    </h3>
                    <div className="w-full overflow-hidden">
                        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap -mx-1 px-1">
                            {interests.map((interest, i) => (
                                <motion.span
                                    key={i}
                                    className="flex-shrink-0 sm:flex-shrink inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-muted/70 text-muted-foreground active:text-foreground active:bg-primary/10 transition-all cursor-default border border-transparent active:border-primary/20"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span>{interest.emoji}</span>
                                    <span className="whitespace-nowrap">{interest.label}</span>
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Spotify Now Playing - New Addition */}
                <SpotifyNowPlaying />
            </div>

            {/* Currently Learning - Moved to full width or separate */}
            <div className="mt-3">
                <motion.div
                    className="card-premium p-3 sm:p-4"
                    whileTap={{ scale: 0.98 }}
                >
                    <h3 className="text-xs sm:text-sm font-semibold text-foreground mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                        <Book className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                        Leveling up
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                        {currentlyLearning.map((item, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] sm:text-sm text-foreground flex items-center gap-1 sm:gap-1.5">
                                        <span>{item.emoji}</span>
                                        <span>{item.item}</span>
                                    </span>
                                    <span className="text-[8px] sm:text-[10px] text-muted-foreground font-mono">{item.progress}%</span>
                                </div>
                                <div className="h-1.5 sm:h-2 bg-muted rounded-full overflow-hidden">
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
                    <p className="text-[8px] sm:text-[10px] text-muted-foreground/60 mt-2 sm:mt-3 italic hidden sm:block">
                        * Progress may decrease after a Netflix binge
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FunFacts;
