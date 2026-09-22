const encoder = new TextEncoder();

export const ACCESS_COOKIE = "site_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

export function getAuthSecret(): string | null {
  const secret = process.env.SITE_AUTH_SECRET?.trim();
  if (!secret || secret.length < 16) {
    return null;
  }
  return secret;
}

export function accessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ACCESS_MAX_AGE,
  };
}

export function safeRedirectPath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return "/";
  }

  const path = value.split("#")[0] ?? "/";
  if (path === "/login" || path.startsWith("/login?")) {
    return "/";
  }

  return path || "/";
}

export async function createAccessToken(secret: string, maxAge = ACCESS_MAX_AGE): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + maxAge;
  const payload = `v1.${exp}`;
  const signature = bytesToBase64Url(await hmac(payload, secret));
  return `${payload}.${signature}`;
}

export async function isValidAccessToken(token: string | undefined | null): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = getAuthSecret();
  if (!secret) {
    return false;
  }

  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") {
    return false;
  }

  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000) - 60) {
    return false;
  }

  const payload = `v1.${parts[1]}`;
  const expected = bytesToBase64Url(await hmac(payload, secret));
  return timingSafeEqualBytes(base64UrlToBytes(parts[2]), base64UrlToBytes(expected));
}

export async function passwordsMatch(submitted: string, expected: string, secret: string): Promise<boolean> {
  const [left, right] = await Promise.all([hmac(submitted, secret), hmac(expected, secret)]);
  return timingSafeEqualBytes(left, right);
}

async function hmac(value: string, secret: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return new Uint8Array(signature);
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string | undefined): Uint8Array {
  if (!value) {
    return new Uint8Array();
  }

  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  } catch {
    return new Uint8Array();
  }
}

function timingSafeEqualBytes(left: Uint8Array, right: Uint8Array): boolean {
  if (left.length === 0 || left.length !== right.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < left.length; i += 1) {
    mismatch |= left[i] ^ right[i];
  }
  return mismatch === 0;
}
