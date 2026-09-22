# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint (Next.js core-web-vitals + TypeScript rules) |

**Node version**: >=20 required (see `.nvmrc`).

**Package manager**: npm is the primary package manager per the README. The repo also has `pnpm-lock.yaml` and `pnpm-workspace.yaml` (a single-package workspace configuration), but use npm for consistency with the documented workflow.

## Architecture: Content-Driven Proposal

This is a single-page proposal site where the structure and content are derived from Markdown files and configuration, not hard-coded React components.

### How it works

1. **Quote files** (`content/quotes/*.md`) — Each file represents a pricing option. YAML frontmatter drives the UI:
   - Required fields: `title`, `shortTitle`, `platform`, `price`, `hours`, `days`, `status`, `summary`, `order`, `proposalType`, `outcomes`
   - `proposalType`: `"rebuild"` | `"retool"` — groups quotes into sections
   - `status`: Set to `"Recommended"` (case-insensitive) to highlight that quote
   - `order`: Controls sort position in the proposal
   - Markdown body below the frontmatter becomes the full proposal section content
   
   Example (`content/quotes/vendure.md`):
   ```yaml
   ---
   title: "Vendure Custom Platform"
   shortTitle: "Vendure"
   platform: "Vendure + Next.js"
   price: "£116,200 + VAT"
   hours: 1245
   days: 166
   status: "Recommended"
   summary: "A Vendure and Next.js rebuild of the trade portal."
   order: 1
   proposalType: "rebuild"
   outcomes: []
   ---
   ```

2. **Quote parsing** (`lib/quotes.ts`) — Uses `gray-matter` to parse frontmatter, validates required fields (throws on missing), sorts by `order`. Re-exports types and helpers from `lib/types.ts`.

3. **Navigation derivation** (`lib/types.ts`) — `getNavItems()` and `getSectionIds()` inspect the quote list to build the nav structure. `rebuild` quotes appear in one section, `retool` quotes in another (at `RETOOL_SECTION_ID = "magento-alternative"`).

4. **Generic copy** (`lib/site.ts`) — Prose that isn't quote-specific (hero, comparison trade-off, Why Pragmatic, benefits, ongoing costs, delivery, phasing narrative, next steps, cost-savings context) lives here as large `as const` objects. Edit this file to change non-quote proposal text.

5. **Page layout** (`app/page.tsx`) — Calls `getQuotes()`, `getRebuildQuotes()`, `getRetoolQuotes()`, `getSectionIds()` and composes section components in order. **No React component changes are needed to add a new quote.**

### Adding a new quote

1. Create a new file in `content/quotes/` with all required frontmatter fields and an `order` value.
2. Optionally add a qualitative comparison entry in `comparisonBySlug` in `lib/site.ts` for the comparison table rows (architecture, search, flexibility, etc.). If omitted, those cells show an em dash.
3. That's it — cards, sections, navigation and the quote switcher will update automatically.

### Scroll-spy navigation

`components/ActiveSection.tsx` provides client-side scroll-spy highlighting. It reads a `--header-height` CSS custom property and `scrollPaddingTop` to compute which section is currently visible as the user scrolls.

## Authentication and Environment Variables

The site is protected by a password-authenticated access gate. Unauthenticated users are redirected to `/login`.

**How it works:**
- `middleware.ts` gates all routes (except static assets) behind a signed, timestamped cookie (`ACCESS_COOKIE = "site_access"`).
- `lib/auth.ts` provides HMAC-SHA256 signed tokens and password comparison with timing-safe comparison to prevent timing attacks.
- `app/api/login/route.ts` validates the password, rate-limits by IP (8 failed attempts per 15 minutes), and sets the access cookie.

**Required environment variables:**
- `SITE_AUTH_SECRET` — Secret key for signing access tokens. Must be at least 16 characters. If missing or too short, authentication is disabled.
- `SITE_PASSWORD` — The site password. Hashed comparison is performed via HMAC.

If either env var is missing or `SITE_AUTH_SECRET` is less than 16 characters, the auth system is treated as unconfigured and the middleware will not enforce access restrictions.

**Important note:** Rate-limiting is in-process and resets on application restart. It is not suitable for distributed deployments without additional backing store. IP detection uses `x-forwarded-for` (forwarded) then `x-real-ip` headers.

## Print and PDF

The proposal is designed to be printed or saved as PDF from the browser. Navigation and the quote switcher are hidden via CSS when printing (using `@media print`). This affects component and styling decisions — do not hide these elements via display properties that could be overridden by print styles.

## Stack

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Markdown parsing**: `gray-matter` (frontmatter), `react-markdown` + `remark-gfm` (rendering)
- **Icons**: Lucide React
- **Analytics** (production): Vercel Analytics + Speed Insights

## Type definitions

Key types are defined in `lib/types.ts`:
- `Quote` — A parsed quote file with slug, frontmatter, and rendered content
- `QuoteMeta` — Quote metadata (without the body content)
- `QuoteFrontmatter` — The YAML frontmatter fields
- `NavItem` — Navigation entry with child links
- `ProposalType` — `"rebuild"` | `"retool"`
