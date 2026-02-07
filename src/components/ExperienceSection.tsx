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
    period: "January 2023 – Present",
    duration: "2+ years",
    title: "Software Engineer → Team Lead",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "full-time",
    achievements: [
      {
        text: "Led cross-functional teams of 4–7 engineers across 8+ projects, improving delivery predictability by 35% through structured sprint planning and async workflows",
        highlights: ["4–7 engineers", "8+ projects", "35%"],
      },
      {
        text: "Architected Dullet POS from ground up: 14 REST API modules, RBAC with granular permissions, atomic order generation eliminating race conditions under 500+ daily transactions",
        highlights: ["Dullet POS", "14 REST API", "RBAC", "500+ daily"],
      },
      {
        text: "Engineered a 50+ page React 19 + TypeScript SPA with service-oriented architecture, enabling independent module scaling and 30% faster feature delivery",
        highlights: ["50+ page", "React 19", "TypeScript", "30%"],
      },
      {
        text: "Spearheaded TraceVenue B2B2C platform development: real-time Socket.IO bookings, multi-tenant isolation, scaled to handle 10,000+ venue bookings",
        highlights: ["TraceVenue", "Socket.IO", "10,000+"],
      },
      {
        text: "Reduced frontend code duplication by 40% on AppyPay through reusable component architecture and centralized Redux state management",
        highlights: ["40%", "AppyPay", "Redux"],
      },
      {
        text: "Built AI exercise correction platform with TensorFlow.js: real-time pose estimation achieving <100ms inference latency for form feedback",
        highlights: ["TensorFlow.js", "<100ms", "pose estimation"],
      },
      {
        text: "Shipped 3 enterprise GSSC systems (Accommodation, Vehicle, Complaint Management), reducing manual effort by 50% and scheduling conflicts by 40%",
        highlights: ["GSSC", "50%", "40%"],
      },
      {
        text: "Optimized DentalMarketing.com with Next.js SSR/SSG, improving Core Web Vitals and organic search visibility",
        highlights: ["DentalMarketing.com", "SSR/SSG", "Core Web Vitals"],
      },
      {
        text: "Built Supra.tools analytics dashboards with Chart.js, reducing stakeholder analysis time by 40% through interactive data visualization",
        highlights: ["Supra.tools", "Chart.js", "40%"],
      },
    ],
    skills: ["React 19", "TypeScript", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Socket.IO", "AWS S3", "TensorFlow.js", "Redis", "Docker"],
  },
  {
    id: 2,
    period: "July 2022 – December 2022",
    duration: "6 months",
    title: "Software Developer Intern",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "internship",
    achievements: [
      {
        text: "Developed RESTful APIs and React components for TraceVenue's QR-based restaurant ordering—first production codebase deployed to 50+ restaurants",
        highlights: ["RESTful APIs", "QR-based", "50+ restaurants"],
      },
      {
        text: "Automated order processing workflows, improving operational efficiency by 30% and eliminating manual data entry errors",
        highlights: ["30%", "Automated"],
      },
      {
        text: "Implemented debounced search reducing API calls by 60%, improving server response times and UX",
        highlights: ["60%", "debounced search"],
      },
      {
        text: "Built real-time order tracking with Socket.IO, enabling instant kitchen-to-customer status updates",
        highlights: ["Socket.IO", "real-time"],
      },
      {
        text: "Optimized image delivery via Cloudinary CDN, reducing response times by 25%",
        highlights: ["Cloudinary", "25%"],
      },
    ],
    skills: ["Node.js", "Express", "React", "Socket.IO", "MongoDB", "Cloudinary", "REST APIs", "Git"],
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
          2+ years of shipping production systems, leading teams of 4–7 engineers, and owning end-to-end delivery. Clean code, system design, and remote-first collaboration.
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
        From intern to team lead, architecting enterprise systems and mentoring engineers. The journey continues 🚀
      </motion.p>
    </section>
  );
};

export default ExperienceSection;