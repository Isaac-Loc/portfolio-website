import { site, experience, projects, leadership, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Entry from './components/Entry.jsx'
import Contact from './components/Contact.jsx'
import EmptyPage from './pages/EmptyPage.jsx'
import useRoute from './hooks/useRoute.js'
import useReveal from './hooks/useReveal.js'

// Routes are hash-based ("#/experience"). Home has the whole resume; the only tab is the Projects Archive.
const PAGES = {
  '/projects': 'Projects Archive',
}

export default function App() {
  const route = useRoute()
  useReveal(route)
  const title = PAGES[route]
  return (
    <>
      <Header name={site.firstName} resume={site.resume} route={route} />
      {title ? (
        <EmptyPage title={title}>
          <div className="entry-grid archive-grid reveal-stagger">
            {projects.map((p) => (
              <Entry key={p.id} title={p.title} href={p.url} summary={p.summary} stats={p.stats} tech={p.tech} />
            ))}
          </div>
        </EmptyPage>
      ) : (
        <>
          <Hero site={site} />
          <Section id="experience" title="Experience">
            <div className="entry-grid single reveal-stagger">
              {experience.map((e) => (
                <Entry key={e.id} title={e.role} href={e.orgUrl} meta={`${e.org} · ${e.place} · ${e.dates}`} summary={e.summary} stats={e.stats} tech={e.tech} image={e.image} imageAlt={e.imageAlt} imageLabel={e.orgUrl ? new URL(e.orgUrl).host.toUpperCase() : e.org.toUpperCase()} />
              ))}
            </div>
          </Section>
          <Section id="projects" title="Projects" archive="/projects" archiveLabel="VIEW ARCHIVE">
            <div className="entry-grid reveal-stagger">
              {projects.filter((p) => p.recent).map((p) => (
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
