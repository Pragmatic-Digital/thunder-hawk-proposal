import { LoginForm } from "@/app/login/LoginForm";
import { ACCESS_COOKIE, isValidAccessToken, safeRedirectPath } from "@/lib/auth";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Access | ${site.client} proposal`,
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const store = await cookies();
  if (await isValidAccessToken(store.get(ACCESS_COOKIE)?.value)) {
    redirect("/");
  }

  const params = await searchParams;
  const next = safeRedirectPath(params.next);
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-rule/80 bg-page/92">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
          <div className="flex min-w-0 items-center gap-2.5 text-ink sm:gap-3">
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
              {site.agency}
            </span>
          </div>
          <div className="min-w-0 text-right">
            <p className="truncate text-[0.8rem] font-medium tracking-tight sm:text-[0.95rem]">{site.client}</p>
            <p className="truncate text-[0.58rem] uppercase tracking-[0.12em] text-ink-muted sm:text-[0.68rem] sm:tracking-[0.16em]">
              {site.proposalLabel}
            </p>
          </div>
        </div>
      </header>

      <main className="relative flex flex-1 overflow-hidden">
        <div className="pointer-events-none absolute -right-6 top-10 hidden select-none font-display text-[9rem] leading-none text-ink/[0.035] sm:block lg:text-[12rem]">
          {site.client}
        </div>

        <div className="mx-auto flex w-full max-w-6xl items-center px-5 py-16 sm:px-8 sm:py-24">
          <div className="w-full max-w-lg rounded-2xl border border-rule bg-paper p-6 shadow-quiet sm:p-10">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-sage-deep">
              Prepared for {site.client}
            </p>
            <h1 className="font-display mt-5 text-[2rem] leading-[1.08] tracking-[-0.035em] text-ink sm:text-[2.6rem]">
              This proposal is confidential
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Enter the access password to view the {site.proposalLabel} from {site.agency}.
            </p>
            <LoginForm next={next} error={error} />
          </div>
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p></p>
          <p>Confidential. For the intended recipient only.</p>
        </div>
      </footer>
    </div>
  );
}
