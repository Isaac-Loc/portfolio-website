import ScrollButton from './ScrollButton.jsx'
import StoryCard from './StoryCard.jsx'

export default function Experience({ items }) {
  return (
    <section id="experience" className="experience">
      <ScrollButton to="page-top" up edge="top" />
      <h2 className="section-title reveal"><span className="sticker-text">Experience</span></h2>
      <div className="card-grid two">
        {items.map((job, i) => (
          <StoryCard key={job.id} {...job} title={job.role} tilt={i % 2 ? 'c2' : 'c1'} delay={i * 0.15} />
        ))}
      </div>
      <ScrollButton to="projects" />
    </section>
  )
}
