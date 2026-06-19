"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

export default function ImageUploader({
  name,
  defaultValue = "",
  label = "Image",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ash">{label}</span>
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-gold/20 bg-charcoal">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ash">
              <ImagePlus className="h-6 w-6" />
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/70">
              <Loader2 className="h-5 w-5 animate-spin text-gold" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="btn-ghost rounded-lg px-4 py-2 text-xs font-semibold"
          >
            {url ? "Change image" : "Upload image"}
          </button>
          {url && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="flex items-center gap-1 text-xs text-ash hover:text-cream"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onPick}
          />
        </div>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      <p className="mt-2 text-[11px] text-ash">Optional. Leave empty to use a luxury gradient placeholder.</p>
    </div>
  );
}
