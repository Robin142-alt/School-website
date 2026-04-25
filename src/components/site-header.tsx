import Link from "next/link";
import { Menu, MessageCircle, PhoneCall } from "lucide-react";

import { siteConfig } from "@/lib/content/site";
import { getUpcomingEventsFromStore } from "@/lib/repositories/content";

export async function SiteHeader() {
  const nextEvent = (await getUpcomingEventsFromStore(1))[0];

  return (
    <header className="sticky top-0 z-50 border-b border-white/50 bg-background/90 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-forest text-lg font-bold text-white shadow-lg shadow-brand-forest/20">
              SC
            </div>
            <div className="min-w-0">
              <p className="font-display text-lg leading-none text-brand-ink sm:text-xl">
                {siteConfig.shortName}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
                Vihiga County, Kenya
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-foreground lg:flex">
            {siteConfig.mainNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-brand-forest">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-brand-forest/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-forest"
            >
              <PhoneCall className="h-4 w-4" />
              Call Office
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-forest/20"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <details className="group relative lg:hidden">
            <summary className="flex list-none items-center gap-2 rounded-full border border-brand-forest/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-forest">
              <Menu className="h-4 w-4" />
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-[18rem] rounded-[1.5rem] border border-white/70 bg-white/95 p-3 shadow-[0_24px_80px_-48px_rgba(23,48,44,0.45)]">
              <div className="grid gap-2">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-brand-sage/50 hover:text-brand-forest"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-brand-forest px-4 py-3 text-sm font-semibold text-white"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </details>
        </div>

        {nextEvent ? (
          <div className="hidden items-center justify-between gap-4 border-t border-brand-forest/8 py-3 text-sm sm:flex">
            <div className="flex items-center gap-3 text-muted">
              <span className="rounded-full bg-brand-gold/12 px-3 py-1 font-semibold text-brand-forest">
                Upcoming
              </span>
              <span>{nextEvent.title}</span>
            </div>
            <Link
              href="/community"
              className="font-semibold text-brand-forest transition-colors hover:text-brand-sunset"
            >
              View updates
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
