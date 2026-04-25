"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  Clock,
  CheckCircle2,
  ChevronDown,
  FileText,
} from "lucide-react";
import Navbar from "@/components/park-fashion/Navbar";
import Footer from "@/components/park-fashion/Footer";
import WhatsAppCTA from "@/components/park-fashion/WhatsAppCTA";
import { companyInfo } from "@/data/park-fashion-products";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function ContactClient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const waLink = `https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to inquire about your products."
  )}`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Message sent!", {
      description: "We'll get back to you within 24 hours.",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Banner */}
      <section className="relative bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#1B4332] pt-36 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(64,145,108,0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/70 text-lg"
          >
            We&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Form (3/5) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="backdrop-blur-md bg-white/80 border border-[#2D6A4F]/10 shadow-lg shadow-[#2D6A4F]/5 rounded-2xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Send Us a Message
                </h2>
                <p className="text-gray-400 text-sm mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="text-center py-12"
                    >
                      {/* Animated checkmark */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center mx-auto mb-5"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, duration: 0.3, type: "spring" }}
                        >
                          <CheckCircle2 size={40} className="text-[#2D6A4F]" />
                        </motion.div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl font-bold text-gray-900 mb-2"
                      >
                        Thank You!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-gray-500"
                      >
                        We&apos;ll get back to you soon. You can also reach us
                        directly on WhatsApp for a faster response.
                      </motion.p>
                      <motion.a
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full mt-6 hover:bg-[#128C7E] transition-colors"
                      >
                        <MessageCircle size={18} />
                        Chat on WhatsApp
                      </motion.a>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name
                          </label>
                          <div className="relative">
                            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              required
                              value={form.name}
                              onChange={handleChange}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 outline-none transition-all text-sm"
                              placeholder="Your name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              required
                              value={form.email}
                              onChange={handleChange}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 outline-none transition-all text-sm"
                              placeholder="you@company.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 outline-none transition-all text-sm"
                              placeholder="+92 xxx xxxxxxx"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Product Interest
                          </label>
                          <div className="relative">
                            <FileText size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <select
                              name="interest"
                              value={form.interest}
                              onChange={handleChange}
                              className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 outline-none transition-all text-sm bg-white appearance-none"
                            >
                              <option value="">Select a category</option>
                              <optgroup label="Sublimation Materials">
                                <option value="sublimation-paper">Sublimation Paper</option>
                                <option value="sublimation-ink">Sublimation Ink</option>
                                <option value="heat-transfer-materials">Heat Transfer Materials</option>
                              </optgroup>
                              <optgroup label="Sportswear">
                                <option value="sports-tshirts">Sports T-Shirts</option>
                                <option value="team-uniforms">Team Uniforms</option>
                                <option value="gym-wear">Gym Wear</option>
                                <option value="custom-jerseys">Custom Jerseys</option>
                              </optgroup>
                              <optgroup label="Medical Wear">
                                <option value="ot-surgical-kits">OT & Surgical Kits</option>
                                <option value="patient-gowns">Patient Gowns</option>
                              </optgroup>
                              <option value="custom-order">Custom Order</option>
                              <option value="other">Other</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Message
                        </label>
                        <div className="relative">
                          <MessageCircle size={16} className="absolute left-4 top-3.5 text-gray-400" />
                          <textarea
                            name="message"
                            required
                            rows={4}
                            value={form.message}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/20 outline-none transition-all text-sm resize-none"
                            placeholder="Tell us about your requirements..."
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-[#D4A843] hover:bg-[#C49A3A] text-[#1B4332] font-bold py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#D4A843]/20 text-sm"
                      >
                        <Send size={16} />
                        Send Message
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Contact Info (2/5) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="relative bg-[#1B4332] rounded-2xl p-8 text-white h-full overflow-hidden">
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)",
                  }}
                />

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-8">
                    Reach out to us for product inquiries, bulk orders, pricing,
                    or technical support. We respond within 24 hours.
                  </p>

                  <div className="space-y-6">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/30 transition-colors">
                        <MessageCircle
                          size={18}
                          className="text-[#25D366]"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">
                          WhatsApp
                        </p>
                        <p className="text-white/60 text-sm">
                          {companyInfo.whatsappDisplay}
                        </p>
                      </div>
                    </a>

                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                        <Phone size={18} className="text-[#D4A843]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">
                          Phone
                        </p>
                        <p className="text-white/60 text-sm">
                          {companyInfo.phone}
                        </p>
                      </div>
                    </a>

                    <a
                      href={`mailto:${companyInfo.email}`}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/15 transition-colors">
                        <Mail size={18} className="text-[#D4A843]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">
                          Email
                        </p>
                        <p className="text-white/60 text-sm">
                          {companyInfo.email}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={18} className="text-[#D4A843]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">
                          Address
                        </p>
                        <p className="text-white/60 text-sm">
                          {companyInfo.address}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Clock size={18} className="text-[#D4A843]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white/90">
                          Business Hours
                        </p>
                        <p className="text-white/60 text-sm">
                          Mon &ndash; Sat: 9:00 AM &ndash; 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-3.5 rounded-full transition-all duration-300 text-sm w-full"
                    >
                      <MessageCircle size={18} />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <WhatsAppCTA />
      <Footer />
    </div>
  );
}
