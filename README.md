# Client Name digital platform proposal

A single-page proposal site for **Pragmatic Digital**, presenting technical and commercial quote options for **Client Name**. Proposal copy lives in Markdown; the React app discovers those files automatically.

## 1. How to run the project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Node 20 or later is required (see `.nvmrc`).

```bash
nvm use
npm install
npm run dev
```

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint |

Print or “Save as PDF” from the browser to produce a printable proposal. Navigation and the quote switcher are hidden in print.

## 2. Where proposal Markdown lives

```
content/quotes/
  vendure.md
  shopify.md
```

Each file is a quote. YAML frontmatter at the top is used for cards, navigation, comparison totals and recommendation state. Everything below the frontmatter is rendered as the full proposal section.

Shared phasing and requirements-coverage copy lives in `content/phasing.md`.

Generic presentation copy (hero, comparison trade-off, Why Pragmatic, cost/delivery notes) lives in `lib/site.ts`, not in the quote files.

## 3. How to add another quote

1. Add a new Markdown file to `content/quotes/`, for example `content/quotes/commercetools.md`.
2. Include the frontmatter fields listed below. The `order` value controls sort position.
3. The filename (without `.md`) becomes the slug, section id and nav target.
4. Optionally add a matching entry in `comparisonBySlug` inside `lib/site.ts` for the qualitative comparison rows (architecture, search, flexibility, B2B, workflow, dependency). If that entry is omitted, those cells show an em dash.

No React components need to change. Cards, sections, navigation and the quote switcher update from the filesystem.

## 4. Frontmatter fields

| Field | Type | Used for |
| --- | --- | --- |
| `title` | string | Card and section heading |
| `shortTitle` | string | Navigation and quote switcher |
| `platform` | string | Technology line and comparison |
| `price` | string or number | Displayed investment, e.g. `£116,200 + VAT` |
| `hours` | number | Estimated hours |
| `days` | number | Estimated days |
| `status` | string | Badge copy. Use `Recommended` to emphasise an option |
| `summary` | string | Short card description |
| `order` | number | Sort order, lowest first |

Example:

```yaml
---
title: "Vendure Custom Platform"
shortTitle: "Vendure"
platform: "Vendure + Next.js"
price: "£116,200 + VAT"
hours: 1245
days: 166
status: "Recommended"
summary: "A Vendure and Next.js rebuild of the Magento trade portal."
order: 1
---
```

Markdown in the body supports headings, paragraphs, lists, tables, blockquotes, emphasis and horizontal rules. Rows whose first cells contain `Total`, `Core project total` or `Total including` are styled as estimate totals.

## 5. How to change the recommended option

Set `status: "Recommended"` on the quote that should be emphasised, and use a different status on the others (`Alternative`, `Option`, and so on).

The app treats any quote whose status is `Recommended` (case-insensitive) as the highlighted option. That affects the card border, badges and the comparison column, not the tone of the other quotes.
