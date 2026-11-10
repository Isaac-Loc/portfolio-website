import { useEffect, useState } from 'react'
import PrintPortrait from './PrintPortrait.jsx'

const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
const toRoman = (n) => ROMAN.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v } return s }, '')

// Cycles through the roles with a soft fade (static first role under prefers-reduced-motion).
function useRotate(list, ms = 2600) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = setInterval(() => setI((n) => (n + 1) % list.length), ms)
    return () => clearInterval(t)
  }, [list, ms])
  return i
}

// Hero: the name set in an arched script like the lettering across the back of a hoodie, with the city in small
// caps beneath it; on the right, the portrait as a screen-printed tee graphic.
export default function Hero({ site }) {
  const i = useRotate(site.roles)
  const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span>Portfolio</span><i className="rule" /><span>{toRoman(Number(site.year))}</span></p>
          <h1 className="wordmark" aria-label={site.name}>
            <svg viewBox="0 0 1000 330" aria-hidden="true">
              <path id="wordmark-arc" d="M 30 300 Q 500 60 970 300" fill="none" />
              <text><textPath href="#wordmark-arc" startOffset="50%" textAnchor="middle">{site.name}</textPath></text>
            </svg>
          </h1>
          <p className="wordmark-sub">{site.city}</p>
          <p className="hero-role" aria-live="off">
            <span key={i} className="role-word">{site.roles[i]}</span>
          </p>
          <p className="hero-tagline">{site.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#experience" onClick={go('experience')}>View work</a>
            <a className="btn btn-line" href={site.resume} target="_blank" rel="noopener noreferrer">Résumé</a>
          </div>
          <nav className="hero-links" aria-label="Contact">
            <a href={`mailto:${site.email}`}>Email</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </nav>
        </div>
        <figure className="tee reveal">
          <span className="tee-label" aria-hidden="true">IL</span>
          <PrintPortrait src={site.photos.me} alt={`Portrait of ${site.name}`} />
          <figcaption className="tee-caption">
            <span>{site.print.kicker}</span>
            <b>{site.print.date}</b>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
