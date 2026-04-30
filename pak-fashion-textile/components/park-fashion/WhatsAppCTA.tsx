"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Phone, Sparkles } from "lucide-react";
import { companyInfo } from "@/data/park-fashion-products";

const productThumbnails = [
  { color: "from-[#D4A843] to-[#C49A3A]", label: "Papers" },
  { color: "from-[#40916C] to-[#2D6A4F]", label: "Inks" },
  { color: "from-[#5B8C6E] to-[#3A7352]", label: "Parts" },
  { color: "from-[#B8963E] to-[#A07E2E]", label: "Rolls" },
  { color: "from-[#6CA87D] to-[#4D8B62]", label: "Accessories" },
];

export default function WhatsAppCTA() {
  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to place an order. Please share your latest catalog and prices."
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] py-20 lg:py-28">
      {/* Floating decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] rounded-full bg-[#D4A843]/10 blur-3xl" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[250px] h-[250px] rounded-full bg-[#40916C]/20 blur-3xl" />

        {/* Floating circles */}
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[15%] w-16 h-16 rounded-full bg-[#40916C]/15 border border-[#40916C]/10"
        />
        <motion.div
          animate={{ y: [10, -15, 10], x: [5, -5, 5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[12%] w-24 h-24 rounded-full bg-[#D4A843]/10 border border-[#D4A843]/10"
        />
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-24 left-[25%] w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/10"
        />
        <motion.div
          animate={{ y: [12, -8, 12], x: [-3, 7, -3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-16 right-[20%] w-20 h-20 rounded-full bg-[#40916C]/12 border border-[#40916C]/8"
        />
        <motion.div
          animate={{ y: [-6, 8, -6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] left-[8%] w-10 h-10 rounded-full bg-[#D4A843]/8"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#D4A843]/15 border border-[#D4A843]/30 text-[#D4A843] text-xs sm:text-sm font-semibold px-5 py-2 rounded-full mb-6"
          >
            <Sparkles size={14} />
            Limited time: 10% off on bulk orders
          </motion.div>

          <p className="text-[#D4A843] text-sm font-semibold tracking-[0.25em] uppercase mb-4">
            Ready to Order?
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
            Get Premium Products{" "}
            <span className="text-[#D4A843]">Delivered</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Contact us directly on WhatsApp for instant pricing, bulk order
            discounts, and expert consultation on the right products for your
            printing needs.
          </p>

          {/* Product thumbnail showcase */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center gap-3 sm:gap-4 mb-10"
          >
            {productThumbnails.map((t, i) => (
              <div key={t.label} className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br ${t.color} border-2 border-white/20 shadow-lg flex items-center justify-center text-white text-[10px] sm:text-xs font-bold`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {t.label.charAt(0)}
                </div>
                <span className="text-white/40 text-[10px] sm:text-xs hidden sm:block">
                  {t.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Two CTAs side by side */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary: WhatsApp (gold) */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[#D4A843] hover:bg-[#C49A3A] text-[#1B4332] font-bold text-base px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(212,168,67,0.35)] w-full sm:w-auto justify-center"
            >
              <MessageCircle size={20} />
              WhatsApp Us Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* Secondary: Call Now (outline) */}
            <a
              href={`tel:${companyInfo.phone}`}
              className="group flex items-center gap-3 text-white font-semibold text-base border-2 border-white/25 hover:border-[#D4A843]/60 hover:text-[#D4A843] px-8 py-[14px] rounded-full transition-all duration-300 hover:bg-[#D4A843]/10 w-full sm:w-auto justify-center"
            >
              <Phone size={18} />
              Call Now
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-white/40 text-xs sm:text-sm mt-8"
          >
            Trusted by 200+ businesses across 5+ countries
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
