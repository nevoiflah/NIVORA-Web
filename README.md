# Nivora Website

Official marketing and legal website for Nivora, an independent wellness companion application compatible with supported SHR Ring hardware.

The website introduces the app, explains its hardware relationship, demonstrates its primary wellness features, and provides public Privacy Policy and Terms of Use pages. It is built with plain HTML, CSS, and JavaScript, with no client-side framework or runtime package dependencies.

> Nivora is independent companion software. It is not the SHR Ring manufacturer's original application, does not manufacture the connected hardware, and is intended for general wellness rather than medical use.

## Highlights

- Responsive landing page for desktop, tablet, and mobile devices
- Reversible scroll-driven transitions that respond in both directions
- Cinematic lake and underwater canvas experience
- Animated ring, wellness data points, trend lines, and report forms
- Interactive sleep, heart, activity, readiness, trends, and report sections
- Clear SHR Ring compatibility disclosure
- Public Privacy Policy and Terms of Use
- Support form that creates a prepared email in the visitor's email application
- Mobile navigation with accessible state management
- Reduced-motion fallback for visitors who prefer limited animation
- Semantic content, keyboard skip link, and descriptive chart labeling
- Native static-file server for local development and production previewing

## Scroll experience

The homepage combines normal semantic HTML with a fixed decorative canvas scene. Page content remains selectable, accessible, and indexable while the canvas provides the visual depth layer.

As the visitor scrolls, the scene progresses through several states:

1. The hero photograph moves with subtle parallax.
2. The camera appears to pass through the lake surface.
3. Underwater fog, particles, waves, and light rays establish depth.
4. A dimensional ring enters and rotates.
5. The ring separates into connected wellness data points.
6. The points form a trend visualization.
7. The visualization transitions into report-page forms.

The scene is calculated directly from the current scroll position. Scrolling upward reverses the transformations instead of playing separate one-time animations.

On smaller screens, movement distances, parallax strength, blur, particle complexity, and animation timing are reduced. If the operating system requests reduced motion, the decorative canvas is disabled and the content is presented without motion-dependent effects.

## Technology

- HTML5 for content and page structure
- CSS for the responsive design system, layouts, device mockups, and transitions
- Vanilla JavaScript for navigation, scroll state, intersection behavior, parallax, support forms, and canvas rendering
- Canvas 2D for the lightweight cinematic depth scene
- Node.js for the included static development server

No frontend framework, WebGL library, animation dependency, build pipeline, database, or server-side rendering system is required for this repository.

## Local development

### Requirements

- Node.js 18 or newer
- npm

### Install and run

```sh
npm install
npm run dev
```

Open the local website at:

```text
http://127.0.0.1:4173
```

The project currently has no third-party runtime dependencies, but running `npm install` ensures the lockfile and local npm environment are prepared consistently.

### Custom host or port

The server reads the optional `HOST` and `PORT` environment variables.

```sh
HOST=0.0.0.0 PORT=8080 npm run dev
```

The default values are:

- Host: `127.0.0.1`
- Port: `4173`

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Starts the static server for local development |
| `npm start` | Starts the same server using the production-style command |

There is no compile step. Changes to HTML, CSS, JavaScript, or assets are available after refreshing the browser.

## Project structure

```text
FOR-Web/
├── assets/
│   ├── lake-hero.jpg       # Hero and closing background photograph
│   └── mark.svg            # Brand mark and favicon
├── privacy/
│   └── index.html          # Public Privacy Policy and support form
├── terms/
│   └── index.html          # Public Terms of Use
├── index.html              # Main product and compatibility landing page
├── styles.css              # Shared visual system and responsive styles
├── script.js               # Navigation, scrolling, canvas, and form behavior
├── server.mjs              # Zero-dependency static HTTP server
├── robots.txt              # Search crawler instructions
├── sitemap.xml             # Search engine sitemap
├── package.json            # Project metadata and scripts
└── package-lock.json       # npm lockfile
```

## Main page sections

- Hero - introduces the app and establishes the lake visual language
- Compatibility - explains SHR Ring support and independent-app status
- Connect - demonstrates the ring-to-app connection experience
- Understand - presents sleep, heart, activity, and readiness insights
- Explore - shows seven-day and thirty-day trend concepts
- Summarize - demonstrates exportable wellness reports
- Privacy - introduces user controls and links to the legal documents
- Wellness disclaimer - explains that the app is not a medical device
- Final call to action - closes the experience and communicates availability

## Legal pages

The repository includes implementation-informed legal pages for an Israel-based individual developer serving an international audience:

- [Privacy Policy](privacy/index.html)
- [Terms of Use](terms/index.html)

The Privacy Policy describes account data, wellness measurements, SHR Ring data, HealthKit, Health Connect, workout location, cloud storage, notifications, diagnostics, retention, deletion, international processing, and user rights.

The Terms cover eligibility, compatible hardware, general wellness limitations, professional sharing, acceptable use, intellectual property, the free service model, availability, termination, warranty limitations, liability, and Israeli governing law.

The support form does not send data to a website backend. It prepares a `mailto:` message addressed to the support email and asks the visitor's email application to open it. The message is only sent if the visitor sends it through their email provider.

These pages should receive qualified legal review before public launch, particularly for worldwide distribution, health information, international transfers, consumer rights, liability limitations, and any future commercial features.

## Privacy and data handling

This website does not currently include:

- Advertising technology
- Behavioral tracking
- Analytics SDKs
- Non-essential cookies
- A contact-form database
- User accounts or authentication

The website's legal documents describe the separate Nivora mobile application and its supporting services. If website analytics, cookies, hosted form processing, embedded media, or other third-party scripts are added, the Privacy Policy and consent behavior must be reviewed before deployment.

## Accessibility

The website includes:

- Semantic landmarks and section structure
- A keyboard-accessible skip link
- Labeled primary and legal navigation
- Accessible mobile-menu state through `aria-expanded`
- Descriptive alternative text behavior for decorative images
- A textual label for the sample trend chart
- Visible keyboard focus on support-form controls
- Live status text when the email application is opened
- A `prefers-reduced-motion` experience that removes non-essential animation

Interactive changes should continue to work with a keyboard and must not depend exclusively on color, hover, animation, or pointer position.

## Performance approach

The site intentionally avoids a heavy animation framework. Scroll updates are scheduled through `requestAnimationFrame`, event listeners are passive where appropriate, canvas pixel density is capped, and mobile devices receive a less demanding visual configuration.

When extending the experience:

- Avoid layout reads and writes inside large unthrottled loops.
- Keep decorative canvas work separate from semantic content.
- Test on physical mid-range mobile devices.
- Compress new photographs before committing them.
- Prefer CSS or canvas-native shapes over large video files.
- Preserve the reduced-motion fallback.

## Browser support

The site targets current versions of:

- Chrome
- Safari
- Firefox
- Edge
- Mobile Safari
- Chrome for Android

Core content remains readable if `IntersectionObserver`, canvas rendering, backdrop filters, or advanced animation features are unavailable.

## Deployment

The project can be deployed to any static hosting provider because all public pages and assets are static. Suitable options include GitHub Pages, Cloudflare Pages, Netlify, Vercel, Firebase Hosting, or a conventional web server.

The included Node server is useful for local previewing. A static host does not need to run `server.mjs`.

Before deployment:

1. Choose the final public domain.
2. Replace the `[DOMAIN]` value in `robots.txt` and `sitemap.xml`.
3. Verify that `/privacy/` and `/terms/` are publicly accessible without authentication or geographic restrictions.
4. Confirm that all mobile-app and store-listing links use the final legal-page URLs.
5. Review the Privacy Policy and Terms with qualified counsel.
6. Test the support form on desktop and mobile email clients.
7. Test reduced-motion mode and keyboard navigation.
8. Run a mobile performance and accessibility audit.

## Search metadata

The homepage includes a page title, description, Open Graph title, Open Graph description, theme color, favicon, image preload, `robots.txt`, and `sitemap.xml`.

The sitemap and crawler configuration still require the final production domain before launch.

## Maintenance

Review the website whenever the mobile app changes any of the following:

- Collected wellness or profile information
- HealthKit or Health Connect permissions
- Smart-ring compatibility
- Location collection or route storage
- Cloud providers or hosting regions
- Analytics, diagnostics, advertising, or tracking behavior
- Data retention and deletion behavior
- Account recovery or authentication
- Purchases, subscriptions, trials, or refunds
- Medical, coaching, or professional-use positioning

The Privacy Policy, Terms, app-store disclosures, runtime permission explanations, and actual app behavior should remain consistent.

## Repository

GitHub: [nevoiflah/HealthRing-Web](https://github.com/nevoiflah/HealthRing-Web)

## Ownership

Nivora was developed and is operated by Nevo Iflah, an independent developer based in Israel.

© 2026 Nevo Iflah. All rights reserved.
