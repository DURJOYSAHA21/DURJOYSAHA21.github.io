# Portfolio

Personal portfolio for Durjoy Saha — final-year CSE student, ML and backend. Next.js 16 with the App
Router, Tailwind v4, TypeScript strict, statically exported to `out/` so GitHub Pages serves it as
plain files.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes the static site to out/
```

## What lives where

- Every fact on the page — profile, education, skills, builds, competitions, papers, honors, contact
  links — is data in `src/lib/site.ts`. Sections read from it and hold no copy of their own.
- The board each section renders is a `bento` grid of `Tile`s. One card material, and `lead` lights
  the single headline card per board.
- Theme tokens, the card surface and every animation are in `src/app/globals.css`.
- Cover art is pre-rendered: `public/covers` holds the shipped 7:3 crops, `scripts/make-covers.mjs`
  regenerates them from the gitignored `vibe_images/` sources.
- `src/lib/github.ts` is the only runtime data source.

## Live data

Project and competition cards show a repository's stars and last push, fetched in the browser from
`GET /users/DURJOYSAHA21/repos`. There is no backend and no key, so the unauthenticated 60/hour per
IP cap applies to each visitor: the single call is cached in `sessionStorage` for 30 minutes and
retried once on failure. If it still fails, the cards keep their static content and the live field
stays blank.

## Deploying

`.github/workflows/deploy.yml` builds `out/` and publishes it through GitHub Pages. In the repo's
**Settings → Pages**, set **Source** to **GitHub Actions**.

The repository is `DURJOYSAHA21.github.io`, a user site served from `/`, so the workflow builds with
`NEXT_PUBLIC_BASE_PATH: ""`. A project site (`user.github.io/repo`) needs that value set to
`/repo-name` — it is compiled into the export, not read at runtime.
