import { useEffect, useRef } from 'react'

// A dot-matrix recreation of the Theta Tau tabling LED wall (four chained 64x64 HUB75 panels = 256x64, shown here at
// half resolution, 128x32): the banner text scrolls right to left with a chomping Pac-Man chasing it. Lit LEDs use the
// print ink colour, unlit ones a faint grid. Animates only while on screen; under prefers-reduced-motion it shows one
// still frame with the text centred.
const COLS = 128
const ROWS = 32
const SCALE = 2 // each font pixel = 2x2 LEDs
const FONT = {
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  ' ': ['000', '000', '000', '000', '000', '000', '000'],
}
const STEP_MS = 45
const PAC_R = 6.5 // radius in LEDs
const GAP = 12 // LEDs between the end of the text and Pac-Man

function textBitmap(text) {
  const cols = []
  for (const ch of text) {
    const g = FONT[ch] ?? FONT[' ']
    for (let x = 0; x < g[0].length; x++) cols.push(g.map((row) => row[x] === '1'))
    cols.push(Array(7).fill(false)) // 1px letter spacing
  }
  return cols // array of columns, each 7 booleans
}

function readInk() {
  return getComputedStyle(document.documentElement).getPropertyValue('--print').trim() || '#ecebe4'
}

export default function LedBanner({ text = 'THETA TAU', label }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bmp = textBitmap(text.toUpperCase())
    const textW = bmp.length * SCALE
    const span = textW + GAP + PAC_R * 2 + COLS // one loop: everything enters on the right and leaves on the left
    const top = Math.round((ROWS - 7 * SCALE) / 2)
    let ink = readInk()
    let raf = 0, last = 0, offset = reduce ? Math.round((COLS + textW) / 2) - 4 : 0, frame = 0, visible = true, w = 0, cell = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      cell = w / COLS
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(cell * ROWS * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const lit = new Uint8Array(COLS * ROWS)
    const draw = () => {
      lit.fill(0)
      const x0 = COLS - offset // left edge of the text
      for (let c = 0; c < bmp.length; c++) {
        for (let r = 0; r < 7; r++) {
          if (!bmp[c][r]) continue
          for (let dx = 0; dx < SCALE; dx++) for (let dy = 0; dy < SCALE; dy++) {
            const x = x0 + c * SCALE + dx, y = top + r * SCALE + dy
            if (x >= 0 && x < COLS) lit[y * COLS + x] = 1
          }
        }
      }
      // Pac-Man follows the text, facing left, mouth opening and closing
      const pcx = x0 + textW + GAP + PAC_R, pcy = ROWS / 2 - 0.5
      const mouth = (Math.sin(frame * 0.5) * 0.5 + 0.5) * 0.75 + 0.05 // radians half-angle
      for (let y = 0; y < ROWS; y++) {
        for (let x = Math.max(0, Math.floor(pcx - PAC_R - 1)); x < Math.min(COLS, pcx + PAC_R + 1); x++) {
          const dx = x - pcx, dy = y - pcy
          if (dx * dx + dy * dy > PAC_R * PAC_R) continue
          const ang = Math.abs(Math.atan2(dy, -dx)) // 0 = pointing left
          if (ang < mouth) continue
          if (Math.hypot(dx + 0.5, dy + 3.5) < 1.1) continue // eye, above the mouth
          lit[y * COLS + x] = 1
        }
      }
      ctx.clearRect(0, 0, w, cell * ROWS)
      const rad = cell * 0.36
      ctx.fillStyle = ink
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          ctx.globalAlpha = lit[y * COLS + x] ? 1 : 0.09
          ctx.beginPath()
          ctx.arc((x + 0.5) * cell, (y + 0.5) * cell, rad, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
    }

    const tick = (now) => {
      if (!visible) return
      if (now - last >= STEP_MS) {
        last = now
        offset = (offset + 1) % span
        frame += 1
        draw()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    draw()
    const ro = new ResizeObserver(() => { resize(); draw() })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible && !reduce) raf = requestAnimationFrame(tick)
    })
    io.observe(canvas)
    const themeObs = new MutationObserver(() => { ink = readInk(); draw() })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); themeObs.disconnect() }
  }, [text])

  return <canvas ref={ref} className="led-canvas" role="img" aria-label={label ?? `LED wall scrolling "${text}" with Pac-Man`} />
}
