// Fixed royal-blue backdrop: soft glowing blobs and a faint grid that drift with the scroll
// (CSS var --p, set by useScrollFx).
export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
      <div className="grid" />
    </div>
  )
}
