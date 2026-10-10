import { useEffect, useRef, useState } from 'react'

// Screenshot in a retro window frame. Clicking it opens a larger view in a modal <dialog>
// (Esc, the X button or a click on the dark backdrop closes it; the browser traps focus while it is open).
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
      <figure className="window entry-shot">
        <div className="window-bar">
          <span>{label}</span>
          <i className="dots" aria-hidden="true"><b /><b /><b /></i>
        </div>
        <div className="window-body">
          <button type="button" className="shot-pic shot-zoom" onClick={() => setOpen(true)} aria-label={`Enlarge screenshot: ${alt}`}>
            <img src={src} alt="" loading="lazy" />
            <span className="shot-hint" aria-hidden="true">CLICK TO ENLARGE</span>
          </button>
        </div>
      </figure>
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={label}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
      >
        <figure className="window lightbox-window">
          <div className="window-bar">
            <span>{label}</span>
            <button type="button" className="lightbox-close" onClick={() => setOpen(false)} aria-label="Close enlarged screenshot">X</button>
          </div>
          <div className="window-body">{open && <img className="lightbox-img" src={src} alt={alt} />}</div>
        </figure>
      </dialog>
    </>
  )
}
