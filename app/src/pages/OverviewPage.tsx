import { Fragment } from 'react'
import {
  briefing,
  metrics,
  lead,
  contradictions,
  opportunities,
  citations,
  insight,
  pipeline,
} from '../data/wiki'

function Dateline() {
  return (
    <section className="dateline">
      <div className="dateline-left">
        <div className="dateline-eyebrow">
          <em>Account Briefing</em>
          <span className="sep">·</span>
          {briefing.edition}
          <span className="sep">·</span>
          {briefing.dateline}
        </div>
        <h1 className="dateline-title">{briefing.headline}</h1>
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

function LeadArticle() {
  return (
    <article className="lead">
      <div className="sec-heading">
        <h2>{lead.title}</h2>
        <div className="sec-heading-num">§ I — Synthesis</div>
      </div>
      <div className="lead-body">
        {lead.body.map((para, pi) => {
          const isOpening = pi === 0
          return (
            <p key={pi} className={isOpening ? 'lead-opening' : ''}>
              {para.map((part, idx) => {
                if (part.t === 'opening' || part.t === 'text') return <Fragment key={idx}>{part.text}</Fragment>
                if (part.t === 'em') return <em key={idx} className="callout">{part.text}</em>
                if (part.t === 'cite') {
                  return (
                    <sup
                      key={idx}
                      className="cite"
                      title={part.title}
                      onClick={() => {
                        const el = document.getElementById(`cite-${part.n}`)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }}
                    >
                      [{part.n}]
                    </sup>
                  )
                }
                return null
              })}
            </p>
          )
        })}
      </div>
    </article>
  )
}

function Contradictions() {
  return (
    <section className="contradictions">
      <div className="sec-heading">
        <h2>Unresolved Contradictions</h2>
        <div className="sec-heading-flag">Two open · action required</div>
      </div>
      {contradictions.map((c) => (
        <div key={c.topic} className="contradiction">
          <div className="contradiction-side public">
            <div className="contradiction-source">Public · {c.publicSource}</div>
            <p className="contradiction-quote">{c.publicQuote}</p>
            <div className="contradiction-attr">{c.publicAttribution}</div>
          </div>
          <div className="contradiction-side internal">
            <div className="contradiction-source">Internal · {c.internalSource}</div>
            <p className="contradiction-quote">{c.internalQuote}</p>
            <div className="contradiction-attr">{c.internalAttribution}</div>
            <div className="contradiction-implication">
              <strong>PwC implication</strong>
              {c.implication}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

function OpportunityMatrix() {
  return (
    <section>
      <div className="sec-heading">
        <h2>Strategic Opportunity Matrix</h2>
        <div className="sec-heading-num">§ II — Pipeline</div>
      </div>
      <table className="matrix-table">
        <thead>
          <tr>
            <th />
            <th>Tag</th>
            <th>Opportunity</th>
            <th>Stage</th>
            <th className="num">Proj. ROI</th>
            <th className="num">Est. Value</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((o) => (
            <tr key={o.index}>
              <td className="idx">{o.index}</td>
              <td className="tag">{o.tag}</td>
              <td className="name">
                {o.name}
                <span className="blurb">{o.blurb}</span>
              </td>
              <td className="stage">{o.stage}</td>
              <td className="num">{o.roi}</td>
              <td className="num">{o.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function RelationshipMap() {
  // PwC at center. Solid lines = active partner. Dashed = competitor / watching.
  return (
    <div className="relmap">
      <svg viewBox="0 0 240 240" aria-label="Cyber market relationship map">
        {/* connections */}
        <line x1="120" y1="120" x2="60" y2="60" stroke="#091426" strokeWidth="2" />
        <line x1="120" y1="120" x2="180" y2="60" stroke="#091426" strokeWidth="1.5" strokeDasharray="5 3" />
        <line x1="120" y1="120" x2="190" y2="180" stroke="#091426" strokeWidth="1.5" strokeDasharray="5 3" />
        <line x1="120" y1="120" x2="50" y2="190" stroke="#75777d" strokeWidth="1" strokeDasharray="2 3" />
        {/* PwC center */}
        <rect x="100" y="100" width="40" height="40" fill="#091426" />
        <text x="106" y="125" fill="#ffffff" fontFamily="Source Serif 4" fontSize="11" fontWeight="700">PwC</text>
        {/* Microsoft — partner */}
        <circle cx="60" cy="60" r="26" fill="#ffffff" stroke="#091426" strokeWidth="3" />
        <text x="34" y="64" fill="#091426" fontFamily="Source Serif 4" fontSize="10" fontWeight="700">Microsoft</text>
        {/* McKinsey — competitor */}
        <circle cx="180" cy="60" r="22" fill="#ffffff" stroke="#091426" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="160" y="64" fill="#45474c" fontFamily="Source Serif 4" fontSize="10" fontStyle="italic">McKinsey</text>
        {/* Accenture — competitor */}
        <circle cx="190" cy="180" r="20" fill="#ffffff" stroke="#091426" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="167" y="184" fill="#45474c" fontFamily="Source Serif 4" fontSize="10" fontStyle="italic">Accenture</text>
        {/* Mandiant — intel partner */}
        <circle cx="50" cy="190" r="16" fill="#ffffff" stroke="#75777d" strokeWidth="1" />
        <text x="32" y="194" fill="#75777d" fontFamily="Newsreader" fontSize="9" fontStyle="italic">Mandiant</text>
      </svg>
      <p className="relmap-caption">PwC at center · solid = active partner · dashed = competitor or watching</p>
    </div>
  )
}

function CitationRail() {
  return (
    <div className="rail-block">
      <div className="rail-eyebrow">Sources Cited</div>
      <ul className="citation-list">
        {citations.map((c) => (
          <li key={c.num} id={`cite-${parseInt(c.num)}`} className="citation">
            <div className="citation-num">{c.num}</div>
            <div className="citation-body">
              <p className="citation-title">{c.title}</p>
              <div className="citation-meta">{c.meta}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AutomatedInsight() {
  return (
    <div className="rail-block">
      <div className="insight">
        <div className="rail-eyebrow">Editor's Note</div>
        <p className="insight-body">{insight.body}</p>
        <div className="insight-attr">{insight.attr}</div>
      </div>
    </div>
  )
}

function PipelineValue() {
  return (
    <div className="rail-block">
      <div className="rail-eyebrow">Pipeline Value · est.</div>
      <div className="pipeline">
        <span className="pipeline-value">{pipeline.value}</span>
        <span className="pipeline-delta">{pipeline.delta}</span>
      </div>
    </div>
  )
}

export default function OverviewPage() {
  return (
    <>
      <Dateline />
      <main className="broadsheet">
        <div className="broadsheet-main">
          <LeadArticle />
          <Contradictions />
          <OpportunityMatrix />
        </div>
        <aside className="broadsheet-rail">
          <div className="rail-block">
            <div className="rail-eyebrow">Relationship Map</div>
            <RelationshipMap />
          </div>
          <AutomatedInsight />
          <PipelineValue />
          <CitationRail />
        </aside>
      </main>
    </>
  )
}
