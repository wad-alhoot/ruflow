import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services — Pak Fashion Textile",
  description:
    "Sublimation printing, custom apparel manufacturing, bulk production, and design services by Pak Fashion Textile.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
