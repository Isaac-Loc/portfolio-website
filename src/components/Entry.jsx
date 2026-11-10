import Rich from './Rich.jsx'
import Shots from './Shots.jsx'

// One resume entry: a meta column (number, dates, place), the body (org, title, summary, figures, tags, repo link)
// and, with `image`, a monochrome picture that can be enlarged.
export default function Entry({ index, title, org, href, place, dates, summary, stats = [], tech = [], repo, image, imageAlt = '', imageLabel }) {
  return (
    <article className={`entry reveal${image ? ' has-image' : ''}`}>
      <div className="entry-meta">
        {index && <span className="entry-no">{index}</span>}
        {dates && <span>{dates}</span>}
        {place && <span>{place}</span>}
      </div>
      <div className="entry-body">
        {org && (
          <p className="entry-org">
            {href ? <a href={href} target="_blank" rel="noopener noreferrer">{org} <span aria-hidden="true">↗</span></a> : org}
          </p>
        )}
        <h3 className="entry-title">{title}</h3>
        {summary && <p className="entry-summary"><Rich text={summary} /></p>}
        {stats.length > 0 && (
          <dl className="entry-stats">
            {stats.map((s) => <div key={s.l}><dt>{s.n}</dt><dd>{s.l}</dd></div>)}
          </dl>
        )}
        {tech.length > 0 && <ul className="chips">{tech.map((t) => <li key={t}>{t}</li>)}</ul>}
        {repo && <a className="text-link" href={repo} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
      </div>
      {image && <Shots src={image} alt={imageAlt} label={imageLabel} />}
    </article>
  )
}
