import { useEffect, useRef } from 'react'

// Draws the photo at a tiny resolution and lets CSS scale it up with hard pixel edges
// (`image-rendering: pixelated`). `res` = pixels per side: lower is blockier, higher is more legible
// (48 is clearly pixelated but the face still reads). `zoom` crops in a little so the face gets more pixels.
export default function PixelPhoto({ src, alt, res = 48, zoom = 0.82 }) {
  const ref = useRef(null)
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const c = ref.current
      if (!c) return
      const side = Math.min(img.naturalWidth, img.naturalHeight)
      const crop = side * zoom
      const sx = (img.naturalWidth - crop) / 2
      const sy = (img.naturalHeight - side) / 2 + side * 0.02
      const ctx = c.getContext('2d')
      ctx.imageSmoothingQuality = 'high'
      ctx.filter = 'contrast(1.12) saturate(1.1)'
      ctx.drawImage(img, sx, sy, crop, crop, 0, 0, res, res)
    }
    img.src = src
  }, [src, res, zoom])
  return <canvas ref={ref} className="pixel-photo" width={res} height={res} role="img" aria-label={alt} />
}
