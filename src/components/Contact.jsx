
export default function Contact({ email, github, linkedin, name, year }) {
  return (
    <section id="contact" className="contact">
      <h2 className="section-title reveal"><span className="sticker-text">Say hi!</span></h2>
      <div className="contact-links">
        <a className="tag tag-big tag-plain reveal" style={{ '--d': '0s' }} href={`mailto:${email}`}>{email}</a>
        <a className="tag tag-big reveal" style={{ '--d': '.12s' }} href={linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN</a>
        <a className="tag tag-big reveal" style={{ '--d': '.24s' }} href={github} target="_blank" rel="noopener noreferrer">GITHUB</a>
      </div>
      <p className="tag copyright reveal">&copy; {year} {name.toUpperCase()}</p>
    </section>
  )
}
