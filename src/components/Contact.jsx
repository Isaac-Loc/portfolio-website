// Contact footer: an inverted band with the script sign-off, the email and the profile links.
export default function Contact({ site }) {
  return (
    <footer id="contact" className="contact">
      <div className="section-inner reveal">
        <p className="section-kicker"><span>No. 06</span><i className="rule" /><span>Contact</span></p>
        <h2 className="contact-title">Get in touch</h2>
        <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
        <nav className="contact-links" aria-label="Contact links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
        </nav>
        <div className="contact-foot">
          <span>&copy; {site.year} {site.name}</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  )
}
