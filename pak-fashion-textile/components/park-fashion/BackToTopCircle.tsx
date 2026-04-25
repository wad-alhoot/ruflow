"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTopCircle() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setShow(scrollTop > 600);
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const circumference = 2 * Math.PI * 20;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 left-6 z-50 w-12 h-12 flex items-center justify-center group"
          title="Back to top"
        >
          {/* SVG progress ring */}
          <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(45,106,79,0.15)"
              strokeWidth="2.5"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-150"
            />
          </svg>

          {/* Center icon */}
          <div className="relative w-9 h-9 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shadow-lg group-hover:bg-[#1B4332] transition-colors">
            <ArrowUp size={16} />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
