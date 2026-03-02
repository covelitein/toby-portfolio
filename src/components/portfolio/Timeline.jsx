"use client";

import React from "react";
import { motion } from "framer-motion";
import { experience } from "@/data/mock";

const TimelineItem = ({ item, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex justify-center w-full mb-16 last:mb-0">
      {/* Center Line Dot */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0a0a0a] border-2 border-red-500 rounded-full z-10"
      >
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-red-500 rounded-full"
        />
      </motion.div>

      {/* Content Card */}
      <div className={`w-full flex ${isEven ? 'md:justify-end' : 'md:justify-start'} pl-12 md:pl-0`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 lg:pr-16' : 'md:pl-12 lg:pl-16'}`}
        >
          <div className="group relative p-6 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl hover:border-red-900/50 transition-colors">
            {/* Connecting Line (Desktop) */}
            <div className={`hidden md:block absolute top-[14px] w-12 lg:w-16 h-px bg-[#222] group-hover:bg-red-900/50 transition-colors ${
              isEven ? 'right-0' : 'left-0 right-auto'
            }`} />

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/0 via-red-900/0 to-red-900/0 group-hover:from-red-900/5 group-hover:via-transparent group-hover:to-transparent rounded-xl transition-all duration-500" />

            <div className="relative z-10">
              <span className="inline-block px-3 py-1 mb-4 text-xs font-mono text-red-400 bg-red-900/10 border border-red-900/20 rounded-full">
                {item.period}
              </span>

              <h3 className="text-xl font-bold text-white mb-1">
                {item.role}
              </h3>
              <h4 className="text-lg text-gray-400 mb-4">
                {item.company}
              </h4>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              <ul className="space-y-3">
                {item.achievements.map((achievement, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="flex items-start text-sm text-gray-500"
                  >
                    <span className="mr-3 text-red-500 font-mono mt-0.5">›</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <section id="experience" className="relative py-24 bg-[#080808]">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-red-500 font-mono text-sm"
            >
              04.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Experience
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
            My professional journey building mobile and web applications.
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute left-[20px] md:left-1/2 -translate-x-[0.5px] top-0 bottom-0 w-px bg-gradient-to-b from-[#333] via-red-900/50 to-transparent origin-top"
          />

          {/* Timeline Items */}
          <div className="relative py-10">
            {experience.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
