import type { ReactNode } from "react";
import { InfoTooltip } from "./InfoTooltip";

export function CalculatorShell({
  title,
  intro,
  children,
  defaultOpen = false,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      name="calculators"
      open={defaultOpen}
      className="group rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-primary-900 dark:bg-primary-950/40"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-6 py-4">
        <h2 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-primary-50">
          {title}
        </h2>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4 shrink-0 fill-current text-stone-400 transition-transform group-open:rotate-180 dark:text-primary-300/70"
        >
          <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z" />
        </svg>
      </summary>
      <div className="flex flex-col gap-4 px-6 pb-6 pt-1">
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
