"use client";

import { useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import type { Service } from "@/lib/types";
import Icon from "@/components/Icon";
import { saveService, deleteService } from "@/app/admin/actions";
import { Field, Input, Textarea, IconSelect } from "./FormKit";
import { DeleteButton } from "./ProductsManager";

type Editing = Service | "new" | null;

export default function ServicesManager({ items }: { items: Service[] }) {
  const [editing, setEditing] = useState<Editing>(null);
  const current = editing === "new" ? null : editing;
  const isOpen = editing !== null;

  return (
    <div>
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-cream">Services</h1>
          <p className="mt-1 text-sm text-mist">{items.length} service{items.length === 1 ? "" : "s"}</p>
        </div>
        {!isOpen && (
          <button onClick={() => setEditing("new")} className="btn-gold flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
            <Plus className="h-4 w-4" /> Add Service
          </button>
        )}
      </header>

      {isOpen && (
        <form key={current?.id ?? "new"} action={saveService} className="glass mb-8 rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-cream">{current ? "Edit Service" : "New Service"}</h2>
            <button type="button" onClick={() => setEditing(null)} className="text-ash hover:text-cream"><X className="h-5 w-5" /></button>
          </div>
          {current && <input type="hidden" name="id" value={current.id} />}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Title"><Input name="title" required defaultValue={current?.title} placeholder="Home Consultation" /></Field>
            <Field label="Icon"><IconSelect name="icon" defaultValue={current?.icon} /></Field>
          </div>
          <div className="mt-5">
            <Field label="Description"><Textarea name="desc" rows={3} defaultValue={current?.desc} placeholder="Short service description…" /></Field>
          </div>
          <div className="mt-5">
            <Field label="Display order"><Input name="order" type="number" defaultValue={current?.order ?? 0} /></Field>
          </div>

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn-gold rounded-full px-6 py-3 text-sm font-semibold">{current ? "Save Changes" : "Add Service"}</button>
            <button type="button" onClick={() => setEditing(null)} className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold">Cancel</button>
          </div>
        </form>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.id} className="glass flex items-center gap-4 rounded-2xl p-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-charcoal text-gold">
              <Icon name={s.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-cream">{s.title}</p>
              <p className="line-clamp-1 text-sm text-mist">{s.desc}</p>
            </div>
            <button onClick={() => setEditing(s)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 text-mist hover:text-gold" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
            <DeleteButton id={s.id} name={s.title} action={deleteService} />
          </div>
        ))}
        {items.length === 0 && !isOpen && (
          <p className="rounded-2xl border border-dashed border-gold/20 p-10 text-center text-mist sm:col-span-2">No services yet.</p>
        )}
      </div>
    </div>
  );
}
