import assert from "node:assert/strict"
import test from "node:test"

import { shouldRefreshChineseTradeCache } from "../lib/services/chinese-trade/cache-lifecycle.ts"

test("refreshes missing, malformed and expired Chinese Trade caches", () => {
  const now = 1_000_000
  assert.equal(shouldRefreshChineseTradeCache(undefined, now, 100), true)
  assert.equal(shouldRefreshChineseTradeCache("invalid", now, 100), true)
  assert.equal(shouldRefreshChineseTradeCache(now - 100, now, 100), true)
})

test("keeps independent caches while their own snapshot is still fresh", () => {
  const now = 1_000_000
  assert.equal(shouldRefreshChineseTradeCache(now - 99, now, 100), false)
})
