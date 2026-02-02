"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

const ResumeSection = () => {
    return (
        <section className="py-8">
            <motion.div
                className="card p-4 sm:p-5"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold">Resume</h3>
                            <p className="text-xs text-muted-foreground">View my experience</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <motion.a
                            href="/assests/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ExternalLink className="w-3 h-3" />
                            View
                        </motion.a>

                        <motion.a
                            href="/assests/resume.pdf"
                            download="Prince_Kumar_Resume.pdf"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-muted transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download className="w-3 h-3" />
                            Download
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default ResumeSection;