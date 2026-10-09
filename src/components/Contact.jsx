// Contact bar at the very end of the home page.
export default function Contact({ site }) {
  return (
    <footer id="contact" className="contact">
      <div className="section-inner contact-inner reveal">
        <h2 className="section-title">Contact</h2>
        <nav className="contact-links" aria-label="Contact links">
          <a className="tag" href={`mailto:${site.email}`}>EMAIL</a>
          <a className="tag" href={site.github} target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a className="tag" href={site.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        </nav>
        <p className="contact-copy">&copy; {site.year} {site.name}</p>
      </div>
    </footer>
  )
}
