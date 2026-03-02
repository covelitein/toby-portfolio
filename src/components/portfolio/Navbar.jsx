"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Terminal, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ onCommandPaletteOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) =>
        item.href.replace("#", "")
      );
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center group-hover:shadow-lg group-hover:shadow-red-600/30 transition-shadow">
              <Terminal className="w-4 h-4 text-white" />
            </div>
            <span className="font-mono text-white font-semibold tracking-tight">
              alex<span className="text-red-500">.dev</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-500"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Command Palette Button + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onCommandPaletteOpen}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-gray-400 bg-[#111] border border-[#222] rounded-lg hover:border-red-500/50 hover:text-white transition-colors"
            >
              <Command className="w-3 h-3" />
              <span className="font-mono">Ctrl+K</span>
            </button>
            <Button
              onClick={(e) => handleNavClick(e, "#contact")}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 h-auto hover:shadow-lg hover:shadow-red-600/25 transition-all"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[#0a0a0a]/98 border-b border-[#1a1a1a]"
      >
        <div className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.href.replace("#", "")
                  ? "bg-red-600/20 text-white"
                  : "text-gray-400 hover:bg-[#111] hover:text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <Button
            onClick={(e) => handleNavClick(e, "#contact")}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white"
          >
            Get in Touch
          </Button>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
