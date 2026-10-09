// Shared SVG symbols plus small building blocks used across the collage.

export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="sparkle" viewBox="0 0 100 100"><path d="M50 0C54 34 66 46 100 50C66 54 54 66 50 100C46 66 34 54 0 50C34 46 46 34 50 0Z" /></symbol>
        <symbol id="asterisk" viewBox="0 0 100 100"><path d="M44 0h12l-2 34 26-22 8 9-30 22 34 4v12l-34 4 30 22-8 9-26-22 2 34H44l2-34-26 22-8-9 30-22-34-4V42l34-4-30-22 8-9 26 22z" /></symbol>
        <symbol id="arrow" viewBox="0 0 120 80">
          <path d="M4 70C30 70 40 20 100 14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 9" />
          <path d="M84 2l22 12-18 18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </symbol>
        <symbol id="scribble" viewBox="0 0 140 60"><path d="M4 40C20 10 34 10 30 34S50 56 62 22 80 6 84 34 104 54 116 20 128 14 136 30" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></symbol>
        <symbol id="heart" viewBox="0 0 100 100"><path d="M50 90C20 68 8 50 8 33 8 19 19 10 31 10c8 0 15 4 19 11 4-7 11-11 19-11 12 0 23 9 23 23 0 17-12 35-42 57z" /></symbol>
        <symbol id="note" viewBox="0 0 100 100"><ellipse cx="36" cy="78" rx="17" ry="12" transform="rotate(-20 36 78)" /><rect x="48" y="12" width="9" height="64" /><path d="M57 12c0 20 26 18 26 42-7-15-26-15-26-15z" /></symbol>
        <symbol id="link" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      </defs>
    </svg>
  )
}

// <Deco id="sparkle" className="sp1" />  (positioned via CSS class)
export function Deco({ id, className = '' }) {
  return (
    <svg className={`deco ${className}`} aria-hidden="true">
      <use href={`#${id}`} />
    </svg>
  )
}

// Image if provided, otherwise the chalkboard-grid placeholder.
export function Slot({ src, alt = '', label = 'PHOTO' }) {
  if (src) return <img src={src} alt={alt} />
  return <div className="slot">{label}</div>
}

export function Tape({ className = '' }) {
  return <span className={`tape ${className}`} aria-hidden="true" />
}

export function Burst({ className = '', ...slot }) {
  return (
    <div className={`burst ${className}`}>
      <div className="burst-in"><Slot {...slot} /></div>
    </div>
  )
}

// shape: 'burst' | 'burst8' | 'jag' | 'polaroid'
// Children (e.g. an illustration) render unless a real `src` image is given.
export function Cut({ shape = 'burst', children, ...slot }) {
  return (
    <div className={`cut shape-${shape}`}>
      <div className="cut-in">{slot.src || !children ? <Slot {...slot} /> : children}</div>
    </div>
  )
}
