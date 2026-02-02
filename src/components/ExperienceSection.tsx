"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineWork } from "react-icons/md";
import { FiChevronDown, FiChevronUp, FiMapPin, FiCalendar } from "react-icons/fi";

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
    company: "Sensation Software Solutions",
    location: "Mohali, Punjab",
    achievements: [
      { text: "Contributed to AppyPay (Digital Payment Platform) by designing a responsive merchant dashboard using Material-UI and custom CSS animations, implementing a dynamic theming system with compound components that reduced code redundancy by 40%.", highlights: ["AppyPay", "Material-UI", "40%"] },
      { text: "Developed a scalable merchant registration system in AppyPay using Redux Toolkit, handling complex business logic for payment method integration, bank account validation, and KYC verification.", highlights: ["Redux Toolkit", "KYC verification"] },
      { text: "Contributed to Supra.tools by developing a dynamic product analytics dashboard using Next.js enabling users to process and visualize feature matrices through interactive charts.", highlights: ["Supra.tools", "Next.js"] },
      { text: "Developed an end-to-end AI-powered exercise correction platform leveraging TensorFlow.js and React.js that performs real-time skeletal tracking and pose estimation.", highlights: ["TensorFlow.js", "React.js", "real-time"] }
    ]
  },
  {
    period: "Jan 2024 - June 2024",
    title: "Software Developer Intern",
    company: "Sensation Software Solutions",
    location: "Mohali, Punjab",
    achievements: [
      { text: "Developed RESTful APIs and integrated front-end components using Node.js, Express.js and React, automating order processing to improve operational efficiency by 30%.", highlights: ["RESTful APIs", "Node.js", "30%"] },
      { text: "Enhanced search functionality with debouncing techniques reducing API calls by 60% and improved user experience through Pagination and real-time updates via Socket.IO.", highlights: ["debouncing", "60%", "Socket.IO"] },
      { text: "Implemented email notifications using Nodemailer and optimized image uploads with Cloudinary, resulting in a 25% reduction in system response time.", highlights: ["Nodemailer", "Cloudinary", "25%"] }
    ]
  }
];

const ExperienceCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const highlightText = (text: string, highlights: string[]) => {
    let highlightedText = text;
    highlights.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="font-medium text-foreground">$1</span>');
    });
    return <p dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <motion.div
      className={`relative ml-6 md:ml-0 md:w-[calc(50%-1rem)] ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <motion.div
        className="card-interactive overflow-hidden"
        whileHover={{ y: -2 }}
      >
        <div className="p-4">
          {/* Period */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <FiCalendar className="w-3 h-3 text-primary" />
            <span>{exp.period}</span>
          </div>

          {/* Title */}
          <h3 className="heading-sm mb-0.5">{exp.title}</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
            <span className="font-medium text-foreground">{exp.company}</span>
            <span className="flex items-center gap-1">
              <FiMapPin className="w-3 h-3" />
              {exp.location}
            </span>
          </div>

          {/* Preview */}
          {!isExpanded && (
            <p className="body-sm line-clamp-2 text-xs">{exp.achievements[0].text}</p>
          )}
        </div>

        {/* Expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border"
            >
              <div className="p-4 space-y-2.5">
                {exp.achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {highlightText(achievement.text, achievement.highlights)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 flex items-center justify-center gap-1 text-xs font-medium text-primary hover:bg-muted/50 border-t border-border transition-colors"
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? <>Less <FiChevronUp size={12} /></> : <>More <FiChevronDown size={12} /></>}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="section">
      {/* Header */}
      <div className="section-header">
        <div className="flex items-center gap-1.5 label mb-2">
          <MdOutlineWork className="text-primary" />
          <span>Experience</span>
        </div>
        <h2 className="section-title">Work History</h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={index} className="relative">
              <motion.div
                className="absolute left-2 md:left-1/2 w-2 h-2 bg-primary rounded-full -translate-x-1/2 mt-5 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 400, delay: index * 0.1 }}
              />
              <ExperienceCard exp={exp} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;