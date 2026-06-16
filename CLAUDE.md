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
- GitHub: brownstonehvac-gif/brownstone-site (orphaned — not the live site source)
- GitHub: brownstonehvac-gif/brownstone-boost-design (connected to Lovable — source of truth for code)
- Quo Phone: AI agent is called "Sona" — hours/availability managed in Quo dashboard directly
- Gmail, Google Drive, HubSpot, Ahrefs, Netlify also connected

## Site architecture (Lovable + Netlify)

Live site flow:
```
Lovable Editor → GitHub (brownstonehvac-gif/brownstone-boost-design, main branch) → Netlify → live site
```

- Primary live URL: https://brownstoneheatingandairconditioning.com
- Lovable preview URL: https://brownstone-boost-design.lovable.app
- Sitemap: https://brownstoneheatingandairconditioning.com/sitemap.xml
- Robots: https://brownstoneheatingandairconditioning.com/robots.txt
- Stack: React 18 + Vite + TypeScript + Tailwind, prerendered to static HTML, deployed on Netlify
- `brownstone-site` repo is an orphaned snapshot — NOT the live site

NOTE: brownstoneheatingac.com is a secondary domain; brownstoneheatingandairconditioning.com is primary.

## How to pull data correctly
1. SEO/meta/H1s/schema/copy/rendered HTML → fetch the live custom domain URL (never Lovable preview, never GitHub raw)
2. Full-site audits → start from sitemap.xml, then fetch each <loc> URL
3. Code structure questions → read from brownstonehvac-gif/brownstone-boost-design main branch
4. Never trust cached versions — always fetch fresh

## Rules for suggestions
- User edits through Lovable only. Format suggestions as: (a) page URL, (b) what to change, (c) exact new text/code to paste
- Do NOT suggest changing URLs, canonicals, redirects, or sitemap structure unless explicitly asked
- Do NOT suggest rebuilding pages that already exist and rank
- Phone (347) 997-3360 is correct — never suggest replacing it
- Address (2920 Avenue R, Suite 237, Brooklyn, NY 11229) appears in structured data only — do not suggest adding to footer or visible UI

## When asked to "scan the site"
Fetch sitemap.xml first → list every URL → fetch each one → report findings as table: URL | Issue | Severity | Suggested fix

## How to start a new session correctly
When starting a fresh Claude Code chat, use this prompt:

> I'm working on my HVAC business website. Use repo `brownstonehvac-gif/brownstone-boost-design` — this is the live site connected to Lovable and Netlify. Do NOT use `brownstonehvac-gif/brownstone-site` (that's an orphaned snapshot). My CLAUDE.md in brownstone-site has full context about the site, rules, and workflow.

### Which repo to use and why
- `brownstonehvac-gif/brownstone-boost-design` = LIVE site (Lovable → this repo → Netlify → brownstoneheatingandairconditioning.com). Use this for all edits.
- `brownstonehvac-gif/brownstone-site` = orphaned snapshot, NOT connected to the live site. Ignore for edits — only useful for CLAUDE.md reference.

### For direct code edits (Claude pushes to GitHub)
Start the Claude Code session scoped to `brownstone-boost-design`. Claude can then commit and push directly → Netlify auto-deploys.
Avoid editing in Lovable and Claude at the same time — pick one at a time to avoid conflicts.
- Use Claude for: SEO fixes, schema updates, meta tags, code-level changes
- Use Lovable for: visual/design/layout changes
