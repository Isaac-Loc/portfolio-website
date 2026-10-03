# SPEC: Portfolio Website

Living spec. Any AI/model starting a new chat should read this plus [CLAUDE.md](CLAUDE.md). Keep it current: add to the Changelog whenever something is implemented.

## 1. Goal
A personal portfolio for Isaac (GitHub: [Isaac-Loc](https://github.com/Isaac-Loc)) that showcases projects with a distinctive, highly-graphic, layered look instead of a plain template.

## 2. Design direction
**Pinterest board "cutout / scrapbook collage"**, inspired by a reference poster (stickered photo cutouts on crumpled paper, with layered graphics). Palette is **green and white** on pale mint paper.

Visual language:
- **Paper background**: pale mint (`--paper`), soft radial lighting, fixed noise grain overlay (SVG feTurbulence, `mix-blend-mode: multiply`).
- **Sticker lettering**: Playfair Display italic 900, blue fill with a thick white paper outline and a hard offset shadow.
- **Cutout shapes**: jagged / starburst `clip-path` polygons with a white sticker border over a navy fill and drop shadow. Variants: `burst` (12-point), `burst8`, `jag`, `polaroid`.
- **Pixel labels** (`.tag`): Silkscreen font, dark-blue box with a double white/blue frame, slightly rotated.
- **Notes** (`.note`): white paper strips, italic, blue border, offset shadow.
- **Extras**: washi tape, sparkles/asterisks (float animation), dotted arrow, scribble, circular "PORTFOLIO" stamp, frosted "View my GitHub" pill.
- Everything is slightly rotated and overlapping to feel hand-assembled.
- Single light theme (no dark mode).

### Design tokens (`src/styles/style.css` `:root`)
| Token | Value | Use |
|---|---|---|
| `--paper` / `--paper-2` | `#e2eee6` / `#f2f8f4` | background / tag frame |
| `--white` | `#fff` | sticker edges, notes |
| `--green` | `#1f8a4c` | text fill, tags, accents |
| `--deep` | `#12502c` | cutout fill |
| `--ink` | `#0d3b22` | body text |
| `--font-display / pixel / body` | Playfair Display / Silkscreen / Inter | |

## 3. Tech stack
- React 19 + Vite 8 (`@vitejs/plugin-react`), plain JavaScript (JSX), plain CSS. No router, no CSS framework.
- `base: './'` in `vite.config.js` so the build works from any path (e.g. GitHub Pages).
- Run: `npm install`, `npm run dev` (http://localhost:5173), `npm run build`.

## 4. Structure
```
index.html              mounts #root, loads Google Fonts
src/main.jsx            entry
src/App.jsx             SvgDefs, Header, Hero, Projects, About, Contact, footer
src/data/site.js        content (see section 5)
src/components/
  Graphics.jsx          SvgDefs (symbols: sparkle, asterisk, arrow, scribble, link), Deco, Slot, Tape, Burst, Cut
  Header.jsx            logo tag + nav tags
  Hero.jsx              poster collage (section#top > .stage)
  StoryCard.jsx         shared card (art + summary + stats + tags)
  Art.jsx               built-in SVG illustrations (cards)
  Stickers.jsx          artistic die-cut hero stickers (circuit flower, pixel heart, cassette, constellation, vinyl)
  Experience.jsx / Projects.jsx / Education.jsx / Leadership.jsx / Skills.jsx / Contact.jsx
  Rich.jsx              renders **bold** markup
src/styles/style.css    all styles
public/images/          user images
```

## 5. Content model (`src/data/site.js`)
Source of truth for content is the user's resume (`Isaac_Loc_Resume.pdf`). **Only resume content is shown on the site, and text is kept to 1-2 short sentences per item (user prefers pictures over words).** `**double asterisks**` in strings render bold.
- `site.about.sentences[]`: the 2-3 short sentence intro shown in a note card under the hero title (written from resume facts only; phones show the first two).
- `site`: `name`, `firstName`, `year`, `email`, `github`, `linkedin`, `heroStickers[]` (names of artistic hero stickers: `flower | heart | cassette | constellation | vinyl`, drawn in `Stickers.jsx`), `heroPhotos {main, upper, lower}` (main = big jagged frame in the centre; upper/lower = the two starbursts on the right). All are plain photos cropped to the shape with `object-fit: cover` (no cutout/transparent PNG needed)..
- `experience[]`, `projects[]`, `leadership`: `{ title|role, org?, orgUrl?, dates?, place?, art, shape, image, summary, stats[{n,l}], tech[], url? }`.
- `education`: `{ school, place, degree, dates, art, shape, image, coursework[] }` (only 4 key courses shown).
- `skills[]`: `{ label, items[{ name, icon? }] }`; `icon` is a Simple Icons slug.
- `art` picks a built-in SVG illustration drawn in `Art.jsx`: `ledwall | shield | kanban | auction | calendar | cap`. Setting `image` to a file in `public/images/` replaces the illustration with a real picture.
- `heroPhotos.main` is `/images/me.jpg`: a crop (520x759, aspect 0.685, matching the frame so nothing else is trimmed) of the user's own photo, centred on them with the laptop and glass fully in frame, trimmed tight (little ceiling/brick), other guests cropped out. The source crop box was (545,200)-(1065,959) of the 1552x1031 original. The user explicitly said NO cutout is needed. Phone number is intentionally NOT published.
- Skill-tile logos load from `https://cdn.simpleicons.org/<slug>/1f8a4c` (needs internet; a failed icon falls back to a green diamond).

## 6. Page sections (top to bottom)
1. **Header**: pinned (`position: sticky; top: 0`) full-width bar that stays visible while scrolling: `ISAAC.EXE` tag (scrolls to the very top, clears the hash) + EXPERIENCE / PROJECTS / SKILLS / CONTACT. Buttons are interactive (`hooks/useNavInteractions.js`): hover pop, `.active` highlight for the section you are in, sparkle burst + wiggle on click. `--header-h` (4.5rem, 3.6rem on phones) is subtracted everywhere: `html { scroll-padding-top }`, hero height, section `min-height: calc(100svh - var(--header-h))`, and the up arrows pin at `top: calc(var(--header-h) + 1.1rem)`. Shared effects live in `utils/fx.js`.
2. **Hero poster**: exactly one viewport tall (`100svh - --header-h`) so no other section is visible while on it. Inside, a `.stage` is the largest 16:9 box that fits (9:14 on phones <=760px) and everything in it is positioned in `%` and sized in `cqw`. Contains the "Hi, I'm / Isaac / Welcome to my / Portfolio!" sticker lettering, big jagged photo slot, two starburst photo slots, pixel tags, notes, stamp, decorations, GitHub pill, and a round bouncing scroll button at the bottom centre that jumps to the next section (`#experience`). The hero also has an "ABOUT ME" note card under the title (`.about-note`). The "View my GitHub" pill was removed (GitHub is in Contact). No technical word labels in the hero.
3. **Experience**, 4. **Projects**, 5. **Education** + **Leadership** (side by side in `.duo-grid` inside the `.duo` band): all use one `StoryCard` = illustration in a cutout frame + title + 1-2 sentence summary + round stat stickers (e.g. 50+ LED tiles) + tech tags.
6. **Skills**: four labelled groups of logo tiles (icon over name).
7. **Contact**: compact band: email, LinkedIn, GitHub tags + copyright + back-to-top arrow.

### Full-screen sections + scroll buttons
- Every section after the hero is its own band: `min-height: 100svh`, content vertically centred (auto margins), `overflow: clip` (not `hidden`, which would break sticky). The hero is `100svh - header`, so on every landing a section's top is at the top of the screen and the previous/next section never bleed in.
- Every section ends with a round `ScrollButton` (`ScrollButton.jsx`) that is `position: sticky; bottom: 1.1rem`, so it sits in the **same spot on screen (centred, 1.1rem above the bottom edge) every time you land in a section**, and stays there while scrolling through a section taller than the screen. The hero uses an absolute version (`hero` prop) at the same spot.
- Each section after the hero ALSO has an up arrow (`edge="top"` variant of `ScrollButton`) pinned `top: 1.1rem`, centred, which jumps to the previous section (Experience -> `#page-top` (the original page-load view: header + hero, user request), Projects -> Experience, Education/Leadership band -> Projects, Skills -> Education band, Contact -> Skills). Section top padding is 1.1rem so it sits in the same spot on every landing, mirroring the down arrow.
- Order: Hero -> Experience -> Projects -> Education/Leadership band (`#education` is the `.duo` wrapper, with an inner `.duo-grid`) -> Skills -> Contact. Contact is the exception: a compact closing band (not full-screen) with the "Say hi!" header, tags and copyright (the old footer was folded into it); its up-arrow targets `#page-top` (the site `<header>`), so it scrolls all the way to the very top and shows the top header.
- Scroll buttons are NOT `reveal` elements: they sit inside the bottom 6% of the screen, which the reveal observer's `rootMargin` excludes, so a `reveal` button would never become visible. They are always visible. Verified at 2560x1300: every landing puts it 21px above the bottom edge. New sections should follow this pattern.

### Selection + cursor
- `::selection` is a light mint green (`rgba(139,232,173,.6)`, text stays `--ink`).
- Custom cursors are inline SVG data URIs in `:root` (`--cursor-default`: green arrow with a mint sparkle, hotspot 5,3; `--cursor-pointer`: green sparkle star over links/buttons/hero widgets, hotspot 16,16; `--cursor-text`: green I-beam over text). Each falls back to the normal cursor. They are applied at the end of `style.css`.

### Motion
- Hero pieces pop in on load (`pop` keyframes using only `scale`/`opacity`, so they do not fight rotate/float transforms).
- Everything below the hero has class `reveal` and fades/slides up when scrolled into view (IntersectionObserver in `App.jsx` adds `.in`; stagger via `--d` CSS var). Uses the individual `translate`/`scale` properties so it composes with existing `transform` rotations. Disabled under `prefers-reduced-motion`. New sections/cards should add the `reveal` class.

### Responsive / scaling
- Root font-size is fluid: 16px up to 1600px wide, growing to ~19.4px at 2560px (so all `rem` sizes scale on big monitors). `--page-w: min(90vw, 82rem)` is the content width.
- Primary target: the user's 1440p monitor (2560x1440, ~2560x1300 browser area). Tune proportions there first, then replicate for other sizes once the user approves.

## 7. Decisions
- Chose the cutout-collage look over a clean Pinterest masonry grid (user wanted "a ton of graphics and layers").
- Migrated from plain HTML/CSS to React + Vite so the user can run locally and iterate on richer designs.
- Name is Isaac Loc (from the resume); hero lettering uses the first name.
- Site shows only what is on the resume (user request): the placeholder About section and the non-resume repo cards (Pacman, Burger Flipper, Theta Tau Game, OT LED Wall) were removed. The LED wall appears only in the Leadership bullets.
- Switched palette from blue to green (user request); page widened to 1280px and hero changed from a single tall column to a wide landscape layout.
- Sections must not bleed into each other: each is its own clipped band (`overflow: clip`, 4rem padding) with a dashed divider. Keep new decorations inside their section.
- Light theme only; the original template's `prefers-color-scheme` dark mode was removed.

## 8. Open items / TODO
- [ ] Add real photos (they replace the illustrations when `image` is set): transparent-PNG main cutout, two burst photos, project images.
- [ ] Add a link for Bidit if there is a repo/demo.
- [ ] Confirm hero/section proportions on the 1440p monitor, then replicate for other screen sizes (1080p, laptops, tablets, phones).
- [ ] Deploy (e.g. GitHub Pages / Netlify / Vercel).

## 9. Changelog
- **2026-10-03**: Cloned repo (was a bare HTML/CSS template). Tried a Pinterest masonry card layout, then replaced it with the cutout-collage design. Converted to React + Vite (components, `site.js` content file, single stylesheet). Added CLAUDE.md and SPEC.md.
- **2026-10-03 (later)**: Recolored blue to green (CSS vars renamed `--blue`->`--green`, `--navy`->`--deep`). Spread layout out: landscape hero with portrait fallback on phones, 4-across projects, About and Contact side by side, page max-width 1280px.
- **2026-10-03 (later 2)**: Section separation: `main > section` and `.duo > section` are `position: relative; overflow: clip` with padding, dashed dividers between Hero/Projects/About+Contact, and a vertical divider between About and Contact. Stamp moved clear of the title.
- **2026-10-03 (later 3)**: Content replaced with resume data (Experience, Projects, Education, Leadership, Skills, Contact; About removed; phone not published). Hero is now full-viewport with a fitted 16:9 stage; fluid root font-size and `--page-w` for large monitors. Hero moved outside `<main>`.
- **2026-10-03 (later 4)**: Scaled everything down slightly (stage 94%, smaller fluid root size). Cut all bullets to 1-2 sentence summaries. Added graphics: SVG illustration per card (`Art.jsx`), round stat stickers, Simple Icons logo tiles for skills, tech-logo stickers in the hero. Added `StoryCard`; removed bullet-list styles.
- **2026-10-03 (later 5)**: Replaced the hero's tech-logo stickers with artistic die-cut stickers (circuit-trace flower with LED petals, twinkling pixel heart, spinning cassette, node constellation, spinning vinyl). Direction: the portfolio should express experience and technical knowledge artistically, not as literal tech badges; prefer art metaphors (circuits as flowers, LEDs as pixel art, networks as constellations).
- **2026-10-03 (later 6)**: Removed the technical word labels from the hero (CS @ UB / FULL STACK / EMBEDDED tags and the two notes). Added a bottom-centre scroll button on the hero. Added entrance animations: hero pop-in on load and scroll-triggered reveal for all other content.
- **2026-10-03 (later 7)**: Added the scroll button to every section (shared `ScrollButton` component); last one goes back to top.
- **2026-10-03 (later 8)**: Sections are now full-screen bands with centred content; scroll buttons are sticky at the bottom of the screen so they land in the same spot every time. `#education` now targets the whole Education/Leadership band.
- **2026-10-03 (later 9)**: Contact made small again (compact band, footer merged into it); its up-arrow now scrolls to `#page-top` (the header at the very top) instead of the hero.
- **2026-10-03 (later 10)**: Fixed the scroll buttons (including the final up arrow) being invisible in real use: they had the `reveal` class but sit in the observer's excluded bottom margin, so they never faded in. They are now always visible. Earlier tests had masked this by forcing `.in` on everything; test reveal behaviour without forcing it.
- **2026-10-03 (later 11)**: Made every hero widget interactive (`src/hooks/useHeroInteractions.js`): hover pop (`scale 1.07`) plus click/tap reactions (heart -> floating hearts, cassette/vinyl -> notes + faster spin, flower -> bloom, stamp -> spin, sparkles/others -> sparkle burst + wiggle; the GitHub pill still just links). Dragging was tried and REMOVED at the user's request: they like the hover pop but not the drag. Do not re-add dragging.
- **2026-10-03 (later 12)**: Added a custom light-green text selection highlight and a custom cursor set (arrow / sparkle-star pointer / text beam) in the site's green style.
- **2026-10-03 (later 13)**: Added an up arrow (previous section) at the top centre of every section after the hero, pinned like the down arrows. Verified at 2560x1300: every landing has the up arrow 21px from the top and the down arrow 21px from the bottom. The Contact band keeps both its top arrow (to Skills) and its bottom arrow (to the page-top header).
- **2026-10-03 (later 14)**: The Education/Leadership band's up arrow now goes to `#page-top` (scrollY 0, the original hero view with the header) instead of Projects.
- **2026-10-03 (later 15)**: Correction: it is the EXPERIENCE up arrow (not Education's) that goes to `#page-top`; Education's up arrow goes back to Projects. Also made all scroll arrows invisible except for the section you are settled in, and hidden while scrolling (`hooks/useSectionArrows.js`, `.arrows-on` / `html.is-scrolling`).
- **2026-10-03 (later 16)**: `page-top` arrows (Experience's up arrow and Contact's bottom arrow) now scroll to the top and clear the URL hash via `history.replaceState`, so the address is the plain domain with no `#page-top`. Renamed `heroPhotos.left/right` to `lower/upper`.
- **2026-10-03 (later 17)**: Hero title now reads "Welcome to my Portfolio!" (small "Welcome to my" sticker line above the big "Portfolio!"). The constellation sticker moved to the empty bottom-left corner to make room.
- **2026-10-03 (later 18)**: Removed the hero's "View my GitHub" pill. Added an **About me** section (between Hero and Experience) with a 2-3 sentence blurb generated from the resume and a starburst photo slot; header nav got an ABOUT tag; hero down arrow now goes to About; About's up arrow goes to `#page-top`.
- **2026-10-03 (later 19)**: Correction: the About me text belongs ON THE HERO under the title, not in its own section. Removed the About section/nav tag/`About.jsx`; added a taped note card (`.about-note`) in the hero's lower-left with 3 short sentences (phones show 2). Moved the constellation sticker (top strip), vinyl (right side between the bursts), scribble and sparkle to make room. Hero down arrow goes to Experience again.
- **2026-10-03 (later 20)**: Created the `dev` branch and pushed everything to `origin/dev`. Standing rule: all further work is committed and pushed to `dev` (not `main`).
- **2026-10-03 (later 21)**: Header is now pinned while scrolling and its buttons are interactive (hover pop, active-section highlight, click sparkles; logo goes to the top). Sections now fill the area below the header, and arrows/anchors account for it.
- **2026-10-03 (later 22)**: Put the user's own photo in the hero's main jagged frame (`public/images/me.jpg`, cropped around them and their surroundings; other guests cropped out). The user said a background-removal cutout is NOT needed, so the transparent-PNG path (`.main-img` / `.cutout-img` usage in the hero) was removed.
- **2026-10-03 (later 23)**: Recropped the hero photo so the user is centred and the laptop is fully in frame, and shrank the main frame from 88% to 70% of the stage height (27% wide, vertically centred at top 15%). The frame uses its own fuller polygon (`--shape` on `.main-cut`) so the laptop isn't clipped by the jagged bottom-left corner.
