# CVS Account Intelligence Wiki

A Karpathy-style, LLM-maintained intelligence wiki for the PwC–CVS account relationship.

The wiki is the product. The LLM is the maintainer. Raw sources go into `raw/`. The LLM integrates them into synthesized markdown pages under `wiki/` — contacts, orgs, priorities, opportunities, engagements, intelligence, synthesis. `wiki/overview.md` is always current.

The schema, ingest workflow, query workflow, and behavioral rules are defined in `AGENTS.md`. The React app under `app/` renders the wiki as an editorial dossier.

## Demo

Live: https://daylanlab.github.io/Account-Intelligence-Wiki-/

**Note: all content in this repository is synthetic.** Names of CVS executives are public; everything else — quotes, internal memos, opportunity values, contradictions — is fabricated for the purpose of this prototype.

## Local development

```bash
cd app
npm install
npm run dev
```

## Repository layout

```
cvs-account-wiki/
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
