"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ActiveSectionContextValue = {
  activeId: string;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeId: "overview",
});

function headerOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 110;
}

function spyMarker() {
  const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
  if (Number.isFinite(padding) && padding > 0) {
    return padding + 8;
  }

  return headerOffset() + 40;
}

export function ActiveSectionProvider({
  sectionIds,
  children,
}: {
  sectionIds: string[];
  children: ReactNode;
}) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "overview");
  const key = sectionIds.join("|");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const pickActive = () => {
      const marker = spyMarker();
      let current = sectionIds[0];

      for (const element of elements) {
        if (element.getBoundingClientRect().top <= marker) {
          current = element.id;
        }
      }

      setActiveId(current);
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);

    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, [key, sectionIds]);

  const value = useMemo(() => ({ activeId }), [activeId]);

  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
