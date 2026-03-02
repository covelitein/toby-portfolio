"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Timeline from "@/components/portfolio/Timeline";
import CaseStudies from "@/components/portfolio/CaseStudies";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import CommandPalette from "@/components/portfolio/CommandPalette";
import MatrixRain from "@/components/portfolio/animations/MatrixRain";

export default function Home() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Setup command palette keyboard shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev: boolean) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={`App ${prefersReducedMotion ? "reduce-motion" : ""}`}>
      {!prefersReducedMotion && <MatrixRain opacity={0.02} />}

      <Navbar onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <CaseStudies />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}