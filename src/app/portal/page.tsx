import type { Metadata } from "next";
import { CalendarDays, FileClock, LineChart, Newspaper, ShieldCheck, Users } from "lucide-react";

import {
  PortalEventForm,
  PortalLoginForm,
  PortalNewsForm,
  PortalPerformanceForm,
  PortalTestimonialForm,
} from "@/components/portal/portal-forms";
import { buildMetadata } from "@/lib/metadata";
import {
  isPortalAuthenticated,
  isPortalConfigured,
} from "@/lib/portal-auth";
import { logoutPortalAction } from "@/lib/portal-actions";
import {
  getAllEventsFromStore,
  getAllNewsFromStore,
  getPerformanceDataFromStore,
  getTestimonialsFromStore,
} from "@/lib/repositories/content";
import { getRecentInquiries } from "@/lib/repositories/inquiries";
import { formatDate, formatDateRange } from "@/lib/utils";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Portal | St. Clare's Maragoli Girls School",
    description:
      "Protected content portal for school staff to update public-facing stories, events, testimonials, and results.",
    path: "/portal",
  }),
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function SectionCard({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-brand-maroon/10 bg-white/84 p-6 shadow-lg shadow-brand-maroon/5 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-brand-blush/35 p-3 text-brand-maroon">{icon}</div>
        <div className="space-y-1">
          <h2 className="font-display text-3xl leading-tight text-brand-ink">{title}</h2>
          <p className="text-sm leading-7 text-muted">{description}</p>
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function PortalPage() {
  const configured = isPortalConfigured();

  if (!configured) {
    return (
      <section className="section-shell py-12 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-brand-maroon/10 bg-white/84 p-8 text-center shadow-lg shadow-brand-maroon/5">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-maroon">
            Staff portal
          </p>
          <h1 className="font-display mt-4 text-5xl leading-tight text-brand-ink">
            Portal access is not configured yet.
          </h1>
          <p className="mt-4 text-base leading-8 text-muted">
            Add <code className="rounded bg-brand-blush/35 px-2 py-1 text-sm">ADMIN_ACCESS_KEY</code>
            {" "}to the local environment to enable protected staff access.
          </p>
        </div>
      </section>
    );
  }

  const authenticated = await isPortalAuthenticated();

  if (!authenticated) {
    return (
      <section className="section-shell py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-maroon">
              Protected staff portal
            </span>
            <h1 className="font-display text-5xl leading-none text-balance text-brand-ink sm:text-6xl">
              Update the public school story without touching code.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              This portal gives school staff a clean publishing surface for news, events,
              testimonials, and academic performance. Public pages revalidate automatically after
              each update.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
                <Newspaper className="h-5 w-5 text-brand-maroon" />
                <p className="mt-3 text-sm leading-7 text-muted">Publish school stories and updates.</p>
              </div>
              <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
                <CalendarDays className="h-5 w-5 text-brand-maroon" />
                <p className="mt-3 text-sm leading-7 text-muted">Keep parents informed about key dates.</p>
              </div>
              <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
                <LineChart className="h-5 w-5 text-brand-maroon" />
                <p className="mt-3 text-sm leading-7 text-muted">Refresh trust signals such as KCSE performance.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-brand-maroon/10 bg-white/84 p-6 shadow-lg shadow-brand-maroon/5 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-maroon">
              Sign in
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-brand-ink">
              Enter the staff access key.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              The portal key is stored locally in the environment and is not exposed on public pages.
            </p>
            <div className="mt-6">
              <PortalLoginForm />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const [newsPosts, events, testimonials, performanceData, inquiries] =
    await Promise.all([
      getAllNewsFromStore(),
      getAllEventsFromStore(),
      getTestimonialsFromStore(),
      getPerformanceDataFromStore(),
      getRecentInquiries(8),
    ]);

  return (
    <section className="section-shell py-10 sm:py-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <span className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-maroon">
            Staff content portal
          </span>
          <div className="space-y-3">
            <h1 className="font-display text-5xl leading-none text-balance text-brand-ink sm:text-6xl">
              Publish calmly. Keep parents informed. Keep the school story alive.
            </h1>
            <p className="max-w-3xl text-base leading-8 text-muted sm:text-lg">
              This space is built for day-to-day school operations: quick story publishing, event
              updates, trust-building testimonials, KCSE dashboard changes, and a visible inquiry
              inbox for follow-up.
            </p>
          </div>
        </div>

        <form action={logoutPortalAction}>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full border border-brand-maroon/15 bg-white/80 px-5 py-3 text-sm font-semibold text-brand-maroon"
          >
            Sign out
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
          <p className="font-display text-4xl text-brand-ink">{newsPosts.length}</p>
          <p className="mt-2 text-sm leading-7 text-muted">Published stories in the editorial system.</p>
        </div>
        <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
          <p className="font-display text-4xl text-brand-ink">{events.length}</p>
          <p className="mt-2 text-sm leading-7 text-muted">Events currently available to the public schedule.</p>
        </div>
        <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
          <p className="font-display text-4xl text-brand-ink">{testimonials.length}</p>
          <p className="mt-2 text-sm leading-7 text-muted">Trust-building testimonials available for reuse.</p>
        </div>
        <div className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/78 p-5">
          <p className="font-display text-4xl text-brand-ink">{inquiries.length}</p>
          <p className="mt-2 text-sm leading-7 text-muted">Recent digital inquiries needing follow-up.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <SectionCard
          title="Publish News"
          description="Add a fresh story or update an existing article by reusing the same slug."
          icon={<Newspaper className="h-5 w-5" />}
        >
          <PortalNewsForm />
        </SectionCard>

        <SectionCard
          title="Schedule Events"
          description="Keep the header prompt and community calendar accurate for parents and alumni."
          icon={<CalendarDays className="h-5 w-5" />}
        >
          <PortalEventForm />
        </SectionCard>

        <SectionCard
          title="Trust Signals"
          description="Add short testimonials that reinforce confidence in the school's culture and communication."
          icon={<ShieldCheck className="h-5 w-5" />}
        >
          <PortalTestimonialForm />
        </SectionCard>

        <SectionCard
          title="KCSE Dashboard"
          description="Update academic performance figures without editing code."
          icon={<LineChart className="h-5 w-5" />}
        >
          <PortalPerformanceForm />
        </SectionCard>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard
          title="Recent Inquiries"
          description="A lightweight inbox for admissions, contact, and alumni submissions."
          icon={<FileClock className="h-5 w-5" />}
        >
          <div className="grid gap-4">
            {inquiries.length === 0 ? (
              <p className="rounded-[1.5rem] bg-brand-blush/20 px-4 py-4 text-sm text-muted">
                No inquiries captured yet.
              </p>
            ) : (
              inquiries.map((inquiry) => (
                <article
                  key={inquiry.id}
                  className="rounded-[1.5rem] border border-brand-maroon/10 bg-brand-blush/18 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-brand-ink">{inquiry.fullName}</p>
                      <p className="text-sm text-muted">
                        {inquiry.type} | {inquiry.topic}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-maroon">
                      {formatDate(inquiry.createdAt)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{inquiry.message}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted">
                    <span>{inquiry.phone}</span>
                    {inquiry.preferredChannel ? <span>{inquiry.preferredChannel}</span> : null}
                    {Object.entries(inquiry.metadata ?? {}).map(([key, value]) => (
                      <span key={key}>
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </SectionCard>

        <div className="grid gap-6">
          <SectionCard
            title="Current Public Content"
            description="A quick scan of what parents and students see right now."
            icon={<Users className="h-5 w-5" />}
          >
            <div className="grid gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                  Latest news
                </p>
                <div className="mt-3 grid gap-3">
                  {newsPosts.slice(0, 4).map((item) => (
                    <div key={item.slug} className="rounded-[1.4rem] bg-brand-blush/18 px-4 py-4">
                      <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                        {item.category} | {formatDate(item.publishedAt)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                  Upcoming events
                </p>
                <div className="mt-3 grid gap-3">
                  {events.slice(0, 4).map((item) => (
                    <div key={`${item.title}-${item.startDate}`} className="rounded-[1.4rem] bg-brand-blush/18 px-4 py-4">
                      <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                        {formatDateRange(item.startDate, item.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                  KCSE trend
                </p>
                <div className="mt-3 grid gap-3">
                  {performanceData.series.map((item) => (
                    <div key={item.year} className="rounded-[1.4rem] bg-brand-blush/18 px-4 py-4">
                      <p className="text-sm font-semibold text-brand-ink">
                        {item.year} | Mean {item.meanGrade.toFixed(1)}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">
                        Transition {item.transitionRate}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}
