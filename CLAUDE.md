# CLAUDE.md
Guidance for AI assistants (Claude Code or any other model) working in this repo.

## What this is
Isaac's personal portfolio website. React + Vite single long page. Look (since 2026-11-10): **clean black and white with a denim accent, editorial and a little fancy**, from two user references: a hoodie with an arched script wordmark over "NEW YORK" and a graphic tee with a dissolving screen-printed photo. Pinyon Script (wordmark, section titles) + Cormorant Garamond (serif titles) + Inter (body and small tracked caps). The hero portrait is a canvas "tee print" (`PrintPortrait.jsx`).

**Read [SPEC.md](SPEC.md) first.** It is the source of truth for design decisions, structure, content, and history.

## Rules for every session
1. **Update SPEC.md whenever you change something**: add a dated entry to its Changelog, and update any section (structure, tokens, content model, open items) that the change affects.
2. If a design/tech decision was made in conversation, record it in SPEC.md "Decisions" so the next chat has it.
3. Keep this file short. Put detail in SPEC.md.
4. **Git workflow:** work on the `dev` branch. Do NOT commit or push on your own: after a task, ask the user whether it should be committed (and pushed to `origin/dev`), and only do it on their yes (user's instruction, 2026-11-14; replaces the old auto-commit rule). Never push to `main` unless the user explicitly says so. Don't create PRs unless asked.

## Commands
```bash
npm install        # first time
npm run dev        # dev server at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build
```
Deploys are split by branch: **`main` -> Azure Static Web Apps** (production, **https://isaac-loc.dev**, GitHub Actions; only `main` deploys there) and **`dev` -> Vercel** (staging `*.vercel.app` URL; `vercel.json` disables `main` builds). Production changes go live only when `dev` is merged to `main` (only when the user asks). Details are in SPEC.md ("Deployment"). `README.md` is a personal profile-style intro (user request): keep setup/run/deploy instructions out of it.

## Layout
```
index.html                 Vite entry (fonts loaded here, theme set before paint)
src/main.jsx               React mount + global CSS import
src/App.jsx                Home (Hero, Marquee, About, Experience, Projects, Leadership, Skills) and #/contact (ContactPage), via the hash router
src/data/site.js           ALL editable content, including resume data for sections not built yet
src/hooks/                 useTheme (light/dark), useRoute (hash router), useReveal (scroll reveal)
src/components/            Header, Hero (arched wordmark), PrintPortrait (screen-print canvas), Marquee, Section, Entry, Leadership + LedBanner (LED-wall canvas), Skills (credits list), ProjectList, Shots (grayscale pic + lightbox), CommitGrid, Footer (slim one-row footer; keep it small and simple), Rich; shared nav helpers in src/lib/nav.js
src/styles/style.css       All styling (single file, tokens at the top)
src/pages/ContactPage.jsx  Contact form -> POST /api/contact
functions/                 Azure Functions app (contact API; lib/contact.js is the shared handler, Resend)
api/contact.js             Vercel adapter for the same handler (staging)
public/images/             me.webp (portrait, feeds the tee print) + project pictures
```

## Conventions
- Content goes in `src/data/site.js`, not hard-coded in components. Only show facts from the resume (`Isaac_Loc_Resume.pdf`) or the user's own GitHub repos for each role/project (allowed 2026-10-24); never private repo details, and credit only what Isaac did in team repos. Write in a formal, concise, impersonal register (verb-led sentences, no first-person chatter, no bold highlights).
- NEVER publish the user's phone number anywhere, including inside PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; do not replace it with the original from OneDrive.
- Plain CSS in one file; colours/fonts are CSS variables in `:root`. No CSS framework. Sizes in `rem` (fluid root font-size; primary target is a 1440p monitor).
- Look: black and white plus ONE accent, `--denim` (washed indigo), used only for small details (role word, section numbers, links, active states, GitHub grid, postcard ink). Big script section titles with superscript numbers, few lines, hairline chips, full-colour pictures (denim offset on hover), inverted bands (ticker, footer). Grain only lives inside the tee print. NO cutout/clip-path shapes, tape, stickers, sparkles, custom cursors, tilt, dragging or scroll arrows. The old red retro-pixel theme (Press Start 2P, `.box` pixel frames, typing hero) is scrapped: do not bring it back.
- Tokens in `:root` / `[data-theme="dark"]`: `--paper`, `--card`, `--text` (= `--accent`, `--line`), `--denim` (the accent colour), `--muted`, `--border`, `--band`/`--on-band` (inverted bands), `--shirt`/`--print` (tee panel), `--font-script`, `--font-serif`, `--font-body`. Labels are Inter tracked caps via the shared selector list near the top of `style.css`.
- The hero is one screen tall (below the header) on desktop. Respect `prefers-reduced-motion` (the print, ticker, role fade and reveals all have static fallbacks). Ask about layout/look as you go.

## Gotchas
- Light/dark theme is variable-driven. Never hard-code surface/text colours; use the tokens. Check new UI in both themes (dark = near-black paper, cream ink; bands invert to cream).
- The header is sticky. Anything sized to the screen must subtract `var(--header-h)`.
- There are no scroll arrows; navigation is the header anchor links (hidden under 1100px) plus a thin themed scrollbar.
- The contact API needs `RESEND_API_KEY` and `CONTACT_TO` (set on Azure `isaac-portfolio`/`portfolio_rg`, on Vercel, and locally in the git-ignored `.env`; never commit or print keys). See SPEC.md "Contact form".
- Images are placeholders until paths are set in `site.js`. Placeholders are intentional.
