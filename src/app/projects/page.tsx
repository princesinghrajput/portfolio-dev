'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, Filter } from 'lucide-react';
import { projects, categoryLabels, Project } from '@/lib/projects-data';
import ProjectCard from '@/components/ProjectCard';

type CategoryFilter = 'all' | Project['category'];

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'tool', label: 'Tools' },
  { value: 'extension', label: 'Extensions' }
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="min-h-screen py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Folder className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              My Work
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Projects & <span className="gradient-text">Experiments</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            A collection of things I&apos;ve built, from side projects to learning experiments.
            Some actually work, some are works in progress. 🚀
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filter by category</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeFilter === filter.value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
              >
                {filter.label}
                {filter.value !== 'all' && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({projects.filter(p => p.category === filter.value).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="full"
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No projects in this category yet. Stay tuned! 🔧</p>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-block p-6 rounded-2xl bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Want to see more? Check out my GitHub for all the experiments! 🧪
            </p>
            <a
              href="https://github.com/princesinghrajput"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              View GitHub Profile
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}