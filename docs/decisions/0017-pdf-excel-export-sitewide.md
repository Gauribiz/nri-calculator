# ADR 0017: Extend PDF export to Excel, and to every numeric calculator sitewide

## Status
Accepted, 2026-08-11.

## Context
`nric-010` asked to extend the existing PDF-export pattern (`DownloadPdfButton`
+ jsPDF, live only on the three DTAA/tax-residency calculators since
`nric-001e`) to add an Excel option, and to reach the `/tools` hub
(`nric-008`) plus the other three category pages' calculators — "scope to
whichever calculators are highest-traffic first if doing all of them in one
pass is too large; note the split in the PR if so."

## Decision

**Did not split the batch.** The pattern turned out mechanical enough (each
calculator already computes a small `inputs`/`results` field list; the DTAA
calculators' existing usage was the template) to cover every numeric
calculator on the site in one pass:

- Upgraded the three already-PDF-only DTAA calculators
  (`SubstantialPresenceCalculator`, `IndiaResidencyCalculator`,
  `DtaaReliefEstimator`) to also offer Excel.
- Added PDF+Excel to the four other category-page calculators with a
  numeric result: `NroInterestTdsCalculator`, `RepatriationLimitCalculator`,
  `RealEstateCapitalGainsCalculator`, `NriPropertySaleTdsCalculator`.
- Added PDF+Excel to all five `/tools` hub calculators:
  `CurrencyImpactCalculator`, `SipXirrCalculator`, `FdRdMaturityCalculator`,
  `LoanPrepaymentCalculator`, `TaxTreatmentComparisonTool`.

**Deliberately excluded** (no numeric single-result set to export, unlike
the calculators above): `NreNroChooser` (a yes/no decision tree),
`Form15caChecker` and `PficFilingChecker` (checklists), `Form13Explainer`
(a comparison against tool 2's own already-exportable output, per ADR 0010).
Adding an export button to these would mean inventing content that isn't
really "a result."

**`TaxTreatmentComparisonTool` is a reference table, not a single
computation** — its export flattens each currently-selected instrument's
four fields (income tax, capital gains, TDS, repatriation) into the
results list, prefixed with the instrument name, so the file mirrors what's
on screen rather than trying to force it into a single-row format.

**Component rename**: `DownloadPdfButton` → `DownloadResultsButton`,
`fileName` (with extension) → `fileNameBase` (without), since the file
extension is now the format the user picked, not the button's own name.
Renders two buttons ("Download as PDF" / "Download as Excel") rather than
a menu, matching the site's existing minimal-chrome style.

**Excel library: `xlsx` (SheetJS, v0.18.5), not `exceljs`.** Both were
evaluated. `xlsx` has two known high-severity CVEs
(GHSA-4r6h-8v6p-xvw6 prototype pollution, GHSA-5pgg-2g8v-p4x9 ReDoS), with
no fix available on the npm-registry release line. Both are triggered only
by *parsing* an attacker-supplied spreadsheet via `XLSX.read`/`XLSX.readFile`
— this codebase only ever calls the write path
(`XLSX.utils.aoa_to_sheet`/`book_new`/`writeFile`) to turn its own
already-computed numbers into a download, so neither CVE's trigger is
reachable through any code this site ships. `exceljs` avoided those two
CVEs but pulled in 96 packages including several long-deprecated
transitive dependencies (`rimraf@2`, `inflight`, `glob@7`, `uuid@8`) and
introduced its own moderate CVE (GHSA-w5hq-g745-h8pq, also a parse-path
issue). Given neither library's flagged CVEs apply to this write-only use
case, `xlsx` was chosen for the much smaller, actively-maintained-upstream
dependency footprint. **If a future task ever adds a "parse an uploaded
spreadsheet" feature, re-evaluate this choice from scratch** rather than
assuming the write-only reasoning still holds — see the inline comment on
`handleDownloadExcel` in `DownloadResultsButton.tsx`.

**Excel file format**: a single-sheet workbook per download — title row,
generation timestamp, "Your inputs" section, "Result" section, "Disclaimer"
paragraph (same `PDF_DISCLAIMER` text as the PDF), and a "Sources" section
when present — mirroring the PDF's own section order so the two formats
read the same way.

## Consequences
- New dependency: `xlsx@0.18.5` (see CVE discussion above — flagged for
  Ajinkya's awareness, not blocking, given the write-only usage).
- `DownloadPdfButton.tsx` renamed to `DownloadResultsButton.tsx`; all three
  prior call sites updated (prop rename `fileName` → `fileNameBase`, no
  other behavior change to the PDF path).
- 9 additional calculator components now import `DownloadResultsButton`.
- No changes to any calculation logic, any `src/lib/calculators/*` file, or
  any page's Disclaimer placement.
- Verified with `npx tsc --noEmit` (clean), `npm run lint` (clean),
  `npm run build` (all 84 routes prerender statically, unchanged route
  count), and a headless Playwright smoke test against the built
  production server across `/dtaa-tax-residency`, `/nre-nro-tds`,
  `/investments-repatriation`, `/real-estate-capital-gains`, and `/tools`:
  confirmed the Disclaimer text still appears before any "Download as PDF"
  button on every page, confirmed the expected PDF+Excel button count on
  each page, and exercised real PDF and Excel downloads on three
  representative calculators — the `.xlsx` files were confirmed to be
  well-formed Office Open XML (valid zip, `xl/worksheets/sheet1.xml`
  parses with the expected title/section rows).
- This closes out CLAUDE.md's "PDF export... not yet extended to the
  /tools hub or the other three category pages" open item; CLAUDE.md
  updated in this same PR.
- No fact/figure content changed — nothing new in this PR needs a tax
  fact-verification pass (unlike most other tasks on this site, this one
  is pure UI/export plumbing over numbers the calculators already compute
  and already show on screen).
