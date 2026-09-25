import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section id="overview" aria-labelledby="proposal-title" className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-6 top-10 hidden select-none font-display text-[9rem] leading-none text-ink/[0.035] sm:block lg:text-[12rem]">
        {site.heroBackgroundText}
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            Overview
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1
            id="proposal-title"
            className="font-display mt-6 max-w-4xl text-[2.15rem] leading-[1.08] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[4.6rem]"
          >
            {site.heroHeading}
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <blockquote className="print-keep mt-10 max-w-3xl border-l border-sage pl-5 sm:pl-7">
            <p className="font-display text-[1.45rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.85rem]">
              {site.recommendation}
            </p>
          </blockquote>
        </Reveal>

        <div className="mt-10 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:mt-12 sm:text-lg">
          {site.overviewParagraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={180 + index * 60}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360}>
          <p className="mt-8 text-sm text-ink-muted">
            <a href="#vendure" className="underline decoration-rule-strong underline-offset-4">
              Read the recommended scope
            </a>
          </p>
        </Reveal>

        <Reveal delay={400}>
          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-rule pt-8 sm:grid-cols-3">
            <div>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Prepared by
              </dt>
              <dd className="mt-1.5 text-sm font-medium">{site.agency}</dd>
            </div>
            <div>
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Date
              </dt>
              <dd className="mt-1.5 text-sm font-medium">{site.prepared}</dd>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                Subject
              </dt>
              <dd className="mt-1.5 text-sm font-medium">Audit And Opportunities</dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
