"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, PhoneCall, X } from "lucide-react";

import { siteConfig } from "@/lib/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  /* close on ESC */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  /* prevent body scroll when open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="flex items-center gap-2 rounded-full border border-brand-maroon/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-blush/40"
      >
        <Menu className="h-4 w-4" />
        Menu
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-brand-ink/30 backdrop-blur-sm"
          style={{ animation: "fade-up 0.2s ease both" }}
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-[min(20rem,85vw)] bg-[linear-gradient(180deg,rgba(255,252,248,0.99),rgba(255,242,232,0.98))] shadow-[0_0_90px_-20px_rgba(77,20,30,0.35)] transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Close button */}
          <div className="flex items-center justify-between border-b border-brand-maroon/8 px-5 py-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-maroon">
              Navigate
            </p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-maroon/12 text-brand-maroon transition-colors hover:bg-brand-blush/40"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid gap-1">
              {siteConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-brand-blush/50 hover:text-brand-maroon active:bg-brand-blush/70"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Quick actions */}
          <div className="border-t border-brand-maroon/8 px-4 py-4">
            <div className="grid gap-2">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-3 rounded-2xl border border-brand-maroon/12 bg-white/80 px-4 py-3.5 text-sm font-semibold text-brand-maroon transition-colors hover:bg-brand-blush/30"
              >
                <PhoneCall className="h-4 w-4" />
                Call Office
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand-maroon to-brand-wine px-4 py-3.5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
