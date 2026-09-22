import { site } from "@/lib/site";

export function ProposalFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="text-[0.95rem] font-semibold tracking-tight">{site.agency}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">{site.address}</p>
          <p className="mt-2 text-sm">
            <a className="underline decoration-rule-strong underline-offset-4" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span className="text-ink-muted"> · </span>
            <a className="underline decoration-rule-strong underline-offset-4" href="tel:+441135349949">
              {site.phone}
            </a>
          </p>
        </div>

        <div className="text-sm text-ink-muted sm:text-right">
          <p>
            Prepared for {site.client}
            <span className="mx-2 text-rule-strong">·</span>
            {site.prepared}
          </p>
          <p className="mt-1">Confidential. For the intended recipient only.</p>
        </div>
      </div>
    </footer>
  );
}
