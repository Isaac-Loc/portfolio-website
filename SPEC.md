# SPEC: Portfolio Website

Living spec. Any AI/model starting a new chat should read this plus [CLAUDE.md](CLAUDE.md). Keep it current: add to the Changelog whenever something is implemented.

## 1. Goal
A personal portfolio for Isaac (GitHub: [Isaac-Loc](https://github.com/Isaac-Loc)). Clean and professional but with personality: a **royal blue** theme with big scroll-animated type. (History: green collage -> One Piece ocean/sky -> royal blue, all on 2026-10-03 / 2026-10-09. The One Piece theme was scrapped at the user's request; keep it out.)

## 2. Design direction
- **Flat solid royal blue background** (`--royal`). NO gradients, blurred glows/blobs, shadows, text-shadows, translucency or tinted hues (user: they look AI-generated). Solid colors only.
- **Big text**: each section opens with a giant white Anton word that slides in and fades up as it rises through the screen (`Big.jsx`, `--t` per `[data-big]`): ABOUT, EXPERIENCE, PROJECTS, EDUCATION (+ leadership), SKILLS, LET'S TALK, each with a small plain subtitle.
- **Content panels**: solid white cards with a royal-blue top border, navy text, blue stat numbers, flat pale-tint chips. Photos (me, cat, car) sit in round frames with a white border.
- Hero: huge "ISAAC / LOC" (white / navy) that scales and fades as you scroll away (`--out`).
- Tokens in `:root` of `style.css`: `--royal #2350e0`, `--royal-deep`, `--royal-dark`, `--tint #e8eeff`, `--navy`. Fonts: Anton (display), Inter (body). Single theme, no toggle. Palette: royal blue, navy, white (+ the pale `--tint`); no red.

## 3. Tech stack
- React 19 + Vite 8, plain JS (JSX), plain CSS in one file. No router yet (user may add routing later; page is a single scroll for now).
- `base: './'` in `vite.config.js`.
- Hosting: Vercel, auto-deployed from GitHub (see Deployment). `vercel.json` sets framework/build/output and headers; `engines.node >= 20.19.0`.
- Run: `npm install`, `npm run dev` (http://localhost:5173), `npm run build`. `.claude/launch.json` defines the `dev` preview server.

### Deployment (Vercel)
Every push redeploys. Settings: framework Vite, install `npm ci`, build `npm run build`, output `dist`. Production Branch was `dev` (later switched to `main` at the user's request, see history); other branches get preview URLs. The user confirmed the live `*.vercel.app` site is reachable without sign-in; the exact public URL is not recorded yet (the GitHub homepage field points at `portfolio-website-three-gold-77.vercel.app`, unverified). Custom domain later via project Settings -> Domains.

## 4. Structure
```
index.html              Vite entry, loads Anton + Inter
src/main.jsx            React mount
src/App.jsx             Scene, Header, Hero, About, Experience, Projects, Crew, Skills, Contact
src/data/site.js        ALL content
src/hooks/useScrollFx.js  scroll vars (--t/--out) + .reveal observer
src/components/         Header, Hero, Big, About, Experience, Projects, Crew (education + leadership), Skills, Contact, Rich (**bold** text)
src/styles/style.css    all styling
public/images/          me.jpg, cat.jpg, car.jpg
```

## 5. Content model (`src/data/site.js`)
Source of truth is the resume (`Isaac_Loc_Resume.pdf`). Only resume facts are shown. The user allowed a bit more copy than before (short About paragraphs, a tagline), but nothing that isn't true to the resume. `**double asterisks**` render bold.
- `site`: `name`, `firstName`, `year`, `email`, `github`, `linkedin`, `resume`, `tagline`, `about.paragraphs[]`, `photos {me, cat, car}`.
- `experience[]`, `projects[]`, `leadership`: `{ title|role, org?, orgUrl?, dates?, place?, summary, stats[{n,l}], tech[], url? }` (`art`, `shape`, `image` fields are leftovers from the old design and unused).
- `education`: `{ school, degree, dates, coursework[] }`. `skills[]`: `{ label, items[{ name, icon? }] }`, `icon` = Simple Icons slug (loaded from cdn.simpleicons.org; hidden if it fails).
- Privacy: the phone number is NEVER published, including in PDFs/images in `public/`. `public/Isaac_Loc_Resume.pdf` is a redacted copy; never replace it with the original from OneDrive. The car photo's licence plate is permanently blurred in the file; never replace it with an unblurred version.

## 6. Decisions
- 2026-10-09: Dropped the collage look for a clean scroll-driven design, first as a One Piece ocean theme, then (same day, user request) scrapped that for a plain royal-blue theme. Removed the old hero widgets, stickers, illustrations, commit grid, theme toggle, scroll arrows, ocean scene and nautical section names.
- Single page for now; user may add routing later.
- Dragging of elements was previously rejected by the user; don't add it.

## 7. Open items
- [ ] Eyeball on real devices (phones, 1440p); tune big-word sizes.
- [ ] Optional: project/experience detail pages (router), real project screenshots, a Bidit link.
- [ ] Record the confirmed public Vercel URL in README and the repo homepage field.

## 8. Changelog
- **2026-10-03**: Original build (green cutout-collage portfolio, React + Vite, Vercel deploy, resume with phone number redacted and purged from git history, favicon, README rewrite, light-default theme). Full history of that design is in git before the 2026-10-09 revamp.
- **2026-10-09**: Complete revamp to a One Piece-themed ocean + sky design in red and blue. New fixed `Scene` (day -> sunset -> night with scroll, ship, waves, clouds, sun, stars), scroll-linked giant section words, frosted content cards, round photo portholes, minimal fixed nav with Resume button. Added more About copy. Removed the old components/hooks/styles. Added `.claude/launch.json`.
- **2026-10-09 (later)**: Scrapped the One Piece theme. Backdrop is now royal blue (gradient + drifting blobs + grid); removed the ship/sea/sky, nautical section names and red accents; nav ids are now `experience`, `education`, etc.
- **2026-10-09 (later 2)**: Removed every gradient, blur, glow, shadow and translucent tint (user: "no hues or gradients"). Background is now flat `--royal`; deleted `Scene.jsx` and its blobs/grid. Cards are solid white, the nav is solid blue, buttons are flat.
