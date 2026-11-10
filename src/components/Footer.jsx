import { goToSection } from '../lib/nav.js'

// Site footer: one slim row. Script name on the left, profile links in the middle, copyright and Back to top on the right.
export default function Footer({ site, route }) {
  const top = (e) => { e.preventDefault(); goToSection('top', route) }
  return (
    <footer id="footer" className="footer">
      <div className="section-inner footer-inner">
        <a className="footer-name" href="#/" onClick={top}>{site.name}</a>
        <nav className="footer-links" aria-label="Elsewhere">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
        </nav>
        <p className="footer-meta">
          <span>&copy; {site.year}</span>
          <a href="#/" onClick={top}>Top <span aria-hidden="true">↑</span></a>
        </p>
      </div>
    </footer>
  )
}
