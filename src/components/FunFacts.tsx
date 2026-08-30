"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Compass,
  BookOpen,
  Coffee,
  Gamepad2,
  Bot,
  Terminal,
} from "lucide-react";

const personalCards = [
  {
    icon: Coffee,
    title: "Problem Solver",
    description: "I probably think about a bug longer than I should.",
    tag: "☕ Caffeine & Code",
  },
  {
    icon: Bot,
    title: "Practical AI",
    description: "Exploring how agents can genuinely improve engineering workflows.",
    tag: "🤖 Agents & LLMs",
  },
  {
    icon: Gamepad2,
    title: "Gamer",
    description: "Give me a good open-world game and I'll disappear for a while.",
    tag: "🎮 Open Worlds",
  },
  {
    icon: Terminal,
    title: "Builder",
    description: "I like turning ideas and annoying problems into tools that work.",
    tag: "💻 Side Projects",
  },
];

const interests = [
  "System Architecture",
  "Real-Time Systems",
  "AI & AI Agents",
  "Observability & Debugging",
  "Complex Systems",
  "Developer Tools",
];

const exploring = [
  {
    title: "AI Agents & Tooling",
    desc: "Practical agentic workflows that reduce engineering friction.",
  },
  {
    title: "Scalable System Design",
    desc: "Architecting services that remain maintainable as teams grow.",
  },
  {
    title: "Production Observability",
    desc: "Automating issue triage and understanding live telemetry.",
  },
];

const FunFacts: React.FC = () => {
  return (
    <section className="py-4 sm:py-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Heart className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Beyond the Code
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          More Than <span className="gradient-text inline-block">Code</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
          Outside of work, I&apos;m usually exploring new technology, diving into how systems work, or spending time on things that help me think differently.
        </p>
      </div>

      {/* 4 Minimal Personality Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {personalCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="card-premium p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-muted/80 text-foreground">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {card.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Two Column Clean Bento: Interests & Exploring */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="card-premium p-4 sm:p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Interests</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {interests.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-muted/60 text-muted-foreground border border-border/50"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Currently Exploring */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="card-premium p-4 sm:p-5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Currently Exploring</h3>
            </div>
            <div className="space-y-2">
              {exploring.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-semibold text-foreground mr-1.5">
                      {item.title}:
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FunFacts;
