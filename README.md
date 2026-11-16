# Siddharth Pramanik — Portfolio

A single-page personal portfolio for Siddharth Pramanik, Android developer & freelancer.
Static HTML/CSS/JS — no build step, no dependencies, no framework.

## Run it

Any static server works. From this folder:

```bash
python -m http.server 5173
```

Then open <http://127.0.0.1:5173/>.

You can also just double-click `index.html`, though a local server is recommended so
fonts and relative asset paths behave exactly as they will in production.

## Deploy

Upload the whole folder as-is to any static host:

- **GitHub Pages** — push the repo, Settings → Pages → deploy from branch root.
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, no build command, output directory `/`.
- **Any web host** — copy `index.html` and the `assets/` folder to the web root.

## Files

```
index.html              Page markup and all editable content
assets/css/style.css    All styling, animation and responsive rules
assets/js/main.js       Nav, mobile menu, scrollspy, reveals, counters, tilt, copy, clock
assets/favicon.svg      Site icon
```

## What to customize

Search `index.html` for `✏️ EDIT` — every placeholder is marked. In short:

1. **Email** — replace `hello@siddharthpramanik.dev` in three places:
   the contact button, the copy-email button (`data-email`), and the social/mail links.
   Also update the two `mailto:` résumé links in the Experience section.
2. **Social links** — `https://github.com/`, `https://www.linkedin.com/`, `https://x.com/`
   currently point at the bare domains. Swap in your real profile URLs.
3. **Projects** — the three sample projects (`Pulse`, `Ledgerly`, `Nimbus`) and their
   CSS-drawn thumbnails. Replace names, descriptions, chips and links with real work.
   Thumbnails are pure CSS (`.thumb--pulse`, `.thumb--ledger`, `.thumb--nimbus`), so you
   can either restyle them or drop in `<img>` screenshots.
4. **Stats** — the hero counters (`data-count="5"`, `20`, `10`).
5. **Experience** — the three timeline entries: roles, dates, companies and bullet points.
6. **Location/time** — the footer clock is hard-coded to `Asia/Kolkata` in `assets/js/main.js`;
   change the `timeZone` value and the "IST · India" label if you relocate.
7. **Meta tags** — `title`, `description`, `og:title`, `og:description` near the top of
   `index.html`. Add an `og:image` if you want rich link previews.

## Theming

All colors, fonts and layout measurements are CSS custom properties at the top of
`assets/css/style.css` (`:root`). Changing `--green`, `--cyan`, `--grad`, `--bg` and
`--container` re-themes the whole site.

## Accessibility & performance notes

- Lighthouse: **Accessibility 100 · Best Practices 100 · SEO 100**.
- Full keyboard support, visible focus rings, skip link, ARIA state on the mobile menu.
- Honors `prefers-reduced-motion`: animations, reveals and the cursor glow switch off.
- No images to download — visuals are CSS and inline SVG, so the page is very light.
- Verified with no horizontal overflow at 360 / 390 / 768 / 900 / 1024 / 1280 / 1440 px.

## Notes

- The `.js` class is added to `<html>` by a tiny inline script so reveal animations only
  hide content when JavaScript is actually available.
- Copy-email uses the async Clipboard API with an `execCommand` fallback for older browsers.
