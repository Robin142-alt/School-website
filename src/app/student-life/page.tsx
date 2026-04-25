import Link from "next/link";
import { HeartHandshake, Trophy, Users } from "lucide-react";

import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { campusRhythm, clubs, galleryItems } from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Student Life | St. Clare's Maragoli Girls School",
  description:
    "A student-life experience built around confidence, belonging, clubs, sports, and identity.",
  path: "/student-life",
});

export default function StudentLifePage() {
  return (
    <>
      <RouteHero
        eyebrow="Student life"
        title="A school culture where girls can be seen, stretched, and celebrated."
        description="Student life is one of the most persuasive trust signals for both families and learners. This page makes campus rhythm, clubs, and school pride feel tangible."
        actions={[
          { href: "/community", label: "See events and stories" },
          { href: "/admissions", label: "Ask about joining", variant: "secondary" },
        ]}
      />

      <section className="section-shell py-8 sm:py-10">
        <SectionHeading
          eyebrow="Clubs and societies"
          title="Identity grows when girls have more than one place to shine."
          description="The site presents co-curricular life as essential, not decorative. It shows parents that confidence and belonging are built through participation."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {clubs.map((club) => (
            <article
              key={club.name}
              className="rounded-[1.8rem] border border-brand-forest/10 bg-white/82 p-5"
            >
              <Users className="h-5 w-5 text-brand-forest" />
              <p className="mt-4 font-display text-3xl leading-tight text-brand-ink">{club.name}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{club.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Campus rhythm"
              title="Small routines shape a girl's confidence more than a slogan ever can."
              description="The student experience is communicated through daily rhythm: order, encouragement, check-ins, and visible opportunities to contribute."
            />

            <div className="grid gap-4">
              {campusRhythm.map((item, index) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-brand-forest/10 bg-white/80 p-5"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-gold">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-base leading-8 text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {galleryItems.map((item) => (
              <div
                key={item.title}
                className="min-h-64 rounded-[1.9rem] p-5 text-white shadow-xl"
                style={{ background: item.background }}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="inline-flex self-start rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    Gallery
                  </div>
                  <div>
                    <p className="font-display text-3xl leading-tight text-balance">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/78">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="rounded-[2rem] bg-brand-ink px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Why this matters
              </p>
              <h2 className="font-display mt-4 text-4xl leading-tight text-balance sm:text-5xl">
                A girl studies differently when she feels that she belongs to something worth
                carrying forward.
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
                <Trophy className="h-5 w-5 text-brand-gold" />
                <p className="mt-3 text-sm leading-7 text-white/78">
                  School pride becomes a motivation engine.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-4">
                <HeartHandshake className="h-5 w-5 text-brand-gold" />
                <p className="mt-3 text-sm leading-7 text-white/78">
                  Parents feel safer when wellbeing is visible.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-[1.5rem] bg-white px-4 py-4 text-sm font-semibold text-brand-forest"
              >
                Plan a visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
