import type { ReactNode } from "react";
import type { SectionConfigEntry } from "@/lib/config-schema";
import type { Quote } from "@/lib/content-schema";
import { getSection } from "@/lib/content";
import { SectionRenderer } from "@/components/mdx";
import { Hero } from "@/components/Hero";
import { QuoteOptions } from "@/components/QuoteOptions";
import { QuoteComparison } from "@/components/QuoteComparison";
import { QuoteSection } from "@/components/QuoteSection";
import { ProposalGroup } from "@/components/ProposalGroup";

export async function renderSectionEntry(
  entry: SectionConfigEntry,
  quotes: Quote[],
  keyPrefix = "",
): Promise<ReactNode> {
  if (entry.component === "group") {
    const section = entry.slug ? await getSection(entry.slug) : null;
    const children = await Promise.all(
      (entry.children ?? []).map((child, i) =>
        renderSectionEntry(child, quotes, `${keyPrefix}${entry.slug ?? "group"}-${i}`),
      ),
    );
    return (
      <ProposalGroup
        key={entry.slug ?? keyPrefix}
        id={entry.slug}
        kicker={section?.kicker ?? ""}
        heading={section?.title ?? ""}
        lede={(section as Record<string, unknown>)?.lede as string | undefined}
        tone={entry.tone === "retool" ? "retool" : "default"}
      >
        {children}
      </ProposalGroup>
    );
  }

  if (entry.quoteGroup) {
    const filtered =
      entry.quoteGroup === "all" ? quotes : quotes.filter((q) => q.proposalType === entry.quoteGroup);

    if (entry.component === "options-cards") {
      return <QuoteOptions key="options" quotes={filtered as any} />;
    }
    if (entry.component === "comparison-table") {
      return <QuoteComparison key="comparison" quotes={filtered as any} />;
    }
    const sections = filtered.map((quote, index) => (
      <QuoteSection
        key={quote.slug}
        quote={quote as any}
        index={entry.quoteGroup === "rebuild" ? index : undefined}
        compactTop={entry.quoteGroup === "rebuild" && index === 0}
        className={entry.quoteGroup === "rebuild" && index === 0 ? "border-t-0" : undefined}
      />
    ));
    if (entry.tone === "retool") {
      return (
        <div key="retool-group" className="retool-section bg-page-deep/70">
          {sections}
        </div>
      );
    }
    return <>{sections}</>;
  }

  if (entry.component === "hero") {
    return <Hero key="hero" />;
  }

  if (entry.slug) {
    const section = await getSection(entry.slug);
    return (
      <SectionRenderer
        key={entry.slug}
        content={section.content}
        slug={section.slug}
        kicker={section.kicker}
        title={section.title}
        tone={section.tone ?? "default"}
      />
    );
  }

  return null;
}

export async function composeSections(
  sections: SectionConfigEntry[],
  quotes: Quote[],
): Promise<ReactNode[]> {
  return Promise.all(sections.map((entry, i) => renderSectionEntry(entry, quotes, String(i))));
}
