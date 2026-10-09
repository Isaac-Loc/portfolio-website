import { useCallback, useEffect, useState } from 'react'

// Light/dark theme. The initial value is set before first paint by the inline script in index.html: the visitor's
// saved choice, otherwise LIGHT (the device's dark-mode setting is deliberately ignored). Only an explicit toggle
// is saved.
const KEY = 'theme'

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

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
