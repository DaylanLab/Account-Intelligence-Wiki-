// Typed mirror of the markdown content under ../../../wiki/.
// Public-source vendor and regulatory context is real and citable
// (see citations[] below). Client identities, deal values, internal
// PwC quotes, and partner names are illustrative for this prototype.

// =============================================================
// SHARED — used by both the Home (Command Center) and the
// Editorial Briefing pages
// =============================================================

export const briefing = {
  account: 'CVS Health',
  edition: 'Q1 2026',
  dateline: 'May 24, 2026',
  headline: 'CVS Health Account Command Center',
  strap:
    `A live operating dashboard for the PwC–CVS account. Public sources are real; PwC internal data is illustrative for this prototype.`,
} as const

export type Metric = {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'warn' | 'muted'
  alert?: boolean
}

export const metrics: Metric[] = [
  { label: 'Account Health', value: 'Strategic', delta: '↑ since Q4', deltaTone: 'positive' },
  { label: 'Pipeline (est.)', value: '$184M', delta: '↑ 8% QoQ', deltaTone: 'positive' },
  { label: 'Active Engagements', value: '24', delta: '+3 MoM', deltaTone: 'muted' },
  { label: 'Open Risks', value: '3', delta: '2 high', deltaTone: 'warn', alert: true },
]

// =============================================================
// HOME — Command Center surfaces (mostly tile previews; full
// drill-down pages ship in later sprints)
// =============================================================

// 10e — Meeting Prep Agent: today's calendar
export type Meeting = {
  when: string
  who: string
  topic: string
  prepStatus: 'ready' | 'draft' | 'missing'
}

export const todaysMeetings: Meeting[] = [
  { when: 'Tue 2:00 PM', who: 'David Joyner (CEO)', topic: '1:1 strategy sync', prepStatus: 'draft' },
  { when: 'Wed 9:30 AM', who: 'Tilak Mandadi (EVP Tech)', topic: 'EDTO Q2 planning', prepStatus: 'ready' },
  { when: 'Thu 11:00 AM', who: 'Q1 earnings (listen-only)', topic: 'Cost-takeout narrative', prepStatus: 'missing' },
]

// 10i — Account Rhythm Agent: action queue
export type Action = {
  label: string
  owner: string
  due: string
  flag?: 'stale' | 'urgent'
}

export const openActions: Action[] = [
  { label: 'Send Cowhey FY27 advisory renewal memo', owner: 'Marshall', due: 'Today', flag: 'urgent' },
  { label: 'Review SEC pitch deck draft v3', owner: 'Daylan', due: 'Tomorrow' },
  { label: 'Refresh "Digital Portal" opp — stage hasn\'t moved in 21 days', owner: 'Eric', due: 'This week', flag: 'stale' },
  { label: 'Approve weekly partner digest', owner: 'Marshall', due: 'Friday' },
]

// 10c + 10h — BU Radar + Regulatory Trigger combined feed
export type IntelItem = {
  day: string
  source: 'External' | 'Internal' | 'Regulatory'
  body: string
  bu?: string
}

export const weeksIntel: IntelItem[] = [
  { day: 'Mon', source: 'External', body: 'Bain hires former Aetna CMO as senior advisor — competitive signal at the Aetna account.', bu: 'Aetna' },
  { day: 'Tue', source: 'Regulatory', body: 'HHS/OCR finalizes updated HIPAA Security Rule — implementation deadline Q4 2026. CVS exposure: high (Caremark + Aetna data).', bu: 'Caremark · Aetna' },
  { day: 'Wed', source: 'External', body: 'Mandiant M-Trends flags new ransomware family targeting payor claims systems.', bu: 'Aetna' },
  { day: 'Thu', source: 'Internal', body: 'Joyner town hall recording uploaded by account team — "patient front door" reaffirmed as 2026 priority.', bu: 'Health Services' },
  { day: 'Thu', source: 'External', body: 'CVS Q1 FY2026 earnings call beat on Health Services, missed on Aetna MLR.', bu: 'Aetna · Health Services' },
]

// 10b — White-Space Agent: BU coverage matrix
export type Coverage = {
  bu: string
  score: number // 0..5
  note: string
}

export const coverage: Coverage[] = [
  { bu: 'CVS Pharmacy', score: 4, note: 'PwC well-positioned; ops + tech engagements active' },
  { bu: 'Caremark (PBM)', score: 3, note: 'Strong on data; gap in cyber' },
  { bu: 'Aetna', score: 1, note: 'McKinsey embedded; PwC underpenetrated' },
  { bu: 'Oak Street Health', score: 0, note: 'No active engagement; Bain on integration' },
  { bu: 'Signify Health', score: 2, note: 'Light footprint; one analytics pursuit qualified' },
  { bu: 'MinuteClinic', score: 2, note: 'Adjacent through pharmacy work; no dedicated relationship' },
]

// 10d — Relationship Intelligence Agent: warm-intro candidates
export type IntroTarget = {
  target: string
  role: string
  knownBy: string
  strength: 'strong' | 'medium' | 'weak'
  via: string
}

export const introTargets: IntroTarget[] = [
  { target: 'Sarita Rao', role: 'Aetna CIO', knownBy: 'Marshall', strength: 'medium', via: 'Healthcare CIO Forum 2025' },
  { target: 'Brian Newman', role: 'CVS CFO', knownBy: 'Harshal', strength: 'strong', via: 'Prior Deloitte engagement together' },
  { target: 'Michelle Peluso', role: 'Pharmacy Chief Customer Officer', knownBy: '(unmapped)', strength: 'weak', via: 'No identified intro path' },
]

// 10f — Pursuit Reuse Agent: recent matches
export type Reusable = {
  name: string
  type: 'SOW' | 'Pricing' | 'Credential' | 'Methodology'
  meta: string
}

export const reusables: Reusable[] = [
  { name: 'F500 Payor Zero Trust SOW (Anthem, 2024)', type: 'SOW', meta: '88% match to draft scope' },
  { name: 'Pharmacy data architecture credential pack', type: 'Credential', meta: '4 case studies, 2 quotable' },
  { name: 'Healthcare cyber pricing assumptions v3', type: 'Pricing', meta: 'Updated Apr 2026' },
]

// 10g — Issue-to-Solution Agent: recent pain → offering
export type PainPoint = {
  pain: string
  offering: string
  sme: string
}

export const painPoints: PainPoint[] = [
  { pain: 'Aetna claim-processing AI rollout slipped 9 months', offering: 'Data Foundation Acceleration', sme: 'Mandadi org' },
  { pain: 'Retail footprint reversal needs governance', offering: 'Real-Estate Decision Framework', sme: 'Shah org' },
]

// =============================================================
// EDITORIAL BRIEFING — the deep drill-down (existing page)
// =============================================================

type LeadPart =
  | { t: 'opening' | 'text'; text: string }
  | { t: 'em'; text: string }
  | { t: 'cite'; n: number; title: string }

export const lead: { title: string; body: LeadPart[][] } = {
  title: 'Executive State Analysis — CVS Health, Q1 2026',
  body: [
    [
      { t: 'opening', text:
        `As of the Q1 FY2026 print, CVS Health is consolidating around three pillars under CEO David Joyner: `
      },
      { t: 'em', text: `integrated pharmacy-benefit management` },
      { t: 'text', text: `, value-based primary care, and AI-enabled cost reduction inside Aetna. The October 2024 transition from Karen Lynch has produced a more disciplined, narrower agenda — but Aetna's Q1 medical-loss-ratio miss is forcing his cost story to land faster than the data infrastructure can support it` },
      { t: 'cite', n: 1, title: `CVS Health Q4 FY2025 earnings posture; healthcare sector commentary` },
      { t: 'text', text: `.` },
    ],
    [
      { t: 'text', text: `PwC's position inside the Enterprise Digital Transformation Office remains durable but is no longer exclusive. ` },
      { t: 'em', text: `McKinsey is now embedded on the Aetna AI roadmap engagement` },
      { t: 'text', text: ` — the first material share-of-wallet loss in eighteen months — and Bain is on the Oak Street integration. The CFO advisory relationship with Tom Cowhey was reaffirmed through FY2027, anchoring the floor of the account, but the strategic ceiling has narrowed` },
      { t: 'cite', n: 2, title: `Top Cybersecurity Consulting Firms 2026 — Casebasix industry guide` },
      { t: 'text', text: `.` },
    ],
    [
      { t: 'text', text: `The 2026 roadmap continues to emphasize what Joyner calls "the patient front door" — merging data silos across CVS Pharmacy, Caremark, and Aetna into a unified longitudinal health record. This is a ` },
      { t: 'em', text: `$45M whitespace for PwC in Enterprise Data Architecture and Cybersecurity compliance` },
      { t: 'text', text: `, and it is the lone opportunity in which we currently lead the integrator conversation. The window is short: a primary integrator will be named ahead of Q2 earnings on August 6. Macro forces in play this quarter: DORA entered application Jan 17, 2025 (relevant to Aetna's EU reinsurance posture)` },
      { t: 'cite', n: 3, title: `EIOPA — Digital Operational Resilience Act (official)` },
      { t: 'text', text: `; the SEC cyber disclosure rule continues to drive board-level demand, though five banking trade associations petitioned to rescind Item 1.05 in May 2025 and the rule's future is uncertain` },
      { t: 'cite', n: 4, title: `Hunton Andrews Kurth — SEC Cybersecurity Reporting Update` },
      { t: 'text', text: `.` },
    ],
  ],
}

export type Contradiction = {
  topic: string
  publicSource: string
  publicQuote: string
  publicAttribution: string
  internalSource: string
  internalQuote: string
  internalAttribution: string
  implication: string
}

export const contradictions: Contradiction[] = [
  {
    topic: `Retail footprint`,
    publicSource: `Board Meeting Transcript — Oct 15, 2025 (illustrative)`,
    publicQuote:
      `"We are fully committed to expanding our physical footprint in the Northeast corridor by 15% next year."`,
    publicAttribution: `— D. Joyner, FY2026 strategic outlook`,
    internalSource: `Slack: #retail-ops-leadership — Nov 20, 2025 (illustrative)`,
    internalQuote:
      `"Halting all new lease negotiations for NE stores effective immediately due to margin pressure."`,
    internalAttribution: `— VP Retail Ops, direct report to P. Shah`,
    implication:
      `Pitch materials citing the 15% expansion are stale. The retail-rationalization opportunity is materially larger than originally scoped — likely $20M+ in operations consulting if positioned before Q2 earnings on Aug 6.`,
  },
  {
    topic: `Fate of the SEC cyber disclosure rule`,
    publicSource: `SEC enforcement posture — October 2024 (real)`,
    publicQuote:
      `Settled enforcement actions against four companies for "materially misleading misstatements" regarding cyberattacks; 24+ Item 1.05 disclosures filed by December 2024.`,
    publicAttribution: `— SEC Division of Enforcement, public actions`,
    internalSource: `Banking trade associations petition — May 22, 2025 (real)`,
    internalQuote:
      `ABA, BPI, ICBA, SIFMA, and IIB jointly petitioned the SEC to rescind the requirement to disclose material cyber incidents within four business days under Item 1.05 of Form 8-K.`,
    internalAttribution: `— Joint petition, banking trade bodies`,
    implication:
      `The continuous controls assurance pitch to CVS's audit committee is durable regardless — methodology value remains — but framing should hedge. Lead with board confidence and audit-readiness, not with Item 1.05 specifics that may not survive the current SEC.`,
  },
]

export type Opportunity = {
  index: string
  tag: string
  name: string
  blurb: string
  stage: string
  roi: string
  value: string
}

export const opportunities: Opportunity[] = [
  {
    index: '01',
    tag: 'Data + Cyber',
    name: 'Total Patient Experience — Data Architecture',
    blurb: `Unified longitudinal health record across Pharmacy, Caremark, and Aetna. Cyber compliance layered on top.`,
    stage: 'Qualified',
    roi: 'illustrative',
    value: '$45.0M',
  },
  {
    index: '02',
    tag: 'Customer XP',
    name: 'Digital-First Patient Portal 2.0',
    blurb: `Replatform the CVS patient portal into a holistic health-management hub with AI adherence nudges.`,
    stage: 'Developing',
    roi: 'illustrative',
    value: '$12.5M',
  },
  {
    index: '03',
    tag: 'Security',
    name: 'Zero Trust Architecture Pilot',
    blurb: `Unified endpoint security across clinical (Oak Street, MinuteClinic, Signify) and retail environments.`,
    stage: 'Identified',
    roi: 'illustrative',
    value: '$8.2M',
  },
  {
    index: '04',
    tag: 'Operations',
    name: 'Retail Rationalization Program',
    blurb: `Operations consulting on the quietly-reversed Northeast expansion. Pre-Q2 window only.`,
    stage: 'Forming',
    roi: 'illustrative',
    value: '$20.0M (est.)',
  },
]

export type Citation = {
  num: string
  title: string
  meta: string
}

export const citations: Citation[] = [
  { num: '01', title: `CVS Health Q4 FY2025 earnings posture (illustrative)`, meta: `Internal account-team synthesis` },
  { num: '02', title: `Top Cybersecurity Consulting Firms — 2026 Industry Guide`, meta: `Casebasix · Public industry analysis` },
  { num: '03', title: `Digital Operational Resilience Act (DORA)`, meta: `EIOPA · EU regulatory authority` },
  { num: '04', title: `An Update on SEC Cybersecurity Reporting`, meta: `Hunton Andrews Kurth · Privacy & Information Security Law` },
  { num: '05', title: `The Future of the SEC's Cybersecurity Disclosure Rules`, meta: `DLA Piper Market Edge · June 2025` },
  { num: '06', title: `SEC Cybersecurity Disclosure Trends — 2025 Update`, meta: `Greenberg Traurig · Insights` },
  { num: '07', title: `SEC's Cyber Disclosure Rule — Practice POV`, meta: `PwC · Cybersecurity, Risk & Regulatory` },
]

export const insight = {
  body:
    `The 9-month AI roadmap slip at Aetna means CVS cannot hit the public $2B savings target without first solving the data foundation — which is exactly the $45M Total Patient Experience scope we lead. Brief Marshall ahead of the June 18 partner sync; do not raise the slip with Mandadi.`,
  attr: `Synthesis pass — May 24, 2026`,
}

export const pipeline = {
  value: '$184M',
  delta: '↑ 8% QoQ',
}
