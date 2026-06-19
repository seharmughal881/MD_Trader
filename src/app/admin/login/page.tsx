"use client";

import { useActionState } from "react";
import { Lock, User, Loader2 } from "lucide-react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, undefined);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink p-4">
      <div className="absolute left-1/2 top-0 h-[50vh] w-[60vh] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="bg-grain absolute inset-0 opacity-[0.15] mix-blend-overlay" />

      <div className="glass relative z-10 w-full max-w-md rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-charcoal font-display text-xl font-bold text-gold-gradient">
            MD
          </span>
          <h1 className="font-display mt-5 text-2xl font-semibold text-cream">Admin Panel</h1>
          <p className="mt-1 text-sm text-ash">Sign in to manage your website</p>
        </div>

        <form action={formAction} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ash">Username</span>
            <div className="relative">
              <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
              <input name="username" required autoComplete="username" className="input-luxe pl-11" placeholder="admin" />
            </div>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-ash">Password</span>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ash" />
              <input name="password" type="password" required autoComplete="current-password" className="input-luxe pl-11" placeholder="••••••••" />
            </div>
          </label>

          {state?.error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
              {state.error}
            </p>
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

        <a href="/" className="mt-6 block text-center text-xs text-ash hover:text-gold">
          ← Back to website
        </a>
      </div>
    </div>
  );
}
