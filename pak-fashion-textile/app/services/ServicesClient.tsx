"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Printer, Shirt, Factory, Palette, ArrowRight } from "lucide-react";
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
    transition: { staggerChildren: 0.15 },
  },
};

const services = [
  {
    slug: "sublimation-printing",
    title: "Sublimation Printing",
    description:
      "Industrial-grade sublimation printing on fabrics, ceramics, and more.",
    icon: Printer,
  },
  {
    slug: "custom-apparel",
    title: "Custom Apparel Manufacturing",
    description:
      "End-to-end custom sportswear and uniform manufacturing with your designs.",
    icon: Shirt,
  },
  {
    slug: "bulk-production",
    title: "Bulk Production",
    description:
      "High-volume production runs for large orders with consistent quality.",
    icon: Factory,
  },
  {
    slug: "design-services",
    title: "Design Services",
    description:
      "Professional design assistance for jerseys, uniforms, and printed products.",
    icon: Palette,
  },
];

export default function ServicesClient() {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Decorative blurs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-60px] w-[280px] h-[280px] rounded-full bg-[#D4A843]/10 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-40px] w-[220px] h-[220px] rounded-full bg-[#40916C]/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#D4A843] text-sm font-semibold tracking-[0.25em] uppercase mb-4"
          >
            What We Offer
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Our <span className="text-[#D4A843]">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            From sublimation printing to complete apparel manufacturing,{" "}
            {companyInfo.name} delivers end-to-end textile solutions for
            businesses worldwide.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.slug} variants={fadeUp}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block h-full"
                  >
                    <div className="relative h-full bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#2D6A4F]/30 overflow-hidden">
                      {/* Green accent bar on hover */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2D6A4F] to-[#40916C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2D6A4F] to-[#40916C] flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                        <Icon size={26} className="text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-[#1B4332] mb-3 group-hover:text-[#D4A843] transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Link arrow */}
                      <div className="flex items-center gap-2 text-[#2D6A4F] text-sm font-semibold group-hover:text-[#D4A843] transition-colors duration-300">
                        Learn More
                        <ArrowRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <WhatsAppCTA />
      <Footer />
    </>
  );
}
