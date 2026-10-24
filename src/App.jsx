import { site, experience, projects, leadership, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Section from './components/Section.jsx'
import Entry from './components/Entry.jsx'
import ProjectList from './components/ProjectList.jsx'
import Contact from './components/Contact.jsx'
import Background from './components/Background.jsx'
import useRoute from './hooks/useRoute.js'
import useReveal from './hooks/useReveal.js'

export default function App() {
  const route = useRoute()
  useReveal(route)
  return (
    <>
      <Background />
      <Header name={site.firstName} resume={site.resume} route={route} />
        <>
          <Hero site={site} />
          <Section id="experience" no="02" title="Experience">
            <div className="entry-grid single reveal-stagger">
              {experience.map((e) => (
                <Entry key={e.id} title={e.role} href={e.orgUrl} at={e.orgUrl ? new URL(e.orgUrl).host : undefined} meta={`${e.org} · ${e.place} · ${e.dates}`} summary={e.summary} stats={e.stats} tech={e.tech} repo={e.repo} image={e.image} imageAlt={e.imageAlt} imageLabel={e.orgUrl ? new URL(e.orgUrl).host.toUpperCase() : e.org.toUpperCase()} />
              ))}
            </div>
          </Section>
          <Section id="projects" no="03" title="Projects">
            <ProjectList projects={projects} />
          </Section>
          <Section id="leadership" no="04" title="Leadership">
            <div className="entry-grid">
              <Entry title={leadership.role} meta={`${leadership.org} · ${leadership.dates}`} summary={leadership.summary} stats={leadership.stats} tech={leadership.tech} repo={leadership.repo} />
            </div>
          </Section>
          <Section id="skills" no="05" title="Skills">
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
    </>
  )
}
