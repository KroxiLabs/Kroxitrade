/** Cached Trade data is valid only for a bounded period and must have a timestamp. */
export const shouldRefreshChineseTradeCache = (
  updatedAt: unknown,
  now = Date.now(),
  maxAgeMs = 8 * 60 * 60 * 1000
) => {
  const timestamp = Number(updatedAt)
  return !Number.isFinite(timestamp) || timestamp <= 0 || now - timestamp >= maxAgeMs
}
