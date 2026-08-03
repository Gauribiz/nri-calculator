export function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={text}
        className="flex h-4 w-4 items-center justify-center rounded-full bg-stone-200 text-[10px] font-semibold leading-none text-stone-600 focus:outline-none focus:ring-2 focus:ring-primary-500/40 dark:bg-primary-800 dark:text-primary-200"
      >
        i
      </button>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-primary-900 px-3 py-2 text-xs font-normal text-primary-50 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 dark:bg-primary-800"
      >
        {text}
      </span>
    </span>
  );
}
