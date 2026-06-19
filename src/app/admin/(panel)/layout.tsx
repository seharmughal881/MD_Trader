import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "../actions";
import AdminNav from "@/components/admin/AdminNav";
import { LogOut, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink text-cream lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen flex-col border-r border-gold/10 bg-onyx p-6 lg:flex">
        <a href="/admin" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/40 bg-charcoal font-display text-lg font-bold text-gold-gradient">
            MD
          </span>
          <div className="leading-tight">
            <p className="font-display text-base font-semibold text-cream">MD Traders</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-ash">Admin</p>
          </div>
        </a>

        <AdminNav />

        <div className="mt-auto space-y-2 border-t border-gold/10 pt-4">
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-charcoal hover:text-cream"
          >
            <ExternalLink className="h-4 w-4" /> View Website
          </a>
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-charcoal hover:text-red-300">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-gold/10 bg-onyx p-4 lg:hidden">
        <a href="/admin" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-charcoal font-display text-sm font-bold text-gold-gradient">MD</span>
          <span className="font-display font-semibold">Admin</span>
        </a>
        <form action={logoutAction}>
          <button className="flex items-center gap-1.5 rounded-lg border border-gold/20 px-3 py-1.5 text-xs text-mist">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </form>
      </div>

      <main className="min-w-0 p-5 sm:p-8">
        <div className="lg:hidden">
          <AdminNav mobile />
        </div>
        {children}
      </main>
    </div>
  );
}
