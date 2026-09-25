import Image from "next/image";

export function Figure({
  src,
  alt,
  title,
  aspect = "16:9",
}: {
  src: string;
  alt: string;
  title?: string;
  aspect?: "16:9" | "4:3" | "1:1" | "2:1";
}) {
  const aspectRatios = {
    "16:9": "aspect-video",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
    "2:1": "aspect-[2/1]",
  };

  return (
    <figure className="my-8 sm:my-10">
      <div className={`relative w-full overflow-hidden rounded-lg bg-page-deep ${aspectRatios[aspect]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 42rem) 100vw, 42rem"
        />
      </div>
      {title && (
        <figcaption className="mt-3 text-center text-sm text-ink-muted">{title}</figcaption>
      )}
    </figure>
  );
}
