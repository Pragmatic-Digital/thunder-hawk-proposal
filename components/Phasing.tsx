import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { Reveal } from "@/components/Reveal";
import { ScrollableTable } from "@/components/ScrollableTable";
import type { MarkdownPage } from "@/lib/pages";
import { phasing } from "@/lib/site";

export function Phasing({ page }: { page: MarkdownPage }) {
  const { whyPhaseOne, benefits, smallerInvestment, allocations } = phasing;

  return (
    <section id="phasing" aria-labelledby="phasing-heading" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {phasing.kicker}
          </p>
          <h2
            id="phasing-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {phasing.heading}
          </h2>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:mt-10 sm:text-lg">
          {phasing.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 60}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {whyPhaseOne.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {whyPhaseOne.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {benefits.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {benefits.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <ol className="mt-10 divide-y divide-rule border-y border-rule">
            {benefits.points.map((point, index) => (
              <Reveal
                as="li"
                key={point}
                delay={index * 40}
                className="print-keep grid gap-4 py-6 sm:grid-cols-[5rem_1fr] sm:gap-10"
              >
                <span className="font-display text-2xl text-sage-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.98rem] leading-relaxed text-ink sm:text-base">{point}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {benefits.closing.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {smallerInvestment.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {smallerInvestment.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {allocations.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {allocations.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80} className="mt-8">
            <ScrollableTable label="Overall rebuild estimates">
              <table className="estimate-table">
                <thead>
                  <tr>
                    <th scope="col">Option</th>
                    <th scope="col">Current budget estimate</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.totals.map((row) => (
                    <tr key={row.platform}>
                      <th scope="row">{row.platform}</th>
                      <td className="is-numeric">{row.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollableTable>
          </Reveal>

          {allocations.options.map((option) => (
            <Reveal key={option.title} delay={60} className="mt-12 print-keep">
              <h4 className="text-lg font-medium tracking-tight text-ink">{option.title}</h4>
              <div className="mt-6">
                <ScrollableTable label={option.tableLabel}>
                  <table className="estimate-table">
                    <thead>
                      <tr>
                        {option.columns.map((column) => (
                          <th key={column} scope="col">
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {option.rows.map((row) => (
                        <tr key={row.phase}>
                          <th scope="row">{row.phase}</th>
                          <td>{row.scope}</td>
                          <td className="is-numeric">{row.hours}</td>
                          <td className="is-numeric">{row.cost}</td>
                        </tr>
                      ))}
                      <tr className="is-grand-total">
                        <th scope="row">{option.total.phase}</th>
                        <td>{option.total.scope}</td>
                        <td className="is-numeric">{option.total.hours}</td>
                        <td className="is-numeric">{option.total.cost}</td>
                      </tr>
                    </tbody>
                  </table>
                </ScrollableTable>
              </div>
            </Reveal>
          ))}

          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {allocations.closing.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {page.content ? (
          <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
            <Reveal delay={80}>
              <MarkdownRenderer content={page.content} idPrefix="phasing" />
            </Reveal>
          </div>
        ) : null}
      </div>
    </section>
  );
}
