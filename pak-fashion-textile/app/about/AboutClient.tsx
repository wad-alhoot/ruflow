"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  Landmark,
  Globe,
  Users,
  Award,
  MapPin,
  ClipboardList,
  Palette,
  PackageCheck,
  Headphones,
} from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Footer from "@/components/park-fashion/Footer";
import WhatsAppCTA from "@/components/park-fashion/WhatsAppCTA";
import TrustSection from "@/components/park-fashion/TrustSection";
import Timeline from "@/components/park-fashion/Timeline";
import Gallery from "@/components/park-fashion/Gallery";

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

const markets = [
  {
    icon: Building2,
    title: "Sports Teams & Clubs",
    description:
      "Custom sublimation jerseys, team uniforms, polo shirts, and sportswear for professional and amateur teams.",
  },
  {
    icon: Factory,
    title: "Industrial & Safety",
    description:
      "Safety gloves, industrial workwear, and protective gear for factories, construction, and manufacturing sectors.",
  },
  {
    icon: Landmark,
    title: "Hospitals & Institutions",
    description:
      "Hospital bed sheets, scrub suits, patient gowns, OT gowns, and medical textiles for healthcare facilities.",
  },
  {
    icon: Globe,
    title: "Export Markets",
    description:
      "International-standard quality for global markets. We supply to clients across multiple countries.",
  },
];

const highlights = [
  { value: "10+", label: "Years Experience", icon: Award },
  { value: "200+", label: "Satisfied Clients", icon: Users },
  { value: "5+", label: "Countries Served", icon: MapPin },
];

const processSteps = [
  {
    icon: ClipboardList,
    title: "Discuss Requirements",
    description:
      "We start by understanding your printing needs — product types, volumes, quality specifications, and timelines.",
  },
  {
    icon: Palette,
    title: "Product Selection & Sampling",
    description:
      "Based on your requirements, we recommend the ideal paper GSM, ink formulation, and spare parts. Samples available.",
  },
  {
    icon: PackageCheck,
    title: "Order & Delivery",
    description:
      "Place your order via WhatsApp or phone. We process quickly and deliver securely across Pakistan and internationally.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description:
      "After delivery, our team provides technical support, troubleshooting, and reorder assistance whenever you need it.",
  },
];

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section className="relative bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-36 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(64,145,108,0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/70 text-lg"
          >
            Your Trusted Partner in Sublimation Printing
          </motion.p>
        </div>
      </section>

      {/* ── Experience Highlights Bar ──────────────────────── */}
      <section className="bg-[#1B4332]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="py-6 flex flex-col items-center text-center"
              >
                <h.icon size={20} className="text-[#D4A843] mb-2" />
                <p className="text-2xl md:text-3xl font-extrabold text-white">
                  {h.value}
                </p>
                <p className="text-white/50 text-xs md:text-sm mt-1">{h.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Story (with timeline accent) ───────────────── */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative"
            >
              {/* Timeline green line accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2D6A4F] via-[#40916C] to-[#2D6A4F]/20 rounded-full hidden lg:block" />
              <div className="lg:pl-8">
                <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
                  Our Story
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Delivering Quality Since Day One
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Pak Fashion Textile is a leading manufacturer and exporter of
                    custom sportswear, safety gloves, medical textiles, and home
                    textiles from Pakistan. We provide custom team jerseys, sports
                    t-shirts, polo shirts, hoodies, OT &amp; surgical kits, hospital
                    bed sheets, and industrial safety gloves to businesses across
                    the country and beyond.
                  </p>
                  <p>
                    Our mission is to serve sports teams, hospitals, textile
                    buyers, and industrial clients with top-quality products at
                    competitive prices. From custom team uniforms and surgical
                    kits to safety gloves and home textiles — we manufacture
                    them all.
                  </p>
                  <p>
                    We pride ourselves on our relationships with government
                    institutions, export clients, and industry leaders who trust
                    us for consistent quality, reliable supply, and expert
                    technical support.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/factory-bg.jpg"
                alt="Manufacturing production facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F8FAF8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powering the Print Industry
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              To provide the highest quality sublimation materials at the most
              competitive prices, enabling our partners to produce vivid,
              durable, and professional prints. We are committed to innovation,
              reliability, and exceptional customer service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              { title: "Quality First", desc: "Every product undergoes rigorous testing to meet international standards." },
              { title: "Innovation", desc: "We continuously source the latest materials and technologies for better results." },
              { title: "Customer Focus", desc: "Dedicated support, fast delivery, and custom solutions for every client." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4A843]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#D4A843] font-bold text-lg">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Working Together
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Process
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              A streamlined approach from first contact to ongoing partnership.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                  },
                }}
                className="relative bg-[#F8FAF8] rounded-2xl p-6 border border-gray-100"
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-[#2D6A4F]/10 text-5xl font-extrabold leading-none select-none">
                  {i + 1}
                </span>

                <div className="w-12 h-12 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Who We Serve ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Our Clients
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Who We Serve
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {markets.map((m) => (
              <motion.div
                key={m.title}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                  },
                }}
                className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Green top-border reveal on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

                <div className="w-12 h-12 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center mb-4 group-hover:bg-[#2D6A4F]/15 transition-colors duration-300">
                  <m.icon size={24} className="text-[#2D6A4F]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TrustSection />
      <Timeline />
      {/* <Gallery /> */}
      <WhatsAppCTA />
      <Footer />
    </div>
  );
}
