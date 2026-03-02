"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Copy, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfo } from "@/data/mock";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0a]">
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
              07.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Get In Touch
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
            Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="p-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 space-y-8">
                {/* Email Section */}
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                    Direct Email
                  </h3>
                  <div className="flex items-center justify-between p-4 bg-[#111] border border-[#222] rounded-xl group-hover:border-red-900/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-900/20 text-red-500 rounded-lg">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="text-gray-300 font-medium">{personalInfo.email}</span>
                    </div>
                    <button
                      onClick={copyEmail}
                      className="p-2 text-gray-500 hover:text-white hover:bg-[#222] rounded-lg transition-colors"
                      title="Copy email address"
                    >
                      {copiedEmail ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Secure Communication */}
                <div>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                    Secure Communication
                  </h3>
                  <div className="p-4 bg-[#111] border border-[#222] rounded-xl">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 text-cyan-500">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="font-medium text-sm">PGP Fingerprint</span>
                      </div>
                      <code className="text-xs text-gray-500 font-mono break-all bg-[#0a0a0a] p-3 rounded-lg border border-[#1a1a1a]">
                        4A8B 9C2D 1F3E 7H5J 8K9L 2M4N 6P8Q 0R2T
                      </code>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 text-gray-400">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links Grid */}
            <div>
              <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                Social Profiles
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(personalInfo.socialLinks).map(([platform, url], i) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center justify-center p-4 bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl hover:border-red-900/50 hover:bg-red-900/5 transition-all group"
                  >
                    <span className="text-gray-400 group-hover:text-white font-medium capitalize z-10">
                      {platform}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl relative">
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-mono text-sm"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-mono text-sm"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all font-mono text-sm resize-none"
                      placeholder="How can I help you?"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={`w-full h-12 text-base font-medium transition-all ${
                    isSuccess
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:shadow-red-600/25"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Sending...</span>
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </form>

              {/* Form decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
