import { site, experience, projects, education, leadership, skills } from './data/site.js'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Crew from './components/Crew.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import useScrollFx from './hooks/useScrollFx.js'

export default function App() {
  useScrollFx()
  return (
    <>
      <Header name={site.firstName} resume={site.resume} />
      <Hero site={site} />
      <main>
        <About site={site} />
        <Experience items={experience} />
        <Projects projects={projects} />
        <Crew education={education} leadership={leadership} />
        <Skills skills={skills} />
        <Contact email={site.email} github={site.github} linkedin={site.linkedin} name={site.name} year={site.year} />
      </main>
    </>
  )
}
