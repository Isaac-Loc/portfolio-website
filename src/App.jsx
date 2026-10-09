import { site, experience, projects, education, leadership, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Leadership from './components/Leadership.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import ScrollButton from './components/ScrollButton.jsx'
import useSectionArrows from './hooks/useSectionArrows.js'
import useNavInteractions from './hooks/useNavInteractions.js'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useSectionArrows()
  useNavInteractions()
  useReveal()
  return (
    <>
      <Header name={site.firstName} resume={site.resume} />
      <Hero site={site} />
      <main>
        <Experience items={experience} />
        <Projects projects={projects} />
        <div id="education" className="duo">
          <ScrollButton to="projects" up edge="top" />
          <div className="duo-grid">
            <Education education={education} />
            <Leadership leadership={leadership} />
          </div>
          <ScrollButton to="skills" />
        </div>
        <Skills skills={skills} />
        <Contact email={site.email} github={site.github} linkedin={site.linkedin} name={site.name} year={site.year} />
      </main>
    </>
  )
}
