"use client";

import { useState } from "react";
import { diffCasStatements, type CasDiffResult } from "@/lib/calculators/casDiff";
import {
  CasPdfParseError,
  CasPdfPasswordRequiredError,
  CasPdfWrongPasswordError,
  extractCasPdfText,
} from "@/lib/calculators/casPdfExtract";
import { parseCasText } from "@/lib/calculators/casStatement";
import { CalculatorShell, ResultRow } from "./CalculatorShell";
import { DownloadResultsButton, type ResultField } from "./DownloadResultsButton";
import { HowCalculated } from "./HowCalculated";
import { PDF_DISCLAIMER } from "./pdfDisclaimer";

const UNRECOGNIZED_FORMAT_MESSAGE =
  "Couldn't find any recognizable transactions in one or both PDFs. This tool currently supports the standard CAMS/KFintech consolidated CAS text layout — scanned/image-only PDFs and other statement formats (e.g. NSDL/CDSL demat CAS) aren't supported yet.";

const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});
const unitsFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 3,
});

type CompareStatus = "idle" | "comparing" | "ready" | "error";

async function extractOne(
  file: File,
  password: string,
  label: "older" | "newer"
): Promise<string> {
  try {
    return await extractCasPdfText(file, password || undefined);
  } catch (error) {
    const prefix = label === "older" ? "Older statement" : "Newer statement";
    if (error instanceof CasPdfPasswordRequiredError) {
      throw new Error(`${prefix}: this PDF needs a password — enter it above and try again.`);
    }
    if (error instanceof CasPdfWrongPasswordError) {
      throw new Error(`${prefix}: that password didn't work — check it and try again.`);
    }
    if (error instanceof CasPdfParseError) {
      throw new Error(`${prefix}: couldn't read this PDF — is it a valid, unencrypted-or-correctly-passworded PDF file?`);
    }
    throw new Error(`${prefix}: something went wrong reading this file.`);
  }
}

function transactionLabel(folioLabel: string, dateStr: string, description: string): string {
  return `${folioLabel} — ${dateStr} ${description}`.trim();
}

function transactionValue(amount: number | null, units: number | null): string {
  const parts: string[] = [];
  if (amount !== null) parts.push(`₹${inrFormatter.format(amount)}`);
  if (units !== null) parts.push(`${unitsFormatter.format(units)} units`);
  return parts.length > 0 ? parts.join(" · ") : "—";
}

function buildExportRows(result: CasDiffResult): ResultField[] {
  const rows: ResultField[] = [
    { label: "New transactions found", value: String(result.totalAdded) },
    { label: "Matched folios", value: String(result.matchedFolios.length) },
  ];

  for (const folio of result.matchedFolios) {
    const folioLabel = `${folio.schemeName || "Unknown scheme"} (Folio ${folio.folioNumber})`;
    for (const transaction of folio.added) {
      rows.push({
        label: transactionLabel(folioLabel, transaction.date, transaction.description),
        value: transactionValue(transaction.amount, transaction.units),
      });
    }
    for (const transaction of folio.removed) {
      rows.push({
        label: `${transactionLabel(folioLabel, transaction.date, transaction.description)} (no longer present)`,
        value: transactionValue(transaction.amount, transaction.units),
      });
    }
  }

  for (const folio of result.foliosOnlyInA) {
    rows.push({
      label: `Folio only in older statement: ${folio.schemeName || "Unknown scheme"} (${folio.folioNumber})`,
      value: `${folio.transactions.length} transaction(s)`,
    });
  }
  for (const folio of result.foliosOnlyInB) {
    rows.push({
      label: `Folio only in newer statement: ${folio.schemeName || "Unknown scheme"} (${folio.folioNumber})`,
      value: `${folio.transactions.length} transaction(s)`,
    });
  }

  return rows;
}

export default function CasDiffTool({
  defaultOpen = false,
}: {
  defaultOpen?: boolean;
} = {}) {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [passwordA, setPasswordA] = useState("");
  const [passwordB, setPasswordB] = useState("");
  const [status, setStatus] = useState<CompareStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<CasDiffResult | null>(null);

  async function handleCompare() {
    if (!fileA || !fileB) return;
    setStatus("comparing");
    setErrorMessage(null);
    setResult(null);

    try {
      const [textA, textB] = await Promise.all([
        extractOne(fileA, passwordA, "older"),
        extractOne(fileB, passwordB, "newer"),
      ]);

      const statementA = parseCasText(textA);
      const statementB = parseCasText(textB);

      if (statementA.folios.length === 0 || statementB.folios.length === 0) {
        setStatus("error");
        setErrorMessage(UNRECOGNIZED_FORMAT_MESSAGE);
        return;
      }

      setResult(diffCasStatements(statementA, statementB));
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong comparing these statements."
      );
    }
  }

  const canCompare = fileA !== null && fileB !== null && status !== "comparing";
  const foliosWithChanges =
    result?.matchedFolios.filter((f) => f.added.length > 0 || f.removed.length > 0) ?? [];
  const unchangedFolioCount = (result?.matchedFolios.length ?? 0) - foliosWithChanges.length;

  return (
    <CalculatorShell
      defaultOpen={defaultOpen}
      title="CAS statement diff tool"
      intro="Upload two CAS (Consolidated Account Statement) PDFs — an older one and a newer one — to see what's changed: new transactions since the older statement, and any folios that only appear in one of the two. Both files are read entirely in your browser; nothing is uploaded anywhere."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-lg border border-stone-200 p-4 dark:border-primary-900">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-stone-700 dark:text-primary-100">Older statement (PDF)</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={(event) => setFileA(event.target.files?.[0] ?? null)}
              className="text-xs text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-800 hover:file:bg-stone-200 dark:text-primary-200/70 dark:file:bg-primary-900 dark:file:text-primary-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-stone-700 dark:text-primary-100">Password (if protected)</span>
            <input
              type="password"
              value={passwordA}
              onChange={(event) => setPasswordA(event.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50"
              placeholder="Leave blank if none"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-stone-200 p-4 dark:border-primary-900">
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-stone-700 dark:text-primary-100">Newer statement (PDF)</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={(event) => setFileB(event.target.files?.[0] ?? null)}
              className="text-xs text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-stone-100 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-primary-800 hover:file:bg-stone-200 dark:text-primary-200/70 dark:file:bg-primary-900 dark:file:text-primary-100"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="text-stone-700 dark:text-primary-100">Password (if protected)</span>
            <input
              type="password"
              value={passwordB}
              onChange={(event) => setPasswordB(event.target.value)}
              className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-50"
              placeholder="Leave blank if none"
            />
          </label>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCompare}
        disabled={!canCompare}
        className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-900 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gold-600 dark:text-primary-950 dark:hover:bg-gold-500"
      >
        {status === "comparing" ? "Comparing…" : "Compare statements"}
      </button>

      {status === "error" && errorMessage && (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          {errorMessage}
        </p>
      )}

      {status === "ready" && result && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-lg bg-stone-50 p-4 dark:bg-primary-900/20">
            <ResultRow
              label="New transactions found"
              value={String(result.totalAdded)}
              status={result.totalAdded > 0 ? "favorable" : "neutral"}
              emphasis
            />
            <ResultRow label="Matched folios" value={String(result.matchedFolios.length)} />
            <ResultRow label="Unchanged folios" value={String(unchangedFolioCount)} />
            {result.totalRemoved > 0 && (
              <ResultRow
                label="Transactions in the older statement not found in the newer one"
                value={String(result.totalRemoved)}
                status="warning"
              />
            )}
            {(result.foliosOnlyInA.length > 0 || result.foliosOnlyInB.length > 0) && (
              <ResultRow
                label="Folios present in only one statement"
                value={String(result.foliosOnlyInA.length + result.foliosOnlyInB.length)}
                status="warning"
              />
            )}
          </div>

          {foliosWithChanges.length === 0 ? (
            <p className="text-sm text-stone-600 dark:text-primary-200/70">
              No new or missing transactions in any folio that appears in both statements.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {foliosWithChanges.map((folio) => (
                <div
                  key={folio.folioNumber}
                  className="flex flex-col gap-2 rounded-lg border border-stone-200 p-4 dark:border-primary-900"
                >
                  <p className="text-sm font-semibold text-primary-900 dark:text-primary-50">
                    {folio.schemeName || "Unknown scheme"}{" "}
                    <span className="font-normal text-stone-500 dark:text-primary-300/60">
                      (Folio {folio.folioNumber})
                    </span>
                  </p>
                  {folio.added.map((transaction, index) => (
                    <ResultRow
                      key={`added-${index}`}
                      label={`${transaction.date} — ${transaction.description}`}
                      value={transactionValue(transaction.amount, transaction.units)}
                      status="favorable"
                    />
                  ))}
                  {folio.removed.map((transaction, index) => (
                    <ResultRow
                      key={`removed-${index}`}
                      label={`${transaction.date} — ${transaction.description} (no longer present)`}
                      value={transactionValue(transaction.amount, transaction.units)}
                      status="warning"
                    />
                  ))}
                  {(folio.closingBalanceA !== null || folio.closingBalanceB !== null) && (
                    <ResultRow
                      label="Unit balance (older → newer)"
                      value={`${
                        folio.closingBalanceA !== null
                          ? unitsFormatter.format(folio.closingBalanceA)
                          : "—"
                      } → ${
                        folio.closingBalanceB !== null
                          ? unitsFormatter.format(folio.closingBalanceB)
                          : "—"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {(result.foliosOnlyInA.length > 0 || result.foliosOnlyInB.length > 0) && (
            <div className="flex flex-col gap-1 rounded-lg bg-amber-50 p-4 text-sm dark:bg-amber-950/30">
              {result.foliosOnlyInA.map((folio) => (
                <p key={folio.folioNumber} className="text-amber-800 dark:text-amber-300">
                  Only in older statement: {folio.schemeName || "Unknown scheme"} (Folio{" "}
                  {folio.folioNumber})
                </p>
              ))}
              {result.foliosOnlyInB.map((folio) => (
                <p key={folio.folioNumber} className="text-amber-800 dark:text-amber-300">
                  Only in newer statement: {folio.schemeName || "Unknown scheme"} (Folio{" "}
                  {folio.folioNumber})
                </p>
              ))}
            </div>
          )}

          <DownloadResultsButton
            fileNameBase="cas-statement-diff-result"
            calculatorTitle="CAS statement diff"
            inputs={[
              { label: "Older statement file", value: fileA?.name ?? "—" },
              { label: "Newer statement file", value: fileB?.name ?? "—" },
            ]}
            results={buildExportRows(result)}
            disclaimer={PDF_DISCLAIMER}
            sources={[]}
          />
        </div>
      )}

      <p className="text-xs text-stone-500 dark:text-primary-300/60">
        Supports the standard CAMS/KFintech consolidated CAS text layout only — scanned/image-only
        PDFs and other statement formats aren&apos;t recognized yet, and will show an error rather
        than a guessed result. Column parsing (amount/units/NAV) is best-effort and for display
        only; treat this as a starting point for spotting what changed, not a substitute for
        reading the actual statements.
      </p>

      <HowCalculated>
        <p>
          Both PDFs are parsed entirely in your browser (via pdf.js) into a per-folio transaction
          list, matched between the two statements by folio number. Within a matched folio, a
          transaction counts as new if its date, description, and amount/unit figures as printed
          don&apos;t exactly match any line in the older statement — this is a text match, not a
          semantic one, so formatting differences between two exports of the same period could in
          rare cases show up as a false change.
        </p>
      </HowCalculated>
    </CalculatorShell>
  );
}
