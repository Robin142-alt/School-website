import Image from "next/image";
import { Camera, Clapperboard, Medal, Microscope } from "lucide-react";

import { RouteHero } from "@/components/route-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Student Gallery | St. Clare's Maragoli Girls School",
  description:
    "A visual journey through student life at St. Clare's Maragoli. From the Kenya National Drama and Film Festival to our intensive maths challenges.",
  path: "/gallery",
});

const highlights = [
  {
    icon: <Clapperboard className="h-5 w-5 text-brand-gold" />,
    title: "National Drama & Film",
    description: "Award-winning narratives and films at the Kenya National Drama and Film Festival.",
  },
  {
    icon: <Microscope className="h-5 w-5 text-brand-gold" />,
    title: "Maths Speed Tests",
    description: "High-energy academic challenges and viral maths speed test competitions.",
  },
  {
    icon: <Medal className="h-5 w-5 text-brand-gold" />,
    title: "CBC Arts & Sports",
    description: "Vibrant learning pathways featuring performing arts, visual arts, and physical education.",
  },
];

const galleryImages = [
  {
    src: "/images/st-clares/students-procession.jpg",
    alt: "Students in a vibrant procession",
    caption: "Students celebrating and performing during a school festival procession.",
    colSpan: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/images/st-clares/students-uniform.jpg",
    alt: "Students in school uniform",
    caption: "Morning assembly and preparation for the day's rigorous academic schedule.",
    colSpan: "md:col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/st-clares/campus-detail.jpg",
    alt: "Campus details",
    caption: "The serene environment that fosters our CBC Arts & Sports pathway.",
    colSpan: "md:col-span-1",
    aspect: "aspect-[4/5]",
  },
  {
    src: "/images/st-clares/campus-hero.jpg",
    alt: "Academic complex",
    caption: "The main academic complex, home to our intensive science and mathematics programs.",
    colSpan: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
];

export default function GalleryPage() {
  return (
    <>
      <RouteHero
        eyebrow="Student Gallery"
        title="Life at St. Clare's Maragoli in pictures."
        description="Explore the vibrant daily life of our students. From performing on national stages to tackling academic challenges, this is where potential meets opportunity."
        actions={[
          { href: "/admissions", label: "Start admissions" },
          { href: "/student-life", label: "Read about student life", variant: "secondary" },
        ]}
      />

      {/* ── Real Life Highlights ───────────────────────────────── */}
      <section className="section-shell py-10 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.8rem] border border-brand-maroon/10 bg-white/82 p-6 text-center"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blush/50">
                {item.icon}
              </div>
              <p className="mt-4 font-display text-xl leading-tight text-brand-ink">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Photo Gallery ──────────────────────────────────────── */}
      <section className="section-shell pb-16 sm:pb-20">
        <SectionHeading
          eyebrow="Moments"
          title="Captured on campus."
          description="A glimpse into the environment, the students, and the culture that defines St. Clare's Maragoli Girls School."
          align="center"
        />

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`card-interactive group relative overflow-hidden rounded-[2rem] border border-brand-maroon/10 bg-white/50 ${img.colSpan}`}
            >
              <div className={`relative w-full ${img.aspect} overflow-hidden`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 translate-y-2 opacity-90 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex items-start gap-3">
                  <Camera className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" />
                  <p className="text-sm font-medium leading-relaxed text-white">
                    {img.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
