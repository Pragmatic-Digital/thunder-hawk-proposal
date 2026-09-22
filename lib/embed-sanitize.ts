const ALLOWED_PROTOCOLS = new Set(["https:"]);

export function assertSafeEmbedSrc(src: string): string {
  let url: URL;
  try {
    url = new URL(src);
  } catch {
    throw new Error(`<Embed src="${src}"> is not a valid absolute URL. Only https:// URLs are permitted.`);
  }

  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    throw new Error(
      `<Embed src="${src}"> uses protocol "${url.protocol}". Only https: is permitted.`,
    );
  }

  return url.toString();
}
