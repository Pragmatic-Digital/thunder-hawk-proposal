import { Reveal } from "@/components/Reveal";
import { costSavings } from "@/lib/site";

export function CostSavings() {
  const { reuse, deliveryApproach, commercially } = costSavings;

  return (
    <section
      id="cost-savings"
      aria-labelledby="cost-heading"
      className="border-t border-rule"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h3
            id="cost-heading"
            className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] text-ink sm:text-3xl"
          >
            {costSavings.heading}
          </h3>
        </Reveal>

        <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {costSavings.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 40}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80} className="mt-14">
          <h4 className="text-lg font-medium tracking-tight text-ink">{reuse.heading}</h4>
          <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
            {reuse.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <h4 className="text-lg font-medium tracking-tight text-ink">
            {deliveryApproach.heading}
          </h4>
          <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
            {deliveryApproach.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <h4 className="text-lg font-medium tracking-tight text-ink">{commercially.heading}</h4>
          <div className="mt-4 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-ink-soft sm:text-base">
            {commercially.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
