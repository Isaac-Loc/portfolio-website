import { Cut, Tape } from './Graphics.jsx'
import Art from './Art.jsx'
import Rich from './Rich.jsx'

// One card = illustration in a cutout + title + short summary + stat stickers + tech tags.
export default function StoryCard({
  title, org, orgUrl, dates, place, art, shape = 'burst', image, summary, stats = [], tech = [], chips = [], url, tilt = 'c1', delay = 0,
}) {
  return (
    <article className={`paper-card story reveal ${tilt}`} style={{ '--d': `${delay}s` }}>
      <Tape className="tape-c" />
      <div className="story-top">
        <div className="story-art">
          <Cut shape={shape} src={image} alt={title}><Art name={art} /></Cut>
        </div>
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
          {stats.map((s, i) => (
            <div key={s.l} className={`stat reveal s${(i % 3) + 1}`} style={{ '--d': `${0.25 + i * 0.12}s` }}>
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
