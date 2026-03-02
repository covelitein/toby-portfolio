"use client";

import React from "react";
import { motion } from "framer-motion";
import { skills } from "@/data/mock";

const Skills = () => {
  // Staggered container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="skills" className="relative py-24 bg-[#080808]">
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.015 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(220,38,38,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

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
              className="text-red-500 font-mono text-sm"
            >
              02.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Skills & Tools
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:block h-px bg-[#222] max-w-xs"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl"
          >
            Technologies and frameworks I use to build exceptional mobile and web experiences.
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <motion.div
              key={category}
              variants={categoryVariants}
              className="group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: categoryIndex * 0.2 }}
                  className="w-1.5 h-1.5 bg-red-500 rounded-full"
                />
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wider">
                  {category}
                </h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {skillList.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    custom={categoryIndex * skillList.length + skillIndex}
                    variants={skillVariants}
                    whileHover={{ 
                      scale: 1.08,
                      backgroundColor: "rgba(220, 38, 38, 0.15)",
                      borderColor: "rgba(220, 38, 38, 0.5)",
                      color: "#fff",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1.5 text-sm bg-[#111] border border-[#222] rounded-lg text-gray-300 cursor-default transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration - Terminal style with animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg font-mono text-sm overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 text-gray-500"
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red-500"
            >
              $
            </motion.span>
            <span>npx skills --list --format=json</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-2 text-green-500"
          >
            [INFO] {Object.values(skills).flat().length} skills loaded successfully
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
