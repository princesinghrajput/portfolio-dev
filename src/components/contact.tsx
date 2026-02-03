"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, Send, Terminal, Sparkles } from 'lucide-react';
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

  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') processCommand();
  };

  const processCommand = () => {
    const addRegex = /^git add \. /;
    const commitRegex = /^git commit -m "(.*)"/;
    const pushRegex = /^git push origin prince$/;

    if (addRegex.test(command)) {
      const message = addRegex.exec(command)?.[1] || '';
      setFormData({ ...formData, message });
      setCommand('');
      setFormStatus('');
    } else if (commitRegex.test(command)) {
      const email = commitRegex.exec(command)?.[1] || '';
      setFormData({ ...formData, email });
      setCommand('');
      setFormStatus('');
    } else if (pushRegex.test(command)) {
      handleSubmit();
      setCommand('');
    } else {
      setFormStatus('Invalid command');
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
    <section className="py-8 sm:py-10">
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
                  className={`group flex items-center gap-2 sm:gap-3 p-3 sm:p-4 card-premium transition-all duration-200 ${link.color}`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 rounded-lg bg-muted group-hover:bg-transparent transition-colors">
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
              <span className="flex-1 text-center text-xs text-muted-foreground font-mono">git — contact</span>
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            {/* Terminal Content */}
            <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm space-y-3">
              <p className="text-muted-foreground text-xs">
                <span className="text-primary font-bold">$</span> Send a message using git commands:
              </p>

              <div className="space-y-1.5 p-2.5 sm:p-3 rounded-lg bg-muted/30 border border-border text-xs">
                <p className="flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-emerald-500 font-bold">$</span>
                  <span className="text-muted-foreground">git add .</span>
                  <span className="text-foreground truncate">&quot;{formData.message || 'message...'}&quot;</span>
                  {formData.message && <span className="text-emerald-500">✓</span>}
                </p>
                <p className="flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-emerald-500 font-bold">$</span>
                  <span className="text-muted-foreground">git commit -m</span>
                  <span className="text-foreground truncate">&quot;{formData.email || 'email'}&quot;</span>
                  {formData.email && <span className="text-emerald-500">✓</span>}
                </p>
                <p className="text-muted-foreground flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">$</span>
                  <span>git push origin prince</span>
                </p>
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 border border-border focus-within:border-primary/50 transition-colors">
                <span className="text-primary font-bold">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={handleCommandChange}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/50 text-xs sm:text-sm min-w-0"
                  placeholder="Type git command..."
                />
                <motion.button
                  onClick={processCommand}
                  className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {formStatus && (
                <motion.p
                  className={`text-xs ${formStatus.includes('✓') ? 'text-emerald-500' : 'text-muted-foreground'}`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {formStatus}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
