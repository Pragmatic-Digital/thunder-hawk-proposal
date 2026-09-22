"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ScrollableTable({
  children,
  className,
  compact = false,
  label = "Proposal table",
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  label?: string;
}) {
  const paneRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [moreRight, setMoreRight] = useState(false);

  useEffect(() => {
    const pane = paneRef.current;
    if (!pane) {
      return;
    }

    const update = () => {
      const maxScroll = pane.scrollWidth - pane.clientWidth;
      const hasOverflow = maxScroll > 8;
      setOverflowing(hasOverflow);
      setMoreRight(hasOverflow && pane.scrollLeft < maxScroll - 8);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(pane);
    const inner = pane.firstElementChild;
    if (inner) {
      observer.observe(inner);
    }

    pane.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      pane.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [children]);

  return (
    <div
      className={cn(
        "table-scroll-frame",
        compact && "is-compact",
        overflowing && "is-overflowing",
        moreRight && "has-more-right",
        className,
      )}
    >
      {moreRight ? (
        <p className="table-scroll-hint no-print">
          <span>Scroll for more</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </p>
      ) : null}
      <div
        ref={paneRef}
        className="table-scroll-pane"
        role="region"
        aria-label={moreRight ? `${label}, scroll right for more columns` : label}
        tabIndex={overflowing ? 0 : undefined}
      >
        {children}
      </div>
    </div>
  );
}
