import type { ReactNode } from "react";

export function HowCalculated({ children }: { children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-stone-200 dark:border-primary-900">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 text-sm font-medium text-primary-800 dark:text-primary-100">
        How this is calculated
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0 fill-current transition-transform group-open:rotate-180"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </summary>
      <div className="border-t border-stone-200 px-4 py-3 text-sm text-stone-600 dark:border-primary-900 dark:text-primary-200/80">
        {children}
      </div>
    </details>
  );
}
