import { CheckCircle2, CircleHelp, FileCheck2, Wallet } from "lucide-react";

import { AdmissionForm } from "@/components/forms/admission-form";
import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import {
  admissionFaqs,
  admissionRequirements,
  admissionSteps,
  feeGuide,
} from "@/lib/content/site";

export const metadata = buildMetadata({
  title: "Admissions | St. Clare's Maragoli Girls School",
  description:
    "An admissions journey designed for clarity, parent confidence, and mobile-first simplicity.",
  path: "/admissions",
});

export default function AdmissionsPage() {
  return (
    <>
      <RouteHero
        eyebrow="Admissions"
        title="A calm admissions journey built for real parents, not perfect internet users."
        description="The admissions experience strips the process down to simple stages, human language, and clear contact options so families can move with confidence."
        actions={[
          { href: "#admissions-form", label: "Start admission" },
          { href: "/contact", label: "Call or visit first", variant: "secondary" },
        ]}
      />

      <section className="section-shell py-8 sm:py-10">
        <SectionHeading
          eyebrow="Admissions process"
          title="Four steps that feel understandable on a first read."
          description="Parents should be able to see what happens next within seconds, especially on a phone screen."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {admissionSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-[1.8rem] border border-brand-forest/10 bg-white/82 p-5"
            >
              <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand-gold">
                Step {step.step}
              </p>
              <p className="mt-3 font-display text-3xl leading-tight text-brand-ink">{step.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Requirements"
              title="Parents need a checklist, not a maze."
              description="This section organizes what families should prepare before onboarding, including transfer context, contact details, and wellbeing notes."
            />

            <div className="rounded-[1.9rem] border border-brand-forest/10 bg-white/82 p-6">
              <div className="grid gap-4">
                {admissionRequirements.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-[1.4rem] bg-brand-sage/30 px-4 py-4"
                  >
                    <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-brand-forest" />
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-brand-forest/10 bg-brand-ink p-6 text-white">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-brand-gold" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">
                    Fee structure
                  </p>
                  <p className="mt-1 text-sm text-white/72">
                    Organized by category for faster planning.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3">
                {feeGuide.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.3rem] border border-white/10 bg-white/6 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-7 text-white/74">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="Common questions"
              title="Parents often need reassurance more than they need more words."
              description="The FAQ is intentionally short and practical so the school can remove friction before it becomes hesitation."
            />

            <div className="space-y-3">
              {admissionFaqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[1.7rem] border border-brand-forest/10 bg-white/82 p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-brand-ink">
                    <span>{faq.question}</span>
                    <CircleHelp className="h-5 w-5 shrink-0 text-brand-forest" />
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>

            <div
              id="admissions-form"
              className="rounded-[1.9rem] border border-brand-forest/10 bg-white/84 p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-brand-gold" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-forest">
                    Admissions portal
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Short form, fast follow-up, and a phone-first fallback.
                  </p>
                </div>
              </div>
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
