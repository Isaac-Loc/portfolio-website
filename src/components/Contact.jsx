import Big from './Big.jsx'

export default function Contact({ email, github, linkedin, name, year }) {
  return (
    <section id="contact" className="sec sec-end">
      <Big word="Let's talk" sub="Get in touch" />
      <div className="panel contact reveal">
        <p>Open to software engineering roles and interesting problems. The fastest way to reach me is email.</p>
        <div className="hero-cta">
          <a className="btn btn-red" href={`mailto:${email}`}>{email}</a>
          <a className="btn btn-ghost" href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="btn btn-ghost" href={github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <footer>© {year} {name}</footer>
    </section>
  )
}
