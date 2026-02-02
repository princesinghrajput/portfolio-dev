"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, Send, Terminal } from 'lucide-react';
import { TwitterLogoIcon } from '@radix-ui/react-icons';

const socialLinks = [
  { name: "Email", href: "mailto:psr8084@gmail.com", icon: Mail },
  { name: "Twitter", href: "https://x.com/its_me_prince1_", icon: () => <TwitterLogoIcon className="h-3.5 w-3.5" /> },
  { name: "GitHub", href: "https://github.com/princesinghrajput", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/prince-kumar-05", icon: Linkedin },
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
    const addRegex = /^git add \. "(.*)"/;
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
    <section className="section">
      {/* Header */}
      <div className="section-header">
        <div className="flex items-center gap-1.5 label mb-2">
          <MessageSquare className="w-3.5 h-3.5 text-primary" />
          <span>Contact</span>
        </div>
        <h2 className="section-title">Get in Touch</h2>
      </div>

      {/* Social */}
      <div className="flex flex-wrap gap-2 mb-6">
        {socialLinks.map((link, index) => {
          const IconComponent = link.icon;
          return (
            <motion.a
              key={index}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3 py-2 card border border-border text-xs font-medium hover:border-primary/40 transition-colors"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {typeof IconComponent === 'function' ? <IconComponent /> : <IconComponent className="h-3.5 w-3.5" />}
              </span>
              <span>{link.name}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Terminal */}
      <div className="card overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 border-b border-border">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <span className="flex-1 text-center text-xs text-muted-foreground font-mono">git</span>
          <Terminal className="w-3 h-3 text-muted-foreground" />
        </div>

        {/* Content */}
        <div className="p-4 font-mono text-xs">
          <p className="text-muted-foreground mb-3">
            <span className="text-primary">$</span> Send a message using git:
          </p>

          <div className="space-y-1 mb-4 p-3 rounded-md bg-muted/30 border border-border">
            <p><span className="text-emerald-500">$</span> git add . "{formData.message || '...'}" {formData.message && <span className="text-emerald-500">✓</span>}</p>
            <p><span className="text-emerald-500">$</span> git commit -m "{formData.email || '...'}" {formData.email && <span className="text-emerald-500">✓</span>}</p>
            <p className="text-muted-foreground"><span className="text-emerald-500">$</span> git push origin prince</p>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50 border border-border focus-within:border-primary/50 transition-colors">
            <span className="text-primary font-bold">$</span>
            <input
              type="text"
              value={command}
              onChange={handleCommandChange}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/50"
              placeholder="git command..."
            />
            <motion.button
              onClick={processCommand}
              className="p-1.5 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-3 h-3" />
            </motion.button>
          </div>

          {formStatus && (
            <motion.p
              className={`mt-3 ${formStatus.includes('✓') ? 'text-emerald-500' : 'text-muted-foreground'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formStatus}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
