"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, ArrowRight } from "lucide-react";
import { commandPaletteItems, projects } from "@/data/mock";

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const allItems = [
    ...commandPaletteItems,
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      label: `Open ${p.title}`,
      section: "projects",
      type: "project",
      shortcut: "",
    })),
  ];

  const filteredItems = allItems.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = useCallback(
    (item) => {
      if (item.section) {
        const element = document.getElementById(item.section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      onClose();
      setSearch("");
      setSelectedIndex(0);
    },
    [onClose]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
        setSearch("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleSelect, onClose]);

  useEffect(() => {
    if (search !== "") {
      setSelectedIndex(0);
    }
  }, [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
          >
            <div className="bg-[#0d0d0d] border border-[#222] rounded-xl overflow-hidden shadow-2xl shadow-red-900/20">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-[#222]">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none font-mono text-sm"
                />
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] rounded border border-[#333] font-mono">
                    esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No results found
                  </div>
                ) : (
                  <div className="space-y-1">
                    {/* Navigation Section */}
                    <div className="px-2 py-1.5 text-xs text-gray-500 font-mono uppercase tracking-wider">
                      Navigation
                    </div>
                    {filteredItems
                      .filter((item) => !item.type)
                      .map((item, index) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                            selectedIndex === index
                              ? "bg-red-900/30 text-white"
                              : "text-gray-400 hover:bg-[#1a1a1a]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <ArrowRight className="w-4 h-4" />
                            <span className="text-sm">{item.label}</span>
                          </div>
                          {item.shortcut && (
                            <kbd className="px-1.5 py-0.5 bg-[#1a1a1a] rounded border border-[#333] text-xs font-mono text-gray-500">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      ))}

                    {/* Projects Section */}
                    {filteredItems.some((item) => item.type === "project") && (
                      <>
                        <div className="px-2 py-1.5 mt-2 text-xs text-gray-500 font-mono uppercase tracking-wider">
                          Projects
                        </div>
                        {filteredItems
                          .filter((item) => item.type === "project")
                          .map((item, index) => {
                            const actualIndex =
                              filteredItems.filter((i) => !i.type).length + index;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                onMouseEnter={() => setSelectedIndex(actualIndex)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                                  selectedIndex === actualIndex
                                    ? "bg-red-900/30 text-white"
                                    : "text-gray-400 hover:bg-[#1a1a1a]"
                                }`}
                              >
                                <Command className="w-4 h-4" />
                                <span className="text-sm">{item.label}</span>
                              </button>
                            );
                          })}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#222] text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[#1a1a1a] rounded border border-[#333] font-mono">↑↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[#1a1a1a] rounded border border-[#333] font-mono">↵</kbd>
                    select
                  </span>
                </div>
                <span className="font-mono text-red-500/70">v1.0.0</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
