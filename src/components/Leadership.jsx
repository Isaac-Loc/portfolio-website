import Rich from './Rich.jsx'
import LedBanner from './LedBanner.jsx'

// Leadership as a feature spread: the LED wall that was built for chapter tabling, recreated as a live dot-matrix
// panel (LedBanner), beside the role, the story, the figures and the stack.
export default function Leadership({ item }) {
  const { role, org, dates, summary, stats = [], tech = [], repo, banner } = item
  return (
    <article className="lead reveal">
      <figure className="lead-wall">
        <div className="lead-panel">
          <LedBanner text={banner} />
        </div>
        <figcaption className="lead-cap">
          <span>The chapter LED wall</span>
          <span>ESP32-S3 · 4 × HUB75 64×64 · 256×64</span>
        </figcaption>
      </figure>
      <div className="lead-body">
        <p className="entry-org">{org}</p>
        <h3 className="lead-title">{role}</h3>
        <p className="lead-dates">{dates}</p>
        <p className="entry-summary"><Rich text={summary} /></p>
        {stats.length > 0 && (
          <dl className="lead-stats">
            {stats.map((s) => <div key={s.l}><dt>{s.n}</dt><dd>{s.l}</dd></div>)}
          </dl>
        )}
        {tech.length > 0 && <ul className="chips">{tech.map((t) => <li key={t}>{t}</li>)}</ul>}
        {repo && <a className="text-link" href={repo} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
      </div>
    </article>
  )
}
