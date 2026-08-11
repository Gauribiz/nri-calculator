"use client";

import { useState } from "react";

export type ResultField = {
  label: string;
  value: string;
};

export type ResultSource = {
  label: string;
  href: string;
};

export type DownloadResultsButtonProps = {
  fileNameBase: string;
  calculatorTitle: string;
  inputs: ResultField[];
  results: ResultField[];
  disclaimer: string;
  sources: ResultSource[];
};

const PAGE_MARGIN = 14;
const LINE_HEIGHT = 6;
const CONTENT_WIDTH = 210 - PAGE_MARGIN * 2;

type DownloadStatus = "idle" | "generating-pdf" | "generating-excel" | "error";

export function DownloadResultsButton({
  fileNameBase,
  calculatorTitle,
  inputs,
  results,
  disclaimer,
  sources,
}: DownloadResultsButtonProps) {
  const [status, setStatus] = useState<DownloadStatus>("idle");

  async function handleDownloadPdf() {
    setStatus("generating-pdf");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      let y = PAGE_MARGIN;

      const advance = (lines: number) => {
        y += LINE_HEIGHT * lines;
      };

      doc.setFontSize(15);
      doc.setFont("helvetica", "bold");
      doc.text(calculatorTitle, PAGE_MARGIN, y);
      advance(1);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(110, 110, 110);
      doc.text(
        `NRILedger.com — generated ${new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })}`,
        PAGE_MARGIN,
        y
      );
      advance(2);

      const writeSection = (heading: string, fields: ResultField[]) => {
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(20, 20, 20);
        doc.text(heading, PAGE_MARGIN, y);
        advance(1.4);

        doc.setFontSize(10);
        for (const field of fields) {
          doc.setFont("helvetica", "normal");
          doc.setTextColor(90, 90, 90);
          doc.text(field.label, PAGE_MARGIN, y);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(20, 20, 20);
          doc.text(field.value, PAGE_MARGIN + 5, y + LINE_HEIGHT, {
            maxWidth: CONTENT_WIDTH - 5,
          });
          advance(2);
        }
        advance(0.6);
      };

      writeSection("Your inputs", inputs);
      writeSection("Result", results);

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(20, 20, 20);
      doc.text("Disclaimer", PAGE_MARGIN, y);
      advance(1.4);

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(90, 90, 90);
      const disclaimerLines = doc.splitTextToSize(disclaimer, CONTENT_WIDTH);
      doc.text(disclaimerLines, PAGE_MARGIN, y);
      advance(disclaimerLines.length + 1);

      if (sources.length > 0) {
        doc.setFontSize(9);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(110, 110, 110);
        const sourceLine = `Sources: ${sources
          .map((source) => `${source.label} (${source.href})`)
          .join(", ")}`;
        const sourceLines = doc.splitTextToSize(sourceLine, CONTENT_WIDTH);
        doc.text(sourceLines, PAGE_MARGIN, y);
      }

      doc.save(`${fileNameBase}.pdf`);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  async function handleDownloadExcel() {
    setStatus("generating-excel");
    try {
      // Write-only usage: this project never parses an uploaded/external
      // .xlsx with this library, so the SheetJS CVEs that require a
      // malicious *input* file (prototype pollution / ReDoS in XLSX.read)
      // aren't reachable through this code path. Re-evaluate if a
      // "parse a spreadsheet" feature is ever added — see ADR 0015.
      const XLSX = await import("xlsx");

      const rows: (string | number)[][] = [
        [calculatorTitle],
        [
          `NRILedger.com — generated ${new Date().toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}`,
        ],
        [],
        ["Your inputs"],
        ...inputs.map((field) => [field.label, field.value]),
        [],
        ["Result"],
        ...results.map((field) => [field.label, field.value]),
        [],
        ["Disclaimer"],
        [disclaimer],
      ];

      if (sources.length > 0) {
        rows.push(
          [],
          ["Sources"],
          ...sources.map((source) => [source.label, source.href])
        );
      }

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      worksheet["!cols"] = [{ wch: 48 }, { wch: 48 }];
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Result");
      XLSX.writeFile(workbook, `${fileNameBase}.xlsx`);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  const busy = status === "generating-pdf" || status === "generating-excel";

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-primary-800 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-100 dark:hover:bg-primary-900/40"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-current"
          >
            <path d="M10 2a.75.75 0 0 1 .75.75v8.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V2.75A.75.75 0 0 1 10 2ZM4 14.75a.75.75 0 0 1 .75.75v.5A.75.75 0 0 0 5.5 16.75h9a.75.75 0 0 0 .75-.75v-.5a.75.75 0 0 1 1.5 0v.5A2.25 2.25 0 0 1 14.5 18.25h-9A2.25 2.25 0 0 1 3.25 16v-.5a.75.75 0 0 1 .75-.75Z" />
          </svg>
          {status === "generating-pdf" ? "Preparing PDF…" : "Download as PDF"}
        </button>
        <button
          type="button"
          onClick={handleDownloadExcel}
          disabled={busy}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-primary-800 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-100 dark:hover:bg-primary-900/40"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-current"
          >
            <path d="M10 2a.75.75 0 0 1 .75.75v8.19l2.72-2.72a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06l2.72 2.72V2.75A.75.75 0 0 1 10 2ZM4 14.75a.75.75 0 0 1 .75.75v.5A.75.75 0 0 0 5.5 16.75h9a.75.75 0 0 0 .75-.75v-.5a.75.75 0 0 1 1.5 0v.5A2.25 2.25 0 0 1 14.5 18.25h-9A2.25 2.25 0 0 1 3.25 16v-.5a.75.75 0 0 1 .75-.75Z" />
          </svg>
          {status === "generating-excel"
            ? "Preparing Excel…"
            : "Download as Excel"}
        </button>
      </div>
      {status === "error" && (
        <span className="text-xs text-amber-700 dark:text-amber-400">
          Couldn&apos;t generate the file — please try again.
        </span>
      )}
    </div>
  );
}
