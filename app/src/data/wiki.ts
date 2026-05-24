// Typed mirror of the markdown content under ../../../wiki/.
// For the MVP demo, this is hand-curated. A future version can parse the
// markdown at build time. The repo's wiki/ directory is the canonical
// source — this file should track it.

export const briefing = {
  edition: 'Q1 2026',
  dateline: 'May 24, 2026',
  account: 'CVS Health',
  headline: 'CVS Health Strategic Intel',
  strap:
    `A live dossier on the CVS account: priorities, opportunities, contradictions, and the partners best positioned to act on them.`,
} as const

export type Metric = {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'warn' | 'muted'
  alert?: boolean
}

export const metrics: Metric[] = [
  { label: 'Account Health', value: 'Strategic', delta: '↑ 12% QoQ', deltaTone: 'positive' },
  { label: 'Active Engagements', value: '24', delta: '+3 MoM', deltaTone: 'muted' },
  { label: 'Risk Exposure', value: 'Moderate', delta: '2 alerts', deltaTone: 'warn', alert: true },
]

type LeadPart =
  | { t: 'opening' | 'text'; text: string }
  | { t: 'em'; text: string }
  | { t: 'cite'; n: number; title: string }

export const lead: { title: string; body: LeadPart[][] } = {
  title: 'Executive State Analysis — FY26 Q1',
  body: [
    [
      { t: 'opening', text:
        `As of the latest quarterly review, CVS Health is consolidating around three pillars: `
      },
      { t: 'em', text: `integrated pharmacy-benefit management` },
      { t: 'text', text: `, value-based primary care, and AI-enabled cost reduction inside Aetna. The October 2024 transition to David Joyner as CEO has produced a more disciplined, narrower agenda than the Lynch era — but Aetna's Q1 medical-loss-ratio miss is forcing his cost story to land faster than the data infrastructure can support it` },
      { t: 'cite', n: 1, title: `CVS Health Q1 FY2026 Earnings Call, May 8, 2026` },
      { t: 'text', text: `.` },
    ],
    [
      { t: 'text', text: `PwC's position inside the Enterprise Digital Transformation Office remains durable but is no longer exclusive. ` },
      { t: 'em', text: `McKinsey was awarded the Aetna AI roadmap engagement in April` },
      { t: 'text', text: ` — the first material share-of-wallet loss in eighteen months — and Bain is now embedded in the Oak Street integration team. The CFO advisory relationship with Tom Cowhey was reaffirmed through FY2027 in March, anchoring the floor of the account, but the strategic ceiling has narrowed` },
      { t: 'cite', n: 2, title: `Internal: PwC Account Plan, April 2026 update` },
      { t: 'text', text: `.` },
    ],
    [
      { t: 'text', text: `Financial modeling suggests the 2026 roadmap will continue to emphasize what Joyner calls "the patient front door" — merging data silos across CVS Pharmacy, Caremark, and Aetna into a unified longitudinal health record. This is a ` },
      { t: 'em', text: `$45M whitespace for PwC in Enterprise Data Architecture and Cybersecurity compliance` },
      { t: 'text', text: `, and it is the lone opportunity in which we currently lead the integrator conversation. The window is short: a primary integrator will be named ahead of Q2 earnings on August 6` },
      { t: 'cite', n: 3, title: `WSJ Health Tech Summit keynote — D. Joyner, February 10, 2026` },
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
    publicSource: `Board Meeting Transcript — Oct 15, 2025`,
    publicQuote:
      `"We are fully committed to expanding our physical footprint in the Northeast corridor by 15% next year."`,
    publicAttribution: `— D. Joyner, FY2026 strategic outlook`,
    internalSource: `Slack: #retail-ops-leadership — Nov 20, 2025`,
    internalQuote:
      `"Halting all new lease negotiations for NE stores effective immediately due to margin pressure."`,
    internalAttribution: `— VP Retail Ops, direct report to P. Shah`,
    implication:
      `Pitch materials citing the 15% expansion are stale. The retail-rationalization opportunity is materially larger than originally scoped — likely $20M+ in operations consulting if positioned before Q2 earnings on Aug 6.`,
  },
  {
    topic: `AI savings timeline`,
    publicSource: `10-K Filing — FY2025`,
    publicQuote:
      `"AI investment expected to yield $2B in savings within a 24-month window through automation."`,
    publicAttribution: `— CVS Health FY2025 Form 10-K`,
    internalSource: `Tech Lead 1:1 — Dec 5, 2025`,
    internalQuote:
      `"Actual AI implementation roadmap has slipped 9 months due to data clean-up requirements."`,
    internalAttribution: `— Aetna Head of Engineering`,
    implication:
      `The slip is the wedge for our data architecture pitch — Aetna cannot hit the public AI savings target without first solving the data foundation, which is exactly the $45M Total Patient Experience scope. Brief Marshall before the June 18 partner sync.`,
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
    roi: 'n/a',
    value: '$45.0M',
  },
  {
    index: '02',
    tag: 'Customer XP',
    name: 'Digital-First Patient Portal 2.0',
    blurb: `Replatform the CVS patient portal into a holistic health-management hub with AI adherence nudges.`,
    stage: 'Developing',
    roi: '220%',
    value: '$12.5M',
  },
  {
    index: '03',
    tag: 'Security',
    name: 'Zero Trust Architecture Pilot',
    blurb: `Unified endpoint security across clinical (Oak Street, MinuteClinic, Signify) and retail environments.`,
    stage: 'Identified',
    roi: '185%',
    value: '$8.2M',
  },
  {
    index: '04',
    tag: 'Operations',
    name: 'Retail Rationalization Program',
    blurb: `Operations consulting on the quietly-reversed Northeast expansion. Pre-Q2 window only.`,
    stage: 'Forming',
    roi: 'n/a',
    value: '$20.0M (est.)',
  },
]

export type Citation = {
  num: string
  title: string
  meta: string
}

export const citations: Citation[] = [
  { num: '01', title: `CVS Health Q1 FY2026 Earnings Call — May 8, 2026`, meta: `Bloomberg Terminal · Public` },
  { num: '02', title: `PwC CVS Account Plan — April 2026 quarterly update`, meta: `Internal · Marshall (Partner)` },
  { num: '03', title: `WSJ Health Tech Summit — Joyner Keynote, Feb 10, 2026`, meta: `Public · Press transcript` },
  { num: '04', title: `CVS Health FY2025 Form 10-K — AI savings guidance`, meta: `Public · SEC filing` },
  { num: '05', title: `Board Meeting Transcript — Oct 15, 2025`, meta: `Confidential · Sourced through Marshall` },
  { num: '06', title: `Slack #retail-ops-leadership — Nov 20, 2025`, meta: `Internal · CVS-leaked summary` },
  { num: '07', title: `Aetna Eng. 1:1 — Dec 5, 2025`, meta: `Internal · PwC interview notes` },
]

export const insight = {
  body:
    `The 9-month AI roadmap slip means CVS cannot hit the public $2B savings target without first solving the data foundation — which is exactly the $45M scope we currently lead. Brief Marshall ahead of the June 18 partner sync; do not raise the slip with Mandadi.`,
  attr: `Synthesis pass — May 22, 2026`,
}

export const pipeline = {
  value: '$184M',
  delta: '↑ 8% QoQ',
}
