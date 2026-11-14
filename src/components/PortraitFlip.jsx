import { useEffect, useState } from 'react'
import PrintPortrait from './PrintPortrait.jsx'

// The hero portrait as a two-sided card, like a flip profile picture: the front is the tee print, the back is the
// real photo. On load the card starts on the photo and spins one and a half turns to land on the print; after that,
// a click (or Enter / Space) flips it half a turn, always in the same direction. Under prefers-reduced-motion there
// is no load spin and the click swaps sides without turning.
const LOAD_DELAY_MS = 900 // lets the reveal fade-in finish before the spin

export default function PortraitFlip({ site }) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // `turn` counts half turns: even = print side, odd = photo side
  const [turn, setTurn] = useState(reduce ? 0 : 1)
  const [intro, setIntro] = useState(!reduce)

  useEffect(() => {
    if (reduce) return undefined
    const t = setTimeout(() => setTurn(4), LOAD_DELAY_MS)
    return () => clearTimeout(t)
  }, [reduce])

  const flip = () => { setIntro(false); setTurn((n) => n + 1) }
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip() }
  }
  const photo = turn % 2 === 1

  return (
    <div
      className="tee-flip reveal" // keep className constant: re-rendering it would wipe useReveal's `in` class
      data-intro={intro ? '' : undefined}
      role="button"
      tabIndex={0}
      aria-pressed={photo}
      aria-label={photo ? 'Flip to the print' : 'Flip to the photo'}
      onClick={flip}
      onKeyDown={onKey}
    >
      <div className="tee-flip-inner" style={{ transform: `rotateY(${turn * 180}deg)` }}>
        <figure className="tee tee-front" aria-hidden={photo}>
          <span className="tee-label" aria-hidden="true">IL</span>
          <PrintPortrait src={site.photos.me} alt={`Portrait of ${site.name}, as a screen print`} />
          <figcaption className="tee-caption">
            <span>{site.print.kicker}</span>
            <b>{site.print.date}</b>
          </figcaption>
          <span className="tee-hint" aria-hidden="true">Flip ↻</span>
        </figure>
        <figure className="tee tee-photo" aria-hidden={!photo}>
          <img src={site.photos.me} alt={`Photo of ${site.name}`} decoding="async" />
          <span className="tee-hint" aria-hidden="true">Flip ↻</span>
        </figure>
      </div>
    </div>
  )
}
