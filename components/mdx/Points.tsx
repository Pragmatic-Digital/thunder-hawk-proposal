import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

export type PointsItem = {
  title: string;
  body: string;
};

export function Points({
  items,
  variant = "light",
}: {
  items: PointsItem[];
  variant?: "light" | "invert";
}) {
  return (
    <ol className="mt-8 space-y-0 sm:mt-10">
      {items.map((item, index) => (
        <Reveal
          key={item.title.slice(0, 40)}
          delay={index * 60}
          as="li"
          className="print-keep border-b border-rule last:border-b-0"
        >
          <div
            className={cn(
              "grid gap-3 px-0 py-6 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-8",
              variant === "invert" && "text-ink-soft",
            )}
          >
            <div className="font-semibold text-sage-deep">{index + 1}</div>
            <div>
              <h4
                className={cn(
                  "font-display text-base font-semibold tracking-tight sm:text-lg",
                  variant === "invert" ? "text-paper" : "text-ink",
                )}
              >
                {item.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed sm:text-base">{item.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
