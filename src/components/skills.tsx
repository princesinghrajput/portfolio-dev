"use client"
import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Server, Cloud, Wrench } from 'lucide-react';

interface Skill {
  src: string;
  alt: string;
  tooltip: string;
  category: 'frontend' | 'backend' | 'cloud' | 'tools';
}

const skills: Skill[] = [
  { src: '/assests/skills/react.webp', alt: 'React', tooltip: 'React', category: 'frontend' },
  { src: '/assests/skills/nextjs.webp', alt: 'Next.js', tooltip: 'Next.js', category: 'frontend' },
  { src: '/assests/skills/typescript.webp', alt: 'TypeScript', tooltip: 'TypeScript', category: 'frontend' },
  { src: '/assests/skills/js.webp', alt: 'JavaScript', tooltip: 'JavaScript', category: 'frontend' },
  { src: '/assests/skills/html.webp', alt: 'HTML', tooltip: 'HTML', category: 'frontend' },
  { src: '/assests/skills/css.webp', alt: 'CSS', tooltip: 'CSS', category: 'frontend' },
  { src: '/assests/skills/tailwind.webp', alt: 'Tailwind CSS', tooltip: 'Tailwind CSS', category: 'frontend' },
  { src: '/assests/skills/sass.webp', alt: 'Sass', tooltip: 'Sass', category: 'frontend' },
  { src: '/assests/skills/vite.webp', alt: 'Vite', tooltip: 'Vite', category: 'frontend' },
  { src: '/assests/skills/nodejs.webp', alt: 'Node.js', tooltip: 'Node.js', category: 'backend' },
  { src: '/assests/skills/python.webp', alt: 'Python', tooltip: 'Python', category: 'backend' },
  { src: '/assests/skills/c++.webp', alt: 'C++', tooltip: 'C++', category: 'backend' },
  { src: '/assests/skills/graphql.webp', alt: 'GraphQL', tooltip: 'GraphQL', category: 'backend' },
  { src: '/assests/skills/mongoDB.webp', alt: 'MongoDB', tooltip: 'MongoDB', category: 'backend' },
  { src: '/assests/skills/mysql.webp', alt: 'MySQL', tooltip: 'MySQL', category: 'backend' },
  { src: '/assests/skills/postgre.webp', alt: 'PostgreSQL', tooltip: 'PostgreSQL', category: 'backend' },
  { src: '/assests/skills/firebase.webp', alt: 'Firebase', tooltip: 'Firebase', category: 'backend' },
  { src: '/assests/skills/aws.webp', alt: 'AWS', tooltip: 'AWS', category: 'cloud' },
  { src: '/assests/skills/docker.webp', alt: 'Docker', tooltip: 'Docker', category: 'cloud' },
  { src: '/assests/skills/kubernetes.webp', alt: 'Kubernetes', tooltip: 'Kubernetes', category: 'cloud' },
  { src: '/assests/skills/vercels.webp', alt: 'Vercel', tooltip: 'Vercel', category: 'cloud' },
  { src: '/assests/skills/heroku.webp', alt: 'Heroku', tooltip: 'Heroku', category: 'cloud' },
  { src: '/assests/skills/netlify.webp', alt: 'Netlify', tooltip: 'Netlify', category: 'cloud' },
  { src: '/assests/skills/git.webp', alt: 'Git', tooltip: 'Git', category: 'tools' },
  { src: '/assests/skills/github.webp', alt: 'GitHub', tooltip: 'GitHub', category: 'tools' },
  { src: '/assests/skills/githubActions.webp', alt: 'GitHub Actions', tooltip: 'GitHub Actions', category: 'tools' },
  { src: '/assests/skills/gitlab.webp', alt: 'GitLab', tooltip: 'GitLab', category: 'tools' },
  { src: '/assests/skills/figma.webp', alt: 'Figma', tooltip: 'Figma', category: 'tools' },
  { src: '/assests/skills/photoshop.webp', alt: 'Photoshop', tooltip: 'Photoshop', category: 'tools' },
  { src: '/assests/skills/replit.webp', alt: 'Replit', tooltip: 'Replit', category: 'tools' },
  { src: '/assests/skills/ubuntu.webp', alt: 'Ubuntu', tooltip: 'Ubuntu', category: 'tools' },
];

const categories = [
  { id: 'frontend', label: 'Frontend', icon: Layers },
  { id: 'backend', label: 'Backend', icon: Server },
  { id: 'cloud', label: 'Cloud', icon: Cloud },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

const HoverImageComponent: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSkills = activeCategory
    ? skills.filter(skill => skill.category === activeCategory)
    : skills;

  return (
    <TooltipProvider delayDuration={0}>
      <section className="section">
        {/* Header */}
        <div className="section-header">
          <p className="label mb-2">Tech Stack</p>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          <motion.button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${!activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            whileTap={{ scale: 0.95 }}
          >
            All
          </motion.button>
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              whileTap={{ scale: 0.95 }}
            >
              <cat.icon className="w-3 h-3" />
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <Tooltip key={skill.alt}>
                <TooltipTrigger asChild>
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, delay: index * 0.015 }}
                    onMouseEnter={() => setHoveredSkill(skill.alt)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <motion.div
                      className={`flex items-center justify-center p-2.5 rounded-lg cursor-pointer transition-all duration-150
                        ${hoveredSkill === skill.alt
                          ? 'bg-card border border-primary/40 shadow-sm z-10'
                          : 'bg-muted/40 border border-transparent hover:bg-card hover:border-border'}
                        ${hoveredSkill && hoveredSkill !== skill.alt ? 'opacity-40' : ''}
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={skill.src}
                        alt={skill.alt}
                        width={28}
                        height={28}
                        className="object-contain w-6 h-6 sm:w-7 sm:h-7"
                      />
                    </motion.div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs px-2 py-1">
                  {skill.tooltip}
                </TooltipContent>
              </Tooltip>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </TooltipProvider>
  );
};

export default HoverImageComponent;
