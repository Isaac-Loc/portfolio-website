import { useEffect } from 'react'

const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n))

// Drives the scroll-linked look:
//  --p on <html>: page progress (0..1) that moves the background
//  --t on [data-big]: 0 -> 1 as a big word rises through the screen
//  .reveal -> .in once on screen
export default function useScrollFx() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const bigs = [...document.querySelectorAll('[data-big]')]
    const hero = document.querySelector('[data-hero]')
    let raf = 0

    const update = () => {
      raf = 0
      const vh = window.innerHeight
      const max = Math.max(1, root.scrollHeight - vh)
      const p = clamp(window.scrollY / max)
      root.style.setProperty('--p', p.toFixed(4))
      for (const el of bigs) {
        const r = el.getBoundingClientRect()
        const t = reduce ? 1 : clamp((vh - r.top) / (vh * 0.7))
        el.style.setProperty('--t', t.toFixed(3))
      }
      if (hero) hero.style.setProperty('--out', clamp(window.scrollY / (vh * 0.8)).toFixed(3))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const els = [...document.querySelectorAll('.reveal')]
    let io
    if ('IntersectionObserver' in window && !reduce) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
        }),
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      )
      els.forEach((e) => io.observe(e))
    } else els.forEach((e) => e.classList.add('in'))

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [])
}
