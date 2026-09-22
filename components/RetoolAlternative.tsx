import { ArrowRight } from "lucide-react";
import { CtaLink } from "@/components/CtaButton";
import { Reveal } from "@/components/Reveal";
import { formatDays, formatHours, investmentSharePercent } from "@/lib/cn";
import { retoolAlternative } from "@/lib/site";
import { RETOOL_SECTION_ID, type QuoteMeta } from "@/lib/types";

function rebuildLabel(quote: QuoteMeta) {
  const platform = quote.platform.split("+")[0]?.trim() || quote.shortTitle;
  return `${platform} rebuild`;
}

export function RetoolAlternative({
  quote,
  rebuildQuotes,
}: {
  quote: QuoteMeta;
  rebuildQuotes: QuoteMeta[];
}) {
  const baseline = rebuildQuotes.find((item) => item.recommended) ?? rebuildQuotes[0];
  const share = baseline ? investmentSharePercent(quote.priceValue, baseline.priceValue) : 0;
  const outcomes = quote.outcomes.length ? quote.outcomes : [...retoolAlternative.outcomesFallback];

  return (
    <section
      id={RETOOL_SECTION_ID}
      aria-labelledby="retool-heading"
      className="retool-section border-t border-rule bg-page-deep/80"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {retoolAlternative.kicker}
          </p>
          <h2
            id="retool-heading"
            className="font-display mt-3 max-w-3xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {retoolAlternative.heading}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {retoolAlternative.lede}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <article className="print-keep mt-10 border-t border-rule-strong/70 pt-10 sm:mt-12 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pt-12">
            <div>
              <h3 className="font-display text-[1.7rem] leading-tight tracking-[-0.03em] text-ink sm:text-[2.15rem]">
                {retoolAlternative.panelTitle}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">{quote.platform}</p>

              <p className="mt-8 font-display text-4xl tracking-[-0.035em] text-ink sm:text-5xl">
                {quote.price}
              </p>
              <p className="mt-3 text-sm text-ink-muted">
                <span className="tabular font-medium text-ink">{formatHours(quote.hours)} hours</span>
                <span className="mx-2 text-rule-strong">·</span>
                <span className="tabular font-medium text-ink">{formatDays(quote.days)} days</span>
              </p>

              <blockquote className="mt-8 max-w-xl border-l border-sage pl-5">
                <p className="font-display text-[1.2rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.35rem]">
                  {retoolAlternative.pullQuote}
                </p>
              </blockquote>

              <CtaLink
                href={`#${quote.slug}`}
                className="mt-8"
                icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                {retoolAlternative.cta}
              </CtaLink>
            </div>

            <div className="mt-12 lg:mt-0">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Where the investment goes
              </p>
              <ul className="mt-5 space-y-3">
                {outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 text-[0.98rem] leading-snug text-ink-soft">
                    <span className="mt-2 h-px w-3 shrink-0 bg-sage" aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-sm leading-relaxed text-ink-muted">
                <span className="mb-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em]">
                  Trade-off
                </span>
                {retoolAlternative.tradeoff}
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 max-w-3xl space-y-4 text-base leading-relaxed text-ink-soft sm:mt-12 sm:text-lg">
            <p>{retoolAlternative.body}</p>
            <p>{retoolAlternative.message}</p>
          </div>
        </Reveal>

        {rebuildQuotes.length ? (
          <Reveal delay={140}>
            <div className="print-keep mt-12 border-t border-rule pt-10">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                {retoolAlternative.costContextLabel}
              </p>

              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-16">
                <div>
                  <p className="text-sm font-medium text-ink">{quote.title}</p>
                  <p className="mt-2 font-display text-3xl tracking-[-0.03em] text-ink sm:text-[2.15rem]">
                    {quote.price}
                  </p>
                  {baseline && share > 0 ? (
                    <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-ink-soft">
                      Approximately {share}% of the investment of the {baseline.shortTitle} rebuild.
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-ink-muted">{retoolAlternative.costContextNote}</p>
                </div>

                <dl className="divide-y divide-rule border-y border-rule">
                  {rebuildQuotes.map((item) => (
                    <div
                      key={item.slug}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <dt className="text-sm text-ink-muted">{rebuildLabel(item)}</dt>
                      <dd className="tabular text-sm font-medium text-ink">{item.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
