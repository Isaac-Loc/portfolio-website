// Round arrow buttons. `to` is the id of the section to jump to.
//  - default: down arrow pinned 1.1rem above the bottom of the screen (next section)
//  - `up`: flipped to point up
//  - `edge="top"`: pinned 1.1rem below the top of the screen instead (previous section)
//  - `hero`: absolute placement used by the hero
// `to="page-top"` scrolls to the very top and clears the URL hash, so the address is just the plain domain.
export default function ScrollButton({ to, up = false, hero = false, edge = 'bottom' }) {
  const label = edge === 'top' ? 'Scroll to the previous section' : up ? 'Back to top' : 'Scroll to the next section'

  const onClick = (e) => {
    if (to !== 'page-top') return
    e.preventDefault()
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }

  return (
    <a
      className={`scroll-btn${hero ? ' hero-btn' : ''}${up ? ' up' : ''}${edge === 'top' ? ' edge-top' : ''}`}
      href={`#${to}`}
      aria-label={label}
      onClick={onClick}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
