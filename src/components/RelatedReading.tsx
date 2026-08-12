"use client";

import Link from "next/link";
import { useState } from "react";

export type RelatedReadingItem = {
  slug: string;
  href: string;
  title: string;
  dek: string;
};

const VISIBLE_COUNT = 4;

const VARIANT_CLASSES = {
  default: {
    section: "flex flex-col gap-3 border-t border-stone-200 pt-6 dark:border-primary-900",
    heading:
      "text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-primary-300/60",
    card: "flex flex-col gap-1 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-400 dark:border-primary-900 dark:bg-primary-950 dark:hover:border-primary-600",
    title: "font-medium text-primary-900 dark:text-primary-50",
    dek: "text-sm text-stone-600 dark:text-primary-200/70",
  },
  zinc: {
    section: "flex flex-col gap-3 border-t border-zinc-200 pt-6 dark:border-zinc-800",
    heading: "text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-500",
    card: "flex flex-col gap-1 rounded-lg border border-zinc-200 p-4 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600",
    title: "font-medium",
    dek: "text-sm text-zinc-600 dark:text-zinc-400",
  },
} as const;

export default function RelatedReading({
  items,
  variant = "default",
}: {
  items: RelatedReadingItem[];
  variant?: keyof typeof VARIANT_CLASSES;
}) {
  const [expanded, setExpanded] = useState(false);

  if (items.length === 0) return null;

  const classes = VARIANT_CLASSES[variant];
  const visibleItems = expanded ? items : items.slice(0, VISIBLE_COUNT);
  const hiddenCount = items.length - VISIBLE_COUNT;

  return (
    <div className={classes.section}>
      <h2 className={classes.heading}>Related reading</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visibleItems.map((item) => (
          <Link key={item.slug} href={item.href} className={classes.card}>
            <h3 className={classes.title}>{item.title}</h3>
            <p className={classes.dek}>{item.dek}</p>
          </Link>
        ))}
      </div>
      {!expanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="w-fit text-sm font-medium text-gold-700 underline hover:no-underline dark:text-gold-300"
        >
          Show {hiddenCount} more
        </button>
      )}
    </div>
  );
}
