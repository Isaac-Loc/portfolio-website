import { useEffect, useState } from 'react'

// Tiny dependency-free hash router: "#/experience" -> "/experience", anything empty -> "/".
// Hash routes work on any static host without rewrite rules. Swap for a real router later if needed.
const read = () => {
  const p = window.location.hash.replace(/^#/, '')
  return p.startsWith('/') && p.length > 1 ? p.replace(/\/+$/, '') : '/'
}

export default function useRoute() {
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => { setRoute(read()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
