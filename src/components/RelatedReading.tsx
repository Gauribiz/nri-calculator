"use client";

import { useState } from "react";
import Link from "next/link";

export type RelatedReadingArticle = {
  slug: string;
  title: string;
  dek: string;
};

// nric-014: shared across the 4 category pages + the blog article page,
// which previously duplicated this exact grid/card markup independently
// (and had drifted slightly -- nre-nro-tds/page.tsx used zinc border
// colors where the other four used stone/primary; standardized on the
// majority stone/primary here). Caps the initial render at 4 (two full
// rows of the existing 2-column grid) with a client-side "Show more" --
// no page navigation, no change to which articles are considered related.
const VISIBLE_COUNT = 4;

export function RelatedReading({
  articles,
}: {
  articles: RelatedReadingArticle[];
}) {
  const [showAll, setShowAll] = useState(false);

  if (articles.length === 0) return null;

  const visibleArticles = showAll ? articles : articles.slice(0, VISIBLE_COUNT);
  const remaining = articles.length - VISIBLE_COUNT;

  return (
    <div className="flex flex-col gap-3 border-t border-stone-200 pt-6 dark:border-primary-900">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-500 dark:text-primary-300/60">
        Related reading
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {visibleArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="flex flex-col gap-1 rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition-colors hover:border-primary-400 dark:border-primary-900 dark:bg-primary-950 dark:hover:border-primary-600"
          >
            <h3 className="font-medium text-primary-900 dark:text-primary-50">
              {article.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-primary-200/70">
              {article.dek}
            </p>
          </Link>
        ))}
      </div>
      {!showAll && remaining > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="self-start text-sm font-medium text-gold-700 underline hover:no-underline dark:text-gold-300"
        >
          Show more ({remaining} more)
        </button>
      )}
    </div>
  );
}
