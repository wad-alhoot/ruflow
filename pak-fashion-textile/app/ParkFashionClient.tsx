"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Quote, ShoppingBag, MessageCircle, Truck, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Hero from "@/components/park-fashion/Hero";
import ProductCarousel from "@/components/park-fashion/ProductCarousel";
import ProductQuickView from "@/components/park-fashion/ProductQuickView";
import CategoryCard from "@/components/park-fashion/CategoryCard";
import TrustSection from "@/components/park-fashion/TrustSection";
import WhatsAppCTA from "@/components/park-fashion/WhatsAppCTA";
import Footer from "@/components/park-fashion/Footer";
import PartnersMarquee from "@/components/park-fashion/PartnersMarquee";
import FAQ from "@/components/park-fashion/FAQ";
import Gallery from "@/components/park-fashion/Gallery";
import Timeline from "@/components/park-fashion/Timeline";
import ParallaxBreak from "@/components/park-fashion/ParallaxBreak";
import { products, categories, companyInfo, type Product } from "@/data/park-fashion-products";

const featuredProducts = products.filter((p) => p.featured);

const fadeIn = {
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

/* ── Animated Counter Hook ───────────────────────────── */
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return { count, ref };
}

/* ── Stat Counter Card ───────────────────────────────── */
function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const { count, ref } = useCounter(numericValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <p className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#2D6A4F] tracking-tight">
        {count}
        <span className="text-[#D4A843]">{suffix}</span>
      </p>
      <p className="text-gray-500 text-sm mt-2 font-medium">{label}</p>
    </motion.div>
  );
}

/* ── How It Works Steps ──────────────────────────────── */
const steps = [
  {
    icon: ShoppingBag,
    title: "Browse Products",
    description: "Explore our catalog of sublimation papers, inks, team sportswear, medical textiles, and spare parts.",
  },
  {
    icon: MessageCircle,
    title: "Contact via WhatsApp",
    description: "Reach out directly on WhatsApp for pricing, bulk orders, and custom requests.",
  },
  {
    icon: Truck,
    title: "Get Delivered",
    description: "We ship across Pakistan and internationally with secure, fast delivery.",
  },
];

/* ── Testimonials ────────────────────────────────────── */
const testimonials = [
  {
    quote:
      "Pak Fashion Textile has been our go-to supplier for sublimation papers for over 3 years. Consistent quality and on-time delivery every single time.",
    company: "Karachi Print Works",
    role: "Operations Manager",
    name: "Ahmed Khan",
    rating: 5,
    initials: "AK",
    color: "from-[#2D6A4F] to-[#40916C]",
  },
  {
    quote:
      "Their ink quality is outstanding — vivid colors, excellent wash resistance. We switched to their CMYK set and never looked back.",
    company: "Lahore Sublimation Co.",
    role: "Production Head",
    name: "Bilal Rashid",
    rating: 5,
    initials: "BR",
    color: "from-[#D4A843] to-[#C49A3A]",
  },
  {
    quote:
      "We ordered custom football and volleyball jerseys for our sports academy. The sublimation print quality and fabric comfort exceeded our expectations.",
    company: "Islamabad Sports Academy",
    role: "Director",
    name: "Hassan Tariq",
    rating: 5,
    initials: "HT",
    color: "from-[#1B4332] to-[#2D6A4F]",
  },
  {
    quote:
      "Their hospital bed sheets, scrub suits, and OT gowns meet all our quality standards. Reliable supply chain for our 200-bed hospital.",
    company: "Allied Medical Centre, Lahore",
    role: "Procurement Manager",
    name: "Dr. Fatima Noor",
    rating: 5,
    initials: "FN",
    color: "from-[#2D6A4F] to-[#40916C]",
  },
  {
    quote:
      "Finding genuine spare parts was always a challenge until we started working with Pak Fashion. Their technical support is exceptional.",
    company: "Faisalabad Textile Hub",
    role: "Technical Director",
    name: "Usman Ali",
    rating: 5,
    initials: "UA",
    color: "from-[#D4A843] to-[#C49A3A]",
  },
];

export default function ParkFashionClient() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* ── Featured Products ──────────────────────────────── */}
      <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #1B4332 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Products
            </h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Premium sublimation papers, high-quality inks, and genuine machine
              spare parts for all your printing needs.
            </p>
          </motion.div>

          <ProductCarousel products={featuredProducts} onQuickView={setQuickViewProduct} />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mt-10"
          >
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-sm transition-colors"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Counter ──────────────────────────────────── */}
      <section className="py-20 bg-[#F8FAF8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {companyInfo.stats.map((stat, i) => (
              <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Partners Marquee ─────────────────────────────────── */}
      <PartnersMarquee />

      {/* ── Parallax Break ──────────────────────────────────── */}
      <ParallaxBreak />

      {/* ── Trust Section ──────────────────────────────────── */}
      <TrustSection />

      {/* ── How It Works ───────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="text-center mb-14"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Getting started with Pak Fashion Textile is easy. Three simple steps
              to premium printing supplies.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
          >
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[#D4A843]/40 via-[#2D6A4F]/30 to-[#D4A843]/40" />

            {steps.map((step, i) => (
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
                className="relative flex flex-col items-center text-center"
              >
                {/* Step number circle */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4A843] to-[#C49A3A] flex items-center justify-center shadow-lg shadow-[#D4A843]/20 mb-5">
                  <span className="text-white text-xl font-bold">{i + 1}</span>
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-[#2D6A4F]/10 flex items-center justify-center mb-4">
                  <step.icon size={22} className="text-[#2D6A4F]" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Arrow between steps (mobile) */}
                {i < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <ArrowRight size={20} className="text-[#D4A843]/50 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Browse Categories ──────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Browse Categories
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Find exactly what you need across our curated product categories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories
              .filter((cat) => ["sublimation-paper", "custom-jerseys", "ot-surgical-kits", "team-uniforms", "patient-gowns", "sports-tshirts"].includes(cat.slug))
              .map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials / Social Proof ────────────────────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Trusted by Industry
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Hear from printing professionals who rely on our products every day.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.company}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                  },
                }}
                className="relative backdrop-blur-md bg-white/70 border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:border-[#D4A843]/20 transition-all duration-300 group"
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Star rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, si) => (
                    <Star key={si} size={14} className="text-[#D4A843] fill-[#D4A843]" />
                  ))}
                </div>

                {/* Quote icon */}
                <div className="w-10 h-10 rounded-full bg-[#D4A843]/10 flex items-center justify-center mb-4">
                  <Quote size={18} className="text-[#D4A843]" />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white text-xs font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">
                      {t.role} at {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Production Gallery ──────────────────────────────── */}
      <Gallery />

      {/* ── Company Timeline ─────────────────────────────────── */}
      <Timeline />

      {/* ── FAQ Section ──────────────────────────────────────── */}
      <FAQ />

      {/* ── WhatsApp CTA ───────────────────────────────────── */}
      <WhatsAppCTA />

      {/* ── Footer ─────────────────────────────────────────── */}
      <Footer />

      {/* ── Product Quick View Modal ──────────────────────── */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
