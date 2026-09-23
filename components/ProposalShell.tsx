"use client";

import { ActiveSectionProvider } from "@/components/ActiveSection";
import { ProposalHeader } from "@/components/ProposalHeader";
import { QuoteSwitcher } from "@/components/QuoteSwitcher";
import type { Quote } from "@/lib/content-schema";
import type { NavItem } from "@/lib/nav";
import type { ReactNode } from "react";

export function ProposalShell({
  quotes,
  navItems,
  sectionIds,
  children,
}: {
  quotes: Quote[];
  navItems: NavItem[];
  sectionIds: string[];
  children: ReactNode;
}) {
  return (
    <ActiveSectionProvider sectionIds={sectionIds}>
      <ProposalHeader navItems={navItems} />
      <QuoteSwitcher quotes={quotes} />
      {children}
    </ActiveSectionProvider>
  );
}
