import Big from './Big.jsx'

export default function Skills({ skills }) {
  return (
    <section id="skills" className="sec">
      <Big word="Skills" sub="What I work with" />
      <div className="grid-2">
        {skills.map((g, i) => (
          <div key={g.label} className="panel reveal" style={{ '--d': `${(i % 2) * 0.1}s` }}>
            <p className="label">{g.label}</p>
            <ul className="chips chips-lg">
              {g.items.map((s) => (
                <li key={s.name}>
                  {s.icon && (
                    <img src={`https://cdn.simpleicons.org/${s.icon}`} alt="" width="16" height="16" loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none' }} />
                  )}
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
