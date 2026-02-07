"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Coffee, MapPin, Zap, Heart } from "lucide-react";
import MyProjects from "@/components/projects";
import CopyCmd from "@/components/copycmd";
import { FlipWordsDemo } from "@/components/words";
import { DockDemo } from "@/components/dock";
import HoverImageComponent from "@/components/skills";
import ContactMe from "@/components/contact";
import ResumeSection from "@/components/ResumeSection";
import ExperienceSection from "@/components/ExperienceSection";
import FunFacts from "@/components/FunFacts";
import AchievementsSection from "@/components/AchievementsSection";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// Fun greeting based on time
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return { text: "Burning the midnight oil?", emoji: "🌙" };
  if (hour < 12) return { text: "Good morning!", emoji: "☀️" };
  if (hour < 17) return { text: "Good afternoon!", emoji: "🌤️" };
  if (hour < 21) return { text: "Good evening!", emoji: "🌅" };
  return { text: "Night owl mode 🦉", emoji: "🌙" };
};

const Page = () => {
  const [greeting, setGreeting] = useState({ text: "", emoji: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setGreeting(getGreeting());
    setMounted(true);
  }, []);

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Decorations */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="orb orb-primary w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] -top-[150px] -right-[150px] sm:-top-[200px] sm:-right-[200px] animate-orb opacity-20" />
          <div className="orb orb-accent w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] top-[40%] -left-[100px] sm:-left-[150px] animate-orb-slow opacity-15" />
          <div className="orb orb-primary w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bottom-[10%] right-[10%] sm:right-[20%] animate-orb opacity-10" />
          <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-28">
          {/* Hero Section */}
          <motion.div
            className="relative"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[50vh] lg:min-h-[60vh]">
              {/* Left Column - Text */}
              <div className="flex flex-col gap-4 sm:gap-5">
                {/* Time-based greeting */}
                {mounted && (
                  <motion.div variants={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{greeting.emoji}</span>
                    <span>{greeting.text}</span>
                  </motion.div>
                )}

                {/* Badge */}
                <motion.div variants={item}>
                  <span className="badge-primary">
                    <Sparkles size={14} />
                    <span>Open to new adventures</span>
                  </span>
                </motion.div>

                {/* Name with wave */}
                <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="inline-block">Hey, I&apos;m&nbsp;</span>
                  <span className="gradient-text">Prince</span>
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ rotate: [0, 14, -8, 14, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}
                  >
                    👋
                  </motion.span>
                </motion.h1>

                {/* Role */}
                <motion.div variants={item} className="text-lg sm:text-xl lg:text-2xl">
                  <FlipWordsDemo />
                </motion.div>

                {/* Bio - More personal */}
                <motion.p variants={item} className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                  A calm, curious engineer who loves building systems, studying people and cultures, and exploring ideas beyond the obvious.
                </motion.p>

                {/* Location + Status */}
                <motion.div variants={item} className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    India
                  </span>
                  <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <Coffee className="w-4 h-4" />
                    Chai-powered
                  </span>
                  <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    Building cool stuff
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={item} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <CopyCmd />
                  <DockDemo />
                </motion.div>
              </div>

              {/* Right Column - Interactive Card */}
              <motion.div
                variants={item}
                className="hidden lg:flex items-center justify-center"
              >
                <InteractiveCodeCard />
              </motion.div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6 sm:space-y-16 lg:space-y-20 mt-6 sm:mt-16 lg:mt-20">
            {/* Fun Facts - New! */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <FunFacts />
            </motion.div>

            <div className="section-divider" />

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <HoverImageComponent />
            </motion.div>

            <div className="section-divider" />

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <ExperienceSection />
            </motion.div>

            <div className="section-divider" />

            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <MyProjects />
            </motion.div>

            <div className="section-divider" />

            {/* Resume */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <ResumeSection />
            </motion.div>

            {/* <div className="section-divider" /> */}

            {/* Achievements */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <AchievementsSection />
            </motion.div> */}

            <div className="section-divider" />

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <ContactMe />
            </motion.div>
          </div>
        </div>
      </section >
    </>
  );
};

// Interactive Code Card Component
const InteractiveCodeCard = () => {
  const [coffeeCount, setCoffeeCount] = useState(3);
  const [mood, setMood] = useState("🤔");
  const moods = ["🤔", "😊", "🚀", "💡", "😴", "🔥", "✨"];

  const handleCoffeeClick = () => {
    setCoffeeCount(prev => prev + 1);
  };

  const handleMoodClick = () => {
    const nextIndex = (moods.indexOf(mood) + 1) % moods.length;
    setMood(moods[nextIndex]);
  };

  return (
    <div className="relative">
      <motion.div
        className="card-premium p-6 backdrop-blur-sm select-none"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:scale-125 transition-transform" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer hover:scale-125 transition-transform" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer hover:scale-125 transition-transform" />
          <span className="ml-auto text-xs text-muted-foreground font-mono">prince.config.ts</span>
        </div>
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            <span className="text-primary">const</span>{" "}
            <span className="text-foreground">prince</span>{" "}
            <span className="text-muted-foreground">=</span>{" "}
            <span className="text-muted-foreground">{"{"}</span>{"\n"}
            {"  "}<span className="text-accent">name</span>
            <span className="text-muted-foreground">:</span>{" "}
            <span className="text-emerald-400">&quot;Prince Kumar&quot;</span>
            <span className="text-muted-foreground">,</span>{"\n"}
            {"  "}<span className="text-accent">role</span>
            <span className="text-muted-foreground">:</span>{" "}
            <span className="text-emerald-400">&quot;Full Stack Dev&quot;</span>
            <span className="text-muted-foreground">,</span>{"\n"}
            {"  "}<span className="text-accent">mood</span>
            <span className="text-muted-foreground">:</span>{" "}
            <motion.span
              className="cursor-pointer text-xl inline-block"
              onClick={handleMoodClick}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9, rotate: 180 }}
              title="Click me!"
            >
              {mood}
            </motion.span>
            <span className="text-muted-foreground">,</span>
            <span className="text-muted-foreground/50 text-xs ml-2">// click!</span>{"\n"}
            {"  "}<span className="text-accent">coffee</span>
            <span className="text-muted-foreground">:</span>{" "}
            <motion.span
              className="cursor-pointer text-primary font-bold"
              onClick={handleCoffeeClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Buy me a coffee!"
            >
              {coffeeCount}
            </motion.span>{" "}
            <span className="text-muted-foreground/50">☕</span>
            <span className="text-muted-foreground">,</span>
            <span className="text-muted-foreground/50 text-xs ml-2">// click!</span>{"\n"}
            {"  "}<span className="text-accent">isAwesome</span>
            <span className="text-muted-foreground">:</span>{" "}
            <span className="text-primary">true</span>
            <span className="text-muted-foreground">,</span>
            <span className="animate-pulse ml-2">▊</span>{"\n"}
            <span className="text-muted-foreground">{"}"}</span>
            <span className="text-muted-foreground">;</span>
          </code>
        </pre>
        <p className="mt-3 text-[10px] text-muted-foreground/60 text-center">
          psst... try clicking on the mood & coffee!
        </p>
      </motion.div>
      <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-primary rounded-3xl scale-110" />
    </div>
  );
};

export default Page;

