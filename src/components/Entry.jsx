import Rich from './Rich.jsx'

// One resume card for the home page: title, meta line, optional summary, stat chips, and tag list (tech or coursework).
// With `image`, the card becomes two columns and shows the screenshot in a retro window frame (title bar = imageLabel).
export default function Entry({ title, meta, summary, stats = [], tech = [], tagsLabel, href, image, imageAlt = '', imageLabel }) {
  return (
    <article className={`box entry reveal${image ? ' has-image' : ''}`}>
      <div className="entry-body">
      <h3 className="entry-title">{href ? <a href={href} target="_blank" rel="noopener noreferrer">{title}</a> : title}</h3>
      {meta && <p className="entry-meta">{meta}</p>}
      {summary && <p className="entry-summary"><Rich text={summary} /></p>}
      {stats.length > 0 && <ul className="entry-stats">{stats.map((s) => <li key={s.l}><b>{s.n}</b> {s.l}</li>)}</ul>}
      {tagsLabel && <p className="entry-tags-label">{tagsLabel}</p>}
      <ul className="entry-tech">{tech.map((t) => <li key={t}>{t}</li>)}</ul>
      </div>
      {image && (
        <figure className="window entry-shot">
          <div className="window-bar">
            <span>{imageLabel}</span>
            <i className="dots" aria-hidden="true"><b /><b /><b /></i>
          </div>
          <div className="window-body"><div className="shot-pic"><img src={image} alt={imageAlt} loading="lazy" /></div></div>
        </figure>
      )}
    </article>
  )
}
