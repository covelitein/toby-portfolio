"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, Zap, Target, TrendingUp } from "lucide-react";
import { caseStudies } from "@/data/mock";

const CaseStudyCard = ({ study, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="group relative bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden hover:border-red-900/30 transition-colors"
    >
      {/* Abstract Background Graphic */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-900/10 transition-colors duration-500" />
      
      <div className="relative p-8 sm:p-10">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 group-hover:text-red-400 transition-colors">
          {study.title}
        </h3>

        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
          {/* Problem & Constraints */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h4 className="text-lg font-semibold text-white">The Problem</h4>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {study.problem}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-yellow-500" />
                <h4 className="text-lg font-semibold text-white">Constraints</h4>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {study.constraints}
              </p>
            </div>
          </div>

          {/* Approach & Result */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-cyan-500" />
                <h4 className="text-lg font-semibold text-white">Approach</h4>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {study.approach}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <h4 className="text-lg font-semibold text-white">Result</h4>
              </div>
              <div className="p-4 bg-green-900/10 border border-green-900/20 rounded-lg">
                <p className="text-green-400 font-medium leading-relaxed text-sm sm:text-base">
                  {study.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudies = () => {
  return (
    <section id="case-studies" className="relative py-24 bg-[#0a0a0a]">
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
              05.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Case Studies
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
            Deep dives into complex technical challenges and how I architectural solutions for them.
          </motion.p>
        </motion.div>

        {/* Case Studies List */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
