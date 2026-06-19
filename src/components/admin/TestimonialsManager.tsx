"use client";

import { useState } from "react";
import { Plus, Pencil, X, Star } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { saveTestimonial, deleteTestimonial } from "@/app/admin/actions";
import { Field, Input, Textarea, Select } from "./FormKit";
import { ImageField, DeleteButton } from "./ProductsManager";

type Editing = Testimonial | "new" | null;

export default function TestimonialsManager({ items }: { items: Testimonial[] }) {
  const [editing, setEditing] = useState<Editing>(null);
  const current = editing === "new" ? null : editing;
  const isOpen = editing !== null;

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cream">Testimonials</h1>
          <p className="mt-1 text-sm text-mist">{items.length} review{items.length === 1 ? "" : "s"}</p>
        </div>
        {!isOpen && (
          <button onClick={() => setEditing("new")} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add Review
          </button>
        )}
      </header>

      {isOpen && (
        <form key={current?.id ?? "new"} action={saveTestimonial} className="glass mb-8 rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-cream">{current ? "Edit Review" : "New Review"}</h2>
            <button type="button" onClick={() => setEditing(null)} className="text-ash hover:text-cream"><X className="h-5 w-5" /></button>
          </div>
          {current && <input type="hidden" name="id" value={current.id} />}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Customer name"><Input name="name" required defaultValue={current?.name} placeholder="Aarav Mehta" /></Field>
            <Field label="Role / Project"><Input name="role" defaultValue={current?.role} placeholder="Villa Owner, Whitefield" /></Field>
          </div>
          <div className="mt-5">
            <Field label="Review text"><Textarea name="text" rows={4} required defaultValue={current?.text} placeholder="What did the customer say?" /></Field>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            <Field label="Rating">
              <Select name="rating" defaultValue={String(current?.rating ?? 5)}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r} className="bg-charcoal">{r} stars</option>)}
              </Select>
            </Field>
            <Field label="Initials" hint="Used if no photo"><Input name="initials" defaultValue={current?.initials} placeholder="AM" maxLength={3} /></Field>
            <Field label="Display order"><Input name="order" type="number" defaultValue={current?.order ?? 0} /></Field>
          </div>
          <div className="mt-5"><ImageField name="imageUrl" defaultValue={current?.imageUrl} /></div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">{current ? "Save Changes" : "Add Review"}</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {items.map((t) => (
          <div key={t.id} className="glass flex items-start gap-4 rounded-2xl p-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/30 bg-charcoal font-display text-sm font-semibold text-gold-gradient">
              {t.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.imageUrl} alt={t.name} className="h-full w-full object-cover" />
              ) : (t.initials || t.name.slice(0, 2).toUpperCase())}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-cream">{t.name}</p>
                <span className="flex">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-gold text-gold" />)}</span>
              </div>
              <p className="line-clamp-2 text-sm text-mist">{t.text}</p>
            </div>
            <button onClick={() => setEditing(t)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 text-mist hover:text-gold" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
            <DeleteButton id={t.id} name={t.name} action={deleteTestimonial} />
          </div>
        ))}
        {items.length === 0 && !isOpen && (
          <p className="rounded-2xl border border-dashed border-gold/20 p-10 text-center text-mist">No testimonials yet.</p>
        )}
      </div>
    </div>
  );
}
