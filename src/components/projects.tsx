'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ArrowRight, ExternalLink, Github, Star, Sparkles, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl: string;
  featured?: boolean;
  category: 'fullstack' | 'ai' | 'tool';
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "ErgoSmart - AI Posture Coach",
    description: "AI-powered posture coach using real-time pose estimation",
    longDescription: "Ever had your mom tell you to sit straight? This is like that, but with AI. Uses TensorFlow.js and MediaPipe to analyze your posture in real-time and gently (or not so gently) remind you to fix it.",
    image: "/assests/ergoLogo.png",
    techStack: ["React", "TensorFlow.js", "MediaPipe", "Tailwind"],
    liveUrl: "https://ergosmart.vercel.app/",
    githubUrl: "https://github.com/princesinghrajput/ergoSmart",
    featured: true,
    category: 'ai',
    highlights: ["Real-time pose estimation", "Exercise form correction", "Browser-based ML"],
  },
  {
    title: "DrawIO - Eraser Clone",
    description: "A collaborative whiteboard with real-time sync",
    longDescription: "Because sometimes you just need to draw boxes and arrows to explain things. Built this when I got tired of paying for whiteboard tools. Now I can draw infinite boxes for free!",
    image: "/assests/drawio.png",
    techStack: ["Next.js", "TypeScript", "ConvexDB", "Tailwind"],
    liveUrl: "https://erasor-clone.vercel.app/",
    githubUrl: "https://github.com/princesinghrajput/drawio",
    category: 'tool',
    highlights: ["Real-time collaboration", "Infinite canvas", "Custom shapes"],
  },
  {
    title: "Stack-OverFlow Clone",
    description: "Full-featured Q&A platform with voting system",
    longDescription: "What's a developer portfolio without a Stack Overflow clone? Features auth, voting, rich text editing, and the satisfaction of answering your own questions.",
    image: "/assests/devoverflow.png",
    techStack: ["Next.js", "MongoDB", "TypeScript", "TinyMCE"],
    liveUrl: "https://nextjs14-devoverflow.vercel.app/",
    githubUrl: "https://github.com/princesinghrajput/dev-overflow",
    category: 'fullstack',
    highlights: ["Authentication", "Voting system", "Rich text editor"],
  },
];

const categoryLabels = {
  fullstack: { label: 'Full Stack', color: 'bg-blue-500/10 text-blue-400' },
  ai: { label: 'AI/ML', color: 'bg-purple-500/10 text-purple-400' },
  tool: { label: 'Tool', color: 'bg-emerald-500/10 text-emerald-400' },
};

const MyProjects: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section className='section py-4 sm:py-10'>
      {/* Header - More compact on mobile */}
      <div className='mb-4 sm:mb-8'>
        <div className='flex items-center gap-2 mb-1.5 sm:mb-2'>
          <div className='p-1.5 sm:p-2 rounded-lg bg-primary/10'>
            <Folder className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary' />
          </div>
          <span className='text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wider'>Portfolio</span>
        </div>
        <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight'>
          Things I&apos;ve <span className='gradient-text'>Built</span>
        </h2>
        <p className='mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl hidden sm:block'>
          Side projects and things I built. <span className='text-muted-foreground/60'>(Usually harder than expected)</span>
        </p>
      </div>

      {/* Featured Project */}
      {featuredProject && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-foreground">Featured Project</span>
          </div>

          <motion.div
            className="group card-premium overflow-hidden"
            whileHover={{ y: -4 }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-48 sm:h-56 md:h-full min-h-[200px] overflow-hidden bg-muted">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />

                {/* Category badge */}
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${categoryLabels[featuredProject.category].color}`}>
                  {categoryLabels[featuredProject.category].label}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {featuredProject.longDescription}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProject.highlights.map((highlight, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                      <Sparkles className="w-3 h-3 text-primary" />
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {featuredProject.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs font-medium bg-primary/5 border border-primary/20 rounded-lg text-foreground">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <Eye className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Other Projects Grid - More compact on mobile */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
        {otherProjects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredProject(project.title)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => window.innerWidth < 1024 && setHoveredProject(hoveredProject === project.title ? null : project.title)}
          >
            <motion.div
              className='group card-premium overflow-hidden h-full flex flex-col'
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className='relative h-40 sm:h-44 overflow-hidden bg-muted'>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className='object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent' />

                {/* Category badge */}
                <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-medium ${categoryLabels[project.category].color}`}>
                  {categoryLabels[project.category].label}
                </span>

                {/* Action Buttons */}
                <div className='absolute bottom-3 right-3 flex items-center gap-2'>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='p-2.5 rounded-xl bg-background/90 backdrop-blur-sm hover:bg-background active:bg-background active:scale-95 text-foreground transition-all'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className='w-4 h-4' />
                  </motion.a>
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='p-2.5 rounded-xl bg-primary text-primary-foreground transition-all'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className='w-4 h-4' />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className='p-4 sm:p-5 flex-1 flex flex-col'>
                <h3 className='text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors'>
                  {project.title}
                </h3>

                {/* Show long description on hover */}
                <AnimatePresence mode="wait">
                  {hoveredProject === project.title ? (
                    <motion.p
                      key="long"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1'
                    >
                      {project.longDescription}
                    </motion.p>
                  ) : (
                    <motion.p
                      key="short"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='text-xs sm:text-sm text-muted-foreground leading-relaxed flex-1'
                    >
                      {project.description}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Tech Tags */}
                <div className='flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border'>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className='px-2 py-0.5 text-[10px] font-medium bg-muted rounded-md text-muted-foreground'>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className='mt-8 sm:mt-10 text-center'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-muted-foreground/60 mb-4 italic">
          These are just the highlights. I have more experiments hiding in my GitHub 🙈
        </p>
        <Link href="/projects">
          <motion.span
            className='group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted/60 border border-border text-sm font-medium hover:bg-muted hover:border-primary/40 transition-all duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore All Projects
            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
          </motion.span>
        </Link>
      </motion.div>
    </section>
  );
};

export default MyProjects;
