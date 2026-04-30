"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What types of sublimation paper do you offer?",
    answer:
      "We offer a wide range of sublimation papers from 29 GSM to 49 GSM in various widths (29\", 44\", 60\", 72\") and roll lengths (500m, 1000m). Our papers are designed for high-speed roll-to-roll printing on polyester fabrics and deliver vibrant, long-lasting color transfer.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to 5+ countries worldwide. All our products meet international export standards with rigorous quality control. Contact us on WhatsApp for shipping rates and delivery timelines to your location.",
  },
  {
    question: "What is the minimum order quantity for bulk orders?",
    answer:
      "Minimum order quantities vary by product. For sublimation papers, the minimum is typically 5 rolls. For inks, minimum is 4 litres (1 CMYK set). Contact us for custom bulk pricing — we offer significant discounts on large orders.",
  },
  {
    question: "Are your inks compatible with all printers?",
    answer:
      "Our sublimation inks are universally compatible with major printer brands including Epson, Mimaki, Roland, and Mutoh. We offer both standard CMYK sets and extended 6-color sets (with Light Cyan and Light Magenta) for photo-quality printing.",
  },
  {
    question: "Do you offer technical support?",
    answer:
      "Absolutely. Our technical team provides support for color profiling, printer settings optimization, and troubleshooting. We also offer guidance on choosing the right paper GSM and ink type for your specific printing needs.",
  },
  {
    question: "What warranty do spare parts come with?",
    answer:
      "All machine spare parts come with a 3-6 month warranty depending on the part type. Print head assemblies carry a 6-month warranty, while consumable parts like Teflon sheets and damper sets come with a 3-month warranty.",
  },
  {
    question: "Do you make custom team uniforms and jerseys?",
    answer:
      "Yes! We produce fully custom sublimation-printed sportswear for football, volleyball, hockey, and cricket teams. You can customize team colors, logos, player names, and numbers. Minimum order is 10 pieces per design, with sizes from XS to 3XL.",
  },
  {
    question: "Do you supply hospital and medical textiles?",
    answer:
      "We supply a full range of hospital textiles including bed sheets, drawsheets, patient gowns, scrub suits, OT gowns, surgeon caps, and pillow covers. All products are designed for frequent industrial laundering and meet healthcare quality standards. Minimum orders start from 25–100 pieces depending on the product.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-[#2D6A4F]/5 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <HelpCircle size={14} />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Everything you need to know about our products and services.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === i
                    ? "border-[#2D6A4F]/20 bg-[#F8FAF8] shadow-sm"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span
                    className={`font-semibold text-sm md:text-base pr-4 transition-colors duration-200 ${
                      openIndex === i ? "text-[#2D6A4F]" : "text-gray-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      openIndex === i
                        ? "bg-[#2D6A4F] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 pt-0">
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
