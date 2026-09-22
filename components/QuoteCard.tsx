import { CtaLink } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { cn, formatDays, formatHours } from "@/lib/cn";
import type { QuoteMeta } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export function QuoteCard({ quote, index }: { quote: QuoteMeta; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 90}
      className={cn(
        "print-keep flex h-full flex-col rounded-2xl border bg-paper p-6 shadow-quiet sm:p-8",
        quote.recommended ? "border-sage" : "border-rule",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          Option {String(index + 1).padStart(2, "0")}
        </p>
        {quote.status ? (
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
              quote.recommended
                ? "bg-sage-deep text-paper"
                : "border border-rule bg-page text-ink-muted",
            )}
          >
            {quote.status}
          </span>
        ) : null}
      </div>

      <h3 className="font-display mt-5 text-[1.55rem] leading-tight tracking-[-0.03em] text-ink sm:text-[1.85rem]">
        {quote.title}
      </h3>
      <p className="mt-2 text-sm text-ink-muted">{quote.platform}</p>

      <p className="mt-6 font-display text-3xl tracking-[-0.03em] text-ink sm:text-[2.15rem]">
        {quote.price}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-rule pt-5">
        <div>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Estimated hours
          </dt>
          <dd className="mt-1 tabular text-lg font-medium">{formatHours(quote.hours)}</dd>
        </div>
        <div>
          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
            Estimated days
          </dt>
          <dd className="mt-1 tabular text-lg font-medium">{formatDays(quote.days)}</dd>
        </div>
      </dl>

      <p className="mt-6 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{quote.summary}</p>

      <CtaLink
        href={`#${quote.slug}`}
        className="mt-8 self-start"
        icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
      >
        Explore this option
      </CtaLink>
    </Reveal>
  );
}
