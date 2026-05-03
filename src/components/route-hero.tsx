import Link from "next/link";

import { cn } from "@/lib/utils";

type RouteHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: Array<{
    href: string;
    label: string;
    variant?: "primary" | "secondary";
  }>;
};

export function RouteHero({
  eyebrow,
  title,
  description,
  actions = [],
}: RouteHeroProps) {
  return (
    <section className="section-shell pt-10 pb-8 sm:pt-14 sm:pb-12">
      <div className="accent-border glass-panel relative overflow-hidden rounded-[2rem] border border-white/70 px-6 py-8 shadow-[0_30px_90px_-52px_rgba(77,20,30,0.45)] sm:px-10 sm:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(122,30,46,0.12),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(201,149,42,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]" />
        <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden />
        <div className="relative max-w-4xl space-y-6">
          <span className="inline-flex rounded-full border border-brand-maroon/15 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
            {eyebrow}
          </span>
          <div className="space-y-4">
            <h1 className="font-display max-w-3xl text-4xl leading-none text-balance text-brand-ink sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
              {description}
            </p>
          </div>
          {actions.length > 0 ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  target={
                    action.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    action.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5",
                    action.variant === "secondary"
                      ? "border border-brand-maroon/15 bg-white/78 text-brand-maroon"
                      : "bg-gradient-to-r from-brand-maroon via-brand-maroon-light to-brand-gold text-white shadow-[0_22px_44px_-26px_rgba(122,30,46,0.65)]",
                  )}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
