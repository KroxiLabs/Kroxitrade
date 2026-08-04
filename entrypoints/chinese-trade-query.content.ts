import {
  isNativeChineseTradeSite,
  tradeHosts
} from "~/lib/config/trade-hosts"

type TradeFilter = {
  id?: unknown
  value?: Record<string, unknown>
}

const optionIdPattern = /^(?<id>.+)\|(?<option>\d+)$/

const isSearchRequest = (url: string) =>
  /\/api\/trade\d?\/(?:search|exchange)\b/.test(url)

/**
 * Converts the display-only `statId|option` form into the query shape accepted
 * by the international Trade API. This is intentionally limited to outgoing
 * search bodies; stored filters and UI data remain untouched.
 */
const normalizeSearchBody = (body: string): string | undefined => {
  let payload: { query?: { stats?: Array<{ filters?: TradeFilter[] }> } }
  try {
    payload = JSON.parse(body)
  } catch {
    return undefined
  }

  let normalized = false
  for (const group of payload.query?.stats ?? []) {
    for (const filter of group.filters ?? []) {
      if (typeof filter.id !== "string") continue
      const match = filter.id.match(optionIdPattern)
      if (!match?.groups) continue
      filter.id = match.groups.id
      filter.value = { ...(filter.value ?? {}), option: Number(match.groups.option) }
      normalized = true
    }
  }

  return normalized ? JSON.stringify(payload) : undefined
}

export default defineContentScript({
  matches: tradeHosts,
  world: "MAIN",
  runAt: "document_start",

  main() {
    if (isNativeChineseTradeSite()) return

    const fetchFromPage = window.fetch
    window.fetch = function patchedTradeFetch(input, init) {
      const url = input instanceof Request ? input.url : String(input)
      if (!init || typeof init.body !== "string" || !isSearchRequest(url)) {
        return fetchFromPage.call(this, input, init)
      }

      try {
        const body = normalizeSearchBody(init.body)
        if (body) return fetchFromPage.call(this, input, { ...init, body })
      } catch {
        // A request must always remain usable even if its body is unexpected.
      }
      return fetchFromPage.call(this, input, init)
    }
  }
})
