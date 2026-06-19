"use client";

import { useCallback, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfterSlider({
  before,
  after,
  className = "",
}: {
  before: string;
  after: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden ${className}`}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        setFromClientX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* After (full) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gold">After</span>

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt="Before" className="absolute inset-0 h-full w-full max-w-none object-cover" style={{ width: ref.current?.clientWidth ?? "100%" }} draggable={false} />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] uppercase tracking-wider text-cream">Before</span>
      </div>

      {/* Handle */}
      <div className="absolute inset-y-0 -ml-px w-0.5 bg-gold/90" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold bg-ink/80 text-gold backdrop-blur">
          <MoveHorizontal className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}
