"use client";

import { CtaButton } from "@/components/CtaButton";
import { ArrowRight } from "lucide-react";
import { useFormStatus } from "react-dom";

const errorCopy: Record<string, string> = {
  password: "That password is not correct.",
  locked: "Too many attempts. Please wait a few minutes and try again.",
  missing: "Enter the access password to continue.",
  config:
    process.env.NODE_ENV === "production"
      ? "Access is unavailable."
      : "Set SITE_PASSWORD and SITE_AUTH_SECRET in .env.local.",
};

export function LoginForm({ next, error }: { next: string; error?: string }) {
  const message = error ? (errorCopy[error] ?? errorCopy.password) : null;

  return (
    <form action="/api/login" method="post" className="mt-10">
      <input type="hidden" name="next" value={next} />

      <label htmlFor="password" className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        Access password
      </label>
      <PasswordField invalid={Boolean(message)} />

      {message ? (
        <p id="login-error" className="mt-3 text-sm text-[#7a3e32]" role="alert">
          {message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function PasswordField({ invalid }: { invalid: boolean }) {
  const { pending } = useFormStatus();

  return (
    <input
      id="password"
      name="password"
      type="password"
      autoComplete="current-password"
      autoFocus
      required
      disabled={pending}
      aria-invalid={invalid || undefined}
      aria-describedby={invalid ? "login-error" : undefined}
      className="mt-2 w-full rounded-xl border border-rule bg-paper px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/70 disabled:opacity-60"
      placeholder="Enter the password you were given"
    />
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <CtaButton
      type="submit"
      className="mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      disabled={pending}
      icon={<ArrowRight className="h-4 w-4" />}
    >
      {pending ? "Checking" : "View proposal"}
    </CtaButton>
  );
}
