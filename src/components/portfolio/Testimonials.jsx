"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/mock";

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col justify-between p-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl hover:border-red-900/30 transition-all duration-300 h-full"
    >
      {/* Decorative Quote Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
        className="absolute top-6 right-8 text-[#222] group-hover:text-red-900/20 transition-colors duration-300"
      >
        <Quote className="w-12 h-12" />
      </motion.div>

      <div className="relative z-10 mb-8">
        {/* Quote Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.1 }}
          className="text-gray-300 text-lg leading-relaxed pt-4 relative"
        >
          "{testimonial.quote}"
        </motion.p>
      </div>

      {/* Author Info */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 + index * 0.1 }}
        className="relative z-10 flex items-center gap-4 pt-6 border-t border-[#1a1a1a]"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-white font-bold text-lg">
          {testimonial.author.charAt(0)}
        </div>
        <div>
          <h4 className="text-white font-bold">{testimonial.author}</h4>
          <p className="text-red-500 font-mono text-sm">{testimonial.role}</p>
          <p className="text-gray-500 text-sm">{testimonial.company}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 bg-[#080808]">
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
              06.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Recommendations
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
            What people I've worked with have to say about my approach to engineering and collaboration.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
