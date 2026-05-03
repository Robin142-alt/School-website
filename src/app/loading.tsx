export default function Loading() {
  return (
    <div className="section-shell flex min-h-[40vh] items-center justify-center py-20">
      <div className="flex items-center gap-3 rounded-[2rem] border border-brand-maroon/10 bg-white/80 px-6 py-5 shadow-lg shadow-brand-maroon/5">
        <div className="spinner" />
        <p className="text-sm font-semibold text-brand-maroon">
          Loading...
        </p>
      </div>
    </div>
  );
}
