cat > CLAUDE.md << 'EOF'
# CLAUDE.md — NRI Calculator
Guardrails for any Claude Code session in this repo. Read this before making changes.
## What this is
A general financial-information site for NRIs on the US-India corridor.
Phase 1 covers four advisory categories — DTAA/tax residency, NRE/NRO
interest & TDS, investment/repatriation, and real estate capital gains —
each with prominent disclaimers, English only, no personalized advice.
Owner: Ajinkya's wife. Repo: `Gauribiz/nri-calculator`. Live at nriledger.com.
## Stack
Next.js (App Router, TypeScript, Tailwind CSS), server-rendered pages for
SEO — not a client SPA. No database: calculators are client-side logic
only, deliberately stateless. Deployed on Vercel, domain via Cloudflare Registrar.
## Operating rules (non-negotiable)
1. **Staging-only/guard-enforced pattern.** PreToolUse guard
   (`.claude/hooks/pretooluse-guard.sh` + `deny-patterns.json`) is wired up.
   No staging/production split exists for this repo (site is stateless,
   no DB to protect) — the guard's production-DB-write patterns are a
   standing no-op here, not a gap. Treat a guard block as a stop signal.
2. **PR, never merge.** Branch, commit, push, open a PR against `main`.
   Ajinkya's wife reviews and merges; an unattended session never merges
   its own PR.
3. **Disclaimer on every advisory/calculator page, not just a footer link.**
   Locked, non-negotiable. Every category page renders the full
   `Disclaimer` component near the top, in addition to the footer link.
4. **Never add unrequested features.** Build exactly what's asked.
## Known open items
- **No live exchange-rate/FX data source anywhere in the codebase.**
  `CurrencyImpactCalculator.tsx`'s "Current exchange rate" field is
  manually entered by the user, not fetched. A multi-currency overlay
  task (add a 3rd currency to existing INR/USD results) is paused
  pending a decision on where live rates would come from — don't assume
  one exists when scoping related work.
- PDF and Excel export (via `DownloadResultsButton`, jsPDF + xlsx/SheetJS,
  both dynamically imported) now cover every numeric calculator sitewide,
  not just the three DTAA/tax-residency calculators -- see ADR 0017. The
  `xlsx` dependency carries two known high-severity CVEs with no fix
  available (prototype pollution / ReDoS), both only reachable via
  *parsing* an untrusted spreadsheet; this codebase only ever writes
  spreadsheets it generates itself, so neither is currently exploitable
  here, but re-evaluate this choice before ever adding a "parse an
  uploaded spreadsheet" feature.
- No database — fully client-side/stateless by design; adding one is a
  real product decision, not something to infer from any single task.
- AdSense not yet applied for.
- Blog/FAQ content is at 15 articles / 15 FAQs per cluster (60 total),
  short of the original 25-30/cluster target.
- Most published tax figures were cross-checked via live web search
  against secondary sources, not fetched directly from irs.gov /
  incometax.gov.in / rbi.org.in (those direct fetches have consistently
  returned HTTP 403). Several batches are explicitly flagged as still
  needing a human fact-verification pass — check each ADR's own
  "needs verification" notes before treating a figure as final.
## Already completed
Next.js scaffold; four category pages (DTAA/tax residency, NRE/NRO-TDS,
investments-repatriation, real-estate-capital-gains) each with 2-3 real
calculators; a fifth `/tools` hub with 5 general-purpose calculators
(Currency Impact, SIP/XIRR, FD/RD Maturity, Loan Prepayment, Tax
Treatment Comparison); a shared design system (navy/indigo + single gold
accent, `ResultRow` status-badge pattern, tabular-nums, `HowCalculated`/
`SourceCitation`/`VerifiedStamp` components); PDF and Excel export on
every numeric calculator sitewide; site-wide search, FAQ accordion,
back-to-top; domain purchased, DNS connected, live in production.
EOF
