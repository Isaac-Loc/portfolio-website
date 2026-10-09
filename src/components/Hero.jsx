import Rich from './Rich.jsx'
import CommitGrid from './CommitGrid.jsx'
import ScrollButton from './ScrollButton.jsx'

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
          <div className="about-note">
            <span className="tag">ABOUT ME</span>
            {site.about.paragraphs.slice(0, 2).map((t) => <p key={t}><Rich text={t} /></p>)}
          </div>
        </div>
        <div className="hero-media">
          <div className="photo main"><img src={photos.me} alt={site.name} /></div>
          <div className="photo-row">
            <div className="photo"><img src={photos.cat} alt="My cat" /></div>
            <div className="photo"><img src={photos.car} alt="My car in the snow" /></div>
          </div>
          <CommitGrid user={site.githubUser} />
        </div>
      </div>
      <ScrollButton to="experience" hero />
    </section>
  )
}
