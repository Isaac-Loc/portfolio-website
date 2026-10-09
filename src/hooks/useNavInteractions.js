import { useEffect } from 'react'

// Header nav: highlights the section you are in, and the logo scrolls to the very top (clearing the URL hash).
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
      if (!ticking) { ticking = true; window.requestAnimationFrame(updateActive) }
    }
    const onClick = (e) => {
      const a = e.target.closest('a.tag')
      if (!a || a.dataset.nav !== 'top') return
      e.preventDefault()
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
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
