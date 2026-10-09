import { useEffect, useState } from 'react'

// Placeholder page: the title is typed in with a blinking cursor, styled like the hero's name. Build the real content below it.
const TYPE_MS = 85
export default function EmptyPage({ title }) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [text, setText] = useState(reduce ? title : '')
  useEffect(() => {
    if (reduce) { setText(title); return undefined }
    setText('')
    let n = 0
    let timer
    const tick = () => {
      n += 1
      setText(title.slice(0, n))
      if (n < title.length) timer = setTimeout(tick, TYPE_MS)
    }
    timer = setTimeout(tick, 300)
    return () => clearTimeout(timer)
  }, [title, reduce])
  return (
    <section className="page">
      <h1 className="hero-title page-title" aria-label={title}>
        <span className="line name" aria-hidden="true">{text}{text.length < title.length && <i className="cursor" />}</span>
      </h1>
    </section>
  )
}
