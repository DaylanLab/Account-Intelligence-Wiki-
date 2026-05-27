import { HashRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import OperationsPage from './pages/OperationsPage'
import ConciergePage from './pages/ConciergePage'
import PlaceholderPage from './pages/PlaceholderPage'

const NAV: { to: string; label: string; pageTitle: string }[] = [
  { to: '/', label: 'Operations', pageTitle: 'Operations Center' },
  { to: '/concierge', label: 'Concierge', pageTitle: 'Concierge' },
  { to: '/contacts', label: 'Contacts', pageTitle: 'Contacts' },
  { to: '/priorities', label: 'Priorities', pageTitle: 'Priorities' },
  { to: '/opportunities', label: 'Opportunities', pageTitle: 'Opportunities' },
  { to: '/citations', label: 'Citations', pageTitle: 'Citations Index' },
]

function PageTitle() {
  const location = useLocation()
  const match = NAV.find((n) => (n.to === '/' ? location.pathname === '/' : location.pathname.startsWith(n.to)))
  return <div className="masthead-pagetitle">{match?.pageTitle ?? ''}</div>
}

function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link to="/" className="masthead-brand">
          <span className="masthead-brand-main">CVS Wiki</span>
          <span className="masthead-brand-sub">Account Intelligence</span>
        </Link>
        <nav className="masthead-nav">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <PageTitle />
        <div className="masthead-utility">
          <div className="masthead-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Search…" />
          </div>
          <button className="masthead-icon" aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>
          <button className="masthead-icon" aria-label="Settings">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
          </button>
          <div className="masthead-profile" title="Daylan Bester">DB</div>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Masthead />
      <Routes>
        <Route path="/" element={<OperationsPage />} />
        <Route path="/concierge" element={<ConciergePage />} />
        <Route
          path="/contacts"
          element={
            <PlaceholderPage
              title="Contacts"
              body="Stakeholder dossiers for Joyner, Cowhey, Shah, and Mandadi are stubbed in the wiki repo. Full pages roll out in Sprint 3 with Relationship Intelligence."
            />
          }
        />
        <Route
          path="/priorities"
          element={
            <PlaceholderPage
              title="Priorities"
              body="Priority pages (PBM unification, Aetna AI, retail rationalization) live in wiki/priorities/. Rendered view ships with the BU Opportunity Radar in Sprint 5."
            />
          }
        />
        <Route
          path="/opportunities"
          element={
            <PlaceholderPage
              title="Opportunities"
              body="Per-opportunity pages live in wiki/opportunities/. Pipeline view ships with the White-Space Agent in Sprint 5."
            />
          }
        />
        <Route
          path="/citations"
          element={
            <PlaceholderPage
              title="Citations Index"
              body="A consolidated index of every source cited across the wiki. Filed under wiki/intelligence/; rendered index follows in a subsequent pass."
            />
          }
        />
      </Routes>
    </HashRouter>
  )
}
