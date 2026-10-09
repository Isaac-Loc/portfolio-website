import { useState } from 'react'

// Notification widget (sits at the end of the hero name, like a new-message indicator): a blinking pixel "@" with an unread badge. Clicking it sends a burst of pixel sparks and the social icons pop out in a row.
const ICONS = {
  email: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  github: <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" /></svg>,
  linkedin: <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" /></svg>,
}

// 10 sparks flying out at even angles
const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const a = (i / 10) * Math.PI * 2
  const r = 3.2 + (i % 2) * 1.1 // rem
  return { dx: `${(Math.cos(a) * r).toFixed(2)}rem`, dy: `${(Math.sin(a) * r).toFixed(2)}rem` }
})

export default function Socials({ site }) {
  const [open, setOpen] = useState(false)
  const links = [
    { key: 'email', label: 'Email', href: `mailto:${site.email}` },
    { key: 'github', label: 'GitHub', href: site.github, ext: true },
    { key: 'linkedin', label: 'LinkedIn', href: site.linkedin, ext: true },
  ]
  return (
    <div className={`socials${open ? ' open' : ''}`}>
      {!open && (
        <button type="button" className="tag tag-click" aria-expanded="false" aria-label={`${links.length} new notifications: show contact links`} onClick={() => setOpen(true)}>
          <span className="bell" aria-hidden="true">@</span>
          <span className="badge" aria-hidden="true">{links.length}</span>
        </button>
      )}
      {open && (
        <>
          <span className="sparks" aria-hidden="true">
            {SPARKS.map((s, i) => <i key={i} style={{ '--dx': s.dx, '--dy': s.dy }} />)}
          </span>
          <nav className="social-row" aria-label="Contact">
            {links.map((l, i) => (
              <a
                key={l.key}
                className="tag social-tag"
                style={{ '--i': i }}
                href={l.href}
                aria-label={l.label}
                title={l.label}
                {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {ICONS[l.key]}
              </a>
            ))}
          </nav>
        </>
      )}
    </div>
  )
}
