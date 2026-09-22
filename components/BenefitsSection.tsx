import { SectionRenderer } from "@/components/mdx";
import type { Section } from "@/lib/content-schema";

export async function BenefitsSection({ section }: { section: Section | null }) {
  if (!section) {
    return null;
  }

  return (
    <SectionRenderer
      content={section.content}
      slug={section.slug}
      kicker={section.kicker}
      title={section.title}
      tone={(section.tone as "default" | "invert" | "retool" | undefined) || "default"}
    />
  );
}
