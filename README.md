# LDV Speed Accelerator Showcase

A high-end, animated Next.js presentation site for LDV Automotive — built with the App Router, CSS Modules, and GSAP.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 14+ | Framework (App Router, no `src` dir) |
| React | 18+ | UI |
| GSAP | 3+ | All animations |
| `@gsap/react` | latest | `useGSAP` hook |
| CSS Modules | built-in | Scoped styling |
| Google Fonts | Outfit + Inter | Typography |

---

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9+ (or yarn/pnpm)

---

## 1. Create the Next.js Project

If you are starting from scratch:

```bash
npx create-next-app@latest ldv-speed-accelerator
```

When prompted, choose:
- TypeScript → **No**
- ESLint → **Yes**
- Tailwind CSS → **No**
- `src/` directory → **No**
- App Router → **Yes**
- Import alias → **Yes** (keep default `@/*`)

```bash
cd ldv-speed-accelerator
```

---

## 2. Install Dependencies

```bash
npm install gsap @gsap/react
```

> **Note on Draggable + Inertia:** The `JourneyIntro` floating images use `Draggable`. If you have a GSAP Club/Business licence, also install and register `InertiaPlugin` for the smooth coast-on-release effect. If you are on the free licence, remove `inertia: true` from the `Draggable.create()` calls in `JourneyIntro.js` — drag will still work, just without coasting.

---

## 3. File Structure

Place every file exactly as shown below:

```
ldv-speed-accelerator/
├── app/
│   ├── globals.css           ← Design system tokens + reset
│   ├── layout.js             ← (default Next.js layout — keep as-is)
│   ├── page.js               ← Main page, hero section + section imports
│   └── page.module.css       ← Hero styles
│
├── components/
│   ├── Personas.js
│   ├── Personas.module.css
│   ├── JourneyIntro.js
│   ├── JourneyIntro.module.css
│   ├── JourneyStage.js
│   ├── JourneyStage.module.css
│   ├── MarketData.js
│   ├── MarketData.module.css
│   ├── Footer.js
│   └── Footer.module.css
│
└── public/
    └── assets/
        ├── ldv-accelerator-bg-only.png   ← Hero background
        ├── ldv-accelerator-fg-only.png   ← Hero foreground vehicles
        ├── speed-logo.png                ← Nav logo
        ├── float-1.png                   ← JourneyIntro floating images
        ├── float-2.png
        ├── float-3.png
        ├── float-4.png
        ├── float-5.png
        ├── float-6.png
        ├── video-player-mockup.png       ← Stage 1 solution mockup
        ├── configurator-mockup.png       ← Stage 2 solution mockup
        ├── test-drive-mockup.png         ← Stage 3 solution mockup
        ├── onboarding-mockup.png         ← Stage 4 solution mockup
        └── welcome-app-mockup.png        ← Stage 5 solution mockup
```

> All image paths are prefixed `/assets/` because they live inside `public/assets/`. Next.js serves everything in `public/` from the root, so `/assets/filename.png` resolves correctly.

---

## 4. Copy the Source Files

Copy every file from this deliverable into its correct location:

| File | Destination |
|---|---|
| `globals.css` | `app/globals.css` |
| `page.js` | `app/page.js` |
| `page.module.css` | `app/page.module.css` |
| `Personas.js` | `components/Personas.js` |
| `Personas.module.css` | `components/Personas.module.css` |
| `JourneyIntro.js` | `components/JourneyIntro.js` |
| `JourneyIntro.module.css` | `components/JourneyIntro.module.css` |
| `JourneyStage.js` | `components/JourneyStage.js` |
| `JourneyStage.module.css` | `components/JourneyStage.module.css` |
| `MarketData.js` | `components/MarketData.js` |
| `MarketData.module.css` | `components/MarketData.module.css` |
| `Footer.js` | `components/Footer.js` |
| `Footer.module.css` | `components/Footer.module.css` |

Create the `components/` folder at the project root if it does not exist:

```bash
mkdir components
```

---

## 5. Add Your Assets

Place all image files inside `public/assets/`. The folder does not exist by default — create it:

```bash
mkdir -p public/assets
```

Then copy your images in. File names must match exactly (case-sensitive):

```
ldv-accelerator-bg-only.png
ldv-accelerator-fg-only.png
speed-logo.png
float-1.png  through  float-6.png
video-player-mockup.png
configurator-mockup.png
test-drive-mockup.png
onboarding-mockup.png
welcome-app-mockup.png
```

---

## 6. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Build for Production

```bash
npm run build
npm start
```

Or export as a static site:

```bash
npm run build
# output is in the `.next` folder — deploy to Vercel, Netlify, etc.
```

---

## Section Map

| Section | Component | Route anchor | Background |
|---|---|---|---|
| Hero | `app/page.js` | `#` (top) | Dark warm gradient |
| Personas | `components/Personas.js` | `#personas` | `--ldv-orange-900` |
| Journey Intro | `components/JourneyIntro.js` | `#journey` | Dark → orange gradient |
| Journey Stages | `components/JourneyStage.js` | `#journey-stage` | `--ldv-orange-500` |
| Market Data | `components/MarketData.js` | `#market` | `--ldv-orange-50` |
| Footer | `components/Footer.js` | — | `--ldv-orange-900` |

---

## Navigation

The nav in the hero links to each section via anchor IDs. Smooth scrolling is handled by `scroll-behavior: smooth` in `globals.css` — no JavaScript required.

| Nav label | Scrolls to |
|---|---|
| Intro | Top of page |
| Personas | `#personas` |
| Journey | `#journey` |
| Market | `#market` |

---

## Design System

All colours and type scales are defined as CSS variables in `app/globals.css`.

### Colour scales

**LDV Gray** — `--ldv-gray-50` through `--ldv-gray-900`

**LDV Orange** — `--ldv-orange-50` through `--ldv-orange-900`

### Typography

Both font families are loaded from Google Fonts in `globals.css`:

- **Outfit** — all headings (H1–H5) and display numbers
- **Inter** — body copy, captions, labels

Type tokens follow the pattern `--font-size-h1`, `--font-weight-h1`, `--line-height-h1` and so on through H5, S1–S2, B1–B4, C1–C3, and LABEL.

---

## Customising Content

### Persona cards
Edit the `CATEGORIES` array at the top of `components/Personas.js`. Each persona object has `name`, `image`, `quote`, `trigger`, `barrier`, `goal`, and `channels` fields.

### Journey stages
Edit the `STAGES` array at the top of `components/JourneyStage.js`. Each stage has `caption`, `body`, `bodyBold`, `friction`, `emotional`, `rational`, `quote`, solution fields, and a `mockup` image path.

### Market data
Edit the data arrays at the top of `components/MarketData.js`:
- `MOMENTUM_ROWS` — divergent bar chart data
- `RESEARCH_SEGMENTS` — stacked bar percentages and colours
- `RESEARCH_CARDS` — the four explanation cards
- `INVESTMENT_CARDS` — allocation percentages

### Floating images (Journey Intro)
Edit the `FLOAT_IMAGES` array in `components/JourneyIntro.js`. Swap `src` filenames and adjust `depth` (parallax multiplier — higher = more movement).

---

## Troubleshooting

**`Module not found: @/components/...`**
Make sure `components/` is at the project root (same level as `app/`), not inside `app/`.

**Images not showing**
Check that assets are in `public/assets/` and that filenames match exactly including case. Next.js `<Image>` with `fill` requires the parent to have `position: relative` and an explicit height — this is already set in the CSS Modules.

**GSAP animations not firing**
All animated components use `"use client"` at the top. If you see a hydration error, make sure this directive is present in every component file that uses `useGSAP` or `useRef`.

**`Draggable` or `InertiaPlugin` errors**
`Draggable` ships with the free GSAP package. `InertiaPlugin` (used for the coast-on-release effect in `JourneyIntro`) requires a GSAP Club licence. Remove `inertia: true` from `Draggable.create()` calls if you are on the free tier.

**Fonts not loading**
The Google Fonts `@import` is at the top of `globals.css`. Make sure `globals.css` is imported in `app/layout.js`:
```js
import "./globals.css";
```

---

## Deployment

The easiest deployment is [Vercel](https://vercel.com) — push to GitHub and connect the repo. Zero configuration needed for Next.js App Router projects.

```bash
# Install Vercel CLI (optional)
npm i -g vercel
vercel
```
