"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Coffee, MapPin, Zap, Heart, ExternalLink, Moon, Sun, CloudSun, Sunset, MoonStar } from "lucide-react";
import MyProjects from "@/components/projects";
import CopyCmd from "@/components/copycmd";
import { DockDemo } from "@/components/dock";
import HoverImageComponent from "@/components/skills";
import ContactMe from "@/components/contact";
import ResumeSection from "@/components/ResumeSection";
import ExperienceSection from "@/components/ExperienceSection";
import AchievementsSection from "@/components/AchievementsSection";
import InteractiveCodeCard from "@/components/InteractiveCodeCard";

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

// Clean time-based greeting with premium Lucide icons
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 6) return { text: "Burning the midnight oil", icon: Moon };
  if (hour < 12) return { text: "Good morning", icon: Sun };
  if (hour < 17) return { text: "Good afternoon", icon: CloudSun };
  if (hour < 21) return { text: "Good evening", icon: Sunset };
  return { text: "Night owl mode", icon: MoonStar };
};

const Page = () => {
  const [greeting, setGreeting] = useState<{ text: string; icon: React.ComponentType<{ className?: string }> | null }>({
    text: "",
    icon: null,
  });
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
                {mounted && greeting.icon && (
                  <motion.div variants={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <greeting.icon className="w-4 h-4 text-primary" />
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

                {/* Name */}
                <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
                  <span className="inline-block">Hey, I&apos;m&nbsp;</span>
                  <span className="gradient-text">Prince</span>
                </motion.h1>

                {/* Role & Company */}
                <motion.div variants={item} className="space-y-2">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-foreground leading-snug">
                    Senior Software Engineer at{" "}
                    <a
                      href="https://pixoryofficial.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-baseline gap-1 text-primary hover:text-primary/80 font-bold transition-colors underline decoration-primary/40 underline-offset-4 hover:decoration-primary group whitespace-nowrap"
                    >
                      <span>Pixory</span>
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline self-center opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Building scalable, resilient, and production-grade systems
                  </p>
                </motion.div>

                {/* Bio */}
                <motion.p variants={item} className="text-base sm:text-lg text-muted-foreground max-w-lg leading-relaxed">
                  With 3+ years of experience building production web applications, I&apos;m a Senior Software Engineer focused on full-stack development with the MERN stack, Next.js, and AWS. I build scalable systems and solve complex engineering problems, from multi-tenant platforms to real-time WebRTC applications.
                </motion.p>

                {/* Location + Status */}
                <motion.div variants={item} className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    India
                  </span>
                  <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    Building systems
                  </span>
                </motion.div>

                {/* CTAs */}
                <motion.div variants={item} className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <CopyCmd />
                  <DockDemo />
                </motion.div>
              </div>

              {/* Right Column - Interactive Card (Responsive on all screen sizes) */}
              <motion.div
                variants={item}
                className="flex items-center justify-center w-full mt-6 lg:mt-0"
              >
                <InteractiveCodeCard />
              </motion.div>
            </div>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6 sm:space-y-16 lg:space-y-20 mt-6 sm:mt-16 lg:mt-20">
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

export default Page;

