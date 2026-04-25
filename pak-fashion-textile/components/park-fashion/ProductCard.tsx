"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { companyInfo, type Product } from "@/data/park-fashion-products";

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({
  product,
  index = 0,
  onQuickView,
}: ProductCardProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in "${product.name}". Could you share pricing and availability?`
  );
  const whatsappUrl = `https://wa.me/${companyInfo.whatsapp}?text=${whatsappMessage}`;

  const specEntries = Object.entries(product.specs);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Opening WhatsApp...", {
      description: `Ordering: ${product.name}`,
    });
  };

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      {/* Gradient border wrapper */}
      <div
        onClick={handleCardClick}
        className={`h-full rounded-2xl p-[1.5px] bg-gray-200/60 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#1B4332] group-hover:via-[#2D6A4F] group-hover:to-[#40916C] shadow-sm group-hover:shadow-xl ${
          onQuickView ? "cursor-pointer" : ""
        }`}
      >
        {/* Glassmorphism card */}
        <div className="h-full flex flex-col rounded-2xl backdrop-blur-md bg-white/80 border border-white/30 overflow-hidden">
          {/* Product image */}
          <div className="relative w-full h-60 overflow-hidden rounded-t-2xl bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Green gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category badge */}
            <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full bg-[#1B4332]/75 text-white backdrop-blur-sm border border-white/10">
              {product.category}
            </span>

            {/* Featured badge */}
            {product.featured && (
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#D4A843]/90 text-white backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5">
            <h3 className="text-lg font-bold text-[#1A1A2E] leading-snug mb-2">
              {product.name}
            </h3>

            <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Specs grid with dividers */}
            <div className="mb-5 flex-1">
              <div className="grid grid-cols-2 gap-0 rounded-xl border border-gray-100 bg-[#F8FAF8]/60 overflow-hidden">
                {specEntries.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`px-3.5 py-2.5 ${
                      i % 2 !== 0 ? "border-l border-gray-100" : ""
                    } ${
                      i < specEntries.length - 2
                        ? "border-b border-gray-100"
                        : i === specEntries.length - 2 && specEntries.length % 2 === 0
                        ? "border-b border-gray-100"
                        : ""
                    }`}
                  >
                    <span className="block text-[11px] uppercase tracking-wider text-gray-400 font-medium mb-0.5">
                      {label}
                    </span>
                    <span className="block text-sm text-[#1A1A2E] font-bold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#1da851] text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
