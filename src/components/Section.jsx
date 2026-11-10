// A home-page section: the script title with its number set as a small italic superscript, then the content.
// Sections are separated by whitespace and one short centred rule (see .section + .section in style.css).
export default function Section({ id, no, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section-inner">
        <header className="section-head reveal">
          <h2 className="section-title">{title}{no && <sup className="section-no" aria-hidden="true">{no}</sup>}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
