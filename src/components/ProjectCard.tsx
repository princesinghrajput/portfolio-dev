'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Github, ExternalLink, Images as GalleryIcon,
    BookOpen, Code, Palette, Zap, Users, Lock,
    Video, CreditCard, LayoutDashboard, Brain, Activity,
    MessageSquare, Search, Database, Cloud, Shield,
    Smartphone, Globe, Terminal, GitBranch, Layers,
    Sparkles, Eye, Target, Settings, Timer,
    PenTool, Share2, CheckCircle, TrendingUp, BarChart3,
    Cpu, Server, Workflow, FileCode, Gauge, ShieldCheck
} from 'lucide-react';
import Image from 'next/image';
import { Project, categoryLabels, IconName } from '@/lib/projects-data';
import ImageGallery from './ImageGallery';

// Icon mapping
const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
    BookOpen, Code, Palette, Zap, Users, Lock,
    Video, CreditCard, LayoutDashboard, Brain, Activity,
    MessageSquare, Search, Database, Cloud, Shield,
    Smartphone, Globe, Terminal, GitBranch, Layers,
    Sparkles, Eye, Target, Settings, Timer,
    PenTool, Share2, CheckCircle, TrendingUp, BarChart3,
    Cpu, Server, Workflow, FileCode, Gauge, ShieldCheck
};

interface ProjectCardProps {
    project: Project;
    variant?: 'compact' | 'full';
    index?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    variant = 'full',
    index = 0
}) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const categoryStyle = categoryLabels[project.category];

    return (
        <>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="project-card group"
            >
                <div className="card-premium overflow-hidden h-full flex flex-col">
                    {/* Header */}
                    <div className="p-4 sm:p-5 pb-3">
                        <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {project.title}
                            </h3>
                            <span className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${categoryStyle.bgColor} ${categoryStyle.color}`}>
                                {categoryStyle.label}
                            </span>
                        </div>

                        {/* Tech Stack - Enhanced styling */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {project.techStack.slice(0, variant === 'compact' ? 4 : 6).map((tech, i) => (
                                <span
                                    key={i}
                                    className={`px-2 py-0.5 text-[10px] font-medium rounded-md border transition-colors ${tech === 'Freelance'
                                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500/20'
                                            : 'bg-primary/5 border-primary/20 text-foreground/80 hover:bg-primary/10 hover:border-primary/30'
                                        }`}
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.techStack.length > (variant === 'compact' ? 4 : 6) && (
                                <span className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                                    +{project.techStack.length - (variant === 'compact' ? 4 : 6)} more
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative h-44 sm:h-52 overflow-hidden bg-muted mx-4 sm:mx-5 rounded-lg">
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Impact Badge - Shows on hover */}
                        {project.impact && (
                            <motion.div
                                className="absolute bottom-3 left-3 right-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-sm border border-border/50">
                                    <p className="text-[10px] font-medium text-primary">
                                        {project.impact}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 px-4 sm:px-5 py-3">
                        <motion.button
                            onClick={() => setIsGalleryOpen(true)}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <GalleryIcon className="w-3.5 h-3.5" />
                            Gallery ({project.images.length})
                        </motion.button>

                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-foreground text-xs font-medium hover:bg-muted/80 transition-colors"
                        >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                        </a>

                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors ml-auto"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Live Demo
                            </a>
                        )}
                    </div>

                    {/* Features Section - Only show in full variant */}
                    {variant === 'full' && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex-1">
                            <div className="pt-3 border-t border-border">
                                <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-primary" />
                                    Key Features & Technical Highlights
                                </h4>
                                <div className="space-y-2.5">
                                    {project.features.slice(0, 4).map((feature, i) => {
                                        const IconComponent = iconMap[feature.icon];
                                        return (
                                            <div key={i} className="flex items-start gap-2.5 group/feature">
                                                <div className="p-1.5 rounded-md bg-primary/10 shrink-0 mt-0.5 group-hover/feature:bg-primary/20 transition-colors">
                                                    <IconComponent className="w-3 h-3 text-primary" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-semibold text-foreground leading-tight">{feature.title}</p>
                                                    <p className="text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed mt-0.5">{feature.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Compact variant description */}
                    {variant === 'compact' && (
                        <div className="px-4 sm:px-5 pb-4 flex-1">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {isHovered ? project.longDescription : project.description}
                            </p>
                            {/* Show impact on compact variant too */}
                            {project.impact && !isHovered && (
                                <p className="text-[10px] text-primary font-medium mt-2">
                                    {project.impact}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </motion.article>

            {/* Gallery Modal */}
            <ImageGallery
                images={project.images}
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                projectTitle={project.title}
            />
        </>
    );
};

export default ProjectCard;
