import { QuoteBody } from "@/components/QuoteBody";
import { Reveal } from "@/components/Reveal";
import { cn, formatDays, formatHours } from "@/lib/cn";
import { extractMarkdownHeadings } from "@/lib/headings";
import type { Quote } from "@/lib/types";

export function QuoteSection({
  quote,
  index,
  className,
  compactTop = false,
}: {
  quote: Quote;
  index?: number;
  className?: string;
  compactTop?: boolean;
}) {
  const headings = extractMarkdownHeadings(quote.content, quote.slug);
  const isRetool = quote.proposalType === "retool";
  const optionLabel =
    index === undefined
      ? null
      : `Option ${String(index + 1).padStart(2, "0")}${quote.recommended ? ` · ${quote.status}` : ""}`;
  const eyebrow = isRetool ? "Improvement programme" : optionLabel;

  return (
    <section
      id={quote.slug}
      aria-labelledby={`${quote.slug}-heading`}
      className={cn("border-t border-rule", className)}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24",
          compactTop ? "pt-8 sm:pt-10" : "pt-16 sm:pt-24",
        )}
      >
        <Reveal>
          <div className="flex flex-col gap-8 border-b border-rule pb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6 sm:pb-10">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
                  {eyebrow}
                </p>
              ) : null}
              <h2
                id={`${quote.slug}-heading`}
                className="font-display mt-3 text-[1.85rem] tracking-[-0.03em] text-ink sm:text-5xl"
              >
                {quote.title}
              </h2>
              {isRetool ? (
                <p className="mt-3 max-w-2xl text-ink-muted">{quote.summary}</p>
              ) : (
                <p className="mt-3 text-ink-muted">{quote.platform}</p>
              )}
            </div>

            <dl className="grid w-full grid-cols-3 gap-3 sm:w-auto sm:gap-6 sm:text-right">
              <div>
                <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ink-muted sm:text-[0.62rem] sm:tracking-[0.16em]">
                  {isRetool ? "Indicative investment" : "Investment"}
                </dt>
                <dd className="mt-1 text-[0.78rem] font-medium leading-snug sm:text-base">
                  {quote.price}
                </dd>
              </div>
              <div>
                <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ink-muted sm:text-[0.62rem] sm:tracking-[0.16em]">
                  Hours
                </dt>
                <dd className="mt-1 tabular text-[0.78rem] font-medium sm:text-base">
                  {formatHours(quote.hours)}
                </dd>
              </div>
              <div>
                <dt className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-ink-muted sm:text-[0.62rem] sm:tracking-[0.16em]">
                 Development Days
                </dt>
                <dd className="mt-1 tabular text-[0.78rem] font-medium sm:text-base">
                  {formatDays(quote.days)}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          <QuoteBody
            slug={quote.slug}
            content={quote.content}
            headings={headings}
            startExpanded={isRetool}
          />
        </Reveal>
      </div>
    </section>
  );
}
