"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/mock";
import TerminalWidget from "./TerminalWidget";
import GlitchText from "./animations/GlitchText";
import TypeWriter from "./animations/TypeWriter";

const Hero = () => {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Subtle scanlines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
          }}
        />
        {/* Animated grid overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.015 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-red-900/5 via-transparent to-transparent" />
        
        {/* Animated orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-red-600 rounded-full blur-[128px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red-800 rounded-full blur-[128px]"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Status badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-red-900/20 border border-red-900/30 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-mono text-red-400">
                {personalInfo.availability}
              </span>
            </motion.div>

            {/* Name with Glitch Effect */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
            >
              <GlitchText text={personalInfo.name} />
            </motion.h1>

            {/* Role with TypeWriter */}
            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl text-red-500 font-mono mb-6 h-8"
            >
              <TypeWriter 
                text={personalInfo.role} 
                speed={80} 
                delay={800}
                cursor={true}
              />
            </motion.div>

            {/* Tagline with fade-in */}
            <motion.div
              variants={itemVariants}
              className="mb-8 max-w-lg h-14"
            >
              <AnimatePresence>
                {showTagline && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-gray-400 text-lg leading-relaxed"
                  >
                    {personalInfo.tagline}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTAs with hover animations */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => handleScroll("#projects")}
                  className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-6 py-3 h-auto text-base font-medium hover:shadow-lg hover:shadow-red-600/25 transition-all group"
                >
                  <span className="relative z-10">View Projects</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => handleScroll("#contact")}
                  variant="outline"
                  className="border-[#333] text-white hover:bg-white/5 hover:border-red-500/50 px-6 py-3 h-auto text-base font-medium transition-all"
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Links with stagger */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                Connect
              </span>
              <motion.div 
                className="h-px w-8 bg-[#333]"
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.8, delay: 1.5 }}
              />
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: personalInfo.socialLinks.github },
                  { icon: Linkedin, href: personalInfo.socialLinks.linkedin },
                  { icon: Twitter, href: personalInfo.socialLinks.twitter },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-500 hover:text-white hover:bg-red-600/20 rounded-lg transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000"
          >
            <TerminalWidget />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => handleScroll("#about")}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
