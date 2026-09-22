"use client";

import { ActiveSectionProvider } from "@/components/ActiveSection";
import { ProposalHeader } from "@/components/ProposalHeader";
import { QuoteSwitcher } from "@/components/QuoteSwitcher";
import type { QuoteMeta } from "@/lib/types";
import type { ReactNode } from "react";

export function ProposalShell({
  quotes,
  sectionIds,
  children,
}: {
  quotes: QuoteMeta[];
  sectionIds: string[];
  children: ReactNode;
}) {
  return (
    <ActiveSectionProvider sectionIds={sectionIds}>
      <ProposalHeader quotes={quotes} />
      <QuoteSwitcher quotes={quotes} />
      {children}
    </ActiveSectionProvider>
  );
}
