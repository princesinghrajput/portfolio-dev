"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, Send, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

const socialLinks = [
  { name: "Email", href: "mailto:psr8084@gmail.com", icon: Mail, color: "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30" },
  { name: "Twitter", href: "https://x.com/its_me_prince1_", icon: TwitterLogoIcon, color: "hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30" },
  { name: "GitHub", href: "https://github.com/princesinghrajput", icon: Github, color: "hover:bg-purple-500/10 hover:text-purple-400 hover:border-purple-500/30" },
  { name: "LinkedIn", href: "https://linkedin.com/in/prince-kumar-05", icon: Linkedin, color: "hover:bg-blue-600/10 hover:text-blue-500 hover:border-blue-600/30" },
];

const ContactMe: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [command, setCommand] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
    if (formStatus === 'Invalid command') setFormStatus('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand();
    }
  };

  const processCommand = () => {
    const trimmedCommand = command.trim();

    // Pattern: git add . "message content"
    const addMatch = trimmedCommand.match(/^git add \. ["'](.+)["']$/);
    // Pattern: git commit -m "email@example.com"
    const commitMatch = trimmedCommand.match(/^git commit -m ["'](.+)["']$/);
    // Pattern: git push origin prince
    const pushMatch = trimmedCommand.match(/^git push origin prince$/);

    if (addMatch && addMatch[1]) {
      setFormData({ ...formData, message: addMatch[1] });
      setCommand('');
      setFormStatus('✓ Message staged!');
      setCurrentStep(1);
      setTimeout(() => setFormStatus(''), 2000);
    } else if (commitMatch && commitMatch[1]) {
      setFormData({ ...formData, email: commitMatch[1] });
      setCommand('');
      setFormStatus('✓ Email committed!');
      setCurrentStep(2);
      setTimeout(() => setFormStatus(''), 2000);
    } else if (pushMatch) {
      if (!formData.message || !formData.email) {
        setFormStatus('⚠ Stage message & commit email first');
        return;
      }
      handleSubmit();
      setCommand('');
    } else {
      setFormStatus('Invalid command - check the format above');
    }
  };

  const handleSubmit = async () => {
    if (!formData.message || !formData.email) {
      setFormStatus('Please provide both message and email');
      return;
    }

    setFormStatus('Pushing...');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '13142d13-a73f-4269-acf3-6a7a6b02c403',
          ...formData
        })
      });

      const result = await res.json();
      if (result.success) {
        setFormStatus('✓ Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('Failed to push');
      }
    } catch (error) {
      setFormStatus('Network error');
    }
  };

  return (
    <section className="py-4 sm:py-10" id="contact">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10">
            <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          </div>
          <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Contact</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl">
          Have a project in mind? Reach out through any of these channels
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
        {/* Left - Social Links */}
        <div className="space-y-4">
          <h3 className="text-sm sm:text-base font-semibold flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            Connect with me
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {socialLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 card-premium transition-all duration-200 active:scale-95 ${link.color}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-transparent group-active:bg-transparent transition-colors">
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{link.name}</span>
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Right - Terminal */}
        <div className="relative">
          <div className="card-premium overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-muted/50 border-b border-border">
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="flex-1 text-center text-[10px] sm:text-xs text-muted-foreground font-mono">git — contact</span>
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            {/* Terminal Content */}
            <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-3">
              <p className="text-muted-foreground text-[10px] sm:text-xs">
                <span className="text-primary font-bold">$</span> Send a message using git commands:
              </p>

              {/* Command Steps with progress indication */}
              <div className="space-y-2 p-2.5 sm:p-3 rounded-lg bg-muted/30 border border-border text-[10px] sm:text-xs">
                {/* Step 1: Add message */}
                <div className={`flex items-start gap-1.5 p-1.5 rounded transition-colors ${currentStep >= 1 ? 'bg-emerald-500/10' : ''}`}>
                  <span className="text-emerald-500 font-bold shrink-0">1.</span>
                  <div className="flex-1 min-w-0">
                    <code className="text-muted-foreground">git add . "</code>
                    <code className="text-foreground break-all">{formData.message || 'your message'}</code>
                    <code className="text-muted-foreground">"</code>
                  </div>
                  {formData.message && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                </div>

                {/* Step 2: Commit email */}
                <div className={`flex items-start gap-1.5 p-1.5 rounded transition-colors ${currentStep >= 2 ? 'bg-emerald-500/10' : ''}`}>
                  <span className="text-emerald-500 font-bold shrink-0">2.</span>
                  <div className="flex-1 min-w-0">
                    <code className="text-muted-foreground">git commit -m "</code>
                    <code className="text-foreground break-all">{formData.email || 'your@email.com'}</code>
                    <code className="text-muted-foreground">"</code>
                  </div>
                  {formData.email && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />}
                </div>

                {/* Step 3: Push */}
                <div className="flex items-start gap-1.5 p-1.5 rounded">
                  <span className="text-emerald-500 font-bold shrink-0">3.</span>
                  <div className="flex-1">
                    <code className="text-muted-foreground">git push origin prince</code>
                  </div>
                </div>
              </div>

              {/* Input - Enhanced for mobile with higher z-index */}
              <div className="relative z-50 flex items-center gap-2 p-2 sm:p-2.5 rounded-lg bg-muted/50 border border-border focus-within:border-primary/50 transition-colors">
                <span className="text-primary font-bold shrink-0">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={handleCommandChange}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/50 text-[11px] sm:text-sm min-w-0 pointer-events-auto"
                  placeholder='git add . "Hello!"'
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  inputMode="text"
                />
                <motion.button
                  onClick={processCommand}
                  className="p-2 sm:p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30 transition-colors shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                </motion.button>
              </div>

              {/* Status Message */}
              {formStatus && (
                <motion.p
                  className={`text-[10px] sm:text-xs font-medium ${formStatus.includes('✓')
                    ? 'text-emerald-500'
                    : formStatus.includes('⚠')
                      ? 'text-amber-500'
                      : formStatus.includes('Invalid')
                        ? 'text-red-400'
                        : 'text-muted-foreground'
                    }`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {formStatus}
                </motion.p>
              )}

              {/* Mobile hint */}
              <p className="text-[9px] text-muted-foreground/50 text-center sm:hidden">
                💡 Copy commands from above, replace placeholder with your info
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
