// Fixed ocean + sky backdrop. CSS vars --p / --dusk / --night (set by useScrollFx) move the
// sun, drift the clouds, sail the ship and shift the sky from day to sunset to night.
const wave = (amp, len, y) => {
  let d = `M0 ${y}`
  for (let x = 0; x < 2400; x += len) d += ` q${len / 4} ${-amp} ${len / 2} 0 t${len / 2} 0`
  return `${d} V400 H0 Z`
}

const Cloud = ({ className, w = 220 }) => (
  <svg className={`cloud ${className}`} viewBox="0 0 220 80" width={w} aria-hidden="true">
    <path d="M30 70c-18 0-28-10-28-22s10-22 26-22c4-14 18-24 34-24 18 0 30 10 34 22 4-2 8-3 12-3 14 0 24 8 26 20 18 0 30 10 30 22 0 12-10 24-28 24H30z" fill="currentColor" />
  </svg>
)

const stars = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 53) % 100,
  y: (i * 37) % 52,
  s: 1 + (i % 3),
  d: (i % 7) * 0.4,
}))

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="sky sky-day" />
      <div className="sky sky-dusk" />
      <div className="sky sky-night" />

      <div className="stars">
        {stars.map((s, i) => (
          <i key={i} style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
        ))}
      </div>

      <div className="sun" />
      <div className="clouds">
        <Cloud className="c1" w={260} />
        <Cloud className="c2" w={180} />
        <Cloud className="c3" w={320} />
        <Cloud className="c4" w={150} />
      </div>

      <div className="sea">
        <div className="sea-fill" />
        <div className="sea-dusk" />
        <div className="sea-night" />
        <div className="ship">
          <div className="ship-bob">
            <svg viewBox="0 0 220 200" width="210">
              <path d="M110 12v128" stroke="#3a2418" strokeWidth="5" />
              <path d="M110 20h42l-6 8 6 8-6 8 6 8-6 8 6 8-42 0z" fill="#e4312b" />
              <path d="M104 24H64l6 8-6 8 6 8-6 8 6 8-6 8h40z" fill="#f4f1ea" />
              <path d="M70 60c10-8 24-6 30 0" stroke="#e4312b" strokeWidth="4" fill="none" />
              <path d="M110 12l24-8-24-4z" fill="#e4312b" />
              <path d="M30 140h160l-22 40H58z" fill="#7a4524" />
              <path d="M34 148h152" stroke="#e4312b" strokeWidth="5" />
              <circle cx="190" cy="132" r="12" fill="#f4c6a0" />
              <path d="M178 128c4-12 20-12 24 0z" fill="#e8b84a" />
              <path d="M178 128h24" stroke="#e4312b" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <svg className="waves w1" viewBox="0 0 2400 400" preserveAspectRatio="none"><path d={wave(14, 240, 40)} /></svg>
        <svg className="waves w2" viewBox="0 0 2400 400" preserveAspectRatio="none"><path d={wave(18, 300, 40)} /></svg>
        <svg className="waves w3" viewBox="0 0 2400 400" preserveAspectRatio="none"><path d={wave(22, 400, 40)} /></svg>
      </div>
    </div>
  )
}
