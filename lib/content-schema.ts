export type ProposalType = "rebuild" | "retool";

export type SectionFrontmatter = {
  title: string;
  kicker?: string;
  layout?: "prose" | "quote" | "hero" | "invert" | "retool";
  tone?: "default" | "invert" | "retool";
};

export type QuoteFrontmatterExtension = {
  layout: "quote";
  proposalType: ProposalType;
  shortTitle: string;
  platform: string;
  price: string;
  priceValue: number;
  hours: number;
  days: number;
  status: string;
  summary: string;
  order: number;
  outcomes?: string[];
  comparison?: {
    architecture: string;
    search: string;
    flexibility: string;
    nativeB2B: string;
    bespokeWorkflow: string;
    ongoingDependency: string;
  };
};

export type QuoteFrontmatter = SectionFrontmatter & QuoteFrontmatterExtension;

export type SectionMetadata = SectionFrontmatter & {
  slug: string;
  rawContent: string;
};

export type QuoteMetadata = QuoteFrontmatter & {
  slug: string;
  recommended: boolean;
  rawContent: string;
};

export type Section = SectionMetadata & {
  content: string; // Compiled MDX JSX string
};

export type Quote = QuoteMetadata & {
  content: string; // Compiled MDX JSX string
};

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

function parseComparison(value: unknown): QuoteFrontmatterExtension["comparison"] | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const obj = value as Record<string, unknown>;
  return {
    architecture: String(obj.architecture ?? ""),
    search: String(obj.search ?? ""),
    flexibility: String(obj.flexibility ?? ""),
    nativeB2B: String(obj.nativeB2B ?? ""),
    bespokeWorkflow: String(obj.bespokeWorkflow ?? ""),
    ongoingDependency: String(obj.ongoingDependency ?? ""),
  };
}

export function assertSectionFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): SectionFrontmatter {
  const required = ["title"] as const;
  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === "") {
      throw new Error(`Section "${slug}" is missing required frontmatter field "${field}".`);
    }
  }
  return {
    title: String(data.title),
    kicker: data.kicker ? String(data.kicker) : undefined,
    layout: data.layout ? (String(data.layout) as SectionFrontmatter["layout"]) : undefined,
    tone: data.tone ? (String(data.tone) as SectionFrontmatter["tone"]) : undefined,
  };
}

export function assertQuoteFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): QuoteFrontmatter {
  const baseFrontmatter = assertSectionFrontmatter(data, slug);

  const required = [
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
      throw new Error(`Quote "${slug}" is missing required frontmatter field "${field}".`);
    }
  }

  return {
    ...baseFrontmatter,
    layout: "quote",
    proposalType: parseProposalType(data.proposalType),
    shortTitle: String(data.shortTitle),
    platform: String(data.platform),
    price: String(data.priceDisplay ?? formatPrice(data.price)),
    priceValue: parsePriceValue(data.price),
    hours: Number(data.hours),
    days: Number(data.days),
    status: String(data.status),
    summary: String(data.summary),
    order: Number(data.order),
    outcomes: parseOutcomes(data.outcomes),
    comparison: parseComparison(data.comparison),
  };
}

export function toQuoteMetadata(
  quote: QuoteFrontmatter & { slug: string; rawContent: string },
): QuoteMetadata {
  return {
    ...quote,
    recommended: quote.status.trim().toLowerCase() === "recommended",
  };
}

export function getRebuildQuotes<T extends Pick<QuoteMetadata, "proposalType">>(quotes: T[]) {
  return quotes.filter((q) => q.proposalType === "rebuild");
}

export function getRetoolQuotes<T extends Pick<QuoteMetadata, "proposalType">>(quotes: T[]) {
  return quotes.filter((q) => q.proposalType === "retool");
}

export const RETOOL_SECTION_ID = "magento-alternative";
