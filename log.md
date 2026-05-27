# Cyber Practice Wiki — Activity Log

Append-only. Every ingest, query, lint, and sweep gets an entry. Newest at the bottom.

## [2026-05-22] init | CVS account wiki bootstrap (deprecated)

- Initial bootstrap framed around the CVS Health account. Superseded by the Cyber Practice reframe on 2026-05-24. Pages preserved in git history.

## [2026-05-24] reframe | Pivot from single-account to PwC Cyber Practice intelligence

- Pages rewritten: overview.md, synthesis/unresolved-contradictions.md, index.md
- Pages created: 5 opportunity pages, 3 intelligence pages
- Pages deleted: 3 CVS opportunity pages, 1 CVS intelligence page
- Key framing change: wiki tracks PwC's cyber practice (pipeline, competitive posture, market signals), not a single account.

## [2026-05-24] IA realignment | Replace editorial pages with Operations Center

- Boss feedback: prior Home (tile grid) + Editorial Briefing (long-read) read as drill-downs, not as the live operating surface the account team actually wants. A Stitch design was supplied that captures the intended terminal-style dashboard.
- Pages removed: HomePage.tsx (Command Center tile grid), OverviewPage.tsx (Editorial Briefing long-read).
- Page added: OperationsPage.tsx — 3-column ops dashboard with KPI ribbon, live account stream, intelligence dossiers, initiatives matrix, relationship health map, sentiment scores, citations & evidence, ops status bar.
- Routes: / is now the Operations Center. /briefing route retired. /concierge unchanged. Placeholder routes preserved for contacts/priorities/opportunities/citations.
- AGENTS.md §10j updated (Editorial Briefing → Operations Center); §11 IA section rewritten; schema bumped to v1.2.
- Content updates: kept real public-source anchors (DORA, SEC Item 1.05, banking petition); CVS exec names use real current leadership (Joyner CEO, Cowhey CFO, Mandadi EVP Tech, Shah GP Pharmacy).

## [2026-05-24] source-anchor | Rewrite content against real public reporting

- Trigger: user audit caught fabricated specifics (McKinsey + HashiCorp alliance, invented CrowdStrike displacement stat, wrong DORA enforcement date).
- Web search pass on five topics: CrowdStrike earnings, Palo Alto platformization, DORA enforcement, SEC disclosure enforcement, Big Four cyber competitive posture.
- Corrections applied:
  - DORA enforcement date corrected (Jan 17, 2025, not Jan 2026)
  - Removed fabricated "McKinsey + HashiCorp alliance" claim (HashiCorp is IBM-owned; no such alliance)
  - Removed fabricated "41% of clients displaced CrowdStrike" stat (reality: CrowdStrike is partnering with Microsoft on identity)
  - Removed fabricated "6 of 8 clients reject platformization" stat (reality: platformization is winning by PANW's public metrics)
- Pages rewritten: overview.md, synthesis/unresolved-contradictions.md, index.md, app/src/data/wiki.ts
- Pages created: intelligence/2025-05-22-banking-petition-sec-rescind, intelligence/2025-11-15-dora-ctpp-designations
- Pages deleted: intelligence/2026-05-14-crowdstrike-q1, intelligence/2026-04-09-palo-alto-investor-day, intelligence/2026-02-28-mckinsey-hashicorp (all contained fabricated quotes)
- New contradictions filed:
  1. SEC Item 1.05 future — SEC enforcement posture vs banking trade association rescission petition (May 22, 2025)
  2. Vendor AI security claims vs Mandiant/ENISA methodology-gap reporting
- Disclaimer language in footer + dateline strap updated: "vendor and regulatory context from public sources; client identities and PwC internal data are illustrative"
- All metrics flagged as "illustrative" in UI labels for honesty.
