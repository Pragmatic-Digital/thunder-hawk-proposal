export type MarkdownHeading = {
  id: string;
  label: string;
};

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function headingId(prefix: string, text: string) {
  const slug = slugifyHeading(text);
  return prefix ? `${prefix}-${slug}` : slug;
}

export function extractMarkdownHeadings(content: string, prefix: string): MarkdownHeading[] {
  const headings: MarkdownHeading[] = [];
  const seen = new Set<string>();

  for (const match of content.matchAll(/^#{1,3}\s+(.+?)\s*$/gm)) {
    const label = match[1]?.replace(/\*+/g, "").trim();
    if (!label) {
      continue;
    }

    const id = headingId(prefix, label);
    if (seen.has(id)) {
      continue;
    }

    seen.add(id);
    headings.push({ id, label });
  }

  return headings;
}
