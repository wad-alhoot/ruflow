import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Pak Fashion Textile",
  description:
    "Get in touch with Pak Fashion Textile for orders, inquiries, and bulk pricing.",
};

export default function ContactPage() {
  return <ContactClient />;
}
