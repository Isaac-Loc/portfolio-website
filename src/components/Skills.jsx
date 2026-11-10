// Skills as quiet columns, like the ingredient list on a label: one column per group (italic count + small caps label
// over a hairline), then a plain vertical list in small body text. The long last group (Tools) splits into two columns.
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
