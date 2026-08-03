# CLAUDE.md — NRI Calculator

Guardrails for any Claude Code session in this repo. Read this before making changes.

## What this is
A general financial-information site for NRIs on the US-India corridor.
Phase 1 covers four advisory categories — DTAA/tax residency, NRE/NRO
interest & TDS, investment/repatriation, and real estate capital gains —
each with prominent disclaimers, English only, no personalized advice.
Owner: Ajinkya's wife. Repo: `Gauribiz/nri-calculator`.

## Stack
Next.js (App Router, TypeScript, Tailwind CSS), server-rendered pages for
SEO — not a client SPA. No database yet: calculators are client-side logic
only. No deployment/domain connected yet.

## Operating rules (non-negotiable)
1. **Staging-only/guard-enforced pattern, once set up.** This pass wired up
   the same PreToolUse guard (`.claude/hooks/pretooluse-guard.sh` +
   `deny-patterns.json`, copied from `kathakar/orchestrator-state`) used by
   Family Ledger and Kids Learning App, but there is no staging/production
   split yet for this repo specifically (no deployment exists). Treat a
   guard block as a stop signal, not something to route around.
2. **PR, never merge.** Same review flow as Family Ledger and Kids Learning
   App — branch, commit, push, open a PR against `main`. Ajinkya reviews
   and merges himself; an unattended session never merges its own PR.
3. **Disclaimer on every advisory/calculator page, not just a footer link.**
   This is a locked, non-negotiable requirement from the project charter,
   same weight as the guardrails in the sibling repos' CLAUDE.md files —
   every category page renders the full `Disclaimer` component near the
   top of the page, in addition to the footer link to `/disclaimer`.
4. **Never add unrequested features.** Build exactly what's asked. All four
   category pages are placeholders by design until real calculator logic
   is scoped and requested.

## Known open items
- Real calculator logic for all four categories — currently placeholder
  pages with no actual DTAA/TDS/repatriation/capital-gains logic.
- Domain not yet purchased or connected.
- AdSense not yet applied for — sequencing is real content first, then
  AdSense.
- No database — everything is client-side for now.

## Already completed
Next.js (App Router) scaffold with TypeScript/ESLint/Tailwind, four
category route segments (`dtaa-tax-residency`, `nre-nro-tds`,
`investments-repatriation`, `real-estate-capital-gains`) with placeholder
content, shared `Disclaimer` component (`src/components/Disclaimer.tsx`),
base layout with nav/footer (`src/app/layout.tsx`) and SEO metadata, and
the PreToolUse guard wired up in `.claude/`.
