"use client";

import { motion } from "framer-motion";
import { Rocket, Users, Globe, Award, TrendingUp, Building2, Zap } from "lucide-react";

const milestones = [
  {
    year: "2014",
    title: "Company Founded",
    description:
      "Started operations in Pakistan as a small sublimation materials supplier with a vision to serve the printing industry.",
    icon: Rocket,
  },
  {
    year: "2016",
    title: "100+ Clients",
    description:
      "Reached our first milestone of 100 regular B2B clients across major cities in Pakistan.",
    icon: Users,
  },
  {
    year: "2018",
    title: "International Expansion",
    description:
      "Began exporting to neighboring countries, meeting international quality and compliance standards.",
    icon: Globe,
  },
  {
    year: "2020",
    title: "Government Approved",
    description:
      "Became a registered supplier for government procurement and institutional orders.",
    icon: Award,
  },
  {
    year: "2022",
    title: "Product Range Expanded",
    description:
      "Expanded catalog to 50+ products including inks, papers, and machine spare parts for all major brands.",
    icon: TrendingUp,
  },
  {
    year: "2024",
    title: "200+ Partners",
    description:
      "Serving 200+ businesses across 5+ countries with premium sublimation materials and technical support.",
    icon: Building2,
  },
  {
    year: "2026",
    title: "Digital Transformation",
    description:
      "Launched our digital platform and expanded to new markets with advanced online ordering and support capabilities.",
    icon: Zap,
  },
];

export default function Timeline() {
  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Our Journey
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Company Milestones
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Over a decade of growth, trust, and commitment to the printing industry.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A843]/40 via-[#2D6A4F]/30 to-transparent hidden md:block" />
          {/* Mobile left line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A843]/40 via-[#2D6A4F]/30 to-transparent md:hidden" />

          <div className="space-y-8 md:space-y-12">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              const Icon = m.icon;

              return (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative"
                >
                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                    {/* Left content or spacer */}
                    {isLeft ? (
                      <div className="text-right pr-8">
                        <span className="text-[#D4A843] font-extrabold text-3xl">
                          {m.year}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">
                          {m.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mt-2">
                          {m.description}
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* Right content or spacer */}
                    {!isLeft ? (
                      <div className="pl-8">
                        <span className="text-[#D4A843] font-extrabold text-3xl">
                          {m.year}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-1">
                          {m.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mt-2">
                          {m.description}
                        </p>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-2 border-[#D4A843]/40 items-center justify-center shadow-md z-10">
                    <Icon size={18} className="text-[#2D6A4F]" />
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden flex items-start gap-5 pl-14">
                    {/* Left dot (mobile) */}
                    <div className="absolute left-6 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-[#D4A843]/40 flex items-center justify-center shadow-md z-10">
                      <Icon size={14} className="text-[#2D6A4F]" />
                    </div>

                    <div>
                      <span className="text-[#D4A843] font-extrabold text-xl">
                        {m.year}
                      </span>
                      <h3 className="text-base font-bold text-gray-900 mt-0.5">
                        {m.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mt-1">
                        {m.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
