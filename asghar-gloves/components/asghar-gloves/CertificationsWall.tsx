"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BadgeCheck, FileCheck, Globe2, Award, Leaf, ShieldCheck } from "lucide-react";

// PLACEHOLDER cert set — update with Asghar's actual holdings
const certs = [
  {
    icon: BadgeCheck,
    code: "ISO 9001",
    title: "Quality Management",
    status: "In Progress",
  },
  {
    icon: ShieldCheck,
    code: "EN 388",
    title: "Mechanical Risks (Target)",
    status: "Testing",
  },
  {
    icon: Globe2,
    code: "CE Marking",
    title: "EU Conformity (Target)",
    status: "Testing",
  },
  {
    icon: FileCheck,
    code: "SEDEX",
    title: "Ethical Audit (SMETA)",
    status: "Planned",
  },
  {
    icon: Leaf,
    code: "OEKO-TEX",
    title: "Textile Standard 100",
    status: "Planned",
  },
  {
    icon: Award,
    code: "Tax Registered",
    title: "Since 2020 — Export Ready",
    status: "Active",
  },
];

const statusColor: Record<string, string> = {
  Active: "bg-[#10B981] text-white",
  "In Progress": "bg-[#F59E0B] text-[#0B1F3A]",
  Testing: "bg-[#3B82F6] text-white",
  Planned: "bg-[#64748B] text-white",
};

export default function CertificationsWall() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="certifications"
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
              <span className="w-8 h-px bg-[#F59E0B]" />
              Compliance Roadmap
            </div>
            <h2 className="mt-4 font-display text-[36px] lg:text-[48px] leading-[1.1] font-bold text-[#0B1F3A] tracking-tight">
              Built to{" "}
              <span className="text-gradient-amber">international standards.</span>
            </h2>
            <p className="mt-5 text-[15px] lg:text-[17px] text-[#475569] leading-relaxed">
              Registered with national tax authorities since 2020 and actively
              pursuing international certifications to meet EU, US, and Gulf
              procurement requirements.
            </p>
          </div>
          <div className="text-[11px] text-[#64748B] max-w-xs lg:text-right">
            Full certification documents available to verified B2B buyers on
            request. Current status reflected below.
          </div>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c, i) => (
            <motion.div
              key={c.code}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.65,
                delay: 0.05 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex items-start gap-4 rounded-2xl border border-[#E2E8F0] hover:border-[#0B1F3A]/40 p-5 lg:p-6 bg-white hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center">
                <c.icon className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-display text-[17px] font-bold text-[#0B1F3A] tracking-wide">
                    {c.code}
                  </span>
                  <span
                    className={`text-[10px] tracking-wider uppercase font-semibold rounded-full px-2 py-0.5 ${statusColor[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] text-[#64748B] leading-snug">
                  {c.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
