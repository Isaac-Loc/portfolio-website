// A home-page section: pixel title, an optional ARCHIVE button that routes to the full page, then the content.
export default function Section({ id, title, archive, children }) {
  return (
    <section id={id} className="section">
      <div className="section-inner">
        <div className="section-head reveal">
          <h2 className="section-title">{title}</h2>
          {archive && <a className="tag tag-archive" href={`#${archive}`}>ARCHIVE &gt;</a>}
        </div>
        {children}
      </div>
    </section>
  )
}
