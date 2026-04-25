import { MapPinned, MessageCircle, PhoneCall, Route } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { contactHighlights, siteConfig } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Contact | St. Clare's Maragoli Girls School",
  description:
    "Fast contact actions, map support, and a clean inquiry system for parents and community members.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <RouteHero
        eyebrow="Contact"
        title="Fast contact paths matter when parents need clarity quickly."
        description="This page makes the school's location, call options, WhatsApp support, and online inquiry form easy to access without hunting through menus."
        actions={[
          { href: siteConfig.phoneHref, label: "Call office" },
          { href: siteConfig.whatsappHref, label: "Chat on WhatsApp", variant: "secondary" },
        ]}
      />

      <section className="section-shell py-8 sm:py-10">
        <SectionHeading
          eyebrow="Quick actions"
          title="Three clear options, visible immediately."
          description="Parents are most likely to act when the next step is obvious, local, and reassuring."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {contactHighlights.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-[1.8rem] border border-brand-forest/10 bg-white/82 p-5 transition-transform duration-200 hover:-translate-y-1"
            >
              {item.title.includes("Call") ? (
                <PhoneCall className="h-5 w-5 text-brand-forest" />
              ) : item.title.includes("WhatsApp") ? (
                <MessageCircle className="h-5 w-5 text-brand-forest" />
              ) : (
                <MapPinned className="h-5 w-5 text-brand-forest" />
              )}
              <p className="mt-4 text-lg font-semibold text-brand-ink">{item.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Map and directions"
              title="Map support should confirm the school is real, local, and reachable."
              description="Visual location cues are part of trust-building, especially for parents visiting for the first time."
            />

            <div className="overflow-hidden rounded-[2rem] border border-brand-forest/10 bg-white/82 p-3">
              <iframe
                title="St. Clare's Maragoli Girls School map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(siteConfig.mapQuery)}&output=embed`}
                className="h-[420px] w-full rounded-[1.4rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border border-brand-forest/10 bg-brand-ink p-5 text-white">
                <Route className="h-5 w-5 text-brand-gold" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  Location
                </p>
                <p className="mt-3 text-sm leading-7 text-white/78">{siteConfig.location}</p>
              </div>
              <div className="rounded-[1.7rem] border border-brand-forest/10 bg-white/82 p-5">
                <PhoneCall className="h-5 w-5 text-brand-forest" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-forest">
                  Phone-first support
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Families who prefer speaking to someone directly can use the office line or
                  request WhatsApp follow-up.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-forest/10 bg-white/84 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-forest">
              Contact system
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-balance text-brand-ink sm:text-5xl">
              One simple form for questions, visits, and parent support.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Keep it short enough to finish on a phone, but structured enough for the school to
              respond meaningfully.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
