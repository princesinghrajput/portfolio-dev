"use client";

import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ViewerCount() {
  const [viewers, setViewers] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Track page view
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        type: 'pageview',
        path: window.location.pathname
      })
    }).catch(console.error);

    // Poll for active viewers
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/analytics');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setViewers(data.activeViewers);
      } catch (error) {
        console.error('Failed to fetch viewer count:', error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && viewers > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-24 right-4 bg-black/20 dark:bg-white/10 backdrop-blur-lg rounded-full px-4 py-2 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">{viewers} watching</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 