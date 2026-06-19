"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import type { Category } from "@/lib/types";
import Icon from "@/components/Icon";
import { saveCategory, deleteCategory } from "@/app/admin/actions";
import { Field, Input, Textarea, IconSelect } from "./FormKit";
import ImageUploader from "./ImageUploader";

type Editing = Category | "new" | null;

export default function ProductsManager({ items }: { items: Category[] }) {
  const [editing, setEditing] = useState<Editing>(null);
  const current = editing === "new" ? null : editing;
  const isOpen = editing !== null;

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cream">Products</h1>
          <p className="mt-1 text-sm text-mist">{items.length} product categor{items.length === 1 ? "y" : "ies"}</p>
        </div>
        {!isOpen && (
          <button onClick={() => setEditing("new")} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add Product
          </button>
        )}
      </header>

      {isOpen && (
        <form
          key={current?.id ?? "new"}
          action={saveCategory}
          className="glass mb-8 rounded-2xl p-6"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-cream">
              {current ? "Edit Product" : "New Product"}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-ash hover:text-cream">
              <X className="h-5 w-5" />
            </button>
          </div>

          {current && <input type="hidden" name="id" value={current.id} />}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name"><Input name="name" required defaultValue={current?.name} placeholder="Luxury Tiles" /></Field>
            <Field label="Tag / Category"><Input name="tag" defaultValue={current?.tag} placeholder="Surfaces" /></Field>
          </div>
          <div className="mt-5">
            <Field label="Description">
              <Textarea name="desc" rows={3} defaultValue={current?.desc} placeholder="Short luxury description…" />
            </Field>
          </div>
          <div className="mt-5">
            <Field label="Features" hint="Comma-separated, e.g. Italian Marble, Large Format, Anti-Skid">
              <Input name="features" defaultValue={current?.features.join(", ")} placeholder="Italian Marble, Large Format" />
            </Field>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Icon"><IconSelect name="icon" defaultValue={current?.icon} /></Field>
            <Field label="Display order" hint="Lower numbers appear first"><Input name="order" type="number" defaultValue={current?.order ?? 0} /></Field>
          </div>
          <div className="mt-5">
            <ImageField name="imageUrl" defaultValue={current?.imageUrl} />
          </div>

          {/* gradient fallback colors (used when no image) */}
          <details className="mt-5 rounded-xl border border-gold/10 p-4">
            <summary className="cursor-pointer text-sm text-mist">Advanced: gradient fallback colors</summary>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field label="Accent"><Input name="accent" defaultValue={current?.accent ?? "#c9a24d"} /></Field>
              <Field label="Gradient from"><Input name="fromColor" defaultValue={current?.from ?? "#1d1d22"} /></Field>
              <Field label="Gradient to"><Input name="toColor" defaultValue={current?.to ?? "#0a0a0b"} /></Field>
            </div>
          </details>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">
              {current ? "Save Changes" : "Create Product"}
            </button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-3">
        {items.map((c) => (
          <div key={c.id} className="glass flex items-center gap-4 rounded-2xl p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gold/15">
              {c.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(160deg, ${c.from}, ${c.to})` }}>
                  <Icon name={c.icon} className="h-6 w-6" style={{ color: c.accent }} />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-cream">{c.name}</p>
              <p className="truncate text-sm text-mist">{c.tag} · {c.features.length} features</p>
            </div>
            <button onClick={() => setEditing(c)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 text-mist hover:text-gold" aria-label="Edit">
              <Pencil className="h-4 w-4" />
            </button>
            <DeleteButton id={c.id} name={c.name} action={deleteCategory} />
          </div>
        ))}
        {items.length === 0 && !isOpen && (
          <p className="rounded-2xl border border-dashed border-gold/20 p-10 text-center text-mist">
            No products yet. Click “Add Product” to create your first one.
          </p>
        )}
      </div>
    </div>
  );
}

/* Shared small pieces also used by other managers */
export function ImageField({ name, defaultValue }: { name: string; defaultValue?: string | null }) {
  return <ImageUploader name={name} defaultValue={defaultValue ?? ""} />;
}

export function DeleteButton({
  id, name, action,
}: { id: string; name: string; action: (fd: FormData) => void }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(`Delete “${name}”? This cannot be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 text-red-300/80 hover:bg-red-500/10 hover:text-red-300" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
