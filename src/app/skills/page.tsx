"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal } from "lucide-react";
import { IconCloudDemo } from "@/components/skillcloud";

const SkillPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-16 px-4 overflow-hidden">
      {/* Background Decorative Ambient Orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="orb orb-primary w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] top-[15%] -right-[80px] opacity-20 animate-orb" />
        <div className="orb orb-accent w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bottom-[15%] -left-[60px] opacity-15 animate-orb-slow" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center max-w-2xl mb-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tech Stack & Toolkit</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          My <span className="gradient-text">Skills</span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-md">
          An interactive 3D cloud of languages, frameworks, databases, and cloud services I build with.
        </p>
      </motion.div>

      {/* Interactive 3D Sphere */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full flex justify-center relative"
      >
        {/* Soft Radial Ambient Glow */}
        <div className="absolute inset-0 max-w-[36rem] mx-auto bg-gradient-to-tr from-primary/10 via-purple-500/5 to-cyan-500/10 blur-3xl -z-10 rounded-full pointer-events-none" />
        <IconCloudDemo />
      </motion.div>
    </div>
  );
};

export default SkillPage;
