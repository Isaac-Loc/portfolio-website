import Rich from './Rich.jsx'
import CommitGrid from './CommitGrid.jsx'
import PixelPhoto from './PixelPhoto.jsx'
import useTyper from '../hooks/useTyper.js'

export default function Hero({ site }) {
  const { photos } = site
  const title = `Hi, I'm\n${site.firstName}`
  const { titleText, roleText, phase } = useTyper(title, site.roles)
  const [line1, line2 = ''] = titleText.split('\n')
  const typingTitle = phase === 'title'
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-copy reveal">
          <h1 className="hero-title" aria-label={title.replace('\n', ' ')}>
            <span className="line" aria-hidden="true">{line1}{typingTitle && !titleText.includes('\n') && <i className="cursor" />}</span>
            <span className="line name" aria-hidden="true">{line2}{typingTitle && titleText.includes('\n') && <i className="cursor" />}</span>
          </h1>
          <p className="role" aria-label={site.roles.join(', ')}>
            <span aria-hidden="true">&gt; {roleText}{!typingTitle && <i className="cursor" />}</span>
          </p>
          <a className="tag tag-cta" href="#experience" onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) }}>
            SEE WHAT I'M UP TO! &#9660;
          </a>
          <div className="box about-note">
            <span className="tag">ABOUT ME</span>
            {site.about.paragraphs.slice(0, 2).map((t) => <p key={t}><Rich text={t} /></p>)}
          </div>
        </div>
        <div className="hero-media reveal">
          <figure className="window">
            <div className="window-bar">
              <span>{site.name.replace(' ', '_').toUpperCase()}.PNG</span>
              <i className="dots" aria-hidden="true"><b /><b /><b /></i>
            </div>
            <div className="window-body">
              <div className="frame-pic"><PixelPhoto src={photos.me} alt={site.name} /></div>
            </div>
            <nav className="hero-social" aria-label="Contact">
              <a className="tag social-tag" href={`mailto:${site.email}`} aria-label="Email" title="Email">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <a className="tag social-tag" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>
              </a>
              <a className="tag social-tag" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>
              </a>
            </nav>
          </figure>
          <CommitGrid user={site.githubUser} />
          <span className="pixel-glyph glyph-1" aria-hidden="true" />
        </div>
        <span className="pixel-glyph glyph-2" aria-hidden="true" />
      </div>
    </section>
  )
}
