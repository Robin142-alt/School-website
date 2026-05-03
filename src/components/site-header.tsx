import Link from "next/link";
import { MessageCircle, PhoneCall } from "lucide-react";

import { MobileNav } from "@/components/mobile-nav";
import { siteConfig } from "@/lib/content/site";
import { getUpcomingEventsFromStore } from "@/lib/repositories/content";

export async function SiteHeader() {
  const nextEvent = (await getUpcomingEventsFromStore(1))[0];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-maroon/8 bg-[linear-gradient(180deg,rgba(255,250,245,0.96),rgba(250,245,240,0.90))] shadow-[0_8px_32px_-18px_rgba(77,20,30,0.35)] backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-maroon via-brand-maroon-light to-brand-gold text-base font-bold text-white shadow-[0_14px_30px_-14px_rgba(122,30,46,0.6)]">
              SC
            </div>
            <div className="min-w-0">
              <p className="font-display text-base leading-none text-brand-ink sm:text-lg">
                {siteConfig.shortName}
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-muted">
                Vihiga County, Kenya
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-semibold text-foreground lg:flex">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative py-1 transition-colors hover:text-brand-maroon after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:rounded-full after:bg-brand-maroon after:transition-transform after:duration-200 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-brand-maroon/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-maroon transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-maroon/15"
            >
              <PhoneCall className="h-4 w-4" />
              Call Office
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-wine px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(122,30,46,0.65)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-maroon/30"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <MobileNav />
        </div>

        {nextEvent ? (
          <div className="hidden items-center justify-between gap-4 border-t border-brand-maroon/6 py-2.5 text-sm sm:flex">
            <div className="flex items-center gap-3 text-muted">
              <span className="flex items-center gap-2 rounded-full bg-brand-gold/14 px-3 py-1 font-semibold text-brand-ink">
                <span className="pulse-dot" />
                Upcoming
              </span>
              <span>{nextEvent.title}</span>
            </div>
            <Link
              href="/community"
              className="font-semibold text-brand-maroon transition-colors hover:text-brand-maroon-light"
            >
              View updates →
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
