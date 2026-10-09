import { useEffect, useRef, useState } from 'react'

// The original photo, revealed by a "loading" animation: it starts as a few coarse, grainy pixels and
// sharpens step by step (more pixels, less noise) until it hands over to the untouched original image.
// Under prefers-reduced-motion the original shows immediately.
const STEPS = [6, 10, 16, 26, 40, 64, 100, 160, 256] // pixels per side at each step
const STEP_MS = 60
const SIZE = 320 // canvas backing size
// Zoom on the subject: the square crop is 1/ZOOM of the short side, centred horizontally and at CY (fraction of height).
// Keep in sync with `.pixel-wrap img` in style.css (same scale and transform-origin).
const ZOOM = 1.36
const CY = 0.533

export default function PixelPhoto({ src, alt }) {
  const imgRef = useRef(null)
  const canvasRef = useRef(null)
  const [done, setDone] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (done) return undefined
    const img = imgRef.current
    const canvas = canvasRef.current
    if (!img || !canvas) return undefined
    const ctx = canvas.getContext('2d')
    const tiny = document.createElement('canvas')
    const tctx = tiny.getContext('2d', { willReadFrequently: true })
    let timer
    let cancelled = false

    const draw = (i) => {
      const res = STEPS[i]
      const side = Math.min(img.naturalWidth, img.naturalHeight) / ZOOM
      const sx = (img.naturalWidth - side) / 2
      const sy = Math.min(Math.max(img.naturalHeight * CY - side / 2, 0), img.naturalHeight - side)
      tiny.width = res
      tiny.height = res
      tctx.imageSmoothingQuality = 'high'
      tctx.drawImage(img, sx, sy, side, side, 0, 0, res, res)
      const amp = 70 * (1 - i / (STEPS.length - 1)) // grain fades as it sharpens
      if (amp > 1) {
        const d = tctx.getImageData(0, 0, res, res)
        for (let p = 0; p < d.data.length; p += 4) {
          const n = (Math.random() - 0.5) * 2 * amp
          d.data[p] += n; d.data[p + 1] += n; d.data[p + 2] += n
        }
        tctx.putImageData(d, 0, 0)
      }
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(tiny, 0, 0, SIZE, SIZE)
    }

    const run = () => {
      let i = 0
      const tick = () => {
        if (cancelled) return
        draw(i)
        i += 1
        if (i < STEPS.length) timer = setTimeout(tick, STEP_MS)
        else timer = setTimeout(() => !cancelled && setDone(true), STEP_MS)
      }
      tick()
    }

    if (img.complete && img.naturalWidth) run()
    else img.decode().then(run).catch(() => setDone(true))
    return () => { cancelled = true; clearTimeout(timer) }
  }, [done, src])

  return (
    <div className={`pixel-wrap${done ? ' done' : ''}`}>
      <img ref={imgRef} src={src} alt={alt} />
      <canvas ref={canvasRef} width={SIZE} height={SIZE} aria-hidden="true" />
    </div>
  )
}
