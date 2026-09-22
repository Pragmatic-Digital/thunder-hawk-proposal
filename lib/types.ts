export type ProposalType = "rebuild" | "retool";

export type QuoteFrontmatter = {
  title: string;
  shortTitle: string;
  platform: string;
  price: string;
  priceValue: number;
  hours: number;
  days: number;
  status: string;
  summary: string;
  order: number;
  proposalType: ProposalType;
  outcomes: string[];
};

export type QuoteMeta = QuoteFrontmatter & {
  slug: string;
  recommended: boolean;
};

export type Quote = QuoteMeta & {
  content: string;
};

export type NavLink = {
  id: string;
  label: string;
};

export type NavItem = NavLink & {
  matchIds: string[];
  children?: NavLink[];
};

export const RETOOL_SECTION_ID = "magento-alternative";

export function isRebuildQuote(quote: Pick<QuoteMeta, "proposalType">) {
  return quote.proposalType === "rebuild";
}

export function isRetoolQuote(quote: Pick<QuoteMeta, "proposalType">) {
  return quote.proposalType === "retool";
}

export function getRebuildQuotes<T extends Pick<QuoteMeta, "proposalType">>(quotes: T[]) {
  return quotes.filter(isRebuildQuote);
}

export function getRetoolQuotes<T extends Pick<QuoteMeta, "proposalType">>(quotes: T[]) {
  return quotes.filter(isRetoolQuote);
}

function scopeMatchIds(quotes: QuoteMeta[]) {
  const rebuild = getRebuildQuotes(quotes);
  const retool = getRetoolQuotes(quotes);

  return [
    "scope-and-pricing",
    ...rebuild.map((quote) => quote.slug),
    ...retool.map((quote) => quote.slug),
    "cost-savings",
  ];
}

export function getNavItems(quotes: QuoteMeta[]): NavItem[] {
  return [
    { id: "overview", label: "Overview", matchIds: ["overview"] },
    { id: "options", label: "Options", matchIds: ["options", "comparison"] },
    { id: "why-pragmatic", label: "Why Pragmatic", matchIds: ["why-pragmatic"] },
    { id: "benefits", label: "Benefits", matchIds: ["benefits"] },
    { id: "scope-and-pricing", label: "Scope & Pricing", matchIds: scopeMatchIds(quotes) },
    { id: "ongoing-costs", label: "Ongoing Costs", matchIds: ["ongoing-costs"] },
    { id: "delivery", label: "Delivery", matchIds: ["delivery"] },
    { id: "phasing", label: "Phasing", matchIds: ["phasing"] },
    { id: "next-steps", label: "Next Steps", matchIds: ["next-steps"] },
  ];
}

export function getSectionIds(quotes: QuoteMeta[]) {
  const rebuild = getRebuildQuotes(quotes);
  const retool = getRetoolQuotes(quotes);

  return [
    "overview",
    "options",
    "comparison",
    "why-pragmatic",
    "benefits",
    "scope-and-pricing",
    ...rebuild.map((quote) => quote.slug),
    ...retool.map((quote) => quote.slug),
    "cost-savings",
    "ongoing-costs",
    "delivery",
    "phasing",
    "next-steps",
  ];
}

export function toQuoteMeta(quote: Quote): QuoteMeta {
  return {
    slug: quote.slug,
    title: quote.title,
    shortTitle: quote.shortTitle,
    platform: quote.platform,
    price: quote.price,
    priceValue: quote.priceValue,
    hours: quote.hours,
    days: quote.days,
    status: quote.status,
    summary: quote.summary,
    order: quote.order,
    proposalType: quote.proposalType,
    outcomes: quote.outcomes,
    recommended: quote.recommended,
  };
}
