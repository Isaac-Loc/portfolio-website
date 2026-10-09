# SPEC: Portfolio Website

Living spec. Any AI/model starting a new chat should read this plus [CLAUDE.md](CLAUDE.md). Keep it current: add to the Changelog whenever something is implemented.

## 1. Goal
A personal portfolio for Isaac (GitHub: [Isaac-Loc](https://github.com/Isaac-Loc)). Clean, professional and personal. History: green cutout/scrapbook collage (2026-10-03) -> One Piece ocean theme -> royal blue (both scrapped 2026-10-09) -> **the original layout and fonts, de-cluttered, in the colours of the user's Luffy tab icon** (current). Don't bring back the ocean, royal blue, or the cutout/collage elements.

## 2. Design direction
- **Original layout kept**: pinned header (ISAAC.EXE pixel tag + EXPERIENCE / PROJECTS / SKILLS / CONTACT + Resume + light/dark toggle), a one-screen hero ("Hi, I'm Isaac / Welcome to my portfolio!", About card, photo, cat, car, live GitHub commit grid), then full-screen bands: Experience, Projects, Education + Leadership side by side, Skills, a compact Contact. Sticky round scroll arrows that only show in the section you are settled in.
- **Original fonts**: Playfair Display italic 900 (titles, big name, stat numbers), Silkscreen (pixel tags/labels), Inter (body).
- **Cut out the cutout theme**: no jagged/starburst clip-path shapes, washi tape, stickers, sparkles, stamp, doodles, rotation/tilt, paper grain, custom cursors, hard offset shadows or hero click interactions. Cards, photos and tags are plain rectangles with 2px solid borders and small radii; thin lines, lots of space.
- **Flat colour only** (no gradients, glows, blur, shadows, translucency: the user said they look AI-generated). Palette sampled from the Luffy favicon: paper `#fbf3e4`, ink/brown `#462c2f`, red `#f35556` (accent, titles, arrows), gold `#f9b54a`, butter `#f8d78e` (stat circles), teal `#7cb8b9` (illustration/photo frames), skin `#f8cfaf`. Dark theme swaps surfaces to deep brown (`#231618`) with the same accents. Default is light; the toggle is remembered in localStorage.

## 3. Tech stack
- React 19 + Vite 8, plain JS (JSX), plain CSS in one file. No router yet (user may add routing later; page is a single scroll for now).
- `base: './'` in `vite.config.js`.
- Hosting: Vercel, auto-deployed from GitHub (see Deployment). `vercel.json` sets framework/build/output and headers; `engines.node >= 20.19.0`.
- Run: `npm install`, `npm run dev` (http://localhost:5173), `npm run build`. `.claude/launch.json` defines the `dev` preview server.

### Deployment (Vercel)
Every push redeploys. Settings: framework Vite, install `npm ci`, build `npm run build`, output `dist`. Production Branch was `dev` (later switched to `main` at the user's request, see history); other branches get preview URLs. The user confirmed the live `*.vercel.app` site is reachable without sign-in; the exact public URL is not recorded yet (the GitHub homepage field points at `portfolio-website-three-gold-77.vercel.app`, unverified). Custom domain later via project Settings -> Domains.

## 4. Structure
```
index.html              Vite entry, loads Playfair Display + Silkscreen + Inter, sets data-theme before paint
src/main.jsx            React mount
src/App.jsx             Header, Hero, Experience, Projects, .duo (Education + Leadership), Skills, Contact
src/data/site.js        ALL content
src/hooks/              useTheme, useSectionArrows, useNavInteractions, useReveal
src/components/         Header, Hero, StoryCard, Art (flat SVG illustrations), CommitGrid, ScrollButton, Experience, Projects, Education, Leadership, Skills, Contact, Rich (**bold** text)
src/styles/style.css    all styling (tokens at the top)
public/images/          me.jpg, cat.jpg, car.jpg
```

## 5. Content model (`src/data/site.js`)
Source of truth is the resume (`Isaac_Loc_Resume.pdf`). Only resume facts are shown. The user allowed a bit more copy than before (short About paragraphs, a tagline), but nothing that isn't true to the resume. `**double asterisks**` render bold.
- `site`: `name`, `firstName`, `year`, `email`, `github`, `linkedin`, `resume`, `tagline`, `about.paragraphs[]`, `photos {me, cat, car}`.
- `experience[]`, `projects[]`, `leadership`: `{ title|role, org?, orgUrl?, dates?, place?, art, image, summary, stats[{n,l}], tech[], url? }`. `art` picks an SVG illustration in `Art.jsx` (`ledwall | shield | kanban | auction | calendar | cap`); setting `image` shows a picture instead. (`shape` is unused.) `site.about.paragraphs[]`: the hero shows the first two.
- `education`: `{ school, degree, dates, coursework[] }`. `skills[]`: `{ label, items[{ name, icon? }] }`, `icon` = Simple Icons slug (loaded from cdn.simpleicons.org; hidden if it fails).
- Privacy: the phone number is NEVER published, including in PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; never replace it with the original from OneDrive. The car photo's licence plate is permanently blurred in the file; never replace it with an unblurred version.

## 6. Decisions
- 2026-10-09: After trying a One Piece ocean theme and a royal-blue theme (both scrapped), the user asked to keep the ORIGINAL website's look and fonts, remove the cutout theme, make it clean/professional, and use the colours of their Luffy tab icon. Implemented by porting the original components back and rewriting the stylesheet (see Design direction).
- Single page for now; user may add routing later.
- Dragging of elements was previously rejected by the user; don't add it.
- Flat solid colours only; no gradients/glows/shadows.

## 7. Open items
- [ ] Eyeball on real devices (phones, 1440p), especially the hero and the full-screen bands.
- [ ] Optional: project/experience detail pages (router), real project screenshots, a Bidit link.
- [ ] Record the confirmed public Vercel URL in README and the repo homepage field.

## 8. Changelog
- **2026-10-03**: Original build (green cutout-collage portfolio, React + Vite, Vercel deploy, resume with phone number redacted and purged from git history, favicon, README rewrite, light-default theme). Full history of that design is in git before the 2026-10-09 revamp.
- **2026-10-09**: Complete revamp to a One Piece-themed ocean + sky design in red and blue. New fixed `Scene` (day -> sunset -> night with scroll, ship, waves, clouds, sun, stars), scroll-linked giant section words, frosted content cards, round photo portholes, minimal fixed nav with Resume button. Added more About copy. Removed the old components/hooks/styles. Added `.claude/launch.json`.
- **2026-10-09 (later)**: Scrapped the One Piece theme. Backdrop is now royal blue (gradient + drifting blobs + grid); removed the ship/sea/sky, nautical section names and red accents; nav ids are now `experience`, `education`, etc.
- **2026-10-09 (later 2)**: Removed every gradient, blur, glow, shadow and translucent tint (user: "no hues or gradients"). Background is now flat `--royal`; deleted `Scene.jsx` and its blobs/grid. Cards are solid white, the nav is solid blue, buttons are flat.
- **2026-10-09 (later 3)**: Swapped the fonts (Anton + Inter) for Nunito (user: the font was ugly, wants friendlier). Big words are now title case at weight 900, slightly smaller and tighter.
- **2026-10-09 (later 4)**: Went back to the original website's layout, components, fonts (Playfair/Silkscreen/Inter), light/dark toggle and scroll arrows, but stripped the cutout theme (clip-path shapes, tape, stickers, sparkles, tilt, grain, cursors, shadows) and made everything clean flat rectangles with thin borders. Recoloured to the Luffy tab icon palette (red/gold/teal/brown on cream). New: `Hero` is a clean two-column layout; `StoryCard` is a plain card; hooks `useNavInteractions` (simplified) and `useReveal`; removed Big/About/Crew/useScrollFx from the royal-blue version. Hero About uses `site.about.paragraphs`.
