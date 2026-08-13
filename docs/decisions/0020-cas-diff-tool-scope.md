# ADR 0020: CAS statement diff tool — parsing scope, diff strategy, and dependency choice

## Status
Accepted, 2026-08-13.

## Context
`nric-013` asked to port Family Ledger's CAS (Consolidated Account
Statement) monthly diff feature as a stateless tool: user uploads two
CAS PDFs, tool parses and diffs them client-side, shows what changed —
no server-side storage of either statement. The task's own description
flagged it as the largest single build in its batch and said to split
into sub-tasks if needed.

CAS statements are the combined mutual-fund holdings statement CAMS and
KFintech issue on behalf of Indian AMCs — commonly password-protected,
and their exact text layout varies by registrar (CAMS vs. KFintech vs.
NSDL/CDSL demat-style statements) in ways this codebase has no access
to real samples of to verify against. That's the central risk this ADR
is about: a diff tool on a financial-advisory site that *looks* precise
but silently mis-parses a column is worse than one that visibly fails.

## Decision — scope: text-based CAMS/KFintech layout only, not exhaustive RTA coverage
Rather than splitting into sub-tasks (the task's own suggested escape
hatch), this pass ships one complete, working version scoped narrowly:
the standard CAMS/KFintech consolidated CAS text layout, which covers
the most common combined statement NRIs holding mutual funds across
multiple AMCs receive. NSDL/CDSL demat-style CAS and scanned/image-only
PDFs (no text layer to extract) are not recognized.

**This is a scope decision, not a bug**: if a PDF doesn't contain any
recognizable `Folio No` markers, `parseCasText` returns zero folios, and
the tool surfaces "Couldn't find any recognizable transactions in one or
both PDFs" rather than guessing a structure onto text it doesn't
recognize. A financial diff tool has to fail loud on unrecognized input,
not produce a confident-looking wrong answer.

## Decision — diff by normalized raw line text, not by re-parsed fields
`casStatement.ts`'s column parser (splitting a transaction line into
date / description / amount / units / NAV / unit balance) is
best-effort and used for *display* only. The actual diff
(`casDiff.ts`) matches transactions between the two statements by their
full normalized line text (`CasTransaction.raw`), not by the parsed
fields.

This is the load-bearing design decision for reliability: even if the
column-count heuristic misjudges which trailing numeric token is
"amount" vs. "NAV" for some registrar's layout this pass didn't test
against, the diff's core answer — *is this exact line new since the
older statement* — stays correct, because it's a plain text-set
difference, not a semantic comparison. Getting "what changed" right
matters more here than getting every column label right; this ordering
of priorities is deliberate.

## Decision — dependency: `pdfjs-dist`, pinned to 4.10.38 (not latest 6.x)
No existing PDF-*parsing* library in this repo (`jsPDF` and `xlsx` are
both write-only, generating files this site produces itself — see ADR
0017/CLAUDE.md). `pdfjs-dist` (Mozilla's PDF.js) is the standard
browser-side PDF text-extraction library; added as a new dependency,
confirmed via a before/after `npm audit` diff to introduce no new
advisories (same 5 pre-existing ones: `nanoid`, `next`, `postcss`,
`sharp`, `xlsx`).

**Pinned to `4.10.38`, the latest 4.x release, instead of the latest
published `6.2.108`.** While testing the password-protected-PDF path
against this environment's headless Chromium, 6.x's decryption code
threw `UnknownErrorException: ...getOrInsertComputed is not a function`
— `Map.prototype.getOrInsertComputed` is a JS engine method new enough
that it isn't universally available yet (a companion warning,
`Math.sumPrecise is not a function`, showed up even on the successful
unencrypted-PDF path, though that one didn't break extraction). 4.10.38
doesn't reference either method (confirmed via `grep` across its bundled
`pdf.mjs`) and was verified working for the encrypted-PDF path end to
end. Re-check this compatibility gap in the target browser environment
before ever bumping this dependency past the 4.x line.

## Decision — password handling
CAS PDFs are commonly password-protected (typically PAN- or DOB-derived
by the issuing RTA). The tool asks for an optional password per file
(plain `<input type="password">`, not persisted anywhere) and passes it
directly to `pdfjs-dist`'s `getDocument({ data, password })`, which
throws a typed `PasswordException` (code `NEED_PASSWORD` or
`INCORRECT_PASSWORD`) that `casPdfExtract.ts` maps to specific,
attributable error messages ("Older statement: this PDF needs a
password" vs. "...that password didn't work"), rather than one generic
failure — the user needs to know *which* of the two files needs
attention. All extraction happens in the browser; neither the file nor
the password is ever sent anywhere.

## Decision — no `SourceCitation`
Every other calculator on this site cites an external authoritative
source (IRS/RBI/ECB/etc.) via the shared `SourceCitation` component,
since they assert externally-sourced figures. The CAS diff tool doesn't
fit that pattern — it processes the user's own uploaded document, not a
published rate or threshold — so `SourceCitation` is omitted rather than
citing something that isn't genuinely the claim's source. `HowCalculated`
is still included, explaining the text-match diff methodology.

## Consequences
- New 7th tool in `/tools`, registered in `src/lib/tools.ts` (auto-wires
  into site search and the `OpenTargetDetails` deep-link handling per
  the existing `nric-008`/`nric-014` pattern).
- New files: `src/lib/calculators/casStatement.ts` (pure parser),
  `src/lib/calculators/casDiff.ts` (pure diff), `src/lib/calculators/
  casPdfExtract.ts` (client-only pdfjs wrapper), `src/components/
  calculators/CasDiffTool.tsx`.
- New dependency: `pdfjs-dist@4.10.38`.
- **Needs Ajinkya's own verification pass before being treated as
  reliable for real-world use**: this pass had no real CAS files to test
  against (privacy — CAS statements contain full portfolio holdings) and
  built synthetic CAMS-shaped fixtures instead (two-folio statement with
  new transactions added, a third folio only in the "newer" file, plus a
  password-protected variant). Verified end to end via a headless
  Playwright smoke test against the production build: successful diff,
  the unrecognized-format error path, and all three password states
  (missing / wrong / correct) — but not against an actual CAMS or
  KFintech PDF, whose exact spacing/column conventions may differ from
  what this pass assumed. Recommend testing with 1-2 real (the user's
  own) CAS PDFs before linking this tool anywhere prominent.
- If a second RTA format (NSDL/CDSL demat CAS) is ever requested,
  extend `casStatement.ts`'s block-detection heuristic rather than
  guessing at the CAMS/KFintech format's edge cases further — the two
  layouts are different enough that guessing risks exactly the
  silent-wrong-answer failure mode this ADR's scope decision exists to
  avoid.
