import type { ReactNode } from "react";
import { InfoTooltip } from "./InfoTooltip";

export function CalculatorShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm dark:border-primary-900 dark:bg-primary-950/40">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-primary-900 dark:text-primary-50">
          {title}
        </h2>
        <p className="mt-1 text-sm text-stone-600 dark:text-primary-200/70">
          {intro}
        </p>
      </div>
      {children}
    </section>
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
