import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  primary:
    "bg-sage-deep text-paper hover:bg-ink",
  secondary:
    "border border-rule bg-paper text-ink hover:border-sage hover:bg-page-deep",
} as const;

function ctaClass(variant: keyof typeof styles, className?: string) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
    styles[variant],
    className,
  );
}

export function CtaLink({
  href,
  children,
  icon,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
}) {
  return (
    <a href={href} className={ctaClass(variant, className)}>
      {children}
      {icon}
    </a>
  );
}

export function CtaButton({
  children,
  icon,
  variant = "primary",
  className,
  ...props
}: {
  children: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof styles;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={ctaClass(variant, className)} {...props}>
      {children}
      {icon}
    </button>
  );
}
