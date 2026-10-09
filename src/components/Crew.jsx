import Big from './Big.jsx'
import Rich from './Rich.jsx'

export default function Crew({ education, leadership }) {
  return (
    <section id="education" className="sec">
      <Big word="Education" sub="& leadership" />
      <div className="grid-2">
        <article className="panel card reveal">
          <div className="card-head">
            <div>
              <h3>{education.school}</h3>
              <p className="org">{education.degree}</p>
            </div>
            <span className="dates">{education.dates}</span>
          </div>
          <p className="label">Key coursework</p>
          <ul className="chips">{education.coursework.map((c) => <li key={c}>{c}</li>)}</ul>
        </article>
        <article className="panel card reveal" style={{ '--d': '.1s' }}>
          <div className="card-head">
            <div>
              <h3>{leadership.role}</h3>
              <p className="org">{leadership.org}</p>
            </div>
            <span className="dates">{leadership.dates}</span>
          </div>
          <p><Rich text={leadership.summary} /></p>
          <ul className="stats">
            {leadership.stats.map((s) => <li key={s.l}><b>{s.n}</b><span>{s.l}</span></li>)}
          </ul>
          <ul className="chips">{leadership.tech.map((t) => <li key={t}>{t}</li>)}</ul>
        </article>
      </div>
    </section>
  )
}
