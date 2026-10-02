# Pulse v2 — Marketing, quietly

A minimalist take on [Marketing-v1](https://github.com/cocokamit/Marketing-v1). It has the same sections and features with far less visual noise. Built with **React + Vite** and **framer-motion**.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## What's inside

| Section | Features |
| --- | --- |
| **Hero** | Headline, primary/secondary CTA, revenue card with a self-drawing line, static channel strip |
| **Overview** | Count-up KPIs, hairline sparklines, quarter budget bar |
| **Campaigns** | Create / edit / pause / delete, status tabs, search — a calm table that becomes stacked rows on phones (saved to localStorage) |
| **Funnel** | Five stages as proportional bars that fill on scroll |
| **Channels** | Reach bars + thin donut; hover or tap a channel to isolate it in both |
| **Calendar** | Drag-and-drop posts between days (mouse and touch), add/remove posts |
| **Team** | Monogram cards with owned campaigns and tasks |
| **Footer** | "Let's make noise." CTA and back to top |

## What changed from v1

- Removed the preloader, custom cursor, film grain, pointer blob, marquee, tilt, magnetic buttons, text scramble, and the pinned horizontal-scroll funnel.
- Uses one typeface (Inter) plus mono for small labels, hairline borders, almost no shadows, a muted channel palette, and a near-black or white primary button.
- Uses short fade-and-rise reveals as the only scroll motion. There's a 1px scroll progress line.
- Light and dark themes follow the system setting. The site is responsive down to phone width, and the modal turns into a bottom sheet on phones. It honors `prefers-reduced-motion`.
