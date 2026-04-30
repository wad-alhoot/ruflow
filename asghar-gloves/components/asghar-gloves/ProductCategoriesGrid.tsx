"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { productCategories } from "@/data/products";

export default function ProductCategoriesGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="products"
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 max-w-[1440px]"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
              <span className="w-8 h-px bg-[#F59E0B]" />
              Our Catalog
            </div>
            <h2 className="mt-4 font-display text-[36px] lg:text-[52px] leading-[1.08] font-bold text-[#0B1F3A] tracking-tight">
              Twelve glove families.{" "}
              <span className="text-gradient-amber">One standard of build.</span>
            </h2>
            <p className="mt-5 text-[15px] lg:text-[17px] text-[#475569] leading-relaxed">
              Cotton knit, dipped, canvas, or heat-resistant — each family is
              engineered around a specific hazard profile, produced in-house, and
              available for OEM private labeling.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start text-[13px] font-semibold text-[#0B1F3A] border-b-2 border-[#F59E0B] pb-1 hover:text-[#F59E0B] transition-colors"
          >
            Request Full Catalog PDF
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {productCategories.map((cat, i) => (
            <motion.a
              key={cat.slug}
              href={`#products-${cat.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.05 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E2E8F0] hover:border-[#0B1F3A] hover:shadow-[0_20px_48px_rgba(11,31,58,0.12)] transition-all duration-400"
            >
              {/* Tile image / placeholder */}
              <div
                className="relative h-48 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${cat.accent} 0%, #F8FAFC 100%)`,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 200 240" className="w-24 h-28 transition-transform duration-500 group-hover:scale-110">
                    <path
                      d="M70 60 Q70 30 90 30 Q110 30 110 60 L110 100 L125 100 Q140 100 140 75 Q140 55 155 55 Q170 55 170 80 L170 140 Q170 200 130 220 L80 220 Q45 210 40 170 L35 130 Q32 115 45 112 Q60 110 60 125 L60 145 L70 145 Z"
                      fill="#0B1F3A"
                      fillOpacity="0.15"
                      stroke="#0B1F3A"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur text-[10px] font-semibold tracking-wider uppercase text-[#0B1F3A]">
                  {cat.materials[0]}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-[18px] font-bold text-[#0B1F3A] leading-snug">
                  {cat.name}
                </h3>
                <p className="mt-2 text-[12.5px] text-[#64748B] leading-relaxed flex-1 line-clamp-3">
                  {cat.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.features.slice(0, 2).map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[10.5px] font-medium text-[#334155]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[12px] font-semibold text-[#0B1F3A] group-hover:text-[#F59E0B] transition-colors">
                  View specs
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
