# Siddharth Pramanik — Portfolio

A single-page personal portfolio for **Siddharth Pramanik**, senior software developer
(Android, Android TV and enterprise media platforms, plus practical Generative AI).
Static HTML/CSS/JS — no build step, no dependencies, no framework.

**Live:** <https://sidpram.github.io/portfolio/>

Live content is written from his résumé: 20+ years in software, the iDS digital signage
platform on 2,000+ devices, and Python/LLM side projects.

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

- **GitHub Pages** — already enabled: pushes to `main` deploy to
  <https://sidpram.github.io/portfolio/> (Settings → Pages → deploy from branch root).
- **Netlify / Vercel / Cloudflare Pages** — drag the folder in, no build command, output directory `/`.
- **Any web host** — copy `index.html` and the `assets/` folder to the web root.

## Files

```
index.html              Page markup and all editable content
assets/css/style.css    All styling, animation and responsive rules
assets/js/main.js       Nav, mobile menu, scrollspy, reveals, counters, tilt, copy, clock
assets/favicon.svg      Site icon
```

## Content map

| Section | What's on the page |
| --- | --- |
| Hero | Positioning, 20+ years / 2,000+ devices / 8 engineers, iDS console mockup |
| About | Career narrative, scale & reliability, technical leadership, applied AI |
| Skills | Android & TV, Generative AI, Architecture, Media/APIs/data, Cloud & delivery |
| Work | iDS, PlayCast4K, GuestVerse + AI side-project strip |
| Services | Android & TV development, architecture & leadership, rescue & optimize, AI integration |
| Experience | Independent consultant (2026–), iRevo (2012–2026), Insyde (2007–2012), VisualSoft (2004–2007) |
| Contact | Email, copy-email button, GitHub, LinkedIn |

## What to customize

1. **Email** — `siddharthpramanik9@gmail.com` appears in the contact button, the
   copy-email button (`data-email`), the social/mail links, the footer, and the two
   `mailto:` résumé links in the Experience section. Change all of them together.
2. **Social links** — GitHub (`https://github.com/sidpram`) and LinkedIn
   (`https://www.linkedin.com/in/siddharth-pramanik`) in the contact block and footer.
3. **Projects** — the three cards (`iDS — Digital Signage`, `PlayCast4K`, `GuestVerse`)
   plus the AI side-project strip. Thumbnails are pure CSS
   (`.thumb--ids`, `.thumb--cast`, `.thumb--guest`), so you can restyle them or drop in
   `<img>` screenshots.
4. **Stats** — the hero counters (`data-count="20"`, `2000`, `8`).
5. **Experience** — four timeline entries: roles, dates, companies and bullet points.
6. **Location/time** — the footer clock is hard-coded to `Asia/Kolkata` in `assets/js/main.js`;
   change the `timeZone` value and the "IST · India" label if relocating.
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
- The phone number from the résumé is intentionally **not** published on the site.
