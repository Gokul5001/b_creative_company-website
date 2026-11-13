# B-Creative Network Agency website

React 18 + Vite, plain CSS (same stack as the portfolio). No router, no UI library.

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview
```
Deploy: push to GitHub and import in Vercel (framework: Vite, build `npm run build`, output `dist`).

## Edit content
Everything (copy, services, projects, team, contacts, form options) is in `src/data/site.js`.

- **Logo:** `src/components/Logo.jsx` draws a text monogram. To use the official logo, add the file to `src/assets/` and replace the `logo__mark` span with an `<img>`. Update `public/favicon.svg` too.
- **Team and founder photos:** drop an image into `src/assets/team/` named after the member id (`bilal.jpg`, `bilal-mustafa.jpg`, `palwasha.jpg`, `zubaria.jpg`, `akasha.jpg`). Until then initials are shown.
- **Projects:** add a `.webp` to `src/assets/work/` and a matching entry in `projects` (the `image` field is the file name without extension).
- **Colours / fonts (orange + black theme, Space Grotesk + Inter):** CSS variables at the top of `src/styles/base.css`. Fonts load from Google Fonts in `index.html`.

## Structure
```
src/
  App.jsx             page order
  data/site.js        all content
  hooks.js, Reveal.jsx  scroll reveal, counters, active-nav
  components/         Header, Hero, Services, Work, About, Why, Contact, Footer, WhatsAppFab (+ .css each)
```
