const EMBED_URLS: Record<string, (id: string) => string> = {
  youtube: (id) => `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
  vimeo: (id) => `https://player.vimeo.com/video/${encodeURIComponent(id)}`,
  loom: (id) => `https://www.loom.com/embed/${encodeURIComponent(id)}`,
};

export function Video({
  provider,
  id,
  title,
}: {
  provider: "youtube" | "vimeo" | "loom";
  id: string;
  title: string;
}) {
  const embedUrl = EMBED_URLS[provider];
  if (!embedUrl) {
    throw new Error(`<Video> provider "${provider}" is not supported.`);
  }

  return (
    <div className="my-8 overflow-hidden rounded-lg bg-page-deep sm:my-10">
      <div className="relative h-0 w-full pb-[56.25%]">
        <iframe
          src={embedUrl(id)}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="fullscreen"
          loading="lazy"
        />
      </div>
    </div>
  );
}
