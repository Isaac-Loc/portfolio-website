// Small shared effects: floating particles and a wiggle. Used by the hero widgets and the header nav.
const SVG_NS = 'http://www.w3.org/2000/svg'

export const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Spawns `count` little svg shapes (symbol ids live in <SvgDefs/>) that burst out from (x, y), then remove themselves.
// Pass `fixed: true` to spawn them on <body> at viewport coordinates (used by the header); otherwise they are
// appended to `parent` and sized in cqw (used inside the hero stage).
export function particles(parent, x, y, symbol, count, { rise = false, spread = 110, size = 2.2, fixed = false } = {}) {
  if (reduced()) return
  const host = fixed ? document.body : parent
  const origin = fixed ? { left: 0, top: 0 } : parent.getBoundingClientRect()
  for (let i = 0; i < count; i += 1) {
    const p = document.createElementNS(SVG_NS, 'svg')
    p.setAttribute('class', 'particle')
    p.innerHTML = `<use href="#${symbol}"/>`
    p.style.left = `${x - origin.left}px`
    p.style.top = `${y - origin.top}px`
    const scale = 0.7 + Math.random() * 0.8
    if (fixed) {
      p.style.position = 'fixed'
      p.style.zIndex = '9999'
      p.style.width = `${size * scale * 0.6}rem`
      p.style.margin = '-.7rem 0 0 -.7rem'
    } else {
      p.style.width = `${size * scale}cqw`
    }
    p.style.fill = i % 2 ? '#8be8ad' : '#1f8a4c'
    host.appendChild(p)
    const angle = rise ? -Math.PI / 2 + (Math.random() - 0.5) * 1.2 : Math.random() * Math.PI * 2
    const dist = spread * (0.5 + Math.random())
    const dx = Math.cos(angle) * dist
    const dy = Math.sin(angle) * dist
    p.animate(
      [
        { translate: '0 0', scale: 0.3, opacity: 1, rotate: '0deg' },
        { translate: `${dx}px ${dy}px`, scale: 1, opacity: 1, rotate: `${(Math.random() - 0.5) * 120}deg`, offset: 0.6 },
        { translate: `${dx * 1.15}px ${dy * 1.15 + (rise ? 0 : 30)}px`, scale: 0.6, opacity: 0, rotate: `${(Math.random() - 0.5) * 200}deg` },
      ],
      { duration: 800 + Math.random() * 500, easing: 'cubic-bezier(.2,.8,.3,1)' },
    ).onfinish = () => p.remove()
  }
}

export function wiggle(el) {
  if (reduced()) return
  el.animate(
    [
      { rotate: '0deg', scale: 1 },
      { rotate: '-9deg', scale: 1.14 },
      { rotate: '7deg', scale: 1.08 },
      { rotate: '-3deg', scale: 1.04 },
      { rotate: '0deg', scale: 1 },
    ],
    { duration: 650, easing: 'ease-out' },
  )
}
