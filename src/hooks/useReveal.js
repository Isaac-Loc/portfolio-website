import { useEffect } from 'react'

// Fades/slides `.reveal` elements in the first time they scroll into view. Re-runs when the route changes.
export default function useReveal(route) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.05 }) // no negative rootMargin: the short footer sits in that bottom strip at max scroll and would never reveal
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [route])
}
