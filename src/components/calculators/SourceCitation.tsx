export type Source = {
  label: string;
  href: string;
};

export function SourceCitation({ sources }: { sources: Source[] }) {
  return (
    <p className="text-xs text-stone-500 dark:text-primary-300/60">
      Sources:{" "}
      {sources.map((source, index) => (
        <span key={source.href}>
          <a
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-700 underline hover:no-underline dark:text-gold-300"
          >
            {source.label}
          </a>
          {index < sources.length - 1 ? ", " : ""}
        </span>
      ))}
    </p>
  );
}

export function VerifiedStamp({
  source,
  date,
}: {
  source: string;
  date: string;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs text-stone-600 dark:bg-primary-900 dark:text-primary-200/80">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5 fill-current text-emerald-600 dark:text-emerald-400"
      >
        <path
          fillRule="evenodd"
          d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z"
          clipRule="evenodd"
        />
      </svg>
      Verified against {source}, {date}
    </span>
  );
}
