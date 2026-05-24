// Typed mirror of the markdown content under ../../../wiki/.
// Vendor names, regulatory framing, and citations are anchored in real
// public sources (see citations[] below). Client identities, deal values,
// internal PwC quotes, and partner names are synthetic for this prototype.

export const briefing = {
  edition: 'Q1 2026',
  dateline: 'May 24, 2026',
  account: 'PwC Cyber Practice',
  headline: 'The Quarterly Posture',
  strap:
    `A practice-level dossier on PwC Cyber Risk & Regulatory. Vendor and regulatory context drawn from public reporting; client identities and internal data are illustrative.`,
} as const

export type Metric = {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'warn' | 'muted'
  alert?: boolean
}

export const metrics: Metric[] = [
  { label: 'Practice Health', value: 'Strong', delta: 'illustrative', deltaTone: 'muted' },
  { label: 'Active Engagements', value: '47', delta: 'illustrative', deltaTone: 'muted' },
  { label: 'Win Rate', value: '38%', delta: 'illustrative', deltaTone: 'muted' },
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
        `Cyber is the fastest-growing service line across the Big Four. `
      },
      { t: 'em', text: `Deloitte continues to lead cyber consulting by market share`, },
      { t: 'text', text: `, drawing on the largest practitioner base; PwC's position differentiates in regulated-industry programs and board-level strategic engagements where risk-aligned positioning beats scale` },
      { t: 'cite', n: 1, title: `Top Cybersecurity Consulting Firms 2026 — Casebasix industry guide` },
      { t: 'text', text: `. The competitive question for this quarter is not whether we are growing — we are — but whether our methodology investments are pointed at the categories that will define 2026 buyer behavior.` },
    ],
    [
      { t: 'text', text: `Three macro forces are reshaping demand. ` },
      { t: 'em', text: `DORA entered application on January 17, 2025` },
      { t: 'text', text: `, and as of November 2025 the EU has designated 19 ICT third-party providers (AWS, Microsoft Azure, Google Cloud, others) as Critical Third-Party Providers subject to direct supervisory oversight — financial-services clients are now rebuilding third-party cyber-risk registers from scratch` },
      { t: 'cite', n: 2, title: `EIOPA — Digital Operational Resilience Act (official)` },
      { t: 'text', text: `. The SEC cyber disclosure rule has produced 24+ Item 1.05 incident disclosures and a wave of October 2024 enforcement actions, but its future is genuinely uncertain — five banking trade associations petitioned to rescind the 4-day rule in May 2025` },
      { t: 'cite', n: 3, title: `Hunton Andrews Kurth — SEC Cybersecurity Reporting Update` },
      { t: 'text', text: `. And ` },
      { t: 'em', text: `AI security has emerged as a real category with no agreed-upon methodology` },
      { t: 'text', text: ` — every major vendor claims coverage; no integrator owns the assessment standard.` },
    ],
    [
      { t: 'text', text: `The recommendation is methodology concentration in three categories: ` },
      { t: 'em', text: `DORA third-party risk` },
      { t: 'text', text: ` (clearest near-term demand, regulatory deadline pressure), ` },
      { t: 'em', text: `continuous controls assurance for SEC reporters` },
      { t: 'text', text: ` (productize the offering but hedge given the petition uncertainty), and ` },
      { t: 'em', text: `AI security methodology` },
      { t: 'text', text: ` (highest white-space value — first credible POV owns the category). Marshall has the partner mandate to make these calls before the July offsite` },
      { t: 'cite', n: 4, title: `PwC SEC final cybersecurity disclosure rules — practice POV` },
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
    topic: `Fate of the SEC cyber disclosure rule`,
    publicSource: `SEC enforcement posture — October 2024`,
    publicQuote:
      `Settled enforcement actions against four companies for "materially misleading misstatements" regarding cyberattacks; 24+ Item 1.05 disclosures filed by December 2024.`,
    publicAttribution: `— SEC Division of Enforcement, public actions`,
    internalSource: `Banking trade associations petition — May 22, 2025`,
    internalQuote:
      `ABA, BPI, ICBA, SIFMA, and IIB jointly petitioned the SEC to rescind the requirement to disclose material cyber incidents within four business days under Item 1.05 of Form 8-K.`,
    internalAttribution: `— Joint petition, banking trade bodies`,
    implication:
      `Productize the continuous controls assurance offering — the methodology is durable regardless — but do not bet the practice on the 4-day rule surviving the second Trump administration's SEC. Frame client value as audit-readiness and board confidence, not as rule-specific compliance. Brief Marshall before scope confirmation on the F100 insurer pursuit.`,
  },
  {
    topic: `Vendor AI security claims vs methodology reality`,
    publicSource: `Vendor announcements — 2025–2026`,
    publicQuote:
      `Wiz, CrowdStrike, Palo Alto, Microsoft, and the major hyperscalers all now claim "AI security" or "AI-SPM" coverage as a first-class product category.`,
    publicAttribution: `— Vendor product marketing, aggregated`,
    internalSource: `Practitioner-side reporting — Mandiant, ENISA`,
    internalQuote:
      `AI-specific attack patterns (prompt injection, model extraction, training-data poisoning) are still being characterized; no industry-agreed methodology exists for assessing the security of deployed AI systems.`,
    internalAttribution: `— Mandiant M-Trends, ENISA Threat Landscape`,
    implication:
      `White space is real and time-limited. First integrator to publish a credible AI-security assessment methodology owns the category for 18-plus months. Get the Cyber AI POV doc to partner review before the July offsite. If McKinsey or Deloitte publishes first, we chase.`,
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
    tag: 'Identity · DORA',
    name: 'Identity Modernization — F500 Northeast Bank',
    blurb: `Hybrid Okta + Microsoft Entra migration. Driven by DORA Article 28 third-party access controls; closes the most recent regulatory exam finding.`,
    stage: 'Qualified',
    roi: 'illustrative',
    value: '$32.0M',
  },
  {
    index: '02',
    tag: 'Resilience',
    name: 'Post-Ransomware Zero Trust — F500 Healthcare Payor',
    blurb: `Segmentation, IAM overhaul, EDR replatform following a Dec 2025 ransomware incident. CFO-sponsored ahead of August earnings.`,
    stage: 'Qualified',
    roi: 'illustrative',
    value: '$24.0M',
  },
  {
    index: '03',
    tag: 'Public Sector',
    name: 'CMMC L3 Readiness — Federal Defense Contractor',
    blurb: `NIST SP 800-172 controls implementation + C3PAO coordination ahead of Q3 2027 DoD contract renewal.`,
    stage: 'Developing',
    roi: 'illustrative',
    value: '$18.0M',
  },
  {
    index: '04',
    tag: 'Compliance',
    name: 'Continuous Controls Assurance — F100 Insurer',
    blurb: `Lighthouse account for the productized assurance methodology. Hedged against the SEC Item 1.05 petition outcome.`,
    stage: 'Qualified',
    roi: 'illustrative',
    value: '$11.0M',
  },
  {
    index: '05',
    tag: 'OT Security',
    name: 'OT/IT Convergence — F500 Pharma Manufacturing',
    blurb: `Plant-floor segmentation + IEC 62443 alignment across five global sites. Trigger: April 2026 FDA Form 483 observation.`,
    stage: 'Identified',
    roi: 'illustrative',
    value: '$9.0M',
  },
]

export type Citation = {
  num: string
  title: string
  meta: string
}

export const citations: Citation[] = [
  { num: '01', title: `Top Cybersecurity Consulting Firms — 2026 Industry Guide`, meta: `Casebasix · Public industry analysis` },
  { num: '02', title: `Digital Operational Resilience Act (DORA)`, meta: `EIOPA · EU regulatory authority` },
  { num: '03', title: `An Update on SEC Cybersecurity Reporting`, meta: `Hunton Andrews Kurth · Privacy & Information Security Law` },
  { num: '04', title: `SEC's Cyber Disclosure Rule — Practice POV`, meta: `PwC · Cybersecurity, Risk & Regulatory` },
  { num: '05', title: `The Future of the SEC's Cybersecurity Disclosure Rules`, meta: `DLA Piper Market Edge · June 2025` },
  { num: '06', title: `CrowdStrike Q4 FY2026 Form 8-K`, meta: `SEC EDGAR · Public earnings release` },
  { num: '07', title: `Palo Alto Networks — Platformization Era 2026`, meta: `Financial Content · Industry analysis` },
  { num: '08', title: `SEC Cybersecurity Disclosure Trends — 2025 Update`, meta: `Greenberg Traurig · Insights` },
]

export const insight = {
  body:
    `AI security is the genuine white space. Vendors claim coverage; practitioners agree no methodology exists. First firm to publish a defensible AI-security assessment standard owns the category for eighteen-plus months. Get the Cyber AI POV to partner review before the July offsite.`,
  attr: `Synthesis pass — May 24, 2026`,
}

export const pipeline = {
  value: '$342M',
  delta: 'illustrative',
}
