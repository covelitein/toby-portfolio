"use client";

import React, { useState, useEffect } from "react";

const GlitchText = ({ text, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Random glitch intervals
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 z-20 text-red-500 opacity-80"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, -1px)",
              animation: "glitch-1 0.2s infinite linear alternate-reverse",
            }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 z-20 text-cyan-400 opacity-80"
            style={{
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 1px)",
              animation: "glitch-2 0.3s infinite linear alternate-reverse",
            }}
          >
            {text}
          </span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
