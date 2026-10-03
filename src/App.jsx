import { useEffect } from 'react'
import { site, experience, projects, education, leadership, skills } from './data/site.js'
import { SvgDefs } from './components/Graphics.jsx'
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

export default function App() {
  useSectionArrows()
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'))
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      }),
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <SvgDefs />
      <Header name={site.firstName} />
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
