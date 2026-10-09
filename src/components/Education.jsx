import StoryCard from './StoryCard.jsx'

export default function Education({ education }) {
  return (
    <section className="education">
      <h2 className="section-title reveal"><span className="sticker-text">Education</span></h2>
      <StoryCard
        title={education.school}
        dates={education.dates}
        place={education.place}
        art={education.art}
        shape={education.shape}
        image={education.image}
        summary={`**${education.degree}**`}
        chips={education.coursework}
        tilt="c1"
      />
    </section>
  )
}
