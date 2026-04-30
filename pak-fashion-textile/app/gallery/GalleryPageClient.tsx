"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Footer from "@/components/park-fashion/Footer";
import WhatsAppCTA from "@/components/park-fashion/WhatsAppCTA";
import Gallery from "@/components/park-fashion/Gallery";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const showcaseImages = [
  { src: "/images/sportswear-football-jersey.jpg", alt: "Football jersey", label: "Football Jersey" },
  { src: "/images/hospital-scrub-suit.jpg", alt: "Hospital scrub suit", label: "Scrub Suit" },
  { src: "/images/sublimation-paper-1.jpg", alt: "Sublimation paper", label: "Sublimation Paper" },
  { src: "/images/sublimation-ink-2.jpg", alt: "Sublimation ink", label: "Sublimation Ink" },
  { src: "/images/sportswear-tracksuit.jpg", alt: "Tracksuit", label: "Tracksuit" },
  { src: "/images/hospital-ot-gown.jpg", alt: "Hospital OT gown", label: "OT Gown" },
  { src: "/images/category-sportswear.jpg", alt: "Sportswear category", label: "Sportswear" },
  { src: "/images/category-hospital.jpg", alt: "Hospital textiles category", label: "Hospital Textiles" },
];

export default function GalleryPageClient() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
            See Our Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Our <span className="text-[#D4A843]">Gallery</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Browse through our production facilities, finished products, and the quality craftsmanship behind every order.
          </motion.p>
        </div>
      </section>

      {/* Existing Gallery Component */}
      <Gallery />

      {/* Product Showcase */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
              Product Range
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Product Showcase
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              A closer look at our sportswear, medical textiles, and sublimation products.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {showcaseImages.map((item, i) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => setSelectedImage(i)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 via-[#1B4332]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-5">
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ZoomIn size={16} className="text-white" />
                  </div>
                  <p className="text-white font-semibold text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            >
              <Image
                src={showcaseImages[selectedImage].src}
                alt={showcaseImages[selectedImage].alt}
                fill
                className="object-cover"
                sizes="90vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white font-semibold">
                  {showcaseImages[selectedImage].label}
                </p>
                <p className="text-white/60 text-sm">
                  {selectedImage + 1} / {showcaseImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <WhatsAppCTA />
      <Footer />
    </>
  );
}
