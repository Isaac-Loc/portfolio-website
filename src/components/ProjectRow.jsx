import Rich from './Rich.jsx'
import Shots from './Shots.jsx'

// A project as a short row (title, date, one line) that expands on click to show the full text, tech and screenshot.
// Uses a native <details> so it works with the keyboard and screen readers without extra code.
const plain = (t) => t.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
const firstSentence = (t) => plain(t).split(/(?<=[.!?])\s+/)[0]

export default function ProjectRow({ project, badge }) {
  const { title, date, summary, tech = [], image, imageAlt = '', url } = project
  return (
    <details className="proj reveal">
      <summary className="proj-head">
        <span className="proj-main">
          {badge && <span className="entry-badge">{badge}</span>}
          <span className="proj-title">{title}</span>
          {date && <span className="proj-date">{date}</span>}
          <span className="proj-tease">{firstSentence(summary)}</span>
        </span>
        <span className="proj-toggle" aria-hidden="true" />
      </summary>
      <div className={`proj-body${image ? ' has-image' : ''}`}>
        {image && <Shots src={image} alt={imageAlt} label={title.toUpperCase()} />}
        <div className="proj-text">
          <p className="entry-summary"><Rich text={summary} /></p>
          <ul className="entry-tech">{tech.map((t) => <li key={t}>{t}</li>)}</ul>
          {url && <a className="proj-link" href={url} target="_blank" rel="noopener noreferrer">View on GitHub</a>}
        </div>
      </div>
    </details>
  )
}
