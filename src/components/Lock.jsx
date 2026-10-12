// Pixel padlock for the archive buttons. The shackle pops open on hover/focus (see .lock in style.css).
export default function Lock() {
  return (
    <svg className="lock" viewBox="0 0 10 11" aria-hidden="true" shapeRendering="crispEdges">
      <mask id="lock-hole" maskUnits="userSpaceOnUse" x="0" y="0" width="10" height="11">
        <rect width="10" height="11" fill="#fff" />
        <rect x="4" y="6" width="2" height="2" fill="#000" />
        <rect x="4" y="8" width="2" height="1" fill="#000" />
      </mask>
      <g className="lock-shackle" fill="currentColor">
        <rect x="3" y="0" width="4" height="1" />
        <rect x="2" y="1" width="1" height="3" />
        <rect x="7" y="1" width="1" height="3" />
      </g>
      <rect className="lock-body" x="1" y="4" width="8" height="7" fill="currentColor" mask="url(#lock-hole)" />
    </svg>
  )
}
