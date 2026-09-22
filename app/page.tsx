import config from "@/proposal.config";
import { assertProposalConfig } from "@/lib/config-schema";
import { getQuotes } from "@/lib/content";
import { composeSections } from "@/lib/compose-sections";
import { resolveNavItems, getSectionIds } from "@/lib/nav";
import { ProposalShell } from "@/components/ProposalShell";
import { ProposalFooter } from "@/components/ProposalFooter";

assertProposalConfig(config);

export default async function HomePage() {
  const quotes = await getQuotes();
  const sections = await composeSections(config.sections, quotes);
  const navItems = resolveNavItems(config.nav, quotes);
  const sectionIds = getSectionIds(quotes);

  return (
    <ProposalShell quotes={quotes} navItems={navItems} sectionIds={sectionIds}>
      <main>{sections}</main>
      <ProposalFooter />
    </ProposalShell>
  );
}
