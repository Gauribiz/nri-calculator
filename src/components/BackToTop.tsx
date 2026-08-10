"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-primary-800 shadow-md transition-all duration-200 hover:border-primary-400 hover:text-primary-900 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-100 dark:hover:border-primary-600 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-5 w-5 fill-current"
      >
        <path d="M10 4.5a.75.75 0 0 1 .53.22l5.5 5.5a.75.75 0 1 1-1.06 1.06L10.75 7.06V15a.75.75 0 0 1-1.5 0V7.06l-4.22 4.22a.75.75 0 0 1-1.06-1.06l5.5-5.5A.75.75 0 0 1 10 4.5Z" />
      </svg>
    </button>
  );
}
