# Portfolio Website

My personal portfolio site. React + Vite, with a cutout / scrapbook collage design.

## Run locally

```bash
npm install
npm run dev
```

Then visit http://localhost:5173.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # preview the build
```

## Editing

Content lives in `src/data/site.js`; styles in `src/styles/style.css`. See [SPEC.md](SPEC.md) and [CLAUDE.md](CLAUDE.md) for the design spec and project conventions.

## Deploy (Vercel)

The site is deployed to Vercel straight from this GitHub repo, so every push redeploys automatically.

One-time setup (needs your Vercel account):

1. Go to https://vercel.com/new and **Import** the `Isaac-Loc/portfolio-website` repository (sign in with GitHub and allow access to this repo).
2. Leave the detected settings: Framework **Vite**, install `npm ci`, build `npm run build`, output `dist` (all also set in `vercel.json`). Click **Deploy**. You get a `*.vercel.app` URL.
3. Make `dev` the branch that goes live: project **Settings -> Git -> Production Branch** -> `dev`. After that, every push to `dev` updates the live `*.vercel.app` site; other branches get their own preview URLs.
4. Later, to use your own domain: project **Settings -> Domains** -> add it, then point your domain provider's DNS (or domain forwarding) at the records Vercel shows.

Local production check: `npm run build && npm run preview`.
