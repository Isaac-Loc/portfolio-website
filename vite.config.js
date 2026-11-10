import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { handleContact } from './functions/lib/contact.js'

// Dev only: answers POST /api/contact with the same handler the Azure/Vercel functions use, so the contact form
// works under `npm run dev`. Secrets come from .env.local (git-ignored); nothing here is bundled into the site.
function contactApi(env) {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; res.end(); return }
        let raw = ''
        req.on('data', (c) => { raw += c; if (raw.length > 20000) req.destroy() })
        req.on('end', async () => {
          let body = null
          try { body = JSON.parse(raw) } catch { /* invalid JSON -> validation errors */ }
          const result = await handleContact(body, { env, ip: req.socket.remoteAddress })
          res.statusCode = result.status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result.body))
        })
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), contactApi(loadEnv(mode, process.cwd(), ''))],
}))
