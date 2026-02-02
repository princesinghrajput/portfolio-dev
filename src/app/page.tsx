"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import MyProjects from "@/components/projects";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import CopyCmd from "@/components/copycmd";
import { FlipWordsDemo } from "@/components/words";
import { DockDemo } from "@/components/dock";
import HoverImageComponent from "@/components/skills";
import ContactMe from "@/components/contact";
import ResumeSection from '@/components/ResumeSection';
import ExperienceSection from '@/components/ExperienceSection';

const projects = [
  {
    title: "Cards against Humanity",
    description: "A game built with React.",
    icon: <FaReact className="text-[hsl(173,80%,45%)]" />,
  },
  {
    title: "MagicDocs OpenSource",
    description: "A Next.js documentation project",
    icon: <FaDatabase className="text-[hsl(12,76%,61%)]" />,
  },
  {
    title: "MagicDocs OpenSource",
    description: "A backend project using Next.js.",
    icon: <FaNodeJs className="text-emerald-500" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Page = () => {
  return (
    <section className="relative min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-16">

        {/* Hero */}
        <motion.div
          className="flex flex-col gap-5 min-h-[50vh] sm:min-h-[55vh] justify-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border text-xs sm:text-sm">
              <Terminal size={12} className="text-primary" />
              <span className="text-muted-foreground">Hello, I'm</span>
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1 variants={item} className="heading-xl">
            Prince<span className="text-primary">.</span>
          </motion.h1>

          {/* Role */}
          <motion.div variants={item}>
            <FlipWordsDemo />
          </motion.div>

          {/* Bio */}
          <motion.p variants={item} className="body-lg max-w-md">
            Software Engineer at{" "}
            <a
              href="https://sensationsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block text-foreground font-medium link-grow"
            >
              Sensation Software Solutions
            </a>
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 mt-2">
            <CopyCmd />
            <DockDemo />
          </motion.div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <HoverImageComponent />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ResumeSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ExperienceSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <MyProjects projects={projects} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ContactMe />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Page;
