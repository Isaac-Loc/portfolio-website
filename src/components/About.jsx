import Big from './Big.jsx'
import Rich from './Rich.jsx'

export default function About({ site }) {
  return (
    <section id="about" className="sec">
      <Big word="About" sub="Hello" />
      <div className="about-grid">
        <div className="panel reveal">
          {site.about.paragraphs.map((p, i) => <p key={i}><Rich text={p} /></p>)}
        </div>
        <div className="portholes">
          <div className="porthole big-ph reveal" style={{ '--d': '.1s' }}><img src={site.photos.me} alt="Isaac" /></div>
          <div className="porthole reveal" style={{ '--d': '.2s' }}><img src={site.photos.cat} alt="Isaac's cat" /></div>
          <div className="porthole reveal" style={{ '--d': '.3s' }}><img src={site.photos.car} alt="Isaac's car" /></div>
        </div>
      </div>
    </section>
  )
}
