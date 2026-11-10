// Shared contact-form handler used by every host:
//   functions/src/contact.js  -> Azure Static Web Apps managed Function (production, isaac-loc.dev/api/contact)
//   api/contact.js            -> Vercel Function (staging)
//   vite.config.js            -> dev-server middleware (npm run dev, reads .env.local)
// It validates the fields, drops obvious spam, and sends the message to CONTACT_TO through the Resend HTTP API.
// Secrets come from environment variables only (never from the browser):
//   RESEND_API_KEY  required, a Resend API key (re_...)
//   CONTACT_TO      required, the inbox that receives messages
//   CONTACT_FROM    optional, defaults to Resend's shared test sender (works without a verified domain, but can
//                   only deliver to the Resend account's own email). After verifying isaac-loc.dev in Resend, set e.g.
//                   "Portfolio <contact@isaac-loc.dev>".

const LIMITS = { name: 100, email: 254, subject: 200, message: 5000 }
const MIN_MESSAGE = 10
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map() // best-effort per-instance rate limit: ip -> [timestamps]

const oneLine = (v) => String(v ?? '').replace(/[\r\n\t]+/g, ' ').trim()
const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

function rateLimited(ip, now) {
  if (!ip) return false
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > MAX_PER_WINDOW
}

export function validate(body) {
  const data = {
    name: oneLine(body?.name),
    email: oneLine(body?.email),
    subject: oneLine(body?.subject),
    message: String(body?.message ?? '').replace(/\r\n/g, '\n').trim(),
  }
  const fields = {}
  if (!data.name) fields.name = 'Please enter your name.'
  else if (data.name.length > LIMITS.name) fields.name = `Name must be ${LIMITS.name} characters or fewer.`
  if (!data.email) fields.email = 'Please enter your email address.'
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) fields.email = 'Please enter a valid email address.'
  if (data.subject.length > LIMITS.subject) fields.subject = `Subject must be ${LIMITS.subject} characters or fewer.`
  if (data.message.length < MIN_MESSAGE) fields.message = `Message must be at least ${MIN_MESSAGE} characters.`
  else if (data.message.length > LIMITS.message) fields.message = `Message must be ${LIMITS.message} characters or fewer.`
  return { data, fields }
}

// Returns { status, body } so each host adapter only has to translate it into its own response type.
export async function handleContact(body, { env = process.env, ip = '', fetchImpl = fetch, now = Date.now() } = {}) {
  // Honeypot: a hidden "company" field real visitors never fill in. Pretend success so bots learn nothing.
  if (body && typeof body.company === 'string' && body.company.trim()) return { status: 200, body: { success: true } }
  if (rateLimited(ip, now)) return { status: 429, body: { success: false, error: 'Too many messages. Please try again later.' } }

  const { data, fields } = validate(body)
  if (Object.keys(fields).length) return { status: 400, body: { success: false, error: 'Please check the highlighted fields.', fields } }

  const key = env.RESEND_API_KEY
  const to = env.CONTACT_TO
  if (!key || !to) return { status: 500, body: { success: false, error: 'The contact form is not configured yet. Please email directly.' } }

  const subject = `Portfolio: ${data.subject || `Message from ${data.name}`}`
  const text = `From: ${data.name} <${data.email}>\n\n${data.message}\n`
  const html = `<p><strong>From:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p>`
    + (data.subject ? `<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>` : '')
    + `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`

  try {
    const res = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.CONTACT_FROM || 'Portfolio <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: data.email,
        subject,
        text,
        html,
      }),
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      console.error('Resend error', res.status, detail.slice(0, 500))
      return { status: 502, body: { success: false, error: 'The message could not be sent. Please try again or email directly.' } }
    }
    return { status: 200, body: { success: true } }
  } catch (err) {
    console.error('Resend request failed', err)
    return { status: 502, body: { success: false, error: 'The message could not be sent. Please try again or email directly.' } }
  }
}
