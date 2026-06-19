"use client";

import type { SiteContent } from "@/lib/content";
import { saveContent } from "@/app/admin/actions";
import { Field, Input, Textarea } from "./FormKit";

function Section({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="glass mb-4 rounded-2xl p-5 sm:p-6">
      <summary className="cursor-pointer font-display text-lg font-semibold text-cream">{title}</summary>
      <div className="mt-5 space-y-5">{children}</div>
    </details>
  );
}

function HeadingFields({ k, h }: { k: string; h: { eyebrow: string; title: string; highlight: string; subtitle: string } }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Eyebrow"><Input name={`${k}.eyebrow`} defaultValue={h.eyebrow} /></Field>
        <Field label="Title"><Input name={`${k}.title`} defaultValue={h.title} /></Field>
        <Field label="Highlight (gold)"><Input name={`${k}.highlight`} defaultValue={h.highlight} /></Field>
      </div>
      <Field label="Subtitle"><Textarea name={`${k}.subtitle`} rows={2} defaultValue={h.subtitle} /></Field>
    </>
  );
}

export default function ContentForm({ content }: { content: SiteContent }) {
  const c = content;
  const heroStats = c.hero.stats.map((s) => `${s.value} | ${s.label}`).join("\n");
  const strengths = c.about.strengths.map((s) => `${s.icon} | ${s.title} | ${s.desc}`).join("\n");
  const whyStats = c.why.stats.map((s) => `${s.value} | ${s.suffix} | ${s.label} | ${s.icon}`).join("\n");
  const reasons = c.why.reasons.map((r) => `${r.icon} | ${r.title} | ${r.desc}`).join("\n");

  return (
    <div>
      <header className="mb-6">
        <h1 className="font-display text-3xl font-semibold text-cream">Website Text</h1>
        <p className="mt-1 text-sm text-mist">Edit all the text on your homepage. Changes go live instantly.</p>
      </header>

      <form action={saveContent}>
        <Section title="Brands Strip (moving line)" open>
          <Field label="Heading"><Input name="brandsTitle" defaultValue={c.brandsTitle} /></Field>
          <Field label="Brand names" hint="Comma or new-line separated">
            <Textarea name="brands" rows={3} defaultValue={c.brands.join(", ")} />
          </Field>
        </Section>

        <Section title="Hero (top banner)">
          <Field label="Badge text"><Input name="hero.badge" defaultValue={c.hero.badge} /></Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Headline – line 1"><Input name="hero.titleTop" defaultValue={c.hero.titleTop} /></Field>
            <Field label="Headline – line 2 (gold)"><Input name="hero.titleBottom" defaultValue={c.hero.titleBottom} /></Field>
          </div>
          <Field label="Subheadline"><Textarea name="hero.subheadline" rows={2} defaultValue={c.hero.subheadline} /></Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Primary button"><Input name="hero.ctaPrimary" defaultValue={c.hero.ctaPrimary} /></Field>
            <Field label="Secondary button"><Input name="hero.ctaSecondary" defaultValue={c.hero.ctaSecondary} /></Field>
          </div>
          <Field label="Mini stats" hint="One per line — format: value | label">
            <Textarea name="hero.stats" rows={3} defaultValue={heroStats} />
          </Field>
        </Section>

        <Section title="About section">
          <HeadingFields k="about" h={c.about} />
          <Field label="Strengths" hint="One per line — format: icon | title | description">
            <Textarea name="about.strengths" rows={6} defaultValue={strengths} />
          </Field>
        </Section>

        <Section title="Why Choose Us section">
          <HeadingFields k="why" h={c.why} />
          <Field label="Stats (animated counters)" hint="One per line — format: number | suffix | label | icon">
            <Textarea name="why.stats" rows={4} defaultValue={whyStats} />
          </Field>
          <Field label="Reasons" hint="One per line — format: icon | title | description">
            <Textarea name="why.reasons" rows={5} defaultValue={reasons} />
          </Field>
        </Section>

        <Section title="Other section headings">
          <p className="text-sm text-mist">Products</p>
          <HeadingFields k="products" h={c.products} />
          <p className="mt-4 text-sm text-mist">Gallery</p>
          <HeadingFields k="gallery" h={c.gallery} />
          <p className="mt-4 text-sm text-mist">Testimonials</p>
          <HeadingFields k="testimonials" h={c.testimonials} />
          <p className="mt-4 text-sm text-mist">Services</p>
          <HeadingFields k="services" h={c.services} />
          <p className="mt-4 text-sm text-mist">Contact</p>
          <HeadingFields k="contact" h={c.contact} />
        </Section>

        <div className="sticky bottom-4 mt-6">
          <button type="submit" className="btn-gold w-full rounded-full py-4 text-sm font-semibold shadow-lg sm:w-auto sm:px-10">
            Save All Changes
          </button>
        </div>
      </form>

      <p className="mt-4 text-xs text-ash">
        Available icon names: layout-grid, bath, sparkles, shower-head, chef-hat, sofa, gem,
        badge-check, wrench, tag, headset, shield-check, truck, home, palette, compass,
        utensils, ruler, award, users, building-2, trending-down.
      </p>
    </div>
  );
}
