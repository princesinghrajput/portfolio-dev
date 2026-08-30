"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronDown,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Building2,
  ChevronsUpDown,
} from "lucide-react";

interface Achievement {
  text: string;
  highlights: string[];
}

interface RoleItem {
  id: string;
  title: string;
  period: string;
  duration: string;
  type: "full-time" | "internship";
  isPromotion?: boolean;
  achievements: Achievement[];
  skills: string[];
}

interface CompanyExperience {
  id: number;
  company: string;
  companyUrl?: string;
  logo: string;
  fallbackIconBg: string;
  location: string;
  totalDuration: string;
  period: string;
  isCurrent?: boolean;
  roles: RoleItem[];
}

const companiesData: CompanyExperience[] = [
  {
    id: 1,
    company: "Pixory",
    companyUrl: "https://pixoryofficial.com",
    logo: "/assests/companies/pixory.png",
    fallbackIconBg: "from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/30",
    location: "Remote · Wyoming, USA",
    totalDuration: "",
    period: "May 2026 – Present",
    isCurrent: true,
    roles: [
      {
        id: "pixory-sse",
        title: "Senior Software Engineer",
        period: "May 2026 – Present",
        duration: "",
        type: "full-time",
        achievements: [
          {
            text: "Set up and deployed a self-hosted Sentry instance on AWS EC2, improving visibility into production issues and giving the team more flexibility over error monitoring.",
            highlights: ["self-hosted Sentry", "AWS EC2", "visibility into production issues"],
          },
          {
            text: "Investigated production issues across the application, looking beyond individual errors to identify recurring patterns, affected users, and areas that needed attention. Some issue clusters affected 100+ users.",
            highlights: ["recurring patterns", "100+ users", "production issues"],
          },
          {
            text: "Worked on connecting Sentry with ClickUp to make issue discovery and follow-up more structured, reducing the manual work involved in turning production errors into actionable engineering tasks.",
            highlights: ["Sentry with ClickUp", "issue discovery", "actionable engineering tasks"],
          },
          {
            text: "Contributed to ongoing development and problem-solving across the codebase, working with React, Next.js, TypeScript, Node.js, and AWS.",
            highlights: ["React", "Next.js", "TypeScript", "Node.js", "AWS"],
          },
          {
            text: "Worked through complex issues that required understanding how different parts of the application interacted, rather than treating errors as isolated problems.",
            highlights: ["complex issues", "understanding how different parts of the application interacted"],
          },
        ],
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "AWS EC2",
          "Self-hosted Sentry",
          "ClickUp",
          "Production Debugging",
          "Automation",
        ],
      },
    ],
  },
  {
    id: 2,
    company: "Sensation Software Solutions",
    companyUrl: "https://sensationsolutions.com",
    logo: "/assests/companies/sensation.png",
    fallbackIconBg: "from-primary/20 to-teal-500/10 text-primary border-primary/30",
    location: "Mohali, Punjab, India",
    totalDuration: "3 yrs 4 mos",
    period: "Jan 2023 – Apr 2026",
    roles: [
      {
        id: "sss-team-lead",
        title: "Team Lead",
        period: "Aug 2025 – Apr 2026",
        duration: "9 mos",
        type: "full-time",
        isPromotion: true,
        achievements: [
          {
            text: "Led development of TraceVenue B2B2C platform with live booking sync, multi-tenant isolation, and automated proposal workflows using Socket.IO for real-time updates, scaling to handle 10,000+ venue bookings.",
            highlights: ["TraceVenue", "Socket.IO", "10,000+ venue bookings"],
          },
          {
            text: "Architected scalable College ERP frontend platform (CERP) using React 19 and TypeScript, supporting 17+ academic, HR, and Fee modules with payment gateway integration across 1,300+ component files; leading team of 4–6 developers.",
            highlights: ["CERP", "React 19", "17+", "1,300+ component", "4–6 developers"],
          },
          {
            text: "Designed TailUX, a custom design system on TailwindCSS 4, reducing UI development time by 40%; built intelligent Exam Seating Planner with visual grid allocation, drag-and-drop assignment, and PDF/Excel exports.",
            highlights: ["TailUX", "TailwindCSS 4", "40%", "Exam Seating Planner"],
          },
          {
            text: "Architected hierarchical Buildings & Rooms system (Campus → Building → Floor → Room) with visual configuration, capacity mapping, and SignalR-based real-time synchronization.",
            highlights: ["Buildings & Rooms", "SignalR", "real-time synchronization"],
          },
          {
            text: "Engineered SensationCRM (LeadNest) platform with lead pipeline management, drag-and-drop form builders, and TanStack Table handling 10,000+ records with fuzzy search, Excel/PDF export, and RBAC.",
            highlights: ["SensationCRM", "LeadNest", "10,000+ records", "RBAC"],
          },
          {
            text: "Integrated real-time communication features: Twilio Voice SDK for calls, WhatsApp messaging API, Firebase notifications, SignalR live updates, and ApexCharts dashboards achieving 99.9% uptime with Sentry monitoring.",
            highlights: ["Twilio Voice SDK", "WhatsApp", "SignalR", "ApexCharts", "99.9% uptime"],
          },
        ],
        skills: [
          "React 19",
          "TypeScript",
          "TailwindCSS 4",
          "TanStack Table",
          "SignalR",
          "Twilio",
          "Socket.IO",
          "ApexCharts",
          "Firebase",
          "Sentry",
        ],
      },
      {
        id: "sss-se",
        title: "Software Engineer",
        period: "Jun 2023 – Aug 2025",
        duration: "2 yrs 3 mos",
        type: "full-time",
        isPromotion: true,
        achievements: [
          {
            text: "Architected full-stack POS and order management system (Dullet) using MERN stack with React 19, featuring real-time order tracking, inventory management, and settlement workflows serving 500+ daily transactions with atomic order number generation preventing race conditions.",
            highlights: ["Dullet", "MERN stack", "React 19", "500+ daily transactions"],
          },
          {
            text: "Implemented role-based access control (RBAC) with granular module.action permission matrix, JWT authentication, and secure API endpoints handling 50,000+ API requests daily with optimized database indexing and Redis caching strategies.",
            highlights: ["RBAC", "JWT", "50,000+ API requests", "Redis"],
          },
          {
            text: "Engineered AppyPay merchant dashboard using React, Next.js, and Redux with multi-step onboarding flow handling payment integrations, bank validation, and KYC workflows; reduced frontend code duplication by 40%.",
            highlights: ["AppyPay", "Next.js", "Redux", "40%"],
          },
          {
            text: "Built enterprise internal systems (GSSC) for Accommodation Management, Vehicle Management with real-time booking calendars, and Complaint Management with priority-based escalation; developed cross-platform React Native mobile app with offline-first architecture.",
            highlights: ["GSSC", "React Native", "offline-first"],
          },
          {
            text: "Built VitalWatch AI-powered exercise correction platform using TensorFlow.js with real-time pose estimation and skeletal tracking, achieving <100ms inference latency for instant form feedback.",
            highlights: ["VitalWatch", "TensorFlow.js", "pose estimation", "<100ms"],
          },
          {
            text: "Built dynamic product analytics dashboard for Supra.tools using Next.js processing complex feature matrices with Chart.js visualizations, reducing stakeholder analysis time by 40%.",
            highlights: ["Supra.tools", "Next.js", "Chart.js", "40%"],
          },
          {
            text: "Optimized DentalMarketing.com using Next.js SSR/SSG with server-side rendering and static generation, improving Core Web Vitals scores and organic search visibility.",
            highlights: ["DentalMarketing.com", "SSR/SSG", "Core Web Vitals"],
          },
        ],
        skills: [
          "React 19",
          "React Native",
          "TypeScript",
          "Next.js",
          "Node.js",
          "Express",
          "MongoDB",
          "PostgreSQL",
          "Socket.IO",
          "AWS S3",
          "TensorFlow.js",
          "Redis",
        ],
      },
      {
        id: "sss-intern",
        title: "Software Engineer Intern",
        period: "Jan 2023 – Jun 2023",
        duration: "6 mos",
        type: "internship",
        achievements: [
          {
            text: "Built RESTful APIs and React components for TraceMenu QR-based restaurant management system, automating order processing and improving operational efficiency by 30% with real-time kitchen display integration deployed to 50+ restaurants.",
            highlights: ["TraceMenu", "QR-based", "30%", "50+ restaurants"],
          },
          {
            text: "Implemented Redux store for cart management with intelligent item aggregation—automatically incremented quantity for duplicate items and maintained cart persistence across page refreshes.",
            highlights: ["Redux", "cart management"],
          },
          {
            text: "Utilized MongoDB transactions to ensure data consistency across orders, payments, and inventory updates with automatic rollback mechanism on payment failures.",
            highlights: ["MongoDB transactions"],
          },
          {
            text: "Optimized search functionality with debouncing techniques reducing API calls by 60%; implemented real-time updates via Socket.IO, pagination, and email notifications using Nodemailer.",
            highlights: ["60%", "Socket.IO", "Nodemailer"],
          },
          {
            text: "Integrated Cloudinary for image optimization and CDN delivery achieving 25% reduction in system response time and improved page load performance.",
            highlights: ["Cloudinary", "25%"],
          },
        ],
        skills: ["Node.js", "Express", "React", "Redux", "Socket.IO", "MongoDB", "Cloudinary", "REST APIs", "Git"],
      },
    ],
  },
  {
    id: 3,
    company: "Oceana Tech",
    logo: "/assests/companies/oceana.svg",
    fallbackIconBg: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
    location: "Mohali, Punjab (Remote)",
    totalDuration: "3 mos",
    period: "Jan 2022 – Mar 2022",
    roles: [
      {
        id: "oceana-intern",
        title: "Web Development Intern",
        period: "Jan 2022 – Mar 2022",
        duration: "3 mos",
        type: "internship",
        achievements: [
          {
            text: "Developed responsive landing pages and UI components using HTML, CSS, and JavaScript, ensuring cross-browser compatibility and mobile-first design.",
            highlights: ["HTML", "CSS", "JavaScript", "mobile-first"],
          },
          {
            text: "Collaborated with senior developers to implement frontend features and fix UI bugs, improving user engagement by 15%.",
            highlights: ["15%"],
          },
        ],
        skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"],
      },
    ],
  },
];

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

// Modern Company Logo Component with smart fallback
const CompanyLogo = ({
  company,
  logoUrl,
  fallbackBg,
}: {
  company: string;
  logoUrl: string;
  fallbackBg: string;
}) => {
  const [imgError, setImgError] = useState(false);

  if (logoUrl && !imgError) {
    return (
      <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-card border border-border/80 shadow-sm flex items-center justify-center flex-shrink-0 overflow-hidden p-1.5 group-hover:scale-105 transition-transform">
        <Image
          src={logoUrl}
          alt={`${company} Logo`}
          fill
          className="object-contain p-1"
          onError={() => setImgError(true)}
          sizes="(max-width: 640px) 44px, 52px"
        />
      </div>
    );
  }

  // Fallback monogram
  return (
    <div
      className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br border flex items-center justify-center flex-shrink-0 text-lg font-bold tracking-tight shadow-inner group-hover:scale-105 transition-transform ${fallbackBg}`}
    >
      {company.charAt(0)}
    </div>
  );
};

const CompanyCard = ({
  companyExp,
  index,
  isExpanded,
  onToggle,
}: {
  companyExp: CompanyExperience;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const isMultiRole = companyExp.roles.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`card-premium overflow-hidden transition-all duration-300 ${
        isExpanded ? "border-primary/40 shadow-lg shadow-primary/5" : ""
      }`}
    >
      {/* Top Accent for Current Role */}
      {companyExp.isCurrent && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-emerald-400 to-accent" />
      )}

      {/* Header Row (Clickable) */}
      <div
        onClick={onToggle}
        className="p-4 sm:p-5 cursor-pointer select-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          {/* Company Identity */}
          <div className="flex items-start sm:items-center gap-3.5">
            <CompanyLogo
              company={companyExp.company}
              logoUrl={companyExp.logo}
              fallbackBg={companyExp.fallbackIconBg}
            />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {companyExp.company}
                </h3>
                {companyExp.companyUrl && (
                  <a
                    href={companyExp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
                    title={`Visit ${companyExp.company}`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {companyExp.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Present
                  </span>
                )}
              </div>

              {/* Company metadata */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground mt-1">
                <span className="font-semibold text-foreground/90">
                  {companyExp.period}
                </span>
                {companyExp.totalDuration && (
                  <>
                    <span>•</span>
                    <span>{companyExp.totalDuration}</span>
                  </>
                )}
                {isMultiRole && (
                  <>
                    <span>•</span>
                    <span className="text-primary font-medium">
                      {companyExp.roles.length} roles progression
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px] sm:text-xs text-muted-foreground/70 mt-1">
                <MapPin className="w-3 h-3" />
                <span>{companyExp.location}</span>
              </div>
            </div>
          </div>

          {/* Right Action: Expand/Collapse indicator */}
          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/30">
            <span className="text-xs text-muted-foreground sm:hidden">
              {isExpanded ? "Hide details" : "View roles"}
            </span>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isExpanded
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span>{isExpanded ? "Collapse" : "Expand"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Roles Timeline Tree (LinkedIn style) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden border-t border-border/40"
          >
            <div className="p-4 sm:p-5 bg-card/40 space-y-6 sm:space-y-7">
              {companyExp.roles.map((role, rIndex) => {
                const isLast = rIndex === companyExp.roles.length - 1;

                return (
                  <div key={role.id} className="relative flex gap-3.5 sm:gap-5">
                    {/* LinkedIn timeline track (only if multiple roles) */}
                    {isMultiRole && (
                      <div className="flex flex-col items-center">
                        {/* Dot node with glow indicator */}
                        <div
                          className={`w-3.5 h-3.5 rounded-full border-2 z-10 bg-card flex items-center justify-center ${
                            rIndex === 0
                              ? "border-primary bg-primary/20 shadow-sm shadow-primary/30"
                              : "border-muted-foreground/50 bg-muted"
                          }`}
                        >
                          <div
                            className={`w-1 h-1 rounded-full ${
                              rIndex === 0 ? "bg-primary" : "bg-muted-foreground/60"
                            }`}
                          />
                        </div>
                        {/* Connecting track line */}
                        {!isLast && (
                          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary/40 via-border to-border/30 mt-1" />
                        )}
                      </div>
                    )}

                    {/* Role Content */}
                    <div className="flex-1 pb-1">
                      {/* Role Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-foreground">
                              {role.title}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                role.type === "full-time"
                                  ? "bg-primary/10 text-primary border border-primary/20"
                                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              }`}
                            >
                              {role.type === "full-time" ? "Full-time" : "Internship"}
                            </span>
                            {role.isPromotion && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <TrendingUp className="w-3 h-3 text-emerald-400" />
                                Promoted
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-muted-foreground/60" />
                              {role.period}
                            </span>
                            {role.duration && (
                              <>
                                <span>•</span>
                                <span className="font-medium text-foreground/80">
                                  {role.duration}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Achievements / Systems Built */}
                      <div className="mt-2.5">
                        <ul className="space-y-2">
                          {role.achievements.map((item, aIndex) => (
                            <li
                              key={aIndex}
                              className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: highlightText(item.text, item.highlights),
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack Chips (matching ProjectCard style) */}
                      {role.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {role.skills.map((skill, sIndex) => (
                            <span
                              key={sIndex}
                              className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium rounded-md border transition-colors bg-primary/5 border-primary/20 text-foreground/80 hover:bg-primary/10 hover:border-primary/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ExperienceSection = () => {
  // Manage expanded state for all companies
  const [expandedMap, setExpandedMap] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
  });

  const toggleCompany = (id: number) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const areAllExpanded = Object.values(expandedMap).every(Boolean);

  const toggleAll = () => {
    const nextState = !areAllExpanded;
    const newMap: Record<number, boolean> = {};
    companiesData.forEach((c) => {
      newMap[c.id] = nextState;
    });
    setExpandedMap(newMap);
  };

  return (
    <section className="py-4 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
              <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Experience
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Where I&apos;ve <span className="gradient-text inline-block">Worked</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
            3+ years of building production software, from developing complex products to improving the systems and workflows behind them.
          </p>
        </div>

        {/* Expand / Collapse All Toggle */}
        <button
          onClick={toggleAll}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground border border-border transition-colors"
        >
          <ChevronsUpDown className="w-3.5 h-3.5 text-primary" />
          <span>{areAllExpanded ? "Collapse All" : "Expand All"}</span>
        </button>
      </div>

      {/* Grouped Company Experience List */}
      <div className="space-y-4">
        {companiesData.map((companyExp, index) => (
          <CompanyCard
            key={companyExp.id}
            companyExp={companyExp}
            index={index}
            isExpanded={!!expandedMap[companyExp.id]}
            onToggle={() => toggleCompany(companyExp.id)}
          />
        ))}
      </div>

      {/* Career progression note */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-muted-foreground/70 italic">
          From intern to team lead and senior engineer, architecting high-scale enterprise systems 🚀
        </p>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;