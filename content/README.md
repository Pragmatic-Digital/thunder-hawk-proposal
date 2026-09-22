# Content Authoring Guide

This directory contains all proposal content in Markdown/MDX format. Content is organized into two subdirectories:

## `sections/`

Individual proposal sections, each as a `.mdx` file. These are rendered via the generic `<SectionRenderer>` component and referenced in `proposal.config.ts` under the `sections` array.

### Creating a section

1. Create a new file: `sections/my-section.mdx`
2. Include frontmatter with required fields:
   ```yaml
   ---
   title: "Section Title"
   kicker: "Optional eyebrow label"
   ---
   ```
3. Write the body in Markdown. Supports:
   - Headings (## becomes h3, ### becomes h4)
   - Paragraphs
   - Ordered and unordered lists
   - Tables (GFM syntax)
   - Blockquotes
   - Links, emphasis (**bold**, *italic*)
   - Horizontal rules

4. Add the section to `proposal.config.ts`:
   ```ts
   { slug: "my-section" }
   ```

### Markdown conventions

**Lists**: Ordered lists render with a numbered badge design (not standard bullets). Unordered lists render with a dash bullet.

**Tables**: Tables follow GFM syntax. Special styling applies to rows containing specific keywords:
- A row whose first cell contains "Total" (case-insensitive) is styled as a summary row with bold/darker background
- Numeric columns (headers matching /hours|days|cost|price|estimate|total|figure|£/) are right-aligned
- Tables with ≤2 columns use compact layout

Example:
```markdown
| Item | Hours |
|------|-------|
| Task A | 40 |
| Task B | 60 |
| **Total** | **100** |
```

## `quotes/`

Quote/pricing-option files, each a `.mdx` file. These are parsed specially via the content loader and include extended frontmatter.

### Creating a quote

1. Create a new file: `quotes/vendor-name.mdx`
2. Include all required frontmatter fields:
   ```yaml
   ---
   title: "Full vendor/option name"
   shortTitle: "Short name for nav"
   platform: "Technology platform"
   price: "£X,XXX + VAT"  # or a number; auto-formatted
   hours: 1245            # numeric estimate
   days: 166              # numeric estimate
   status: "Recommended"  # or "Alternative", etc. — "Recommended" highlights the option
   summary: "One-line summary for cards"
   order: 1               # sort order (lowest first)
   proposalType: "rebuild" # or "retool"
   outcomes:              # optional array for retool quotes
     - "Outcome 1"
     - "Outcome 2"
   comparison:            # optional, for rebuild quotes only
     architecture: "..."
     search: "..."
     flexibility: "..."
     nativeB2B: "..."
     bespokeWorkflow: "..."
     ongoingDependency: "..."
   ---
   ```

3. Write the body (Markdown/MDX). This becomes the detailed proposal section for that option.
4. The quote automatically appears in options-at-a-glance cards and (for rebuild quotes) the comparison table. No additional config needed.

### Fields explained

- **price/priceDisplay**: Pass a number (`116200`) for auto-formatting as "£116,200 + VAT", or a string (`"£116,200 + VAT"`) for explicit display.
- **status**: "Recommended" (case-insensitive) triggers the recommended highlight on the card and comparison column. Any other string is displayed as a badge.
- **proposalType**: "rebuild" or "retool" controls which section groups the quote appears in and whether it participates in the comparison table.
- **comparison**: Only for rebuild quotes. These qualitative values appear in the comparison table rows. All six fields are optional; missing fields render as "—".

## Site metadata

Edit `proposal.config.ts` for:
- `site.*` — agency name, client name, contact details
- `theme.*` — colour tokens (override via CSS variables at runtime)
- `nav[]` — navigation items and section ordering
- `sections[]` — which content files to render and in what order

## Images and assets

Place images under `public/content/<slug>/` and reference them in Markdown as:
```markdown
![alt text](/content/slug/image.jpg)
```

Or use the `<Figure>` component in MDX:
```mdx
<Figure src="/content/slug/image.jpg" alt="Description" title="Optional caption" aspect="16:9" />
```

## Custom MDX components

The following components are available inline in `.mdx` files:

- **`<Callout variant="info|warning|success">`** — An aside box with left border
- **`<Video provider="youtube|vimeo|loom" id="video-id" title="..."`** — Embeds video (ID only, no full URL)
- **`<Embed src="https://..." title="..." aspect="16:9|4:3|auto">`** — Generic iframe embed (sanitised for safety)
- **`<Figure src="..." alt="..." title="..." aspect="...">`** — Image with optional caption

Example:
```mdx
<Callout variant="info">
This is an important note.
</Callout>

<Video provider="youtube" id="dQw4w9WgXcQ" title="Example Video" />

<Embed src="https://example.com/embed" title="External embed" />
```

## Styling

All Markdown content renders inside `.proposal-prose`, which provides typography and spacing via Tailwind. Explicit Tailwind classes are not available in Markdown — use semantic Markdown syntax (headings, lists, blockquotes, emphasis) instead.

Tables, videos, embeds, and images are exempted from the prose column max-width and render full-width where the viewport allows.

## Questions?

Refer to `CLAUDE.md` for architecture and setup. Refer to `proposal.config.ts` for configuration options.
