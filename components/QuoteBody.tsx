"use client";

import { CtaButton } from "@/components/CtaButton";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { cn } from "@/lib/cn";
import type { MarkdownHeading } from "@/lib/headings";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const COLLAPSED_HEIGHT = 22 * 16;

export function QuoteBody({
  slug,
  content,
  headings,
  startExpanded = false,
}: {
  slug: string;
  content: string;
  headings: MarkdownHeading[];
  startExpanded?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(startExpanded);
  const [needsToggle, setNeedsToggle] = useState(true);

  useEffect(() => {
    if (startExpanded) {
      setExpanded(true);
    }
  }, [startExpanded]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return;
    }

    const measure = () => {
      setNeedsToggle(content.scrollHeight > COLLAPSED_HEIGHT + 32);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, [content]);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && headings.some((heading) => heading.id === hash)) {
      setExpanded(true);
    }
  }, [headings]);

  function openAndJump(id: string) {
    setExpanded(true);
    window.requestAnimationFrame(() => {
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      }, 40);
    });
  }

  function toggle() {
    if (expanded) {
      setExpanded(false);
      document.getElementById(`${slug}-heading`)?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      return;
    }

    setExpanded(true);
  }

  return (
    <div>
      {headings.length ? (
        <nav aria-label="In this proposal" className="no-print mb-8">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            In this proposal
          </p>
          <ul className="mt-3 flex gap-1 flex-wrap">
            {headings.map((heading) => (
              <li key={heading.id} className="shrink-0">
                <a
                  href={`#${heading.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    openAndJump(heading.id);
                    window.history.replaceState(null, "", `#${heading.id}`);
                  }}
                  className="block rounded-full border border-rule bg-paper/80 px-3 py-1.5 text-[0.78rem] text-ink-muted transition-colors hover:border-sage hover:text-ink"
                >
                  {heading.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <div className={cn("quote-extender", !expanded && needsToggle && "is-collapsed")}>
        <div ref={contentRef}>
          <MarkdownRenderer content={content} idPrefix={slug} />
        </div>
      </div>

      {needsToggle ? (
        <CtaButton
          className="no-print mt-5"
          variant={expanded ? "secondary" : "primary"}
          aria-expanded={expanded}
          onClick={toggle}
          icon={
            expanded ? (
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            )
          }
        >
          {expanded ? "Show less" : "Read the full proposal"}
        </CtaButton>
      ) : null}
    </div>
  );
}
