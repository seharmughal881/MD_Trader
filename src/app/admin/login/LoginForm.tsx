"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Loader2, KeyRound, Eye, EyeOff, Copy, Check, ArrowLeft } from "lucide-react";
import { loginAction } from "../actions";

export default function LoginForm({
  credentials,
}: {
  credentials: { username: string; password: string } | null;
}) {
  const [state, formAction, pending] = useActionState(loginAction, undefined);
  const [showPw, setShowPw] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink p-4">
      {/* Ambient luxury background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-onyx via-ink to-ink" />
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[-10%] h-[55vh] w-[55vh] -translate-x-1/2 rounded-full bg-gold/15 blur-[130px]"
        />
        <div className="absolute bottom-[-15%] right-[-5%] h-[40vh] w-[40vh] rounded-full bg-gold-deep/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,162,77,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,77,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />
        <div className="bg-grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* gold hairline accent */}
        <div className="mx-auto mb-[-1px] h-px w-2/3 bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

        <div className="glass gold-border relative overflow-hidden rounded-[1.75rem] p-8 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <span className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/40 bg-charcoal font-display text-2xl font-bold text-gold-gradient">
              MD
              <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/20" />
            </span>
            <span className="mt-4 text-[10px] uppercase tracking-[0.4em] text-gold/70">MD Traders</span>
            <h1 className="font-display mt-2 text-2xl font-semibold text-cream">Admin Panel</h1>
            <p className="mt-1 text-sm text-ash">Sign in to manage your website</p>
          </div>

          <form action={formAction} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ash">Username</span>
              <div className="group relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center border-r border-gold/15 text-gold/60 transition-colors group-focus-within:text-gold">
                  <User className="h-[18px] w-[18px]" />
                </span>
                <input
                  name="username"
                  required
                  autoComplete="username"
                  defaultValue={credentials?.username}
                  className="input-luxe pl-16"
                  placeholder="admin"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ash">Password</span>
              <div className="group relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex w-12 items-center justify-center border-r border-gold/15 text-gold/60 transition-colors group-focus-within:text-gold">
                  <Lock className="h-[18px] w-[18px]" />
                </span>
                <input
                  name="password"
                  type={showPw ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  defaultValue={credentials?.password}
                  className="input-luxe px-16"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-ash transition-colors hover:text-gold"
                >
                  {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                </button>
              </div>
            </label>

            {state?.error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
              >
                {state.error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {pending ? "Signing in…" : "Sign In"}
            </button>
          </form>

          {credentials && (
            <div className="mt-6 rounded-2xl border border-gold/25 bg-gold/5 p-4">
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold">
                <KeyRound className="h-3.5 w-3.5" /> Login details
              </p>
              <div className="mt-3 space-y-2">
                {[
                  { label: "Username", value: credentials.username },
                  { label: "Password", value: credentials.password },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gold/10 bg-ink/40 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-ash">{row.label}</span>
                      <span className="block truncate text-sm font-medium text-cream">{row.value}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copy(row.label, row.value)}
                      aria-label={`Copy ${row.label}`}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/20 text-ash transition-colors hover:text-gold"
                    >
                      {copied === row.label ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <a href="/" className="mt-6 flex items-center justify-center gap-1.5 text-xs text-ash transition-colors hover:text-gold">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to website
          </a>
        </div>
      </motion.div>
    </div>
  );
}
