import useTheme from '../hooks/useTheme.js'
import { goToSection, SECTIONS } from '../lib/nav.js'

export default function Header({ name, route }) {
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'dark'
  const go = (id) => (e) => { e.preventDefault(); goToSection(id, route) }
  return (
    <header id="page-top" className="site-header">
      <div className="header-inner">
        <a className="logo" href="#/" onClick={go('top')} aria-label={`${name}, home`}>{name}</a>
        <nav className="nav" aria-label="Sections">
          {SECTIONS.map((l) => <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>)}
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
