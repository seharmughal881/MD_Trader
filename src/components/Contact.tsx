"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Clock, MessageCircle, Send, Check } from "lucide-react";
import { productInterests as categoryOptions } from "@/lib/data";
import type { BusinessInfo } from "@/lib/types";
import type { SiteContent } from "@/lib/content";
import SectionHeading from "./SectionHeading";

export default function Contact({ business, heading }: { business: BusinessInfo; heading: SiteContent["contact"] }) {
  const [form, setForm] = useState({ name: "", phone: "", interest: categoryOptions[0], message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose a WhatsApp message as a lightweight, backend-free lead capture.
    const text = encodeURIComponent(
      `New enquiry from ${business.name} website%0A` +
        `Name: ${form.name}%0APhone: ${form.phone}%0AInterested in: ${form.interest}%0A` +
        `Message: ${form.message}`
    );
    window.open(`https://wa.me/${business.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapQuery)}&output=embed`;

  return (
    <section id="contact" className="section relative overflow-hidden bg-onyx/40">
      <div className="absolute left-0 bottom-0 h-[40vh] w-[40vh] rounded-full bg-gold/5 blur-[140px]" />
      <div className="container-luxe relative">
        <SectionHeading
          eyebrow={heading.eyebrow}
          title={heading.title}
          highlight={heading.highlight}
          subtitle={heading.subtitle}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                href={`https://wa.me/${business.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-5 transition-all hover:border-[#25D366]/60"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366] text-ink">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ash">Chat on</p>
                  <p className="font-semibold text-cream">WhatsApp</p>
                </div>
              </a>
              <a
                href={`tel:${business.phoneHref}`}
                className="group flex items-center gap-4 rounded-2xl border border-gold/20 bg-charcoal/50 p-5 transition-all hover:border-gold/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-ink">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-ash">Call us</p>
                  <p className="font-semibold text-cream">Now</p>
                </div>
              </a>
            </div>

            <div className="glass space-y-5 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-cream">Visit Our Showroom</p>
                  <p className="text-sm text-mist">{business.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-cream">Email</p>
                  <a href={`mailto:${business.email}`} className="text-sm text-mist hover:text-gold">
                    {business.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-sm font-semibold text-cream">Business Hours</p>
                  {business.hours.map((h) => (
                    <p key={h.day} className="text-sm text-mist">
                      <span className="text-cream">{h.day}:</span> {h.time}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gold/15">
              <iframe
                title="MD Traders Showroom Location"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full grayscale-[0.3] contrast-110"
                style={{ filter: "invert(0.9) hue-rotate(180deg)" }}
              />
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
            className="glass rounded-3xl p-7 sm:p-9"
          >
            {sent ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-semibold text-cream">Thank You!</h3>
                <p className="mt-3 max-w-sm text-sm text-mist">
                  Your enquiry is on its way. Our team will get back to you shortly. We&apos;ve
                  also opened WhatsApp so you can chat with us instantly.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="btn-ghost mt-6 rounded-full px-6 py-2.5 text-sm font-semibold"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-display text-2xl font-semibold text-cream">
                  Request a Free Consultation
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="input-luxe"
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 00000 00000"
                      className="input-luxe"
                    />
                  </Field>
                </div>
                <Field label="Interested In">
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="input-luxe"
                  >
                    {categoryOptions.map((o) => (
                      <option key={o} value={o} className="bg-charcoal">
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your project…"
                    className="input-luxe resize-none"
                  />
                </Field>
                <button
                  type="submit"
                  className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-semibold"
                >
                  Send Enquiry <Send className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-ash">
                  By submitting, you agree to be contacted by our team.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ash">
        {label}
      </span>
      {children}
    </label>
  );
}
