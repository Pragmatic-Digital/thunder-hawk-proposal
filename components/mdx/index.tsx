import type { ReactNode, ComponentType } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, ComponentType<any> | React.ElementType | ((props: any) => ReactNode)>;
import { Reveal } from "@/components/Reveal";
import { MarkdownTable, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "@/components/EstimateTable";
import { CtaLink } from "@/components/CtaButton";
import { ProposalGroup } from "@/components/ProposalGroup";
import { Points } from "./Points";
import { Callout } from "./Callout";
import { Video } from "./Video";
import { Embed } from "./Embed";
import { Figure } from "./Figure";
import { cn } from "@/lib/cn";
import { headingId, flattenText } from "@/lib/headings";

function createHeadingComponent(level: number, idPrefix?: string) {
  return function Heading({ children }: { children: ReactNode }) {
    const text = flattenText(children);
    const id = idPrefix ? headingId(idPrefix, text) : undefined;

    const classes =
      level === 2
        ? "font-display mt-8 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:mt-10 sm:text-4xl"
        : level === 3
          ? "font-display mt-6 max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:mt-8 sm:text-3xl"
          : "font-display mt-4 max-w-2xl text-xl tracking-[-0.03em] text-ink sm:mt-6 sm:text-2xl";

    const Component = level === 2 ? "h2" : level === 3 ? "h3" : "h4";

    return (
      <Reveal>
        <Component className={classes} id={id}>
          {children}
        </Component>
      </Reveal>
    );
  };
}

export function createMDXComponents(idPrefix?: string): MDXComponents {
  return {
    h1: createHeadingComponent(2, idPrefix),
    h2: createHeadingComponent(2, idPrefix),
    h3: createHeadingComponent(3, idPrefix),
    h4: createHeadingComponent(4, idPrefix),
    h5: "h5",
    h6: "h6",
    p: ({ children }) => (
      <Reveal>
        <p className="mt-3 text-base leading-relaxed text-ink-soft sm:mt-4 sm:text-lg">{children}</p>
      </Reveal>
    ),
    ul: ({ children }) => (
      <Reveal>
        <ul className="mt-4 space-y-2 text-base leading-relaxed text-ink-soft sm:mt-5 sm:space-y-3 sm:text-lg">
          {children}
        </ul>
      </Reveal>
    ),
    ol: ({ children }) => (
      <Reveal>
        <ol className="mt-4 space-y-2 text-base leading-relaxed text-ink-soft sm:mt-5 sm:space-y-3 sm:text-lg">
          {children}
        </ol>
      </Reveal>
    ),
    li: ({ children }) => <li className="ml-6 before:absolute before:-ml-6 before:content-['–']">{children}</li>,
    blockquote: ({ children }) => (
      <Reveal>
        <blockquote className="my-6 border-l-4 border-sage pl-6 font-display text-lg italic leading-relaxed text-ink sm:my-8 sm:pl-8 sm:text-xl">
          {children}
        </blockquote>
      </Reveal>
    ),
    table: MarkdownTable,
    thead: TableHead,
    tbody: TableBody,
    tr: TableRow,
    th: TableHeaderCell,
    td: TableCell,
    a: ({ href, children }) => (
      <CtaLink href={href || "#"} variant="secondary">
        {children}
      </CtaLink>
    ),
    img: ({ src, alt, title }) => (
      <Figure src={src || ""} alt={alt || ""} title={title} aspect="16:9" />
    ),
    hr: () => <div className="my-8 border-t border-rule sm:my-10" />,
    // Custom MDX components
    Points,
    Callout,
    Video,
    Embed,
    Figure,
    ProposalGroup,
  } as MDXComponents;
}

export type SectionRendererProps = {
  content: string;
  slug: string;
  kicker?: string;
  title?: string;
  tone?: "default" | "invert" | "retool";
  children?: ReactNode;
};

export function SectionRenderer({
  content,
  slug,
  kicker,
  title,
  tone = "default",
  children,
}: SectionRendererProps) {
  const components = createMDXComponents(slug);

  const toneClasses = {
    default: "",
    invert: "bg-ink text-paper",
    retool: "bg-sage-mist/30",
  };

  return (
    <section
      id={slug}
      aria-labelledby={title ? `${slug}-heading` : undefined}
      className={cn("border-t border-rule", toneClasses[tone])}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        {kicker && (
          <Reveal>
            <p
              className={cn(
                "text-[0.72rem] font-semibold uppercase tracking-[0.2em]",
                tone === "invert" ? "text-sage-mist" : "text-sage-deep",
              )}
            >
              {kicker}
            </p>
          </Reveal>
        )}
        {title && (
          <Reveal>
            <h2
              id={`${slug}-heading`}
              className={cn(
                "font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] sm:text-4xl",
                tone === "invert" ? "text-paper" : "text-ink",
              )}
            >
              {title}
            </h2>
          </Reveal>
        )}

        <div className="proposal-prose mt-8 sm:mt-10">
          <MDXRemote source={content} components={components} />
        </div>

        {children}
      </div>
    </section>
  );
}
