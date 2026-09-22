type Bucket = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;
const buckets = new Map<string, Bucket>();

export function getLoginLock(key: string): { locked: boolean; retryAfterSeconds: number } {
  prune(key);
  const bucket = buckets.get(key);
  if (!bucket || bucket.count < MAX_ATTEMPTS) {
    return { locked: false, retryAfterSeconds: 0 };
  }

  return {
    locked: true,
    retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - Date.now()) / 1000)),
  };
}

export function recordLoginFailure(key: string) {
  prune(key);
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }

  existing.count += 1;
}

export function clearLoginFailures(key: string) {
  buckets.delete(key);
}

function prune(key: string) {
  const bucket = buckets.get(key);
  if (bucket && bucket.resetAt <= Date.now()) {
    buckets.delete(key);
  }
}
