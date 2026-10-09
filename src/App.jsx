import { site, experience, projects, leadership, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Entry from './components/Entry.jsx'
import Contact from './components/Contact.jsx'
import EmptyPage from './pages/EmptyPage.jsx'
import useRoute from './hooks/useRoute.js'
import useReveal from './hooks/useReveal.js'

// Routes are hash-based ("#/experience"). The tab pages are switched off for now: the whole resume lives on Home.
// Add entries here (and links in Header.jsx) to bring a page back.
const PAGES = {}

export default function App() {
  const route = useRoute()
  useReveal(route)
  const title = PAGES[route]
  return (
    <>
      <Header name={site.firstName} resume={site.resume} route={route} />
      {title ? <EmptyPage title={title} /> : (
        <>
          <Hero site={site} />
          <Section id="experience" title="Experience">
            <div className="entry-grid reveal-stagger">
              {experience.map((e) => (
                <Entry key={e.id} title={e.role} href={e.orgUrl} meta={`${e.org} · ${e.place} · ${e.dates}`} summary={e.summary} stats={e.stats} tech={e.tech} />
              ))}
            </div>
          </Section>
          <Section id="projects" title="Projects">
            <div className="entry-grid reveal-stagger">
              {projects.map((p) => (
                <Entry key={p.id} title={p.title} href={p.url} summary={p.summary} stats={p.stats} tech={p.tech} />
              ))}
            </div>
          </Section>
          <Section id="leadership" title="Leadership">
            <div className="entry-grid">
              <Entry title={leadership.role} meta={`${leadership.org} · ${leadership.dates}`} summary={leadership.summary} stats={leadership.stats} tech={leadership.tech} />
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
