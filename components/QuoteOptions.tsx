import { CtaLink } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import { optionsAtAGlance } from "@/lib/site";
import type { QuoteMeta } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export function QuoteOptions({ quotes }: { quotes: QuoteMeta[] }) {
  const items = optionsAtAGlance.items.map((item) => ({
    ...item,
    href: quotes.some((quote) => quote.slug === item.slug) ? `#${item.slug}` : "#scope-and-pricing",
  }));

  return (
    <section id="options" aria-labelledby="options-heading" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            Options
          </p>
          <h2
            id="options-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {optionsAtAGlance.heading}
          </h2>
        </Reveal>

        <ul
          className={cn(
            "mt-12 grid gap-6",
            items.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
          )}
        >
          {items.map((item, index) => (
            <Reveal
              as="li"
              key={item.slug}
              delay={index * 90}
              className={cn(
                "print-keep flex h-full flex-col rounded-2xl border bg-paper p-6 shadow-quiet sm:p-8",
                item.recommended ? "border-sage" : "border-rule",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Option {String(index + 1).padStart(2, "0")}
                </p>
                {item.recommended ? (
                  <span className="rounded-full bg-sage-deep px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-paper">
                    Recommended
                  </span>
                ) : null}
              </div>

              <h3 className="font-display mt-5 text-[1.45rem] leading-tight tracking-[-0.03em] text-ink sm:text-[1.65rem]">
                {item.title}
              </h3>
              <p className="mt-6 font-display text-3xl tracking-[-0.03em] text-ink sm:text-[2.15rem]">
                {item.price}
              </p>
              <p className="mt-6 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{item.body}</p>
              <CtaLink
                href={item.href}
                className="mt-8 self-start"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Explore this option
              </CtaLink>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={280}>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-muted sm:mt-12">
            {optionsAtAGlance.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
