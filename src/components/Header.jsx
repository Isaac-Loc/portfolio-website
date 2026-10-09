const links = [
  ['about', 'About'],
  ['experience', 'Voyages'],
  ['projects', 'Projects'],
  ['crew', 'Crew'],
  ['skills', 'Skills'],
  ['contact', 'Contact'],
]

export default function Header({ name, resume }) {
  return (
    <header className="nav" id="top">
      <a className="nav-logo" href="#top">{name}</a>
      <nav aria-label="Sections">
        {links.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="btn btn-red btn-sm" href={resume} target="_blank" rel="noreferrer">Resume</a>
    </header>
  )
}
