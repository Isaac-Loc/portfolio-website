import useTheme from '../hooks/useTheme.js'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Header({ name, resume }) {
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'dark'
  const go = (id) => (e) => {
    e.preventDefault()
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <header id="page-top" className="site-header">
      <div className="header-inner">
        <a className="logo" href="#/" onClick={go('top')} aria-label={`${name}, back to top`}>{name}</a>
        <nav className="nav" aria-label="Sections">
          {LINKS.map((l) => <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="btn btn-line btn-sm" href={resume} target="_blank" rel="noopener noreferrer">Résumé</a>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-pressed={dark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            <span className="half" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  )
}
