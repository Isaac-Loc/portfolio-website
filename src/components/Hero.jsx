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
        <div className="hero-copy">
          <h1 className="hero-title" aria-label={title.replace('\n', ' ')}>
            <span className="line" aria-hidden="true">{line1}{typingTitle && !titleText.includes('\n') && <i className="cursor" />}</span>
            <span className="line name" aria-hidden="true">{line2}{typingTitle && titleText.includes('\n') && <i className="cursor" />}</span>
          </h1>
          <p className="role" aria-label={site.roles.join(', ')}>
            <span aria-hidden="true">&gt; {roleText}{!typingTitle && <i className="cursor" />}</span>
          </p>
          <div className="box about-note">
            <span className="tag">ABOUT ME</span>
            {site.about.paragraphs.slice(0, 2).map((t) => <p key={t}><Rich text={t} /></p>)}
          </div>
        </div>
        <div className="hero-media">
          <figure className="frame">
            <div className="frame-pic"><PixelPhoto src={photos.me} alt={site.name} /></div>
            <figcaption><span className="tag">{site.name.toUpperCase()}</span></figcaption>
          </figure>
          <CommitGrid user={site.githubUser} />
        </div>
      </div>
    </section>
  )
}
