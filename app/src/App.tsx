import { HashRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import OverviewPage from './pages/OverviewPage'
import PlaceholderPage from './pages/PlaceholderPage'

function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link to="/" className="masthead-brand">
          Cyber Wiki<span className="masthead-brand-sub">— Practice Intelligence</span>
        </Link>
        <nav className="masthead-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Overview
          </NavLink>
          <NavLink to="/priorities" className={({ isActive }) => (isActive ? 'active' : '')}>
            Priorities
          </NavLink>
          <NavLink to="/contacts" className={({ isActive }) => (isActive ? 'active' : '')}>
            Contacts
          </NavLink>
          <NavLink to="/opportunities" className={({ isActive }) => (isActive ? 'active' : '')}>
            Opportunities
          </NavLink>
          <NavLink to="/citations" className={({ isActive }) => (isActive ? 'active' : '')}>
            Citations
          </NavLink>
        </nav>
        <div className="masthead-utility">Vol. I · No. 1</div>
      </div>
    </header>
  )
}

function Colophon() {
  return (
    <footer className="colophon">
      <div>
        Maintained by an autonomous editor per the schema in{' '}
        <a href="https://github.com/DaylanLab/Account-Intelligence-Wiki-/blob/main/AGENTS.md">AGENTS.md</a>.
        Sprint 1 prototype · vendor and regulatory context from public sources · client identities and PwC internal data are illustrative.
      </div>
      <div>Last sweep: 2026-05-24 · Edition Q1 2026</div>
    </footer>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Masthead />
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route
          path="/priorities"
          element={
            <PlaceholderPage
              title="Priorities"
              body="The CVS priority pages are drafted in the wiki repo but not yet wired into this view. The agent is mid-pass on the priority/opportunity cross-linking."
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <PlaceholderPage
              title="Contacts"
              body="Stakeholder dossiers for Joyner, Cowhey, Shah, and Mandadi are stubbed in the wiki repo. Full pages roll out with the next ingest pass."
            />
          }
        />
        <Route
          path="/opportunities"
          element={
            <PlaceholderPage
              title="Opportunities"
              body="The opportunity matrix on the overview page is the live shortlist. Full per-opportunity pages are in the wiki repo at wiki/opportunities/."
            />
          }
        />
        <Route
          path="/citations"
          element={
            <PlaceholderPage
              title="Citations Index"
              body="A consolidated index of every source cited across the wiki. Filed under wiki/intelligence/ in the repo; the rendered index follows in a subsequent pass."
            />
          }
        />
      </Routes>
      <Colophon />
    </HashRouter>
  )
}
