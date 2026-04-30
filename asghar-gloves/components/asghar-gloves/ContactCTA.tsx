"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { company } from "@/data/company";

export default function ContactCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-20 lg:py-28 bg-[#061530] text-white overflow-hidden"
    >
      <div className="absolute inset-0 grid-pattern-dark opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(245,158,11,0.2) 0%, transparent 60%)",
        }}
      />
      <div className="absolute inset-0 noise-overlay" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#F59E0B] font-semibold">
            <span className="w-8 h-px bg-[#F59E0B]" />
            Start a Conversation
          </div>
          <h2 className="mt-4 font-display text-[38px] lg:text-[64px] leading-[1.05] font-bold tracking-tight">
            Ready for a sample,{" "}
            <span className="text-gradient-amber">a quote,</span>
            <br />
            or a private-label partnership?
          </h2>
          <p className="mt-6 text-[15px] lg:text-[18px] text-white/65 leading-relaxed">
            Whether you need a trial carton or a six-container commitment, our
            export desk responds within one business day. Call, write, or ping
            us on WhatsApp — whichever moves your procurement forward fastest.
          </p>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-12 gap-6">
          {/* Contact cards */}
          <div className="lg:col-span-5 grid gap-4">
            {[
              {
                Icon: Phone,
                label: "Direct Line",
                value: company.phone,
                href: `tel:${company.phone}`,
              },
              {
                Icon: MessageCircle,
                label: "WhatsApp Sales",
                value: `+${company.whatsapp}`,
                href: `https://wa.me/${company.whatsapp}`,
              },
              {
                Icon: Mail,
                label: "Export Desk",
                value: company.exportEmail,
                href: `mailto:${company.exportEmail}`,
              },
              {
                Icon: MapPin,
                label: "Factory",
                value: `${company.city}, ${company.country}`,
                href: "#",
              },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex items-center gap-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F59E0B]/40 px-5 py-4 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 flex items-center justify-center flex-shrink-0">
                  <item.Icon className="w-[18px] h-[18px] text-[#F59E0B]" strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-white/50 font-semibold">
                    {item.label}
                  </div>
                  <div className="mt-0.5 text-[14px] font-semibold text-white tracking-wide">
                    {item.value}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all" />
              </motion.a>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 rounded-3xl bg-white/[0.04] border border-white/10 p-6 lg:p-10 backdrop-blur-md"
          >
            <div className="text-[11px] tracking-[0.28em] uppercase text-[#F59E0B] font-semibold">
              Quick Inquiry
            </div>
            <h3 className="mt-3 font-display text-[24px] lg:text-[30px] font-bold tracking-tight">
              Tell us what you need.
            </h3>
            <p className="mt-2 text-[13px] text-white/55 leading-relaxed">
              One-business-day response. Include volume, glove type, and any
              certification requirements.
            </p>

            <form
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const message = encodeURIComponent(
                  `Hello Asghar Gloves,\n\nName: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nInterest: ${data.get("interest")}\n\n${data.get("message")}`
                );
                window.open(`https://wa.me/${company.whatsapp}?text=${message}`, "_blank");
              }}
            >
              <Field name="name" label="Your name" placeholder="Jane Buyer" />
              <Field name="company" label="Company" placeholder="Acme Industrial" />
              <Field name="email" label="Email" placeholder="jane@acme.com" type="email" />
              <Field name="interest" label="Product interest" placeholder="Hot mill / Dipped / ..." />
              <Field
                name="message"
                label="Message"
                placeholder="Quantity, target price, shipping..."
                textarea
                className="sm:col-span-2"
              />
              <button
                type="submit"
                className="sm:col-span-2 h-12 rounded-full bg-[#F59E0B] hover:bg-[#FBBF24] text-[#0B1F3A] font-semibold text-[14px] tracking-wide flex items-center justify-center gap-2 transition-colors"
              >
                Send on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  textarea = false,
  className = "",
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  textarea?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[10.5px] tracking-[0.25em] uppercase text-white/50 font-semibold mb-2">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={4}
          placeholder={placeholder}
          className="w-full rounded-xl bg-white/5 border border-white/10 focus:border-[#F59E0B] focus:outline-none px-4 py-3 text-[14px] text-white placeholder:text-white/30 transition-colors resize-none"
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full h-12 rounded-xl bg-white/5 border border-white/10 focus:border-[#F59E0B] focus:outline-none px-4 text-[14px] text-white placeholder:text-white/30 transition-colors"
        />
      )}
    </label>
  );
}
