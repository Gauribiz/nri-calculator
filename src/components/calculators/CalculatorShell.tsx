import type { ReactNode } from "react";
import { InfoTooltip } from "./InfoTooltip";

/**
 * Accordion root for every calculator (nric-014), reusing the FAQ page's
 * own pattern (src/app/faq/page.tsx): a native <details>/<summary>, a
 * `group`-scoped chevron, no JS state. FAQ's own details elements are
 * independent (no `name` grouping), so multiple can be open at once --
 * matched here deliberately, not single-open/exclusive.
 *
 * Collapsed state shows title + a single-line-clamped intro (via `truncate`)
 * inside <summary>; expanding reveals the same intro in full (untruncated --
 * several calculators' intros carry real modeling caveats, not just a
 * teaser) followed by the calculator's own interactive content. Because
 * <details> hides its body via the browser's native rendering rather than
 * unmounting it, collapsing a calculator never resets any value a user has
 * already entered -- verified, not just assumed (see PR notes).
 *
 * `defaultOpen` is required (not optional) so every call site has to make
 * an explicit choice -- each page passes true for its first calculator,
 * false for the rest. `id`, optional, is only used by the /tools page's
 * calculators, which are deep-linked from site search (/tools#slug): the
 * browser's native "reveal a closed <details> ancestor of the fragment
 * target" behavior only fires when the target is a DESCENDANT of the
 * <details>, not when the target is the <details> itself -- so `id` goes
 * on the body content div, not the <details> element, deliberately.
 * Verified empirically (not just per-spec), since automation navigation
 * doesn't always exercise this the same way a real click does.
 */
export function CalculatorShell({
  title,
  intro,
  children,
  defaultOpen,
  id,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  defaultOpen: boolean;
  id?: string;
}) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-primary-900 dark:bg-primary-950/40"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-primary-50">
            {title}
          </h2>
          <p className="mt-1 truncate text-sm text-stone-600 dark:text-primary-200/70 group-open:hidden">
            {intro}
          </p>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0 fill-current text-stone-400 transition-transform group-open:rotate-180 dark:text-primary-300/70"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </summary>
      <div id={id} className="flex flex-col gap-4 px-6 pb-6">
        <p className="text-sm text-stone-600 dark:text-primary-200/70">
          {intro}
        </p>
        {children}
      </div>
    </details>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="flex items-center gap-1.5 text-stone-700 dark:text-primary-100">
        {label}
        {hint && <InfoTooltip text={hint} />}
      </span>
      <span className="flex items-center gap-2">
        <input
          type="number"
          inputMode="numeric"
          min={min}
          value={Number.isNaN(value) ? "" : value}
          onChange={(event) => onChange(event.target.valueAsNumber)}
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 tabular-nums text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50"
        />
        {suffix && (
          <span className="text-stone-500 dark:text-primary-300/70">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

export function CheckboxField({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex items-start gap-2 text-sm text-stone-700 dark:text-primary-100">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 accent-gold-500"
      />
      <span className="flex items-start gap-1.5">
        {label}
        {hint && <InfoTooltip text={hint} />}
      </span>
    </label>
  );
}

const STATUS_BADGE_CLASSES: Record<"favorable" | "warning" | "neutral", string> = {
  favorable:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  neutral: "bg-stone-200 text-stone-700 dark:bg-primary-900 dark:text-primary-200",
};

export function ResultRow({
  label,
  value,
  emphasis = false,
  status,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  status?: "favorable" | "warning" | "neutral";
}) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-stone-600 dark:text-primary-200/70">{label}</span>
      {status ? (
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium tabular-nums ${STATUS_BADGE_CLASSES[status]}`}
        >
          {value}
        </span>
      ) : (
        <span
          className={
            emphasis
              ? "tabular-nums font-semibold text-primary-900 dark:text-primary-50"
              : "tabular-nums text-stone-800 dark:text-primary-100"
          }
        >
          {value}
        </span>
      )}
    </div>
  );
}

export function DateField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="flex items-center gap-1.5 text-stone-700 dark:text-primary-100">
        {label}
        {hint && <InfoTooltip text={hint} />}
      </span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 tabular-nums text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50"
      />
    </label>
  );
}
