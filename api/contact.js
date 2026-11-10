import { handleContact } from '../functions/lib/contact.js'

// Vercel Function (staging): POST /api/contact. Same handler as the Azure Function.
// Set RESEND_API_KEY and CONTACT_TO in Vercel: Project -> Settings -> Environment Variables.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ success: false, error: 'Method not allowed.' })
  }
  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim()
  const result = await handleContact(req.body, { ip })
  return res.status(result.status).json(result.body)
}
