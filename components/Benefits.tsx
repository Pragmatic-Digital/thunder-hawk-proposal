import { Reveal } from "@/components/Reveal";
import { benefits } from "@/lib/site";

export function Benefits() {
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {benefits.kicker}
          </p>
          <h2
            id="benefits-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {benefits.heading}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-lg">
            {benefits.lede}
          </p>
        </Reveal>

        <ol className="mt-14 divide-y divide-rule border-y border-rule">
          {benefits.points.map((point, index) => (
            <Reveal
              as="li"
              key={point.title}
              delay={index * 60}
              className="print-keep grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-10"
            >
              <span className="font-display text-2xl text-sage-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium tracking-tight text-ink">{point.title}</h3>
                <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {benefits.measuringSuccess.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {benefits.measuringSuccess.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={80 + index * 60}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
