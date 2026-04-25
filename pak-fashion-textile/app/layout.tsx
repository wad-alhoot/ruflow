// Root layout for Pak Fashion Textile app
// Updated: 2026-04-07 — synced with latest product catalog and gallery pages
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/park-fashion/SmoothScroll";
import LayoutClient from "./LayoutClient";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pak Fashion Textile — Sublimation Products, Custom Sportswear & Medical Textiles",
  description:
    "Your trusted B2B partner for sublimation papers, printing inks, custom team jerseys, uniforms, hospital gowns, scrub suits, and medical textiles. Export quality products for printing companies, sports teams, hospitals, and institutions across Pakistan and 5+ countries.",
  keywords: [
    "sublimation paper",
    "printing inks",
    "sublimation ink",
    "custom team sportswear",
    "football jersey",
    "hospital bed sheets",
    "scrub suits",
    "medical textiles",
    "machine spare parts",
    "textile printing",
    "Pak Fashion Textile",
    "B2B printing supplies",
    "Pakistan printing",
    "export quality",
  ],
  openGraph: {
    title: "Pak Fashion Textile — Sublimation Products, Sportswear & Medical Textiles",
    description:
      "Trusted by 200+ businesses across 5+ countries. Sublimation products, custom sportswear, and hospital textiles at competitive prices.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
      <body>
        <LayoutClient>
          <SmoothScroll>{children}</SmoothScroll>
        </LayoutClient>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
