"use client";

import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const partners = [
  { name: "Karachi Print Works", city: "Karachi" },
  { name: "Lahore Sublimation Co.", city: "Lahore" },
  { name: "Faisalabad Textile Hub", city: "Faisalabad" },
  { name: "Islamabad Graphics", city: "Islamabad" },
  { name: "Multan Printing House", city: "Multan" },
  { name: "Peshawar Digital Arts", city: "Peshawar" },
  { name: "Sialkot Sports Wear", city: "Sialkot" },
  { name: "Rawalpindi Fabrics", city: "Rawalpindi" },
  { name: "Hyderabad Print Lab", city: "Hyderabad" },
  { name: "Gujranwala Textiles", city: "Gujranwala" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export default function PartnersMarquee() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeIn}
          className="text-center mb-8"
        >
          <p className="text-[#D4A843] text-sm font-semibold tracking-[0.2em] uppercase mb-2">
            Our Network
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Trusted by Leading Companies
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            Partnering with businesses across Pakistan and beyond
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Row 1: Left to right */}
        <Marquee
          speed={35}
          pauseOnHover={true}
          gradient={true}
          gradientColor="white"
          gradientWidth={80}
          className="py-2"
        >
          {partners.slice(0, 5).map((partner) => (
            <div
              key={partner.name}
              className="mx-3 inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl backdrop-blur-md bg-white/70 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#2D6A4F]/20 transition-all duration-300 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D6A4F]/10 to-[#D4A843]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#2D6A4F]/20 group-hover:to-[#D4A843]/20 transition-all duration-300">
                <span className="text-[#2D6A4F] font-bold text-xs">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="text-[#1A1A2E] font-semibold text-sm whitespace-nowrap block">
                  {partner.name}
                </span>
                <span className="text-gray-400 text-[10px]">{partner.city}</span>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Row 2: Right to left */}
        <Marquee
          speed={30}
          pauseOnHover={true}
          gradient={true}
          gradientColor="white"
          gradientWidth={80}
          direction="right"
          className="py-2"
        >
          {partners.slice(5).map((partner) => (
            <div
              key={partner.name}
              className="mx-3 inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl backdrop-blur-md bg-white/70 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#D4A843]/20 transition-all duration-300 cursor-default group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A843]/10 to-[#2D6A4F]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#D4A843]/20 group-hover:to-[#2D6A4F]/20 transition-all duration-300">
                <span className="text-[#D4A843] font-bold text-xs">
                  {partner.name.charAt(0)}
                </span>
              </div>
              <div>
                <span className="text-[#1A1A2E] font-semibold text-sm whitespace-nowrap block">
                  {partner.name}
                </span>
                <span className="text-gray-400 text-[10px]">{partner.city}</span>
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
