import Big from './Big.jsx'
import Rich from './Rich.jsx'

export default function Experience({ items }) {
  return (
    <section id="experience" className="sec">
      <Big word="EXPERIENCE" sub="Where I've worked" />
      <div className="stack">
        {items.map((e, i) => (
          <article key={e.id} className="panel card reveal" style={{ '--d': `${i * 0.1}s` }}>
            <div className="card-head">
              <div>
                <h3>{e.role}</h3>
                <p className="org">
                  {e.orgUrl ? <a href={e.orgUrl} target="_blank" rel="noreferrer">{e.org}</a> : e.org} · {e.place}
                </p>
              </div>
              <span className="dates">{e.dates}</span>
            </div>
            <p><Rich text={e.summary} /></p>
            <ul className="stats">
              {e.stats.map((s) => <li key={s.l}><b>{s.n}</b><span>{s.l}</span></li>)}
            </ul>
            <ul className="chips">{e.tech.map((t) => <li key={t}>{t}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
