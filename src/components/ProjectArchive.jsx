import { useEffect, useState } from 'react'
import Entry from './Entry.jsx'

// Archive tabs: ALL, COMING SOON (projects with `inProgress: true` in site.js), then one tab per year (taken
// from each project's `date`, e.g. "August 2026"). ALL lists everything in the order coming soon, 2026, 2025,
// each project once. Add a year here when a project from that year exists.
const wip = (p) => !!p.inProgress
const in2026 = (p) => /2026/.test(p.date || '')
const in2025 = (p) => /2025/.test(p.date || '')
const TABS = [
  { id: 'all', label: 'ALL', match: () => true, order: (list) => [...new Set([...list.filter(wip), ...list.filter(in2026), ...list.filter(in2025), ...list])] },
  { id: 'wip', label: 'COMING SOON', match: wip },
  { id: '2026', label: '2026', match: in2026 },
  { id: '2025', label: '2025', match: in2025 },
]

export default function ProjectArchive({ projects }) {
  const [tab, setTab] = useState('all')
  const current = TABS.find((t) => t.id === tab)
  const matched = projects.filter(current.match)
  const shown = current.order ? current.order(matched) : matched

  // Cards for a newly picked tab mount after useReveal ran, so show them right away (the click is the trigger)
  useEffect(() => {
    document.querySelectorAll('.arch-item .reveal').forEach((el) => el.classList.add('in'))
  }, [tab])

  const onKey = (e) => {
    const i = TABS.findIndex((t) => t.id === tab)
    const next = e.key === 'ArrowRight' ? (i + 1) % TABS.length : e.key === 'ArrowLeft' ? (i + TABS.length - 1) % TABS.length : -1
    if (next < 0) return
    e.preventDefault()
    setTab(TABS[next].id)
    document.getElementById(`arch-tab-${TABS[next].id}`)?.focus()
  }

  return (
    <>
      <div className="arch-tabs" role="tablist" aria-label="Project archive" onKeyDown={onKey}>
        {TABS.map((t) => {
          const n = projects.filter(t.match).length
          return (
            <button key={t.id} id={`arch-tab-${t.id}`} type="button" role="tab" aria-selected={tab === t.id} aria-controls="arch-panel" tabIndex={tab === t.id ? 0 : -1} className={`tag arch-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
              {t.label}<span className="arch-count">{n}</span>
            </button>
          )
        })}
      </div>
      <div id="arch-panel" role="tabpanel" aria-labelledby={`arch-tab-${tab}`}>
        {shown.length ? (
          <ol className="archive-list" key={tab}>
            {shown.map((p) => (
              <li key={p.id} className="arch-item">
                <Entry title={p.title} href={p.url} meta={p.date} summary={p.summary} stats={p.stats} tech={p.tech} image={p.image} imageAlt={p.imageAlt} imageLabel={p.title.toUpperCase()} badge={p.recent ? 'MOST RECENT' : undefined} />
              </li>
            ))}
          </ol>
        ) : (
          <p className="arch-empty">&gt; Nothing here yet.</p>
        )}
      </div>
    </>
  )
}
