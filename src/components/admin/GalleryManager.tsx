"use client";

import { useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import type { GalleryItem } from "@/lib/types";
import { saveGallery, deleteGallery } from "@/app/admin/actions";
import { Field, Input, Select } from "./FormKit";
import { ImageField, DeleteButton } from "./ProductsManager";

type Editing = GalleryItem | "new" | null;

export default function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [editing, setEditing] = useState<Editing>(null);
  const current = editing === "new" ? null : editing;
  const isOpen = editing !== null;

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cream">Gallery</h1>
          <p className="mt-1 text-sm text-mist">{items.length} image{items.length === 1 ? "" : "s"}</p>
        </div>
        {!isOpen && (
          <button onClick={() => setEditing("new")} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add Image
          </button>
        )}
      </header>

      {isOpen && (
        <form key={current?.id ?? "new"} action={saveGallery} className="glass mb-8 rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-cream">{current ? "Edit Image" : "New Image"}</h2>
            <button type="button" onClick={() => setEditing(null)} className="text-ash hover:text-cream"><X className="h-5 w-5" /></button>
          </div>
          {current && <input type="hidden" name="id" value={current.id} />}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title"><Input name="title" required defaultValue={current?.title} placeholder="Marble Master Bath" /></Field>
            <Field label="Category"><Input name="category" defaultValue={current?.category} placeholder="Bathroom" /></Field>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Tile size" hint="Affects masonry layout">
              <Select name="size" defaultValue={current?.size ?? "normal"}>
                <option value="normal" className="bg-charcoal">Normal</option>
                <option value="wide" className="bg-charcoal">Wide</option>
                <option value="tall" className="bg-charcoal">Tall</option>
              </Select>
            </Field>
            <Field label="Display order"><Input name="order" type="number" defaultValue={current?.order ?? 0} /></Field>
          </div>
          <div className="mt-5"><ImageField name="imageUrl" defaultValue={current?.imageUrl} /></div>

          <details className="mt-5 rounded-xl border border-gold/10 p-4">
            <summary className="cursor-pointer text-sm text-mist">Advanced: gradient fallback colors</summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Gradient from"><Input name="fromColor" defaultValue={current?.from ?? "#23211b"} /></Field>
              <Field label="Gradient to"><Input name="toColor" defaultValue={current?.to ?? "#0c0c0d"} /></Field>
            </div>
          </details>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">{current ? "Save Changes" : "Add Image"}</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <div key={g.id} className="glass overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/3]">
              {g.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.imageUrl} alt={g.title} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full" style={{ background: `linear-gradient(155deg, ${g.from}, ${g.to})` }} />
              )}
              <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">{g.size}</span>
            </div>
            <div className="flex items-center gap-2 p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-cream">{g.title}</p>
                <p className="truncate text-xs text-ash">{g.category}</p>
              </div>
              <button onClick={() => setEditing(g)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 text-mist hover:text-gold" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
              <DeleteButton id={g.id} name={g.title} action={deleteGallery} />
            </div>
          </div>
        ))}
        {items.length === 0 && !isOpen && (
          <p className="rounded-2xl border border-dashed border-gold/20 p-10 text-center text-mist sm:col-span-2 lg:col-span-3">No gallery images yet.</p>
        )}
      </div>
    </div>
  );
}
