import { useEffect } from 'react'

// Everything on the hero poster is a playful object: it pops on hover (CSS) and reacts when clicked or tapped
// (sparkles, hearts, notes, wiggles). There is deliberately no dragging.
const SELECTOR = '.sparkle, .art-sticker, .sticker-text, .main-cut, .main-img, .burst, .stamp, .a1, .sc1'
const SVG_NS = 'http://www.w3.org/2000/svg'
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function particles(stage, x, y, symbol, count, { rise = false, spread = 110, size = 2.2 } = {}) {
  if (reduced()) return
  const sr = stage.getBoundingClientRect()
  for (let i = 0; i < count; i += 1) {
    const p = document.createElementNS(SVG_NS, 'svg')
    p.setAttribute('class', 'particle')
    p.innerHTML = `<use href="#${symbol}"/>`
    p.style.left = `${x - sr.left}px`
    p.style.top = `${y - sr.top}px`
    p.style.width = `${size * (0.7 + Math.random() * 0.8)}cqw`
    p.style.fill = i % 2 ? '#8be8ad' : '#1f8a4c'
    stage.appendChild(p)
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

function wiggle(el) {
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

function speedUp(el) {
  el.classList.add('fast')
  setTimeout(() => el.classList.remove('fast'), 2500)
}

function react(el, stage, x, y) {
  if (el.classList.contains('art-sticker')) {
    switch (el.dataset.sticker) {
      case 'heart':
        wiggle(el)
        particles(stage, x, y, 'heart', 9, { rise: true, size: 2.4 })
        break
      case 'cassette':
      case 'vinyl':
        wiggle(el)
        speedUp(el)
        particles(stage, x, y, 'note', 7, { rise: true, size: 2.4 })
        break
      case 'flower':
        if (!reduced()) {
          el.animate(
            [{ rotate: '0deg', scale: 1 }, { rotate: '200deg', scale: 1.4 }, { rotate: '360deg', scale: 1 }],
            { duration: 900, easing: 'cubic-bezier(.3,1.4,.5,1)' },
          )
        }
        particles(stage, x, y, 'sparkle', 9)
        break
      default:
        wiggle(el)
        particles(stage, x, y, 'sparkle', 9)
    }
  } else if (el.classList.contains('stamp')) {
    if (!reduced()) el.animate([{ rotate: '0deg' }, { rotate: '360deg' }], { duration: 900, easing: 'cubic-bezier(.3,1,.4,1)' })
    particles(stage, x, y, 'sparkle', 8, { size: 1.8 })
  } else if (el.classList.contains('sparkle')) {
    if (!reduced()) {
      el.animate(
        [{ scale: 1, rotate: '0deg' }, { scale: 1.8, rotate: '180deg' }, { scale: 1, rotate: '360deg' }],
        { duration: 700, easing: 'ease-out' },
      )
    }
    particles(stage, x, y, 'sparkle', 10, { spread: 90, size: 1.8 })
  } else {
    const title = el.classList.contains('sticker-text')
    wiggle(el)
    particles(stage, x, y, 'sparkle', title ? 10 : 8, { size: title ? 2 : 1.8 })
  }
}

export default function useHeroInteractions(stageRef) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return undefined

    stage.querySelectorAll(SELECTOR).forEach((el) => el.classList.add('ix'))

    const onClick = (e) => {
      const el = e.target.closest(SELECTOR)
      if (el && stage.contains(el)) react(el, stage, e.clientX, e.clientY)
    }

    stage.addEventListener('click', onClick)
    return () => stage.removeEventListener('click', onClick)
  }, [stageRef])
}
