import Link from "next/link";
import { Menu, MessageCircle, PhoneCall } from "lucide-react";

import { siteConfig } from "@/lib/content/site";
import { getUpcomingEventsFromStore } from "@/lib/repositories/content";

export async function SiteHeader() {
  const nextEvent = (await getUpcomingEventsFromStore(1))[0];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-maroon/8 bg-[linear-gradient(180deg,rgba(255,250,245,0.94),rgba(250,245,240,0.86))] shadow-[0_18px_48px_-42px_rgba(77,20,30,0.6)] backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-maroon via-brand-maroon-light to-brand-gold text-lg font-bold text-white shadow-[0_20px_45px_-20px_rgba(122,30,46,0.7)]">
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
              <Link key={item.href} href={item.href} className="transition-colors hover:text-brand-maroon">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-brand-maroon/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-maroon shadow-[0_14px_30px_-24px_rgba(122,30,46,0.55)]"
            >
              <PhoneCall className="h-4 w-4" />
              Call Office
            </a>
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-maroon to-brand-wine px-4 py-2 text-sm font-semibold text-white shadow-[0_20px_40px_-24px_rgba(122,30,46,0.7)]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>

          <details className="group relative lg:hidden">
            <summary className="flex list-none items-center gap-2 rounded-full border border-brand-maroon/15 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-maroon">
              <Menu className="h-4 w-4" />
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-[18rem] rounded-[1.5rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(255,242,232,0.96))] p-3 shadow-[0_30px_90px_-52px_rgba(77,20,30,0.5)]">
              <div className="grid gap-2">
                {siteConfig.mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-brand-blush/50 hover:text-brand-maroon"
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-gradient-to-r from-brand-maroon to-brand-wine px-4 py-3 text-sm font-semibold text-white"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </details>
        </div>

        {nextEvent ? (
          <div className="hidden items-center justify-between gap-4 border-t border-brand-maroon/8 py-3 text-sm sm:flex">
            <div className="flex items-center gap-3 text-muted">
              <span className="rounded-full bg-brand-gold/16 px-3 py-1 font-semibold text-brand-ink">
                Upcoming
              </span>
              <span>{nextEvent.title}</span>
            </div>
            <Link
              href="/community"
              className="font-semibold text-brand-maroon transition-colors hover:text-brand-maroon-light"
            >
              View updates
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
