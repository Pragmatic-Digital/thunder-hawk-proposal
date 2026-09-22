"use client";

import { useActiveSection } from "@/components/ActiveSection";
import { cn } from "@/lib/cn";
import config from "@/proposal.config";
import type { ResolvedNavItem } from "@/lib/nav";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export function ProposalHeader({ quotes, navItems }: { quotes: any[]; navItems: ResolvedNavItem[] }) {
  const { activeId } = useActiveSection();
  const items = navItems;
  const itemKey = items.map((item) => item.id).join("|");
  const headerRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLUListElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) {
      return;
    }

    const apply = () => {
      document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(header);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, [compact]);

  useLayoutEffect(() => {
    const list = measureRef.current;
    if (!list) {
      return;
    }

    const check = () => {
      setCompact(list.scrollWidth > list.clientWidth + 8);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(list);
    window.addEventListener("resize", check);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [itemKey]);

  useEffect(() => {
    if (!compact) {
      setOpen(false);
    }
  }, [compact]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const current =
    items.find((item) => item.matchIds.includes(activeId) || item.id === activeId) ?? items[0];

  return (
    <>
      <header
        ref={headerRef}
        className="no-print sticky top-0 z-40 border-b border-rule/80 bg-page/92 backdrop-blur-[3px]"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-3.5">
          <a href="#overview" className="flex min-w-0 items-center gap-2.5 text-ink sm:gap-3">
            <Image
              src="/pragmatic-logo.png"
              alt=""
              width={56}
              height={56}
              className="h-7 w-7 shrink-0 rounded-full object-cover"
              style={{ filter: "invert(1)" }}
              priority
            />
            <span className="truncate text-[0.88rem] font-semibold tracking-tight sm:text-[0.95rem]">
              {config.site.agency}
            </span>
          </a>

          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="min-w-0 text-right">
              <p className="truncate text-[0.8rem] font-medium tracking-tight sm:text-[0.95rem]">
                {config.site.client}
              </p>
              <p className="truncate text-[0.58rem] uppercase tracking-[0.12em] text-ink-muted sm:text-[0.68rem] sm:tracking-[0.16em]">
                {compact ? current?.label : config.site.proposalLabel}
              </p>
            </div>

            {compact ? (
              <button
                type="button"
                className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-rule bg-paper text-ink transition-colors hover:border-sage hover:bg-page-deep"
                aria-expanded={open}
                aria-controls="proposal-menu"
                aria-label={open ? "Close proposal menu" : "Open proposal menu"}
                onClick={() => setOpen((value) => !value)}
              >
                {open ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            ) : null}
          </div>
        </div>

        <ul
          ref={measureRef}
          className="pointer-events-none invisible absolute left-1/2 top-0 z-[-1] flex w-full max-w-6xl -translate-x-1/2 gap-1 overflow-hidden px-3 sm:px-6"
          aria-hidden="true"
        >
          {items.map((item) => (
            <li key={item.id} className="shrink-0">
              <span className="block px-3 py-1.5 text-[0.78rem] tracking-wide">{item.label}</span>
            </li>
          ))}
        </ul>

        {compact ? null : (
          <nav aria-label="Proposal sections" className="border-t border-rule/70">
            <ul className="nav-scroll mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-3 py-2 sm:px-6">
              {items.map((item) => (
                <li key={item.id} className="flex shrink-0 items-center">
                  <NavAnchor item={item} activeId={activeId} className="rounded-full px-3 py-1.5 text-[0.78rem]" />
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {compact && open ? (
        <div
          id="proposal-menu"
          className="no-print fixed inset-x-0 bottom-0 z-50 overflow-y-auto border-t border-rule bg-page"
          style={{ top: "var(--header-height, 4.5rem)" }}
          onClick={() => setOpen(false)}
        >
          <nav
            aria-label="Proposal sections"
            className="mx-auto max-w-6xl px-4 py-5 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="px-3 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Jump to
            </p>
            <ul className="mt-3 space-y-1">
              {items.map((item) => (
                <li key={item.id}>
                  <NavAnchor
                    item={item}
                    activeId={activeId}
                    className="flex min-h-12 items-center rounded-xl px-3 py-3 text-[1.05rem]"
                    onNavigate={() => setOpen(false)}
                  />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </>
  );
}

function NavAnchor({
  item,
  activeId,
  className,
  onNavigate,
}: {
  item: ResolvedNavItem;
  activeId: string;
  className?: string;
  onNavigate?: () => void;
}) {
  const groupActive = item.matchIds.includes(activeId) || item.id === activeId;

  return (
    <a
      href={`#${item.id}`}
      aria-current={groupActive ? "location" : undefined}
      onClick={onNavigate}
      className={cn(
        "tracking-wide transition-colors",
        groupActive ? "bg-sage-deep text-paper" : "text-ink-muted hover:bg-page-deep hover:text-ink",
        className,
      )}
    >
      {item.label}
    </a>
  );
}
