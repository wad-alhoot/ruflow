"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className="relative h-[350px] md:h-[450px] overflow-hidden">
      {/* Parallax background image */}
      <motion.div
        className="absolute inset-[-20%] bg-cover bg-center"
        style={{
          y,
          backgroundImage:
            "url('/images/gallery-sportswear.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1B4332]/70" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[#D4A843] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
            Your Trusted Manufacturing Partner
          </p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl mx-auto">
            Custom Sportswear, Gloves &{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #D4A843, #E8C96A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Textile Solutions
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg mt-4 max-w-2xl mx-auto">
            From team jerseys and industrial gloves to medical wear and home
            textiles — we manufacture and export quality products worldwide.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
