"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-brand-maroon/15 bg-white/90 text-brand-maroon shadow-[0_16px_40px_-20px_rgba(77,20,30,0.4)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-brand-maroon hover:text-white lg:bottom-6 lg:right-6"
      style={{ animation: "slide-up-in 0.3s ease both" }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
