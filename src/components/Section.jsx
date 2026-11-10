// A home-page section: a numbered kicker with a hairline rule, the script title, then the content.
export default function Section({ id, no, title, label, children }) {
  return (
    <section id={id} className="section">
      <div className="section-inner">
        <header className="section-head reveal">
          <p className="section-kicker"><span>No. {no}</span><i className="rule" /><span>{label ?? title}</span></p>
          <h2 className="section-title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
