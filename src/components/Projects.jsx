import StoryCard from './StoryCard.jsx'

export default function Projects({ projects }) {
  return (
    <section id="projects" className="projects">
      <h2 className="section-title reveal"><span className="sticker-text">Projects</span></h2>
      <div className="card-grid two">
        {projects.map((p, i) => (
          <StoryCard key={p.id} {...p} delay={i * 0.15} />
        ))}
      </div>
    </section>
  )
}
