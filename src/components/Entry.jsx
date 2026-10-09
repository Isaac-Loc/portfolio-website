import Rich from './Rich.jsx'

// One experience / project card for the home page. Shows the title, meta line, summary and tech tags.
export default function Entry({ title, meta, summary, tech = [], href }) {
  return (
    <article className="box entry reveal">
      <h3 className="entry-title">{href ? <a href={href} target="_blank" rel="noopener noreferrer">{title}</a> : title}</h3>
      {meta && <p className="entry-meta">{meta}</p>}
      <p className="entry-summary"><Rich text={summary} /></p>
      <ul className="entry-tech">{tech.map((t) => <li key={t}>{t}</li>)}</ul>
    </article>
  )
}
