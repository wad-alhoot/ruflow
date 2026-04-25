"use client";

import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// PLACEHOLDER trust row — swap for real buyer/logistics partners when provided
const trustLines = [
  "Global OEM Clients",
  "Export to 25+ Countries",
  "ISO 9001 In Progress",
  "EN 388 Testing Active",
  "CE Marking Pathway",
  "SEDEX-SMETA Planned",
  "Registered Export Entity",
  "B2B Private Label Ready",
];

export default function TrustLogos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section
      ref={ref}
      className="relative py-14 bg-[#F1F5F9] border-y border-[#E2E8F0] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-[1440px] mx-auto"
      >
        <div className="px-6 lg:px-12 mb-6 flex items-center justify-center gap-2 text-[11px] tracking-[0.35em] uppercase text-[#64748B] font-semibold">
          <span className="w-8 h-px bg-[#CBD5E1]" />
          Trusted Commitments
          <span className="w-8 h-px bg-[#CBD5E1]" />
        </div>

        <Marquee speed={40} gradient gradientColor="#F1F5F9" gradientWidth={120}>
          {trustLines.concat(trustLines).map((line, i) => (
            <div
              key={`${line}-${i}`}
              className="flex items-center gap-3 mx-8 font-display text-[20px] lg:text-[26px] font-semibold text-[#0B1F3A] whitespace-nowrap"
            >
              <span>{line}</span>
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
