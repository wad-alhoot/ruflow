"use client";

import { motion } from "framer-motion";
import { Globe, Handshake, ShieldCheck } from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { companyInfo } from "@/data/park-fashion-products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe: Globe,
  Handshake: Handshake,
  Shield: ShieldCheck,
};

const statNumbers: Record<string, { value: number; suffix: string }> = {
  "Export Quality": { value: 50, suffix: "+" },
  "B2B Partner": { value: 200, suffix: "+" },
  "Government Approved": { value: 10, suffix: "+" },
};

const statLabels: Record<string, string> = {
  "Export Quality": "Products Exported",
  "B2B Partner": "Trusted Clients",
  "Government Approved": "Years Experience",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function AnimatedCounterCard({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="mb-2">
      <span className="text-4xl md:text-5xl font-extrabold text-[#1B4332]">
        {inView ? (
          <CountUp end={target} duration={2.5} suffix={suffix} />
        ) : (
          <>0{suffix}</>
        )}
      </span>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}

export default function TrustSection() {
  const { trustPoints } = companyInfo;

  return (
    <section className="relative py-24 px-4 bg-[#F8FAF8] overflow-hidden">
      {/* Background decoration: radial gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(45,106,79,0.05) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 70%)" }}
        />
      </div>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1B4332 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B4332]/5 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest mb-4">
            Trusted Worldwide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A2E]">
            Why Choose Us
          </h2>
        </motion.div>

        {/* Trust point cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {trustPoints.map((point, idx) => {
            const Icon = iconMap[point.icon] || Globe;
            const stat = statNumbers[point.title] || { value: 0, suffix: "" };
            const statLabel = statLabels[point.title] || "";

            return (
              <motion.div
                key={point.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative rounded-2xl p-[1.5px] bg-gray-200/50 hover:bg-gradient-to-br hover:from-[#2D6A4F]/30 hover:via-[#D4A843]/20 hover:to-[#2D6A4F]/30 transition-all duration-500"
              >
                <div className="bg-white rounded-2xl p-8 text-center h-full">
                  {/* Animated counter */}
                  <AnimatedCounterCard
                    target={stat.value}
                    suffix={stat.suffix}
                    label={statLabel}
                  />

                  {/* Separator line */}
                  <div className="w-12 h-[2px] bg-gradient-to-r from-[#2D6A4F]/30 to-[#D4A843]/30 mx-auto my-4" />

                  {/* Icon in circle with gradient border */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#2D6A4F]/10 to-[#D4A843]/10 border-2 border-[#D4A843]/20 my-5 group-hover:border-[#D4A843]/40 transition-colors duration-300">
                    <Icon className="w-7 h-7 text-[#D4A843]" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
