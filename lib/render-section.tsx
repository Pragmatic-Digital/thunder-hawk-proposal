import { getSection } from "./content";
import type { Section } from "./content-schema";

export async function getSectionData(slug: string): Promise<Section | null> {
  try {
    return await getSection(slug);
  } catch (err) {
    console.error(`Failed to load section "${slug}":`, err);
    return null;
  }
}
