import ScrollButton from './ScrollButton.jsx'
function SkillTile({ item, i }) {
  return (
    <span className="skill-tile reveal" style={{ '--d': `${i * 0.04}s` }}>
      {item.icon ? (
        <img
          src={`https://cdn.simpleicons.org/${item.icon}/462c2f`}
          alt=""
          loading="lazy"
          onError={(e) => { e.currentTarget.replaceWith(Object.assign(document.createElement('i'), { className: 'dot' })) }}
        />
      ) : <i className="dot" />}
      <span>{item.name}</span>
    </span>
  )
}

export default function Skills({ skills }) {
  return (
    <section id="skills" className="skills">
      <ScrollButton to="education" up edge="top" />
      <h2 className="section-title reveal"><span className="sticker-text">Skills</span></h2>
      <div className="skill-groups">
        {skills.map((g) => (
          <div key={g.label} className="skill-group reveal">
            <span className="tag">{g.label.toUpperCase()}</span>
            <div className="tiles">
              {g.items.map((s, i) => <SkillTile key={s.name} item={s} i={i} />)}
            </div>
          </div>
        ))}
      </div>
      <ScrollButton to="contact" />
    </section>
  )
}
