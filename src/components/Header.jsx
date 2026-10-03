const LINKS = [
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Header({ name }) {
  return (
    <header id="page-top" className="site-header">
      <div className="header-inner">
        <a className="tag tag-logo" href="#page-top" data-nav="top">{name.toUpperCase()}.EXE</a>
        <nav>
          {LINKS.map((l) => (
            <a key={l.id} className="tag" href={`#${l.id}`} data-section={l.id}>{l.label}</a>
          ))}
        </nav>
      </div>
    </header>
  )
}
