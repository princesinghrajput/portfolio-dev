'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaFolderOpen } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface MyProjectsProps {
  projects: Project[];
}

const MyProjects: React.FC<MyProjectsProps> = ({ projects }) => {
  return (
    <section className='section'>
      {/* Header */}
      <div className='section-header'>
        <div className='flex items-center gap-1.5 label mb-2'>
          <FaFolderOpen className='text-primary' />
          <span>Portfolio</span>
        </div>
        <h2 className='section-title'>Featured Projects</h2>
      </div>

      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <motion.div
              className='group card-interactive p-4 h-full'
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors'>
                  <div className='text-lg'>{project.icon}</div>
                </div>
                <div className='flex-1 min-w-0'>
                  <h3 className='text-sm font-semibold mb-0.5 truncate group-hover:text-primary transition-colors'>
                    {project.title}
                  </h3>
                  <p className='text-xs text-muted-foreground line-clamp-2'>{project.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className='mt-6 text-center'>
        <Link href="/projects">
          <motion.span
            className='group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-2'
            whileHover={{ x: 2 }}
          >
            View All
            <ArrowRight className='w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5' />
          </motion.span>
        </Link>
      </div>
    </section>
  );
};

export default MyProjects;
