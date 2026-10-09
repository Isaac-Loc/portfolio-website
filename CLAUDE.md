# CLAUDE.md

Guidance for AI assistants (Claude Code or any other model) working in this repo.

## What this is
Isaac's personal portfolio website. React + Vite single-page site with a clean, One Piece-inspired **ocean + sky** theme in red and blue: a fixed backdrop that shifts from day to sunset to night as you scroll, and giant section words that animate in.

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
index.html                 Vite entry (fonts loaded here)
src/main.jsx               React mount + global CSS import
src/App.jsx                Page composition
src/data/site.js           ALL editable content (name, links, copy, projects, photo paths)
src/hooks/useScrollFx.js   scroll-linked CSS vars + reveal observer
src/components/            Scene (backdrop), Header, Hero, Big (giant word), About, Experience, Projects, Crew, Skills, Contact, Rich (**bold** text)
src/styles/style.css       All styling (single file, tokens at the top)
public/images/             Photos (/images/<file>)
```

## Conventions
- Content goes in `src/data/site.js`, not hard-coded in components. Only show facts that are on the resume (`Isaac_Loc_Resume.pdf`).
- NEVER publish the user's phone number anywhere, including inside PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; do not replace it with the original from OneDrive. The car photo's licence plate is blurred in the file; keep it that way.
- Plain CSS in one file; colors/fonts are CSS variables in `:root`. No CSS framework. Sizes in `rem`.
- Look: clean frosted white cards (`.panel`), red + blue accents, Anton for big words, Inter for text. Don't copy One Piece logos/characters.
- Every section starts with `<Big word=... sub=... />` and uses `.reveal` on its blocks.
- Scroll effects are driven by CSS vars set in `useScrollFx.js` (`--p`, `--dusk`, `--night` on `<html>`, `--t` on `[data-big]`, `--out` on the hero). Add new scene pieces by reading those vars in CSS.
- Respect `prefers-reduced-motion`. The user does NOT want dragging.

## Gotchas
- The scene is `position: fixed; z-index: -1`; page content must stay transparent over it, with text readable at day, sunset and night (cards are light, big words have a white stroke).
- `.waves` paths repeat seamlessly only if `1200 / wavelength` is an integer (240, 300, 400 are used). Keep that when changing them.
- Nav is fixed (`--nav-h`); hero and anchors account for it via padding and `scroll-padding-top`.
