import { site, experience, projects, leadership, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Section from './components/Section.jsx'
import Entry from './components/Entry.jsx'
import ProjectList from './components/ProjectList.jsx'
import CommitGrid from './components/CommitGrid.jsx'
import Rich from './components/Rich.jsx'
import Footer from './components/Footer.jsx'
import ContactPage from './pages/ContactPage.jsx'
import useRoute from './hooks/useRoute.js'
import useReveal from './hooks/useReveal.js'

const host = (url) => (url ? new URL(url).host : undefined)

export default function App() {
  const route = useRoute()
  useReveal(route)
  return (
    <>
      <Header name={site.name} route={route} />
      {route === '/contact' ? (
        <>
          <main><ContactPage site={site} /></main>
          <Footer site={site} route={route} />
        </>
      ) : (
      <>
      <main>
        <Hero site={site} />
        <Marquee items={site.marquee} />
        <Section id="about" no="01" title="About">
          <div className="about-grid">
            <div className="about-copy reveal">
              {site.about.paragraphs.map((t) => <p key={t} className="about-lede"><Rich text={t} /></p>)}
              <dl className="about-facts">
                {site.about.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
              </dl>
            </div>
            <div className="reveal"><CommitGrid user={site.githubUser} /></div>
          </div>
        </Section>
        <Section id="experience" no="02" title="Experience">
          <div className="entry-list">
            {experience.map((e, n) => (
              <Entry
                key={e.id}
                index={String(n + 1).padStart(2, '0')}
                title={e.role}
                org={e.org}
                href={e.orgUrl}
                place={e.place}
                dates={e.dates}
                summary={e.summary}
                stats={e.stats}
                tech={e.tech}
                repo={e.repo}
                image={e.image}
                imageAlt={e.imageAlt}
                imageLabel={host(e.orgUrl) ?? e.org}
              />
            ))}
          </div>
        </Section>
        <Section id="projects" no="03" title="Projects">
          <ProjectList projects={projects} />
        </Section>
        <Section id="leadership" no="04" title="Leadership">
          <div className="entry-list">
            <Entry index="01" title={leadership.role} org={leadership.org} dates={leadership.dates} summary={leadership.summary} stats={leadership.stats} tech={leadership.tech} repo={leadership.repo} />
          </div>
        </Section>
        <Section id="skills" no="05" title="Skills">
          <div className="skill-groups">
            {skills.map((g) => (
              <div key={g.label} className="skill-group reveal">
                <h3 className="skill-label">{g.label}</h3>
                <ul className="chips">{g.items.map((i) => <li key={i.name}>{i.name}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>
      </main>
      <Footer site={site} route={route} />
      </>
      )}
    </>
  )
}
