import { app } from '@azure/functions'
import { handleContact } from '../lib/contact.js'

// Azure Static Web Apps managed Function: POST /api/contact (route "contact"; SWA adds the /api prefix).
// Set RESEND_API_KEY and CONTACT_TO in the Azure portal: Static Web App -> Settings -> Environment variables.
app.http('contact', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'contact',
  handler: async (request) => {
    let body = null
    try { body = await request.json() } catch { /* invalid JSON -> validation errors */ }
    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim()
    const result = await handleContact(body, { ip })
    return { status: result.status, jsonBody: result.body }
  },
})
