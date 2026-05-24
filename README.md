# Cyber Practice Intelligence Wiki

A Karpathy-style, LLM-maintained intelligence wiki for PwC's Cyber Risk & Regulatory practice.

The wiki is the product. The LLM is the maintainer. Raw sources go into `raw/`. The LLM integrates them into synthesized markdown pages under `wiki/` — contacts, orgs, priorities, opportunities, engagements, intelligence, synthesis. `wiki/overview.md` is always current.

The schema, ingest workflow, query workflow, and behavioral rules are defined in `AGENTS.md`. The React app under `app/` renders the wiki as an editorial dossier.

## Demo

Live: https://daylanlab.github.io/Account-Intelligence-Wiki-/

**Note: all content in this repository is synthetic.** Vendor and competitor names are public; everything else — quotes, internal memos, client identities, opportunity values, contradictions — is fabricated for the purpose of this Sprint 1 prototype.

## Local development

```bash
cd app
npm install
npm run dev
```

## Repository layout

```
account-intelligence-wiki/
├─ AGENTS.md              ← the operating schema (read first)
├─ index.md               ← master catalog
├─ log.md                 ← append-only activity log
├─ raw/                   ← immutable source documents
└─ wiki/                  ← the synthesized intelligence
   ├─ overview.md
   ├─ contacts/  orgs/  priorities/  opportunities/
   └─ engagements/  intelligence/  synthesis/

└─ app/                   ← Vite + React + TypeScript renderer
```

## Roadmap

- **Sprint 1 (current)** — Editorial UI, seed cyber content, deploy pipeline. Demo-ready.
- **Sprint 2** — Notes pipeline: Outlook meeting summaries → Power Automate → `raw/inbox/` → manual `claude ingest`.
- **Sprint 3+** — Multi-ring layout (market / practice / account), lint and sweep workflows, weekly delta digest.
