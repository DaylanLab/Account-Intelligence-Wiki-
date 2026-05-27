import {
  kpis,
  dossiers,
  initiatives,
  advisoryNote,
  accountStream,
  execs,
  sentimentScores,
  evidenceList,
  opsStatus,
  type Initiative,
  type Signal,
  type Exec,
} from '../data/wiki'

// ── KPI ribbon ────────────────────────────────────────────

function KpiRibbon() {
  return (
    <section className="ops-kpi">
      <div className="ops-kpi-inner">
        {kpis.map((k) => (
          <div key={k.label} className="ops-kpi-cell">
            <div className="ops-kpi-label">{k.label}</div>
            <div className="ops-kpi-value">
              {k.value}
              {k.delta && (
                <span className={`ops-kpi-delta ops-kpi-delta-${k.deltaTone ?? 'neutral'}`}>
                  {k.delta}
                </span>
              )}
            </div>
          </div>
        ))}
        <button className="ops-cta">New Intelligence</button>
      </div>
    </section>
  )
}

// ── Left rail ─────────────────────────────────────────────

function DossierGrid() {
  return (
    <section className="ops-block">
      <div className="ops-block-eyebrow">Intelligence Dossiers</div>
      <div className="ops-dossier-grid">
        {dossiers.map((d) => (
          <button key={d.title} className="ops-dossier">
            <div className="ops-dossier-code">{d.code}</div>
            <div className="ops-dossier-body">
              <div className="ops-dossier-title">{d.title}</div>
              <div className="ops-dossier-meta">{d.meta}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

function InitiativesTable() {
  const statusLabel = (s: Initiative['status']) =>
    s === 'on-track' ? 'On track' : s === 'at-risk' ? 'At risk' : 'Paused'
  return (
    <section className="ops-block">
      <div className="ops-block-eyebrow">Active Initiatives Matrix</div>
      <table className="ops-initiatives">
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th className="num">ROI</th>
          </tr>
        </thead>
        <tbody>
          {initiatives.map((i) => (
            <tr key={i.name}>
              <td>{i.name}</td>
              <td>
                <span className={`ops-tag ops-tag-${i.status}`}>{statusLabel(i.status)}</span>
              </td>
              <td className="num">{i.roi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function AdvisoryNote() {
  return (
    <section className="ops-advisory">
      <div className="ops-block-eyebrow">Advisory Note</div>
      <p className="ops-advisory-body">{advisoryNote}</p>
    </section>
  )
}

// ── Center: live account stream ──────────────────────────

function SignalTag({ kind }: { kind: Signal['kind'] }) {
  const labels: Record<Signal['kind'], string> = {
    'news-ingest': 'Signal: News Ingest',
    'transcript': 'Signal: Transcript',
    'risk-alert': 'Signal: Risk Alert',
    'revenue-event': 'Signal: Revenue Event',
  }
  return <span className={`ops-signal-tag ops-signal-tag-${kind}`}>{labels[kind]}</span>
}

function AccountStream() {
  return (
    <section className="ops-stream">
      <div className="ops-stream-head">
        <div>
          <div className="ops-block-eyebrow">Live Account Stream</div>
          <div className="ops-stream-sub">
            Ingesting 24 sources  ·  real-time signals
          </div>
        </div>
      </div>
      <div className="ops-stream-list">
        {accountStream.map((s, i) => (
          <article key={i} className="ops-signal">
            <header className="ops-signal-head">
              <SignalTag kind={s.kind} />
              <span className="ops-signal-time">{s.time}</span>
            </header>
            <h3 className="ops-signal-headline">{s.headline}</h3>
            <div className={`ops-signal-implication ops-signal-implication-${s.tone}`}>
              <div className="ops-signal-implication-label">{s.implicationLabel}</div>
              <p className="ops-signal-implication-body">{s.implication}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

// ── Right rail ────────────────────────────────────────────

function RelationshipMap() {
  // Layout: CVS in the center, four execs at the corners.
  // Each exec is a node with their initials and a sentiment-coded border.
  const center = { x: 50, y: 50 }
  const positions: Record<string, { x: number; y: number }> = {
    DJ: { x: 22, y: 18 },
    TM: { x: 78, y: 18 },
    TC: { x: 22, y: 82 },
    PS: { x: 78, y: 82 },
  }
  const toneColor = (t: Exec['tone']) =>
    t === 'positive' ? '#1a5740' : t === 'negative' ? '#b91c1c' : '#75777d'

  return (
    <section className="ops-block">
      <div className="ops-block-eyebrow">Relationship Health Map</div>
      <div className="ops-relmap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-label="Relationship map">
          {execs.map((e) => {
            const p = positions[e.initials] ?? center
            return (
              <line
                key={'l-' + e.initials}
                x1={center.x}
                y1={center.y}
                x2={p.x}
                y2={p.y}
                stroke={toneColor(e.tone)}
                strokeWidth={0.6}
                strokeDasharray={e.tone === 'negative' ? '2 1' : ''}
              />
            )
          })}
          {/* CVS center node */}
          <rect x={center.x - 11} y={center.y - 6} width={22} height={12} fill="#091426" />
          <text
            x={center.x}
            y={center.y + 1.5}
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize={5.5}
            fontWeight={700}
            fill="#fff"
          >
            CVS
          </text>
          <text
            x={center.x}
            y={center.y + 5.5}
            textAnchor="middle"
            fontFamily="Calibri, sans-serif"
            fontSize={2.8}
            fill="#c2c8d2"
            letterSpacing={0.4}
          >
            CORE
          </text>
          {/* Exec nodes */}
          {execs.map((e) => {
            const p = positions[e.initials] ?? center
            return (
              <g key={'n-' + e.initials}>
                <rect
                  x={p.x - 6}
                  y={p.y - 6}
                  width={12}
                  height={12}
                  fill="#ffffff"
                  stroke={toneColor(e.tone)}
                  strokeWidth={1.2}
                />
                <text
                  x={p.x}
                  y={p.y + 1.5}
                  textAnchor="middle"
                  fontFamily="Georgia, serif"
                  fontSize={4.2}
                  fontWeight={700}
                  fill="#091426"
                >
                  {e.initials}
                </text>
              </g>
            )
          })}
          {/* Labels under each node */}
          {execs.map((e) => {
            const p = positions[e.initials] ?? center
            const labelY = p.y > center.y ? p.y + 11 : p.y + 11 // always under the node
            return (
              <g key={'lbl-' + e.initials}>
                <text
                  x={p.x}
                  y={labelY}
                  textAnchor="middle"
                  fontFamily="Calibri, sans-serif"
                  fontSize={2.8}
                  fill="#45474c"
                  letterSpacing={0.4}
                >
                  {e.shortName.toUpperCase()}  ({e.role.toUpperCase()})
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}

function SentimentList() {
  return (
    <section className="ops-block ops-sentiment">
      {sentimentScores.map((s) => (
        <div key={s.name} className="ops-sentiment-row">
          <div className="ops-sentiment-label">Sentiment: {s.name}</div>
          <div className={`ops-sentiment-value ops-sentiment-value-${s.tone}`}>
            {s.scoreLabel} ({s.score})
          </div>
        </div>
      ))}
    </section>
  )
}

function CitationsList() {
  return (
    <section className="ops-block">
      <div className="ops-block-eyebrow">Citations &amp; Evidence</div>
      <ul className="ops-evidence-list">
        {evidenceList.map((e) => (
          <li key={e.ref} className="ops-evidence">
            <div className="ops-evidence-ref">Ref {e.ref}</div>
            <p className="ops-evidence-desc">{e.description}</p>
            <a className="ops-evidence-link" href="#">
              {e.viewLabel.toUpperCase()}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

// ── Footer status bar ─────────────────────────────────────

function StatusBar() {
  return (
    <div className="ops-statusbar">
      <span><span className="ops-status-dot" /> System: {opsStatus.system}</span>
      <span>Last sync: {opsStatus.lastSync}</span>
      <span>Active users: {opsStatus.activeUsers}</span>
      <span>Environment: {opsStatus.environment}</span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────

export default function OperationsPage() {
  return (
    <>
      <KpiRibbon />
      <main className="ops-main">
        <aside className="ops-left">
          <DossierGrid />
          <InitiativesTable />
          <AdvisoryNote />
        </aside>
        <section className="ops-center">
          <AccountStream />
        </section>
        <aside className="ops-right">
          <RelationshipMap />
          <SentimentList />
          <CitationsList />
        </aside>
      </main>
      <StatusBar />
    </>
  )
}

