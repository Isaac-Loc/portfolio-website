// A slow ticker band of small caps, like a printed hem tape. The list is repeated so the loop is seamless;
// under prefers-reduced-motion it stands still.
export default function Marquee({ items }) {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t) => <li key={t}>{t}</li>)}
    </ul>
  )
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  )
}
