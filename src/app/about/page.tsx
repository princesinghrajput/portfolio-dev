"use client"
import React from "react";
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Sparkles, Award, User } from 'lucide-react';
import CertificationsSection from "@/components/cert";
import ReadmeDisplay from "@/components/readme";

const certifications = [
    {
        id: 1,
        title: "SQL-Basic to Advanced",
        image: "/assests/images/geekster.png",
        description: "Received the certificate for completing the geekster SQL assignments",
        issuer: "Geekster",
        date: "2024-05-12"
    },
    {
        id: 2,
        title: "Bitcoin Script & Enterprise Course",
        image: "/assests/images/bitcoin.png",
        description: "Comprehensive course on Bitcoin and blockchain technologies.",
        issuer: "BSV Academy",
        date: "2024-06-15"
    },
    {
        id: 3,
        title: "Rookie Developer Badge",
        image: "/assests/images/tsoc.png",
        description: "Earned for assignment completion of the workshops in TSoC'24",
        issuer: "TimeChain Labs",
        date: "2024-06-30"
    },

];

const AboutPage = () => {
    return (
        <div className="relative min-h-screen pt-20 pb-10">
            {/* Background Decorations */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="orb orb-primary w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] top-[10%] -right-[100px] opacity-20 animate-orb" />
                <div className="orb orb-accent w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] bottom-[20%] -left-[50px] opacity-15 animate-orb-slow" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            </div>

            <section className="container max-w-4xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <User className="w-4 h-4" />
                        <span>About Me</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                        I&apos;m <span className="gradient-text">Prince</span>
                    </h1>

                    <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8">
                        A digital explorer crafting solutions at the intersection of code and creativity.
                        I build systems that solve real-world problems with a focus on user experience.
                    </p>

                    <div className="flex justify-center gap-4">
                        {[
                            { icon: Github, href: "https://github.com/princesinghrajput", label: "GitHub" },
                            { icon: Linkedin, href: "https://linkedin.com/in/prince-kumar-05", label: "LinkedIn" },
                            { icon: Twitter, href: "https://x.com/its_me_prince1_", label: "Twitter" }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <div className="space-y-12">
                    <ReadmeDisplay />

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Award className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold">Certifications & Badges</h2>
                        </div>
                        <CertificationsSection certifications={certifications} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;


