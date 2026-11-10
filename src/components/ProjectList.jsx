import { useState } from 'react'
import Rich from './Rich.jsx'
import Shots from './Shots.jsx'

// Projects: two tabs (full stack / embedded), a list on the left, and a preview on the right (picture, a line of tags,
// the full text) that follows the project you hover or focus. On touch screens the preview opens under the tapped row.
// Each project needs `category: 'fullstack' | 'embedded'` in site.js.
const TABS = [
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'embedded', label: 'Embedded & Hardware' },
]
const plain = (t) => t.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
const firstSentence = (t) => plain(t).split(/(?<=[.!?])\s+/)[0]

// Projects without a picture get a typographic plate instead: the title in script on the print-black panel.
function Plate({ title, date }) {
  return (
    <div className="plate" aria-hidden="true">
      <span className="plate-title">{title}</span>
      <span className="plate-date">{date}</span>
    </div>
  )
}

function Preview({ project }) {
  const { title, date, tech = [], summary, image, imageAlt = '', url } = project
  return (
    <div className="preview">
      <div className="preview-pic">
        {image ? <Shots src={image} alt={imageAlt} /> : <Plate title={title} date={date} />}
      </div>
      <p className="preview-tags">{[date, ...tech].filter(Boolean).join('  ·  ')}</p>
      <p className="preview-text"><Rich text={summary} /></p>
      {url && <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
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
          <button key={t.id} id={`proj-tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls="proj-panel" tabIndex={tab === t.id ? 0 : -1} className={`proj-tab${tab === t.id ? ' active' : ''}`} onClick={() => pick(t.id)}>
            {t.label}<span className="proj-count">{projects.filter((p) => p.category === t.id).length}</span>
          </button>
        ))}
      </div>
      <div className="proj-split" id="proj-panel" role="tabpanel" aria-labelledby={`proj-tab-${tab}`}>
        <ul className="proj-items">
          {list.map((p, n) => (
            <li key={p.id}>
              <button type="button" className={`proj-item${p.id === active.id ? ' active' : ''}`} aria-current={p.id === active.id ? 'true' : undefined} onMouseEnter={() => setActiveId(p.id)} onFocus={() => setActiveId(p.id)} onClick={() => setActiveId(p.id)}>
                <span className="proj-no">{String(n + 1).padStart(2, '0')}</span>
                <span className="proj-item-main">
                  <span className="proj-item-title">{p.title}{p.inProgress && <span className="badge">In progress</span>}</span>
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
