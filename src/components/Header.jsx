import useTheme from '../hooks/useTheme.js'

const LINKS = [
  { path: '/experience', label: 'EXPERIENCE' },
  { path: '/projects', label: 'PROJECTS' },
  { path: '/contact', label: 'CONTACT' },
]

export default function Header({ name, resume, route }) {
  const [theme, toggleTheme] = useTheme()
  const dark = theme === 'dark'
  return (
    <header id="page-top" className="site-header">
      <div className="header-inner">
        <a className="tag tag-logo" href="#/" onClick={route === '/' ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}>{name.toUpperCase()}.EXE</a>
        <nav>
          {LINKS.map((l) => (
            <a key={l.path} className={`tag${route === l.path ? ' active' : ''}`} href={`#${l.path}`}>{l.label}</a>
          ))}
          <a className="tag tag-resume" href={resume} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2h8l5 5v15H6z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
              <path d="M14 2v5h5M9 13h7M9 17h7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            RESUME
          </a>
          <button
            type="button"
            className="tag theme-toggle"
            onClick={toggleTheme}
            aria-pressed={dark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Light mode' : 'Dark mode'}
          >
            <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor" />
            </svg>
            <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" fill="currentColor" />
              <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  )
}
