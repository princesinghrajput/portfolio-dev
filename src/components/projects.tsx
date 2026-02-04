'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Folder, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { projects, getFeaturedProjects } from '@/lib/projects-data';
import ProjectCard from './ProjectCard';

const MyProjects: React.FC = () => {
  // Get top 4 featured projects for home page
  const featuredProjects = getFeaturedProjects(4);
  // If not enough featured, fill with other projects
  const displayProjects = featuredProjects.length >= 4
    ? featuredProjects
    : [...featuredProjects, ...projects.filter(p => !p.featured).slice(0, 4 - featuredProjects.length)];

  return (
    <section className='section py-4 sm:py-10'>
      {/* Header */}
      <div className='mb-6 sm:mb-8'>
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

      {/* Projects Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5'>
        {displayProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            variant="compact"
            index={index}
          />
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
