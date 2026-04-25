import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import SmoothScroll from "@/components/asghar-gloves/SmoothScroll";
import LayoutClient from "./LayoutClient";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Asghar Gloves — Industrial & Safety Glove Manufacturer | Faisalabad, Pakistan",
  description:
    "Asghar Gloves manufactures high-quality protective and industrial gloves with 16 years of craftsmanship from Faisalabad, Pakistan. Cotton, nitrile-dipped, hot-mill, and specialized hand protection for global industrial markets.",
  keywords: [
    "industrial gloves manufacturer",
    "safety gloves Pakistan",
    "cotton gloves Faisalabad",
    "hot mill gloves",
    "nitrile dipped gloves",
    "jersey gloves",
    "seamless gloves",
    "canvas double palm gloves",
    "PPE manufacturer",
    "export quality gloves",
    "Asghar Gloves",
  ],
  openGraph: {
    title: "Asghar Gloves — Industrial & Safety Glove Manufacturer",
    description:
      "16 years of expertise. Protective and industrial gloves engineered for global standards. Manufactured in Faisalabad, Pakistan.",
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body>
        <LayoutClient>
          <SmoothScroll>{children}</SmoothScroll>
        </LayoutClient>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
