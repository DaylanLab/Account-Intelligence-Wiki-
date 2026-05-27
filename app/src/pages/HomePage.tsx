import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  briefing,
  metrics,
  todaysMeetings,
  openActions,
  weeksIntel,
  coverage,
  introTargets,
  reusables,
  painPoints,
} from '../data/wiki'

// ── Section 1: dateline + metric strip ─────────────────────

function Dateline() {
  return (
    <section className="dateline">
      <div className="dateline-left">
        <div className="dateline-eyebrow">
          <em>Account Command Center</em>
          <span className="sep">·</span>
          {briefing.account}
          <span className="sep">·</span>
          {briefing.edition}
          <span className="sep">·</span>
          {briefing.dateline}
        </div>
        <h1 className="dateline-title">{briefing.account}</h1>
        <p className="dateline-strap">{briefing.strap}</p>
      </div>
      <div className="dateline-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="metric">
            <div className="metric-label">{m.label}</div>
            <div className={`metric-value ${m.alert ? 'alert' : ''}`}>
              {m.value}
              {m.delta && <span className={`delta ${m.deltaTone ?? ''}`}>{m.delta}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Section 2: Concierge search ────────────────────────────

function ConciergeSearch() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const suggestions = [
    'Give me the state of the CVS account',
    "What's our biggest opportunity at CVS right now?",
    'Who owns the Oak Street relationship?',
  ]
  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = q.trim()
    if (trimmed) navigate(`/concierge?q=${encodeURIComponent(trimmed)}`)
    else navigate('/concierge')
  }
  return (
    <section className="cc-search">
      <div className="cc-search-label">
        <span className="rail-eyebrow">Account Concierge · Ask anything</span>
        <span className="cc-status">Sprint 1 · scripted · Sprint 2 wires live LLM</span>
      </div>
      <form className="cc-search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ask the wiki — opportunities, contacts, contradictions, prep…"
        />
        <button type="submit">Ask →</button>
      </form>
      <div className="cc-search-suggestions">
        {suggestions.map((s) => (
          <button
            key={s}
            className="cc-suggestion"
            onClick={() => navigate(`/concierge?q=${encodeURIComponent(s)}`)}
          >
            {s}
          </button>
        ))}
      </div>
    </section>
  )
}

// ── Section 3: Today + Actions row ─────────────────────────

function TodayCard() {
  return (
    <div className="cc-tile cc-tile-today">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">Meeting Prep · Today + tomorrow</span>
        <span className="cc-status">Sprint 2</span>
      </div>
      <ul className="cc-meeting-list">
        {todaysMeetings.map((m) => (
          <li key={m.who + m.when} className="cc-meeting">
            <div className="cc-meeting-when">{m.when}</div>
            <div className="cc-meeting-body">
              <div className="cc-meeting-who">{m.who}</div>
              <div className="cc-meeting-topic">{m.topic}</div>
            </div>
            <div className={`cc-prep cc-prep-${m.prepStatus}`}>
              {m.prepStatus === 'ready'
                ? 'Prep ready'
                : m.prepStatus === 'draft'
                ? 'Prep me →'
                : 'No prep yet'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ActionsCard() {
  return (
    <div className="cc-tile cc-tile-actions">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">Account Rhythm · Open actions</span>
        <span className="cc-status">Sprint 4</span>
      </div>
      <ul className="cc-action-list">
        {openActions.map((a) => (
          <li key={a.label} className="cc-action">
            <div className="cc-action-label">{a.label}</div>
            <div className="cc-action-meta">
              <span className="cc-action-owner">{a.owner}</span>
              <span className="cc-action-sep">·</span>
              <span className={`cc-action-due ${a.flag ?? ''}`}>{a.due}</span>
              {a.flag && <span className={`cc-action-flag ${a.flag}`}>{a.flag.toUpperCase()}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Section 4: This week's intel feed ──────────────────────

function IntelFeed() {
  return (
    <div className="cc-tile cc-tile-intel">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">BU Radar + Regulatory Trigger · This week's signals</span>
        <span className="cc-status">Sprint 3</span>
      </div>
      <ul className="cc-intel-list">
        {weeksIntel.map((i, idx) => (
          <li key={idx} className="cc-intel-row">
            <div className="cc-intel-day">{i.day}</div>
            <div className={`cc-intel-source cc-intel-source-${i.source.toLowerCase()}`}>
              {i.source}
            </div>
            <div className="cc-intel-body">{i.body}</div>
            <div className="cc-intel-bu">{i.bu ?? ''}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Section 5: White-space + Relationships ─────────────────

function WhiteSpaceCard() {
  return (
    <div className="cc-tile">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">White-Space Agent · Coverage by BU</span>
        <span className="cc-status">Sprint 5</span>
      </div>
      <ul className="cc-coverage-list">
        {coverage.map((c) => (
          <li key={c.bu} className="cc-coverage-row">
            <div className="cc-coverage-bu">{c.bu}</div>
            <div className="cc-coverage-score">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`cc-dot ${i < c.score ? 'filled' : ''}`}
                />
              ))}
            </div>
            <div className="cc-coverage-note">{c.note}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RelationshipsCard() {
  return (
    <div className="cc-tile">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">Relationship Intelligence · Warm intros</span>
        <span className="cc-status">Sprint 3</span>
      </div>
      <ul className="cc-intro-list">
        {introTargets.map((t) => (
          <li key={t.target} className="cc-intro-row">
            <div className="cc-intro-body">
              <div className="cc-intro-target">{t.target}</div>
              <div className="cc-intro-role">{t.role}</div>
            </div>
            <div className="cc-intro-via">
              <div className="cc-intro-known">via {t.knownBy}</div>
              <div className={`cc-intro-strength cc-intro-strength-${t.strength}`}>
                {t.strength} tie
              </div>
              <div className="cc-intro-channel">{t.via}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Section 6: Reuse + Issue-to-Solution ───────────────────

function ReuseCard() {
  return (
    <div className="cc-tile cc-tile-half">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">Pursuit Reuse · Matches for active drafts</span>
        <span className="cc-status">Sprint 4</span>
      </div>
      <ul className="cc-reuse-list">
        {reusables.map((r) => (
          <li key={r.name} className="cc-reuse-row">
            <div className="cc-reuse-type">{r.type}</div>
            <div className="cc-reuse-body">
              <div className="cc-reuse-name">{r.name}</div>
              <div className="cc-reuse-meta">{r.meta}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PainCard() {
  return (
    <div className="cc-tile cc-tile-half">
      <div className="cc-tile-head">
        <span className="rail-eyebrow">Issue-to-Solution · Client pain → PwC offer</span>
        <span className="cc-status">Sprint 6</span>
      </div>
      <ul className="cc-pain-list">
        {painPoints.map((p) => (
          <li key={p.pain} className="cc-pain-row">
            <div className="cc-pain-issue">{p.pain}</div>
            <div className="cc-pain-arrow">→</div>
            <div className="cc-pain-offer">
              <div className="cc-pain-offer-name">{p.offering}</div>
              <div className="cc-pain-sme">SME · {p.sme}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ── Section 7: Drill-in to the deep briefing ───────────────

function BriefingCallout() {
  return (
    <Link to="/briefing" className="cc-briefing-link">
      <div className="cc-briefing-eyebrow">Editorial Briefing · Sprint 1 · shipped</div>
      <div className="cc-briefing-headline">
        Read the full Q1 2026 dossier — state of the account, contradictions, opportunity matrix, source citations
      </div>
      <div className="cc-briefing-cta">Open the briefing →</div>
    </Link>
  )
}

// ── Page ───────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Dateline />
      <main className="cc-main">
        <ConciergeSearch />

        <div className="cc-row cc-row-7-5">
          <TodayCard />
          <ActionsCard />
        </div>

        <IntelFeed />

        <div className="cc-row cc-row-6-6">
          <WhiteSpaceCard />
          <RelationshipsCard />
        </div>

        <div className="cc-row cc-row-6-6">
          <ReuseCard />
          <PainCard />
        </div>

        <BriefingCallout />
      </main>
    </>
  )
}
