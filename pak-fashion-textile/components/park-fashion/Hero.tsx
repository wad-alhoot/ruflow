"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { companyInfo } from "@/data/park-fashion-products";

/* ─── Masonry grid — mixed product images with varied spans ────────── */

const gridImages: { src: string; alt: string; span: string }[] = [
  // Row 1
  { src: "/images/products/jersey-2.webp", alt: "Custom Jersey Design", span: "col-span-2 row-span-2" },
  { src: "/images/products/ink-1.webp", alt: "Sublimation Ink", span: "col-span-1 row-span-1" },
  { src: "/images/products/surgical-1.webp", alt: "Surgical Gown", span: "col-span-1 row-span-2" },
  { src: "/images/products/sub-paper-2.webp", alt: "Paper Roll", span: "col-span-1 row-span-1" },
  // Row 2
  { src: "/images/products/sports-tee-1.webp", alt: "Sports T-Shirts", span: "col-span-1 row-span-1" },
  { src: "/images/products/ink-2.webp", alt: "Printing Ink", span: "col-span-1 row-span-1" },
  // Row 3
  { src: "/images/products/sub-paper-3.webp", alt: "Sublimation Paper", span: "col-span-1 row-span-1" },
  { src: "/images/products/jersey-5.webp", alt: "Team Jersey", span: "col-span-1 row-span-2" },
  { src: "/images/products/surgical-2.webp", alt: "Surgeon Gown", span: "col-span-1 row-span-1" },
  { src: "/images/products/sports-tee-2.webp", alt: "Custom Sports Shirt", span: "col-span-1 row-span-1" },
  { src: "/images/products/sub-htv.webp", alt: "Heat Transfer Vinyl", span: "col-span-1 row-span-1" },
  // Row 4
  { src: "/images/products/ink-4.webp", alt: "Sublimation Ink Set", span: "col-span-1 row-span-1" },
  { src: "/images/products/jersey-1.webp", alt: "Football Jersey", span: "col-span-1 row-span-1" },
  { src: "/images/products/surgical-5.webp", alt: "Medical Wear", span: "col-span-1 row-span-1" },
  { src: "/images/products/sports-tee-4.webp", alt: "Sports Wear", span: "col-span-1 row-span-1" },
];

/* ─── Animations ───────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: EASE } },
};

/* ─── Component ─────────────────────────────────────────────────────── */

export default function Hero() {
  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hi Pak Fashion Textile, I'd like to inquire about your products."
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F5F7F5]">
      {/* Dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(27,67,50,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 pb-10 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-center">

          {/* ── Left: Text (2 cols) ── */}
          <motion.div
            className="lg:col-span-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 bg-[#1B4332]/5 border border-[#1B4332]/10 text-[#2D6A4F] text-[11px] font-semibold px-3 py-1.5 rounded-full mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843] animate-pulse" />
              Est. 2014 — Export Quality
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-bold text-[#1A1A2E] tracking-tight leading-[1.1]"
            >
              PAK FASHION{" "}
              <span
                className="font-serif block mt-1"
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  background: "linear-gradient(135deg, #D4A843, #E8C96A, #C49A3A)",
                  backgroundSize: "200% 200%",
                  animation: "heroGradient 4s ease infinite",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TEXTILE
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed max-w-md"
            >
              Your trusted B2B partner for sublimation materials, custom team
              sportswear, and hospital medical textiles.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-3 h-6 text-sm text-[#2D6A4F] font-medium"
            >
              <TypeAnimation
                sequence={[
                  "Sublimation Papers & Inks",
                  2500,
                  "Custom Team Jerseys & Uniforms",
                  2500,
                  "Hospital & Medical Textiles",
                  2500,
                  "Bulk Production & Custom Orders",
                  2500,
                ]}
                wrapper="p"
                speed={45}
                repeat={Infinity}
                cursor={true}
                className="inline-block"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex gap-6 md:gap-8"
            >
              {[
                { value: "200+", label: "Clients" },
                { value: "10+", label: "Years" },
                { value: "5+", label: "Countries" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl md:text-2xl font-bold text-[#1B4332]">{s.value}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(27,67,50,0.25)] hover:-translate-y-0.5"
              >
                Explore Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle size={15} />
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: Masonry Grid (3 cols of 5) ── */}
          <motion.div
            className="lg:col-span-3"
            variants={gridContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 auto-rows-[90px] sm:auto-rows-[100px] md:auto-rows-[110px] gap-2.5">
              {gridImages.map((img, i) => (
                <motion.div
                  key={i}
                  variants={gridItemVariants}
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group ${img.span}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 33vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                    <p className="text-white text-[10px] font-medium leading-tight">{img.alt}</p>
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-black/[0.06]" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
