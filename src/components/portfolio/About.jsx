"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, CheckCircle, Smartphone } from "lucide-react";
import { bio, quickFacts } from "@/data/mock";
import AnimatedCounter from "./animations/AnimatedCounter";

const iconMap = {
  MapPin: MapPin,
  Briefcase: Briefcase,
  CheckCircle: CheckCircle,
  Smartphone: Smartphone,
};

const About = () => {
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Text reveal animation
  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  return (
    <section id="about" className="relative py-24 bg-[#0a0a0a]">
      {/* Section background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-red-500 font-mono text-sm"
            >
              01.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              About Me
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:block h-px bg-[#222] max-w-xs"
            />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Bio - Left Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-3"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              {bio.split("\n\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  custom={index}
                  variants={textRevealVariants}
                  className="text-gray-400 leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Terminal-style decoration with typing animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-4 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg font-mono text-sm overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <span className="text-gray-500">$ </span>
                <span className="text-red-500">whoami</span>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-gray-400 mt-2"
              >
                fullstack_mobile_dev | building apps that matter
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Quick Facts - Right Column */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {quickFacts.map((fact, index) => {
                const IconComponent = iconMap[fact.icon];
                return (
                  <motion.div
                    key={fact.label}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      x: 5,
                      transition: { duration: 0.2 } 
                    }}
                    className="group p-4 bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg hover:border-red-900/50 transition-all cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 flex items-center justify-center bg-red-900/20 rounded-lg text-red-500 group-hover:bg-red-900/30 transition-colors"
                      >
                        {IconComponent && <IconComponent className="w-5 h-5" />}
                      </motion.div>
                      <div>
                        <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                          {fact.label}
                        </p>
                        <p className="text-white font-medium">
                          {fact.label === "Experience" ? (
                            <><AnimatedCounter target={6} duration={1.5} suffix="+ Years" /></>
                          ) : fact.label === "Apps Shipped" ? (
                            <><AnimatedCounter target={15} duration={1.5} suffix="+ Production" /></>
                          ) : (
                            fact.value
                          )}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Status indicator with pulse animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="mt-6 p-4 bg-green-900/10 border border-green-900/30 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm text-green-400 font-mono">
                  Available for new projects
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
