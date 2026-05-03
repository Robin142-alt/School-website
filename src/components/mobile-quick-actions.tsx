import { MessageCircle, PhoneCall, Send } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/content/site";

export function MobileQuickActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 pt-1 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1.5 rounded-[1.4rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,245,240,0.96))] p-1.5 shadow-[0_-4px_40px_-12px_rgba(77,20,30,0.22)] backdrop-blur-xl">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex flex-col items-center justify-center gap-1 rounded-[1rem] py-3 text-xs font-semibold text-brand-maroon transition-colors active:bg-brand-blush/50"
        >
          <PhoneCall className="h-4 w-4" />
          Call
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-col items-center justify-center gap-1 rounded-[1rem] bg-gradient-to-r from-brand-maroon to-brand-wine py-3 text-xs font-semibold text-white transition-opacity active:opacity-80"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          href="/admissions"
          className="inline-flex flex-col items-center justify-center gap-1 rounded-[1rem] bg-brand-gold/18 py-3 text-xs font-semibold text-brand-ink transition-colors active:bg-brand-gold/30"
        >
          <Send className="h-4 w-4" />
          Apply
        </Link>
      </div>
    </div>
  );
}
