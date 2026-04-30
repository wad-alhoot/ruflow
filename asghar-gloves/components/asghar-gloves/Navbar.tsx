"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";
import { company } from "@/data/company";
import { productCategories } from "@/data/products";

const navLinks = [
  { name: "Industries", href: "#industries" },
  { name: "Products", href: "#products", hasMenu: true },
  { name: "Manufacturing", href: "#manufacturing" },
  { name: "Certifications", href: "#certifications" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden lg:flex h-9 items-center justify-between bg-[#061530] text-white/70 text-[11px] tracking-wider px-6 xl:px-12 relative z-50">
        <div className="flex items-center gap-6">
          <a href={`tel:${company.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone className="w-3 h-3" /> {company.phone}
          </a>
          <a href={`mailto:${company.salesEmail}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail className="w-3 h-3" /> {company.salesEmail}
          </a>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-white/50">FAISALABAD · PAKISTAN</span>
          <span className="text-[#F59E0B]">EXPORT READY</span>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-[#E2E8F0] shadow-[0_2px_24px_rgba(11,31,58,0.06)]"
            : "bg-white/70 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-12 h-16 lg:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="Asghar Gloves"
              width={48}
              height={40}
              className="h-10 group-hover:scale-105 transition-transform"
              style={{ width: "auto", height: 40 }}
              priority
            />
            <div className="hidden sm:block">
              <div className="font-bold text-[15px] text-[#0B1F3A] tracking-wide leading-tight">
                ASGHAR GLOVES
              </div>
              <div className="text-[10px] text-[#64748B] tracking-[0.25em] uppercase">
                Industrial · Safety
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasMenu && setProductsOpen(true)}
                onMouseLeave={() => link.hasMenu && setProductsOpen(false)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 px-4 py-2 text-[13.5px] font-medium text-[#1E293B] hover:text-[#0B1F3A] transition-colors"
                >
                  {link.name}
                  {link.hasMenu && <ChevronDown className="w-3.5 h-3.5" />}
                </a>

                {link.hasMenu && (
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px]"
                      >
                        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_20px_60px_rgba(11,31,58,0.12)] p-3 grid grid-cols-2 gap-1">
                          {productCategories.map((cat) => (
                            <a
                              key={cat.slug}
                              href={`#products`}
                              className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-[#F8FAFC] transition-colors group/item"
                            >
                              <span
                                className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: cat.accent }}
                              />
                              <div>
                                <div className="text-[13px] font-semibold text-[#0B1F3A] group-hover/item:text-[#F59E0B] transition-colors">
                                  {cat.shortName}
                                </div>
                                <div className="text-[11px] text-[#64748B] leading-snug mt-0.5 line-clamp-1">
                                  {cat.useCases.slice(0, 3).join(" · ")}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 h-10 rounded-full bg-[#0B1F3A] hover:bg-[#1E3A6B] text-white text-[13px] font-semibold tracking-wide transition-colors"
            >
              Request Quote
            </a>

            <button
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#0B1F3A] hover:bg-[#F1F5F9] transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden border-t border-[#E2E8F0] bg-white"
            >
              <nav className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="py-2.5 text-[15px] font-medium text-[#0B1F3A] hover:text-[#F59E0B] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 inline-flex items-center justify-center px-5 h-11 rounded-full bg-[#0B1F3A] text-white text-[14px] font-semibold"
                >
                  Request Quote
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
