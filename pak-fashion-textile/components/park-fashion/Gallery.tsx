"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  {
    src: "/images/products/jersey-2.webp",
    alt: "Custom team jersey design",
    label: "Custom Jerseys",
  },
  {
    src: "/images/team-uniforms/team-uniform-01.jpeg",
    alt: "Team uniform jersey",
    label: "Team Jerseys",
  },
  {
    src: "/images/products/sports-tee-1.webp",
    alt: "Custom sports t-shirts",
    label: "Sports T-Shirts",
  },
  {
    src: "/images/products/surgical-1.webp",
    alt: "Medical surgical gowns",
    label: "Medical Wear",
  },
  {
    src: "/images/products/sub-paper-2.webp",
    alt: "Sublimation paper rolls",
    label: "Sublimation Paper",
  },
  {
    src: "/images/products/jersey-5.webp",
    alt: "Team jersey production",
    label: "Team Uniforms",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const goNext = () => {
    if (lightbox !== null) {
      setLightbox((lightbox + 1) % galleryItems.length);
    }
  };

  const goPrev = () => {
    if (lightbox !== null) {
      setLightbox(
        (lightbox - 1 + galleryItems.length) % galleryItems.length
      );
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F8FAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Our Work
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Production Gallery
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            A glimpse into our production facilities and the quality we deliver.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => openLightbox(i)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                i === 0 || i === 5 ? "md:row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 via-[#1B4332]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-6">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ZoomIn size={18} className="text-white" />
                </div>
                <p className="text-white font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
            >
              <Image
                src={galleryItems[lightbox].src}
                alt={galleryItems[lightbox].alt}
                fill
                className="object-cover"
                sizes="90vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white font-semibold">
                  {galleryItems[lightbox].label}
                </p>
                <p className="text-white/60 text-sm">
                  {lightbox + 1} / {galleryItems.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
