# Ruben Manzano — Portfolio

Personal site showcasing my work across iOS, React Native, and web. Highlights include **Watchlistr**, **RecipeRealm**, **Steda**, **EchoExpense**, **Starship Pixelscape**, and more.

**Live site:** [https://rubenmanzano.com](https://rubenmanzano.com)

## Highlights

* **Polished case studies** with rotating screenshot grids and concise feature summaries.
* **Interactive background UFO** (Three.js) that gently roams, follows/taps, and supports themes per project page.
* **Fast & responsive**: App Router, image optimization, font streaming, and lightweight UI.
* **Clean navigation** with modal routes (intercepted) for privacy/terms pages—no jarring page loads.
* **SEO & social cards**: full Open Graph/Twitter metadata + Apple web app settings.

## Stack

* **Framework:** Next.js (App Router) + TypeScript
* **UI:** Tailwind CSS, next/font (Geist & Geist Mono)
* **3D/FX:** Three.js (custom UFO background component)
* **Images:** next/image with responsive sizes
* **Routing:** Parallel/intercepted routes for modals (`@modal/(...)page`)
* **Misc:** Accessible modal with focus trap & portal to `#modal-root`

## Notable bits

* **UFO component**

  * Modes: `roam`, `follow`, `swoosh`
  * Props: theming (`body`, `cockpit`, `ring`, light colors), `disableInput`, and `shipSize` (`small | medium | large`)
  * Runs behind content (`position: fixed; pointer-events: none; z-index: 0`)

* **Modal system**

  * SSR-safe: renders only after mounting and uses a single `#modal-root` in `app/layout.tsx`
  * Scroll-friendly: backdrop/page scroll and internal card scroll for long content
  * Accessible: focus trap, ESC/Backdrop close, ARIA labelling

## Project structure (excerpt)

```
src/
  app/
    (site)/
      layout.tsx                 # site shell (nav/effects)
      page.tsx                   # home
      reciperealm/
        page.tsx                 # project page
        privacy/page.tsx         # standalone privacy (server page)
        @modal/(...)privacy/     # intercepted modal route (client)
      watchlistr-mobile/
        page.tsx                 # project page (page-specific UFO shown here)
    layout.tsx                   # root layout + <div id="modal-root" />
  components/
    Home/UFO.tsx                 # interactive background spaceship (Three.js)
    Modal.tsx                    # SSR-safe, accessible modal with portal
    Projects/*                   # project sections & screenshot grids
  constants/
    images.ts                    # image imports
    ufoThemes.ts                 # reusable UFO theme presets
```

## Credits

* Typeface: **Geist** by Vercel (via `next/font`)
* Logos & app art: mine unless otherwise noted
* Some app case studies reference third-party services (TMDB, Firebase, Supabase, etc.) used in the apps themselves

## Contact

* GitHub: [https://github.com/devzano](https://github.com/devzano)
* Site: [https://rubenmanzano.com](https://rubenmanzano.com)

## License

All rights reserved. This repository is for showcasing my work. Please do not reuse assets or branding without permission.


Here’s a clean, no-nonsense README tailored for a public portfolio repo (meant to be viewed, not cloned).

---

# Ruben Manzano — Portfolio

Personal portfolio showcasing selected apps, experiments, and design work across iOS, web, and full-stack projects. Built with Next.js and sprinkled with a playful, interactive **UFO** background (Three.js) that reacts to cursor/touch and supports per-page themes.

👉 Live site: **[https://rubenmanzano.com](https://rubenmanzano.com)**

---

## What’s inside

* **Projects**: Watchlistr (iOS/Android), RecipeRealm (iOS), Steda, Starship Pixelscape, AutoArchive, and more.
* **Interactive FX**: Custom Three.js **UFO** component with follow/swoosh/roam modes, theming, and accessibility-friendly defaults.
* **Snappy UX**: Parallel routes & intercepted modals, smooth screenshot grids, and tasteful motion with reduced-motion support.
* **Content-first**: Clean typography (Geist), dark-mode friendly surfaces, and concise copy.

---

## Tech

* **Framework**: Next.js (App Router)
* **Styling**: Tailwind CSS
* **3D/FX**: Three.js (custom UFO component)
* **Fonts**: Geist by Vercel
* **Misc**: TypeScript, React Server Components, dynamic Open Graph metadata

---

## Not a starter template

This repository exists to power my website. It’s **not intended for cloning or reuse**. If you’re curious about an effect (e.g., the UFO), feel free to browse the source for ideas.

* UFO component: `src/app/components/Home/UFO.tsx`
* Themes: `src/constants/ufoThemes.ts`
* Modal (SSR-safe portal): `src/components/Modal.tsx`

---

## Contact

* **Website**: [https://rubenmanzano.com](https://rubenmanzano.com)
* **GitHub**: [https://github.com/devzano](https://github.com/devzano)
* **X/Twitter**: @rubenizag

If you found a bug on the live site, feel free to open a lightweight issue here or reach out via the contact links above.

---

## Credits & Attributions

* **Next.js** and **Vercel** (hosting & fonts)
* **Three.js** for the background FX
* Product names and logos are property of their respective owners.

---

## License

This portfolio’s code and assets are copyrighted. Please do not reuse or redistribute without permission.