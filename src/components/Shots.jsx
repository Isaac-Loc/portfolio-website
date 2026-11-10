import { useEffect, useRef, useState } from 'react'

// A monochrome picture (colour returns on hover) with a small caps caption. Clicking it opens a larger view in a modal
// <dialog> (Esc, the Close button or a click on the backdrop closes it; the browser traps focus while it is open).
export default function Shots({ src, alt, label }) {
  const [open, setOpen] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  return (
    <>
      <figure className="shot">
        <button type="button" className="shot-pic" onClick={() => setOpen(true)} aria-label={`Enlarge picture: ${alt}`}>
          <img src={src} alt="" loading="lazy" />
          <span className="shot-hint" aria-hidden="true">Enlarge</span>
        </button>
        {label && <figcaption className="shot-cap">{label}</figcaption>}
      </figure>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={label || alt}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
      >
        <div className="lightbox-bar">
          <span>{label}</span>
          <button type="button" className="lightbox-close" onClick={() => setOpen(false)}>Close</button>
        </div>
        {open && <img className="lightbox-img" src={src} alt={alt} />}
      </dialog>
    </>
  )
}
