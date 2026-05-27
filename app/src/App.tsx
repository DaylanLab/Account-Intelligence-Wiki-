import { HashRouter, Routes, Route, NavLink, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import OverviewPage from './pages/OverviewPage'
import PlaceholderPage from './pages/PlaceholderPage'

function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link to="/" className="masthead-brand">
          CVS Wiki<span className="masthead-brand-sub">— Account Intelligence</span>
        </Link>
        <nav className="masthead-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/briefing" className={({ isActive }) => (isActive ? 'active' : '')}>
            Briefing
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
        Sprint 1 prototype · public sources are real · client identities and PwC internal data are illustrative.
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
        <Route path="/" element={<HomePage />} />
        <Route path="/briefing" element={<OverviewPage />} />
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
          path="/opportunities"
          element={
            <PlaceholderPage
              title="Opportunities"
              body="The opportunity matrix on the Briefing page is the live shortlist. Per-opportunity pages are in wiki/opportunities/ in the repo. Full rendered pages ship with the White-Space Agent in Sprint 5."
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
