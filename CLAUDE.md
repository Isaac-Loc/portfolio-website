# CLAUDE.md

Guidance for AI assistants (Claude Code or any other model) working in this repo.

## What this is
Isaac's personal portfolio website. React + Vite single-page site: a clean, professional version of the original layout (hero + full-screen section bands) in the colours of the user's Luffy tab icon (red, gold, teal, brown on cream), with Playfair Display / Silkscreen / Inter fonts and a light/dark toggle.

**Read [SPEC.md](SPEC.md) first.** It is the source of truth for design decisions, structure, content, and history.

## Rules for every session
1. **Update SPEC.md whenever you change something**: add a dated entry to its Changelog, and update any section (structure, tokens, content model, open items) that the change affects.
2. If a design/tech decision was made in conversation, record it in SPEC.md "Decisions" so the next chat has it.
3. Keep this file short. Put detail in SPEC.md.
4. **Git workflow:** work on the `dev` branch and, from now on, commit and push every change to `origin/dev` (user's standing instruction). Never push to `main` unless the user explicitly says so. Don't create PRs unless asked.

## Commands
```bash
npm install        # first time
npm run dev        # dev server at http://localhost:5173
npm run build      # production build to dist/
npm run preview    # serve the production build
```
Deploys: Vercel auto-deploys from GitHub, so pushing publishes the site at the `*.vercel.app` URL. Details are in SPEC.md ("Deployment (Vercel)"). `README.md` is a personal profile-style intro (user request): keep setup/run/deploy instructions out of it.

## Layout
```
index.html                 Vite entry (fonts loaded here, theme set before paint)
src/main.jsx               React mount + global CSS import
src/App.jsx                Page composition
src/data/site.js           ALL editable content (name, links, copy, projects, photo paths)
src/hooks/                 useTheme, useSectionArrows, useNavInteractions, useReveal
src/components/            Header, Hero, StoryCard, Art (SVG illustrations), CommitGrid, ScrollButton, Experience, Projects, Education, Leadership, Skills, Contact, Rich (**bold** text)
src/styles/style.css       All styling (single file, tokens at the top)
public/images/             Photos (/images/<file>)
```

## Conventions
- Content goes in `src/data/site.js`, not hard-coded in components. Only show facts that are on the resume (`Isaac_Loc_Resume.pdf`).
- NEVER publish the user's phone number anywhere, including inside PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; do not replace it with the original from OneDrive. The car photo's licence plate is blurred in the file; keep it that way.
- Plain CSS in one file; colours/fonts are CSS variables in `:root`. No CSS framework. Sizes in `rem`.
- Clean look: plain rectangles with 2px borders and small radii, thin lines, no rotation/tilt. NO cutout shapes (clip-path polygons), tape, stickers, sparkles, grain, custom cursors, drop shadows, gradients, glows, blur or translucent tints: flat solid colours only (user: they look AI-generated). The One Piece and royal-blue themes were tried and scrapped; don't bring them back.
- Never hard-code surface/text colours: use `--paper`, `--card`, `--text`, `--line`, `--accent`. Check anything new in both themes.
- Keep text short; the user likes pictures and graphics. Sections after the hero are full-screen bands with sticky scroll arrows (see `ScrollButton`, `useSectionArrows`); keep that pattern.
- Respect `prefers-reduced-motion`. The user does NOT want dragging.

## Gotchas
- The header is sticky: anything sized to the screen subtracts `var(--header-h)`.
- Scroll arrows are invisible except in the section you are settled in; don't give them the `reveal` class (the observer ignores the bottom 6% of the screen).
- The hero must stay one screen tall.
