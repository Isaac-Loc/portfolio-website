import { useEffect, useRef } from 'react'

// Fixed pixel-art backdrop: a faint dot grid plus twinkling 8-bit sparkles on three depth layers.
// Each layer drifts at its own speed as you scroll (and leans a little toward the mouse), so the
// background seems to travel with you. Colours come from the theme's CSS variables.
const SHAPES = {
  plus: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]],
  spark: [[2, 0], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [1, 3], [2, 3], [3, 3], [2, 4]],
  dot: [[0, 0]],
  box: [[0, 0], [1, 0], [0, 1], [1, 1]],
}
const LAYERS = [
  { depth: 0.12, px: 3, alpha: 0.1, share: 0.55 },
  { depth: 0.3, px: 3, alpha: 0.16, share: 0.33 },
  { depth: 0.6, px: 4, alpha: 0.26, share: 0.12 },
]

function rng(seed) {
  let s = seed
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296)
}

export default function Background() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, dpr = 1, raf = 0, parts = []
    let mx = 0, my = 0, tx = 0, ty = 0
    let colors = { accent: '#b3281f', ink: '#1a1a1a' }

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement)
      const dark = document.documentElement.dataset.theme === 'dark'
      colors = { accent: cs.getPropertyValue(dark ? '--accent' : '--primary').trim() || colors.accent, ink: cs.getPropertyValue('--text').trim() || colors.ink }
    }

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const rand = rng(7)
      const total = Math.round((w * h) / 14000)
      parts = []
      LAYERS.forEach((L, li) => {
        const n = Math.round(total * L.share)
        for (let i = 0; i < n; i++) {
          const r = rand()
          const shape = r < 0.15 ? 'plus' : r < 0.25 ? 'spark' : r < 0.85 ? 'dot' : 'box'
          parts.push({ li, shape, x: rand() * w, y: rand() * h, red: rand() < 0.4, phase: rand() * 6, speed: 0.6 + rand() * 1.4 })
        }
      })
    }

    const snap = (v) => Math.round(v)
    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const sy = window.scrollY
      mx += (tx - mx) * 0.06
      my += (ty - my) * 0.06

      // dot grid that slides with the page at a slow depth
      const gap = 56
      const gy = -((sy * 0.2) % gap)
      const gx = -(mx * 6) % gap
      ctx.globalAlpha = 0.07
      ctx.fillStyle = colors.ink
      for (let y = gy; y < h; y += gap) for (let x = gx; x < w; x += gap) ctx.fillRect(snap(x), snap(y), 2, 2)

      for (const p of parts) {
        const L = LAYERS[p.li]
        // wrap so there are always sparkles on screen however far you scroll
        let y = (p.y - sy * L.depth) % h
        if (y < 0) y += h
        let x = (p.x + mx * L.depth * 40) % w
        if (x < 0) x += w
        y += my * L.depth * 40
        // twinkle in hard steps, like the hero sparkles
        const on = reduce ? 1 : Math.sin(t / 1000 * p.speed + p.phase) > -0.35 ? 1 : 0.25
        ctx.globalAlpha = L.alpha * on
        ctx.fillStyle = p.red ? colors.accent : colors.ink
        for (const [dx, dy] of SHAPES[p.shape]) ctx.fillRect(snap(x + dx * L.px), snap(y + dy * L.px), L.px, L.px)
      }
      ctx.globalAlpha = 1
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => { tx = e.clientX / w - 0.5; ty = e.clientY / h - 0.5 }
    const onResize = () => { build(); if (reduce) draw(0) }
    const onScroll = () => { if (reduce) draw(0) }

    readColors()
    build()
    draw(0)
    const themeObs = new MutationObserver(() => { readColors(); if (reduce) draw(0) })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    window.addEventListener('resize', onResize)
    if (!reduce) window.addEventListener('mousemove', onMove, { passive: true })
    else window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      themeObs.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return <canvas ref={ref} className="bg-canvas" aria-hidden="true" />
}
