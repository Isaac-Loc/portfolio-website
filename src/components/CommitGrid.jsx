import { useEffect, useState } from 'react'

// A GitHub-style contribution grid (last ~5 months) fed by the user's real public GitHub activity.
// Data comes from a free public endpoint that reads the profile's contribution graph (no token, so nothing
// secret ships in the site). Results are cached for 6 hours in localStorage; if the request fails the grid
// shows quiet empty cells and the card still links to the profile.
const WEEKS = 22
const TTL = 6 * 60 * 60 * 1000
const endpoint = (user) => `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`

// Takes the most recent WEEKS*7 days and pads the front so the first column starts on a Sunday.
function toCells(contributions) {
  const days = contributions.slice(-WEEKS * 7)
  if (!days.length) return []
  const lead = new Date(`${days[0].date}T00:00:00`).getDay()
  return [...Array(lead).fill(null), ...days]
}

export default function CommitGrid({ user }) {
  const [state, setState] = useState({ status: 'loading', cells: [], total: 0 })

  useEffect(() => {
    const key = `commit-grid:v2:${WEEKS}:${user}`
    try {
      const cached = JSON.parse(localStorage.getItem(key))
      if (cached && Date.now() - cached.t < TTL) {
        setState({ status: 'ok', ...cached.data })
        return undefined
      }
    } catch { /* no cache */ }

    let live = true
    fetch(endpoint(user))
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        const data = { cells: toCells(json.contributions ?? []), total: Object.values(json.total ?? {})[0] ?? 0 }
        try { localStorage.setItem(key, JSON.stringify({ t: Date.now(), data })) } catch { /* storage full or blocked */ }
        if (live) setState({ status: 'ok', ...data })
      })
      .catch(() => { if (live) setState((s) => ({ ...s, status: 'error' })) })
    return () => { live = false }
  }, [user])

  const cells = state.cells.length ? state.cells : Array.from({ length: WEEKS * 7 }, () => ({ placeholder: true }))
  const label = state.status === 'ok' ? `${state.total} contributions in the last year` : 'GitHub activity'

  return (
    <a
      className={`commit-card ${state.status}`}
      href={`https://github.com/${user}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${user} on GitHub: ${label}`}
    >
      <div className="commit-head">
        <span className="tag">GITHUB COMMITS</span>
        <span className="commit-total">{state.status === 'ok' ? `${state.total} this year` : state.status === 'error' ? 'offline' : '...'}</span>
      </div>
      <div className="commit-grid" aria-hidden="true">
        {cells.map((c, i) => (c === null
          ? <span key={i} className="cell blank" />
          : (
            <span
              key={i}
              className={`cell l${c.level ?? 0}`}
              title={c.placeholder ? undefined : `${c.count} contribution${c.count === 1 ? '' : 's'} on ${c.date}`}
            />
          )))}
      </div>
    </a>
  )
}
