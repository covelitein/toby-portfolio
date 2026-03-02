"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { terminalLines } from "@/data/mock";

const TerminalWidget = () => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= terminalLines.length) {
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentTypingText("");
      }, 4000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = terminalLines[currentLineIndex];
    setIsTyping(true);
    setCurrentTypingText("");

    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setCurrentTypingText(currentLine.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        
        setTimeout(() => {
          setDisplayedLines((prev) => [...prev.slice(-4), currentLine]);
          setCurrentTypingText("");
          setCurrentLineIndex((prev) => prev + 1);
        }, 800);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [currentLineIndex]);

  const getLineColor = (line) => {
    if (line.includes("[SUCCESS]") || line.includes("[PASS]") || line.includes("[OK]")) {
      return "text-green-500";
    }
    if (line.includes("[SECURE]") || line.includes("[INFO]")) {
      return "text-cyan-400";
    }
    if (line.startsWith("$")) {
      return "text-red-500";
    }
    return "text-gray-300";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="relative w-full max-w-lg"
      style={{ perspective: "1000px" }}
    >
      {/* Terminal Window */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 2 }}
        transition={{ duration: 0.3 }}
        className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg overflow-hidden shadow-2xl shadow-red-900/10"
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#111111] border-b border-[#1a1a1a]">
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer"
          />
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full bg-yellow-500/80 cursor-pointer"
          />
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer"
          />
          <span className="ml-3 text-xs text-gray-500 font-mono">terminal — zsh</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 font-mono text-sm min-h-[180px] relative">
          {/* Scanlines overlay with flicker */}
          <motion.div
            animate={{ opacity: [0.02, 0.04, 0.02] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)",
            }}
          />

          {/* CRT flicker effect */}
          <motion.div
            animate={{ opacity: [0, 0.01, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
            className="absolute inset-0 bg-white pointer-events-none"
          />

          <AnimatePresence mode="popLayout">
            {displayedLines.map((line, index) => (
              <motion.div
                key={`${line}-${index}`}
                initial={{ opacity: 0, x: -10, filter: "blur(2px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className={`${getLineColor(line)} mb-1 leading-relaxed`}
              >
                {line}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Currently typing line */}
          {currentTypingText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${getLineColor(currentTypingText)} mb-1 leading-relaxed`}
            >
              {currentTypingText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-2 h-4 bg-current ml-0.5 align-middle"
              />
            </motion.div>
          )}

          {/* Idle cursor */}
          {!isTyping && !currentTypingText && (
            <div className="flex items-center mt-2">
              <span className="text-red-500 mr-2">$</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="w-2 h-4 bg-red-500"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Animated glow effect */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.02, 1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-2 bg-gradient-to-r from-red-900/20 via-transparent to-red-900/20 rounded-xl blur-xl -z-10"
      />
    </motion.div>
  );
};

export default TerminalWidget;
