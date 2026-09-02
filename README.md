# Health Ring website

Dependency-free static website for the independent Health Ring companion app.

## Preview

Run the included zero-dependency development server:

```sh
npm run dev
```

Then open `http://127.0.0.1:4173`. Set `PORT` or `HOST` if you need a different address.

## Before publishing

Search for `[` to locate all legal, domain, store-link, hosting-region, retention, and contact placeholders. Obtain qualified legal review of both legal pages. Update `robots.txt` and `sitemap.xml` with the final domain.

## Project structure

- `index.html` - scrollytelling landing page
- `privacy/index.html` - implementation-informed Privacy Policy draft
- `terms/index.html` - implementation-informed Terms of Use draft
- `styles.css` - responsive visual system and legal-page styles
- `script.js` - navigation and reduced-motion-aware reveals
- `assets/` - project-owned visual assets
