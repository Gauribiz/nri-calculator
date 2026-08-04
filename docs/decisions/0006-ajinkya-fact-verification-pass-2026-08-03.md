# ADR 0006: Ajinkya's live fact-verification pass (2026-08-03)

## Status
Accepted

## Context
ADR 0002 (nric-001) and ADR 0003 (nric-001b) both flagged that the calculators' coded thresholds -- US Substantial Presence Test day-weighting, India's 182/60/365-day and 9-of-10-years/729-day residency tests, RNOR classification, DTAA Article 25's credit-cap mechanic, and the Finance Act 2020 Rs 15 lakh / 120-day relaxed-threshold rule -- were asserted from general knowledge during those builds, not fetched from a live primary source in that same run, and needed Ajinkya's own check before being treated as publish-ready. ADR 0005 (nric-001d) repeated that same flag, since nothing in the repo showed the check had happened.

It had, in fact, already happened -- on 2026-08-03, in a separate Cowork session with Ajinkya, before nric-001d was built -- but it was never written back into this repo, so every subsequent run (correctly, from its own vantage point) kept flagging the page as unverified. This ADR closes that gap by recording what was actually checked, by whom, against what, and what it does and does not establish.

## What was done
At Ajinkya's request, after PR #2 (nric-001) was opened, every numeric threshold coded into the three calculators was cross-checked against primary and authoritative secondary sources, using this methodology:

1. Fetched the exact calculator source (substantialPresenceTest.ts, indiaResidency.ts, dtaaRelief.ts) via raw.githubusercontent.com to read the literal coded constants, not a diff view.
2. 2. Read the relevant ADRs first (0002) to see what edge cases the build had already disclosed as unmodeled, avoiding redundant re-verification of known, disclosed gaps.
   3. 3. Cross-referenced the US Substantial Presence Test figures (183-day threshold, 3-year lookback weighting of 1 / 1-3 / 1-6, 31-day minimum-current-year floor, exempt-individual categories) directly against irs.gov.
      4. 4. Cross-referenced the India residency figures (60-day and 182-day basic tests, the citizen/PIO-visiting relaxation, the 9-of-10-years and 729-day RNOR tests, and the FA2020 Rs 15 lakh / 120-day amendment specifically) against multiple India tax-advisory sources via web search, since no single canonical incometax.gov.in page covers the residency-test details end to end.
         5. 5. Compared numbers to numbers -- confirmed each coded constant matched its source -- rather than re-deriving the underlying tax logic from scratch.
           
            6. ## Findings
            7. Every threshold checked matched the primary/authoritative sources, with no discrepancies. The one real, non-error gap found was the FA2020 Rs 15 lakh / 120-day nuance not being surfaced anywhere in the India residency calculator's UI -- not a bug in the coded logic, but a disclosure gap. That finding became nric-001b (PR #3, merged), which added the conditional income-threshold callout.
           
            8. ## What this does not establish
            9. This was Ajinkya's own review, conducted directly with Claude in a Cowork session, cross-referencing irs.gov and India tax-advisory sources. It is not a professional tax or legal review, and it does not certify the site as complete or exhaustive for every taxpayer situation -- both calculators still explicitly disclose unmodeled edge cases (see ADR 0002 section on scope). The site's disclaimer stays in its current position and wording per CLAUDE.md rule 3; nothing here changes that.
           
            10. ## Consequence for future runs
            11. Do not re-flag the SPT, India residency/RNOR, FA2020 threshold, or DTAA credit-cap figures as unverified going forward -- this ADR is the record of that check. If those specific figures are ever changed in the source code, that specific change needs its own fresh verification; this ADR only covers what was true in the code as of PR #2/#3 (2026-08-03). The VerifiedStamp component built in nric-001c (PR #4) was deliberately left unwired pending a documented verification pass -- it can now be wired to cite this ADR, since an honest, specific verification record exists. That wiring is not done in this ADR; it's a candidate follow-up task (see nric-001e or a new task) if Ajinkya wants the UI to surface it.
            12. 
