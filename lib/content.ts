import fs from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
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

async function compileContent(
  source: string,
  slug: string,
): Promise<{ frontmatter: Record<string, unknown>; content: string }> {
  try {
    const result = await compileMDX({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
        },
      },
    });
    // compileMDX returns JSX content; we'll store it as the source code string
    // The actual rendering happens in SectionRenderer via MDXRemote
    return {
      frontmatter: result.frontmatter as Record<string, unknown>,
      content: source.split("---").slice(2).join("---").trim(),
    };
  } catch (err) {
    throw new Error(
      `Failed to compile MDX for "${slug}": ${err instanceof Error ? err.message : String(err)}`,
    );
  }
}

export async function getSection(slug: string): Promise<Section> {
  const filePath = path.join(SECTIONS_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content section "${slug}" not found at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = await compileContent(raw, slug);
  const fm = assertSectionFrontmatter(frontmatter, slug);

  return {
    slug,
    ...fm,
    content,
    rawContent: raw,
  };
}

export async function getQuote(slug: string): Promise<Quote> {
  const filePath = path.join(QUOTES_DIRECTORY, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Quote "${slug}" not found at ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, content } = await compileContent(raw, slug);
  const fm = assertQuoteFrontmatter(frontmatter, slug);
  const meta = toQuoteMetadata({ ...fm, slug, rawContent: raw });

  return {
    ...meta,
    content,
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

export async function getSections(slugs: string[]): Promise<Section[]> {
  return Promise.all(slugs.map((slug) => getSection(slug)));
}
