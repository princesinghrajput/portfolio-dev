'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, Star, X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Achievement {
    id: string;
    title: string;
    organization: string;
    date: string;
    description: string;
    category: 'hackathon' | 'certification' | 'award' | 'recognition';
    images: string[];
    link?: string;
}

const achievements: Achievement[] = [
    {
        id: 'hackathon-winner',
        title: 'Smart India Hackathon Winner',
        organization: 'Ministry of Education, Government of India',
        date: 'Dec 2023',
        description: 'Won the national-level Smart India Hackathon for developing an innovative solution for real-time posture monitoring using AI.',
        category: 'hackathon',
        images: ['/assests/achievements/sih-winner.jpg'],
        link: 'https://www.sih.gov.in/'
    },
    {
        id: 'gssoc-contributor',
        title: 'Top Contributor - GSSoC',
        organization: 'GirlScript Summer of Code',
        date: 'Summer 2023',
        description: 'Recognized as a top contributor for multiple open-source projects during the GirlScript Summer of Code program.',
        category: 'recognition',
        images: ['/assests/achievements/gssoc.jpg']
    },
    {
        id: 'aws-certified',
        title: 'AWS Cloud Practitioner',
        organization: 'Amazon Web Services',
        date: 'Jan 2024',
        description: 'Certified AWS Cloud Practitioner demonstrating foundational cloud knowledge and best practices.',
        category: 'certification',
        images: ['/assests/achievements/aws-cert.jpg'],
        link: 'https://aws.amazon.com/certification/'
    }
];

const categoryIcons: Record<Achievement['category'], React.ReactNode> = {
    hackathon: <Trophy className="w-4 h-4" />,
    certification: <Medal className="w-4 h-4" />,
    award: <Award className="w-4 h-4" />,
    recognition: <Star className="w-4 h-4" />
};

const categoryColors: Record<Achievement['category'], string> = {
    hackathon: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    certification: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    award: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    recognition: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
};

// Gallery Modal Component
const GalleryModal: React.FC<{
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    title: string;
}> = ({ images, isOpen, onClose, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    };

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-background/95 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 w-full max-w-4xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute -top-12 right-0 p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-center mb-4 text-foreground">{title}</h3>

                        {/* Image */}
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
                            <Image
                                src={images[currentIndex]}
                                alt={`${title} - Image ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Navigation */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 border border-border hover:bg-muted transition-colors"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/90 border border-border hover:bg-muted transition-colors"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                {/* Indicators */}
                                <div className="flex justify-center gap-2 mt-4">
                                    {images.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentIndex(i)}
                                            className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Achievement Card Component
const AchievementCard: React.FC<{ achievement: Achievement; index: number }> = ({
    achievement,
    index
}) => {
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
            >
                <div className="card-premium p-4 sm:p-5 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <div className={`p-2 rounded-lg border ${categoryColors[achievement.category]}`}>
                            {categoryIcons[achievement.category]}
                        </div>
                        <span className="text-xs text-muted-foreground">{achievement.date}</span>
                    </div>

                    {/* Title & Organization */}
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {achievement.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{achievement.organization}</p>

                    {/* Image Preview */}
                    {achievement.images.length > 0 && (
                        <button
                            onClick={() => setIsGalleryOpen(true)}
                            className="relative h-32 w-full rounded-lg overflow-hidden bg-muted mb-3 group/img"
                        >
                            <Image
                                src={achievement.images[0]}
                                alt={achievement.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover/img:scale-105"
                            />
                            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-xs font-medium text-foreground">View Gallery</span>
                            </div>
                        </button>
                    )}

                    {/* Description */}
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                        {achievement.description}
                    </p>

                    {/* Link */}
                    {achievement.link && (
                        <a
                            href={achievement.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-3"
                        >
                            <ExternalLink className="w-3 h-3" />
                            Learn more
                        </a>
                    )}
                </div>
            </motion.div>

            <GalleryModal
                images={achievement.images}
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                title={achievement.title}
            />
        </>
    );
};

// Main Component
const AchievementsSection: React.FC = () => {
    return (
        <section id="achievements">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                    <Trophy className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                        Achievements & Recognition
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Milestones that shaped my journey
                    </p>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                    <AchievementCard key={achievement.id} achievement={achievement} index={index} />
                ))}
            </div>
        </section>
    );
};

export default AchievementsSection;
