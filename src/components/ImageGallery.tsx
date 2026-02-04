'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
    isOpen: boolean;
    onClose: () => void;
    projectTitle: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    isOpen,
    onClose,
    projectTitle
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    handlePrevious();
                    break;
                case 'ArrowRight':
                    handleNext();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, handlePrevious, handleNext]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Reset to first image when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(0);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Title */}
                    <div className="absolute top-4 left-4 z-50">
                        <h3 className="text-lg font-semibold text-foreground">{projectTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                            {currentIndex + 1} / {images.length}
                        </p>
                    </div>

                    {/* Main Image */}
                    <div className="relative z-10 w-full max-w-5xl mx-4 sm:mx-8">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative aspect-video rounded-xl overflow-hidden bg-muted"
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 p-3 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-all hover:scale-110"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 p-3 rounded-full bg-muted/80 hover:bg-muted text-foreground transition-all hover:scale-110"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Thumbnail Strip */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 p-2 rounded-xl bg-muted/60 backdrop-blur-sm">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`relative w-16 h-10 rounded-lg overflow-hidden transition-all ${index === currentIndex
                                            ? 'ring-2 ring-primary scale-110'
                                            : 'opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ImageGallery;
