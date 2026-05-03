import Image from "next/image";
import { Award, BookOpen, GraduationCap, Heart, Shield, Star, Users } from "lucide-react";

import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Management | St. Clare's Maragoli Girls School",
  description:
    "Meet the leadership team guiding St. Clare's Maragoli Girls School — the Principal, Deputy Principal, and Dean of Studies.",
  path: "/management",
});

const leadershipTeam = [
  {
    name: "Sr. Mary Consolata Amimo",
    role: "Principal",
    photo: "/images/st-clares/principal.png",
    bio: "Sr. Mary Consolata has been the guiding force behind St. Clare's Maragoli Girls School for over a decade. With a Master's degree in Educational Administration from Kenyatta University, she has led the school through significant academic improvements and infrastructure development. Under her leadership, the school's KCSE mean grade has risen steadily and the transition rate to higher education now exceeds 80%.",
    highlights: [
      "Over 15 years of experience in education leadership",
      "Championed the CBC transition and pathway-based learning",
      "Established partnerships with universities for student mentorship",
      "Led infrastructure expansion including the science laboratories",
    ],
    icon: <GraduationCap className="h-6 w-6" />,
    quote:
      "Every girl who walks through our gates carries a future that deserves to be nurtured with care, discipline, and opportunity.",
  },
  {
    name: "Mrs. Grace Akinyi Odhiambo",
    role: "Deputy Principal",
    photo: "/images/st-clares/deputy-principal.png",
    bio: "Mrs. Odhiambo oversees the daily academic operations and student welfare systems at St. Clare's. A seasoned educator with a background in Mathematics and a Diploma in Guidance & Counselling, she ensures every student receives both the academic challenge and pastoral support they need to thrive.",
    highlights: [
      "Coordinates academic scheduling and teacher development",
      "Manages the school's guidance and counselling programme",
      "Introduced peer mentorship between senior and junior students",
      "Leads the school's community engagement initiatives",
    ],
    icon: <Shield className="h-6 w-6" />,
    quote:
      "Discipline is not about punishment — it is about helping a girl build the internal structure she needs to succeed anywhere.",
  },
  {
    name: "Ms. Esther Nafula Wekesa",
    role: "Dean of Studies",
    photo: "/images/st-clares/dean-studies.png",
    bio: "Ms. Wekesa is responsible for the academic quality assurance and curriculum delivery at St. Clare's. With a Bachelor's degree in Education (Science) and a passion for data-driven teaching, she tracks student performance rigorously and works with department heads to ensure every subject area meets national benchmarks.",
    highlights: [
      "Manages CBC pathway selection and subject allocation",
      "Leads internal examinations and academic progress tracking",
      "Coordinates with KNEC and county education offices",
      "Pioneered the school's science clinic and innovation week",
    ],
    icon: <BookOpen className="h-6 w-6" />,
    quote:
      "When you track every girl's progress individually, you stop losing students to silent struggles.",
  },
];

const schoolValues = [
  {
    icon: <Star className="h-5 w-5 text-brand-gold" />,
    title: "Academic excellence",
    description: "We pursue high standards while making room for every learner to grow at their pace.",
  },
  {
    icon: <Heart className="h-5 w-5 text-brand-gold" />,
    title: "Faith and character",
    description: "Rooted in Catholic values, we nurture integrity, compassion, and service in every student.",
  },
  {
    icon: <Users className="h-5 w-5 text-brand-gold" />,
    title: "Community partnership",
    description: "Parents, alumni, and local leaders are active partners in shaping every girl's journey.",
  },
  {
    icon: <Award className="h-5 w-5 text-brand-gold" />,
    title: "Girl empowerment",
    description: "We believe every girl deserves to see herself as a leader, not just a student.",
  },
];

export default function ManagementPage() {
  return (
    <>
      <RouteHero
        eyebrow="School management"
        title="Meet the women leading St. Clare's Maragoli into the future."
        description="Behind every great school is a leadership team that believes in every student. Our management combines experience, compassion, and vision to create an environment where girls thrive."
        actions={[
          { href: "/contact", label: "Contact the school" },
          { href: "/admissions", label: "Start admissions", variant: "secondary" },
        ]}
      />

      {/* ── Leadership profiles ────────────────────────────────── */}
      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-8">
          {leadershipTeam.map((leader, index) => (
            <article
              key={leader.name}
              className="overflow-hidden rounded-[2rem] border border-brand-maroon/10 bg-white/84 shadow-lg shadow-brand-maroon/5"
            >
              <div className={`grid gap-0 lg:grid-cols-[0.4fr_0.6fr] ${index % 2 === 1 ? "lg:grid-cols-[0.6fr_0.4fr]" : ""}`}>
                {/* Photo */}
                <div className={`relative min-h-[20rem] lg:min-h-[28rem] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image
                    src={leader.photo}
                    alt={`${leader.name} — ${leader.role}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-transparent" />
                </div>

                {/* Bio */}
                <div className={`p-6 sm:p-8 lg:p-10 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-brand-blush/50 p-3 text-brand-maroon">
                      {leader.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-maroon">
                        {leader.role}
                      </p>
                    </div>
                  </div>

                  <h2 className="font-display mt-4 text-3xl leading-tight text-brand-ink sm:text-4xl">
                    {leader.name}
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
                    {leader.bio}
                  </p>

                  {/* Quote */}
                  <blockquote className="mt-6 rounded-[1.4rem] border-l-4 border-brand-gold bg-brand-blush/25 px-5 py-4">
                    <p className="text-sm leading-7 text-brand-ink italic">
                      &ldquo;{leader.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Highlights */}
                  <div className="mt-6 grid gap-2">
                    {leader.highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                        <p className="text-sm leading-7 text-muted">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── School values ──────────────────────────────────────── */}
      <section className="section-shell py-10 sm:py-14">
        <SectionHeading
          eyebrow="Our values"
          title="What the leadership team stands for every day."
          description="These values are not just written on the wall — they shape how every decision is made at St. Clare's."
          align="center"
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {schoolValues.map((value) => (
            <div
              key={value.title}
              className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/82 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blush/50">
                {value.icon}
              </div>
              <p className="mt-4 font-display text-xl leading-tight text-brand-ink">
                {value.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
