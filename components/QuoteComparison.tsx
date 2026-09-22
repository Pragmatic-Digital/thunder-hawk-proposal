import { Reveal } from "@/components/Reveal";
import { ScrollableTable } from "@/components/ScrollableTable";
import { cn, formatDays, formatHours } from "@/lib/cn";
import { getRebuildQuotes, type QuoteMeta } from "@/lib/types";

const comparisonRows = [
  { key: "platform", label: "Platform" },
  { key: "price", label: "Total cost" },
  { key: "hours", label: "Hours" },
  { key: "days", label: "Days" },
  { key: "architecture", label: "Architecture approach" },
  { key: "search", label: "Search" },
  { key: "flexibility", label: "Flexibility" },
  { key: "nativeB2B", label: "Native B2B capability" },
  { key: "bespokeWorkflow", label: "Bespoke workflow capability" },
  { key: "ongoingDependency", label: "Ongoing platform dependency" },
] as const;

function cellValue(
  quote: QuoteMeta & { comparison?: Record<string, string> },
  key: (typeof comparisonRows)[number]["key"],
) {
  if (key === "platform") {
    return quote.platform;
  }

  if (key === "price") {
    return quote.price;
  }

  if (key === "hours") {
    return formatHours(quote.hours);
  }

  if (key === "days") {
    return formatDays(quote.days);
  }

  return quote.comparison?.[key] ?? "—";
}

export function QuoteComparison({ quotes }: { quotes: QuoteMeta[] }) {
  const rebuildQuotes = getRebuildQuotes(quotes);

  return (
    <section id="comparison" aria-labelledby="comparison-heading" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            Rebuild comparison
          </p>
          <h3
            id="comparison-heading"
            className="font-display mt-3 max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl"
          >
            Vendure Core and Shopify Plus
          </h3>
        </Reveal>

        <Reveal delay={80}>
          <blockquote className="print-keep mt-10 max-w-3xl border-l border-sage pl-5 sm:pl-7">
            <p className="font-display text-[1.45rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.85rem]">
              Shopify Plus reduces the amount of platform functionality we need to build from scratch. Vendure Core provides greater freedom to model the platform around Verona&apos;s existing business processes.
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={140} className="mt-12">
          <ScrollableTable label="Quote comparison">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Criterion</span>
                  </th>
                  {rebuildQuotes.map((quote) => (
                    <th
                      key={quote.slug}
                      scope="col"
                      className={cn(quote.recommended && "is-recommended")}
                    >
                      <span className="block">{quote.shortTitle}</span>
                      {quote.recommended ? (
                        <span className="mt-1 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sage-deep">
                          {quote.status}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.key}>
                    <th scope="row">{row.label}</th>
                    {rebuildQuotes.map((quote) => {
                      const value = cellValue(quote, row.key);
                      const numeric = row.key === "hours" || row.key === "days" || row.key === "price";
                      return (
                        <td key={`${quote.slug}-${row.key}`} className={numeric ? "tabular" : undefined}>
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollableTable>
        </Reveal>
      </div>
    </section>
  );
}
