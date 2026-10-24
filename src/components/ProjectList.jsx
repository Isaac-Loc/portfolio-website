import { useState } from 'react'
import Rich from './Rich.jsx'
import Shots from './Shots.jsx'

// Projects: two tabs (full stack / embedded), a list on the left, and a preview on the right (picture, a line of tags,
// the full text) that follows the project you hover or focus. On touch screens the preview opens under the tapped row.
// Each project needs `category: 'fullstack' | 'embedded'` in site.js.
const TABS = [
  { id: 'fullstack', label: 'FULL STACK APPLICATIONS' },
  { id: 'embedded', label: 'EMBEDDED / HARDWARE' },
]
const plain = (t) => t.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
const firstSentence = (t) => plain(t).split(/(?<=[.!?])\s+/)[0]

// A pixel mosaic stands in for projects that have no picture yet (same colours every time for the same project)
const MOSAIC = ['#b3281f', '#d4493a', '#e8998d', '#f0c9c3', '#1b1b1b', '#841e17', '#fbf6ea']
function Mosaic({ seed }) {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const cells = Array.from({ length: 40 }, () => {
    h = (h * 1664525 + 1013904223) >>> 0
    return MOSAIC[(h >>> 24) % MOSAIC.length]
  })
  return <div className="mosaic" aria-hidden="true">{cells.map((c, i) => <span key={i} style={{ background: c }} />)}</div>
}

function Preview({ project }) {
  const { id, title, date, tech = [], summary, image, imageAlt = '', url } = project
  return (
    <div className="preview">
      <div className="preview-pic">
        {image ? <Shots src={image} alt={imageAlt} label={title.toUpperCase()} /> : <Mosaic seed={id} />}
      </div>
      <p className="preview-tags">{[date, ...tech].filter(Boolean).join(' · ').toUpperCase()}</p>
      <p className="preview-text"><Rich text={summary} /></p>
      {url && <a className="preview-link" href={url} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
    </div>
  )
}

export default function ProjectList({ projects }) {
  const [tab, setTab] = useState('fullstack')
  const [activeId, setActiveId] = useState(null)
  const list = projects.filter((p) => p.category === tab)
  const active = list.find((p) => p.id === activeId) ?? list[0]

  const pick = (id) => { setTab(id); setActiveId(null) }
  const onKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tab)
    const next = e.key === 'ArrowRight' ? (i + 1) % TABS.length : e.key === 'ArrowLeft' ? (i + TABS.length - 1) % TABS.length : -1
    if (next < 0) return
    e.preventDefault()
    pick(TABS[next].id)
    document.getElementById(`proj-tab-${TABS[next].id}`)?.focus()
  }

  return (
    <>
      <div className="proj-tabs" role="tablist" aria-label="Project type" onKeyDown={onKey}>
        {TABS.map((t) => (
          <button key={t.id} id={`proj-tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls="proj-panel" tabIndex={tab === t.id ? 0 : -1} className={`tag proj-tab${tab === t.id ? ' active' : ''}`} onClick={() => pick(t.id)}>
            {t.label}<span className="proj-count">{projects.filter((p) => p.category === t.id).length}</span>
          </button>
        ))}
      </div>
      <div className="proj-split" id="proj-panel" role="tabpanel" aria-labelledby={`proj-tab-${tab}`}>
        <ul className="proj-items">
          {list.map((p) => (
            <li key={p.id}>
              <button type="button" className={`proj-item${p.id === active.id ? ' active' : ''}`} aria-current={p.id === active.id ? 'true' : undefined} onMouseEnter={() => setActiveId(p.id)} onFocus={() => setActiveId(p.id)} onClick={() => setActiveId(p.id)}>
                <span className="proj-item-main">
                  <span className="proj-item-title">{p.title}{p.inProgress && <span className="entry-badge">COMING SOON</span>}</span>
                  <span className="proj-item-tease">{firstSentence(p.summary)}</span>
                </span>
                <span className="proj-plus" aria-hidden="true" />
              </button>
              {p.id === active.id && <div className="proj-inline"><Preview project={p} /></div>}
            </li>
          ))}
        </ul>
        <aside className="proj-side" aria-live="polite"><Preview key={active.id} project={active} /></aside>
      </div>
    </>
  )
}
