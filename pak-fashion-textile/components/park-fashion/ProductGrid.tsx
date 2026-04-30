"use client";

import type { Product } from "@/data/park-fashion-products";
import ProductCard from "@/components/park-fashion/ProductCard";

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
}

export default function ProductGrid({ products, onQuickView }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-gray-500 font-medium">No products found</p>
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
