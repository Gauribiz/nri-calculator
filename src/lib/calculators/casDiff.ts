// Diffs two parsed CAS statements (see casStatement.ts) folio by folio.
//
// CAS statements are cumulative -- a later statement normally contains
// every transaction from an earlier one plus whatever happened since, so
// "what changed" is mainly "what's new". Transactions are matched by their
// normalized raw line text (CasTransaction.raw), not by re-parsed fields,
// so the diff stays correct even where column parsing itself is
// imperfect. A transaction present in the older statement but missing
// from the newer one is unusual for a cumulative statement and is
// surfaced separately (`removed`) rather than hidden, since it could mean
// a correction was made upstream -- or just that the two statements don't
// actually cover the same folio history.

import type { CasFolio, CasStatement, CasTransaction } from "./casStatement";

export type CasFolioDiff = {
  folioNumber: string;
  schemeName: string;
  added: CasTransaction[];
  removed: CasTransaction[];
  closingBalanceA: number | null;
  closingBalanceB: number | null;
};

export type CasDiffResult = {
  matchedFolios: CasFolioDiff[];
  foliosOnlyInA: CasFolio[];
  foliosOnlyInB: CasFolio[];
  totalAdded: number;
  totalRemoved: number;
};

function closingBalance(folio: CasFolio): number | null {
  for (let i = folio.transactions.length - 1; i >= 0; i--) {
    const balance = folio.transactions[i].unitBalance;
    if (balance !== null) return balance;
  }
  return null;
}

export function diffCasStatements(
  statementA: CasStatement,
  statementB: CasStatement
): CasDiffResult {
  const foliosA = new Map(
    statementA.folios.map((folio) => [folio.folioNumber, folio])
  );
  const foliosB = new Map(
    statementB.folios.map((folio) => [folio.folioNumber, folio])
  );

  const matchedFolios: CasFolioDiff[] = [];
  let totalAdded = 0;
  let totalRemoved = 0;

  for (const [folioNumber, folioA] of foliosA) {
    const folioB = foliosB.get(folioNumber);
    if (!folioB) continue;

    const rawA = new Set(folioA.transactions.map((t) => t.raw));
    const rawB = new Set(folioB.transactions.map((t) => t.raw));

    const added = folioB.transactions.filter((t) => !rawA.has(t.raw));
    const removed = folioA.transactions.filter((t) => !rawB.has(t.raw));

    totalAdded += added.length;
    totalRemoved += removed.length;

    matchedFolios.push({
      folioNumber,
      schemeName: folioB.schemeName || folioA.schemeName,
      added,
      removed,
      closingBalanceA: closingBalance(folioA),
      closingBalanceB: closingBalance(folioB),
    });
  }

  const foliosOnlyInA = statementA.folios.filter(
    (folio) => !foliosB.has(folio.folioNumber)
  );
  const foliosOnlyInB = statementB.folios.filter(
    (folio) => !foliosA.has(folio.folioNumber)
  );

  return {
    matchedFolios,
    foliosOnlyInA,
    foliosOnlyInB,
    totalAdded,
    totalRemoved,
  };
}
