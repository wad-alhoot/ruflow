"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { company } from "@/data/company";

export default function AboutBrand() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 items-start">
        {/* Left — label + visual */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
              <span className="w-8 h-px bg-[#F59E0B]" />
              Our Story
            </div>
            <h2 className="mt-4 font-display text-[36px] lg:text-[56px] leading-[1.05] font-bold text-[#0B1F3A] tracking-tight">
              Sixteen years of{" "}
              <span className="text-gradient-amber">quiet craftsmanship.</span>
            </h2>
          </motion.div>

          {/* Framed visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 relative aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#1E3A6B] border border-[#E2E8F0]"
          >
            <div className="absolute inset-0 grid-pattern-dark opacity-40" />
            <div className="absolute inset-0 noise-overlay" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 30%, rgba(245,158,11,0.2), transparent 55%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
              <div className="text-[10px] tracking-[0.35em] uppercase text-[#FBBF24] font-semibold">
                Faisalabad · Pakistan
              </div>
              <div className="mt-2 font-display text-[32px] lg:text-[40px] font-bold text-white leading-[1.05]">
                Where Industrial<br />Heritage Meets<br />Modern Precision.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right — story chapters */}
        <div className="lg:col-span-7 space-y-12 lg:space-y-16">
          {[
            company.copy.journey,
            company.copy.growth,
            company.copy.whyUs,
          ].map((chapter, i) => (
            <motion.div
              key={chapter.heading}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative pl-8 lg:pl-12 border-l-2 border-[#F59E0B]/30 hover:border-[#F59E0B] transition-colors"
            >
              <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-[#F59E0B]" />
              <div className="text-[11px] tracking-[0.28em] uppercase text-[#F59E0B] font-semibold">
                Chapter {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-3 font-display text-[26px] lg:text-[32px] font-bold text-[#0B1F3A] tracking-tight">
                {chapter.heading}
              </h3>
              <p className="mt-4 text-[15px] lg:text-[17px] text-[#475569] leading-[1.7]">
                {chapter.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
