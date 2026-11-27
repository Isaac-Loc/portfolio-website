import { useId, useState } from 'react'
import Rich from './Rich.jsx'
import Shots from './Shots.jsx'

// Experience as a timeline: a hairline rail with a marker per role (filled denim = current), dates on one side and a
// compact row (role, org, place) on the other. Each row is a button (aria-expanded) that opens the summary, figures,
// tags, picture and repo link. The most recent role starts open. Items are expected newest first.
const host = (url) => (url ? new URL(url).host : undefined)
const isCurrent = (dates = '') => /present/i.test(dates)

function Item({ item, index, open, onToggle }) {
  const id = useId()
  const { role, org, orgUrl, place, dates, summary, stats = [], tech = [], repo, image, imageAlt = '' } = item
  const current = isCurrent(dates)
  return (
    <li className="tl-item reveal" data-open={open ? '' : undefined} data-current={current ? '' : undefined}>
      <p className="tl-dates">
        <span className="tl-no">{String(index + 1).padStart(2, '0')}</span>
        <span>{dates}</span>
        {current && <span className="tl-now">Current</span>}
      </p>
      <span className="tl-mark" aria-hidden="true" />
      <div className="tl-main">
        <h3 className="tl-head">
          <button type="button" className="tl-toggle" aria-expanded={open} aria-controls={`${id}-panel`} onClick={onToggle}>
            <span className="tl-title">{role}</span>
            <span className="tl-sub">{[org, place].filter(Boolean).join('  ·  ')}</span>
            <span className="tl-plus" aria-hidden="true" />
          </button>
        </h3>
        <div className="tl-panel" id={`${id}-panel`} role="region" aria-label={`${role}, details`}>
          <div className="tl-panel-in">
            <div className={`tl-body${image ? ' has-image' : ''}`}>
              <div className="tl-text">
                {orgUrl && <a className="text-link tl-org" href={orgUrl} target="_blank" rel="noopener noreferrer">{host(orgUrl)} <span aria-hidden="true">↗</span></a>}
                {summary && <p className="entry-summary"><Rich text={summary} /></p>}
                {stats.length > 0 && (
                  <dl className="entry-stats">
                    {stats.map((s) => <div key={s.l}><dt>{s.n}</dt><dd>{s.l}</dd></div>)}
                  </dl>
                )}
                {tech.length > 0 && <ul className="chips">{tech.map((t) => <li key={t}>{t}</li>)}</ul>}
                {repo && <a className="text-link" href={repo} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
              </div>
              {image && <Shots src={image} alt={imageAlt} label={host(orgUrl) ?? org} />}
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default function Timeline({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null)
  return (
    <ol className="timeline">
      {items.map((it, n) => (
        <Item key={it.id} item={it} index={n} open={openId === it.id} onToggle={() => setOpenId(openId === it.id ? null : it.id)} />
      ))}
    </ol>
  )
}
