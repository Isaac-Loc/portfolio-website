import { useEffect, useState } from 'react'

// Types `title` once, then cycles through `roles` (type, hold, delete, next). Returns the text typed so far for each.
// Under prefers-reduced-motion nothing animates: the full title and first role are returned.
const TYPE_MS = 85
const DELETE_MS = 40
const HOLD_MS = 1600

export default function useTyper(title, roles) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [titleText, setTitleText] = useState(reduce ? title : '')
  const [roleText, setRoleText] = useState(reduce ? roles[0] : '')
  const [phase, setPhase] = useState(reduce ? 'done' : 'title') // title -> role -> done(title typed, now cycling)

  useEffect(() => {
    if (reduce) return undefined
    let timer
    let roleIdx = 0
    let n = 0
    let deleting = false
    const tickTitle = () => {
      n += 1
      setTitleText(title.slice(0, n))
      if (n < title.length) timer = setTimeout(tickTitle, TYPE_MS + (title[n - 1] === '\n' ? 300 : 0))
      else { setPhase('role'); n = 0; timer = setTimeout(tickRole, 500) }
    }
    const tickRole = () => {
      const word = roles[roleIdx]
      if (!deleting) {
        n += 1
        setRoleText(word.slice(0, n))
        if (n < word.length) timer = setTimeout(tickRole, TYPE_MS)
        else { deleting = true; timer = setTimeout(tickRole, HOLD_MS) }
      } else {
        n -= 1
        setRoleText(word.slice(0, n))
        if (n > 0) timer = setTimeout(tickRole, DELETE_MS)
        else { deleting = false; roleIdx = (roleIdx + 1) % roles.length; timer = setTimeout(tickRole, 350) }
      }
    }
    timer = setTimeout(tickTitle, 400)
    return () => clearTimeout(timer)
  }, [title, roles, reduce])

  return { titleText, roleText, phase }
}
