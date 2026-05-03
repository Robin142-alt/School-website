import { Check, GraduationCap, TrendingUp } from "lucide-react";

import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { getPerformanceDataFromStore } from "@/lib/repositories/content";
import {
  departments,
  learningSupport,
  pathways,
} from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Academics | St. Clare's Maragoli Girls School",
  description:
    "Parent-friendly academic guidance covering CBC pathways, departments, and performance storytelling.",
  path: "/academics",
});

export default async function AcademicsPage() {
  const performanceData = await getPerformanceDataFromStore();

  return (
    <>
      <RouteHero
        eyebrow="Academics"
        title="A learning system that makes progress visible and pathways understandable."
        description="The academic product strategy focuses on clarity: what girls can study, why it matters, and how parents can follow the journey without being overwhelmed."
        actions={[
          { href: "/admissions", label: "Start admissions" },
          { href: "/community", label: "See school updates", variant: "secondary" },
        ]}
      />

      <section className="section-shell py-8 sm:py-10">
        <SectionHeading
          eyebrow="CBC pathways"
          title="Three routes, clearly explained for families."
          description="Instead of jargon-heavy subject lists, each pathway is framed through identity, strengths, subject choices, and possible future doors."
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {pathways.map((pathway) => (
            <article
              key={pathway.name}
              className="rounded-[1.9rem] border border-brand-maroon/10 bg-white/82 p-6 shadow-lg shadow-brand-maroon/5"
            >
              <span className="inline-flex rounded-full bg-brand-gold/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-maroon">
                {pathway.name}
              </span>
              <p className="mt-4 text-sm leading-7 text-muted">{pathway.focus}</p>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    Subjects often associated
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
                    Future opportunities
                  </p>
                  <div className="mt-3 grid gap-2">
                    {pathway.outcomes.map((outcome) => (
                      <div key={outcome} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="h-4 w-4 text-brand-maroon" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 xl:grid-cols-[1.02fr_0.98fr]">
          <div>
            <SectionHeading
              eyebrow="Departments"
              title="Departments that speak to the whole learner."
              description="A strong school website should show parents that academic quality lives across multiple departments, not only in one exam season."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {departments.map((department) => (
                <div
                  key={department.name}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/80 p-5"
                >
                  <GraduationCap className="h-5 w-5 text-brand-maroon" />
                  <p className="mt-4 text-lg font-semibold text-brand-ink">{department.name}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{department.summary}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.9rem] border border-brand-maroon/10 bg-white/84 p-6">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-brand-gold" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                    KCSE performance visual
                  </p>
                  <p className="mt-1 text-sm text-muted">Sample values for launch planning.</p>
                </div>
              </div>

              <div className="mt-6 space-y-5">
                {performanceData.series.map((item) => (
                  <div key={item.year} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-brand-ink">{item.year}</span>
                      <span className="text-muted">
                        Mean {item.meanGrade.toFixed(1)} | Transition {item.transitionRate}%
                      </span>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-3">
                      <div className="h-3 rounded-full bg-brand-blush/45">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-maroon"
                          style={{ width: `${item.transitionRate}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-muted">{item.transitionRate}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-muted">{performanceData.note}</p>
            </div>

            <div className="rounded-[1.9rem] border border-brand-maroon/10 bg-brand-ink p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                Learning support pillars
              </p>
              <div className="mt-5 grid gap-3">
                {learningSupport.map((item) => (
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
    </>
  );
}
