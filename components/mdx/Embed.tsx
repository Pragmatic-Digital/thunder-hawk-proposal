"use client";

import { assertSafeEmbedSrc } from "@/lib/embed-sanitize";

export function Embed({
  src,
  title,
  aspect = "16:9",
}: {
  src: string;
  title: string;
  aspect?: "16:9" | "4:3" | "auto";
}) {
  const safeSrc = assertSafeEmbedSrc(src);

  const aspectRatio =
    aspect === "4:3"
      ? "pb-[75%]"
      : aspect === "auto"
        ? undefined
        : "pb-[56.25%]";

  return (
    <div className="my-8 overflow-hidden rounded-lg bg-page-deep sm:my-10">
      {aspectRatio ? (
        <div className={`relative h-0 w-full ${aspectRatio}`}>
          <iframe
            src={safeSrc}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="fullscreen"
            loading="lazy"
          />
        </div>
      ) : (
        <iframe
          src={safeSrc}
          title={title}
          className="h-96 w-full"
          allow="fullscreen"
          loading="lazy"
        />
      )}
    </div>
  );
}
