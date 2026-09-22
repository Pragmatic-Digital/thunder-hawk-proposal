import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  toQuoteMeta,
  type ProposalType,
  type Quote,
  type QuoteFrontmatter,
} from "@/lib/types";

export type { Quote, QuoteFrontmatter, QuoteMeta, ProposalType } from "@/lib/types";
export {
  getNavItems,
  getRebuildQuotes,
  getRetoolQuotes,
  getSectionIds,
  isRebuildQuote,
  isRetoolQuote,
  toQuoteMeta,
  RETOOL_SECTION_ID,
} from "@/lib/types";

const QUOTES_DIRECTORY = path.join(process.cwd(), "content", "quotes");

function formatPrice(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return `£${value.toLocaleString("en-GB")} + VAT`;
  }

  return String(value);
}

function parsePriceValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  const normalised = String(value).replace(/,/g, "").replace(/[^\d.]/g, "");
  const parsed = Number.parseFloat(normalised);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseProposalType(value: unknown): ProposalType {
  return String(value ?? "").trim().toLowerCase() === "retool" ? "retool" : "rebuild";
}

function parseOutcomes(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item).trim()).filter(Boolean);
}

function assertFrontmatter(data: Record<string, unknown>, slug: string): QuoteFrontmatter {
  const required = [
    "title",
    "shortTitle",
    "platform",
    "price",
    "hours",
    "days",
    "status",
    "summary",
    "order",
  ] as const;

  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      throw new Error(`Quote "${slug}" is missing frontmatter field "${field}".`);
    }
  }

  return {
    title: String(data.title),
    shortTitle: String(data.shortTitle),
    platform: String(data.platform),
    price: String(data.priceDisplay ?? formatPrice(data.price)),
    priceValue: parsePriceValue(data.price),
    hours: Number(data.hours),
    days: Number(data.days),
    status: String(data.status),
    summary: String(data.summary),
    order: Number(data.order),
    proposalType: parseProposalType(data.proposalType),
    outcomes: parseOutcomes(data.outcomes),
  };
}

function readQuoteFile(filename: string): Quote {
  const slug = filename.replace(/\.mdx?$/, "");
  const filePath = path.join(QUOTES_DIRECTORY, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = assertFrontmatter(parsed.data, slug);

  return {
    slug,
    ...frontmatter,
    recommended: frontmatter.status.trim().toLowerCase() === "recommended",
    content: parsed.content.trim(),
  };
}

export function getQuotes(): Quote[] {
  if (!fs.existsSync(QUOTES_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(QUOTES_DIRECTORY)
    .filter((filename) => filename.endsWith(".md") || filename.endsWith(".mdx"))
    .map(readQuoteFile)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getQuoteMetas() {
  return getQuotes().map(toQuoteMeta);
}
