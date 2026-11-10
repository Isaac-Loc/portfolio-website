// Site footer: an inverted band. On the home page it is the full sign-off (script title, email, a link to the
// Contact page, profile links); on the Contact page (`compact`) only the bottom row is shown.
export default function Contact({ site, compact = false }) {
  return (
    <footer id="contact" className={`contact${compact ? ' compact' : ''}`}>
      <div className="section-inner reveal">
        {!compact && (
          <>
            <p className="section-kicker"><span>No. 06</span><i className="rule" /><span>Contact</span></p>
            <h2 className="contact-title">Get in touch</h2>
            <a className="contact-email" href="#/contact">Send a message <span aria-hidden="true">→</span></a>
            <nav className="contact-links" aria-label="Contact links">
              <a href={`mailto:${site.email}`}>Email</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
            </nav>
          </>
        )}
        <div className="contact-foot">
          <span>&copy; {site.year} {site.name}</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  )
}
