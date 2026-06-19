"use client";

import Icon from "@/components/Icon";

export const ICON_OPTIONS = [
  "layout-grid", "bath", "sparkles", "shower-head", "chef-hat", "sofa",
  "gem", "badge-check", "wrench", "tag", "headset", "shield-check",
  "truck", "home", "palette", "compass", "utensils", "ruler", "award",
  "users", "building-2", "trending-down",
];

export function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-ash">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ash">{hint}</span>}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`input-luxe ${props.className ?? ""}`} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`input-luxe resize-y ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`input-luxe ${props.className ?? ""}`} />;
}

export function IconSelect({ name, defaultValue }: { name: string; defaultValue?: string }) {
  return (
    <div className="flex items-center gap-3">
      <Select name={name} defaultValue={defaultValue ?? "sparkles"}>
        {ICON_OPTIONS.map((i) => (
          <option key={i} value={i} className="bg-charcoal">{i}</option>
        ))}
      </Select>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-charcoal text-gold">
        <Icon name={defaultValue ?? "sparkles"} className="h-5 w-5" />
      </span>
    </div>
  );
}

export function ColorInput({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input type="color" name={name} defaultValue={defaultValue} className="h-10 w-14 cursor-pointer rounded-lg border border-gold/20 bg-charcoal" />
        <span className="text-xs text-ash">{defaultValue}</span>
      </div>
    </Field>
  );
}
