"use client";

import React, { useState, useEffect } from "react";

const TypeWriter = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = "",
  cursor = true,
  onComplete = () => {} 
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let timeoutId = null;
    let index = 0;
    
    setDisplayedText("");

    const typeNextChar = () => {
      if (!isMounted) return;
      
      if (index < text.length) {
        index++;
        setDisplayedText(text.slice(0, index));
        timeoutId = setTimeout(typeNextChar, speed);
      } else {
        onComplete();
      }
    };

    // Start after delay
    timeoutId = setTimeout(typeNextChar, delay);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, speed, delay]); // Removed onComplete from deps to avoid re-triggers

  // Blinking cursor
  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <span
          className={`inline-block w-[2px] h-[1em] ml-1 bg-red-500 align-middle transition-opacity duration-100 ${
            showCursor ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </span>
  );
};

export default TypeWriter;
