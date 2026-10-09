import { site, experience, projects, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Entry from './components/Entry.jsx'
import Contact from './components/Contact.jsx'
import EmptyPage from './pages/EmptyPage.jsx'
import useRoute from './hooks/useRoute.js'
import useReveal from './hooks/useReveal.js'

// Routes are hash-based ("#/experience"). Only Home has content so far; the others are empty pages to fill in.
const PAGES = {
  '/experience': 'Experience',
  '/projects': 'Projects',
}

export default function App() {
  const route = useRoute()
  useReveal(route)
  const title = PAGES[route]
  const present = experience.filter((e) => /present/i.test(e.dates)) // current roles only; the full list lives on /experience
  return (
    <>
      <Header name={site.firstName} resume={site.resume} route={route} />
      {title ? <EmptyPage title={title} /> : (
        <>
          <Hero site={site} />
          <Section id="experience" title="Experience" archive="/experience">
            <div className="entry-grid reveal-stagger">
              {present.map((e) => (
                <Entry key={e.id} title={e.role} href={e.orgUrl} meta={`${e.org} · ${e.dates}`} summary={e.summary} tech={e.tech} />
              ))}
            </div>
          </Section>
          <Section id="projects" title="Projects" archive="/projects">
            <div className="entry-grid">
              {projects.slice(0, 2).map((p) => (
                <Entry key={p.id} title={p.title} href={p.url} summary={p.summary} tech={p.tech} />
              ))}
            </div>
          </Section>
          <Section id="skills" title="Skills">
            <div className="skill-groups">
              {skills.map((g) => (
                <div key={g.label} className="skill-group reveal">
                  <h3 className="skill-label">{g.label}</h3>
                  <ul className="entry-tech">{g.items.map((i) => <li key={i.name}>{i.name}</li>)}</ul>
                </div>
              ))}
            </div>
          </Section>
          <Contact site={site} />
        </>
      )}
    </>
  )
}
