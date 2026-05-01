interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitResult {
  limited: boolean;
  remaining: number;
  resetInSeconds: number;
}

const store = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

// Remove expired entries from memory
function cleanupStaleEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;

  lastCleanup = now;
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetTime) store.delete(key);
  }
}

/**
 * IP-based sliding window rate limiter
 */
export function checkRateLimit(
  identifier: string,
  maxRequests = 10,
  windowMs = 60_000
): RateLimitResult {
  cleanupStaleEntries();

  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetTime) {
    store.set(identifier, { count: 1, resetTime: now + windowMs });
    return {
      limited: false,
      remaining: maxRequests - 1,
      resetInSeconds: Math.ceil(windowMs / 1000),
    };
  }

  entry.count++;

  if (entry.count > maxRequests) {
    const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return { limited: true, remaining: 0, resetInSeconds };
  }

  return {
    limited: false,
    remaining: maxRequests - entry.count,
    resetInSeconds: Math.ceil((entry.resetTime - now) / 1000),
  };
}
