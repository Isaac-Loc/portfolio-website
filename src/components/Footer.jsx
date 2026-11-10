import { useEffect, useState } from 'react'
import { goToSection, SECTIONS } from '../lib/nav.js'

// Site footer, styled after the inside of a garment: an Index and an Elsewhere column, a stitched care label
// (true facts about the site, with laundry symbols), the live time in New York, and a huge script signature
// that bleeds off the bottom edge like a print running past the hem.
function useNewYorkTime() {
  const fmt = () => new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit' }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000)
    return () => clearInterval(id)
  }, [])
  return t
}

const CARE = [
  // wash at 30, do not bleach, tumble dry low, iron low: drawn as simple line icons
  <svg key="wash" viewBox="0 0 32 24"><path d="M3 5l3 15h20l3-15" /><path d="M3 5q3.25 3 6.5 0t6.5 0 6.5 0 6.5 0" /><text x="16" y="17" textAnchor="middle">30</text></svg>,
  <svg key="bleach" viewBox="0 0 32 24"><path d="M16 3 29 21H3z" /><path d="M9 6l14 15M23 6 9 21" /></svg>,
  <svg key="dry" viewBox="0 0 32 24"><rect x="5" y="2" width="22" height="20" /><circle cx="16" cy="12" r="7" /><circle cx="16" cy="12" r="1.2" className="fill" /></svg>,
  <svg key="iron" viewBox="0 0 32 24"><path d="M4 19h24l-3-10q-1-3-4-3H10" /><path d="M10 6v3" /><circle cx="16" cy="15" r="1.2" className="fill" /></svg>,
]

export default function Footer({ site, route }) {
  const time = useNewYorkTime()
  const go = (id) => (e) => { e.preventDefault(); goToSection(id, route) }
  return (
    <footer id="footer" className="footer">
      <div className="section-inner footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-intro">
            <p className="footer-note">{site.tagline}</p>
            <p className="footer-clock"><i className="dot" aria-hidden="true" />{site.city} <span>{time}</span></p>
          </div>

          <nav className="footer-col" aria-label="Footer index">
            <p className="footer-head">Index</p>
            <ul>
              {SECTIONS.map((s) => <li key={s.id}><a href={`#${s.id}`} onClick={go(s.id)}>{s.label}</a></li>)}
              <li><a href="#/contact" aria-current={route === '/contact' ? 'page' : undefined}>Contact</a></li>
            </ul>
          </nav>

          <nav className="footer-col" aria-label="Elsewhere">
            <p className="footer-head">Elsewhere</p>
            <ul>
              <li><a href={`mailto:${site.email}`}>Email</a></li>
              <li><a href={site.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a></li>
              <li><a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></li>
              <li><a href={site.resume} target="_blank" rel="noopener noreferrer">Résumé <span aria-hidden="true">↗</span></a></li>
            </ul>
          </nav>

          <div className="care-label" role="note" aria-label="Site details">
            <p className="care-size">IL<span>/{String(site.year).slice(2)}</span></p>
            <ul>
              {site.careLabel.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <div className="care-icons" aria-hidden="true">{CARE}</div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {site.year} {site.name}. All rights reserved.</span>
          <span>{site.location}</span>
          <a href="#/" onClick={go('top')}>Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>

      <div className="footer-signature" aria-hidden="true">
        <svg viewBox="0 0 1000 210" preserveAspectRatio="xMidYMin meet">
          <text x="500" y="200" textAnchor="middle" textLength="960" lengthAdjust="spacingAndGlyphs">{site.name}</text>
        </svg>
      </div>
    </footer>
  )
}
