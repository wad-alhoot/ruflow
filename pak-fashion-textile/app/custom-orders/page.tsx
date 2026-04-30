import type { Metadata } from "next";
import CustomOrdersClient from "./CustomOrdersClient";

export const metadata: Metadata = {
  title: "Custom Orders — Pak Fashion Textile",
  description: "Place custom orders for team sportswear, medical textiles, sublimation products with your specifications.",
};

export default function CustomOrdersPage() {
  return <CustomOrdersClient />;
}
