import type { NavItem } from "./config-schema";
import type { QuoteMetadata } from "./content-schema";

export interface ResolvedNavItem extends Omit<NavItem, "matchIds"> {
  matchIds: string[];
}

export function resolveNavItems(navConfig: NavItem[], quotes: QuoteMetadata[]): ResolvedNavItem[] {
  return navConfig.map((item) => {
    const matchIds = item.matchIds === "auto-quotes" ? scopeMatchIds(quotes) : item.matchIds;
    return {
      ...item,
      matchIds,
    };
  });
}

function scopeMatchIds(quotes: QuoteMetadata[]): string[] {
  const rebuild = quotes.filter((q) => q.proposalType === "rebuild");
  const retool = quotes.filter((q) => q.proposalType === "retool");

  return [
    "scope-and-pricing",
    ...rebuild.map((quote) => quote.slug),
    ...retool.map((quote) => quote.slug),
    "cost-savings",
  ];
}

export function getSectionIds(quotes: QuoteMetadata[]): string[] {
  const rebuild = quotes.filter((q) => q.proposalType === "rebuild");
  const retool = quotes.filter((q) => q.proposalType === "retool");

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
