"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  Award,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { companyInfo, categories } from "@/data/park-fashion-products";

export default function Footer() {
  const [email, setEmail] = useState("");

  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to inquire about your products."
  )}`;

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/services" },
    { label: "Custom Orders", href: "/custom-orders" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Globe, label: "Facebook", href: "#" },
    { icon: ExternalLink, label: "Instagram", href: "#" },
    { icon: Globe, label: "LinkedIn", href: "#" },
  ];

  const certifications = [
    { icon: Award, label: "ISO Certified" },
    { icon: ShieldCheck, label: "Quality Assured" },
    { icon: Globe, label: "Export Standard" },
  ];

  return (
    <footer className="relative bg-[#1B4332] text-white">
      {/* Wave SVG separator */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[calc(100%-1px)] overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-[50px] sm:h-[80px]"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 40C240 10 480 70 720 40C960 10 1200 70 1440 40V80H0V40Z"
            fill="#1B4332"
          />
        </svg>
      </div>

      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Stay Updated with Our Latest Products
              </h3>
              <p className="text-white/60 text-sm max-w-md">
                Subscribe to receive updates on new sublimation papers, ink
                innovations, and exclusive bulk order deals.
              </p>
            </div>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 sm:w-72 px-5 py-3.5 rounded-l-full bg-white/10 border border-white/15 border-r-0 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#D4A843]/50 focus:bg-white/15 transition-colors"
              />
              <button
                type="button"
                className="flex items-center gap-2 bg-[#D4A843] hover:bg-[#C49A3A] text-[#1B4332] font-semibold text-sm px-6 py-3.5 rounded-r-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,168,67,0.3)]"
              >
                <Send size={16} />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Pak Fashion Textile"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="font-bold text-base tracking-wide">PAK FASHION</p>
                <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase">
                  Textile
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {companyInfo.tagline}. Your trusted partner for sublimation
              products, custom sportswear, and hospital medical textiles.
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4A843]/20 flex items-center justify-center text-white/60 hover:text-[#D4A843] transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h4 className="text-[#D4A843] font-semibold text-sm tracking-wide uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group text-white/60 hover:text-[#D4A843] text-sm transition-colors duration-300 relative inline-block"
                  >
                    {l.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4A843] group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories column */}
          <div>
            <h4 className="text-[#D4A843] font-semibold text-sm tracking-wide uppercase mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {Array.from(new Set(categories.map((c) => c.group))).map(
                (group) =>
                  group && (
                    <li key={group}>
                      <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mb-1.5">
                        {group}
                      </p>
                      <ul className="space-y-1.5 mb-3">
                        {categories
                          .filter((c) => c.group === group)
                          .map((c) => (
                            <li key={c.slug}>
                              <Link
                                href={`/products/${c.slug}`}
                                className="group text-white/60 hover:text-[#D4A843] text-xs transition-colors duration-300 relative inline-block"
                              >
                                {c.name}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4A843] group-hover:w-full transition-all duration-300" />
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4 className="text-[#D4A843] font-semibold text-sm tracking-wide uppercase mb-5">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/60 hover:text-[#25D366] text-sm transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <MessageCircle size={14} />
                  </span>
                  {companyInfo.whatsappDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="group flex items-center gap-3 text-white/60 hover:text-[#D4A843] text-sm transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D4A843]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={14} />
                  </span>
                  {companyInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="group flex items-center gap-3 text-white/60 hover:text-[#D4A843] text-sm transition-colors"
                >
                  <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#D4A843]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={14} />
                  </span>
                  {companyInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} />
                </span>
                {companyInfo.address}
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications / Partners row */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
            {certifications.map((cert) => {
              const Icon = cert.icon;
              return (
                <div
                  key={cert.label}
                  className="flex items-center gap-2.5 text-white/40"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#D4A843]/60" />
                  </div>
                  <span className="text-xs font-medium tracking-wide uppercase">
                    {cert.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Pak Fashion Textile. All rights
              reserved.
            </p>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-white/50 text-xs font-medium">
              Made in Pakistan{" "}
              <span role="img" aria-label="Pakistan flag">
                🇵🇰
              </span>
            </p>
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={14} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
