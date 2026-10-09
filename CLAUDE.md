# CLAUDE.md

Guidance for AI assistants (Claude Code or any other model) working in this repo.

## What this is
Isaac's personal portfolio website. React + Vite single-page site with a clean, professional look: patchy teal-blue palette from the user's Luffy tab icon, Playfair Display / Silkscreen / Inter fonts, **bubbled (outlined) title lettering**, a one-screen hero and full-screen section bands. No cutout shapes or decorative widgets.

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
Deploys: Vercel auto-deploys from GitHub (project Production Branch = `dev`), so pushing to `dev` publishes the site at the `*.vercel.app` URL. Details are in SPEC.md ("Deployment (Vercel)"). `README.md` is a personal profile-style intro (user request): keep setup/run/deploy instructions out of it.

## Layout
```
index.html                 Vite entry (fonts loaded here, theme set before paint)
src/main.jsx               React mount + global CSS import
src/App.jsx                Page composition
src/data/site.js           ALL editable content (name, links, copy, projects, photo paths)
src/hooks/                 useTheme, useSectionArrows, useNavInteractions, useReveal
src/components/            Header, Hero, StoryCard, Art (SVG illustrations), CommitGrid, Experience, Projects, Education, Leadership, Skills, Contact, Rich (**bold** text)
src/styles/style.css       All styling (single file, tokens at the top)
public/images/             Photos (/images/<file>)
```

## Conventions
- Content goes in `src/data/site.js`, not hard-coded in components. Only show facts on the resume (`Isaac_Loc_Resume.pdf`).
- NEVER publish the user's phone number anywhere, including inside PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; do not replace it with the original from OneDrive.
- Plain CSS in one file; colours/fonts are CSS variables in `:root`. No CSS framework. Sizes in `rem` (fluid root font-size; primary target is a 1440p monitor).
- Professional look: plain rectangles with 2px borders and small radii. NO cutout/clip-path shapes, tape, stickers, sparkles, stamps, doodles, custom cursors, paper grain, tilt or hero click widgets (user scratched them). Keep colours flat (no gradients/glows). The one playful element is the **bubbled title text** (`.sticker-text`: white `-webkit-text-stroke` + `paint-order: stroke fill` + soft offset); keep it on the hero title and section titles.
- Palette is the patchy teal-blue of the user's Luffy tab icon (`--primary`, `--teal`, `--tint`, `--paper`, `--ink`). Fonts: Playfair Display (italic 900, titles), Silkscreen (pixel labels), Inter (body).
- The hero is one screen tall (below the header). Sections after it are full-screen bands (no arrows). Contact is a compact closing band.
- Content below the hero carries `.reveal` so it animates in on scroll. Respect `prefers-reduced-motion`. The user does NOT want dragging.

## Gotchas
- Light/dark theme is variable-driven. Never hard-code surface/text colours: use `--card`, `--text`, `--accent`, `--line`, `--white`. Check new UI in both themes.
- The header is sticky. Anything sized to the screen must subtract `var(--header-h)`.
- There are no scroll arrows (user removed them); navigation is the header plus an always-visible themed scrollbar (end of the "Visible scrollbar" block in `style.css`).
- Images are placeholders until paths are set in `site.js`. Placeholders are intentional.
