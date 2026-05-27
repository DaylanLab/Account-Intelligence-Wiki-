// =====================================================================
// CONCIERGE — Sprint 1 scripted answer corpus
// Each entry: triggers (lowercase keyword fragments — ANY match fires),
// the canonical question phrasing (shown as a suggested chip), and the
// answer (paragraph blocks; [N] inline = citation marker).
//
// The matcher is intentionally simple: it scans the user query for any
// trigger string. First entry to match wins. Order matters — put more
// specific entries before more general ones.
//
// Citation numbers map to citations[] in wiki.ts. Stay in sync.
// =====================================================================

export type ConciergeAnswer = {
  id: string
  question: string
  triggers: string[]
  paragraphs: string[] // each may contain [N] markers for citations
  related?: string[] // ids of other entries to suggest as follow-ups
}

export const conciergeAnswers: ConciergeAnswer[] = [
  // ─── Strategy / state of the account ────────────────────────
  {
    id: 'state-of-account',
    question: 'Give me the state of the CVS account.',
    triggers: ['state of', 'state of the account', 'state of account', 'overview', 'snapshot', 'where are we', 'how is the account', 'how is cvs', 'cvs account'],
    paragraphs: [
      `CVS Health is consolidating under CEO David Joyner around three pillars: integrated pharmacy-benefit management, value-based primary care, and AI-enabled cost reduction inside Aetna. The Q1 FY2026 print beat consensus on Health Services revenue but missed on Aetna MLR — that miss is the dominant near-term narrative pressure[1].`,
      `PwC's position inside the Enterprise Digital Transformation Office (EDTO) is durable but no longer exclusive. McKinsey is now embedded on the Aetna AI roadmap engagement and Bain is on the Oak Street integration — the first material competitive losses in 18 months. The Cowhey CFO-advisory relationship was reaffirmed through FY2027, which anchors the floor of the account.`,
      `Open risks: boutique competitive encroachment in AI strategy and care-model integration; Aetna MLR pressure shrinking the AI-savings narrative window; no PwC contact on the Oak Street integration team.`,
    ],
    related: ['top-opportunity', 'contradictions', 'edto-position'],
  },

  // ─── Opportunities ──────────────────────────────────────────
  {
    id: 'top-opportunity',
    question: "What's our biggest opportunity at CVS right now?",
    triggers: ['biggest opportunity', 'top opportunity', 'best opportunity', 'biggest pursuit', 'main opportunity', 'whitespace', 'white space'],
    paragraphs: [
      `Total Patient Experience — Data Architecture, $45M estimated, qualified stage. This is CVS's 2026 program to merge data silos across CVS Pharmacy, Caremark, and Aetna into a unified longitudinal health record — the "patient front door" Joyner has named publicly[3].`,
      `Why it's the top pursuit: it's the lone qualified opportunity where PwC currently leads the integrator conversation. McKinsey is circling on the AI side, Bain on care-model integration — but neither is positioned for the data foundation. Primary contact: Tilak Mandadi (EVP Ventures, Technology & Data). Sponsor: Marshall (PwC partner).`,
      `Window: a primary integrator will be named ahead of Q2 earnings on August 6. Recommended next step: joint working session with Mandadi's team in the week of June 8, then Marshall briefs Joyner at the June 18 quarterly partner sync.`,
    ],
    related: ['edto-position', 'opportunities-overview', 'meeting-prep-mandadi'],
  },
  {
    id: 'opportunities-overview',
    question: 'What opportunities are open?',
    triggers: ['opportunities are open', 'list opportunities', 'what opportunities', 'pipeline', 'open opps'],
    paragraphs: [
      `Four shortlisted as of the May 24 sweep:`,
      `1. Total Patient Experience — Data Architecture · $45.0M · Qualified · primary contact Mandadi.`,
      `2. Digital-First Patient Portal 2.0 · $12.5M · Developing · CFO-sponsored. Replatform of the CVS patient portal into a holistic health-management hub.`,
      `3. Zero Trust Architecture Pilot · $8.2M · Identified. Unified endpoint security across Oak Street, MinuteClinic, Signify, and retail. Open issue: no identified primary contact — likely sits with the CISO's office[1].`,
      `4. Retail Rationalization Program · $20M est. · Forming. Operations consulting on the quietly-reversed Northeast expansion. Pre-Q2 window only — see the retail footprint contradiction.`,
    ],
    related: ['top-opportunity', 'contradictions', 'zero-trust-owner'],
  },
  {
    id: 'zero-trust-owner',
    question: 'Who owns the Zero Trust opportunity?',
    triggers: ['zero trust', 'ciso', 'endpoint security', 'who owns zero'],
    paragraphs: [
      `Currently no primary contact identified — this is the open issue on that opportunity. The pursuit sits at $8.2M, stage Identified, with the assumption that the buyer will be in the CISO's office. The CVS CISO contact page is stale.`,
      `Action: identify the current CISO and update [[contacts/cvs-ciso]] before progressing the opportunity to Qualified. Marshall has been pinged about a possible warm intro through the Healthcare CIO Forum 2025 circuit.`,
    ],
    related: ['contacts-overview', 'opportunities-overview'],
  },

  // ─── People ────────────────────────────────────────────────
  {
    id: 'joyner',
    question: 'Who is David Joyner?',
    triggers: ['david joyner', 'joyner', 'ceo of cvs', 'cvs ceo'],
    paragraphs: [
      `David Joyner has been CEO of CVS Health since October 2024, replacing Karen Lynch. He is the champion of the integrated-care narrative — pharmacy + benefits + primary care as one operating model — and named "the patient front door" as the 2026 priority at the WSJ Health Tech Summit in February[3].`,
      `Access path: through Marshall (PwC partner). Joyner's tone in Q1 FY2026 earnings was more disciplined and narrower than the Lynch era — less expansion language, more cost-takeout. He is reading as committed to the data-foundation story, which is favorable for the $45M opportunity PwC leads on.`,
      `Open tension: his October 2025 board statement on Northeast retail expansion (+15%) is contradicted by an internal Slack from VP Retail Ops in November halting all NE lease negotiations. Don't lean on the public expansion line in pitch materials.`,
    ],
    related: ['contradictions', 'meeting-prep-joyner', 'top-opportunity'],
  },
  {
    id: 'mandadi',
    question: 'Who is Tilak Mandadi?',
    triggers: ['mandadi', 'tilak', 'edto head', 'evp tech', 'cto'],
    paragraphs: [
      `Tilak Mandadi is EVP Ventures, Technology & Data at CVS — effectively the economic buyer for EDTO work and the primary contact on the $45M Total Patient Experience data architecture opportunity.`,
      `Relationship status: established, working-level access through prior EDTO engagements. Marshall holds the partner-level relationship. No known competitive contact (i.e., McKinsey/Bain have not been seen in Mandadi's calendar through internal channels).`,
      `Open ask: joint working session in the week of June 8 to align on the data architecture scope ahead of the named-integrator decision before Q2 earnings.`,
    ],
    related: ['top-opportunity', 'edto-position'],
  },
  {
    id: 'cowhey',
    question: 'What about Tom Cowhey?',
    triggers: ['cowhey', 'tom cowhey', 'cfo', 'cvs cfo'],
    paragraphs: [
      `Tom Cowhey is CFO of CVS Health and the longest-running PwC partner relationship at the account. PwC's CFO advisory mandate was reaffirmed through FY2027 in March 2026, which anchors the floor of the account regardless of the McKinsey/Bain competitive moves on other workstreams.`,
      `On the Q1 FY2026 earnings call his tone was measured — he did not over-defend the Aetna MLR miss, which suggests internal alignment that the AI-savings story has more runway than the markets currently price in.`,
    ],
    related: ['state-of-account', 'top-opportunity'],
  },
  {
    id: 'oak-street-owner',
    question: 'Who owns the Oak Street relationship for PwC?',
    triggers: ['oak street', 'who owns oak', 'oak street relationship'],
    paragraphs: [
      `Nobody on the PwC side currently — this is a flagged risk. Bain is embedded on the Oak Street integration team and has the working-level access that should be ours given Oak Street represents a $9B+ revenue line for CVS.`,
      `Recommended fix: identify a working contact at Oak Street (likely through Mandadi's org or through the Health Services sector head) and stand up a first meeting before the August earnings cycle. Without it, PwC is flying blind on a material part of the account.`,
    ],
    related: ['state-of-account', 'contacts-overview'],
  },

  // ─── Contradictions ────────────────────────────────────────
  {
    id: 'contradictions',
    question: 'What contradictions are open in the wiki?',
    triggers: ['contradictions', 'contradiction', 'public vs', 'tensions', 'unresolved'],
    paragraphs: [
      `Two open as of the May 24 synthesis pass.`,
      `**Retail footprint** — Joyner at the October 15, 2025 board meeting committed to "expanding our physical footprint in the Northeast corridor by 15% next year." On November 20, 2025, internal Slack from VP Retail Ops (under Prem Shah) said "halting all new lease negotiations for NE stores effective immediately due to margin pressure." Implication: pitch materials citing the 15% expansion are stale; the retail-rationalization opportunity is materially larger than originally scoped — likely $20M+ if positioned before Q2 earnings on August 6.`,
      `**SEC cyber disclosure rule fate** — the SEC enforced against four companies in October 2024 for materially misleading cyber disclosures and has had 24+ Item 1.05 disclosures filed since[4]. But the American Bankers Association, BPI, ICBA, SIFMA, and IIB jointly petitioned the SEC on May 22, 2025 to rescind the 4-day rule[5]. Implication: PwC's continuous controls assurance pitch is durable on methodology, but lean on board confidence and audit-readiness rather than Item 1.05 specifics.`,
    ],
    related: ['retail-contradiction', 'sec-rule-status'],
  },
  {
    id: 'retail-contradiction',
    question: 'What did Joyner say about retail expansion?',
    triggers: ['retail expansion', 'retail footprint', 'northeast stores', 'lease', '15%'],
    paragraphs: [
      `Public: at the October 15, 2025 board meeting Joyner said "we are fully committed to expanding our physical footprint in the Northeast corridor by 15% next year."`,
      `Internal: on November 20, 2025, a Slack from a VP Retail Ops (under Prem Shah) said "halting all new lease negotiations for NE stores effective immediately due to margin pressure."`,
      `Don't quote the 15% line in pitch materials — it's been quietly reversed. The reversal itself creates a $20M+ opportunity for ops consulting if positioned before Q2 earnings on August 6.`,
    ],
    related: ['contradictions', 'opportunities-overview'],
  },
  {
    id: 'sec-rule-status',
    question: "What's the status of the SEC cyber disclosure rule?",
    triggers: ['sec cyber', 'sec rule', 'item 1.05', 'disclosure rule', 'banking petition'],
    paragraphs: [
      `In force since December 2023. The SEC settled enforcement against four companies in October 2024 for materially misleading cyber-incident disclosures, and 24+ companies have filed Item 1.05 disclosures[4]. But on May 22, 2025, the American Bankers Association, BPI, ICBA, SIFMA, and IIB jointly petitioned the SEC to rescind the 4-day requirement[5].`,
      `For CVS specifically: continuous controls assurance is still a defensible pitch — the methodology value (board confidence, audit-readiness) is durable regardless of the rule's fate. Just don't anchor proposals on Item 1.05 surviving the current SEC. PwC's own POV on the rule is published[7].`,
    ],
    related: ['contradictions', 'state-of-account'],
  },

  // ─── PwC position ──────────────────────────────────────────
  {
    id: 'edto-position',
    question: 'How is PwC positioned at the EDTO?',
    triggers: ['edto', 'enterprise digital transformation', 'pwc position', 'how positioned'],
    paragraphs: [
      `Durable but no longer exclusive. PwC leads the Total Patient Experience data architecture conversation ($45M qualified) and holds the Cowhey CFO-advisory floor through FY2027. McKinsey is embedded on the Aetna AI roadmap (first material loss in 18 months); Bain is on the Oak Street integration[2].`,
      `Reading: the strategic ceiling has narrowed but the account base is stable. The play for Q2 is to lock the data architecture scope (lead contact: Mandadi) before the named-integrator decision lands ahead of August 6 earnings, and to find a working contact at Oak Street before Bain entrenches further.`,
    ],
    related: ['top-opportunity', 'oak-street-owner', 'state-of-account'],
  },

  // ─── Macro / regulatory ────────────────────────────────────
  {
    id: 'dora',
    question: 'What about DORA and CVS?',
    triggers: ['dora', 'european', 'aetna eu', 'eu regulation', 'operational resilience'],
    paragraphs: [
      `DORA (the EU's Digital Operational Resilience Act) entered application on January 17, 2025. In November 2025 the EU designated 19 ICT providers (AWS, Azure, GCP, others) as Critical Third-Party Providers subject to direct supervisory oversight[3].`,
      `Relevance to CVS: limited direct exposure (CVS is US-centric), but Aetna's EU reinsurance counterparties are in scope and the contracting requirements flow upstream. The methodology PwC is building for DORA third-party risk in EU financial services is transferable to CVS's third-party cyber posture — useful as a credibility lever in continuous-controls-assurance pitches.`,
    ],
    related: ['sec-rule-status', 'opportunities-overview'],
  },

  // ─── Meeting prep ──────────────────────────────────────────
  {
    id: 'meeting-prep-joyner',
    question: 'What should I prep before meeting with Joyner?',
    triggers: ['prep for joyner', 'meet with joyner', 'meeting with joyner', 'prep joyner'],
    paragraphs: [
      `Three things to walk in with.`,
      `1. **Q1 FY2026 framing** — acknowledge the Health Services beat; do not surface the Aetna MLR miss directly (Cowhey owns that narrative). Frame our value proposition as accelerating the data foundation that the AI savings story depends on.`,
      `2. **The retail contradiction** — be aware of it but do not raise it. If he leans on the October expansion line, do not contradict him; pivot to the data architecture conversation. The contradiction is leverage for internal PwC positioning, not for the client conversation.`,
      `3. **The August 6 window** — anchor on the named-integrator decision ahead of Q2 earnings. Position the joint working session with Mandadi (week of June 8) as the input that lets him make a decision he's confident in by the Q2 cycle.`,
      `Live Meeting Prep agent ships Sprint 2 — it will pull current relationship history, open opportunities, and recent CVS news automatically into a one-pager.`,
    ],
    related: ['joyner', 'contradictions', 'top-opportunity'],
  },
  {
    id: 'meeting-prep-mandadi',
    question: 'What should I prep before meeting with Mandadi?',
    triggers: ['prep for mandadi', 'meet with mandadi', 'meeting with mandadi'],
    paragraphs: [
      `Mandadi is the working-level economic buyer for the $45M data architecture pursuit. Bring: a concrete scope of the joint working session, named PwC team members, a 2-week timeline, and a sketch of the deliverables that get him to a defensible recommendation before the named-integrator decision.`,
      `Do not: raise the McKinsey-on-Aetna-AI engagement directly (he knows; we don't need to remind him). Do not: cite the 9-month AI roadmap slip — it's our internal intelligence, not something to surface to the client.`,
    ],
    related: ['mandadi', 'top-opportunity'],
  },

  // ─── Catalog / how it works ────────────────────────────────
  {
    id: 'contacts-overview',
    question: 'Who are the key contacts at CVS?',
    triggers: ['contacts', 'who is at cvs', 'key contacts', 'stakeholders', 'people at cvs'],
    paragraphs: [
      `Four tracked at the partner-relevant level:`,
      `**David Joyner** (CEO) — champion of integrated care; access via Marshall.`,
      `**Tom Cowhey** (CFO) — anchors the PwC floor; advisory through FY2027.`,
      `**Prem Shah** (Group President, Pharmacy & Consumer Wellness) — owns the retail rationalization decision; the org tied to the retail contradiction.`,
      `**Tilak Mandadi** (EVP Ventures, Technology & Data) — economic buyer for EDTO; primary contact on the $45M opportunity.`,
      `Gap: no identified contact at Oak Street Health (active risk), no current CISO contact (blocks Zero Trust opportunity). Full Relationship Intelligence surface ships Sprint 3.`,
    ],
    related: ['joyner', 'cowhey', 'mandadi', 'oak-street-owner'],
  },
  {
    id: 'how-it-works',
    question: 'How does this Concierge work?',
    triggers: ['how does this work', 'how do you work', 'what are you', 'sprint 1', 'how built', 'what model'],
    paragraphs: [
      `Sprint 1 — I'm running on a curated answer corpus, not a live LLM. Roughly a dozen hand-written Q&A pairs covering the wiki content, each with citations into wiki/. This is intentional for the partner demo: every answer is defensible, no hallucination risk.`,
      `Sprint 2 — I get wired to a live Claude API call via a Cloudflare Worker, with system-prompt guardrails that restrict me to the wiki content and force me to say "I don't know" for anything off-corpus. You can preview that mode with the toggle at the top of this page (it shows "endpoint not configured" until the Worker is deployed — see worker/README.md in the repo).`,
      `Sprint 3+ — I get extended with retrieval over Salesforce, SharePoint, Teams notes, and the proposal repository per AGENTS.md §10a.`,
    ],
    related: ['state-of-account'],
  },
]

// ─── matcher ─────────────────────────────────────────────────

export function findScriptedAnswer(query: string): ConciergeAnswer | null {
  const q = query.toLowerCase().trim()
  if (!q) return null
  for (const entry of conciergeAnswers) {
    for (const trigger of entry.triggers) {
      if (q.includes(trigger.toLowerCase())) return entry
    }
  }
  return null
}

export const conciergeFallback = {
  paragraphs: [
    `I don't have that in the Sprint 1 corpus yet. The wiki currently holds: the CVS overview, four shortlisted opportunities, two synthesis pages (contradictions), and two intelligence pages (SEC banking petition, DORA CTPP designations).`,
    `To add new content: drop a source into raw/ in the repo and trigger an ingest pass (see AGENTS.md §4a). Sprint 2 wires this Concierge to a live Claude API with retrieval over Salesforce, SharePoint, Teams notes, and the proposal repository.`,
    `In the meantime, try one of the suggestions below — these cover what's currently knowable.`,
  ],
}

export const suggestedQuestions: string[] = [
  conciergeAnswers[0].question, // state of the account
  conciergeAnswers[1].question, // biggest opportunity
  conciergeAnswers[9].question, // contradictions
  conciergeAnswers[6].question, // who is Joyner
  conciergeAnswers[8].question, // who owns Oak Street
  conciergeAnswers[14].question, // prep for Joyner
]
