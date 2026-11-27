import { useEffect, useState } from 'react'
import PortraitFlip from './PortraitFlip.jsx'
import Marquee from './Marquee.jsx'

const ROMAN = [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']]
const toRoman = (n) => ROMAN.reduce((s, [v, r]) => { while (n >= v) { s += r; n -= v } return s }, '')

// Contact icons (Lucide-style outlines drawn in currentColor, so they follow the theme)
const ICONS = {
  email: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>,
  github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
}
const Icon = ({ name }) => (
  <svg className="link-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[name]}</svg>
)

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

// Hero: the name set in a straight script line (was arched, straightened at the user's request 2026-11-27), with the city in small
// caps beneath it; on the right, the portrait as a screen-printed tee graphic
// that flips over to the real photo (PortraitFlip). The ticker runs along the bottom of
// the hero so it is part of the first screen.
export default function Hero({ site }) {
  const i = useRotate(site.roles)
  const go = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <p className="eyebrow"><span>Portfolio</span><i className="rule" /><span>{toRoman(Number(site.year))}</span></p>
          <h1 className="wordmark" aria-label={site.name}>
            <svg viewBox="0 0 1000 290" aria-hidden="true">
              <path id="wordmark-arc" d="M 30 215 L 970 215" fill="none" />
              <text><textPath href="#wordmark-arc" startOffset="50%" textAnchor="middle">{site.name}</textPath></text>
            </svg>
          </h1>
          <p className="wordmark-sub">{site.city}</p>
          <p className="hero-role" aria-live="off">
            <span key={i} className="role-word">{site.roles[i]}</span>
          </p>
          <p className="hero-tagline">{site.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href="#experience" onClick={go('experience')}>View work</a>          </div>
          <nav className="hero-links" aria-label="Contact">
            <a href={`mailto:${site.email}`}><Icon name="email" />Email</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer"><Icon name="github" />GitHub</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" />LinkedIn</a>
          </nav>
        </div>
        <PortraitFlip site={site} />
      </div>
      <Marquee items={site.marquee} />
    </section>
  )
}
