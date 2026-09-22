import { cn } from "@/lib/cn";

export function Callout({
  variant = "info",
  children,
}: {
  variant?: "info" | "warning" | "success";
  children: React.ReactNode;
}) {
  const variantClasses = {
    info: "border-sage bg-sage-mist/50 text-ink",
    warning: "border-orange-400 bg-orange-50 text-ink",
    success: "border-emerald-400 bg-emerald-50 text-ink",
  };

  return (
    <div
      className={cn(
        "my-6 border-l-4 px-4 py-3 text-sm sm:my-8 sm:px-6 sm:py-4 sm:text-base",
        variantClasses[variant],
      )}
    >
      {children}
    </div>
  );
}
