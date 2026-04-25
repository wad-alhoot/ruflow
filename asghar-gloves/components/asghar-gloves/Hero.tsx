"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Factory } from "lucide-react";
import { company } from "@/data/company";

const easing = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#061530] text-white">
      {/* Animated mesh gradient bg */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(245,158,11,0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(30,58,107,0.55) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 60% 10%, rgba(11,31,58,0.8) 0%, transparent 60%)",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-dark opacity-60" />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Content */}
      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pt-20 lg:pt-28 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left — text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing }}
              className="inline-flex items-center gap-2.5 px-4 h-8 rounded-full bg-white/5 border border-white/10 text-[11px] tracking-[0.25em] uppercase text-white/70 backdrop-blur-md"
            >
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-[#F59E0B] animate-ping opacity-60" />
                <span className="relative rounded-full w-1.5 h-1.5 bg-[#F59E0B]" />
              </span>
              Est. {company.foundedYear} · {company.yearsExperience} Years Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: easing }}
              className="mt-6 font-display font-bold text-[42px] leading-[1.05] sm:text-5xl lg:text-[68px] xl:text-[78px] tracking-tight"
            >
              Engineered for <span className="text-gradient-amber">Industry.</span>
              <br />
              Crafted for <span className="text-white/90">Safety.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18, ease: easing }}
              className="mt-6 max-w-2xl text-white/65 text-[15px] lg:text-[17px] leading-relaxed"
            >
              Asghar Gloves manufactures high-quality protective and industrial gloves
              from Faisalabad, Pakistan — serving steel mills, construction sites,
              oil &amp; gas operations, and global OEM buyers with 16 years of craftsmanship.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: easing }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#products"
                className="group inline-flex items-center gap-2.5 h-12 lg:h-13 px-6 lg:px-7 rounded-full bg-[#F59E0B] hover:bg-[#FBBF24] text-[#0B1F3A] font-semibold text-[14px] lg:text-[15px] tracking-wide transition-all"
              >
                Explore Our Catalog
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 h-12 lg:h-13 px-6 lg:px-7 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-semibold text-[14px] lg:text-[15px] tracking-wide transition-all backdrop-blur"
              >
                Request a Sample
              </a>
            </motion.div>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: easing }}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[12px] text-white/50"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>Registered Export Entity</span>
              </div>
              <div className="flex items-center gap-2">
                <Factory className="w-4 h-4 text-[#F59E0B]" />
                <span>In-house Manufacturing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                <span>Global OEM &amp; Private Label</span>
              </div>
            </motion.div>
          </div>

          {/* Right — image stack */}
          <div className="lg:col-span-5">
            <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
              {/* Primary card */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: easing }}
                className="absolute top-0 right-0 w-[78%] h-[68%] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#1E3A6B]/40 to-[#061530]/40 backdrop-blur-sm"
              >
                <PlaceholderGloveTile label="Hot Mill Gloves" accent="#F59E0B" pattern="mill" />
              </motion.div>

              {/* Secondary card — offset bottom-left */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.35, ease: easing }}
                className="absolute bottom-0 left-0 w-[58%] h-[50%] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#0B1F3A]/60 to-[#1E3A6B]/60 backdrop-blur-sm shadow-2xl shadow-black/40"
              >
                <PlaceholderGloveTile label="Nitrile Dipped" accent="#FBBF24" pattern="dots" />
              </motion.div>

              {/* Accent card — small top-left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease: easing }}
                className="absolute top-[18%] left-[4%] w-[34%] h-[28%] rounded-xl overflow-hidden border border-[#F59E0B]/30 bg-[#F59E0B]/10 backdrop-blur-md flex items-center justify-center"
              >
                <div className="text-center px-3">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-[#FBBF24]">
                    Since
                  </div>
                  <div className="font-display text-4xl font-bold text-white mt-0.5">
                    2010
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#061530] to-transparent pointer-events-none" />
    </section>
  );
}

/** Placeholder glove tile — SVG-composed visual until real photography is added. */
function PlaceholderGloveTile({
  label,
  accent,
  pattern,
}: {
  label: string;
  accent: string;
  pattern: "mill" | "dots";
}) {
  return (
    <div className="relative w-full h-full">
      {/* Gradient bg */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, ${accent}33 0%, transparent 60%),
            linear-gradient(135deg, #0B1F3A 0%, #1E3A6B 100%)
          `,
        }}
      />

      {/* Pattern */}
      {pattern === "dots" && (
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle, ${accent} 1.5px, transparent 1.5px)`,
            backgroundSize: "18px 18px",
          }}
        />
      )}
      {pattern === "mill" && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `repeating-linear-gradient(45deg, ${accent}40 0px, ${accent}40 2px, transparent 2px, transparent 18px)`,
          }}
        />
      )}

      {/* Glove silhouette SVG */}
      <svg
        viewBox="0 0 200 240"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] h-[68%]"
      >
        <path
          d="M70 60 Q70 30 90 30 Q110 30 110 60 L110 100 L125 100 Q140 100 140 75 Q140 55 155 55 Q170 55 170 80 L170 140 Q170 200 130 220 L80 220 Q45 210 40 170 L35 130 Q32 115 45 112 Q60 110 60 125 L60 145 L70 145 Z"
          fill={accent}
          fillOpacity="0.85"
          stroke={accent}
          strokeWidth="1.5"
        />
      </svg>

      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
        <div>
          <div className="text-[9px] tracking-[0.28em] uppercase text-white/50">
            Featured
          </div>
          <div className="text-[14px] font-semibold text-white tracking-wide mt-0.5">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
}
