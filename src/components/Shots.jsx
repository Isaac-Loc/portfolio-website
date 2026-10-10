import { useState } from 'react'

// Screenshot window for a card: one image, or several with arrow buttons and pips to cycle through them.
// `shots` is [{ src, alt }]. The window bar shows the label, plus a "2/3" counter when there is more than one.
export default function Shots({ shots, label }) {
  const [i, setI] = useState(0)
  const many = shots.length > 1
  const go = (d) => setI((n) => (n + d + shots.length) % shots.length)
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  }
  return (
    <figure className="window entry-shot" onKeyDown={many ? onKey : undefined}>
      <div className="window-bar">
        <span>{label}</span>
        {many ? <span aria-hidden="true">{i + 1}/{shots.length}</span> : <i className="dots" aria-hidden="true"><b /><b /><b /></i>}
      </div>
      <div className="window-body">
        <div className="shot-pic">
          {shots.map((s, n) => (
            <img key={s.src} src={s.src} alt={s.alt} loading="lazy" className={n === i ? 'on' : ''} aria-hidden={n === i ? undefined : 'true'} />
          ))}
          {many && (
            <>
              <button type="button" className="shot-arrow prev" onClick={() => go(-1)} aria-label="Previous screenshot">&lt;</button>
              <button type="button" className="shot-arrow next" onClick={() => go(1)} aria-label="Next screenshot">&gt;</button>
            </>
          )}
        </div>
        {many && (
          <div className="shot-pips" role="group" aria-label="Choose a screenshot">
            {shots.map((s, n) => (
              <button key={s.src} type="button" className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Screenshot ${n + 1} of ${shots.length}`} aria-current={n === i ? 'true' : undefined} />
            ))}
          </div>
        )}
      </div>
    </figure>
  )
}
