"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  LayoutGrid,
  List,
  SearchX,
  ChevronDown,
} from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Footer from "@/components/park-fashion/Footer";
import ProductGrid from "@/components/park-fashion/ProductGrid";
import ProductFilter from "@/components/park-fashion/ProductFilter";
import ProductQuickView from "@/components/park-fashion/ProductQuickView";
import { products, categories, type Product } from "@/data/park-fashion-products";

type SortOption = "default" | "name-asc" | "name-desc" | "category";
type ViewMode = "grid" | "list";

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const sorted = [...items];
  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "category":
      return sorted.sort((a, b) => a.category.localeCompare(b.category));
    default:
      return sorted;
  }
}

export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  /* ── Intersection observer for fade-in ─────────────── */
  const { ref: gridRef, inView: gridInView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  const categoryNames = useMemo(
    () => categories.map((c) => c.name),
    []
  );

  const filtered = useMemo(() => {
    let result = products;

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          Object.values(p.specs).some((v) => v.toLowerCase().includes(q))
      );
    }

    return sortProducts(result, sortBy);
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Page banner */}
      <section className="relative bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-36 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(64,145,108,0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Browse our complete catalog of sublimation papers, printing inks,
            custom team sportswear, hospital medical textiles, and machine spare parts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4"
          >
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full border border-white/10">
              {products.length} Products Available
            </span>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductFilter
          categories={categoryNames}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Sort + View Mode Controls */}
        <div className="flex items-center justify-between mt-6 mb-6">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
            of {products.length} products
            {selectedCategory !== "All" && (
              <span className="text-[#2D6A4F] font-medium">
                {" "}
                in {selectedCategory}
              </span>
            )}
          </p>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white border border-gray-200 rounded-xl pl-4 pr-9 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/20 focus:border-[#2D6A4F] transition-all cursor-pointer"
              >
                <option value="default">Sort: Default</option>
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="category">Category</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2.5 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#2D6A4F] text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="Grid view"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 transition-colors ${
                  viewMode === "list"
                    ? "bg-[#2D6A4F] text-white"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                title="List view"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div
          ref={gridRef}
          className={`transition-all duration-700 ease-out ${
            gridInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {filtered.length === 0 ? (
            /* Enhanced empty state */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-20 h-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center mb-5">
                <SearchX size={32} className="text-[#2D6A4F]/50" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-400 text-sm max-w-sm mb-6">
                We couldn&apos;t find any products matching your current filters.
                Try adjusting your search or browse a different category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setSortBy("default");
                }}
                className="inline-flex items-center gap-2 text-[#2D6A4F] hover:text-[#1B4332] font-semibold text-sm transition-colors border border-[#2D6A4F]/20 hover:border-[#2D6A4F]/40 px-5 py-2.5 rounded-full"
              >
                Clear all filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <ProductGrid
              products={filtered}
              onQuickView={setQuickViewProduct}
            />
          ) : (
            /* List view */
            <div className="space-y-4">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  onClick={() => setQuickViewProduct(product)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-shadow duration-300 flex gap-5 items-center cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                          {product.name}
                        </h3>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {product.category}
                        </p>
                      </div>
                      <span className="flex-shrink-0 text-xs font-medium bg-[#2D6A4F]/10 text-[#2D6A4F] px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1.5 line-clamp-1">
                      {product.description}
                    </p>
                    {/* Specs inline */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Object.entries(product.specs).slice(0, 3).map(([key, val]) => (
                        <span
                          key={key}
                          className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded"
                        >
                          {key}: {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
