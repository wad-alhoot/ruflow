"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Newspaper, Droplets, Shirt, Cross, Flame, Trophy, Dumbbell, Stethoscope, BedDouble, Scissors, Sofa } from "lucide-react";
import type { Category } from "@/data/park-fashion-products";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "sublimation-paper": Newspaper,
  "sublimation-ink": Droplets,
  "heat-transfer-materials": Flame,
  "sports-tshirts": Shirt,
  "team-uniforms": Trophy,
  "gym-wear": Dumbbell,
  "custom-jerseys": Shirt,
  "ot-surgical-kits": Stethoscope,
  "patient-gowns": BedDouble,
  "bedsheets": BedDouble,
  "pillow-cases": Sofa,
  "surgical-wear": Scissors,
};

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const Icon = iconMap[category.slug] || Newspaper;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Link
        href={`/products/${category.slug}`}
        className="block relative h-96 rounded-2xl overflow-hidden"
      >
        {/* Background image */}
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Multi-stop gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/40 to-transparent transition-all duration-500 group-hover:from-[#1B4332]/95 group-hover:via-[#1B4332]/50" />

        {/* Product count badge */}
        <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
          {category.productCount} Products
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-7">
          {/* Category icon */}
          <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-[#D4A843]" />
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-200 leading-relaxed mb-5 line-clamp-2">
            {category.description}
          </p>
          <span className="inline-flex items-center text-sm font-semibold text-[#D4A843] group-hover:gap-2 transition-all duration-200">
            Browse Products
            <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1.5">
              &rarr;
            </span>
          </span>

          {/* Gold accent line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#D4A843] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </Link>
    </motion.div>
  );
}
