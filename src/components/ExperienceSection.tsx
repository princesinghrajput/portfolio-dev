"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { MdOutlineWork } from "react-icons/md";

interface ExperienceItem {
  period: string;
  title: string;
  company: string;
  location: string;
  achievements: {
    text: string;
    highlights?: string[];  // Keywords to highlight in each achievement
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
        text: "Contributed to AppyPay (Digital Payment Platform) by designing a responsive merchant dashboard using Material-UI and custom CSS animations, implementing a dynamic theming system with compound components that reduced code redundancy by 40%, maintaining consistent UX across multiple merchant portals.",
        highlights: ["AppyPay", "Material-UI", "CSS animations", "40%"]
      },
      {
        text: "Developed a scalable merchant registration system on AppyPay using Redux Toolkit, handling complex business logic for payment method integration, bank account validation, and KYC verification, reducing onboarding time by 40%.",
        highlights: ["Redux Toolkit", "KYC verification", "40%"]
      },
      {
        text: "Contributed to Supra.tools by developing a dynamic product analytics dashboard using Next.js that processes complex feature matrices and visualizes data through interactive charts, reducing analysis time by 40%.",
        highlights: ["Supra.tools", "Next.js", "interactive charts", "40%"]
      },
      {
        text: "Developed an end-to-end AI-powered exercise correction platform leveraging TensorFlow.js and React.js that performs real-time skeletal tracking and pose estimation.",
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
  // Function to highlight keywords in text
  const highlightText = (text: string, highlights: string[] = []) => {
    let highlightedText = text;
    highlights.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="text-emerald-500 font-medium">$1</span>');
    });
    return <p dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <motion.div 
      className="mt-20 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
 <div className='flex justify-center items-center mb-10'>
        <MdOutlineWork className='text-2xl mr-2' />
        <h1 className='text-center'> | My Experience |</h1>
      </div>
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-emerald-500" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative mb-12 pl-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Circle on Timeline */}
            <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />

            <div className="bg-white dark:bg-transparent border border-gray-100 dark:border-gray-800 rounded-lg p-6 hover:border-emerald-500 transition-all duration-300">
              <div className="mb-4">
                <span className="text-emerald-500 text-sm font-medium">{exp.period}</span>
                <h3 className="text-xl font-bold mt-1">{exp.title}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">{exp.location}</p>
                </div>
              </div>

              <div className="text-gray-600 dark:text-gray-400 space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <div key={i} className="text-sm leading-relaxed">
                    {highlightText(achievement.text, achievement.highlights)}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceSection; 