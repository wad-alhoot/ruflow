"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  ClipboardList,
  Quote,
  PackageCheck,
  Shirt,
  Stethoscope,
  Printer,
  Boxes,
  Mail,
  Phone,
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
    transition: { staggerChildren: 0.15 },
  },
};

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Share Your Requirements",
    description:
      "Send us your design, specifications, and quantity via WhatsApp or email. Include any logos, colors, or reference images you have.",
  },
  {
    number: "02",
    icon: Quote,
    title: "Get a Quote",
    description:
      "Our team reviews your order and provides a competitive quote within 24 hours. We'll clarify any details to ensure accuracy.",
  },
  {
    number: "03",
    icon: PackageCheck,
    title: "Production & Delivery",
    description:
      "We manufacture your order with strict quality checks at every stage and deliver on time to your doorstep.",
  },
];

const customizations = [
  {
    icon: Shirt,
    title: "Team Sportswear",
    description:
      "Jerseys, uniforms, tracksuits with custom logos, player names, numbers, and team colors. Perfect for clubs, schools, and corporate teams.",
  },
  {
    icon: Stethoscope,
    title: "Medical Textiles",
    description:
      "Hospital bed sheets, gowns, scrub suits, surgeon caps, and OT linens manufactured to your exact specifications and compliance standards.",
  },
  {
    icon: Printer,
    title: "Sublimation Products",
    description:
      "Custom printed fabrics, ceramics, mugs, promotional items, and signage with vibrant, long-lasting sublimation printing.",
  },
  {
    icon: Boxes,
    title: "Bulk Orders",
    description:
      "Large quantity orders with attractive volume discounts. Ideal for distributors, resellers, and institutional buyers.",
  },
];

export default function CustomOrdersClient() {
  const waLink = `https://wa.me/+923006672642?text=${encodeURIComponent(
    "Hi, I'd like to place a custom order."
  )}`;

  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-60px] w-[300px] h-[300px] rounded-full bg-[#D4A843]/10 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-40px] w-[250px] h-[250px] rounded-full bg-[#40916C]/20 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#D4A843] text-sm font-semibold tracking-[0.25em] uppercase mb-4"
          >
            Made to Your Specs
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Custom <span className="text-[#D4A843]">Orders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We specialize in custom manufacturing to your exact specifications.
            From team jerseys to hospital textiles, tell us what you need.
          </motion.p>
        </div>
      </section>

      {/* 3-Step Process */}
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
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Three easy steps from your idea to a finished product delivered to your door.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="relative bg-[#F8FAF8] rounded-2xl p-8 text-center group hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D4A843] text-[#1B4332] font-bold text-sm flex items-center justify-center shadow-lg">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 mx-auto mt-4 mb-4 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors duration-300">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* What You Can Customize */}
      <section className="py-16 lg:py-24 bg-[#F8FAF8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Our Capabilities
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What You Can Customize
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              From fabric choice to final packaging, every detail is in your hands.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {customizations.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#D4A843]/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-[#1B4332]/10 flex items-center justify-center text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-[#D4A843] transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WhatsApp CTA Button */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Place Your Order?
            </h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Tap below to start a conversation on WhatsApp. Share your requirements and we will get back to you within 24 hours.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold text-lg px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle size={24} />
              Chat on WhatsApp
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-[#F8FAF8] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
                <Mail size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Email</p>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-900 font-medium hover:text-[#2D6A4F] transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-[#2D6A4F]">
                <Phone size={18} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Phone / WhatsApp</p>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="text-gray-900 font-medium hover:text-[#2D6A4F] transition-colors"
                >
                  {companyInfo.whatsappDisplay}
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WhatsAppCTA />
      <Footer />
    </>
  );
}
