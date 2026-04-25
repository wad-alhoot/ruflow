"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { companyInfo, type Product } from "@/data/park-fashion-products";

interface ProductQuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductQuickView({
  product,
  isOpen,
  onClose,
}: ProductQuickViewProps) {
  if (!product) return null;

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${product.name}". Could you share pricing and availability?`
  );
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${whatsappMessage}`;

  const specEntries = Object.entries(product.specs);

  const handleWhatsAppClick = () => {
    toast.success("Opening WhatsApp...", {
      description: `Ordering: ${product.name}`,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Dark backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
              aria-label="Close quick view"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col md:flex-row max-h-[90vh] overflow-y-auto">
              {/* Product image */}
              <div className="relative w-full md:w-1/2 h-64 md:h-auto md:min-h-[400px] flex-shrink-0 bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Category badge */}
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-[#1B4332]/75 text-white backdrop-blur-sm border border-white/10">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="absolute top-4 right-14 md:right-4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#D4A843]/90 text-white backdrop-blur-sm">
                    Featured
                  </span>
                )}
              </div>

              {/* Product details */}
              <div className="flex-1 p-6 md:p-8 flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {product.name}
                </h2>

                <span className="inline-flex self-start px-3 py-1 text-xs font-medium rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] mb-4">
                  {product.category}
                </span>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Specs grid */}
                <div className="mb-6 flex-1">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-0 rounded-xl border border-gray-100 bg-[#F8FAF8]/60 overflow-hidden">
                    {specEntries.map(([label, value], i) => (
                      <div
                        key={label}
                        className={`px-3.5 py-3 ${
                          i % 2 !== 0 ? "border-l border-gray-100" : ""
                        } ${
                          i < specEntries.length - 2
                            ? "border-b border-gray-100"
                            : i === specEntries.length - 2 &&
                              specEntries.length % 2 === 0
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-medium mb-0.5">
                          {label}
                        </span>
                        <span className="block text-sm text-gray-900 font-bold">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp order button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <MessageCircle className="w-[18px] h-[18px]" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
