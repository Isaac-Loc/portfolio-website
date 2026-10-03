import { useEffect } from 'react'
import { particles, wiggle } from '../utils/fx.js'

// The header nav is pinned while you scroll and its buttons are alive: they pop on hover, light up for the
// section you are in, throw sparkles when clicked, and the logo scrolls to the very top (clearing the URL hash).
const SECTION_IDS = ['experience', 'projects', 'skills', 'contact']

export default function useNavInteractions() {
  useEffect(() => {
    const header = document.querySelector('.site-header')
    if (!header) return undefined
    const links = [...header.querySelectorAll('a.tag')]
    let ticking = false

    const updateActive = () => {
      ticking = false
      const vh = window.innerHeight
      const headerH = header.getBoundingClientRect().height
      const probe = headerH + (vh - headerH) * 0.35
      let active = null
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= probe && r.bottom > probe) active = id
      })
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = 'contact'
      links.forEach((a) => a.classList.toggle('active', a.dataset.section === active))
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateActive)
      }
    }

    const onClick = (e) => {
      const a = e.target.closest('a.tag')
      if (!a || !header.contains(a)) return
      particles(null, e.clientX, e.clientY, 'sparkle', 8, { spread: 70, size: 2.4, fixed: true })
      wiggle(a)
      if (a.dataset.nav === 'top') {
        e.preventDefault()
        const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
        window.history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }

    updateActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    header.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      header.removeEventListener('click', onClick)
    }
  }, [])
}
