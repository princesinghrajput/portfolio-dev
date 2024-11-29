"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MdOutlineWork } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  location: string;
  achievements: {
    text: string;
    highlights: string[];
  }[];
}

const experiences: ExperienceItem[] = [
  {
    period: "July 2024 - Present",
    title: "Full Stack Developer",
    company: "Sensation Software Solutions, Pvt. Ltd",
    location: "Mohali, Punjab",
    achievements: [
      {
        text: "Contributed to AppyPay (Digital Payment Platform) by designing a responsive merchant dashboard using Material-UI and custom CSS animations, implementing a dynamic theming system with compound components that reduced code redundancy by 40% while maintaining consistent UX across multiple merchant portals.",
        highlights: ["AppyPay", "Material-UI", "CSS animations", "40%"]
      },
      {
        text: "Developed a scalable merchant registration system in AppyPay using Redux Toolkit, handling complex business logic for payment method integration, bank account validation, and KYC verification, enabling quicker and more intuitive decision-making for users reducing onboarding time by 35%.",
        highlights: ["Redux Toolkit", "KYC verification", "35%"]
      },
      {
        text: "Contributed to Supra.tools by developing a dynamic product analytics dashboard using Next.js enabling users to process and visualize feature matrices through interactive charts. Reduced data analysis time by 40% and improved user satisfaction ratings by 15%.",
        highlights: ["Supra.tools", "Next.js", "40%", "15%"]
      },
      {
        text: "Developed an end-to-end AI-powered exercise correction platform leveraging TensorFlow.js and React.js that performs real-time skeletal tracking and pose estimation to provide instant feedback on exercise form featuring a custom pose detection algorithm and an intuitive admin interface for exercise customization.",
        highlights: ["TensorFlow.js", "React.js", "real-time skeletal tracking", "pose estimation"]
      }
    ]
  },
  {
    period: "Jan 2024 - June 2024",
    title: "Software Developer Intern",
    company: "Sensation Software Solutions, Pvt. Ltd",
    location: "Mohali, Punjab",
    achievements: [
      {
        text: "Developed RESTful APIs and integrated front-end components using Node.js, Express.js and React, automating order processing to improve operational efficiency by 30%.",
        highlights: ["RESTful APIs", "Node.js", "Express.js", "React", "30%"]
      },
      {
        text: "Enhanced search functionality with debouncing techniques reducing API calls by 60% and improved user experience through Pagination and real-time updates via Socket.IO.",
        highlights: ["debouncing", "60%", "Pagination", "Socket.IO"]
      },
      {
        text: "Implemented email notifications using Nodemailer and optimized image uploads with Cloudinary, resulting in a 25% reduction in system response time.",
        highlights: ["Nodemailer", "Cloudinary", "25%"]
      }
    ]
  }
];

const ExperienceSection = () => {
  const highlightText = (text: string, highlights: string[]) => {
    let highlightedText = text;
    highlights.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="text-emerald-500 font-semibold">$1</span>');
    });
    return <p dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-500 mb-4">
          <MdOutlineWork className="text-xl" />
          <span className="text-sm font-semibold">Work Experience</span>
        </div>
        <h2 className="text-4xl font-bold mt-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          My Professional Journey
        </h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 transform -translate-x-1/2" />

        {/* Experience Cards */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full shadow-lg transform -translate-x-1/2 z-10">
                <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-900 scale-[0.6]" />
              </div>

              {/* Card Container */}
              <div className={`relative ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
              }`}>
                <div className="bg-white dark:bg-gray-800/40 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700/50 backdrop-blur-sm">
                  {/* Period Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-4">
                    <span>{exp.period}</span>
                    <BsArrowRight className="text-xs" />
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    {exp.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600 dark:text-gray-300 mb-6">
                    <span className="font-medium">{exp.company}</span>
                    <span className="hidden sm:block">•</span>
                    <span className="text-gray-500">{exp.location}</span>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-4">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (i * 0.1) }}
                        className="flex items-start gap-3 group"
                      >
                        <div className="mt-2 flex-shrink-0">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 group-hover:ring-4 ring-emerald-500/20 transition-all duration-300" />
                        </div>
                        <div className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed">
                          {highlightText(achievement.text, achievement.highlights)}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 