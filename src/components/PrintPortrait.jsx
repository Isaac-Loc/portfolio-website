import { useEffect, useRef } from 'react'

// The hero "tee print": the portrait rendered like a screen-printed graphic shirt. The photo is cropped around the
// subject, turned into high-contrast stochastic grain (ink = light areas), and its edges fray into specks. The left
// side (the shoulder and back) burns away into drifting ash. On load the grain assembles from scattered noise; under prefers-reduced-motion
// the finished print shows straight away and nothing drifts.
const COLS = 220
// Crop of the source photo (fractions of its width/height) and the subject shape inside that crop.
const CROP = { x: 0.31, y: 0.19, w: 0.58, h: 0.81 }
const BLOBS = [
  { cx: 0.36, cy: 0.33, rx: 0.25, ry: 0.3 }, // head
  { cx: 0.55, cy: 0.88, rx: 0.4, ry: 0.4 }, // shoulders / torso
]
const TONE = { lo: 0.3, hi: 0.92, gamma: 1.5, sharpen: 2.2, floor: 0.13 }
const ASSEMBLE_MS = 1700
const ASH = 70

function hash(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0
  h = (h ^ (h >>> 13)) * 1274126177
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296
}
function noise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y)
  const xf = x - xi, yf = y - yi
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf)
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
const fbm = (x, y) => noise(x, y) * 0.55 + noise(x * 2.3, y * 2.3) * 0.3 + noise(x * 5.1, y * 5.1) * 0.15
const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)

function readInk() {
  return getComputedStyle(document.documentElement).getPropertyValue('--print').trim() || '#ecebe4'
}
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export default function PrintPortrait({ src, alt }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const img = new Image()
    img.src = src
    let raf = 0, visible = true, start = 0, cancelled = false
    let W = 0, H = 0, cells = null, ash = [], ink = hexToRgb(readInk())
    let frame = null

    const prepare = () => {
      const sw = img.naturalWidth * CROP.w, sh = img.naturalHeight * CROP.h
      W = COLS
      H = Math.round(COLS * (sh / sw))
      canvas.width = W
      canvas.height = H
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      const octx = off.getContext('2d', { willReadFrequently: true })
      octx.drawImage(img, img.naturalWidth * CROP.x, img.naturalHeight * CROP.y, sw, sh, 0, 0, W, H)
      const px = octx.getImageData(0, 0, W, H).data
      const lum = new Float32Array(W * H)
      for (let i = 0; i < W * H; i++) lum[i] = (0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]) / 255
      // local contrast (unsharp mask against a box blur) so edges like glasses, ear and collar survive the grain
      const blur = new Float32Array(W * H)
      const R = 5
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          let s = 0, n = 0
          for (let dy = -R; dy <= R; dy += 2) {
            const yy = y + dy
            if (yy < 0 || yy >= H) continue
            for (let dx = -R; dx <= R; dx += 2) {
              const xx = x + dx
              if (xx < 0 || xx >= W) continue
              s += lum[yy * W + xx]; n++
            }
          }
          blur[y * W + x] = s / n
        }
      }
      cells = new Array(W * H)
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const i = y * W + x
          const sharp = lum[i] + (lum[i] - blur[i]) * TONE.sharpen
          const tone = Math.pow(clamp((sharp - TONE.lo) / (TONE.hi - TONE.lo)), TONE.gamma)
          const fx = x / W, fy = y / H
          let d = 9
          for (const B of BLOBS) d = Math.min(d, Math.hypot((fx - B.cx) / B.rx, (fy - B.cy) / B.ry))
          const ragged = (fbm(fx * 7, fy * 7) - 0.5) * 0.7
          let mask = clamp((1.05 - (d + ragged)) / 0.32)
          // the right side burns away (like the figure on the shirt); it rises toward the top
          const burn = clamp((fx - 0.62 + (1 - fy) * 0.12) / 0.3) * (0.55 + fbm(fx * 11 + 3, fy * 11) * 0.9)
          mask = clamp(mask - burn)
          const t = hash(x + 11, y + 97)
          // a faint grain floor inside the subject so dark hair still reads as a silhouette
          const ink = Math.max(tone, TONE.floor * mask)
          cells[i] = { on: ink * mask > t, born: hash(x + 5, y + 3) * 0.75 + (1 - mask) * 0.25 }
        }
      }
      // ash: specks that drift up and to the right off the burning edge
      ash = Array.from({ length: ASH }, (_, k) => spawn(k, true))
    }

    function spawn(k, scatter) {
      const r = (s) => hash(k * 31 + s, Math.floor(performance.now() / 97) + s * 7)
      return {
        x: W * (0.6 + r(1) * 0.3),
        y: H * (0.3 + r(2) * 0.7),
        vx: 0.04 + r(3) * 0.12,
        vy: -(0.05 + r(4) * 0.15),
        life: scatter ? r(5) : 0,
        span: 0.004 + r(6) * 0.006,
        size: r(7) < 0.2 ? 2 : 1,
      }
    }

    const draw = (now) => {
      if (cancelled) return
      if (!start) start = now
      const p = reduce ? 1 : Math.min(1, (now - start) / ASSEMBLE_MS)
      const ease = 1 - Math.pow(1 - p, 3)
      if (!frame || frame.width !== W) frame = ctx.createImageData(W, H)
      const d = frame.data
      d.fill(0)
      const [ir, ig, ib] = ink
      for (let i = 0; i < cells.length; i++) {
        const c = cells[i]
        let show = c.on && c.born <= ease
        // while assembling, a little loose grain flickers in the not-yet-printed area
        if (!show && p < 1 && c.on && hash(i, Math.floor(now / 60)) > 0.985) show = true
        if (show) {
          const o = i * 4
          d[o] = ir; d[o + 1] = ig; d[o + 2] = ib; d[o + 3] = 255
        }
      }
      ctx.putImageData(frame, 0, 0)
      if (!reduce) {
        ctx.fillStyle = `rgb(${ir},${ig},${ib})`
        ash.forEach((a, k) => {
          a.x += a.vx
          a.y += a.vy
          a.life += a.span
          if (a.life >= 1 || a.x > W || a.y < 0) { ash[k] = spawn(k + Math.floor(now), false); return }
          const alpha = Math.sin(a.life * Math.PI) * ease
          if (alpha <= 0.05) return
          ctx.globalAlpha = alpha
          ctx.fillRect(Math.round(a.x), Math.round(a.y), a.size, a.size)
        })
        ctx.globalAlpha = 1
      }
      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    const io = new IntersectionObserver(([e]) => {
      const was = visible
      visible = e.isIntersecting
      if (visible && !was && cells && !reduce) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    const themeObs = new MutationObserver(() => {
      ink = hexToRgb(readInk())
      if (reduce && cells) draw(performance.now())
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    img.decode()
      .then(() => { if (cancelled) return; prepare(); raf = requestAnimationFrame(draw) })
      .catch(() => {})
    return () => { cancelled = true; cancelAnimationFrame(raf); io.disconnect(); themeObs.disconnect() }
  }, [src])

  return <canvas ref={canvasRef} className="print-canvas" role="img" aria-label={alt} />
}
