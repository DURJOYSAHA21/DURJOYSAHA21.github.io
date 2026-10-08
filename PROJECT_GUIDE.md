# How this site works — a guide for editing it yourself

This is the personal portfolio at **https://durjoysaha21.github.io/**. It is a static site: no
server, no database, no login. Everything you see is either written in one data file or fetched from
the GitHub API while you browse.

The rule that covers 90% of the edits you will ever want:

> **Almost all text, dates, titles and links live in `src/lib/site.ts`.** The components only lay it
> out. If you want to change what the site *says*, edit `site.ts` and do not touch the `.tsx` files.

---

## 1. The stack (exact versions)

| Piece | Version | Where it is declared |
| --- | --- | --- |
| Next.js (App Router, Turbopack) | `16.4.0` | `package.json` → `dependencies.next` |
| React / React DOM | `19.3.0` | `package.json` → `dependencies` |
| TypeScript | `^5` (strict mode) | `tsconfig.json` |
| Tailwind CSS | `^4`, through `@tailwindcss/turbopack` | `package.json` → `devDependencies` |
| ESLint | `^9` + `eslint-config-next` | `eslint.config.mjs` |

Deliberately **not** used, so do not go looking for them:

- No UI component library (no shadcn, no MUI). Every card is plain HTML + Tailwind classes.
- No animation library (no framer-motion, no GSAP). Animation is hand-written CSS keyframes plus
  `IntersectionObserver` in `src/components/motion.ts`.
- No backend, no database, no API routes, no auth.
- No image files for card art — the site has **zero card imagery by design** (see §8).

Fonts come from Google Fonts at build time via `next/font/google` (`layout.tsx`): **JetBrains Mono**
(labels and all terminal text), **Space Grotesk** (body), and **Fraunces**, the serif display face
that reaches the page through the `.display` class — used for the pull-quote in `About.tsx` and the
two large lines in `Contact.tsx`.

---

## 2. Commands you will actually run

```bash
npm run dev        # start the dev server, http://localhost:3000 — hot reloads as you save
npm run build      # produce the static site in out/ (this is what gets published)
npx eslint src --max-warnings=0   # lint; fails on warnings too, on purpose
npx tsc --noEmit   # type-check only, writes nothing
```

**Before you push anything, run all four.** `npm run build` is the one that matters: it type-checks,
lints and regenerates `out/` in a single pass.

There is **no** `npm run deploy` script. Deploying is two git pushes (§9).

---

## 3. Every folder and every file

### Root

| File | What it is for |
| --- | --- |
| `next.config.ts` | Turns the app into a static export. `output: "export"`, `trailingSlash: true`, `images.unoptimized: true` (no server means no image optimiser), and `basePath` / `assetPrefix` read from `NEXT_PUBLIC_BASE_PATH`. |
| `package.json` | Dependencies and the four scripts above. Note there is no `deploy` script. |
| `tsconfig.json` | TypeScript strict mode + the `@/*` → `src/*` path alias. That alias is why imports read `@/lib/site`. |
| `eslint.config.mjs` | Next's core-web-vitals + TypeScript rule sets. Ignores `.next/`, `out/`, `build/`. |
| `.gitignore` | Ignores `node_modules`, `.next/`, `/out/`, `*.tsbuildinfo`, `.env*`, `/vibe_images`. |
| `README.md` | Short project summary. This file is the long version. |
| `AGENTS.md` | Auto-written by `next dev` to warn AI tools that this Next version differs from older ones. Committing it keeps the tree clean; it is not your documentation. |
| `.github/workflows/deploy.yml` | **Exists locally only, deliberately untracked.** It would build on every push, but GitHub rejects pushing anything under `.github/workflows/` unless the token has the `workflow` OAuth scope, and the `gh` token here does not (§10). |
| `vibe_images/` | 11 orphaned PNG sources from the deleted AI covers. Gitignored and unused — safe to delete. |
| `out/` | The generated static site. **Never edit, never commit** (gitignored). Rebuilt by `npm run build`. |
| `.next/` | Next's internal build cache. Never edit. |

### `src/app/` — the pages

Next's App Router: the folder *is* the route. There is only one page.

| File | What it is for |
| --- | --- |
| `layout.tsx` | The single root layout. Loads the three fonts, sets `<html lang>` and `<body>`, and holds `metadata` — the browser-tab title, the description, and the Open Graph card shown when the link is shared. **Change the site's title / SEO description here.** |
| `page.tsx` | The whole home page, in order. Lists the background overlays, then `<Nav/>`, then the eleven boards inside `<main>`, then the footer. **Reorder the site by reordering these lines.** |
| `globals.css` | ~790 lines. Every colour token, the card surface, and all animation. This is the theme (§7). |
| `favicon.ico` | Tab icon. |

### `src/lib/` — the two files that hold the truth

| File | What it is for |
| --- | --- |
| `site.ts` (370 lines) | **All content.** Every section's data plus the TypeScript types that describe it. Start here. |
| `github.ts` (57 lines) | The only runtime data: one call to `GET /users/DURJOYSAHA21/repos`. Cached in `sessionStorage` for 30 minutes, one automatic retry. Returns `null` on failure and the UI degrades to blanks. |

### `src/components/` — 22 files

**Board components** — each one is a section of the page, rendered by `page.tsx`:

| File | Section | Reads from `site.ts` |
| --- | --- | --- |
| `Hero.tsx` | Top block: name, portrait, terminal readout, CTAs | `PROFILE`, `asset` |
| `StatsStrip.tsx` | Number strip under the hero | `PAPER_TOTALS` |
| `About.tsx` | `01 about` | `PROFILE` |
| `Ticker.tsx` | Scrolling tech-word marquee | `TECH_WORDS` |
| `Education.tsx` | `02 education` (BSc / HSC / SSC) | `EDUCATION` |
| `Skills.tsx` | `03 skills` | `SKILLS` |
| `Projects.tsx` | `04 projects` — course work + personal tools | `BUILDS`, `ARENAS`, `RESEARCH_BUILDS` |
| `Competitions.tsx` | `05 competitions` — hackathon / datathon / contest | `ARENAS` |
| `Research.tsx` | `06 research` — papers + the code written for them | `RESEARCH`, `RESEARCH_BUILDS`, `PAPER_TOTALS` |
| `Awards.tsx` | `07 honors & certs` | `HONORS`, `CO_CURRICULAR` |
| `Contact.tsx` | `08 contact` | `CONTACT`, `PROFILE`, `GITHUB_USER`, `asset` |

**Building blocks** — shared pieces the boards are made of:

| File | What it does |
| --- | --- |
| `Section.tsx` | Wraps every board: `id` (the `#anchor`), `index` ("04"), `title` (types itself out letter by letter), `kicker` (the `>` prompt line), `accent`. Exports the `Accent` type used site-wide. |
| `Tile.tsx` | The one card. Props: `accent`, `lead` (lights the single headline card of a board), `span` (grid footprint, e.g. `"sm:col-span-2 lg:col-span-3"`), `delay`, `className`, `as`. |
| `Reveal.tsx` | Fades a child in once it scrolls into view. `Tile` uses it internally — you rarely use it directly. |
| `CountUp.tsx` | Counts a number up from 0 when scrolled into view. Used by `Projects`' tally card and `StatsStrip`. |
| `Tilt.tsx` | Pointer-tracked 3D tilt with a warm glare. Used by the hero portrait only. |
| `motion.ts` | Three hooks: `useInView`, `usePrefersReducedMotion`, `useScrollY`. Every animation checks `usePrefersReducedMotion` first. |
| `Nav.tsx` | Sticky top bar. `LINKS` at the top of the file is the nav menu, and the active link is decided by an `IntersectionObserver`. |
| `StatusStrip.tsx` | The four status lines inside the About board. Its text is hardcoded in the file, not in `site.ts`. |
| `Glowfield.tsx` | Three slow-drifting warm glows behind everything. Decorative. |
| `Spotlight.tsx` | Light that trails the cursor. Writes CSS variables directly, never React state. |
| `EmberField.tsx` | A fixed `<canvas>` of slow drifting motes. Decorative, and the only canvas on the page. |

**Import direction, so you can predict what breaks:**
`page.tsx` → board components → `Section` / `Tile` → `Reveal` / `CountUp` → `motion`.
Boards read `site.ts`. `site.ts` imports nothing. If you change a `Tile` prop, every board moves.

---

## 4. How one board renders

```
site.ts  ──(plain array)──▶  Projects.tsx  ──map()──▶  BuildCard  ──▶  <Tile>  ──▶  .tile CSS
                                                    ▲
github.ts ──(repos, live)──────────────────────────┘  (only for stars / last push)
```

`Section` supplies the numbered heading and the ghost numeral; `.bento` in `globals.css` lays the
tiles out on a 6-column grid at desktop, 2 at tablet, 1 at phone.

**Cards never get a number typed in.** The `04`, `05` you see on a card come from the array position
(`index + 1`), so inserting a card in the middle renumbers everything below it for free.

---

## 5. Recipes — the edits you are most likely to want

All of these are in `src/lib/site.ts` unless a file is named.

### Add a project

Find `BUILDS` and copy an existing object. `repo` is **optional** — omit it when the code is not on
GitHub (like `Luffy`), and the card simply renders with no link.

```ts
{
  title: "Name Of The Thing",
  repo: "exact-github-repo-name",   // delete this line if there is no repo
  track: "course",                  // "course" or "personal" — decides which board AND the colour
  period: "Jan — Apr 2027",         // "" for blank; shown as the accent line
  stack: ["React", "Python"],       // becomes the chips
  blurb: "Two or three sentences on what it does and why you built it.",
},
```

`track: "course"` → gold accent, appears under "course projects". `track: "personal"` → teal, under
"built for myself". The count card at the top of the board and the nav need no updating — they are
derived.

### Add a paper

Find `RESEARCH` and append:

```ts
{
  title: "Full paper title exactly as submitted",
  venue: "ICCIT 2027",
  status: "under review",           // or "Accepted · not yet published", "Conference paper presented"
  year: "2027",
  note: "What it does, in plain words.",
  link: "https://…",                // optional; omit the line entirely until a URL exists
},
```

The totals card (submitted / accepted / under review) **updates itself** — it counts
`status === "under review"`. So use that exact lowercase string for a paper under review, or the
"accepted" figure will be wrong.

### Change a CGPA, a college, or an exam result

`EDUCATION`. Three objects: `BSc`, `HSC`, `SSC`. `resultLabel` is the word before the result ("CGPA"
vs "GPA"). `points` is the bullet list.

### Add or remove a skill

`SKILLS` — grouped chips. Adding a word to a group also adds it to the scrolling ticker, because
`TECH_WORDS` is derived from `SKILLS` at the bottom of the file. `accent` per group is one of
`"gold" | "teal" | "clay" | "brass"`.

### Add an award or certificate

`HONORS` (`kind: "honor"` or `"certification"`), or `CO_CURRICULAR` for club roles.

### Add a hackathon / datathon entry

`ARENAS`. `kind` must be `"hackathon" | "datathon" | "contest"` — it labels the card and feeds the
count card. `stack: []` renders no chips.

### Change the phone, email or address

`CONTACT`. Two places show the address, and both read it from here: the contact board and the footer
(`page.tsx`). **Think before changing this** — you chose to publish the phone number and home
address on a public site.

### Change the name, role line, or which files the hero uses

`PROFILE`. `photo` and `cv` are paths relative to `public/`.

### Change the headline / browser-tab title

Not in `site.ts` — `src/app/layout.tsx`, the `metadata` object. It appears twice (`title` and
`openGraph.title`).

### Change the terminal text in the hero

`src/components/Hero.tsx`. The `durjoy@aiub:~$ whoami` block is written inline there, not in
`site.ts`.

### Add a whole new section

Five places, in order:

1. Data array in `site.ts` (plus a `type` if it is a new shape).
2. New `src/components/MyThing.tsx` — copy `Competitions.tsx` as the smallest starting point.
3. Import it and place `<MyThing />` in `src/app/page.tsx` where it should appear.
4. Add `{ id: "my-thing", label: "my thing" }` to `LINKS` in `src/components/Nav.tsx`.
5. Give it `id="my-thing"` and the next `index="NN"` in its `<Section>` — and renumber every section
   below it, because the numbers are written by hand.

---

## 6. Content that is still blank on purpose

These are `—` or `""` because the real value was never supplied. Fill them with truth, never a
guess — this page goes to recruiters.

| Where | What is missing |
| --- | --- |
| `ARENAS` → Financial Risk Prediction | Event name, year, dataset, model, result. `stack: []` and `year: "—"`. |
| `HONORS` → Dean's Award | Year. |
| `HONORS` → IT Essentials (Cisco) | Year. |
| `BUILDS` → Luffy | `period: ""` (no date given). Also no repo, and the `Graphics` repository does not clearly contain it. |
| `CONTACT` | No LinkedIn, no X handle. |
| `public/durjoy.jpg` | JPG, so the background cannot be removed. A transparent PNG would fix the hero. |
| `RESEARCH` → 4 under-review papers | No published link yet (`link` omitted). |

---

## 7. The theme, if you want to change how it looks

Everything visual is in `src/app/globals.css`, in named sections. Search for the comment, do not rely
on the line number.

| Around line | Section | What lives there |
| --- | --- | --- |
| 5 | **tokens** | `:root` — `--gold #f5c96a`, `--brass`, `--teal`, `--clay`, `--ink`, `--fg`, `--muted`, `--line`, plus `--shell` (max page width) and `--gutter` (side padding). |
| 21 | **tokens** | `@theme inline` maps those into Tailwind names, which is why `text-gold`, `bg-ink`, `border-line` work. Add a colour here to make it a utility. |
| 66 | ambient layers | `.glowfield`, `.hairgrid`, `.grain`, `.scanlines`, `.spotlight`. |
| 210 | accents | `.accent-gold / -brass / -teal / -clay` — each just sets `--accent`. Every coloured thing reads `var(--accent)`. |
| 225 | surfaces | `.tile` (the card), `.tile-bar` (cursor bar), `.shell`, `.bento`, `.sheen`. |
| 359 | lead card | `.tile-lit`, `.seal`, `.chip`, `.badge`. |
| 465 | typography | `.mono`, `.display`, `.ghost-num`. |
| 507 | motion | Keyframes and the animation utility classes. |
| ~750 | reduced motion | `@media (prefers-reduced-motion: reduce)` disables every animation listed there. |

Three things to know before editing CSS here:

1. **All custom classes are inside `@layer components`** so Tailwind utilities can still override
   them. If you write a rule like `.tile .chip { … }` outside that layer, it beats the utilities and
   you will get confused when `text-gold` stops working on a chip.
2. **The palette is navy + warm gold on purpose.** It was picked to match the portrait. Deep-indigo
   / neon and near-black were both tried and rejected.
3. **`color-mix(in srgb, var(--accent, var(--gold)) N%, transparent)` is everywhere.** Change a token
   in `:root` and the whole site follows. Change one `color-mix` and you get a one-off inconsistency.

### Card design, and why there is no art

Every card — project, competition, research code, paper — uses the **same typographic shape**:

```
mono label + number        venue / period (accent colour)      year (right)
Title in bold
Note paragraph
chips: stack · repository link
```

There are **no images on any card**. The earlier AI-generated covers were deleted because they read
as fabricated UI mockups, and none of the repositories contain a real screenshot to swap in. If you
ever add screenshots, add them as real captured images in `public/` and reference them from the card
— do not generate artwork.

---

## 8. Accessibility and performance notes

- Every animation is switched off for visitors with "reduce motion" enabled — `usePrefersReducedMotion`
  in JS, the `@media` block in CSS. If you add an animation, add it to **both**.
- The typing headline keeps an `<span className="sr-only">` with the full word so a screen reader is
  not reading letters as they appear.
- `Spotlight` writes CSS variables instead of calling `setState`, so mouse movement does not re-render
  React. Keep that pattern for anything that tracks the pointer.
- Mobile: `.bento` collapses to one column; the nav bar scrolls horizontally.

---

## 9. Deploying — the part that surprises people

**The live site is NOT built from `main`.** It serves whatever was last committed to the `gh-pages`
branch. Pushing your fix to `main` alone changes nothing that anyone sees.

So: commit source, push, rebuild, then push the build to `gh-pages`.

```bash
# 1. source
git add src/lib/site.ts          # or whatever you changed
git commit -m "Add the new project"
git push origin main

# 2. rebuild the static export
npm run build

# 3. publish out/ onto gh-pages
git worktree add .gh-pages-tmp gh-pages
cd .gh-pages-tmp
git rm -rq .                                  # this branch holds only the export
cp -r ../out/. .
git add -A
git commit -m "Deploy the updated export"
git push origin gh-pages
cd .. && git worktree remove .gh-pages-tmp

# 4. confirm GitHub actually built it (takes about a minute)
gh api repos/DURJOYSAHA21/DURJOYSAHA21.github.io/pages/builds/latest \
  --jq '"\(.status) \(.commit[0:7])"'
```

Then hard-refresh the site (`Ctrl+Shift+R`). Pages caches, so a normal reload can show the old one.

`.gh-pages-tmp` is already listed in `.git/info/exclude`, so it will never show up as an untracked
file. Never edit that branch by hand and never merge it into `main` — it is generated output, and
`gh-pages` is an orphan commit with no relation to your source history.

The repo is the **user site** (`DURJOYSAHA21.github.io`), which is why it serves from `/` and why
`NEXT_PUBLIC_BASE_PATH` is left empty. If you ever move to a project site
(`durjoysaha21.github.io/some-repo`), you must build with `NEXT_PUBLIC_BASE_PATH=/some-repo` — it is
compiled into the export, not read at runtime.

---

## 10. Gotchas

- **`workflow` scope.** `.github/workflows/deploy.yml` is untracked because pushing it needs an
  OAuth scope the token lacks (`repo, read:org, gist`). If you ever add it to a commit, the push
  fails with a 403. Run `gh auth refresh -s workflow` first, or keep it out.
- **GitHub API limit.** Unauthenticated calls are 60/hour per IP. Star counts and "pushed 3mo ago"
  can legitimately be blank. Do not add more API calls per page load.
- **Never type a count twice.** Totals are computed from the arrays that render them
  (`PAPER_TOTALS`, the `TALLY` in `Projects.tsx`). A hardcoded second number is how the site ends up
  claiming 6 papers while listing 7.
- **`out/` file locks on Windows.** `npm run build` occasionally dies with
  `EBUSY: resource busy or locked` if something is reading `out/` — a running preview server or an
  open browser tab. Close it and re-run; it is not a code error.
- **CRLF warnings.** Git prints `LF will be replaced by CRLF` on every commit here. Harmless —
  Windows line endings. Do not "fix" it by re-writing every file.
- **Do not put secrets in this repo.** It is public. The `JOB-PORTAL` repository's README contains
  demo credentials; nothing from it should be copied onto this site.
- **Line numbers in this guide drift.** When you look for something, search for the class name, the
  export name, or the section comment rather than trusting the number.
