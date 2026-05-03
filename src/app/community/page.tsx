import Link from "next/link";
import { CalendarDays, Megaphone, Quote, UsersRound } from "lucide-react";

import { AlumniForm } from "@/components/forms/alumni-form";
import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import {
  getLatestNewsFromStore,
  getTestimonialsFromStore,
  getUpcomingEventsFromStore,
} from "@/lib/repositories/content";
import {
  alumniOpportunities,
  communicationChannels,
  parentExperience,
} from "@/lib/content/site";
import { formatDate, formatDateRange } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Community | St. Clare's Maragoli Girls School",
  description:
    "News, events, parent communication, and alumni mentorship in one living community hub.",
  path: "/community",
});

export default async function CommunityPage() {
  const [latestNews, events, alumniVoices] = await Promise.all([
    getLatestNewsFromStore(4),
    getUpcomingEventsFromStore(4),
    getTestimonialsFromStore(),
  ]);
  const leadStoryHref = latestNews[0] ? `/news/${latestNews[0].slug}` : "/community";

  return (
    <>
      <RouteHero
        eyebrow="Community"
        title="A living school brand needs updates, communication, and return paths for alumni."
        description="This page brings together parent experience, dynamic news, calendar moments, and alumni mentorship so the school feels active rather than static."
        actions={[
          { href: leadStoryHref, label: "Read latest story" },
          { href: "#alumni-form", label: "Join alumni network", variant: "secondary" },
        ]}
      />

      <section className="section-shell py-8 sm:py-10">
        <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Parent experience"
              title="Parents trust schools that feel reachable and organised."
              description="The community layer keeps parent communication short, visible, and action-oriented, especially for families who rely on phone-based access."
            />

            <div className="grid gap-4">
              {parentExperience.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/82 p-5"
                >
                  <Megaphone className="h-5 w-5 text-brand-maroon" />
                  <p className="mt-4 text-lg font-semibold text-brand-ink">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="Communication channels"
              title="Repeat important messages where parents already pay attention."
              description="A strong community system uses short updates, visible contact points, and familiar channels instead of assuming everyone will read long documents."
            />

            <div className="grid gap-4 sm:grid-cols-3">
              {communicationChannels.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-brand-ink p-5 text-white"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/78">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.9rem] border border-brand-maroon/10 bg-white/84 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                Feed API
              </p>
              <p className="mt-2 text-sm leading-7 text-muted">
                The site also exposes a lightweight JSON feed for announcements and events through
                <code className="font-mono mx-1 rounded bg-brand-blush/40 px-2 py-1 text-xs">
                  /api/feed
                </code>
                so future mobile apps, noticeboards, or digital screens can reuse the same content.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="News"
              title="Stories turn a school from a place into a movement."
              description="Each news post reinforces identity, shows activity, and gives parents another reason to return to the site."
            />

            <div className="grid gap-4">
              {latestNews.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/82 p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-maroon">
                      {item.category}
                    </span>
                    <span className="text-sm text-muted">{formatDate(item.publishedAt)}</span>
                  </div>
                  <p className="mt-4 font-display text-3xl leading-tight text-balance text-brand-ink">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="Events"
              title="An event calendar helps the school feel active and accountable."
              description="Families can quickly see what is upcoming, where it happens, and why it matters."
            />

            <div className="grid gap-4">
              {events.map((event) => (
                <article
                  key={event.title}
                  className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/82 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-3xl leading-tight text-brand-ink">
                        {event.title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-muted">{event.description}</p>
                    </div>
                    <CalendarDays className="h-5 w-5 shrink-0 text-brand-gold" />
                  </div>
                  <div className="mt-5 grid gap-2 text-sm text-muted">
                    <p>{formatDateRange(event.startDate, event.endDate)}</p>
                    <p>{event.location}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="grid gap-10 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Alumni"
              title="A strong alumni system gives girls more examples of what is possible."
              description="This section invites former students and community women back into the school's story through mentorship, career talks, and targeted support."
            />

            <div className="grid gap-4">
              {alumniOpportunities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-brand-ink p-5 text-white"
                >
                  <UsersRound className="h-5 w-5 text-brand-gold" />
                  <p className="mt-4 font-display text-3xl leading-tight">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/78">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              {alumniVoices.map((voice) => (
                <div
                  key={voice.title}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/82 p-5"
                >
                  <Quote className="h-5 w-5 text-brand-gold" />
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-maroon">
                    {voice.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-muted">{voice.quote}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            id="alumni-form"
            className="rounded-[2rem] border border-brand-maroon/10 bg-white/84 p-6 sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
              Alumni system
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-balance text-brand-ink sm:text-5xl">
              Rejoin the school story through mentorship, talks, or support.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Keep the barrier low and the invitation clear. That is how more alumni say yes.
            </p>
            <div className="mt-6">
              <AlumniForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
