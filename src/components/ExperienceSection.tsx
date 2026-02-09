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
    period: "August 2024 – Present",
    duration: "7 months",
    title: "Team Lead",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "full-time",
    achievements: [
      {
        text: "Led development of TraceVenue B2B2C platform with live booking sync, multi-tenant isolation, and automated proposal workflows using Socket.IO for real-time updates, scaling to handle 10,000+ venue bookings",
        highlights: ["TraceVenue", "Socket.IO", "10,000+ venue bookings"],
      },
      {
        text: "Architected scalable College ERP frontend platform (CERP) using React 19 and TypeScript, supporting 17+ academic, HR, and Fee modules with payment gateway integration across 1,300+ component files; leading team of 4–6 developers",
        highlights: ["CERP", "React 19", "17+", "HR", "Fee modules", "payment gateway", "1,300+ component", "4–6 developers"],
      },
      {
        text: "Designed TailUX, a custom design system on TailwindCSS 4, reducing UI development time by 40%; built intelligent Exam Seating Planner with visual grid allocation, drag-and-drop assignment, and PDF/Excel exports",
        highlights: ["TailUX", "TailwindCSS 4", "40%", "Exam Seating Planner"],
      },
      {
        text: "Architected hierarchical Buildings & Rooms system (Campus → Building → Floor → Room) with visual configuration, capacity mapping, and SignalR-based real-time synchronization for multi-user collaboration",
        highlights: ["Buildings & Rooms", "SignalR", "real-time synchronization"],
      },
      {
        text: "Engineered SensationCRM (LeadNest) platform with lead pipeline management, drag-and-drop form builders, and TanStack Table handling 10,000+ records with fuzzy search, Excel/PDF export, and role-based access control",
        highlights: ["SensationCRM", "LeadNest", "10,000+ records", "drag-and-drop"],
      },
      {
        text: "Integrated real-time communication features: Twilio Voice SDK for calls, WhatsApp messaging API, Firebase notifications, SignalR live updates, and ApexCharts dashboards achieving 99.9% uptime with Sentry monitoring",
        highlights: ["Twilio Voice SDK", "WhatsApp", "SignalR", "ApexCharts", "99.9% uptime"],
      },
    ],
    skills: ["React 19", "TypeScript", "TailwindCSS 4", "TanStack Table", "SignalR", "Twilio", "Socket.IO", "ApexCharts", "Firebase", "Sentry"],
  },
  {
    id: 2,
    period: "June 2023 – August 2024",
    duration: "1 year 2 months",
    title: "Software Engineer",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "full-time",
    achievements: [
      {
        text: "Architected full-stack POS and order management system (Dullet) using MERN stack with React 19, featuring real-time order tracking, inventory management, and settlement workflows serving 500+ daily transactions with atomic order number generation preventing race conditions",
        highlights: ["Dullet", "MERN stack", "React 19", "500+ daily transactions"],
      },
      {
        text: "Implemented role-based access control (RBAC) with granular module.action permission matrix, JWT authentication, and secure API endpoints handling 50,000+ API requests daily with optimized database indexing and Redis caching strategies",
        highlights: ["RBAC", "JWT", "50,000+ API requests", "Redis"],
      },
      {
        text: "Engineered AppyPay merchant dashboard using React, Next.js, and Redux with multi-step onboarding flow handling payment integrations, bank validation, and KYC workflows; reduced frontend code duplication by 40% through reusable component architecture",
        highlights: ["AppyPay", "Next.js", "Redux", "40%"],
      },
      {
        text: "Built enterprise internal systems (GSSC) for Accommodation Management, Vehicle Management with real-time booking calendars, and Complaint Management with priority-based escalation; developed cross-platform React Native mobile app with offline-first architecture",
        highlights: ["GSSC", "React Native", "offline-first"],
      },
      {
        text: "Built VitalWatch AI-powered exercise correction platform using TensorFlow.js with real-time pose estimation and skeletal tracking, achieving <100ms inference latency for instant form feedback with admin interface for exercise configuration",
        highlights: ["VitalWatch", "TensorFlow.js", "pose estimation", "<100ms"],
      },
      {
        text: "Built dynamic product analytics dashboard for Supra.tools using Next.js processing complex feature matrices with Chart.js visualizations and interactive data exploration, reducing stakeholder analysis time by 40%",
        highlights: ["Supra.tools", "Next.js", "Chart.js", "40%"],
      },
      {
        text: "Optimized DentalMarketing.com using Next.js SSR/SSG with server-side rendering and static generation, improving Core Web Vitals scores and organic search visibility through rendering and performance optimizations",
        highlights: ["DentalMarketing.com", "SSR/SSG", "Core Web Vitals"],
      },
    ],
    skills: ["React 19", "React Native", "TypeScript", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Socket.IO", "AWS S3", "TensorFlow.js", "Redis", "Docker"],
  },
  {
    id: 3,
    period: "January 2023 – June 2023",
    duration: "6 months",
    title: "Software Engineer Intern",
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    location: "Mohali, Punjab",
    type: "internship",
    achievements: [
      {
        text: "Built RESTful APIs and React components for TraceMenu QR-based restaurant management system, automating order processing and improving operational efficiency by 30% with real-time kitchen display integration deployed to 50+ restaurants",
        highlights: ["TraceMenu", "QR-based", "30%", "50+ restaurants"],
      },
      {
        text: "Implemented Redux store for cart management with intelligent item aggregation—automatically incremented quantity for duplicate items and maintained cart persistence across page refreshes, reducing redundant API calls",
        highlights: ["Redux", "cart management"],
      },
      {
        text: "Utilized MongoDB transactions to ensure data consistency across orders, payments, and inventory updates; implemented automatic rollback mechanism on payment failures to maintain database integrity",
        highlights: ["MongoDB transactions", "database integrity"],
      },
      {
        text: "Optimized search functionality with debouncing techniques reducing API calls by 60%; implemented real-time updates via Socket.IO, pagination, and email notifications using Nodemailer",
        highlights: ["60%", "Socket.IO", "Nodemailer"],
      },
      {
        text: "Integrated Cloudinary for image optimization and CDN delivery achieving 25% reduction in system response time and improved page load performance",
        highlights: ["Cloudinary", "25%"],
      },
    ],
    skills: ["Node.js", "Express", "React", "Redux", "Socket.IO", "MongoDB", "Cloudinary", "REST APIs", "Git"],
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
            className="w-full p-3 sm:p-4 text-left"
          >
            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
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
            <p className="mt-1 text-xs text-muted-foreground/70">{exp.period}</p>

            {/* Expand indicator */}
            <motion.div
              className="flex items-center justify-center mt-2 text-muted-foreground"
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
                <div className="p-3 sm:p-4 space-y-3">
                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-primary" />
                      What I did
                    </h4>
                    <ul className="space-y-2">
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