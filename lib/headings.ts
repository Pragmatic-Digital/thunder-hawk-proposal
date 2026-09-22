import type { ReactNode } from "react";

export type MarkdownHeading = {
  id: string;
  label: string;
};

export function flattenText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(flattenText).join("");
  }
  if (children && typeof children === "object" && "props" in children) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props = (children as any).props;
    return flattenText(props?.children);
  }
  return "";
}

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
