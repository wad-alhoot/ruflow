"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { company } from "@/data/company";

const stats = [
  {
    label: "Years of experience",
    value: company.stats.yearsExperience,
    suffix: "+",
    note: `Since ${company.foundedYear}`,
  },
  {
    label: "Pairs monthly capacity",
    value: company.stats.monthlyCapacity,
    suffix: "+",
    note: "In-house production",
    compact: true,
  },
  {
    label: "Countries served",
    value: company.stats.countriesServed,
    suffix: "+",
    note: "Across 4 continents",
  },
  {
    label: "Product families",
    value: company.stats.productLines,
    suffix: "+",
    note: "Cotton · Dipped · Heat-resist",
  },
];

export default function ScaleCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section ref={ref} className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
            <span className="w-8 h-px bg-[#F59E0B]" />
            By the Numbers
          </div>
          <h2 className="mt-4 font-display text-[36px] lg:text-[48px] leading-[1.1] font-bold text-[#0B1F3A] tracking-tight">
            A decade and a half of industrial glove craftsmanship.
          </h2>
        </motion.div>

        <div className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="text-[11px] tracking-[0.28em] uppercase text-[#64748B] font-medium">
                {stat.label}
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-[54px] lg:text-[64px] font-bold text-[#0B1F3A] leading-none tabular-nums">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.2}
                      separator=","
                      formattingFn={stat.compact ? formatCompact : undefined}
                    />
                  )}
                </span>
                <span className="text-[28px] lg:text-[32px] font-bold text-[#F59E0B] leading-none">
                  {stat.suffix}
                </span>
              </div>
              <div className="mt-2.5 text-[12px] text-[#64748B] tracking-wide">
                {stat.note}
              </div>
              <div className="mt-5 h-px w-12 bg-[#F59E0B]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}
