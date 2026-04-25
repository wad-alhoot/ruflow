"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const chapters = [
  {
    step: "01",
    title: "Sourcing",
    body: "Raw cotton, polyester, and nitrile compounds sourced from audited regional suppliers. Material lot traceability at intake.",
    accent: "#F59E0B",
  },
  {
    step: "02",
    title: "Knitting & Cutting",
    body: "Seamless knitting on computerized 13-gauge machines. Cut-and-sewn families precision-patterned by size chart.",
    accent: "#FBBF24",
  },
  {
    step: "03",
    title: "Treatment & Dipping",
    body: "Palm dipping and dot-application lines with temperature-controlled cure. Bleach baths for interlock families.",
    accent: "#F59E0B",
  },
  {
    step: "04",
    title: "Finishing & QC",
    body: "Overlock stitching, inside-out inspection, and hand-quality checks on every bundle. Random lot testing.",
    accent: "#FBBF24",
  },
  {
    step: "05",
    title: "Packing & Export",
    body: "Private-label ready — your brand, your carton spec. Export documentation prepared for global freight.",
    accent: "#F59E0B",
  },
];

export default function ManufacturingStory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="manufacturing"
      className="relative bg-[#061530] text-white overflow-hidden"
    >
      {/* Grid + noise */}
      <div className="absolute inset-0 grid-pattern-dark opacity-50" />
      <div className="absolute inset-0 noise-overlay" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(245,158,11,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
            <span className="w-8 h-px bg-[#F59E0B]" />
            The Asghar Standard
          </div>
          <h2 className="mt-4 font-display text-[36px] lg:text-[56px] leading-[1.08] font-bold tracking-tight">
            Five steps from raw fibre to{" "}
            <span className="text-gradient-amber">export-ready pair.</span>
          </h2>
          <p className="mt-5 text-[15px] lg:text-[17px] text-white/65 leading-relaxed max-w-2xl">
            Every glove passes through the same in-house chain — from source yarn
            to sealed carton — so what we ship is what we&apos;d wear ourselves.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-5 gap-5 lg:gap-6">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.step}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="group relative h-full rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#F59E0B]/40 p-6 lg:p-7 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]">
                <div
                  className="font-display text-[44px] lg:text-[54px] font-bold leading-none opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ color: ch.accent }}
                >
                  {ch.step}
                </div>
                <h3 className="mt-4 font-display text-[20px] font-bold text-white">
                  {ch.title}
                </h3>
                <p className="mt-3 text-[13px] text-white/60 leading-relaxed">
                  {ch.body}
                </p>

                {/* Connector line (desktop) */}
                {i < chapters.length - 1 && (
                  <div className="hidden lg:block absolute top-14 -right-3 w-6 h-px bg-gradient-to-r from-[#F59E0B]/40 to-transparent" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
