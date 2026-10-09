# CLAUDE.md

Guidance for AI assistants (Claude Code or any other model) working in this repo.

## What this is
Isaac's personal portfolio website. React + Vite single page, **being rebuilt from the ground up**: right now it is only the header and the hero. Look: clean and professional, patchy teal-blue palette from the user's Luffy tab icon, Press Start 2P (pixel) + Inter, a creamy white backdrop with the teal-blue as the accent, **retro pixel titles with a typing-animation hero**, white `.box` cards with a thin border and a teal top bar. No cutout shapes or decorative widgets.

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
src/App.jsx                Header + route switch (hash routes: / = Hero + Experience/Projects/Skills sections + Contact footer; /experience, /projects = empty pages)
src/data/site.js           ALL editable content, including resume data for sections not built yet
src/hooks/                 useTheme (light/dark), useRoute (hash router), useTyper (hero typing)
src/pages/                 EmptyPage placeholder; build each real page here
src/components/            Header, Hero (retro window portrait), Socials (blinking share-icon widget next to the CTA), PixelPhoto (grain-to-sharp reveal), CommitGrid, Rich (**bold** text)
src/styles/style.css       All styling (single file, tokens at the top)
public/images/             me.png (portrait)
```

## Conventions
- Content goes in `src/data/site.js`, not hard-coded in components. Only show facts on the resume (`Isaac_Loc_Resume.pdf`).
- NEVER publish the user's phone number anywhere, including inside PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; do not replace it with the original from OneDrive.
- Plain CSS in one file; colours/fonts are CSS variables in `:root`. No CSS framework. Sizes in `rem` (fluid root font-size; primary target is a 1440p monitor).
- Professional look: pixel-frame `.box` cards (square corners, 4px notched border via four box-shadows in `--frame`). NO cutout/clip-path shapes, tape, stickers, sparkles, stamps, doodles, custom cursors, paper grain, tilt or hero click widgets (user scratched them). Keep colours flat (no gradients/glows). The signature look is the retro **pixel font** (Press Start 2P) for titles and labels; the hero title is a typed animation (`useTyper`). The bubbled/outlined text was scrapped: do not bring it back.
- Palette: a rich red accent (`--primary`, `--accent`) on a creamy backdrop (`--paper`, `--ink`); variable names like `--teal` are historical and no longer teal-colored, just change their hex values. Fonts: Press Start 2P (all titles, tags and labels; it only has weight 400, so never set bold on it) and Inter (body). The light-theme backdrop is a creamy white (`--paper`); the red is the accent only.
- The hero is one screen tall (below the header). Only the Home page (hero) has content; the nav pages are empty placeholders. Build one page at a time and ask about layout/look as you go. Use the `.box` class for cards. Respect `prefers-reduced-motion`. The user does NOT want dragging.

## Gotchas
- Light/dark theme is variable-driven. Never hard-code surface/text colours: use `--card`, `--text`, `--accent`, `--line`, `--white`. Check new UI in both themes. Dark mode is soft gray surfaces with the blue only as the accent. Body/heading text is near-black (`--text`), not teal-tinted; keep the teal/`--primary` as a small accent, not the main text color.
- The header is sticky. Anything sized to the screen must subtract `var(--header-h)`.
- There are no scroll arrows (user removed them); navigation is the header plus an always-visible themed scrollbar (end of the "Visible scrollbar" block in `style.css`).
- Images are placeholders until paths are set in `site.js`. Placeholders are intentional.
