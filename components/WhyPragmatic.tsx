import { Reveal } from "@/components/Reveal";
import { whyPragmatic } from "@/lib/site";

export function WhyPragmatic({ tone = "invert" }: { tone?: "default" | "invert" } = {}) {
  const isDark = tone === "invert";
  const headingColor = isDark ? "text-paper" : "text-ink";
  const sectionClass = isDark ? "invert-section border-t border-ink bg-ink text-paper" : "border-t border-rule";

  return (
    <section
      id="why-pragmatic"
      aria-labelledby="why-heading"
      className={sectionClass}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-mist">
            Why Pragmatic
          </p>
          <h2
            id="why-heading"
            className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] sm:text-4xl"
          >
            {whyPragmatic.heading}
          </h2>
        </Reveal>

        <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-paper/75 sm:mt-10 sm:text-lg">
          {whyPragmatic.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 40)} delay={index * 60}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>

        <ol className="mt-14 divide-y divide-white/10 border-t border-white/10">
          {whyPragmatic.points.map((point, index) => (
            <Reveal
              as="li"
              key={point.title}
              delay={index * 60}
              className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-10"
            >
              <span className="font-display text-2xl text-sage-mist/90">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={`text-lg font-medium tracking-tight ${headingColor}`}>{point.title}</h3>
                <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-paper/70">
                  {point.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 border-t border-white/10 pt-14 sm:mt-20 sm:pt-16">
          <Reveal>
            <h3
              id="relevant-experience-heading"
              className="font-display max-w-2xl text-[1.45rem] tracking-[-0.03em] sm:text-3xl"
            >
              {whyPragmatic.relevantExperience.heading}
            </h3>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-paper/75 sm:text-lg">
              {whyPragmatic.relevantExperience.lede}
            </p>
          </Reveal>

          <ul className="mt-12 divide-y divide-white/10 border-t border-white/10">
            {whyPragmatic.relevantExperience.cases.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 80} className="print-keep py-10">
                <h4 className={`font-display text-[1.35rem] tracking-[-0.03em] ${headingColor} sm:text-2xl`}>
                  {item.title}
                </h4>
                <div className="mt-5 max-w-3xl space-y-4 text-[0.98rem] leading-relaxed text-paper/70 sm:text-base">
                  {item.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
