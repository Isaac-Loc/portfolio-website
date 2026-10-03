import StoryCard from './StoryCard.jsx'

export default function Leadership({ leadership }) {
  return (
    <section id="leadership" className="leadership">
      <h2 className="section-title reveal"><span className="sticker-text">Leadership</span></h2>
      <StoryCard {...leadership} title={leadership.role} tilt="c2" />
    </section>
  )
}
