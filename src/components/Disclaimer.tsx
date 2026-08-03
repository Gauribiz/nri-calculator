export default function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="Disclaimer"
      className="flex gap-3 rounded-xl border border-gold-300 bg-gold-50 px-5 py-4 text-sm text-gold-900 shadow-sm dark:border-gold-700 dark:bg-gold-900/30 dark:text-gold-100"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="mt-0.5 h-5 w-5 shrink-0 fill-current text-gold-600 dark:text-gold-300"
      >
        <path
          fillRule="evenodd"
          d="M10 1.75c.32 0 .63.14.85.38l7.4 8a1.25 1.25 0 0 1-.03 1.72l-7.4 7.25a1.25 1.25 0 0 1-1.75 0l-7.4-7.25a1.25 1.25 0 0 1-.03-1.72l7.4-8c.22-.24.53-.38.85-.38Zm-.75 4.5v5.5h1.5v-5.5h-1.5Zm0 7v1.5h1.5v-1.5h-1.5Z"
          clipRule="evenodd"
        />
      </svg>
      <div>
        <p className="font-semibold tracking-tight">Not professional advice</p>
        <p className="mt-1 text-gold-800 dark:text-gold-200/90">
          This page provides general information only, for the US-India NRI
          corridor, and is not professional tax, legal, or financial advice. It
          does not account for your individual circumstances. Rules referenced
          here can change, and outcomes depend on facts specific to you. Please
          consult a qualified tax advisor, chartered accountant, or attorney
          licensed in the relevant jurisdiction before making any decision.
        </p>
      </div>
    </div>
  );
}
