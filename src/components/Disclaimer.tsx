export default function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="Disclaimer"
      className="rounded-lg border-2 border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100"
    >
      <p className="font-semibold">Not professional advice</p>
      <p className="mt-1">
        This page provides general information only, for the US-India NRI
        corridor, and is not professional tax, legal, or financial advice. It
        does not account for your individual circumstances. Rules referenced
        here can change, and outcomes depend on facts specific to you. Please
        consult a qualified tax advisor, chartered accountant, or attorney
        licensed in the relevant jurisdiction before making any decision.
      </p>
    </div>
  );
}
