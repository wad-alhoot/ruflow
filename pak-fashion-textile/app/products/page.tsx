import type { Metadata } from "next";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "Products — Pak Fashion Textile",
  description:
    "Browse our complete catalog of sublimation papers, printing inks, custom team sportswear, hospital medical textiles, and machine spare parts.",
};

export default function ProductsPage() {
  return <ProductsClient />;
}
