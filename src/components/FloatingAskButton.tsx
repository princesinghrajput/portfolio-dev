"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface FloatingAskButtonProps {
  onClick: () => void;
}

const FloatingAskButton: React.FC<FloatingAskButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed right-4 top-20 z-50 p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Bot className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
      </div>
    </motion.button>
  );
};

export default FloatingAskButton; 