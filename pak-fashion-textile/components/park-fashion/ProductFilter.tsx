"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
}: ProductFilterProps) {
  const hasActiveFilters = selectedCategory !== "All" || searchQuery.length > 0;

  const handleClearFilters = () => {
    onCategoryChange("All");
    onSearchChange("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
      {/* Search input */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products by name, specs, or category..."
          className="w-full pl-12 pr-11 py-3.5 rounded-xl border border-gray-200 bg-[#F8FAF8] text-[#1A1A2E] placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/25 focus:border-[#2D6A4F] focus:shadow-[0_0_0_4px_rgba(45,106,79,0.08)] transition-all duration-200"
        />
        {/* Clear search */}
        <AnimatePresence>
          {searchQuery.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 transition-colors duration-150"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Category filter pills + clear */}
      <div className="flex items-center gap-3">
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-x-visible scrollbar-hide flex-1">
          {["All", ...categories].map((category) => {
            const isActive = selectedCategory === category;
            return (
              <motion.button
                key={category}
                onClick={() => onCategoryChange(category)}
                whileTap={{ scale: 0.95 }}
                className={`relative flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/20"
                    : "bg-gray-50 border border-gray-200 text-gray-600 hover:border-[#2D6A4F]/40 hover:text-[#2D6A4F] hover:bg-[#2D6A4F]/5"
                }`}
              >
                {category}
              </motion.button>
            );
          })}
        </div>

        {/* Clear filters link */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              onClick={handleClearFilters}
              className="flex-shrink-0 text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] underline underline-offset-2 transition-colors duration-150"
            >
              Clear filters
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
