import type { Metadata } from "next";
import GalleryPageClient from "./GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery — Pak Fashion Textile",
  description: "Browse our production gallery showcasing sublimation printing, sportswear manufacturing, and medical textiles.",
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
