// Main entry page for Pak Fashion Textile website
import type { Metadata } from "next";
import ParkFashionClient from "./ParkFashionClient";

export const metadata: Metadata = {
  title: "Pak Fashion Textile — Premium Sublimation Papers & Printing Supplies",
  description:
    "Your trusted B2B partner for sublimation papers, printing inks, and machine spare parts. Export quality products for printing companies, factories, and government.",
};

export default function HomePage() {
  return <ParkFashionClient />;
}
