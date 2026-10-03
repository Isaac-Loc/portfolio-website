# CLAUDE.md

Guidance for AI assistants (Claude Code or any other model) working in this repo.

## What this is
Isaac's personal portfolio website. React + Vite single-page site with a Pinterest-board "cutout / scrapbook collage" look (layered sticker lettering, jagged cut-out shapes, pixel-font labels, paper texture, green + white palette).

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
Deploys: Vercel auto-deploys from GitHub (project Production Branch = `dev`), so pushing to `dev` publishes the site at the `*.vercel.app` URL. See README "Deploy (Vercel)".

## Layout
```
index.html                 Vite entry (fonts loaded here)
src/main.jsx               React mount + global CSS import
src/App.jsx                Page composition
src/data/site.js           ALL editable content (name, links, notes, projects, photo paths)
src/components/            Header, Hero, Experience, Projects, Education, Leadership (all via StoryCard), Skills, Contact, Art (SVG illustrations), Graphics (shared SVG + blocks), Rich (**bold** text)
src/styles/style.css       All styling (single file, design tokens at the top)
public/images/             User photos / project images (referenced as /images/<file>)
```

## Conventions
- Content goes in `src/data/site.js`, not hard-coded in components.
- Plain CSS in one file; colors/fonts/shapes are CSS variables in `:root`. No CSS framework.
- Keep text minimal: 1-2 short sentences per item; the user prefers pictures/graphics over words. Add visuals (illustrations, stat stickers, icons) before adding copy.
- Only show content that is on the resume (`Isaac_Loc_Resume.pdf`); NEVER publish the user's phone number anywhere, including inside PDFs/images in `public/`. The public `public/Isaac_Loc_Resume.pdf` is a redacted copy; do not replace it with the original from OneDrive.
- The hero is exactly one viewport tall; its `.stage` is the largest 16:9 box that fits, with elements positioned in `%` and sized in `cqw`, so it scales as one piece. Keep new hero elements in that system. Sections after it must not be visible while on the hero.
- Sizes use `rem`; the root font-size is fluid so large monitors scale up. Primary design target is a 1440p monitor.
- Cutout shapes are `clip-path` polygons layered (white outer + deep-green inner) via `.cut` / `.burst`. Photos with transparent backgrounds use `.cutout-img` for the white sticker outline.
- Sections after the hero are full-screen bands (`min-height: 100svh`, `overflow: clip`) that start with a sticky up `ScrollButton edge="top"` (previous section) and end with a sticky `ScrollButton` to the next section (Contact is the exception: a compact closing band whose up-arrow scrolls to `#page-top`, the header), so the button lands in the same screen spot every time. Keep that pattern for new sections.
- Respect `prefers-reduced-motion`.
- Content below the hero should carry the `reveal` class so it animates in on scroll (see SPEC "Motion"). Avoid technical word labels in the hero; prefer artistic graphics.
- Fonts: Playfair Display (italic 900, sticker headings), Silkscreen (pixel labels), Inter (body).

## Gotchas
- Light/dark theme is variable-driven. Never hard-code `#fff`/greens for surfaces or text: use `--card` (surfaces), `--text`, `--accent` (green text/decor on a surface), `--white` (sticker edges/rings). Check any new UI in both themes.
- The header is sticky. Anything sized to the screen must subtract `var(--header-h)` (sections use `min-height: calc(100svh - var(--header-h))`, anchors rely on `scroll-padding-top`).
- Scroll arrows are invisible by default and only show for the section you are settled in (>=60% of the screen, or Contact at the page bottom), hidden again while scrolling (`hooks/useSectionArrows.js`, `.arrows-on`, `html.is-scrolling`). New sections just need to be a `main > section` (or the `.duo` band) to be picked up.
- Cursors and the text-selection highlight are custom (end of `style.css`). New clickable things get the sparkle-star pointer automatically if they're `a`/`button`/`.ix`; otherwise set `cursor: var(--cursor-pointer)`.
- Hero widgets pop on hover and react on click (`useHeroInteractions.js`). The user explicitly does NOT want dragging; don't add it.
- Don't give elements that sit near the bottom edge of the screen (like the sticky scroll buttons) the `reveal` class: the IntersectionObserver ignores the bottom 6% of the viewport, so they would stay invisible. When testing reveal, don't force `.in` on everything.
- `-webkit-text-stroke` + `paint-order: stroke fill` makes the sticker outline; a neighbouring element's outline can cover small glyphs (e.g. the comma in "Hi, I'm") so mind `z-index` between title pieces.
- Images are placeholders until paths are set in `site.js`. Placeholders are intentional.
