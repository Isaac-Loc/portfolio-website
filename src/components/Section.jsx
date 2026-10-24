// A home-page section: a numbered label, the pixel title, then the content.
export default function Section({ id, no, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section-inner">
        <div className="section-head reveal">
          <div>
            {no && <p className="section-kicker">{no} / {title.toUpperCase()}</p>}
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  )
}
