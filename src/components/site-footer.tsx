import Link from "next/link";
import { ArrowUpRight, MessageCircle, PhoneCall } from "lucide-react";

import { siteConfig } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-brand-forest/10 bg-brand-ink text-white">
      <div className="section-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr_0.75fr]">
          <div className="space-y-5">
            <span className="inline-flex rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold">
              St. Clare&apos;s Maragoli Girls School
            </span>
            <div className="space-y-3">
              <h2 className="font-display text-3xl leading-tight text-balance sm:text-4xl">
                A school website that feels more like guidance than bureaucracy.
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                The platform is designed to help parents move quickly, help students feel proud,
                and help the school communicate with confidence across every touchpoint.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-3 text-sm font-semibold text-white"
              >
                <PhoneCall className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-ink"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp support
              </a>
            </div>
          </div>

          <div className="grid gap-3 text-sm">
            <p className="font-semibold uppercase tracking-[0.22em] text-white/50">Explore</p>
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 text-white/78 transition-colors hover:text-white"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
          </div>

          <div className="space-y-4 text-sm text-white/72">
            <p className="font-semibold uppercase tracking-[0.22em] text-white/50">
              Digital promise
            </p>
            <p>
              Mobile-first pages, concise language, and visible next steps keep this experience
              useful for parents with varying levels of digital confidence.
            </p>
            <p>{siteConfig.location}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
