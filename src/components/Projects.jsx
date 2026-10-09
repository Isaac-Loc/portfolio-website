import ScrollButton from './ScrollButton.jsx'
import { Deco } from './Graphics.jsx'
import StoryCard from './StoryCard.jsx'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="projects">
      <ScrollButton to="experience" up edge="top" />
      <h2 className="section-title reveal"><span className="sticker-text">Projects</span></h2>
      <div className="card-grid two">
        {projects.map((p, i) => (
          <StoryCard key={p.id} {...p} tilt={i % 2 ? 'c2' : 'c1'} delay={i * 0.15} />
        ))}
      </div>
      <Deco id="sparkle" className="sparkle sp5" />
      <Deco id="asterisk" className="sparkle sp6" />
      <ScrollButton to="education" />
    </section>
  )
}
