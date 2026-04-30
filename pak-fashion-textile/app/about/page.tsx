import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us — Pak Fashion Textile",
  description:
    "Learn about Pak Fashion Textile — your trusted B2B partner for sublimation papers and printing supplies.",
};

export default function AboutPage() {
  return <AboutClient />;
}
