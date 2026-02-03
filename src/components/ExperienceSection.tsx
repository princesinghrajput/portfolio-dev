"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronDown, ExternalLink, Sparkles } from "lucide-react";

interface Achievement {
  text: string;
  highlights: string[];
}

interface ExperienceItem {
  id: number;
  period: string;
  duration: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: "full-time" | "internship";
  achievements: Achievement[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    period: "July 2024 - Present",
    duration: "8+ months",
    title: "Full Stack Developer",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "full-time",
    achievements: [
      {
        text: "Built AppyPay's merchant dashboard from scratch — a responsive, themeable interface that cut code redundancy by 40%",
        highlights: ["AppyPay", "40%"],
      },
      {
        text: "Designed a merchant onboarding flow handling payment integrations, bank validation, and KYC — the kind of complex logic that keeps you up at night (in a good way)",
        highlights: ["KYC", "payment integrations"],
      },
      {
        text: "Created an AI-powered exercise correction platform using TensorFlow.js — it watches you do squats and tells you when your form is off 🏋️",
        highlights: ["TensorFlow.js", "AI-powered"],
      },
      {
        text: "Shipped features for Supra.tools analytics dashboard — turning boring data into pretty charts people actually understand",
        highlights: ["Supra.tools", "analytics"],
      },
    ],
    skills: ["React", "Next.js", "Redux", "TensorFlow.js", "Material-UI"],
  },
  {
    id: 2,
    period: "Jan 2024 - June 2024",
    duration: "6 months",
    title: "Software Developer Intern",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "internship",
    achievements: [
      {
        text: "Automated order processing that improved efficiency by 30% — finally, less manual work and more coffee breaks",
        highlights: ["30%", "automated"],
      },
      {
        text: "Added debouncing to search that reduced API calls by 60% — servers were grateful, users didn't notice (that's the point!)",
        highlights: ["60%", "debouncing"],
      },
      {
        text: "Built real-time updates with Socket.IO — because users love seeing things happen instantly, and so do I",
        highlights: ["Socket.IO", "real-time"],
      },
    ],
    skills: ["Node.js", "Express", "Socket.IO", "MongoDB", "Cloudinary"],
  },
];

const ExperienceCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const highlightText = (text: string, highlights: string[]) => {
    let result = text;
    highlights.forEach((highlight) => {
      result = result.replace(
        new RegExp(`(${highlight})`, "gi"),
        '<span class="text-primary font-semibold">$1</span>'
      );
    });
    return result;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline connector */}
      {index < experiences.length - 1 && (
        <div className="absolute left-[19px] top-14 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-border hidden sm:block" />
      )}

      <div className="flex gap-4 sm:gap-6">
        {/* Timeline dot */}
        <div className="hidden sm:flex flex-col items-center">
          <motion.div
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${exp.type === "full-time"
              ? "border-primary bg-primary/10"
              : "border-accent bg-accent/10"
              }`}
            whileHover={{ scale: 1.1 }}
          >
            <Briefcase className={`w-4 h-4 ${exp.type === "full-time" ? "text-primary" : "text-accent"}`} />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          className={`flex-1 rounded-2xl border overflow-hidden transition-all duration-300 ${isExpanded
            ? "bg-card border-primary/30 shadow-lg shadow-primary/5"
            : "bg-card/50 border-border hover:border-primary/20"
            }`}
          whileHover={{ y: -2 }}
        >
          {/* Header */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-4 sm:p-5 text-left"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              {/* Type badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider ${exp.type === "full-time"
                  ? "bg-primary/10 text-primary"
                  : "bg-accent/10 text-accent"
                  }`}
              >
                {exp.type === "full-time" ? "Full-time" : "Internship"}
              </span>

              {/* Duration */}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {exp.duration}
              </span>
            </div>

            {/* Title & Company */}
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{exp.title}</h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <a
                href={exp.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {exp.company}
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {exp.location}
              </span>
            </div>

            {/* Period */}
            <p className="mt-2 text-xs text-muted-foreground/70">{exp.period}</p>

            {/* Expand indicator */}
            <motion.div
              className="flex items-center justify-center mt-3 text-muted-foreground"
              animate={{ rotate: isExpanded ? 180 : 0 }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </button>

          {/* Expandable Content */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border"
              >
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      What I did
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-2.5"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0" />
                          <p
                            className="text-sm text-muted-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: highlightText(achievement.text, achievement.highlights),
                            }}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills used */}
                  <div className="pt-2">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Tech used
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="py-4 sm:py-12">
      {/* Header */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Briefcase className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Experience
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          Where I&apos;ve <span className="gradient-text">Worked</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
          A quick peek into my professional journey — the projects, the late nights, and the &quot;aha!&quot; moments that made it worthwhile.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <ExperienceCard key={exp.id} exp={exp} index={index} />
        ))}
      </div>

      {/* Fun note */}
      <motion.p
        className="mt-8 text-center text-xs text-muted-foreground/60 italic"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Fun fact: I joined as an intern and they decided to keep me around 😄
      </motion.p>
    </section>
  );
};

export default ExperienceSection;