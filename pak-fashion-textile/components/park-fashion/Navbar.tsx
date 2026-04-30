"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  Newspaper,
  Shirt,
  Trophy,
  Stethoscope,
  BedDouble,
  Printer,
  Hand,
  Sofa,
  Factory,
  Palette,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companyInfo } from "@/data/park-fashion-products";

/* ─── Navigation structure ─────────────────────────────── */

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products", dropdown: "products" },
  { label: "Services", href: "/services", dropdown: "services" },
  { label: "Custom Orders", href: "/custom-orders" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const productsDropdown = [
  {
    group: "Sublimation Materials",
    items: [
      { label: "Sublimation Paper", href: "/products/sublimation-paper", icon: Newspaper },
    ],
  },
  {
    group: "Apparel & Sportswear",
    items: [
      { label: "Sports T-Shirts", href: "/products/sports-tshirts", icon: Shirt },
      { label: "Polo T-Shirts", href: "/products/polo-tshirts", icon: Shirt },
      { label: "Hoodies", href: "/products/hoodies", icon: Shirt },
      { label: "Team Uniforms", href: "/products/team-uniforms", icon: Trophy },
      { label: "Custom Jerseys", href: "/products/custom-jerseys", icon: Shirt },
    ],
  },
  {
    group: "Medical Wear",
    items: [
      { label: "OT & Surgical Kits", href: "/products/ot-surgical-kits", icon: Stethoscope },
      { label: "Patient Gowns", href: "/products/patient-gowns", icon: BedDouble },
    ],
  },
  {
    group: "Home Textiles",
    items: [
      { label: "Bedsheets", href: "/products/bedsheets", icon: BedDouble },
      { label: "Pillow Cases", href: "/products/pillow-cases", icon: Sofa },
    ],
  },
  {
    group: "Safety & Industrial Gloves",
    items: [
      { label: "Interlock Gloves", href: "/products/interlock-gloves", icon: Hand },
      { label: "Nylon Gloves", href: "/products/nylon-gloves", icon: Hand },
      { label: "PVC Dotted Gloves", href: "/products/pvc-dotted-gloves", icon: Hand },
      { label: "Drill Gloves", href: "/products/drill-gloves", icon: Hand },
      { label: "Terry & Mitten Gloves", href: "/products/terry-mitten-gloves", icon: Hand },
      { label: "Polyester Gloves", href: "/products/polyester-gloves", icon: Hand },
      { label: "Jersey Gloves", href: "/products/jersey-gloves", icon: Hand },
      { label: "Seamless Knitted Gloves", href: "/products/seamless-knitted-gloves", icon: Hand },
    ],
  },
];

const servicesDropdown = [
  { label: "Sublimation Printing", href: "/services/sublimation-printing", icon: Printer },
  { label: "Custom Apparel Manufacturing", href: "/services/custom-apparel", icon: Shirt },
  { label: "Bulk Production", href: "/services/bulk-production", icon: Factory },
  { label: "Design Services", href: "/services/design-services", icon: Palette },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleEnter = (key: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(key);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 200);
  };

  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hi Pak Fashion Textile, I'd like to inquire about your products."
  )}`;

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#143728] border-b border-[#D4A843]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-8 gap-2 text-xs sm:text-[13px]">
            <span className="text-[#D4A843] font-medium tracking-wide">
              Free shipping on bulk orders
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-[#25D366] transition-colors"
            >
              <MessageCircle size={12} />
              WhatsApp: {companyInfo.whatsappDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1B4332]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/5"
            : "bg-[#1B4332]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <Image
                  src="/logo.png"
                  alt="Pak Fashion Textile"
                  fill
                  className="object-contain"
                  sizes="64px"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-white font-bold text-base leading-tight tracking-wide group-hover:text-[#D4A843] transition-colors duration-300">
                  PAK FASHION
                </p>
                <p className="text-white/50 text-[11px] tracking-[0.25em] uppercase">
                  Textile
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden xl:flex items-center gap-6">
              {navLinks.map((l) =>
                l.dropdown ? (
                  <div
                    key={l.href}
                    className="relative"
                    onMouseEnter={() => handleEnter(l.dropdown!)}
                    onMouseLeave={handleLeave}
                  >
                    <Link
                      href={l.href}
                      className={`relative flex items-center gap-1 text-sm font-medium tracking-wide transition-colors duration-300 py-1 group ${
                        isActive(l.href)
                          ? "text-[#D4A843]"
                          : "text-white/90 hover:text-[#D4A843]"
                      }`}
                    >
                      {l.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform duration-300 ${
                          openDropdown === l.dropdown ? "rotate-180" : ""
                        }`}
                      />
                      <span
                        className={`absolute bottom-0 left-0 h-[2px] bg-[#D4A843] transition-all duration-300 ease-out ${
                          isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>

                    {/* Products mega dropdown */}
                    {l.dropdown === "products" && (
                      <AnimatePresence>
                        {openDropdown === "products" && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full -left-60 mt-1 w-[920px] bg-white rounded-b-lg shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100"
                          >
                            <div className="grid grid-cols-4 divide-x divide-gray-100">
                              {/* Col 1: Sublimation Materials */}
                              <div className="py-5 px-1">
                                <p className="text-[11px] uppercase tracking-[0.15em] text-[#1B4332] font-bold mb-2 px-4">
                                  Sublimation Materials
                                </p>
                                {productsDropdown.filter(s => s.group === "Sublimation Materials").map((section) =>
                                  section.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`block px-4 py-2.5 text-[14px] transition-colors ${
                                        pathname === item.href
                                          ? "text-[#1B4332] font-semibold bg-[#1B4332]/5"
                                          : "text-gray-600 hover:text-[#1B4332] hover:bg-gray-50"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  ))
                                )}
                              </div>

                              {/* Col 2: Apparel & Sportswear */}
                              <div className="py-5 px-1">
                                <p className="text-[11px] uppercase tracking-[0.15em] text-[#1B4332] font-bold mb-2 px-4">
                                  Apparel & Sportswear
                                </p>
                                {productsDropdown.filter(s => s.group === "Apparel & Sportswear").map((section) =>
                                  section.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`block px-4 py-2.5 text-[14px] transition-colors ${
                                        pathname === item.href
                                          ? "text-[#1B4332] font-semibold bg-[#1B4332]/5"
                                          : "text-gray-600 hover:text-[#1B4332] hover:bg-gray-50"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  ))
                                )}
                              </div>

                              {/* Col 3: Medical Wear + Home Textiles */}
                              <div className="py-5 px-1">
                                <p className="text-[11px] uppercase tracking-[0.15em] text-[#1B4332] font-bold mb-2 px-4">
                                  Medical Wear
                                </p>
                                {productsDropdown.filter(s => s.group === "Medical Wear").map((section) =>
                                  section.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`block px-4 py-2.5 text-[14px] transition-colors ${
                                        pathname === item.href
                                          ? "text-[#1B4332] font-semibold bg-[#1B4332]/5"
                                          : "text-gray-600 hover:text-[#1B4332] hover:bg-gray-50"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  ))
                                )}
                                <div className="my-3 mx-4 border-t border-gray-100" />
                                <p className="text-[11px] uppercase tracking-[0.15em] text-[#1B4332] font-bold mb-2 px-4">
                                  Home Textiles
                                </p>
                                {productsDropdown.filter(s => s.group === "Home Textiles").map((section) =>
                                  section.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`block px-4 py-2.5 text-[14px] transition-colors ${
                                        pathname === item.href
                                          ? "text-[#1B4332] font-semibold bg-[#1B4332]/5"
                                          : "text-gray-600 hover:text-[#1B4332] hover:bg-gray-50"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  ))
                                )}
                              </div>

                              {/* Col 4: Safety & Industrial Gloves */}
                              <div className="py-5 px-1">
                                <p className="text-[11px] uppercase tracking-[0.15em] text-[#1B4332] font-bold mb-2 px-4">
                                  Safety & Industrial Gloves
                                </p>
                                {productsDropdown.filter(s => s.group === "Safety & Industrial Gloves").map((section) =>
                                  section.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`block px-4 py-2.5 text-[14px] transition-colors ${
                                        pathname === item.href
                                          ? "text-[#1B4332] font-semibold bg-[#1B4332]/5"
                                          : "text-gray-600 hover:text-[#1B4332] hover:bg-gray-50"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  ))
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}

                    {/* Services dropdown */}
                    {l.dropdown === "services" && (
                      <AnimatePresence>
                        {openDropdown === "services" && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-b-lg shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100"
                          >
                            <div className="py-3 px-1">
                              {servicesDropdown.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`block px-4 py-2.5 text-[14px] transition-colors ${
                                    pathname === item.href
                                      ? "text-[#1B4332] font-semibold bg-[#1B4332]/5"
                                      : "text-gray-600 hover:text-[#1B4332] hover:bg-gray-50"
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ) : (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-300 py-1 group ${
                      isActive(l.href)
                        ? "text-[#D4A843]"
                        : "text-white/90 hover:text-[#D4A843]"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-[#D4A843] transition-all duration-300 ease-out ${
                        isActive(l.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                )
              )}

              {/* WhatsApp button */}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md hover:shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <span className="relative">
                  <MessageCircle size={16} />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-300 border border-[#25D366]">
                    <span className="absolute inset-0 rounded-full bg-green-300 animate-ping opacity-75" />
                  </span>
                </span>
                WhatsApp
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="xl:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="xl:hidden overflow-hidden"
            >
              <div className="bg-[#1B4332]/98 backdrop-blur-lg border-t border-white/10 px-4 py-5 space-y-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    {l.dropdown ? (
                      <div>
                        <button
                          onClick={() =>
                            setMobileExpanded(
                              mobileExpanded === l.dropdown ? null : l.dropdown!
                            )
                          }
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                            isActive(l.href)
                              ? "text-[#D4A843] bg-[#D4A843]/10"
                              : "text-white/90 hover:text-[#D4A843] hover:bg-white/5"
                          }`}
                        >
                          {l.label}
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-300 ${
                              mobileExpanded === l.dropdown ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileExpanded === l.dropdown && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-2 space-y-1">
                                <Link
                                  href={l.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2 text-[#D4A843] text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/5"
                                >
                                  View All <ChevronRight size={10} />
                                </Link>
                                {l.dropdown === "products" &&
                                  productsDropdown.map((section) => (
                                    <div key={section.group}>
                                      <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] px-4 pt-2 pb-1">
                                        {section.group}
                                      </p>
                                      {section.items.map((item) => (
                                        <Link
                                          key={item.href}
                                          href={item.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="flex items-center gap-2 text-white/60 hover:text-[#D4A843] text-xs px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                          <ChevronRight size={10} className="flex-shrink-0" />
                                          {item.label}
                                        </Link>
                                      ))}
                                    </div>
                                  ))}
                                {l.dropdown === "services" &&
                                  servicesDropdown.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setMobileOpen(false)}
                                      className="flex items-center gap-2 text-white/60 hover:text-[#D4A843] text-xs px-4 py-2 rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                      <ChevronRight size={10} className="flex-shrink-0" />
                                      {item.label}
                                    </Link>
                                  ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-colors ${
                          isActive(l.href)
                            ? "text-[#D4A843] bg-[#D4A843]/10"
                            : "text-white/90 hover:text-[#D4A843] hover:bg-white/5"
                        }`}
                      >
                        {l.label}
                        {isActive(l.href) && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                        )}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* WhatsApp button */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.25 }}
                >
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-5 py-3.5 rounded-full mt-4 transition-all hover:bg-[#128C7E] shadow-lg"
                  >
                    <span className="relative">
                      <MessageCircle size={16} />
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-300 animate-ping" />
                    </span>
                    WhatsApp Us
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
