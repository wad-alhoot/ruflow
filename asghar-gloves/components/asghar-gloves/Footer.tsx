"use client";

import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { company } from "@/data/company";
import { productCategories } from "@/data/products";

export default function Footer() {
  return (
    <footer className="relative bg-[#061530] text-white/70 border-t border-white/10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-20 grid lg:grid-cols-12 gap-10 lg:gap-8">
        {/* Brand block */}
        <div className="lg:col-span-4">
          <a href="/" className="inline-flex items-center gap-3">
            <Image
              src="/images/logo-white.png"
              alt="Asghar Gloves"
              width={44}
              height={36}
              style={{ width: "auto", height: 36 }}
            />
            <div>
              <div className="font-bold text-white text-[15px] tracking-wide leading-tight">
                ASGHAR GLOVES
              </div>
              <div className="text-[10px] text-white/40 tracking-[0.25em] uppercase mt-0.5">
                Industrial · Safety · Since 2010
              </div>
            </div>
          </a>

          <p className="mt-6 text-[13px] text-white/55 leading-relaxed max-w-md">
            Protective and industrial glove manufacturer based in Faisalabad,
            Pakistan. Sixteen years of crafting hand protection for steel mills,
            construction sites, logistics networks, and global OEM buyers.
          </p>

          <div className="mt-6 space-y-2.5 text-[13px]">
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.exportEmail}`}
              className="flex items-center gap-3 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#F59E0B]" />
              {company.exportEmail}
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              {company.city}, {company.country}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/40 font-semibold">
            Catalog
          </div>
          <ul className="mt-5 space-y-2.5 text-[13px]">
            {productCategories.slice(0, 8).map((cat) => (
              <li key={cat.slug}>
                <a
                  href={`#products`}
                  className="hover:text-[#F59E0B] transition-colors"
                >
                  {cat.shortName}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/40 font-semibold">
            Company
          </div>
          <ul className="mt-5 space-y-2.5 text-[13px]">
            <li><a href="#about" className="hover:text-[#F59E0B] transition-colors">Our Story</a></li>
            <li><a href="#manufacturing" className="hover:text-[#F59E0B] transition-colors">Manufacturing</a></li>
            <li><a href="#certifications" className="hover:text-[#F59E0B] transition-colors">Certifications</a></li>
            <li><a href="#industries" className="hover:text-[#F59E0B] transition-colors">Industries</a></li>
            <li><a href="#contact" className="hover:text-[#F59E0B] transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="lg:col-span-3">
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/40 font-semibold">
            Services
          </div>
          <ul className="mt-5 space-y-2.5 text-[13px]">
            <li><span className="hover:text-[#F59E0B] transition-colors cursor-default">OEM Manufacturing</span></li>
            <li><span className="hover:text-[#F59E0B] transition-colors cursor-default">Private Label</span></li>
            <li><span className="hover:text-[#F59E0B] transition-colors cursor-default">Custom Specifications</span></li>
            <li><span className="hover:text-[#F59E0B] transition-colors cursor-default">Export Shipping</span></li>
          </ul>

          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 px-4 h-10 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#FBBF24] hover:bg-[#F59E0B]/20 text-[12px] font-semibold tracking-wide transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-wide text-white/40">
          <div>
            © {new Date().getFullYear()} Asghar Gloves. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <span>Registered Entity · Pakistan</span>
            <span className="hidden sm:inline">·</span>
            <span>Export Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
