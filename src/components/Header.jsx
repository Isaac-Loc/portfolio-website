export default function Header({ name }) {
  return (
    <header id="page-top" className="site-header">
      <a className="tag tag-logo" href="#top">{name.toUpperCase()}.EXE</a>
      <nav>
        <a className="tag" href="#experience">EXPERIENCE</a>
        <a className="tag" href="#projects">PROJECTS</a>
        <a className="tag" href="#skills">SKILLS</a>
        <a className="tag" href="#contact">CONTACT</a>
      </nav>
    </header>
  )
}
