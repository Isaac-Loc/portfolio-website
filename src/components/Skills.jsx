// Skills as a typographic credits list: one row per group (italic count + label), the skills running as large serif
// words separated by slashes. Hovering a word sets it in italic and dims the rest of its row.
export default function Skills({ groups }) {
  return (
    <div className="credits">
      {groups.map((g) => (
        <section key={g.label} className="credit reveal" aria-label={g.label}>
          <header className="credit-head">
            <span className="credit-count">{String(g.items.length).padStart(2, '0')}</span>
            <h3 className="credit-label">{g.label}</h3>
          </header>
          <ul className="credit-items">
            {g.items.map((i) => <li key={i.name}>{i.name}</li>)}
          </ul>
        </section>
      ))}
    </div>
  )
}
