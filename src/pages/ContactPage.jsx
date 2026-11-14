import { useEffect, useRef, useState } from 'react'
import PrintPortrait from '../components/PrintPortrait.jsx'

// The Contact page (#/contact), designed as a postcard that fits one screen: on the left, ruled lines for the
// message ("Dear Isaac, ...") and a signature line where the sender's name is written in script; on the right, a
// perforated stamp carrying the tee-print portrait, the printed address, the reply-to fields and the send button.
// While sending, airmail stripes march along the card's top and bottom edges. A successful send stamps a NEW YORK
// postmark over the stamp; on desktop the card then shrinks and slides into an envelope, the flap folds shut with a
// denim "IL" seal, and the envelope flies off to the top right (on phones the card flies off on its own). A fresh
// blank card then slides back in. Under reduced motion the card just fades out and back. The form POSTs to /api/contact (Azure Function in
// production, Vercel Function on staging, Vite middleware in dev); the server validates too and may answer with
// per-field messages, which show next to the matching labels.
const EMPTY = { name: '', email: '', subject: '', message: '', company: '' }
const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 }
const STAMP_MS = 750 // postmark lands, then the card is posted
const PACK_MS = 1900 // matches the `postcard-pack` / `env-*` animations in style.css
const FLY_MS = 950 // matches the `postcard-fly` animation in style.css
const BUSY = ['sending', 'stamped', 'packing', 'flying']
const NO_ENVELOPE = '(max-width: 900px), (prefers-reduced-motion: reduce)'

// The envelope the card is packed into. It sits around the card in three layers: the back (inside liner) behind
// the card, the front pocket in front of it, and the flap, which starts open behind the card and folds down over it.
function Envelope() {
  return (
    <>
      <div className="env env-back" aria-hidden="true" />
      <svg className="env env-front" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 L50 52 L100 0 L100 100 L0 100 Z" />
        <path className="env-fold" d="M0 100 L46 58 M100 100 L54 58" />
      </svg>
      <svg className="env-flap" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0 L50 100 L100 0 Z" />
      </svg>
      <span className="env-seal" aria-hidden="true">IL</span>
    </>
  )
}

function check(v) {
  const f = {}
  if (v.message.trim().length < 10) f.message = 'At least 10 characters, please.'
  if (!v.name.trim()) f.name = 'Please sign with your name.'
  if (!v.email.trim()) f.email = 'Required.'
  else if (!/^\S+@\S+\.\S{2,}$/.test(v.email.trim())) f.email = 'Enter a valid email.'
  return f
}

function Label({ id, children, error }) {
  return (
    <span className="pc-label">
      <label htmlFor={`contact-${id}`}>{children}</label>
      {error && <em className="pc-error" id={`contact-${id}-error`}>{error}</em>}
    </span>
  )
}

function Postmark({ date }) {
  return (
    <svg className="postmark" viewBox="0 0 220 120" aria-hidden="true">
      <defs><path id="pm-arc" d="M 30 60 a 30 30 0 1 1 60 0 a 30 30 0 1 1 -60 0" /></defs>
      <circle cx="60" cy="60" r="44" />
      <circle cx="60" cy="60" r="27" />
      <text className="pm-ring"><textPath href="#pm-arc" startOffset="0">NEW YORK · BUFFALO · </textPath></text>
      <text className="pm-date" x="60" y="64" textAnchor="middle">{date}</text>
      <path className="pm-wave" d="M 112 38 q 13 -9 26 0 t 26 0 t 26 0 t 26 0 M 112 60 q 13 -9 26 0 t 26 0 t 26 0 t 26 0 M 112 82 q 13 -9 26 0 t 26 0 t 26 0 t 26 0" />
    </svg>
  )
}

export default function ContactPage({ site }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | sending | stamped | flying | sent | error
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const later = (ms, fn) => timers.current.push(setTimeout(fn, ms))
  const busy = BUSY.includes(status.state)
  const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }).replace(/\//g, '.')

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
    if (status.state === 'sent' || status.state === 'error') setStatus({ state: 'idle', message: '' })
  }
  const input = (k) => ({
    id: `contact-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    maxLength: LIMITS[k],
    'aria-invalid': errors[k] ? 'true' : 'false',
    'aria-describedby': errors[k] ? `contact-${k}-error` : undefined,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (busy) return
    const found = check(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus({ state: 'sending', message: 'Sending…' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
        signal: AbortSignal.timeout(15000),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.success !== true) {
        if (json.fields) setErrors(json.fields)
        throw new Error(json.error || 'The message could not be sent. Please try again.')
      }
      const pack = !window.matchMedia(NO_ENVELOPE).matches
      setStatus({ state: 'stamped', message: 'Posted.', pack })
      let t = STAMP_MS
      if (pack) {
        later(t, () => setStatus({ state: 'packing', message: 'Sealing the envelope…', pack }))
        t += PACK_MS
      }
      later(t, () => setStatus({ state: 'flying', message: 'On its way…', pack }))
      later(t + FLY_MS, () => {
        setValues(EMPTY)
        setStatus({ state: 'sent', message: 'Sent. Thank you for writing.' })
      })
    } catch (err) {
      const msg = err?.name === 'TimeoutError' ? 'The request timed out. Please try again.' : err?.message
      setStatus({ state: 'error', message: msg || 'The message could not be sent. Please try again.' })
    }
  }

  return (
    <section className="contact-page">
      <div className="section-inner contact-wrap">
        <header className="contact-head reveal">
          <div>
            <h1 className="contact-page-title">Get in touch<sup className="section-no" aria-hidden="true">06</sup></h1>
          </div>
          <p className="contact-direct">
            <span>Or write directly</span>
            <a className="rich-link" href={`mailto:${site.email}`}>{site.email}</a>
            <span className="contact-direct-links">
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </span>
          </p>
        </header>

        <div className="pc-stage" data-state={status.state} data-pack={status.pack ? '' : undefined}>
          <Envelope />
          {/* state lives in data-state, not className: re-rendering className would wipe the `in` class useReveal adds */}
          <form className="postcard reveal" data-state={status.state} onSubmit={onSubmit} noValidate aria-label="Contact form" aria-busy={busy}>
            <div className="pc-left">
              <Label id="message" error={errors.message}>Message</Label>
              <textarea className="pc-lines" placeholder={`Dear ${site.firstName},`} required {...input('message')} />
              <div className="pc-sign">
                <Label id="name" error={errors.name}>Yours,</Label>
                <input className="pc-signature" type="text" autoComplete="name" placeholder="Your name" required {...input('name')} />
              </div>
            </div>

            <i className="pc-divider" aria-hidden="true" />

            <div className="pc-right">
              <div className="pc-corner">
                <p className="pc-postage" aria-hidden="true">Post card<br /><span>{site.city} · Buffalo</span></p>
                <div className="pc-stamp" aria-hidden="true">
                  <div className="pc-stamp-inner">
                    <PrintPortrait src={site.photos.me} alt="" />
                    <span className="pc-stamp-cap">{site.print.date}</span>
                  </div>
                </div>
                <Postmark date={today} />
              </div>

              <div className="pc-address">
                <span className="pc-label"><span>To</span></span>
                <p className="pc-to">{site.name}</p>
                <p className="pc-to">{site.city}, NY</p>
              </div>

              <div className="pc-from">
                <Label id="email" error={errors.email}>Reply-to email</Label>
                <input className="pc-line" type="email" autoComplete="email" required {...input('email')} />
                <Label id="subject" error={errors.subject}>Subject <small>(optional)</small></Label>
                <input className="pc-line" type="text" {...input('subject')} />
              </div>

              {/* honeypot: hidden from people, filled in by bots */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
              </div>

              <div className="pc-send">
                <p className={`form-status ${status.state}`} role="status" aria-live="polite">{status.message}</p>
                <button type="submit" className="btn btn-solid" disabled={busy}>
                  {busy ? 'Sending…' : 'Send message'} <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
