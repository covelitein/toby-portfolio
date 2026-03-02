"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Terminal, Github, Linkedin, Twitter } from "lucide-react";
import { personalInfo } from "@/data/mock";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050505] border-t border-[#1a1a1a] pt-16 pb-8 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 items-end mb-12">
          {/* Brand & Info */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-[#111] border border-[#222] rounded flex items-center justify-center">
                <Terminal className="w-4 h-4 text-gray-400" />
              </div>
              <span className="font-mono text-white font-semibold tracking-tight">
                toby<span className="text-red-500">.dev</span>
              </span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-500 text-sm max-w-sm leading-relaxed"
            >
              Building exceptional digital experiences with modern architecture and clean code.
            </motion.p>
          </div>

          {/* Quick Links & Back to Top */}
          <div className="flex flex-col md:items-end justify-between h-full gap-6">
            {/* Social Links Mini */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-4"
            >
              {[
                { icon: Github, href: personalInfo.socialLinks.github },
                { icon: Linkedin, href: personalInfo.socialLinks.linkedin },
                { icon: Twitter, href: personalInfo.socialLinks.twitter },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-[#111] rounded-lg"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </motion.div>

            {/* Back to top button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <div className="p-2 bg-[#111] border border-[#222] rounded-lg group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-all">
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 text-sm">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              Built with <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> React & Tailwind
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
