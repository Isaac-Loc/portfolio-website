import { useRef } from 'react'
import { Deco, Burst, Slot, Tape } from './Graphics.jsx'
import Rich from './Rich.jsx'
import CommitGrid from './CommitGrid.jsx'
import Sticker from './Stickers.jsx'
import ScrollButton from './ScrollButton.jsx'
import useHeroInteractions from '../hooks/useHeroInteractions.js'

export default function Hero({ site }) {
  const { heroPhotos } = site
  const stageRef = useRef(null)
  useHeroInteractions(stageRef)
  return (
    <section id="top" className="hero">
      <div className="stage" ref={stageRef}>
        <Deco id="sparkle" className="sparkle sp1" />
        <Deco id="asterisk" className="sparkle sp4" />

        <h1 className="hero-title">
          <span className="sticker-text t-hi">Hi, I&rsquo;m</span>
          <span className="sticker-text t-name">{site.firstName}</span>
          <span className="sticker-text t-welcome">Welcome to my</span>
          <span className="sticker-text t-sub">Portfolio!</span>
        </h1>

        <div className="about-note">
          <Tape className="tape-c" />
          <span className="tag about-tag">ABOUT ME</span>
          <p>
            {site.about.sentences.map((t, i) => (
              <span key={t} className={`s${i + 1}`}><Rich text={t} />{' '}</span>
            ))}
          </p>
        </div>

        <div className="main-cut">
          <div className="main-cut-in"><Slot src={heroPhotos.main} alt={site.name} label={'YOUR\nPHOTO'} /></div>
        </div>

        <CommitGrid user={site.githubUser} />

        <Burst className="b-left" src={heroPhotos.lower} alt="My car in the snow" />
        <Burst className="b-right" src={heroPhotos.upper} alt="My cat" />

        {site.heroStickers.map((name, i) => (
          <Sticker key={name} name={name} className={`as-${name}`} />
        ))}


        <svg className="stamp" viewBox="0 0 100 100" aria-hidden="true">
          <defs><path id="circ" d="M50 50m-36 0a36 36 0 1 1 72 0a36 36 0 1 1-72 0" /></defs>
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text fontSize="10" fontFamily="Silkscreen, monospace" fill="currentColor">
            <textPath href="#circ" textLength="224" lengthAdjust="spacing">PORTFOLIO * PORTFOLIO * </textPath>
          </text>
          <use href="#sparkle" x="38" y="38" width="24" height="24" fill="currentColor" />
        </svg>

      </div>

      <ScrollButton to="experience" hero />
    </section>
  )
}
