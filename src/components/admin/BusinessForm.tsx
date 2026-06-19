"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { BusinessInfo } from "@/lib/types";
import { saveBusiness } from "@/app/admin/actions";
import { Field, Input, Textarea } from "./FormKit";

export default function BusinessForm({ business }: { business: BusinessInfo }) {
  const [saved] = useState(false);
  const hoursText = business.hours.map((h) => `${h.day} | ${h.time}`).join("\n");
  const socialsText = business.socials.map((s) => `${s.label} | ${s.href} | ${s.icon}`).join("\n");

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-cream">Business Info</h1>
        <p className="mt-1 text-sm text-mist">These details power the contact section, footer, WhatsApp & call buttons across the site.</p>
      </header>

      <form action={saveBusiness} className="glass max-w-3xl rounded-2xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Business name"><Input name="name" defaultValue={business.name} /></Field>
          <Field label="Tagline"><Input name="tagline" defaultValue={business.tagline} /></Field>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Phone (display)" hint="e.g. +91 98765 43210"><Input name="phone" defaultValue={business.phone} /></Field>
          <Field label="Phone (dial)" hint="No spaces, e.g. +919876543210"><Input name="phoneHref" defaultValue={business.phoneHref} /></Field>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="WhatsApp number" hint="Country code + number, digits only"><Input name="whatsapp" defaultValue={business.whatsapp} placeholder="919876543210" /></Field>
          <Field label="Email"><Input name="email" type="email" defaultValue={business.email} /></Field>
        </div>

        <div className="mt-5">
          <Field label="Address"><Textarea name="address" rows={2} defaultValue={business.address} /></Field>
        </div>
        <div className="mt-5">
          <Field label="Google Maps search query" hint="Used in the embedded map, e.g. business name + city">
            <Input name="mapQuery" defaultValue={business.mapQuery} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Business hours" hint="One per line — format: Day | Time">
            <Textarea name="hours" rows={3} defaultValue={hoursText} placeholder={"Monday – Saturday | 10:00 AM – 8:30 PM\nSunday | 11:00 AM – 6:00 PM"} />
          </Field>
        </div>

        <div className="mt-5">
          <Field label="Social links" hint="One per line — format: Label | URL | icon (instagram, facebook, youtube, linkedin)">
            <Textarea name="socials" rows={4} defaultValue={socialsText} placeholder={"Instagram | https://instagram.com/... | instagram"} />
          </Field>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <button type="submit" className="btn-gold rounded-full px-7 py-3 text-sm font-semibold">Save Changes</button>
          {saved && <span className="flex items-center gap-1 text-sm text-green-400"><Check className="h-4 w-4" /> Saved</span>}
        </div>
      </form>
    </div>
  );
}
