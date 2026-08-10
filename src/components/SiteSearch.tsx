"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { search, type SearchResultType } from "@/lib/search";

const TYPE_LABEL: Record<SearchResultType, string> = {
  category: "Category",
  tool: "Tool",
  article: "Article",
  faq: "FAQ",
};

export default function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(query), [query]);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
      if (event.key === "Escape") {
        closeSearch();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeSearch]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClickOutside);
      return () => document.removeEventListener("mousedown", onClickOutside);
    }
  }, [open, closeSearch]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search the site"
        className="flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-600 transition-colors hover:border-primary-400 hover:text-primary-800 dark:border-primary-800 dark:text-primary-200/70 dark:hover:border-primary-600 dark:hover:text-primary-50"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.55 4.34l3.06 3.06a.75.75 0 1 1-1.06 1.06l-3.06-3.06A7 7 0 0 1 2 9Z" clipRule="evenodd" />
        </svg>
        Search
        <kbd className="hidden rounded border border-stone-300 px-1 text-[10px] text-stone-400 sm:inline dark:border-primary-800 dark:text-primary-400">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/30 px-4 pt-24 sm:pt-32">
          <div className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white shadow-xl dark:border-primary-800 dark:bg-primary-950">
            <div className="flex items-center gap-2 border-b border-stone-200 px-4 py-3 dark:border-primary-900">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 fill-current text-stone-400">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.55 4.34l3.06 3.06a.75.75 0 1 1-1.06 1.06l-3.06-3.06A7 7 0 0 1 2 9Z" clipRule="evenodd" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search articles, FAQs, categories…"
                className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none dark:text-primary-50 dark:placeholder:text-primary-400"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-primary-200"
              >
                Esc
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto py-2">
              {query.trim().length < 2 && (
                <p className="px-4 py-6 text-center text-sm text-stone-400 dark:text-primary-400">
                  Type at least 2 characters to search.
                </p>
              )}
              {query.trim().length >= 2 && results.length === 0 && (
                <p className="px-4 py-6 text-center text-sm text-stone-400 dark:text-primary-400">
                  No results for &ldquo;{query}&rdquo;.
                </p>
              )}
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.href}
                  onClick={closeSearch}
                  className="flex flex-col gap-0.5 px-4 py-2.5 hover:bg-stone-50 dark:hover:bg-primary-900/40"
                >
                  <span className="flex items-center gap-2">
                    <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-500 dark:bg-primary-900 dark:text-primary-300">
                      {TYPE_LABEL[result.type]}
                    </span>
                    <span className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      {result.title}
                    </span>
                  </span>
                  <span className="line-clamp-1 text-xs text-stone-500 dark:text-primary-300/60">
                    {result.subtitle}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
