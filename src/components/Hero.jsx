export default function Hero({ site }) {
  const [first, last] = site.name.split(' ')
  return (
    <section className="hero" data-hero>
      <div className="hero-inner">
        <p className="eyebrow">Portfolio · {site.year}</p>
        <h1 className="hero-title"><span>{first}</span><span className="red">{last}</span></h1>
        <p className="hero-tag">{site.tagline}</p>
        <div className="hero-cta">
          <a className="btn btn-red" href="#experience">See my voyages</a>
          <a className="btn btn-ghost" href="#contact">Get in touch</a>
        </div>
      </div>
      <a className="hero-hint" href="#about" aria-label="Scroll down"><i /></a>
    </section>
  )
}
