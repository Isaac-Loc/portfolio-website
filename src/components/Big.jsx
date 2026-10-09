// Giant section word that slides and fades in as it rises through the screen (see useScrollFx).
export default function Big({ word, sub }) {
  return (
    <div className="big" data-big>
      <h2>{word}</h2>
      {sub && <p>{sub}</p>}
    </div>
  )
}
