// Built-in illustrations drawn in the site palette. Used inside cutout frames (deep-green background).
const LED_ROWS = [
  '........',
  '..####..',
  '.######.',
  '##.##.##',
  '########',
  '.#.##.#.',
  '..#..#..',
  '.#....#.',
]

function LedWall() {
  return (
    <svg className="art" viewBox="0 0 100 100" aria-hidden="true">
      {LED_ROWS.flatMap((row, y) =>
        [...row].map((c, x) => (
          <rect
            key={`${x}-${y}`}
            x={9 + x * 10.2} y={9 + y * 10.2} width="8.2" height="8.2" rx="2"
            className={c === '#' ? 'led on' : 'led'}
            style={c === '#' ? { animationDelay: `${((x * 7 + y * 3) % 11) * -0.25}s` } : undefined}
          />
        )),
      )}
    </svg>
  )
}

function Shield() {
  return (
    <svg className="art" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="14" y="62" width="18" height="24" rx="3" className="art-soft" transform="rotate(-12 23 74)" />
      <path d="M50 10 82 22v28c0 22-16 36-32 42C34 86 18 72 18 50V22z" className="art-fill" />
      <path d="M50 18 74 27v23c0 16-11 27-24 33-13-6-24-17-24-33V27z" className="art-deep" />
      <path d="m37 52 9 9 18-22" fill="none" className="art-stroke" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="80" cy="76" r="9" className="art-soft" />
      <rect x="75" y="75" width="10" height="8" rx="1.5" className="art-deep" />
      <path d="M77 75v-3a3 3 0 0 1 6 0v3" fill="none" className="art-stroke" strokeWidth="2" />
    </svg>
  )
}

function Kanban() {
  const cols = [
    { x: 10, cards: [16, 34, 52] },
    { x: 38, cards: [16, 34] },
    { x: 66, cards: [16] },
  ]
  return (
    <svg className="art" viewBox="0 0 100 100" aria-hidden="true">
      {cols.map((c) => (
        <g key={c.x}>
          <rect x={c.x} y="10" width="25" height="80" rx="4" className="art-soft" />
          <rect x={c.x + 4} y="14" width="17" height="4" rx="2" className="art-fill" />
          {c.cards.map((y, i) => (
            <rect key={y} x={c.x + 3} y={y + 8} width="19" height="14" rx="2.5" className={i === 0 ? 'art-fill' : 'art-white'} />
          ))}
        </g>
      ))}
      <path d="M31 40c5 0 4-10 9-10" fill="none" className="art-stroke" strokeWidth="2.2" strokeDasharray="2 3" strokeLinecap="round" />
    </svg>
  )
}

function Auction() {
  return (
    <svg className="art" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="14" y="62" width="16" height="26" rx="3" className="art-soft" />
      <rect x="36" y="48" width="16" height="40" rx="3" className="art-soft" />
      <rect x="58" y="32" width="16" height="56" rx="3" className="art-fill" />
      <path d="M22 50 44 34l16-12" fill="none" className="art-stroke" strokeWidth="3" strokeLinecap="round" strokeDasharray="2 5" />
      <path d="m52 16 12 4-6 11" fill="none" className="art-stroke" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="rotate(14 82 70)">
        <path d="M70 58h18l8 8-18 18-16-16z" className="art-white" />
        <circle cx="80" cy="64" r="2.6" className="art-deep" />
      </g>
    </svg>
  )
}

function Calendar() {
  return (
    <svg className="art" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="12" y="18" width="76" height="70" rx="8" className="art-white" />
      <path d="M12 26a8 8 0 0 1 8-8h60a8 8 0 0 1 8 8v14H12z" className="art-fill" />
      <rect x="28" y="10" width="6" height="16" rx="3" className="art-soft" />
      <rect x="66" y="10" width="6" height="16" rx="3" className="art-soft" />
      {[0, 1, 2, 3].flatMap((r) =>
        [0, 1, 2, 3, 4].map((c) => {
          const hot = (r * 5 + c) % 4 === 1
          return <circle key={`${r}${c}`} cx={24 + c * 13} cy={52 + r * 9} r="3.4" className={hot ? 'art-green' : 'art-soft-dark'} />
        }),
      )}
    </svg>
  )
}

function Cap() {
  return (
    <svg className="art" viewBox="0 0 100 100" aria-hidden="true">
      <path d="m50 22 40 18-40 18L10 40z" className="art-white" />
      <path d="M28 52v14c0 6 10 12 22 12s22-6 22-12V52L50 62z" className="art-fill" />
      <path d="M84 44v22" fill="none" className="art-stroke" strokeWidth="3" strokeLinecap="round" />
      <circle cx="84" cy="70" r="5" className="art-soft" />
    </svg>
  )
}

const ART = { ledwall: LedWall, shield: Shield, kanban: Kanban, auction: Auction, calendar: Calendar, cap: Cap }

export default function Art({ name }) {
  const Comp = ART[name]
  return Comp ? <Comp /> : null
}
