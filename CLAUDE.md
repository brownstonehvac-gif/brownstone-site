# Brownstone Heating & Air — Claude Instructions

## Pre-edit checklist (site & ads)
Before making any edit to the site or ads, always answer both of these out loud first:
1. Will this edit screw things up?
2. Is this the correct move for SEO ranking?

Do not proceed until both questions are addressed.

## Auto-deploy preference
After making any code edits, always do ALL steps without stopping or asking:
1. Commit the changes
2. Push to the working branch
3. Open a PR
4. Merge the PR into main
5. Confirm deployment is triggered

Never stop at an intermediate step — always see changes through to deployed/live.

## Business info
- Company: Brownstone Heating & Air Conditioning (HVAC, Brooklyn NY)
- Phone: (347) 997-3360 / tel:+13479973360
- Email: brownstonehvac@gmail.com
- Address (schema only, never display in UI): 2920 Avenue R, Suite 237, Brooklyn, NY 11229
- Repo: brownstonehvac-gif/brownstone-site
- Default working branch: `main`
- Active feature branch pattern: `claude/...`

## Hours
- Mon–Fri: Open 24 hours (00:00–23:59)
- Saturday: Closed
- Sunday: 9 AM–3 PM (09:00–15:00)

## FORBIDDEN phone numbers — never use these anywhere
347-956-4393, 347-919-9711, 347-835-5034, 347-507-2749, 347-745-7863, 347-830-7915, 347-345-2891, 347-507-2757, 347-809-6117, 516-286-8008

## Integrations connected
- GitHub: brownstonehvac-gif/brownstone-site
- Quo Phone: AI agent is called "Sona" — hours/availability managed in Quo dashboard directly
- Gmail, Google Drive, HubSpot, Ahrefs, Netlify also connected

---

## Codebase overview

### What this repo is
This is a **static deployment repo** for a React SPA built in Lovable. The source code (React components, Vite config, etc.) lives in the Lovable project — this repo contains only the **compiled output** deployed to Netlify. Do not expect to find `src/`, `package.json`, or build config here.

When the Lovable project builds, it exports:
- Pre-rendered `index.html` files per route (for SEO/crawlers)
- A single JS bundle (`assets/index-*.js`) and CSS bundle (`assets/index-*.css`) loaded by all pages
- Static assets (images, favicon, og-image)

### Directory structure

```
/
├── index.html                              # Home page
├── about/index.html
├── contact/index.html
├── ac-repair-brooklyn/index.html
├── hvac-repair-brooklyn/index.html
├── central-air-repair-brooklyn/index.html
├── emergency-ac-repair-brooklyn/index.html
├── heat-pump-repair-brooklyn/index.html
├── mini-split-repair-brooklyn/index.html
├── fujitsu-mini-split-repair-brooklyn/index.html
├── hvac-heating-ac-upgrades-replacement-brooklyn/index.html
├── financing-brooklyn/index.html
├── reviews/index.html
├── privacy-policy/index.html
├── terms/index.html
├── assets/
│   ├── index-CJ6NdyYL.js                  # React app bundle (minified)
│   ├── index-BNsZaKiH.css                 # Tailwind + custom CSS (minified)
│   └── *.jpg / *.png                      # 17 optimized images
├── ads-search-terms-v18.js                # Google Ads automation script
├── netlify.toml                           # Netlify deploy config
├── _headers                               # HTTP response headers
├── _redirects                             # Legacy URL redirects
├── robots.txt
├── sitemap.xml                            # 28 URLs
├── sitemap_index.xml
├── favicon.ico
├── logo.png
├── og-image.jpg
└── placeholder.svg
```

### Tech stack
- **Framework**: React SPA (client-side routing, react-helmet for per-route meta)
- **Build tool**: Vite (content-hashed asset filenames)
- **CSS**: Tailwind CSS v3 + custom properties
- **Fonts**: Inter (400–700), Plus Jakarta Sans (600–800) via Google Fonts
- **Hosting**: Netlify (auto-deploy from `main`)
- **Analytics**: Google Tag Manager (GTM-NJ8F8JRH) + Microsoft Clarity (whiaf9d2oq)

---

## HTML page template

Every `index.html` follows this exact structure. Route-specific values are noted inline:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="author" content="Brownstone Heating & Air Conditioning" />
  <meta name="robots" content="index, follow" />

  <!-- GTM — same on all pages -->
  <script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-NJ8F8JRH');</script>
  <!-- Clarity — same on all pages -->
  <script type="text/javascript">/* clarity('whiaf9d2oq') */</script>

  <!-- Route-specific (managed by react-helmet in JS bundle) -->
  <title>[Page title]</title>
  <meta name="description" content="[Page description]" />
  <link rel="canonical" href="https://brownstoneheatingac.com/[path]/" />

  <!-- OG/Twitter (og:image is same on all pages) -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Brownstone Heating & Air Conditioning" />
  <meta property="og:image" content="https://brownstoneheatingac.com/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <!-- Route-specific OG/Twitter title, description, url also injected by react-helmet -->

  <script type="module" crossorigin src="/assets/index-CJ6NdyYL.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/index-BNsZaKiH.css">
</head>
<body>
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJ8F8JRH" ...></iframe></noscript>
  <div id="root"></div>
</body>
</html>
```

When adding a new page, copy an existing `index.html` and update: `<title>`, `<meta name="description">`, `<link rel="canonical">`, and the route-specific OG/Twitter tags. The React bundle handles the rest at runtime.

---

## Schema.org markup

Every page carries this identical JSON-LD block (injected by the React bundle). Keep it consistent across all pages:

```json
{
  "@context": "https://schema.org",
  "@type": ["HVACBusiness", "LocalBusiness"],
  "@id": "https://brownstoneheatingac.com/#business",
  "name": "Brownstone Heating & Air Conditioning",
  "telephone": "+1-347-997-3360",
  "url": "https://brownstoneheatingac.com",
  "image": "https://brownstoneheatingac.com/og-image.jpg",
  "logo": "https://brownstoneheatingac.com/logo.png",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2920 Avenue R, Suite 237",
    "addressLocality": "Brooklyn",
    "addressRegion": "NY",
    "postalCode": "11229",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 40.6125, "longitude": -73.9447 },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "59" },
  "areaServed": [
    { "@type": "City", "name": "Brooklyn" },
    { "@type": "City", "name": "Manhattan" },
    { "@type": "City", "name": "Queens" },
    { "@type": "City", "name": "New York" }
  ],
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"], "opens": "00:00", "closes": "23:59" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Sunday"], "opens": "09:00", "closes": "15:00" }
  ],
  "sameAs": [
    "https://www.facebook.com/brownstoneheatingac",
    "https://www.instagram.com/brownstoneheatingac",
    "https://www.yelp.com/biz/brownstone-heating-and-air-conditioning-brooklyn-3",
    "https://www.thumbtack.com/ny/brooklyn/central-air-conditioning-repair/brownstone-heating-air-conditioning-llc/service/211093323998258427"
  ]
}
```

**Critical schema rules:**
- Phone must always be `+1-347-997-3360` (never a forbidden number)
- Address is schema-only — never render it visibly in the UI
- Saturday must always be omitted from `openingHoursSpecification` (closed)

---

## Netlify redirect architecture

**Critical: never add a `/*` catch-all in `_redirects`.** It causes infinite redirect loops with other rules.

The SPA fallback lives in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The `_redirects` file is for legacy URL cleanup only. Always use **forced** `301!` redirects (not plain `301`) to prevent Netlify re-evaluating the rule and looping:
```
/about-us/  /about/  301!
/gallery/   /        301!
```

---

## Sitemap conventions

`sitemap.xml` currently lists 21 URLs. When adding a new page:
1. Add it to `sitemap.xml` with appropriate `<priority>` and `<changefreq>`
2. Use trailing slashes on all URLs: `https://brownstoneheatingac.com/page-slug/`
3. Priority guide: homepage = `1.0`, service pages = `0.8–0.9`, blog = `0.7`, utility pages = `0.5`
4. Update `<lastmod>` to today's date (YYYY-MM-DD)

Blog pages are referenced in `sitemap.xml` but may not yet exist as deployed directories — they are being built in Lovable.

---

## Google Ads script (`ads-search-terms-v18.js`)

This is a **Google Ads Script** (runs inside Google Ads, not on the website). Key config:
- Campaigns monitored: IDs `23097095929` and `23064032078`
- Lookback window: 30 days
- Cost flag threshold: $5.00
- Alert email: hvac4lif@gmail.com
- Web app secret: `BSTONE2026` (used for queued block/unblock actions from email buttons)

When editing this script, increment the version number in the filename and update the comment header. The script is uploaded manually into Google Ads — it does not auto-deploy via Netlify.

---

## Assets

Images in `assets/` use Vite content-hashed filenames (e.g., `hero-hvac-Abc123.jpg`). When the Lovable project rebuilds, these hashes change — update `index.html` files to reference the new hashes.

Key images: `hero-hvac`, `brooklyn-rooftops`, `brooklyn-team`, `brooklyn-rooftop-vrv`, `fujitsu-certification`, `coil-cleaning`, `technician-working`, `og-image.jpg` (OG thumbnail, 1200×630).

---

## SEO rules
- All page URLs use lowercase kebab-case with trailing slash
- Canonical tags must match the exact URL (no trailing slash mismatch)
- Every page needs unique `<title>` and `<meta name="description">`
- Service page titles follow pattern: `[Service] Brooklyn | Brownstone Heating & Air`
- Never change the domain: `brownstoneheatingac.com`
- robots.txt: `Disallow:` is empty (all pages crawlable)

---

## Lovable workflow (how site content actually changes)

This repo contains **only the compiled output** — there are no editable React components here. All UI/content changes happen in the Lovable project (separate tool), which then rebuilds and exports to this repo.

**Two types of changes and where to make them:**

| Change type | Where to do it |
|---|---|
| UI layout, copy, colors, components | Lovable project → rebuild → export new bundle |
| HTML meta tags, canonical, OG tags | Directly edit the relevant `index.html` here |
| Schema.org markup | Directly edit the relevant `index.html` here |
| Redirect rules | Edit `_redirects` here |
| Sitemap | Edit `sitemap.xml` here |
| Google Ads script | Edit `ads-search-terms-v18.js` here, upload manually to Google Ads |

**When Lovable rebuilds and exports:**
- The JS bundle (`assets/index-*.js`) and CSS bundle (`assets/index-*.css`) get new content-hashed filenames
- Every `index.html` must be updated to reference the new filenames
- Images may also get new hashed filenames — update references accordingly

**Never try to edit the minified JS/CSS bundles directly** — they are compiled output and any manual edits will be overwritten on the next Lovable export.

---

## Page meta reference

All 15 deployed pages with their current titles and descriptions:

| Slug | Title | Description |
|---|---|---|
| `/` | AC Repair Brooklyn \| Brownstone Heating & Air | Brooklyn HVAC company doing AC repair, heating service, and ductless mini split work — same-day appointments when we can. |
| `/about/` | Brooklyn HVAC Company \| Brownstone Heating & Air | Brownstone Heating & Air Conditioning is a Brooklyn HVAC company providing AC repair, heating service, and ductless mini split work. |
| `/contact/` | Contact Brooklyn HVAC \| Same-Day Service | Contact Brooklyn HVAC for AC repair, heating service, mini split repair, and same-day HVAC scheduling across Brooklyn. |
| `/ac-repair-brooklyn/` | AC Repair Brooklyn \| Same-Day Air Conditioning Service | AC Repair Brooklyn for systems not cooling, leaking, weak airflow, or short-cycling. Same-day appointments when we can fit you in. |
| `/hvac-repair-brooklyn/` | HVAC Repair Brooklyn \| Heating & Cooling Service | HVAC Repair Brooklyn for heating, cooling, airflow, thermostat, and system problems. Same-day appointments when available. |
| `/central-air-repair-brooklyn/` | Central Air Repair Brooklyn \| Brownstone Heating & Air | Central air conditioning repair in Brooklyn. Brownstone Heating & Air fixes central AC systems — no cooling, refrigerant leaks, frozen coils, and more. Same-day service. Call (347) 997-3360. |
| `/emergency-ac-repair-brooklyn/` | Emergency AC Repair Brooklyn \| Same-Day Service | Emergency AC Repair Brooklyn for no cooling, warm air, leaks, or sudden breakdowns. Urgent HVAC response when the system just quit. |
| `/heat-pump-repair-brooklyn/` | Heat Pump Repair Brooklyn \| Brownstone Heating & Air | Heat pump repair in Brooklyn. Brownstone Heating & Air diagnoses and fixes heat pumps that aren't heating, not cooling, or making noise. All brands. Call (347) 997-3360. |
| `/mini-split-repair-brooklyn/` | Mini Split Repair Brooklyn \| Ductless AC Service | Mini Split Repair Brooklyn for ductless systems not cooling, leaking, showing errors, or failing in one room. Same-day service when available. |
| `/fujitsu-mini-split-repair-brooklyn/` | Fujitsu Mini Split Repair Brooklyn \| Certified Service | Fujitsu Mini Split Repair Brooklyn for ductless errors, leaks, weak cooling, branch box issues, and Airstage diagnostics. |
| `/hvac-heating-ac-upgrades-replacement-brooklyn/` | HVAC Replacement Brooklyn \| Heating & AC Upgrades | Brooklyn HVAC system upgrades and replacement — central AC, ducted & ductless mini splits, gas furnaces, hydronic boilers, low-temp heat pumps. Honest assessment, transparent quotes, $0 down financing available. |
| `/financing-brooklyn/` | HVAC Financing Brooklyn \| $0 Down, 18-Mo 0% APR Available | Affordable HVAC financing in Brooklyn through Wisetack. $0 down, soft credit check, 18-month 0% APR available. Prequalify in seconds — no impact to your credit score. |
| `/reviews/` | Brooklyn HVAC Reviews \| Brownstone Heating & Air | Read Brooklyn HVAC reviews from customers who called Brownstone Heating & Air Conditioning for AC repair, heating, and mini split service. |
| `/privacy-policy/` | Privacy Policy \| Brownstone Heating & Air Brooklyn | Privacy Policy for Brownstone Heating & Air Conditioning, including contact forms, SMS consent, and customer information handling. |
| `/terms/` | Terms of Service \| Brownstone Heating & Air Brooklyn | Service terms for Brownstone Heating & Air Conditioning, including scheduling, communication, estimates, and customer responsibilities. |

---

## In-flight work (not yet deployed)

These blog pages are in the sitemap and being built in Lovable. Their directories do not exist in this repo yet — they will be added when Lovable exports them.

| Slug | Status |
|---|---|
| `/blog/` | In Lovable — not deployed |
| `/blog/ac-repair-cost-brooklyn/` | In Lovable — not deployed |
| `/blog/mini-split-vs-central-air-brooklyn-brownstone/` | In Lovable — not deployed |
| `/blog/signs-ac-needs-repair-brooklyn/` | In Lovable — not deployed |
| `/blog/heat-pump-rebates-nyc-2026/` | In Lovable — not deployed |
| `/blog/mini-split-installation-brooklyn-brownstone/` | In Lovable — not deployed |

When Lovable exports these pages, create the directory and `index.html` for each, add them to `sitemap.xml`, and update `<lastmod>` on the blog index entry.

---

## Connected MCP tools

These integrations are available in Claude Code sessions and can be called directly:

| Tool | What it's for |
|---|---|
| **HubSpot** | CRM — view contacts, deals, pipeline, company data |
| **Netlify** | Deploy status, site config, environment variables |
| **Quo** | Phone inbox — read call transcripts, SMS messages, missed calls, contacts |
| **Gmail** | Search email threads, create drafts, manage labels |
| **Google Drive** | Read/write files in Drive (SOPs, docs, sheets) |
| **Canva** | Generate or edit marketing designs |
| **GitHub** | Repo management, PRs, issues (scoped to this repo) |
| **Ahrefs** | SEO data — trial membership, use sparingly, not for large bulk scans |
| **Semrush** | SEO data — trial membership, use sparingly, not for large bulk scans |
