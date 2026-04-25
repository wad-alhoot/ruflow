"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Footer from "@/components/park-fashion/Footer";
import WhatsAppCTA from "@/components/park-fashion/WhatsAppCTA";
import { companyInfo } from "@/data/park-fashion-products";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

interface ServiceData {
  title: string;
  description: string;
  features: { title: string; detail: string }[];
  process: { step: string; detail: string }[];
}

export default function ServiceDetailClient({
  slug,
  data,
}: {
  slug: string;
  data: ServiceData | undefined;
}) {
  if (!data) {
    return (
      <>
        <Navbar />
        <section className="min-h-[60vh] flex items-center justify-center bg-[#FAFAF8]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#1B4332] mb-4">
              Service Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The service you are looking for does not exist.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#2D6A4F] font-semibold hover:text-[#D4A843] transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Services
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in your ${data.title} service. Could you share more details?`
  )}`;

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#D4A843]/10 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-40px] w-[220px] h-[220px] rounded-full bg-[#40916C]/20 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/60 hover:text-[#D4A843] text-sm font-medium transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              All Services
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {data.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {data.description}
          </motion.p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              Why Choose Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B4332]">
              Key <span className="text-[#D4A843]">Features</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {data.features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-7 hover:shadow-xl hover:-translate-y-1 hover:border-[#2D6A4F]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center mb-5 shadow-md">
                  <CheckCircle2 size={22} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#1B4332] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.25em] uppercase mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B4332]">
              Our <span className="text-[#D4A843]">Process</span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="space-y-6"
          >
            {data.process.map((step, index) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="flex gap-6 items-start"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A843] to-[#C49A3A] flex items-center justify-center shadow-md">
                  <span className="text-[#1B4332] font-bold text-lg">
                    {index + 1}
                  </span>
                </div>
                {/* Content */}
                <div className="flex-1 bg-[#FAFAF8] rounded-2xl border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-[#1B4332] mb-1">
                    {step.step}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Service-specific WhatsApp CTA */}
      <section className="py-16 bg-gradient-to-br from-[#1B4332] to-[#2D6A4F]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles size={28} className="text-[#D4A843] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Interested in {data.title}?
            </h2>
            <p className="text-white/70 text-base mb-8 leading-relaxed">
              Contact us on WhatsApp for pricing, samples, and a free
              consultation. Our team typically responds within 30 minutes.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#D4A843] hover:bg-[#C49A3A] text-[#1B4332] font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,168,67,0.35)]"
            >
              <MessageCircle size={20} />
              WhatsApp Us Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>
      </section>

      <WhatsAppCTA />
      <Footer />
    </>
  );
}
