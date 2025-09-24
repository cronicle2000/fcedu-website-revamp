# FCEDU Conor Revamp (Astro + React + Tailwind)

Modern, performant, bilingual-ready marketing site for **Conor by FCEDU**, hosted on **GitHub Pages** with a minimal **Firebase Functions** backend for the contact form. Data is primarily **static JSON at build-time** with optional Firestore sync.

## Tech
- **Astro (SSG)** + React islands + Tailwind CSS
- **PWA** via @vite-pwa/astro
- **Plausible** analytics (optional)
- **Firebase**: Firestore (content snapshots), Functions (contact), reCAPTCHA/App Check (optional)

---

## Quick Start

```bash
pnpm i  # or npm i
npm run dev
```

Visit http://localhost:4321

### Environment variables
Copy `.env.example` to `.env` and set as needed:

```ini
PUBLIC_SITE_URL=https://fcedu.com.my
PUBLIC_PLAUSIBLE_DOMAIN=fcedu.com.my
PUBLIC_FUNCTIONS_URL=https://asia-southeast1-<project-id>.cloudfunctions.net
PUBLIC_RECAPTCHA_SITE_KEY=
```

> **Note**: Do **not** put any secret keys in `.env` (build-time public). Secrets live only in Firebase Functions config or your CI secrets store.

---

## Data workflow

- Site reads local JSON snapshots in `src/data/*.json` at build time.
- Optionally mirror Firestore to JSON:

```bash
# Set GOOGLE_APPLICATION_CREDENTIALS to a service account file first
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json
npm run data:pull
```

Collections mirrored: `partners`, `programs`, `branches`, `team`, `news`.

---

## Firebase Functions (Contact Form)

1. **Create Firebase project** and enable **Firestore** and **Cloud Functions** (region `asia-southeast1`).
2. In `functions/.env` (or use `firebase functions:config:set`), set:
   - `RECAPTCHA_SECRET` (v3 or Enterprise)
   - SMTP config for email notifications *(or adapt the code to your provider)*.
3. Deploy:
   ```bash
   cd functions
   npm i
   npm run deploy
   ```
4. Set `PUBLIC_FUNCTIONS_URL` in `.env` to `https://asia-southeast1-<project>.cloudfunctions.net`.

---

## GitHub Pages deployment

1. Create a repo and push this code.
2. In **Settings → Pages**, set **Build and deployment** to **GitHub Actions**.
3. On push to `main`, the workflow builds and deploys to Pages.
4. For custom domain, add `public/CNAME` and set DNS to point to GitHub Pages (A/AAAA or CNAME).

---

## Accessibility & Performance
- Semantic landmarks, skip-link, focus-visible styles
- Color contrast tuned for WCAG 2.1 AA
- PWA + performance budget (tiny critical CSS/JS, lazy images)
- Lighthouse target: **90+** across Performance/SEO/Best Practices/PWA

---

## Project Structure

```
src/
  components/    # Reusable, accessible components
  layouts/
  pages/
  styles/        # Tailwind + CSS custom properties
  data/          # Build-time JSON snapshots
  i18n/          # en/zh strings
  lib/           # SEO helpers, firebase client (guarded)
functions/       # Firebase Cloud Functions (contact form)
scripts/         # Firestore → JSON export script
```

---

## i18n Strategy

- English default under `/`.
- Chinese mirror under `/zh/` (duplicate pages with zh copy).
- Components accept text via props; shared strings in `src/i18n/*.json`.

---

## SEO

- Per-page titles/descriptions via `getSeoTags` helper.
- OpenGraph/Twitter cards with a default fallback image.
- JSON-LD: Organization site-wide; LocalBusiness can be added per branch.

---

## License

Private. © FCEDU.
