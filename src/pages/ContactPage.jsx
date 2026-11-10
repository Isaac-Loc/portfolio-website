import { useState } from 'react'

// The Contact page (#/contact): a short intro with direct links, and a form that POSTs to /api/contact
// (Azure Function in production, Vercel Function on staging, Vite middleware in dev). The server validates too and
// may answer with per-field messages, which are shown under the matching inputs.
const EMPTY = { name: '', email: '', subject: '', message: '', company: '' }
const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 }

function check(v) {
  const f = {}
  if (!v.name.trim()) f.name = 'Please enter your name.'
  if (!v.email.trim()) f.email = 'Please enter your email address.'
  else if (!/^\S+@\S+\.\S{2,}$/.test(v.email.trim())) f.email = 'Please enter a valid email address.'
  if (v.message.trim().length < 10) f.message = 'Message must be at least 10 characters.'
  return f
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className={`field${error ? ' has-error' : ''}`}>
      <label htmlFor={`contact-${id}`}>{label}{optional && <span className="field-opt"> (optional)</span>}</label>
      {children}
      {error && <p className="field-error" id={`contact-${id}-error`}>{error}</p>}
    </div>
  )
}

export default function ContactPage({ site }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' }) // idle | sending | sent | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
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
    if (status.state === 'sending') return
    const found = check(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus()
      return
    }
    setStatus({ state: 'sending', message: '' })
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
      setValues(EMPTY)
      setStatus({ state: 'sent', message: 'Thank you. Your message has been sent.' })
    } catch (err) {
      const msg = err?.name === 'TimeoutError' ? 'The request timed out. Please try again.' : err?.message
      setStatus({ state: 'error', message: msg || 'The message could not be sent. Please try again.' })
    }
  }

  return (
    <section className="section contact-page">
      <div className="section-inner">
        <header className="section-head reveal">
          <p className="section-kicker"><span>No. 06</span><i className="rule" /><span>Contact</span></p>
          <h1 className="section-title">Get in touch</h1>
        </header>
        <div className="contact-grid">
          <aside className="contact-aside reveal">
            <p className="about-lede">Messages sent through this form go directly to {site.firstName}'s inbox, and replies come from the same address listed below.</p>
            <dl className="about-facts">
              <div><dt>Email</dt><dd><a className="rich-link" href={`mailto:${site.email}`}>{site.email}</a></dd></div>
              <div><dt>GitHub</dt><dd><a className="rich-link" href={site.github} target="_blank" rel="noopener noreferrer">{site.github.replace('https://', '')}</a></dd></div>
              <div><dt>LinkedIn</dt><dd><a className="rich-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">{site.linkedin.replace('https://www.', '')}</a></dd></div>
              <div><dt>Based in</dt><dd>{site.location}</dd></div>
            </dl>
          </aside>

          <form className="contact-form reveal" onSubmit={onSubmit} noValidate>
            <div className="field-row">
              <Field id="name" label="Name" error={errors.name}>
                <input type="text" autoComplete="name" required {...input('name')} />
              </Field>
              <Field id="email" label="Reply-to email" error={errors.email}>
                <input type="email" autoComplete="email" required {...input('email')} />
              </Field>
            </div>
            <Field id="subject" label="Subject" optional error={errors.subject}>
              <input type="text" {...input('subject')} />
            </Field>
            <Field id="message" label="Message" error={errors.message}>
              <textarea rows={7} required {...input('message')} />
            </Field>
            {/* honeypot: hidden from people, filled in by bots */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
            </div>
            <div className="form-foot">
              <button type="submit" className="btn btn-solid" disabled={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending…' : 'Send message'}
              </button>
              <p className={`form-status ${status.state}`} role="status" aria-live="polite">{status.message}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
