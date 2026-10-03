import { useCallback, useEffect, useState } from 'react'

// Light/dark theme. The initial value is set before first paint by the inline script in index.html (saved choice,
// otherwise the visitor's system setting). Only an explicit toggle is saved, so a visitor who never touches the
// switch keeps following their system.
const KEY = 'theme'

const systemTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || systemTheme())

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(KEY, next) } catch { /* storage blocked */ }
      return next
    })
  }, [])

  return [theme, toggle]
}
