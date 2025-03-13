"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2, X, Sparkles, MessageSquare, Lightbulb, Code, Briefcase } from 'lucide-react';
import { useTheme } from 'next-themes';
import ReactMarkdown from 'react-markdown';

const suggestedQuestions = [
  {
    icon: <Code className="w-4 h-4" />,
    text: "What are your main technical skills?",
    category: "Skills"
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    text: "Tell me about your experience at Sensation Software",
    category: "Experience"
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "What's your most challenging project?",
    category: "Projects"
  },
  {
    icon: <Lightbulb className="w-4 h-4" />,
    text: "What are your achievements?",
    category: "Achievements"
  },
  {
    icon: <Code className="w-4 h-4" />,
    text: "Tell me about your frontend development skills",
    category: "Skills"
  },
  {
    icon: <Code className="w-4 h-4" />,
    text: "What backend technologies do you use?",
    category: "Skills"
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    text: "Tell me about the DevOverflow project",
    category: "Projects"
  },
  {
    icon: <Briefcase className="w-4 h-4" />,
    text: "What's your experience with AI/ML?",
    category: "Experience"
  }
];

const ScrollingSuggestions = React.memo(({ onQuestionClick }: { onQuestionClick: (text: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const firstRowQuestions = useMemo(() => 
    suggestedQuestions.slice(0, Math.ceil(suggestedQuestions.length / 2)),
    []
  );
  const secondRowQuestions = useMemo(() => 
    suggestedQuestions.slice(Math.ceil(suggestedQuestions.length / 2)),
    []
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    setTimeout(() => setIsDragging(false), 100);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isMouseDown) return;
    e.preventDefault();
    setIsDragging(true);
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  }, [isMouseDown, startX, scrollLeft]);

  const handleQuestionClick = useCallback((text: string) => {
    if (!isDragging) {
      onQuestionClick(text);
    }
  }, [isDragging, onQuestionClick]);

  const QuestionRow = useMemo(() => 
    ({ questions, delay = 0 }: { questions: typeof suggestedQuestions, delay?: number }) => (
      <div className="flex space-x-3 animate-scroll px-2 py-1 pointer-events-auto">
        {questions.map((q, i) => (
          <motion.button
            key={i}
            initial={false}
            animate={{ opacity: 1 }}
            className="flex-shrink-0 p-2.5 text-left rounded-lg border border-gray-200 dark:border-gray-800 
                     hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 
                     transform hover:scale-[1.01] group min-w-[220px] max-w-[240px]
                     hover:shadow-sm hover:border-blue-500/30 dark:hover:border-blue-500/30
                     focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1
                     relative z-0 hover:z-10"
            onClick={() => handleQuestionClick(q.text)}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-blue-500/10 text-blue-500 
                           group-hover:bg-blue-500 group-hover:text-white transition-colors
                           group-hover:rotate-3 transform duration-300">
                {q.icon}
              </span>
              <span className="text-[10px] uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 
                           group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {q.category}
              </span>
            </div>
            <p className="text-xs font-medium line-clamp-2 leading-relaxed group-hover:text-blue-700 
                       dark:group-hover:text-blue-300 transition-colors">
              {q.text}
            </p>
          </motion.button>
        ))}
      </div>
    ),
    [handleQuestionClick]
  );

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-2 overflow-hidden py-2 pointer-events-auto"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      <div className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
        <QuestionRow questions={firstRowQuestions} />
      </div>
      <div className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing">
        <QuestionRow questions={secondRowQuestions} delay={0.2} />
      </div>
    </div>
  );
});

ScrollingSuggestions.displayName = 'ScrollingSuggestions';

// Add these custom components for ReactMarkdown
const MarkdownComponents = {
  a: ({ node, ...props }:any) => (
    <a
      {...props}
      className="font-bold text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 underline transition-colors cursor-pointer"
      target="_blank"
      rel="noopener noreferrer"
    />
  ),
  strong: ({ node, ...props }:any) => (
    <strong {...props} className="font-bold text-blue-500 dark:text-blue-400" />
  ),
};

export default function AskMe({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isMobile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (questionText: string = input) => {
    if (!questionText.trim()) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: questionText }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: questionText }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            onClick={onClose}
          />

          <motion.div
            initial={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, x: 20 }}
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, x: 0 }}
            exit={isMobile ? { y: '100%' } : { opacity: 0, scale: 0.95, x: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className={`
              fixed z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm
              ${isMobile 
                ? 'inset-x-0 bottom-0 h-[90vh] rounded-t-[2rem] shadow-2xl' 
                : 'top-24 right-4 w-[450px] h-[600px] rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50'
              }
            `}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto absolute top-3 left-1/2 -translate-x-1/2" />
                )}
                <div className="relative">
                  <Bot className="w-6 h-6 text-blue-500" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    AI Assistant
                    <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about Prince</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat content */}
            <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
              {messages.length === 0 ? (
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10 }}
                    >
                      <Bot className="w-16 h-16 mb-4 text-blue-500" />
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center px-4 text-sm font-medium"
                    >
                      Hi! I'm Prince's AI assistant. How can I help you today?
                    </motion.p>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Suggested questions:
                    </p>
                    <ScrollingSuggestions onQuestionClick={handleSubmit} />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${
                        message.role === 'user' 
                          ? 'ml-auto' 
                          : ''
                      }`}>
                        <div className={`relative p-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <ReactMarkdown 
                            className="text-sm leading-relaxed prose dark:prose-invert max-w-none"
                            components={MarkdownComponents}
                          >
                            {message.content}
                          </ReactMarkdown>
                          <span className="absolute bottom-0 translate-y-full text-[10px] text-gray-400 mt-1">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-gray-500 mb-4"
                    >
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-4">
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Prince's skills, experience, or projects..."
                  className="flex-1 p-3 rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 