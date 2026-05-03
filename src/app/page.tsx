import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  MessageCircle,
  PhoneCall,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import {
  aboutContent,
  alumniOpportunities,
  campusRhythm,
  clubs,
  communicationChannels,
  coreValues,
  feeGuide,
  heroStats,
  parentExperience,
  pathways,
  siteConfig,
  storyPillars,
  trustSignals,
} from "@/lib/content/site";
import { authenticSchoolVisuals } from "@/lib/content/visuals";
import {
  getLatestNewsFromStore,
  getPerformanceDataFromStore,
  getTestimonialsFromStore,
  getUpcomingEventsFromStore,
} from "@/lib/repositories/content";
import { formatDate, formatDateRange } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Home | St. Clare's Maragoli Girls School",
  description:
    "A warm, trustworthy, mobile-first school website that helps parents, students, staff, and alumni engage with confidence.",
  path: "/",
});

export default async function Home() {
  const [latestNews, upcomingEvents, alumniVoices, performanceData] =
    await Promise.all([
      getLatestNewsFromStore(3),
      getUpcomingEventsFromStore(2),
      getTestimonialsFromStore(3),
      getPerformanceDataFromStore(),
    ]);

  return (
    <>
      <section className="section-shell pt-8 pb-16 sm:pt-12 sm:pb-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-maroon/25 bg-brand-maroon/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-brand-maroon">
              <Sparkles className="h-4 w-4" />
              St. Clare&apos;s Maragoli Girls School
            </div>
            <div className="space-y-5">
              <h1 className="font-display max-w-4xl text-5xl leading-none text-balance text-brand-ink sm:text-6xl lg:text-7xl">
                Grounded girls. Courageous futures.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                {siteConfig.heroStatement} The result is a website that feels calm, clear, and
                deeply human for parents, students, and alumni.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-maroon via-brand-maroon-light to-brand-maroon px-6 py-4 text-sm font-semibold text-white shadow-[0_24px_54px_-28px_rgba(122,30,46,0.75)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Start admissions
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/academics"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-maroon/15 bg-white/80 px-6 py-4 text-sm font-semibold text-brand-maroon"
              >
                Explore CBC pathways
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="rounded-[1.5rem] border border-brand-maroon/10 bg-[linear-gradient(180deg,rgba(255,248,239,0.96),rgba(248,234,220,0.86))] p-4 text-sm leading-7 text-muted shadow-[0_24px_60px_-42px_rgba(122,30,46,0.22)]"
                >
                  <BadgeCheck className="mb-3 h-5 w-5 text-brand-maroon" />
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="accent-border relative overflow-hidden rounded-[2rem] border border-white/18 shadow-[0_34px_110px_-56px_rgba(28,35,64,0.8)]">
              <div className="relative min-h-[28rem]">
                <Image
                  src={authenticSchoolVisuals.hero.src}
                  alt={authenticSchoolVisuals.hero.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 36vw, 100vw"
                  className="object-cover object-top brightness-[1.04] contrast-[1.06] saturate-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,35,64,0.08),rgba(28,35,64,0.28)_38%,rgba(28,35,64,0.84)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <span className="inline-flex rounded-full border border-white/16 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    Authentic campus view
                  </span>
                  <h2 className="font-display mt-4 text-3xl leading-tight sm:text-4xl">
                    A real first look at St. Clare&apos;s Maragoli.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
                    Families should see the school itself before they make decisions. This campus
                    image is used intentionally as a visual trust signal.
                  </p>
                </div>
              </div>
            </div>

            <div className="accent-border relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(150deg,rgba(28,35,64,0.97),rgba(122,30,46,0.92)_54%,rgba(92,20,32,0.84)_100%)] p-6 text-white shadow-[0_34px_110px_-56px_rgba(28,35,64,0.8)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(208,154,45,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_34%)]" />
              <div className="relative space-y-6">
                <div className="space-y-3">
                  <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    Parent confidence dashboard
                  </span>
                  <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
                    Why this experience reduces friction for families
                  </h2>
                  <p className="text-base leading-8 text-white/78">
                    Instead of forcing parents through long menus, the site surfaces the three
                    things they usually need first: what the school stands for, how to join, and
                    who to contact quickly.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="rounded-[1.5rem] border border-white/12 bg-white/8 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                      From the principal&apos;s desk
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/82">
                      {aboutContent.principalMessage}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <a
                      href={siteConfig.phoneHref}
                      className="rounded-[1.4rem] bg-white px-5 py-4 text-brand-ink shadow-[0_20px_48px_-30px_rgba(255,255,255,0.42)]"
                    >
                      <PhoneCall className="mb-3 h-5 w-5 text-brand-maroon" />
                      <p className="text-sm font-semibold">Call office</p>
                      <p className="mt-1 text-sm text-muted">{siteConfig.phoneDisplay}</p>
                    </a>
                    <a
                      href={siteConfig.whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[1.4rem] border border-white/14 bg-white/8 px-5 py-4 text-white backdrop-blur-sm"
                    >
                      <MessageCircle className="mb-3 h-5 w-5 text-brand-gold" />
                      <p className="text-sm font-semibold">WhatsApp help</p>
                      <p className="mt-1 text-sm text-white/70">Fast answers for busy parents</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.6rem] border border-brand-maroon/10 bg-[linear-gradient(180deg,rgba(255,248,239,0.98),rgba(247,233,218,0.86))] p-5 shadow-[0_24px_60px_-42px_rgba(28,35,64,0.18)]"
            >
              <p className="font-display text-3xl text-brand-ink">{stat.value}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="About the school"
              title="A school identity built around trust, possibility, and visible care."
              description={aboutContent.story}
            />

            <div className="overflow-hidden rounded-[1.8rem] border border-brand-maroon/10 bg-white/84 shadow-[0_24px_60px_-42px_rgba(28,35,64,0.18)]">
              <div className="relative aspect-[5/3]">
                <Image
                  src={authenticSchoolVisuals.detail.src}
                  alt={authenticSchoolVisuals.detail.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="object-cover object-top brightness-[1.03] contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,35,64,0.08),rgba(28,35,64,0.56)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    Campus detail
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/82">
                    A close, authentic look at the school&apos;s front identity signage and main
                    facade.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/80 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  Mission
                </p>
                <p className="mt-3 text-base leading-8 text-foreground">{aboutContent.mission}</p>
              </div>
              <div className="rounded-[1.8rem] border border-brand-maroon/10 bg-brand-ink p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                  Vision
                </p>
                <p className="mt-3 text-base leading-8 text-white/82">{aboutContent.vision}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  className="rounded-[1.6rem] border border-brand-maroon/10 bg-white/76 p-5"
                >
                  <p className="font-display text-2xl text-brand-ink">{value.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{value.description}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                Product thinking behind the brand
              </p>
              <div className="mt-5 grid gap-4">
                {storyPillars.map((pillar) => (
                  <div key={pillar.title} className="rounded-[1.4rem] bg-brand-blush/35 p-4">
                    <p className="text-sm font-semibold text-brand-ink">{pillar.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted">{pillar.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <SectionHeading
          eyebrow="Academics"
          title="CBC pathways should feel exciting, not confusing."
          description="The academic experience is designed to guide girls and parents from interest to direction with simple explanations, visible departments, and a results dashboard."
        />

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-5">
            {pathways.map((pathway) => (
              <article
                key={pathway.name}
                className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/80 p-6 shadow-lg shadow-brand-maroon/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <span className="inline-flex rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-maroon">
                      {pathway.name}
                    </span>
                    <p className="text-base leading-8 text-foreground">{pathway.focus}</p>
                  </div>
                  <Link
                    href="/academics"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-maroon"
                  >
                    See full pathway guide
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      Key subjects
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pathway.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full border border-brand-maroon/10 bg-brand-blush/35 px-3 py-1 text-sm text-brand-ink"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                      Career doors
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pathway.outcomes.map((outcome) => (
                        <span
                          key={outcome}
                          className="rounded-full border border-brand-gold/25 bg-brand-gold/10 px-3 py-1 text-sm text-brand-maroon"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.9rem] border border-brand-maroon/10 bg-white/82 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                    KCSE performance view
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    A visual trust signal for parents, with space for verified results over time.
                  </p>
                </div>
                <span className="rounded-full bg-brand-maroon-light/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-maroon-light">
                  Demo data
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {performanceData.series.map((item) => (
                  <div key={item.year} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-brand-ink">{item.year}</span>
                      <span className="text-muted">
                        Mean grade {item.meanGrade.toFixed(1)} | Transition {item.transitionRate}%
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-brand-blush/45">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-maroon"
                        style={{ width: `${item.transitionRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-muted">{performanceData.note}</p>
            </div>

            <div className="rounded-[1.9rem] border border-brand-maroon/10 bg-brand-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                What helps girls progress
              </p>
              <div className="mt-5 grid gap-3">
                {campusRhythm.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-7 text-white/82"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Student life"
              title="Girls need more than lessons. They need a school story they are proud to belong to."
              description="The student-life design balances clubs, expression, leadership, and rhythm so confidence is built visibly, not accidentally."
            />

            <div className="grid gap-4">
              {clubs.slice(0, 3).map((club) => (
                <div
                  key={club.name}
                  className="rounded-[1.6rem] border border-brand-maroon/10 bg-white/78 p-5"
                >
                  <p className="font-display text-2xl text-brand-ink">{club.name}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{club.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {authenticSchoolVisuals.studentLife.map((item) => (
              <article
                key={item.src}
                className="overflow-hidden rounded-[1.9rem] border border-brand-maroon/10 bg-white/82 shadow-[0_24px_60px_-42px_rgba(28,35,64,0.22)]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 25vw, 100vw"
                    className="object-cover brightness-[1.04] contrast-[1.06] saturate-[1.02]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,35,64,0.04),rgba(28,35,64,0.64)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                      Authentic photo
                    </div>
                    <p className="font-display mt-3 text-2xl leading-tight text-balance">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-white/80">{item.caption}</p>
                  </div>
                </div>
              </article>
            ))}

            <div className="sm:col-span-2 rounded-[1.9rem] border border-brand-maroon/10 bg-[linear-gradient(145deg,rgba(28,35,64,0.98),rgba(122,30,46,0.94),rgba(92,20,32,0.84))] p-6 text-white shadow-[0_24px_60px_-42px_rgba(28,35,64,0.36)]">
              <div className="flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="max-w-2xl">
                  <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">
                    Verified visual policy
                  </div>
                  <p className="font-display mt-4 text-3xl leading-tight text-balance sm:text-4xl">
                    Where authentic school photos are limited, the design stays image-light on
                    purpose.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/80 sm:text-base">
                    We do not fill important trust moments with stock imagery. That protects
                    credibility for parents and keeps the school story grounded in reality.
                  </p>
                </div>

                <Link
                  href="/student-life"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-maroon"
                >
                  See student life
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Parent experience"
              title="A good school website should lower anxiety for parents, not add to it."
              description="Fee structure, communication routes, and admissions guidance are surfaced in short, scan-friendly cards built for mobile reading."
            />

            <div className="grid gap-4">
              {parentExperience.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.6rem] border border-brand-maroon/10 bg-white/76 p-5"
                >
                  <ShieldCheck className="mb-3 h-5 w-5 text-brand-maroon" />
                  <p className="text-lg font-semibold text-brand-ink">{item.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.9rem] border border-brand-maroon/10 bg-white/80 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                    Structured fee guide
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    Parents understand categories first, then the office can supply the current
                    term figures.
                  </p>
                </div>
                <Link href="/admissions" className="text-sm font-semibold text-brand-maroon">
                  View admissions
                </Link>
              </div>

              <div className="mt-5 grid gap-3">
                {feeGuide.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] bg-brand-blush/32 px-4 py-4"
                  >
                    <p className="text-sm font-semibold text-brand-ink">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-muted">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {communicationChannels.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.6rem] border border-brand-maroon/10 bg-brand-ink p-5 text-white"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/78">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <SectionHeading
          eyebrow="Community and alumni"
          title="The school brand grows stronger when families and alumni can see themselves in it."
          description="The community layer connects ongoing updates, mentorship energy, and school pride into one visible story."
          align="center"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="grid gap-5">
            {alumniOpportunities.map((opportunity) => (
              <div
                key={opportunity.title}
                className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/80 p-6"
              >
                <p className="font-display text-3xl text-brand-ink">{opportunity.title}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{opportunity.detail}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {alumniVoices.map((voice) => (
              <div
                key={voice.title}
                className="rounded-[1.8rem] border border-brand-maroon/10 bg-brand-ink p-6 text-white"
              >
                <Quote className="h-5 w-5 text-brand-gold" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  {voice.title}
                </p>
                <p className="mt-3 text-base leading-8 text-white/82">{voice.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="News and events"
              title="A living school website earns more repeat visits than a static brochure ever can."
              description="News posts and event cards make the platform feel active, current, and worth checking regularly."
            />

            <div className="grid gap-4">
              {latestNews.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/80 p-5 transition-transform duration-200 hover:-translate-y-1"
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

          <div className="space-y-5">
            {upcomingEvents.map((event) => (
              <div
                key={event.title}
                className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/80 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-maroon">
                      Upcoming event
                    </p>
                    <p className="mt-3 font-display text-3xl leading-tight text-brand-ink">
                      {event.title}
                    </p>
                  </div>
                  <CalendarDays className="h-6 w-6 text-brand-gold" />
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{event.description}</p>
                <div className="mt-5 grid gap-2 text-sm text-muted">
                  <p>{formatDateRange(event.startDate, event.endDate)}</p>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}

            <div className="rounded-[1.9rem] bg-brand-maroon p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                Keep the conversation going
              </p>
              <p className="mt-4 text-base leading-8 text-white/82">
                Dynamic updates make the school feel alive. Parents know what to act on, students
                see what to look forward to, and alumni see where to plug back in.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-brand-maroon"
                >
                  Visit community page
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/16 px-5 py-3 text-sm font-semibold text-white"
                >
                  Contact the school
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
