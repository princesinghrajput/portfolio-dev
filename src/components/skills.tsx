"use client";

import React, { useState } from "react";
import { Code2, Sparkles, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Skill {
  name: string;
  icon: string;
  level: "expert" | "proficient" | "learning";
  category: "frontend" | "backend" | "database" | "tools" | "languages";
  description: string;
}

// Skills with proper paths and descriptions
const skills: Skill[] = [
  { name: "React", icon: "/assests/skills/react.webp", level: "expert", category: "frontend", description: "My daily driver" },
  { name: "Next.js", icon: "/assests/skills/nextjs.webp", level: "expert", category: "frontend", description: "Full-stack magic" },
  { name: "TypeScript", icon: "/assests/skills/typescript.webp", level: "proficient", category: "languages", description: "Types save lives" },
  { name: "JavaScript", icon: "/assests/skills/js.webp", level: "expert", category: "languages", description: "Where it all began" },
  { name: "Node.js", icon: "/assests/skills/nodejs.webp", level: "proficient", category: "backend", description: "Backend backbone" },
  { name: "Tailwind", icon: "/assests/skills/tailwind.webp", level: "expert", category: "frontend", description: "CSS on steroids" },
  { name: "MongoDB", icon: "/assests/skills/mongoDB.webp", level: "proficient", category: "database", description: "Document love" },
  { name: "PostgreSQL", icon: "/assests/skills/postgre.webp", level: "proficient", category: "database", description: "Relational power" },
  { name: "Git", icon: "/assests/skills/git.webp", level: "expert", category: "tools", description: "Version control wizard" },
  { name: "Docker", icon: "/assests/skills/docker.webp", level: "learning", category: "tools", description: "Containerizing things" },
  { name: "Firebase", icon: "/assests/skills/firebase.webp", level: "proficient", category: "backend", description: "Quick MVPs" },
  { name: "Python", icon: "/assests/skills/python.webp", level: "proficient", category: "languages", description: "Scripting & ML" },
  { name: "HTML", icon: "/assests/skills/html.webp", level: "expert", category: "frontend", description: "The foundation" },
  { name: "CSS", icon: "/assests/skills/css.webp", level: "expert", category: "frontend", description: "Making things pretty" },
  { name: "GraphQL", icon: "/assests/skills/graphql.webp", level: "learning", category: "backend", description: "Querying smarter" },
  { name: "Vercel", icon: "/assests/skills/vercel.webp", level: "proficient", category: "tools", description: "Deploy in seconds" },
];

const categories = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "frontend", label: "Frontend", emoji: "🎨" },
  { id: "backend", label: "Backend", emoji: "⚙️" },
  { id: "database", label: "Database", emoji: "🗄️" },
  { id: "languages", label: "Languages", emoji: "📝" },
  { id: "tools", label: "Tools", emoji: "🔧" },
];

const levelColors = {
  expert: "from-emerald-500 to-green-500",
  proficient: "from-blue-500 to-cyan-500",
  learning: "from-amber-500 to-orange-500",
};

const levelLabels = {
  expert: "Expert",
  proficient: "Proficient",
  learning: "Learning",
};

const HoverImageComponent: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills =
    activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section className="py-4 sm:py-12">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Code2 className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Skills
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
          My <span className="gradient-text">Tech Stack</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl">
          Tools and technologies I use to bring ideas to life. <span className="hidden sm:inline">Hover</span><span className="sm:hidden">Tap</span> to see my comfort level!
        </p>
      </div>

      {/* Legend - Hidden on mobile, shown on larger screens */}
      <div className="hidden sm:flex flex-wrap items-center gap-3 mb-6 text-xs">
        <span className="text-muted-foreground">Skill level:</span>
        {Object.entries(levelLabels).map(([key, label]) => (
          <span key={key} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${levelColors[key as keyof typeof levelColors]}`} />
            <span className="text-muted-foreground">{label}</span>
          </span>
        ))}
      </div>

      {/* Category Filters */}
      <div className="mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Skills Grid - More compact on mobile with 3 columns */}
      <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3" layout>
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, delay: index * 0.03 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)}
            >
              <motion.div
                className="group relative flex flex-col items-center gap-1.5 sm:gap-3 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-default overflow-hidden"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Level indicator - always visible on mobile as colored bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r ${levelColors[skill.level]} sm:opacity-0 sm:group-hover:opacity-100 transition-opacity`}
                />

                {/* Icon - smaller on mobile */}
                <div className="relative w-8 h-8 sm:w-12 sm:h-12">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 32px, 48px"
                  />
                </div>

                {/* Name - smaller on mobile */}
                <span className="text-[10px] sm:text-sm font-medium text-foreground text-center leading-tight">{skill.name}</span>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm p-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider mb-1 bg-gradient-to-r ${levelColors[skill.level]} bg-clip-text text-transparent`}
                      >
                        {levelLabels[skill.level]}
                      </span>
                      <span className="text-xs text-muted-foreground text-center">{skill.description}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Fun note */}
      <motion.div
        className="mt-8 flex items-center justify-center gap-2 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Zap className="w-4 h-4 text-yellow-500" />
        <p className="text-xs text-muted-foreground">
          Always learning something new. Currently exploring{" "}
          <span className="text-foreground font-medium">Rust 🦀</span> and{" "}
          <span className="text-foreground font-medium">System Design</span>
        </p>
      </motion.div>
    </section>
  );
};

export default HoverImageComponent;
