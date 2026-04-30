"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Footer from "@/components/park-fashion/Footer";
import ProductGrid from "@/components/park-fashion/ProductGrid";
import { products, categories } from "@/data/park-fashion-products";

interface Props {
  categorySlug: string;
}

export default function CategoryClient({ categorySlug }: Props) {
  const category = useMemo(
    () => categories.find((c) => c.slug === categorySlug),
    [categorySlug]
  );

  const filtered = useMemo(
    () => products.filter((p) => p.categorySlug === categorySlug),
    [categorySlug]
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-36 pb-20 text-center max-w-xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The category you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#2D6A4F] text-white px-6 py-3 rounded-full font-medium hover:bg-[#1B4332] transition-colors"
          >
            Browse All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section className="relative bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-36 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(64,145,108,0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            {category.description}
          </motion.p>
        </div>
      </section>

      {/* Breadcrumb + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-8">
          <Link
            href="/"
            className="hover:text-[#2D6A4F] transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            href="/products"
            className="hover:text-[#2D6A4F] transition-colors"
          >
            Products
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#2D6A4F] font-medium">{category.name}</span>
        </nav>

        <p className="text-sm text-gray-500 mb-6">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} in this
          category
        </p>

        <ProductGrid products={filtered} />

        {/* Back link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#2D6A4F] hover:text-[#1B4332] font-medium transition-colors"
          >
            &larr; View All Products
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
