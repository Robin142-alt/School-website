import { Heart, Lightbulb, Quote, UsersRound } from "lucide-react";

import { AlumniForm } from "@/components/forms/alumni-form";
import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";
import { alumniOpportunities } from "@/lib/content/site";
import { getTestimonialsFromStore } from "@/lib/repositories/content";

export const metadata = buildMetadata({
  title: "Alumni | St. Clare's Maragoli Girls School",
  description:
    "Rejoin the school story. Mentorship, career talks, bursary support, and partnerships — the alumni network keeps the circle strong.",
  path: "/alumni",
});

const alumniImpact = [
  {
    title: "200+",
    description: "Girls mentored by alumni volunteers since the network launched.",
  },
  {
    title: "12",
    description: "Career talks delivered in the past three academic years.",
  },
  {
    title: "4",
    description: "Active bursary partnerships supporting students in need.",
  },
];

const alumniStories = [
  {
    name: "Mercy W.",
    years: "2015–2018",
    role: "Nurse, Kenyatta National Hospital",
    quote:
      "St. Clare's gave me the discipline to push through nursing school. Now I come back every year to talk to Form 3 girls about healthcare careers.",
  },
  {
    name: "Faith O.",
    years: "2012–2015",
    role: "Agricultural Extension Officer, Vihiga County",
    quote:
      "The CBC pathways the school is building are exactly what we needed. I wish I had that kind of guidance when I was a student here.",
  },
  {
    name: "Linda A.",
    years: "2017–2020",
    role: "Business Owner, Nairobi",
    quote:
      "I started a small tailoring business after school. When the principal called and asked if I could mentor girls interested in business, I said yes immediately.",
  },
];

export default async function AlumniPage() {
  const alumniVoices = await getTestimonialsFromStore();

  return (
    <>
      <RouteHero
        eyebrow="Alumni"
        title="Once a St. Clare's girl, always part of the story."
        description="The alumni network keeps the circle strong — through mentorship, career talks, bursary support, and partnerships that show current students what is possible."
        actions={[
          { href: "#alumni-form", label: "Join the alumni network" },
          { href: "/contact", label: "Contact the school", variant: "secondary" },
        ]}
      />

      {/* ── Alumni form at top ────────────────────────────────── */}
      <section className="section-shell py-8 sm:py-10">
        <div
          id="alumni-form"
          className="rounded-[2rem] border border-brand-maroon/10 bg-white/84 p-6 shadow-lg shadow-brand-maroon/5 sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <Heart className="h-6 w-6 text-brand-gold" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-maroon">
                Alumni registration
              </p>
              <p className="mt-1 text-sm text-muted">
                Keep the barrier low and the invitation clear. That is how more alumni say yes.
              </p>
            </div>
          </div>
          <AlumniForm />
        </div>
      </section>

      {/* ── Impact numbers ─────────────────────────────────────── */}
      <section className="section-shell py-10 sm:py-14">
        <SectionHeading
          eyebrow="Alumni impact"
          title="Numbers that show the circle is already growing."
          description="Former students are already coming back — as mentors, speakers, and supporters. Here is the evidence."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {alumniImpact.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/82 p-6 text-center"
            >
              <p className="font-display text-5xl text-brand-maroon">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How to give back ───────────────────────────────────── */}
      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-10 xl:grid-cols-[0.94fr_1.06fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Opportunities"
              title="A strong alumni system gives girls more examples of what is possible."
              description="This section invites former students and community women back into the school's story through mentorship, career talks, and targeted support."
            />

            <div className="grid gap-4">
              {alumniOpportunities.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-brand-ink p-5 text-white"
                >
                  <Lightbulb className="h-5 w-5 text-brand-gold" />
                  <p className="mt-4 font-display text-3xl leading-tight">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-white/78">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Alumni voices ──────────────────────────────────── */}
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Alumni stories"
              title="Real voices from women who walked these corridors."
              description="Short testimonials from former students who are now giving back."
            />

            <div className="grid gap-4">
              {alumniStories.map((story) => (
                <div
                  key={story.name}
                  className="rounded-[1.7rem] border border-brand-maroon/10 bg-white/82 p-5"
                >
                  <Quote className="h-5 w-5 text-brand-gold" />
                  <p className="mt-4 text-sm leading-7 text-muted italic">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-maroon/10 text-sm font-bold text-brand-maroon">
                      {story.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-ink">{story.name}</p>
                      <p className="text-xs text-muted">
                        {story.role} · Class of {story.years}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Database testimonials */}
            {alumniVoices.length > 0 && (
              <div className="grid gap-4">
                {alumniVoices.map((voice) => (
                  <div
                    key={voice.title}
                    className="rounded-[1.7rem] border border-brand-maroon/10 bg-brand-blush/30 p-5"
                  >
                    <UsersRound className="h-5 w-5 text-brand-maroon" />
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-maroon">
                      {voice.title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-muted">{voice.quote}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
