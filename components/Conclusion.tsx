import { Reveal } from "@/components/Reveal";
import { nextSteps } from "@/lib/site";

export function Conclusion() {
  const { confirming, growth } = nextSteps;

  return (
    <section
      id="next-steps"
      aria-labelledby="next-steps-heading"
      className="border-t border-rule"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
            {nextSteps.kicker}
          </p>
          <h2
            id="next-steps-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
          >
            {nextSteps.heading}
          </h2>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:mt-10 sm:text-lg">
          {nextSteps.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 60}>
              {index === 0 ? (
                <blockquote className="print-keep border-l border-sage pl-5 sm:pl-7">
                  <p className="font-display text-[1.45rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.85rem]">
                    {paragraph}
                  </p>
                </blockquote>
              ) : (
                <p>{paragraph}</p>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {confirming.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {confirming.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
          <ol className="mt-10 divide-y divide-rule border-y border-rule">
            {confirming.points.map((point, index) => (
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
            {confirming.closing.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 40)}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-rule pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3 className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl">
              {growth.heading}
            </h3>
          </Reveal>
          <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {growth.paragraphs.map((paragraph, index) => (
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
