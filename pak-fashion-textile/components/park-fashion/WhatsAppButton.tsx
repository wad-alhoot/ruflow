"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "@/data/park-fashion-products";

interface Props {
  productName?: string;
}

export default function WhatsAppButton({ productName }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  const message = productName
    ? `Hi, I'm interested in: ${productName}. Please share pricing and availability.`
    : "Hi Pak Fashion Textile, I'd like to inquire about your products.";

  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(message)}`;

  // Show tooltip on first load, auto-hide after 3 seconds
  useEffect(() => {
    const timer1 = setTimeout(() => setShowTooltip(true), 1500);
    const timer2 = setTimeout(() => setShowTooltip(false), 4500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Contact us on WhatsApp"
      onMouseEnter={() => setShowTooltip(false)}
    >
      {/* Concentric pulse rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-15" />
      <span
        className="absolute rounded-full bg-[#25D366] opacity-10 animate-ping"
        style={{
          inset: "-6px",
          animationDelay: "0.4s",
          animationDuration: "1.8s",
        }}
      />
      <span
        className="absolute rounded-full bg-[#25D366] opacity-[0.06] animate-ping"
        style={{
          inset: "-12px",
          animationDelay: "0.8s",
          animationDuration: "2.2s",
        }}
      />

      {/* Speech bubble tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none"
          >
            <div className="relative bg-white text-[#1B4332] text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xl">
              Chat with us!
              {/* Arrow pointing right */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <span className="relative flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]">
        {/* Icon-only on mobile (w-14 h-14), larger on desktop (w-16 h-16) */}
        <span className="flex items-center justify-center w-14 h-14 lg:hidden">
          <MessageCircle size={26} />
          {/* Online status dot - mobile */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-300 border-2 border-[#25D366]">
            <span className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-75" />
          </span>
        </span>
        <span className="hidden lg:flex items-center gap-2.5 px-7 py-[18px] font-semibold text-sm">
          <span className="relative">
            <MessageCircle size={20} />
          </span>
          WhatsApp Us
          {/* Online status dot - desktop */}
          <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-green-300 border-2 border-[#25D366]">
            <span className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-75" />
          </span>
        </span>
      </span>
    </a>
  );
}
