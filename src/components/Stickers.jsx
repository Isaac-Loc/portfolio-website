// Artistic die-cut stickers for the hero. Each blends craft + tech (circuits, LEDs, signals) in the site palette.

const HEART = [
  '.##.##.',
  '#######',
  '#######',
  '.#####.',
  '..###..',
  '...#...',
]

function CircuitFlower() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="47" className="art-deep" />
      <g fill="none" stroke="#8be8ad" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 92V58" />
        <path d="M50 82H33V72" />
        <path d="M50 75H67V66" />
      </g>
      <circle cx="33" cy="70" r="3.4" className="art-fill" />
      <circle cx="67" cy="64" r="3.4" className="art-fill" />
      <g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <rect key={a} x="45.5" y="12" width="9" height="15" rx="3.5" transform={`rotate(${a} 50 38)`} className={i % 2 ? 'art-white' : 'art-fill'} />
        ))}
      </g>
      <circle cx="50" cy="38" r="8.5" className="art-white" />
      <circle cx="50" cy="38" r="3.6" className="art-green" />
    </svg>
  )
}

function PixelHeart() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {HEART.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === '#' ? (
            <rect
              key={`${x}-${y}`} x={7 + x * 12.6} y={14 + y * 12.6} width="11" height="11" rx="2.5"
              className={(x + y) % 3 === 0 ? 'art-fill led-twinkle' : 'art-green led-twinkle'}
              style={{ animationDelay: `${((x * 5 + y * 3) % 9) * -0.3}s` }}
            />
          ) : null,
        ),
      )}
    </svg>
  )
}

function Cassette() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect x="4" y="20" width="92" height="60" rx="7" className="art-deep" />
      <rect x="12" y="26" width="76" height="30" rx="3.5" className="art-white" />
      <text x="16" y="34" fontSize="5.5" fontFamily="Silkscreen, monospace" className="art-green">SIDE A</text>
      <path d="M16 38h68" stroke="#8be8ad" strokeWidth="1.4" />
      {[34, 66].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="46" r="7.5" className="art-deep" />
          <g className="spin" stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
            <path d={`M${cx} 41.5v9M${cx - 4} 44l8 4.6M${cx + 4} 44l-8 4.6`} />
          </g>
        </g>
      ))}
      <path d="M26 80 32 63h36l6 17z" className="art-soft" />
      <circle cx="35" cy="72" r="2.2" className="art-fill" />
      <circle cx="65" cy="72" r="2.2" className="art-fill" />
    </svg>
  )
}

function Constellation() {
  const pts = [[24, 64], [38, 36], [58, 50], [74, 26], [78, 70], [50, 80]]
  const lines = [[0, 1], [1, 2], [2, 3], [2, 4], [2, 5], [0, 5]]
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="47" className="art-deep" />
      <g stroke="#8be8ad" strokeWidth="1.6" strokeLinecap="round" opacity=".85">
        {lines.map(([a, b]) => <line key={`${a}${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />)}
      </g>
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 2 ? 6 : 3.8} className={i === 2 ? 'art-fill' : 'art-white'} />
      ))}
      <path d="M20 22c0-4 4-4 4-8 0 4 4 4 4 8-4 0-4 4-4 8 0-4-4-4-4-8z" className="art-white" transform="translate(4 0) scale(.9)" />
      <circle cx="84" cy="44" r="1.8" className="art-white" />
      <circle cx="16" cy="44" r="1.6" className="art-white" />
      <circle cx="66" cy="84" r="1.6" className="art-white" />
    </svg>
  )
}

function Vinyl() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <g className="spin slow">
        <circle cx="50" cy="50" r="47" fill="#0d3b22" />
        {[40, 34, 28, 22].map((r) => <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="1.2" />)}
        <path d="M50 8a42 42 0 0 1 36 20" fill="none" stroke="rgba(255,255,255,.35)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="50" r="15" className="art-fill" />
        <path d="M50 37v26" stroke="#12502c" strokeWidth="2" opacity=".35" />
        <circle cx="50" cy="50" r="3" className="art-deep" />
      </g>
    </svg>
  )
}

const STICKERS = { flower: CircuitFlower, heart: PixelHeart, cassette: Cassette, constellation: Constellation, vinyl: Vinyl }

export default function Sticker({ name, className = '' }) {
  const Comp = STICKERS[name]
  return Comp ? <span className={`art-sticker ${className}`} data-sticker={name}><Comp /></span> : null
}
