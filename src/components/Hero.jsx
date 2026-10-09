import Rich from './Rich.jsx'
import CommitGrid from './CommitGrid.jsx'

export default function Hero({ site }) {
  const { photos } = site
  return (
    <section id="top" className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="sticker-text hi">Hi, I&rsquo;m</span>
            <span className="sticker-text name">{site.firstName}</span>
            <span className="sticker-text welcome">Welcome to my portfolio!</span>
          </h1>
          <div className="box about-note">
            <span className="tag">ABOUT ME</span>
            {site.about.paragraphs.slice(0, 2).map((t) => <p key={t}><Rich text={t} /></p>)}
          </div>
        </div>
        <div className="hero-media">
          <figure className="frame">
            <div className="frame-block"><div className="frame-pic"><img src={photos.me} alt={site.name} /></div></div>
            <figcaption><span className="tag">{site.name.toUpperCase()}</span></figcaption>
          </figure>
          <CommitGrid user={site.githubUser} />
        </div>
      </div>
    </section>
  )
}
