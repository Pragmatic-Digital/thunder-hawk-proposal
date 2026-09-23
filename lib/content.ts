import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  assertQuoteFrontmatter,
  assertSectionFrontmatter,
  toQuoteMetadata,
  type Quote,
  type QuoteMetadata,
  type Section,
  type SectionFrontmatter,
  type QuoteFrontmatter,
} from "./content-schema";

const SECTIONS_DIRECTORY = path.join(process.cwd(), "content", "sections");
const QUOTES_DIRECTORY = path.join(process.cwd(), "content", "quotes");

export type { Quote, QuoteMetadata, Section, SectionFrontmatter, QuoteFrontmatter };

export async function getSection(slug: string): Promise<Section> {
  const filePath = path.join(SECTIONS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content section "${slug}" not found at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = assertSectionFrontmatter(data, slug);

  return {
    slug,
    ...fm,
    content: content.trim(),
    rawContent: raw,
  };
}

export async function getQuote(slug: string): Promise<Quote> {
  const filePath = path.join(QUOTES_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Quote "${slug}" not found at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = assertQuoteFrontmatter(data, slug);
  const meta = toQuoteMetadata({ ...fm, slug, rawContent: raw });

  return {
    ...meta,
    content: content.trim(),
  };
}

export async function getQuotes(): Promise<Quote[]> {
  if (!fs.existsSync(QUOTES_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(QUOTES_DIRECTORY).filter((f) => f.endsWith(".mdx"));
  const quotes = await Promise.all(files.map((f) => getQuote(f.replace(/\.mdx$/, ""))));

  return quotes.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getSections(): Promise<Section[]> {
  if (!fs.existsSync(SECTIONS_DIRECTORY)) {
    return [];
  }

  const files = fs.readdirSync(SECTIONS_DIRECTORY).filter((f) => f.endsWith(".mdx"));
  const sections = await Promise.all(files.map((f) => getSection(f.replace(/\.mdx$/, ""))));

  return sections.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
