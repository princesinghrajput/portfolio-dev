"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

const ResumeSection = () => {
    return (
        <section className="py-4 sm:py-10">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
                        <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Resume</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    My <span className="gradient-text">Resume</span>
                </h2>
            </div>

            {/* Resume Card */}
            <motion.div
                className="card-premium p-4 sm:p-6"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Info */}
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-base sm:text-lg font-bold mb-0.5">Prince Kumar - Resume</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">Full Stack Developer • 2+ years experience</p>
                            <div className="flex flex-wrap gap-1.5">
                                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-muted rounded text-muted-foreground">React</span>
                                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-muted rounded text-muted-foreground">Next.js</span>
                                <span className="px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-muted rounded text-muted-foreground">Node.js</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 w-full sm:w-auto">
                        <motion.a
                            href="/assests/Prince_Kumar(CV).pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-primary text-primary-foreground"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            View
                        </motion.a>

                        <motion.a
                            href="/assests/Prince_Kumar(CV).pdf"
                            download="Prince_Kumar_Resume.pdf"
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-border bg-muted/50 hover:bg-muted transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download className="w-3.5 h-3.5" />
                            Download
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ResumeSection;