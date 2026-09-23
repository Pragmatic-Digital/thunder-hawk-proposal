import { Reveal } from "@/components/Reveal";
import { ScrollableTable } from "@/components/ScrollableTable";
import { ongoingCosts } from "@/lib/site";

export function OngoingCosts() {
  const { recommendedSupport, retainer, platformDependency } = ongoingCosts;

  return (
    <section
      id="ongoing-costs"
      aria-labelledby="ongoing-heading"
      className="border-t border-rule"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {ongoingCosts.kicker}
          </p>
          <h2
            id="ongoing-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {ongoingCosts.heading}
          </h2>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:mt-10 sm:text-lg">
          {ongoingCosts.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 60}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {recommendedSupport.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {recommendedSupport.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {retainer.heading}
            </h3>
          </Reveal>

          <Reveal delay={60} className="mt-10">
            <h4 className="text-lg font-medium tracking-tight text-ink">{retainer.current.heading}</h4>
            <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
              {retainer.current.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={80} className="mt-8">
            <ScrollableTable label={retainer.current.tableLabel}>
              <table className="estimate-table">
                <thead>
                  <tr>
                    <th scope="col">Area</th>
                    <th scope="col">Monthly allowance</th>
                  </tr>
                </thead>
                <tbody>
                  {retainer.current.rows.map((row) => (
                    <tr key={row.area}>
                      <th scope="row">{row.area}</th>
                      <td className="is-numeric">{row.allowance}</td>
                    </tr>
                  ))}
                  <tr className="is-total">
                    <th scope="row">{retainer.current.total.area}</th>
                    <td className="is-numeric">{retainer.current.total.allowance}</td>
                  </tr>
                </tbody>
              </table>
            </ScrollableTable>
            <p className="mt-5 max-w-3xl text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
              {retainer.current.rateNote}
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <h4 className="text-lg font-medium tracking-tight text-ink">{retainer.vendure.heading}</h4>
            <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
              {retainer.vendure.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="mt-8">
            <ScrollableTable label={retainer.vendure.tableLabel}>
              <table className="estimate-table">
                <thead>
                  <tr>
                    {retainer.vendure.columns.map((column) => (
                      <th key={column} scope="col">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {retainer.vendure.rows.map((row) => (
                    <tr key={row.area}>
                      <th scope="row">{row.area}</th>
                      <td className="is-numeric">{row.current}</td>
                      <td className="is-numeric">{row.proposed}</td>
                    </tr>
                  ))}
                  {retainer.vendure.totals.map((row, index) => (
                    <tr key={row.area} className={index === 0 ? "is-total" : "is-grand-total"}>
                      <th scope="row">{row.area}</th>
                      <td className="is-numeric">{row.current}</td>
                      <td className="is-numeric">{row.proposed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ScrollableTable>
          </Reveal>

          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {retainer.vendure.closing.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={140 + index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {platformDependency.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {platformDependency.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 divide-y divide-rule border-y border-rule">
            {platformDependency.platforms.map((platform, index) => (
              <Reveal key={platform.title} delay={index * 60} className="print-keep py-8">
                <h4 className="text-lg font-medium tracking-tight text-ink">{platform.title}</h4>
                <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
                  {platform.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80} className="mt-14">
            <h4 className="text-lg font-medium tracking-tight text-ink">
              {platformDependency.implications.heading}
            </h4>
            <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
              {platformDependency.implications.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-14">
            <h4 className="text-lg font-medium tracking-tight text-ink">
              {platformDependency.licensing.heading}
            </h4>
            <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
              {platformDependency.licensing.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
