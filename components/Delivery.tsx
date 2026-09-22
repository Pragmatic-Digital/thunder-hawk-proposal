import { Reveal } from "@/components/Reveal";
import { delivery } from "@/lib/site";

export function Delivery() {
  const { workingTogether, programme, protectingTrading } = delivery;

  return (
    <section
      id="delivery"
      aria-labelledby="delivery-heading"
      className="border-t border-rule"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {delivery.kicker}
          </p>
          <h2
            id="delivery-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {delivery.heading}
          </h2>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:mt-10 sm:text-lg">
          {delivery.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 60}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {workingTogether.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {workingTogether.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {programme.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {programme.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <ol className="mt-10 divide-y divide-rule border-y border-rule">
            {programme.stages.map((stage, index) => (
              <Reveal
                as="li"
                key={stage.title}
                delay={index * 50}
                className="print-keep grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-10"
              >
                <span className="font-display text-2xl text-sage-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-lg font-medium tracking-tight text-ink">{stage.title}</h4>
                  <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
                    {stage.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {programme.closing.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={80 + index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {protectingTrading.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {protectingTrading.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
