// Typed mirror of the wiki/ markdown corpus.
// Public-source context (real executives, real public events, real regulations)
// is genuine. PwC internal data (deal values, sentiment scores, etc.) is
// illustrative for this Sprint 1 prototype.

// ─────────────────────────────────────────────────────────
// SHARED — used across pages
// ─────────────────────────────────────────────────────────

export const briefing = {
  account: 'CVS Health',
  edition: 'Q1 2026',
  dateline: 'May 24, 2026',
} as const

// CVS business units, used by the Operations nav dropdown to scope the
// dashboard view. Slugs are URL-safe; meta is the small caption shown
// in the dropdown next to the label.
export type BusinessUnit = { slug: string; label: string; meta: string }

export const businessUnits: BusinessUnit[] = [
  { slug: 'cvs-pharmacy', label: 'CVS Pharmacy', meta: 'Retail · 9,000 stores' },
  { slug: 'caremark', label: 'Caremark', meta: 'PBM' },
  { slug: 'aetna', label: 'Aetna', meta: 'Insurance' },
  { slug: 'oak-street', label: 'Oak Street Health', meta: 'Primary care' },
  { slug: 'signify', label: 'Signify Health', meta: 'In-home health' },
  { slug: 'minute-clinic', label: 'MinuteClinic', meta: 'Walk-in care' },
  { slug: 'health-services', label: 'Health Services', meta: 'Cross-BU programs' },
]

// ─────────────────────────────────────────────────────────
// OPERATIONS CENTER  (Home /)
// ─────────────────────────────────────────────────────────

export type Kpi = {
  label: string
  value: string
  delta?: string
  deltaTone?: 'positive' | 'negative' | 'neutral'
}

export const kpis: Kpi[] = [
  { label: 'Revenue at Risk', value: '$42.8M', delta: '↑ 4.2%', deltaTone: 'negative' },
  { label: 'Active Opportunities', value: '14', delta: '+2 new', deltaTone: 'positive' },
  { label: 'Sentiment Trend', value: 'Neutral', delta: '— stable', deltaTone: 'neutral' },
  { label: 'PwC Workforce', value: '186', delta: 'FTE eq.', deltaTone: 'neutral' },
]

export type Dossier = { code: string; title: string; meta: string }

export const dossiers: Dossier[] = [
  { code: 'OR', title: 'Org Chart', meta: '12 new stakeholders' },
  { code: 'SR', title: 'Strategic Roadmap', meta: 'Updated Q1 FY26' },
  { code: 'FP', title: 'Financial Perf.', meta: 'Earnings analysis' },
  { code: 'CO', title: 'Competition', meta: 'McKinsey · Bain · Deloitte' },
]

export type Initiative = {
  name: string
  status: 'on-track' | 'at-risk' | 'paused'
  roi: string
}

export const initiatives: Initiative[] = [
  { name: 'Omnichannel Rx 2.0', status: 'on-track', roi: '$12.4M' },
  { name: 'Aetna Cloud Migration', status: 'at-risk', roi: '$5.2M' },
  { name: 'Claims Automation', status: 'paused', roi: '$8.9M' },
  { name: 'PBM Strategy Alignment', status: 'on-track', roi: '$15.0M' },
]

export const advisoryNote =
  '"Focus on the Aetna Cloud Migration delay; Joyner has asked Mandadi for a revised timeline by Friday. This is the one to over-prepare for."'

export type SignalKind = 'news-ingest' | 'transcript' | 'risk-alert' | 'revenue-event'
export type Tone = 'positive' | 'neutral' | 'risk' | 'success'

export type Signal = {
  kind: SignalKind
  time: string
  headline: string
  implicationLabel: string
  implication: string
  tone: Tone
}

export const accountStream: Signal[] = [
  {
    kind: 'news-ingest',
    time: '14:22:05 EST',
    headline:
      'CVS Health announces plans to simplify pharmacy reimbursement model under the "CVS CostVantage" framework.',
    implicationLabel: 'Strategic Implication',
    implication:
      'Pivot PBM Strategy Alignment workstream to lead with CostVantage integration efficiencies. High probability of additional advisory scope for FY27 planning. Brief Marshall ahead of next steering committee.',
    tone: 'positive',
  },
  {
    kind: 'transcript',
    time: '11:05:12 EST',
    headline:
      'Joyner emphasizes "aggressive AI adoption in pharmacy workflow" during the all-hands town hall.',
    implicationLabel: 'Strategic Implication',
    implication:
      'Window to present the PwC Generative-AI-in-Healthcare framework to Mandadi\'s team this quarter. Tie to the existing Total Patient Experience scope.',
    tone: 'neutral',
  },
  {
    kind: 'risk-alert',
    time: '09:15:44 EST',
    headline:
      'Walgreens Boots Alliance CEO transition prompts analyst forecasts of aggressive pricing shift across the retail-pharmacy sector.',
    implicationLabel: 'Strategic Implication',
    implication:
      'Monitor competitive pressure on front-store margins. Schedule pricing-strategy workshop with Shah\'s organization for early October.',
    tone: 'risk',
  },
  {
    kind: 'revenue-event',
    time: 'Yesterday  17:45',
    headline: '$4.2M SOW signed — Medicare Advantage Stars Optimization, FY26 H2 delivery.',
    implicationLabel: 'Success Metric',
    implication:
      'Projected 30% expansion on existing Medicare Advantage footprint by Q4 FY26. Marshall confirmed extension talks underway.',
    tone: 'success',
  },
]

export type Exec = {
  initials: string
  shortName: string
  role: string
  tone: 'positive' | 'negative' | 'neutral'
}

export const execs: Exec[] = [
  { initials: 'DJ', shortName: 'D. Joyner', role: 'CEO', tone: 'positive' },
  { initials: 'TM', shortName: 'T. Mandadi', role: 'EVP, Tech & Data', tone: 'neutral' },
  { initials: 'TC', shortName: 'T. Cowhey', role: 'CFO', tone: 'positive' },
  { initials: 'PS', shortName: 'P. Shah', role: 'GP, Pharmacy', tone: 'negative' },
]

export type SentimentRow = {
  name: string
  scoreLabel: string
  score: string
  tone: 'pos' | 'neg' | 'neu'
}

export const sentimentScores: SentimentRow[] = [
  { name: 'Joyner', scoreLabel: 'POS', score: '0.82', tone: 'pos' },
  { name: 'Mandadi', scoreLabel: 'NEU', score: '0.54', tone: 'neu' },
  { name: 'Shah', scoreLabel: 'NEG', score: '0.21', tone: 'neg' },
]

export type Evidence = { ref: string; description: string; viewLabel: string }

export const evidenceList: Evidence[] = [
  {
    ref: '#882-A',
    description:
      '"Strategy 2026: Pharmacy & Care Convergence" — Internal PDF, §4.2 (PBM pricing models).',
    viewLabel: 'View source document',
  },
  {
    ref: '#901-C',
    description:
      'Earnings Call Transcript, Q1 FY26 (May 8) — Joyner mentions PwC cost-optimization framework, p. 12.',
    viewLabel: 'View transcript',
  },
  {
    ref: '#914-B',
    description:
      'External Analyst Report — JP Morgan, "The Future of Integrated Care Delivery", March 2026.',
    viewLabel: 'View external report',
  },
]

export const opsStatus = {
  system: 'Operational',
  lastSync: '18:02:11 GMT',
  activeUsers: 14,
  environment: 'Production',
}

// ─────────────────────────────────────────────────────────
// CONCIERGE  (/concierge)  —  kept from prior build
// ─────────────────────────────────────────────────────────

export type Citation = {
  num: string
  title: string
  meta: string
}

export const citations: Citation[] = [
  { num: '01', title: 'CVS Health Q4 FY2025 earnings posture (illustrative internal synthesis)', meta: 'Internal · Account-team synthesis' },
  { num: '02', title: 'Top Cybersecurity Consulting Firms — 2026 Industry Guide', meta: 'Casebasix · Public industry analysis' },
  { num: '03', title: 'Digital Operational Resilience Act (DORA)', meta: 'EIOPA · EU regulatory authority' },
  { num: '04', title: 'An Update on SEC Cybersecurity Reporting', meta: 'Hunton Andrews Kurth · Privacy & Information Security Law' },
  { num: '05', title: 'The Future of the SEC\'s Cybersecurity Disclosure Rules', meta: 'DLA Piper Market Edge · June 2025' },
  { num: '06', title: 'SEC Cybersecurity Disclosure Trends — 2025 Update', meta: 'Greenberg Traurig · Insights' },
  { num: '07', title: 'SEC\'s Cyber Disclosure Rule — Practice POV', meta: 'PwC · Cybersecurity, Risk & Regulatory' },
]
