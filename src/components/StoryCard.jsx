import Art from './Art.jsx'
import Rich from './Rich.jsx'

// One card = illustration (or photo) + title + short summary + stats + tech tags.
export default function StoryCard({
  title, org, orgUrl, dates, place, art, image, summary, stats = [], tech = [], chips = [], url, delay = 0,
}) {
  return (
    <article className="card story reveal" style={{ '--d': `${delay}s` }}>
      <div className="story-top">
        <div className="story-art">{image ? <img src={image} alt={title} /> : <Art name={art} />}</div>
        <div className="story-head">
          <h3 className="card-title">{title}</h3>
          <div className="meta">
            {org && (orgUrl
              ? <a className="tag" href={orgUrl} target="_blank" rel="noopener noreferrer">{org.toUpperCase()}</a>
              : <span className="tag">{org.toUpperCase()}</span>)}
            {dates && <span className="note">{dates}</span>}
            {place && <span className="note">{place}</span>}
            {url && <a className="note link-note" href={url} target="_blank" rel="noopener noreferrer">{'GitHub ↗'}</a>}
          </div>
        </div>
      </div>

      {summary && <p className="summary"><Rich text={summary} /></p>}

      {stats.length > 0 && (
        <div className="stats">
          {stats.map((s) => (
            <div key={s.l} className="stat">
              <span className="stat-n">{s.n}</span>
              <span className="stat-l">{s.l}</span>
            </div>
          ))}
        </div>
      )}

      {chips.length > 0 && (
        <div className="chips">{chips.map((c) => <span key={c} className="skill">{c}</span>)}</div>
      )}

      {tech.length > 0 && (
        <div className="meta tech">{tech.map((t) => <span key={t} className="tag">{t.toUpperCase()}</span>)}</div>
      )}
    </article>
  )
}
