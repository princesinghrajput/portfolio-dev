"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';

const ResumeSection = () => {
    return (
        <motion.div 
            className="mt-8 p-6 rounded-lg border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="flex items-center justify-center gap-2 mb-6">
                <FileText className="w-5 h-5" />
                <h2 className="text-center">| Resume |</h2>
            </div>
            
            <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
                    View my professional experience, skills, and qualifications
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                    <motion.a
                        href="/assests/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-6 py-2 bg-transparent border-2 border-current overflow-hidden font-medium rounded-lg hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Resume
                        </span>
                    </motion.a>
                    
                    <motion.a
                        href="/assests/resume.pdf"
                        download="Prince_Kumar_Resume.pdf"
                        className="group relative inline-flex items-center justify-center px-6 py-2 bg-transparent border-2 border-current overflow-hidden font-medium rounded-lg hover:scale-105 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </span>
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
};

export default ResumeSection; 