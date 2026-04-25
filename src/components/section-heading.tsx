type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={[
        "space-y-4",
        isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
      ].join(" ")}
    >
      <span className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-forest">
        {eyebrow}
      </span>
      <div className="space-y-3">
        <h2 className="font-display text-3xl leading-tight text-balance text-brand-ink sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="text-base leading-8 text-muted sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
