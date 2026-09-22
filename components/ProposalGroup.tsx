import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function ProposalGroup({
  id,
  kicker,
  heading,
  lede,
  tone = "default",
  children,
}: {
  id?: string;
  kicker: string;
  heading: string;
  lede?: string;
  tone?: "default" | "retool";
  children: ReactNode;
}) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(tone === "retool" && "retool-section bg-page-deep/70")}
    >
      <div className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-2 sm:px-8 sm:pt-24 sm:pb-4">
          <Reveal>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
              {kicker}
            </p>
            <h2
              id={headingId}
              className="font-display mt-3 max-w-2xl text-[1.75rem] tracking-[-0.03em] text-ink sm:text-4xl"
            >
              {heading}
            </h2>
            {lede ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
                {lede}
              </p>
            ) : null}
          </Reveal>
        </div>
      </div>
      {children}
    </section>
  );
}
