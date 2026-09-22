import { Conclusion } from "@/components/Conclusion";
import { CostSavings } from "@/components/CostSavings";
import { Delivery } from "@/components/Delivery";
import { Hero } from "@/components/Hero";
import { OngoingCosts } from "@/components/OngoingCosts";
import { Phasing } from "@/components/Phasing";
import { ProposalFooter } from "@/components/ProposalFooter";
import { ProposalGroup } from "@/components/ProposalGroup";
import { ProposalShell } from "@/components/ProposalShell";
import { QuoteComparison } from "@/components/QuoteComparison";
import { QuoteOptions } from "@/components/QuoteOptions";
import { QuoteSection } from "@/components/QuoteSection";
import { WhyPragmatic } from "@/components/WhyPragmatic";
import { BenefitsSection } from "@/components/BenefitsSection";
import { getMarkdownPage } from "@/lib/pages";
import {
  getQuotes,
  getRebuildQuotes,
  getRetoolQuotes,
  getSectionIds,
  toQuoteMeta,
} from "@/lib/quotes";
import { scopeAndPricing } from "@/lib/site";
import { getSectionData } from "@/lib/render-section";

export default async function HomePage() {
  const quotes = getQuotes();
  const metas = quotes.map(toQuoteMeta);
  const rebuildQuotes = getRebuildQuotes(quotes);
  const retoolQuotes = getRetoolQuotes(quotes);
  const phasing = getMarkdownPage("phasing");
  const benefitsSection = await getSectionData("benefits");

  return (
    <ProposalShell quotes={metas} sectionIds={getSectionIds(metas)}>
      <main>
        <Hero />
        <QuoteOptions quotes={metas} />
        <QuoteComparison quotes={metas} />
        <WhyPragmatic />
        <BenefitsSection section={benefitsSection} />
        <ProposalGroup
          id="scope-and-pricing"
          kicker={scopeAndPricing.kicker}
          heading={scopeAndPricing.heading}
          lede={scopeAndPricing.lede}
        >
          {rebuildQuotes.map((quote, index) => (
            <QuoteSection
              key={quote.slug}
              quote={quote}
              index={index}
              compactTop={index === 0}
              className={index === 0 ? "border-t-0" : undefined}
            />
          ))}
          {retoolQuotes.length ? (
            <div className="retool-section bg-page-deep/70">
              {retoolQuotes.map((quote) => (
                <QuoteSection key={quote.slug} quote={quote} />
              ))}
            </div>
          ) : null}
          <CostSavings />
        </ProposalGroup>
        <OngoingCosts />
        <Delivery />
        <Phasing page={phasing} />
        <Conclusion />
      </main>
      <ProposalFooter />
    </ProposalShell>
  );
}
