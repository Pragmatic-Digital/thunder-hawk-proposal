# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture: MDX-Driven Proposal Framework

This is a reusable proposal-generator framework. Content is authored in Markdown/MDX files; the site compiles them at build time and renders them server-side. To create a new proposal, fork the repo, edit the markdown files and `proposal.config.ts`, and deploy.

### Three layers

1. **Content** (`content/sections/` and `content/quotes/`) — Markdown/MDX files with YAML frontmatter, parsed and compiled at build time via `next-mdx-remote`.
2. **Configuration** (`proposal.config.ts`) — Site metadata (agency/client/colours), section ordering, navigation structure. Typed and validated at module load.
3. **Components** (`components/mdx/` + reusable layout components) — React components that render sections, handle MDX rendering, and provide custom block components (`<Video>`, `<Callout>`, `<Embed>`, etc.).

### Key files

- **`proposal.config.ts`** — Single source of truth for site metadata and section ordering. Edit this and the `.mdx` files; no other config needed.
- **`content/sections/*.mdx`** — Generic proposal sections (hero, benefits, delivery, etc.). Each rendered via `<SectionRenderer>`.
- **`content/quotes/*.mdx`** — Pricing/option quotes with extended frontmatter (price, hours, comparison fields). Auto-appear in options cards and comparison table.
- **`lib/content.ts`** — Content loader using `compileMDX` to parse and render `.mdx` files.
- **`lib/config-schema.ts`** and **`lib/content-schema.ts`** — TypeScript type definitions for config and content frontmatter.
- **`components/mdx/index.tsx`** — The MDX component map and generic `<SectionRenderer>` wrapper (handles heading anchors, prose styling, custom blocks).

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local dev server on http://localhost:3000 |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint check |

**Node version**: >=20 required (see `.nvmrc`).

**Package manager**: pnpm (primary).

## To add a new proposal section

1. Create `content/sections/my-section.mdx` with frontmatter (title, optional kicker) and Markdown body.
2. Add an entry to `proposal.config.ts` → `sections[]`: `{ slug: "my-section" }`.
3. No code changes needed — the page discovers it automatically.

See `content/README.md` for Markdown conventions and custom component syntax.

## To add a new pricing/quote option

1. Create `content/quotes/vendor-name.mdx` with all required frontmatter (title, shortTitle, platform, price, hours, days, status, summary, order, proposalType).
2. For rebuild quotes, optionally add a `comparison:` block with qualitative rows (architecture, search, flexibility, nativeB2B, bespokeWorkflow, ongoingDependency).
3. No config edits needed — it auto-appears in options cards and (if rebuild) the comparison table.

## To change branding/site metadata

Edit `proposal.config.ts`:
- **`site.*`** — Agency name, client name, contact details, GTM ID, etc.
- **`theme.*`** — Colour tokens (maps to CSS vars; these are overridden at runtime via `<style>` injection in `app/layout.tsx`).
- **`nav[]`** — Navigation items and their section targets.
- **`sections[]`** — Section ordering and which content files to render.

## Styling and theme

Tailwind CSS 4 with a custom colour palette defined in `app/globals.css`'s `@theme` block. The palette uses CSS custom properties (`--color-sage`, `--color-ink`, etc.), overridable at runtime via `proposal.config.ts` theme values.

Print CSS: the page renders to PDF correctly (via browser "Save as PDF"). Nav and interactive chrome hide under `@media print`; tables scroll properly; sections marked with `print-keep` avoid unwanted page breaks.

## Auth and deployment

The site is password-protected via middleware (`middleware.ts`). Set environment variables:
- **`SITE_AUTH_SECRET`** — Secret key for signing access tokens (≥16 chars)
- **`SITE_PASSWORD`** — The site password (compared via timing-safe HMAC)

Rate-limiting is in-process (not suitable for multi-instance deploys without a backing store).

## Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Content**: MDX via `next-mdx-remote/rsc` (server-side compiled)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Markdown**: GFM tables, strikethrough, autolinks (via `remark-gfm`)
- **Type safety**: TypeScript (strict mode)

## Type definitions

Key types in `lib/content-schema.ts`:
- `SectionFrontmatter` — Minimal shape (title, optional kicker, layout, tone)
- `QuoteFrontmatter` — Extended (adds proposalType, price, hours, days, status, comparison, outcomes)
- `Section` — Parsed section with compiled MDX content
- `Quote` — Parsed quote with compiled MDX content and derived `recommended` flag

## Testing the build locally

```bash
pnpm build        # Validates all content and config at build time
pnpm dev          # Start dev server; hot-reload on content changes
pnpm lint         # Type check and lint
```

Heading anchors work automatically — the page auto-derives section IDs from content slugs, and heading IDs are scoped per-section to avoid collisions. Print export (browser "Save as PDF") works via CSS media queries.
