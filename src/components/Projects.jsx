import Big from './Big.jsx'
import Rich from './Rich.jsx'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="sec">
      <Big word="Projects" sub="Things I've built" />
      <div className="grid-2">
        {projects.map((p, i) => (
          <article key={p.id} className="panel card reveal" style={{ '--d': `${i * 0.1}s` }}>
            <h3>{p.title}</h3>
            <p><Rich text={p.summary} /></p>
            <ul className="stats">
              {p.stats.map((s) => <li key={s.l}><b>{s.n}</b><span>{s.l}</span></li>)}
            </ul>
            <ul className="chips">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>
            {p.url && <a className="link" href={p.url} target="_blank" rel="noreferrer">View on GitHub →</a>}
          </article>
        ))}
      </div>
    </section>
  )
}
