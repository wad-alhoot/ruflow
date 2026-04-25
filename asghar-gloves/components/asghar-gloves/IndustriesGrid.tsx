"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import * as Icons from "lucide-react";
import { industries } from "@/data/industries";

export default function IndustriesGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="industries"
      className="relative py-20 lg:py-28 bg-[#F8FAFC] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
            <span className="w-8 h-px bg-[#F59E0B]" />
            Industries We Serve
          </div>
          <h2 className="mt-4 font-display text-[36px] lg:text-[52px] leading-[1.08] font-bold text-[#0B1F3A] tracking-tight">
            Built for the hands that{" "}
            <span className="text-gradient-amber">build the world.</span>
          </h2>
          <p className="mt-5 text-[15px] lg:text-[17px] text-[#475569] leading-relaxed max-w-2xl">
            From steel mills to lab floors, our catalog is engineered around the
            hazard and the task — not generic inventory.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => {
            const Icon = (Icons[ind.icon as keyof typeof Icons] as Icons.LucideIcon) || Icons.Factory;
            return (
              <motion.div
                key={ind.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.05 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty(
                    "--mx",
                    `${e.clientX - r.left}px`
                  );
                  e.currentTarget.style.setProperty(
                    "--my",
                    `${e.clientY - r.top}px`
                  );
                }}
                className="spotlight-card group p-6 h-full"
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1E3A6B] flex items-center justify-center mb-5 shadow-sm shadow-[#0B1F3A]/20">
                    <Icon className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
                  </div>

                  <h3 className="font-display text-[19px] font-bold text-[#0B1F3A] leading-snug">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-[13px] text-[#64748B] leading-relaxed flex-1">
                    {ind.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#F59E0B] font-semibold opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore
                    <Icons.ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
