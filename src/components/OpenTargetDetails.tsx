"use client";

import { useEffect } from "react";

function openAndScrollToHash(hash: string) {
  if (!hash) return;
  const target = document.getElementById(hash);
  if (!target) return;

  const details =
    target instanceof HTMLDetailsElement
      ? target
      : target.querySelector("details");
  if (details && !details.open) {
    details.open = true;
  }

  target.scrollIntoView();
}

// Keeps /tools#slug search deep links working now that each tool sits in a collapsed <details>.
export default function OpenTargetDetails() {
  useEffect(() => {
    openAndScrollToHash(window.location.hash.slice(1));

    const onHashChange = () =>
      openAndScrollToHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return null;
}
