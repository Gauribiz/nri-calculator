// Parses the plain text of a CAS (Consolidated Account Statement — the
// combined mutual-fund holdings statement CAMS and KFintech issue on
// behalf of Indian AMCs) into per-folio transaction lists.
//
// Scope: tuned to the CAMS/KFintech consolidated CAS text layout, which is
// the most common combined statement NRIs holding mutual funds across
// multiple AMCs receive. It has not been tested against NSDL/CDSL demat
// statements or scanned/image-only PDFs, and deliberately does not guess:
// if no "Folio No" markers are found at all, this returns zero folios
// rather than misreading the document into one bucket. See ADR for the
// full scope note — this needs verification against real CAS files before
// being treated as reliable for every RTA's exact column layout.
//
// Column parsing (amount/units/NAV/unit balance) is best-effort and only
// used for display -- the diff itself (casDiff.ts) compares the
// normalized raw line text, so a column-parsing miss doesn't corrupt the
// core "what changed" answer as long as the same line extracts to the
// same text in both statements.

const FOLIO_LINE_RE = /Folio\s*No\.?\s*:?\s*([A-Za-z0-9/\-]+)/i;
const DATE_LINE_RE = /^(\d{2}-[A-Za-z]{3}-\d{4})\s+(.*)$/;
const NUM_TOKEN_RE = /^\(?-?[\d,]+\.\d{2,4}\)?$/;

export type CasTransaction = {
  /** Date exactly as printed, e.g. "15-Apr-2025". */
  date: string;
  /** Parsed to YYYY-MM-DD; null if the printed date didn't parse. */
  isoDate: string | null;
  description: string;
  amount: number | null;
  units: number | null;
  navPerUnit: number | null;
  unitBalance: number | null;
  /** Normalized full line — the diff key. */
  raw: string;
};

export type CasFolio = {
  folioNumber: string;
  schemeName: string;
  transactions: CasTransaction[];
};

export type CasStatement = {
  folios: CasFolio[];
};

const MONTHS: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};

function parseDate(printed: string): string | null {
  const match = printed.match(/^(\d{2})-([A-Za-z]{3})-(\d{4})$/);
  if (!match) return null;
  const [, day, monAbbr, year] = match;
  const month = MONTHS[monAbbr.toLowerCase()];
  if (!month) return null;
  return `${year}-${month}-${day}`;
}

function parseNum(token: string): number {
  const negative = token.startsWith("(") && token.endsWith(")");
  const cleaned = token.replace(/[(),]/g, "");
  const value = Number.parseFloat(cleaned);
  return negative ? -value : value;
}

function parseTransactionLine(line: string): CasTransaction | null {
  const dateMatch = line.match(DATE_LINE_RE);
  if (!dateMatch) return null;
  const [, date, rest] = dateMatch;
  const isoDate = parseDate(date);

  const tokens = rest.trim().split(/\s+/);
  const numericTail: number[] = [];
  let cut = tokens.length;
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (NUM_TOKEN_RE.test(tokens[i])) {
      numericTail.unshift(parseNum(tokens[i]));
      cut = i;
    } else {
      break;
    }
  }
  const description = tokens.slice(0, cut).join(" ").trim();

  let amount: number | null = null;
  let units: number | null = null;
  let navPerUnit: number | null = null;
  let unitBalance: number | null = null;

  if (numericTail.length === 4) {
    [amount, units, navPerUnit, unitBalance] = numericTail;
  } else if (numericTail.length === 3) {
    [amount, units, unitBalance] = numericTail;
  } else if (numericTail.length === 1) {
    [unitBalance] = numericTail;
  } else if (numericTail.length >= 2) {
    // Unrecognized column count for this RTA's layout -- keep the raw line
    // (used for diffing) but don't guess which field is which.
    unitBalance = numericTail[numericTail.length - 1];
  }

  return {
    date,
    isoDate,
    description,
    amount,
    units,
    navPerUnit,
    unitBalance,
    raw: `${date} ${description} ${numericTail.join(" ")}`.trim(),
  };
}

export function parseCasText(text: string): CasStatement {
  const lines = text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 0);

  const folios: CasFolio[] = [];
  let current: CasFolio | null = null;
  let awaitingSchemeName = false;

  for (const line of lines) {
    const folioMatch = line.match(FOLIO_LINE_RE);
    if (folioMatch) {
      current = {
        folioNumber: folioMatch[1],
        schemeName: "",
        transactions: [],
      };
      folios.push(current);
      awaitingSchemeName = true;
      continue;
    }

    if (!current) continue;

    if (awaitingSchemeName) {
      // The scheme name is the first non-transaction, non-empty line
      // after a folio header in the CAMS/KFintech layout.
      if (!DATE_LINE_RE.test(line)) {
        current.schemeName = current.schemeName
          ? `${current.schemeName} ${line}`
          : line;
        continue;
      }
      awaitingSchemeName = false;
    }

    const transaction = parseTransactionLine(line);
    if (transaction) {
      current.transactions.push(transaction);
    }
  }

  return { folios: folios.filter((folio) => folio.transactions.length > 0) };
}
