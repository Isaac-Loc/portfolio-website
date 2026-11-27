// A home-page section: the script title, then the content.
// Sections are separated by whitespace and one short centred rule (see .section + .section in style.css).
export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section-inner">
        <header className="section-head reveal">
          <h2 className="section-title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
