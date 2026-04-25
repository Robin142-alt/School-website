import { MessageCircle, PhoneCall, Send } from "lucide-react";
import Link from "next/link";

import { siteConfig } from "@/lib/content/site";

export function MobileQuickActions() {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 px-3 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 rounded-[1.6rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,250,243,0.98),rgba(244,228,208,0.95))] p-2 shadow-[0_30px_90px_-52px_rgba(28,35,64,0.55)] backdrop-blur-xl">
        <a
          href={siteConfig.phoneHref}
          className="inline-flex flex-col items-center justify-center gap-1 rounded-[1.1rem] py-3 text-xs font-semibold text-brand-berry"
        >
          <PhoneCall className="h-4 w-4" />
          Call
        </a>
        <a
          href={siteConfig.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-col items-center justify-center gap-1 rounded-[1.1rem] bg-gradient-to-r from-brand-forest to-brand-berry py-3 text-xs font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          href="/admissions"
          className="inline-flex flex-col items-center justify-center gap-1 rounded-[1.1rem] bg-brand-gold/18 py-3 text-xs font-semibold text-brand-ink"
        >
          <Send className="h-4 w-4" />
          Apply
        </Link>
      </div>
    </div>
  );
}
