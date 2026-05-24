// Typed mirror of the markdown content under ../../../wiki/.
// For the MVP demo, this is hand-curated. A future sprint can parse the
// markdown at build time. The repo's wiki/ directory is the canonical
// source — this file should track it.

export const briefing = {
  edition: 'Q1 2026',
  dateline: 'May 24, 2026',
  account: 'PwC Cyber Practice',
  headline: 'The Quarterly Posture',
  strap:
    `A live dossier on PwC's cyber practice: pipeline, competitive position, market signals, and the contradictions partners should not look past.`,
} as const

export type Metric = {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'warn' | 'muted'
  alert?: boolean
}

export const metrics: Metric[] = [
  { label: 'Practice Health', value: 'Strong', delta: '↑ 18% YoY', deltaTone: 'positive' },
  { label: 'Active Engagements', value: '47', delta: '+6 QoQ', deltaTone: 'muted' },
  { label: 'Win Rate', value: '38%', delta: '↓ 4 pp QoQ', deltaTone: 'warn', alert: true },
]

type LeadPart =
  | { t: 'opening' | 'text'; text: string }
  | { t: 'em'; text: string }
  | { t: 'cite'; n: number; title: string }

export const lead: { title: string; body: LeadPart[][] } = {
  title: 'Practice State Analysis — Q1 2026',
  body: [
    [
      { t: 'opening', text:
        `Cyber is the fastest-growing service line at PwC — pipeline up 18% year-on-year — but Q1 surfaces a structural problem the partner team should not look past. `
      },
      { t: 'em', text: `Win rate is down four points to 38%`, },
      { t: 'text', text: `, driven entirely by losses in two categories we have historically led: cloud-native identity programs and large-scale Zero Trust migrations. The pattern is consistent across regions, sector teams, and deal sizes from $5M to $40M. The McKinsey + HashiCorp alliance announced in February explains most of the identity losses; the Accenture + Wiz reseller deal explains the Zero Trust softness` },
      { t: 'cite', n: 1, title: `PwC Cyber Pipeline Review — Q4 2025 close` },
      { t: 'text', text: `.` },
    ],
    [
      { t: 'text', text: `Three macro forces are reshaping demand. The SEC cyber disclosure rule has matured from a compliance check into a board-level program — clients now want ` },
      { t: 'em', text: `continuous controls assurance, not annual attestations` },
      { t: 'text', text: `, and that is a $200M+ category we are credible in but slow to industrialize. DORA enforcement in the EU began in January and is forcing financial-services clients to rebuild third-party cyber-risk programs from scratch. AI security — meaning security ` },
      { t: 'em', text: `of` },
      { t: 'text', text: ` AI systems, not security ` },
      { t: 'em', text: `with` },
      { t: 'text', text: ` AI — has gone from zero pipeline twelve months ago to $61M qualified, with no integrator owning the category` },
      { t: 'cite', n: 2, title: `Mandiant M-Trends 2026, March release` },
      { t: 'text', text: `.` },
    ],
    [
      { t: 'text', text: `The recommendation is concentration, not breadth. Pull engineering investment out of the cyber-strategy assessment line — commoditizing rapidly — and into three platform plays: ` },
      { t: 'em', text: `continuous controls assurance, DORA third-party risk, and AI security methodology` },
      { t: 'text', text: `. Marshall has the partner mandate to make these calls before the July offsite. Methodology drives conversion; every quarter we wait, McKinsey and Accenture compound their share` },
      { t: 'cite', n: 3, title: `SEC Cyber Disclosure 18-Month Retrospective — DLA Piper analysis, April 2026` },
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
    topic: `CrowdStrike recovery narrative`,
    publicSource: `CrowdStrike Q1 FY2027 Earnings Call — May 14, 2026`,
    publicQuote:
      `"We have fully recovered from the July 2024 incident. Record net new ARR this quarter validates customer trust."`,
    publicAttribution: `— G. Kurtz, CEO`,
    internalSource: `PwC Q1 2026 Client Survey — Regulated Industries`,
    internalQuote:
      `"41% of our regulated-industry clients have either replaced or materially augmented CrowdStrike with Microsoft Defender XDR since the incident."`,
    internalAttribution: `— PwC FS / Healthcare sector leads, n=84 clients`,
    implication:
      `Do not position CrowdStrike as the assumed EDR in F500 pitches. Microsoft Defender for Endpoint + Identity is the new safe choice with regulated buyers. Offer CrowdStrike as augment for high-fidelity threat hunting, not core. Update the EDR slide in the standard cyber deck before the June partner sync.`,
  },
  {
    topic: `Palo Alto "platformization" story`,
    publicSource: `Palo Alto Networks Investor Day — April 9, 2026`,
    publicQuote:
      `"Platformization is the only path to operational efficiency. Customers want fewer vendors, not best-of-breed."`,
    publicAttribution: `— N. Arora, CEO`,
    internalSource: `PwC Cyber Account Reviews — Q1 2026 cycle`,
    internalQuote:
      `"Six of our top eight cyber clients explicitly rejected single-vendor consolidation in 2026 budgets, citing concentration risk and pricing power."`,
    internalAttribution: `— Marshall, partner sync notes, April 22`,
    implication:
      `Our pitch is the integration architecture between platforms, not endorsement of any one vendor. Position Wiz + Defender + Splunk as the modal regulated-industry stack; Palo Alto-only is increasingly a tell of unsophisticated procurement. Brief the Bank Identity Modernization team — they are about to walk into a Palo Alto pitch from McKinsey.`,
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
    tag: 'Identity',
    name: 'Identity Modernization — F500 Northeast Bank',
    blurb: `Migration from legacy CA SiteMinder to Okta + Microsoft Entra. Three-year program, board-mandated post-DORA.`,
    stage: 'Qualified',
    roi: 'n/a',
    value: '$32.0M',
  },
  {
    index: '02',
    tag: 'Resilience',
    name: 'Post-Ransomware Zero Trust — F500 Healthcare Payor',
    blurb: `Segmentation, identity, and EDR overhaul following the December 2025 ransomware incident. CFO-sponsored.`,
    stage: 'Qualified',
    roi: 'n/a',
    value: '$24.0M',
  },
  {
    index: '03',
    tag: 'Public Sector',
    name: 'CMMC L3 Readiness Program — Federal Defense Contractor',
    blurb: `Two-year CMMC Level 3 attestation program. Joint pursuit with the federal practice.`,
    stage: 'Developing',
    roi: 'n/a',
    value: '$18.0M',
  },
  {
    index: '04',
    tag: 'Compliance',
    name: 'SEC Cyber Disclosure Controls — F100 Insurer',
    blurb: `Continuous controls assurance program to retire the annual attestation cycle. First of category at this scale.`,
    stage: 'Qualified',
    roi: 'n/a',
    value: '$11.0M',
  },
  {
    index: '05',
    tag: 'OT Security',
    name: 'OT/IT Convergence — F500 Pharma Manufacturing',
    blurb: `Plant-floor segmentation, IEC 62443 alignment, identity bridge to corporate IAM. Five sites in scope.`,
    stage: 'Identified',
    roi: 'n/a',
    value: '$9.0M',
  },
]

export type Citation = {
  num: string
  title: string
  meta: string
}

export const citations: Citation[] = [
  { num: '01', title: `PwC Cyber Pipeline Review — Q4 2025 close`, meta: `Internal · Marshall (Partner)` },
  { num: '02', title: `Mandiant M-Trends 2026 — March release`, meta: `Public · Industry report` },
  { num: '03', title: `SEC Cyber Disclosure 18-Month Retrospective`, meta: `Public · DLA Piper, April 2026` },
  { num: '04', title: `CrowdStrike Q1 FY2027 Earnings Call — May 14, 2026`, meta: `Public · Bloomberg transcript` },
  { num: '05', title: `PwC Q1 2026 Client Survey — Regulated Industries`, meta: `Internal · Sector leads, n=84` },
  { num: '06', title: `Palo Alto Networks Investor Day — April 9, 2026`, meta: `Public · Investor relations` },
  { num: '07', title: `PwC FS Sector — DORA Implementation Tracker`, meta: `Internal · EU regulatory cell` },
  { num: '08', title: `ENISA AI Security Threat Landscape — March 2026`, meta: `Public · EU agency report` },
]

export const insight = {
  body:
    `AI security is consensus white space at $61M qualified and no integrator owning the category. First firm to publish a credible AI-security methodology owns 2026. Get the Cyber AI POV to partner review by end of June. If McKinsey publishes first, we chase for eighteen months.`,
  attr: `Synthesis pass — May 22, 2026`,
}

export const pipeline = {
  value: '$342M',
  delta: '↑ 12% QoQ',
}
