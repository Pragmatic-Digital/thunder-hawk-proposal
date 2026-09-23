import config from "@/proposal.config";
import { assertProposalConfig } from "@/lib/config-schema";
import { getSections, getQuotes } from "@/lib/content";
import { composeSections } from "@/lib/compose-sections";
import { buildNavItems, getSectionIds } from "@/lib/nav";
import { ProposalShell } from "@/components/ProposalShell";
import { ProposalFooter } from "@/components/ProposalFooter";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  assertProposalConfig(config);

  const [sections, quotes] = await Promise.all([getSections(), getQuotes()]);
  const composed = await composeSections(sections, quotes);
  const navItems = buildNavItems(sections);
  const sectionIds = getSectionIds(sections, quotes);

  return (
    <ProposalShell quotes={quotes} navItems={navItems} sectionIds={sectionIds}>
      <main>{composed}</main>
      <ProposalFooter />
    </ProposalShell>
  );
}
