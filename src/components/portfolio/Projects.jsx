"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code2, Layers, Cpu, Database, Server, Smartphone, Layout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/mock";
import TiltCard from "./animations/TiltCard";

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  mobile: Smartphone,
  database: Database,
  infrastructure: Cpu,
  architecture: Layers,
  default: Code2,
};

const ProjectCard = ({ project, onClick }) => {
  return (
    <TiltCard intensity={10} className="h-full">
      <motion.div
        layoutId={`project-${project.id}`}
        onClick={onClick}
        className="group relative h-full flex flex-col bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl overflow-hidden cursor-pointer hover:border-red-900/50 transition-colors"
      >
        {/* Project Image Area */}
        <div className="relative h-48 overflow-hidden bg-[#111]">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          
          {/* Placeholder/Image overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Layers className="w-12 h-12 text-[#222] group-hover:scale-110 group-hover:text-red-500/20 transition-all duration-500" />
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <motion.h3 
                layoutId={`title-${project.id}`}
                className="text-xl font-bold text-white group-hover:text-red-500 transition-colors"
              >
                {project.title}
              </motion.h3>
              <p className="text-sm font-mono text-gray-500 mt-1">{project.role}</p>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
              <ArrowRight className="w-5 h-5 text-red-500" />
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-[#1a1a1a] text-gray-400 rounded border border-[#222]"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="px-2 py-1 text-xs font-mono bg-[#1a1a1a] text-gray-500 rounded border border-[#222]">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          layoutId={`project-${project.id}`}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl shadow-2xl"
        >
          {/* Header Image */}
          <div className="relative h-64 sm:h-80 bg-[#111] overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(220,38,38,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.1) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-600 border border-white/10 rounded-full text-white backdrop-blur-md transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
              <div>
                <motion.h2 
                  layoutId={`title-${project.id}`}
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                >
                  {project.title}
                </motion.h2>
                <p className="text-red-500 font-mono">{project.role}</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="border-[#333] text-white hover:bg-[#1a1a1a] h-10 px-4"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white h-10 px-4"
                  onClick={() => window.open(project.liveUrl, "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Overview</h3>
                  <p className="text-gray-400 leading-relaxed text-lg">
                    {project.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Key Metrics</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-[#111] border border-[#1a1a1a] rounded-lg">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <span className="text-gray-300 font-mono text-sm">{metric}</span>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h3 className="text-xl font-bold text-white mb-4">Business Value</h3>
                  <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-lg">
                    <p className="text-red-400 font-medium">
                      {project.value}
                    </p>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-sm font-mono text-gray-500 uppercase tracking-wider mb-4">
                    Tech Stack
                  </h3>
                  <div className="flex flex-col gap-2">
                    {project.stack.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center gap-3 p-3 bg-[#111] border border-[#1a1a1a] rounded-lg"
                      >
                        <Code2 className="w-4 h-4 text-red-500" />
                        <span className="text-gray-300 text-sm font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="relative py-24 bg-[#0a0a0a]">
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
              03.
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl font-bold text-white"
            >
              Featured Work
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
            A selection of production applications I've architected and built, focusing on performance and scalability.
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
