import { useEffect } from 'react'

// The scroll arrows are invisible by default. They fade in only for the section you are currently "in"
// (it fills at least 60% of the screen; the short Contact band counts when you reach the page bottom),
// and they hide again while you are actively scrolling. CSS does the showing/hiding via `.arrows-on` on
// the section and `.is-scrolling` on <html>.
export default function useSectionArrows() {
  useEffect(() => {
    const hosts = [...document.querySelectorAll('.hero, main > section, .duo')]
    const root = document.documentElement
    let timer = 0

    const compute = () => {
      const vh = window.innerHeight
      let best = null
      let bestVisible = -1
      hosts.forEach((h) => {
        const r = h.getBoundingClientRect()
        const visible = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0))
        if (visible > bestVisible) { bestVisible = visible; best = h }
      })
      const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2
      if (atBottom) best = hosts[hosts.length - 1]
      else if (bestVisible < vh * 0.6) best = null
      hosts.forEach((h) => h.classList.toggle('arrows-on', h === best))
    }

    const onScroll = () => {
      root.classList.add('is-scrolling')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        root.classList.remove('is-scrolling')
        compute()
      }, 250)
    }

    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', compute)
      window.clearTimeout(timer)
      root.classList.remove('is-scrolling')
    }
  }, [])
}
