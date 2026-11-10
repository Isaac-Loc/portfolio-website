import useTheme from '../hooks/useTheme.js'

// Section links scroll on the home page; from another page they go home first, then scroll.
const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'skills', label: 'Skills' },
]

export default function Header({ name, route }) {
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'dark'
  const home = route === '/'
  const go = (id) => (e) => {
    e.preventDefault()
    const scroll = () => {
      if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    if (home) scroll()
    else { window.location.hash = '/'; setTimeout(scroll, 60) }
  }
  return (
    <header id="page-top" className="site-header">
      <div className="header-inner">
        <a className="logo" href="#/" onClick={go('top')} aria-label={`${name}, home`}>{name}</a>
        <nav className="nav" aria-label="Sections">
          {LINKS.map((l) => <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>)}
          <a href="#/contact" className={route === '/contact' ? 'active' : undefined} aria-current={route === '/contact' ? 'page' : undefined}>Contact</a>
        </nav>
        <div className="header-actions">
          <a className="btn btn-line btn-sm header-contact" href="#/contact">Contact</a>
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
