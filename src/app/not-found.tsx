import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-shell py-20">
      <div className="glass-panel accent-border rounded-[2rem] border border-white/70 px-6 py-12 text-center shadow-[0_24px_80px_-48px_rgba(23,48,44,0.45)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-maroon">
          Page not found
        </p>
        <h1 className="font-display mt-4 text-4xl text-brand-ink sm:text-5xl">
          The page you requested is not available.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted">
          Return to the homepage or visit the community updates section to keep exploring the
          school story.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-maroon px-5 py-3 text-sm font-semibold text-white"
          >
            Back to home
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center justify-center rounded-full border border-brand-maroon/15 bg-white px-5 py-3 text-sm font-semibold text-brand-maroon"
          >
            View community updates
          </Link>
        </div>
      </div>
    </section>
  );
}
