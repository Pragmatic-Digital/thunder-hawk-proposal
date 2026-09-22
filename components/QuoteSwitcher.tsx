"use client";

import { useActiveSection } from "@/components/ActiveSection";
import { cn } from "@/lib/cn";
import type { Quote } from "@/lib/content-schema";

export function QuoteSwitcher({ quotes }: { quotes: Quote[] }) {
  const { activeId } = useActiveSection();
  const current = quotes.find((quote) => quote.slug === activeId);
  const visible = Boolean(current);

  if (quotes.length < 2) {
    return null;
  }

  return (
    <div
      className={cn(
        "no-print fixed inset-x-0 z-30 transition-transform duration-300 ease-out",
        visible ? "translate-y-0" : "pointer-events-none -translate-y-full",
      )}
      style={{ top: "var(--header-height, 6.6rem)" }}
      aria-hidden={!visible}
    >
      <div className="border-b border-rule bg-paper/95 backdrop-blur-[3px] shadow-quiet">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-8 sm:py-2.5">
          <p className="min-w-0 truncate text-[0.68rem] uppercase tracking-[0.12em] text-ink-muted sm:text-[0.72rem] sm:tracking-[0.14em]">
            <span className="hidden sm:inline">Reading </span>
            <span className="font-semibold tracking-normal text-ink normal-case sm:ml-2">
              {current?.shortTitle ?? quotes[0]?.shortTitle}
            </span>
          </p>
          <div className="flex shrink-0 rounded-full border border-rule p-0.5">
            {quotes.map((quote) => {
              const active = quote.slug === current?.slug;
              return (
                <a
                  key={quote.slug}
                  href={`#${quote.slug}`}
                  tabIndex={visible ? 0 : -1}
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[0.72rem] font-medium transition-colors sm:px-3 sm:text-[0.75rem]",
                    active ? "bg-ink text-paper" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {quote.shortTitle}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
