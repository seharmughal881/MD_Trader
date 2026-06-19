"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";
import type { BusinessInfo } from "@/lib/types";

export default function LeadPopup({ business }: { business: BusinessInfo }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("md_lead_seen")) return;
    const t = setTimeout(() => setOpen(true), 9000);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem("md_lead_seen", "1");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hi MD Traders! I'd like to claim the free design consultation.%0AName: ${name}%0APhone: ${phone}`
    );
    window.open(`https://wa.me/${business.whatsapp}?text=${text}`, "_blank");
    close();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.5, ease: ([0.22, 1, 0.36, 1] as [number, number, number, number]) }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative z-10 grid w-full max-w-3xl overflow-hidden rounded-3xl md:grid-cols-2"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-cream hover:bg-gold/10"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Visual side */}
            <div className="relative hidden min-h-full md:block">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 90% at 30% 20%, rgba(201,162,77,0.3), transparent 55%), linear-gradient(160deg, #23211b, #0c0c0d)",
                }}
              />
              <div className="bg-grain absolute inset-0 opacity-20 mix-blend-overlay" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <Gift className="h-10 w-10 text-gold" />
                <p className="font-display mt-4 text-3xl font-semibold leading-tight text-cream">
                  Free Design <span className="text-gold-gradient">Consultation</span>
                </p>
                <p className="mt-2 text-sm text-mist">Worth ₹5,000 — yours, on us.</p>
              </div>
            </div>

            {/* Form side */}
            <div className="p-7 sm:p-9">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold">
                Limited Offer
              </span>
              <h3 className="font-display mt-4 text-2xl font-semibold text-cream">
                Unlock Your Free Consultation
              </h3>
              <p className="mt-2 text-sm text-mist">
                Leave your details and our luxury design experts will reach out with a
                complimentary plan for your space.
              </p>
              <form onSubmit={submit} className="mt-6 space-y-4">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="input-luxe"
                />
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="input-luxe"
                />
                <button
                  type="submit"
                  className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold"
                >
                  Claim My Free Consultation <ArrowRight className="h-4 w-4" />
                </button>
              </form>
              <button onClick={close} className="mt-4 w-full text-center text-xs text-ash hover:text-mist">
                No thanks, maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
