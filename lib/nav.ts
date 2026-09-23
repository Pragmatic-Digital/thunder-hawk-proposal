import type { Section, QuoteMetadata } from "./content-schema";

export type NavItem = {
  id: string;
  label: string;
  matchIds: string[];
};

export function buildNavItems(sections: Section[]): NavItem[] {
  const navGroups = new Map<string, { label?: string; sections: Section[] }>();
  const navOrder: string[] = [];

  for (const section of sections) {
    if (section.nav === false) continue;
    if (!section.nav) continue;

    const { id, label } = section.nav;

    if (!navGroups.has(id)) {
      navGroups.set(id, { label, sections: [] });
      navOrder.push(id);
    } else if (label && !navGroups.get(id)!.label) {
      navGroups.get(id)!.label = label;
    }

    navGroups.get(id)!.sections.push(section);
  }

  // Build nav items
  const items: NavItem[] = [];
  for (const id of navOrder) {
    const group = navGroups.get(id)!;
    if (!group.label) {
      throw new Error(`Nav group "${id}" has no label defined. At least one section in this group must specify nav.label.`);
    }

    const matchIds = group.sections.map((s) => s.slug);
    items.push({ id, label: group.label, matchIds });
  }

  return items;
}

export function getSectionIds(sections: Section[], quotes: QuoteMetadata[]): string[] {
  const result: string[] = [];

  for (const section of sections) {
    result.push(section.slug);

    if (section.component === "group") {
      // Add rebuild quotes
      const rebuild = quotes.filter((q) => q.proposalType === "rebuild");
      rebuild.forEach((q) => result.push(q.slug));

      // Add retool quotes
      const retool = quotes.filter((q) => q.proposalType === "retool");
      retool.forEach((q) => result.push(q.slug));

      // Add grouped children
      const groupedChildren = sections.filter((s) => s.groupWith === section.slug).sort((a, b) => a.order - b.order);
      groupedChildren.forEach((s) => result.push(s.slug));
    }
  }

  return result;
}
