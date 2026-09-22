import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MarkdownPage = {
  slug: string;
  title: string;
  kicker: string;
  content: string;
};

export function getMarkdownPage(slug: string): MarkdownPage {
  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  return {
    slug,
    title: String(parsed.data.title ?? slug),
    kicker: String(parsed.data.kicker ?? ""),
    content: parsed.content.trim(),
  };
}
