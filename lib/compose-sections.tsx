import type { ReactNode } from "react";
import type { Quote, Section } from "@/lib/content-schema";
import { SectionRenderer } from "@/components/mdx";
import { Hero } from "@/components/Hero";
import { QuoteOptions } from "@/components/QuoteOptions";
import { QuoteComparison } from "@/components/QuoteComparison";
import { QuoteSection } from "@/components/QuoteSection";
import { ProposalGroup } from "@/components/ProposalGroup";

export async function composeSections(sections: Section[], quotes: Quote[]): Promise<ReactNode[]> {
  const topLevel = sections.filter((s) => !s.groupWith);
  const grouped = new Map<string, Section[]>();

  for (const section of sections) {
    if (section.groupWith) {
      if (!grouped.has(section.groupWith)) {
        grouped.set(section.groupWith, []);
      }
      grouped.get(section.groupWith)!.push(section);
    }
  }

  // Sort grouped children by order
  for (const children of grouped.values()) {
    children.sort((a, b) => a.order - b.order);
  }

  const result: ReactNode[] = [];

  for (const section of topLevel) {
    if (section.component === "hero") {
      result.push(<Hero key={section.slug} />);
    } else if (section.component === "options-cards") {
      result.push(<QuoteOptions key={section.slug} quotes={quotes} />);
    } else if (section.component === "comparison-table") {
      const rebuildQuotes = quotes.filter((q) => q.proposalType === "rebuild");
      result.push(<QuoteComparison key={section.slug} quotes={rebuildQuotes} />);
    } else if (section.component === "group") {
      const rebuildQuotes = quotes.filter((q) => q.proposalType === "rebuild");
      const retoolQuotes = quotes.filter((q) => q.proposalType === "retool");

      const groupChildren: ReactNode[] = [];

      // Rebuild quotes
      rebuildQuotes.forEach((quote, index) => {
        groupChildren.push(
          <QuoteSection
            key={`rebuild-${index}`}
            quote={quote}
            index={index}
            compactTop={index === 0}
            className={index === 0 ? "border-t-0" : undefined}
          />,
        );
      });

      // Retool quotes (wrapped in retool tone)
      if (retoolQuotes.length > 0) {
        const retoolSections = retoolQuotes.map((quote) => (
          <QuoteSection key={`retool-${quote.slug}`} quote={quote} />
        ));
        groupChildren.push(
          <div key="retool-group" className="retool-section bg-page-deep/70">
            {retoolSections}
          </div>,
        );
      }

      // Grouped children (e.g., cost-savings)
      const children = grouped.get(section.slug) || [];
      for (const child of children) {
        groupChildren.push(
          <SectionRenderer
            key={child.slug}
            content={child.content}
            slug={child.slug}
            kicker={child.kicker}
            title={child.title}
            tone={child.tone ?? "default"}
          />,
        );
      }

      result.push(
        <ProposalGroup
          key={section.slug}
          id={section.slug}
          kicker={section.kicker ?? ""}
          heading={section.title}
          lede={section.lede}
          tone="default"
        >
          {groupChildren}
        </ProposalGroup>,
      );
    } else {
      // Default prose rendering
      result.push(
        <SectionRenderer
          key={section.slug}
          content={section.content}
          slug={section.slug}
          kicker={section.kicker}
          title={section.title}
          tone={section.tone ?? "default"}
        />,
      );
    }
  }

  return result;
}
