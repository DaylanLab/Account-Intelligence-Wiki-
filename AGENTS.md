# CVS Account Wiki — AGENTS.md

This file is the operating schema for the CVS Account Intelligence Wiki. It defines the directory structure, page conventions, ingestion workflows, query behavior, and maintenance rules. Read this file in full at the start of every session before taking any action on the wiki.

## 1. Overview

This wiki is a persistent, compounding knowledge base about the CVS account. It is maintained entirely by you (the LLM). You write and update all pages. The human's job is to supply source material, ask questions, and direct focus.

The wiki sits between raw sources and the human. When new sources arrive, you do not just index them — you integrate them: updating entity pages, revising summaries, flagging contradictions, and strengthening the synthesis. Knowledge is compiled once and kept current, not re-derived on every query.

Golden rule: The wiki should always reflect the most current, synthesized understanding of CVS. If a new source contradicts an existing page, update the page and note the contradiction — do not silently overwrite.

## 2. Directory Structure

cvs-wiki/

├── AGENTS.md                  ← this file (do not modify without instruction)

├── index.md                   ← master catalog of all wiki pages

├── log.md                     ← append-only activity log

│

├── raw/                       ← immutable source documents (never modify)

│   ├── transcripts/           ← call and meeting transcripts

│   ├── notes/                 ← internal meeting notes, email summaries

│   ├── news/                  ← external news, press releases, earnings

│   ├── decks/                 ← client-shared or internal decks

│   └── assets/                ← images, attachments

│

├── wiki/

│   ├── overview.md            ← top-level CVS account summary (always keep current)

│   ├── contacts/              ← one page per key CVS stakeholder

│   ├── orgs/                  ← org structure pages by function/division

│   ├── priorities/            ← CVS strategic and operational priorities

│   ├── opportunities/         ← PwC service opportunities, mapped and tracked

│   ├── engagements/           ← active and historical PwC engagements at CVS

│   ├── intelligence/          ← external signals: news, earnings, market moves

│   └── synthesis/             ← cross-cutting analyses and comparison pages

## 3. Page Formats

Every wiki page must include a YAML frontmatter block followed by content.

### 3a. Contact Page (wiki/contacts/&lt;lastname-firstname&gt;.md)

---

type: contact

name: [Full Name]

title: [Current Title]

division: [CVS Division or Business Unit]

reports_to: [Manager's name if known]

influence_level: high | medium | low

relationship_status: strong | developing | cold | unknown

last_verified: [YYYY-MM-DD]

source_count: [number of sources this page draws from]

tags: [e.g. economic-buyer, technical-buyer, champion, blocker]

---

Sections to include:

Background — role, tenure, scope of responsibility

Priorities — what this person is focused on, as evidenced by sources

Relationship Notes — history with PwC team, tone in meetings, preferences

Key Quotes — notable things they've said (cite source inline)

Open Questions — things we don't know but should find out

Cross-references — links to relevant org, priority, and opportunity pages

### 3b. Org Page (wiki/orgs/&lt;division-or-function&gt;.md)

---

type: org

name: [Division or Function Name]

parent_division: [Parent if applicable]

head: [Name and title of leader]

headcount_estimate: [if known]

budget_owner: [Name if known]

pwc_engagement_history: yes | no | unknown

last_verified: [YYYY-MM-DD]

source_count: [number]

tags: [e.g. technology, finance, operations, pharmacy, health-services]

---

Sections:

Overview — what this org does, strategic role within CVS

Key Contacts — links to contact pages for people in this org

Known Priorities — what this org is working on

PwC Touchpoints — any current or past engagement here

Opportunity Signals — any signals that PwC could help

Open Questions

### 3c. Priority Page (wiki/priorities/&lt;slug&gt;.md)

---

type: priority

name: [Priority Name]

owner: [CVS contact who owns this]

division: [Which part of CVS]

horizon: short-term | medium-term | long-term

confidence: confirmed | inferred | speculative

first_seen: [YYYY-MM-DD]

last_updated: [YYYY-MM-DD]

source_count: [number]

tags: [e.g. cost-reduction, digital-transformation, regulatory, M&amp;A, workforce]

---

Sections:

Summary — what the priority is and why it matters to CVS

Evidence — what sources indicate this is a real priority (cite inline)

PwC Relevance — how our service offerings map to this (link to opportunities)

Contradictions / Uncertainty — anything that complicates the picture

Open Questions

### 3d. Opportunity Page (wiki/opportunities/&lt;slug&gt;.md)

---

type: opportunity

name: [Opportunity Name]

service_line: [e.g. Tax, Deals, Consulting, Assurance, Risk]

sub-offering: [e.g. Cloud Transformation, Workforce Strategy, Internal Audit]

stage: identified | qualified | developing | active | closed-won | closed-lost

estimated_value: [$ range if known, else unknown]

primary_contact: [CVS stakeholder link]

pwc_owner: [Internal PwC lead if known]

linked_priority: [link to priority page]

first_identified: [YYYY-MM-DD]

last_updated: [YYYY-MM-DD]

source_count: [number]

tags: [relevant tags]

---

Sections:

Opportunity Summary — what we could do and for whom

Why Now — what's driving urgency or window of opportunity

CVS Evidence — signals from sources that validate this opportunity

Competitive Landscape — any known competitors or incumbent vendors

Next Steps / Ask — what action PwC should take

Risks / Blockers

Open Questions

### 3e. Intelligence Page (wiki/intelligence/&lt;YYYY-MM-DD-slug&gt;.md)

---

type: intelligence

date: [YYYY-MM-DD]

source_type: news | earnings | press-release | analyst-report | job-posting

source_url: [URL if applicable]

relevance: high | medium | low

tags: [e.g. M&amp;A, leadership-change, regulatory, earnings, cost-cutting]

---

Sections:

Summary — what happened / what was reported

Implications for PwC — what this means for our account strategy

Linked Pages — which contacts, orgs, priorities, or opportunities this touches

### 3f. Overview Page (wiki/overview.md)

This is the single most important page. It must always reflect the current state of the account. Update it on every ingest.

Sections:

Account Snapshot — CVS at a glance (size, divisions, current moment)

Relationship Status — overall PwC-CVS relationship health

Top 3 Priorities (CVS) — what CVS is most focused on right now

Top 3 Opportunities (PwC) — best-qualified opportunities at this moment

Key Contacts Map — who matters most and their relationship to PwC

Recent Developments — last 3–5 intelligence or ingest events

Risks to Watch — anything that could affect the account negatively

Last Updated — date and what triggered the update

## 4. Operations

### 4a. Ingest

Triggered when the human drops a new source into raw/ and says &quot;ingest.&quot;

Your ingest workflow:

Read the source fully

Identify all entities mentioned: people, orgs, priorities, initiatives

Discuss key takeaways with the human if anything is ambiguous

Write a summary page in wiki/intelligence/ if it's an external source

Create or update all relevant contact, org, priority, and opportunity pages

Update wiki/overview.md

Update index.md with any new pages created

Append an entry to log.md

Log entry format:

## [YYYY-MM-DD] ingest | [Source Title or Filename]

- Pages created: [list]

- Pages updated: [list]

- Key findings: [2–3 bullet summary]

- Contradictions flagged: [if any]

A single source will typically touch 5–15 wiki pages. That is expected. Do not batch updates — touch every page that is meaningfully affected.

### 4b. Query

Triggered when the human asks a question about CVS.

Your query workflow:

Read index.md to identify relevant pages

Read those pages in full

Synthesize an answer with inline citations (link to wiki pages, not raw sources)

If the answer reveals something worth preserving, offer to file it as a new synthesis page in wiki/synthesis/

Append a query entry to log.md

Log entry format:

## [YYYY-MM-DD] query | [Question summary]

- Pages consulted: [list]

- Answer filed as synthesis page: yes | no

### 4c. Opportunity Scan

Triggered when the human asks &quot;what are our best opportunities at CVS?&quot;

Your workflow:

Read all pages in wiki/priorities/

Read all pages in wiki/opportunities/

Read wiki/overview.md

Produce a ranked opportunity summary:

Rank by: strength of CVS signal × PwC service fit × relationship access

Flag which opportunities have no linked contact (risk)

Flag which priorities have no mapped opportunity (gap)

Offer to update opportunity pages with any new staging or next-step info

### 4d. Lint (Wiki Health Check)

Triggered when the human says &quot;lint the wiki&quot; or on a periodic basis.

Check for and report:

Pages with last_verified older than 60 days

Contact pages with relationship_status: unknown

Opportunities with no primary_contact linked

Priorities with confidence: speculative and no corroborating source

Orphan pages (no inbound links from other pages)

Contradictions between pages (flag with both sides)

Missing pages: entity mentioned in multiple pages but no dedicated page exists

overview.md sections that reference stale data

Output a lint report, then ask which issues to fix first.

### 4e. External Intelligence Sweep

Triggered when the human says &quot;sweep&quot; or on a biweekly schedule.

Your workflow:

Read wiki/contacts/ to get the list of key stakeholders

For each high-influence contact, search for:

Recent news mentions

LinkedIn activity (if human provides)

Industry conference appearances

CVS earnings call mentions

For CVS as a company, search for:

Recent press releases and earnings

Analyst reports

Job postings in relevant functions (signals investment areas)

M&amp;A activity

Create new wiki/intelligence/ pages for anything relevant

Update affected contact, priority, and opportunity pages

Produce a biweekly briefing in wiki/synthesis/biweekly-YYYY-MM-DD.md

## 5. Index and Log Conventions

### index.md structure

# CVS Wiki Index

Last updated: [YYYY-MM-DD]

## Contacts

- [[contacts/lastname-firstname]] — Title, Division (N sources)

## Orgs

- [[orgs/division-name]] — One-line description (N sources)

## Priorities

- [[priorities/slug]] — Priority name, horizon, confidence (N sources)

## Opportunities

- [[opportunities/slug]] — Opportunity name, stage, service line (N sources)

## Intelligence

- [[intelligence/YYYY-MM-DD-slug]] — One-line summary

## Synthesis

- [[synthesis/slug]] — One-line description

### log.md

Append-only. Never edit past entries. Every ingest, query, lint, and sweep gets an entry. This is the audit trail for the wiki's evolution.

## 6. Tagging Conventions

Use consistent tags across all page types:

Contact tags: economic-buyer, technical-buyer, champion, blocker, influencer, new-to-role, departing

Org tags: technology, finance, operations, pharmacy, health-services, corporate, retail, insurance

Priority tags: cost-reduction, digital-transformation, regulatory, M&amp;A, workforce, customer-experience, data-analytics, AI, supply-chain, sustainability

Opportunity tags: tax, deals, consulting, assurance, risk, cloud, workforce, finance-transformation, internal-audit, regulatory-compliance, technology-implementation

Intelligence tags: earnings, leadership-change, M&amp;A, regulatory, analyst-report, job-posting, press-release, news

## 7. Relationship to PwC Service Offerings

When mapping opportunities, use these PwC service lines as the vocabulary:

Assurance — financial statement audit, internal audit, SOX

Tax — corporate tax, transfer pricing, indirect tax, credits &amp; incentives

Deals — M&amp;A advisory, due diligence, valuation, integration

Consulting — technology, operations, people &amp; org, customer, finance

Technology: cloud, ERP, data &amp; analytics, AI, cyber

Operations: supply chain, procurement, cost reduction

People &amp; Org: workforce strategy, change management, HR transformation

Finance: CFO advisory, finance transformation, working capital

Risk — internal controls, compliance, regulatory, third-party risk

Every opportunity page must link to exactly one primary service line and one sub-offering. If the opportunity spans multiple, pick the lead and note the others in the body.

## 8. Behavioral Rules

Never modify raw/ — sources are immutable ground truth

Always cite sources inline — use [Source: filename or page title]

Flag contradictions explicitly — never silently pick a side

Update overview.md on every ingest — it must always be current

One entity, one page — do not create duplicate pages for the same person or topic

Ask before creating a new page type not defined in this schema

Preserve uncertainty — use confidence frontmatter to signal what is confirmed vs inferred

Never hallucinate contact details — if something is not in a source, mark it unknown

Offer to file synthesis pages — good query answers should compound into the wiki

Log everything — every action gets a log entry

## 9. Session Startup Checklist

At the start of every Claude Code session, before doing anything:

Read this file (AGENTS.md) in full

Read index.md to understand current wiki state

Read the last 5 entries in log.md to understand recent activity

Read wiki/overview.md for current account snapshot

Confirm to the human: &quot;Wiki loaded. [N] pages indexed. Last activity: [date]. Ready.&quot;

## 10. Product Surfaces

The wiki schema described above is the substrate — a structured, source-cited knowledge base. The surfaces below are how human users interact with it. Each surface is a different lens on the same underlying wiki; they share infrastructure (the ingest agent, the schema, the source rail, the editorial renderer) and differ in inputs, output format, and trigger pattern.

Treat this section as the product roadmap. Each surface declares its current status (sprint number it ships in) so that contributors know what is implemented vs designed.

### 10a. Account Concierge

**Description:** Search-and-synthesis agent that answers ad-hoc questions about the account by pulling from the wiki and approved internal repositories, returning cited synthesis.

**Primary users:** Core account team.

**Question answered:** "What do we know?"

**Sources:** wiki/, Salesforce, SharePoint, Teams meeting notes, Outlook, proposal repository, account plans.

**Status:** Sprint 2 (placeholder search bar live on Home in Sprint 1).

### 10b. White-Space Agent

**Description:** Maps account business units against PwC practices, prior wins, open pipeline, relationships, and known needs to flag coverage gaps.

**Primary users:** Account leadership, practice leads.

**Question answered:** "Where are we underpenetrated?"

**Sources:** Salesforce pipeline + wins, BU mapping, delivery history, relationship maps, revenue by practice.

**Status:** Sprint 5 (preview tile on Home in Sprint 1).

### 10c. BU Opportunity Radar

**Description:** Monitors internal notes plus public signals to suggest likely opportunities by business unit and practice area.

**Primary users:** Practice leads (Cyber / IT / HR / Risk).

**Question answered:** "What should we pursue by BU?"

**Sources:** Salesforce, meeting notes, prior proposals, account strategy docs, earnings calls, job postings, regulatory signals.

**Status:** Sprint 5.

### 10d. Relationship Intelligence Agent

**Description:** Builds a relationship map showing who knows whom, relationship strength, interaction history, and best warm-intro paths.

**Primary users:** Partners, directors, account team.

**Question answered:** "Who knows whom?"

**Sources:** Salesforce contacts, email and calendar metadata (Microsoft Graph), Teams interaction data, prior engagement teams, LinkedIn, manual notes.

**Status:** Sprint 3.

### 10e. Meeting Prep Agent

**Description:** Creates a one-page briefing before client meetings: stakeholder context, prior interactions, open opportunities, relevant POVs, and a suggested talk track.

**Primary users:** Anyone meeting the client.

**Question answered:** "How do I show up prepared?"

**Sources:** Relationship history, open opportunities, prior notes, proposals, public executive information, recent news.

**Status:** Sprint 2 (highest-value next surface — single best demo).

### 10f. Pursuit Reuse Agent

**Description:** Finds reusable proposal language, SOWs, credentials, pricing assumptions, staffing models, and similar wins.

**Primary users:** Proposal teams, senior managers, managers.

**Question answered:** "What can we reuse?"

**Sources:** SharedDrive proposal repository, signed SOWs, pricing assumption libraries, credentials, win-theme corpus.

**Status:** Sprint 4.

### 10g. Client Issue-to-Solution Agent

**Description:** Converts raw client pain points into relevant PwC offerings, SMEs, credentials, and next-step pursuit actions.

**Primary users:** Practice leads.

**Question answered:** "How do we turn pain into a PwC offer?"

**Sources:** Notes, emails, service catalog, SME catalog, methodology library, reusable accelerators.

**Status:** Sprint 6.

### 10h. Regulatory / Threat Trigger Agent

**Description:** Tracks external regulatory and threat developments on a schedule, then turns them into client-specific outreach ideas.

**Primary users:** Cyber leadership, account leads.

**Question answered:** "What should we proactively bring to the client?"

**Sources:** CISA, HHS/OCR, SEC, H-ISAC, public threat intelligence feeds, internal account context (cross-references wiki/orgs and wiki/priorities).

**Status:** Sprint 3 (intelligence schema already exists; needs the scheduled monitor).

### 10i. Account Rhythm Agent

**Description:** Manages account execution by tracking follow-ups, stale opportunities, Salesforce hygiene, action owners, and weekly summaries.

**Primary users:** Core account operations.

**Question answered:** "What needs action?"

**Sources:** Salesforce, Teams action items, meeting notes, emails, dashboards, partner updates.

**Status:** Sprint 4.

### 10j. Operations Center (the live front door)

**Description:** The terminal-style account command center that sits at /. A 3-column dashboard: left rail surfaces intelligence dossiers, the active-initiatives matrix, and an advisory note; center streams real-time signals (news ingest, transcript pulls, risk alerts, revenue events) each with a colour-coded Strategic Implication block; right rail holds the relationship health map, sentiment scores, and the citations & evidence list. KPI ribbon at top; operational status bar at the bottom.

**Primary users:** Anyone on the account team during a working day; partners during a high-stakes hour.

**Question answered:** "What is happening on this account right now, and what does PwC do about it?"

**Sources:** Synthesized from the entire wiki/ — every other surface in §10 feeds this view.

**Status:** Sprint 1 — shipped. Replaced the earlier Editorial Briefing (long-read dossier) and Command Center (tile grid) prototypes during the Stitch-design alignment pass on 2026-05-24.

## 11. Information Architecture

The user-facing app has one primary view and a set of focused drill-downs:

**/  (Operations Center)** — the live dashboard. The daily entry point. Surfaces all signal types and links into the other surfaces. Lives in `app/src/pages/OperationsPage.tsx`.

**/concierge** — Account Concierge (§10a). The Q&A chat over the wiki. Scripted in Sprint 1; live LLM in Sprint 2.

**/contacts, /priorities, /opportunities, /citations** — placeholder routes today; each becomes a full drill-down per the sprint roadmap above as the corresponding surface ships.

The wiki/ markdown directory remains the single source of truth. The Operations Center and all drill-downs render from it; no surface stores state outside the wiki.

Schema version: 1.2 | CVS Account Intelligence Wiki | Inspired by Karpathy's LLM Wiki pattern (April 2026) | Surfaces section added 2026-05-24; Operations Center IA realignment 2026-05-24