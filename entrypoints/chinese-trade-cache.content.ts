import { tradeHosts } from "~/lib/config/trade-hosts"
import {
  chineseTradeMessage,
  chineseTradePageStorage,
  chineseTradeStorage
} from "~/lib/services/chinese-trade/contract"
import { getTradeTranslationState } from "~/lib/services/trade-translation"

const tradeCacheKeys = [
  "lscache-tradestats",
  "lscache-tradedata",
  "lscache-tradefilters",
  "lscache-tradeitems"
] as const

const removeTranslatedTradeCache = () => {
  if (!localStorage.getItem(chineseTradePageStorage.injected)) return
  for (const key of tradeCacheKeys) {
    localStorage.removeItem(key)
    localStorage.removeItem(`${key}-cacheexpiration`)
  }
  localStorage.removeItem(chineseTradePageStorage.injected)
}

const storageValues = (keys: string[]) =>
  new Promise<Record<string, unknown>>((resolve) =>
    chrome.storage.local.get(keys, (values) =>
      resolve(values as Record<string, unknown>)
    )
  )

const requestCacheBuild = () =>
  new Promise<boolean>((resolve) => {
    chrome.runtime.sendMessage(
      { type: chineseTradeMessage.rebuildCache },
      (reply) => resolve(reply?.ok === true)
    )
  })

/**
 * Supplies localized metadata before Trade initializes its own lscache entries.
 * The page keeps official ids while displaying the Chinese labels from the
 * extension cache.
 */
export default defineContentScript({
  matches: tradeHosts,
  runAt: "document_start",

  async main() {
    const state = await getTradeTranslationState()
    if (!state.enabled) {
      try {
        removeTranslatedTradeCache()
      } catch {
        // Page storage can be unavailable during browser shutdown.
      }
      return
    }

    const locale = state.language === "zh-cn"
      ? chineseTradeStorage.simplified
      : chineseTradeStorage.traditional
    const targets: Array<[string, (typeof tradeCacheKeys)[number]]> = [
      [locale.stats, "lscache-tradestats"],
      [locale.staticData, "lscache-tradedata"],
      [locale.filters, "lscache-tradefilters"],
      [locale.items, "lscache-tradeitems"]
    ]

    let values: Record<string, unknown>
    try {
      values = await storageValues(targets.map(([source]) => source))
    } catch {
      return
    }

    const serialized = new Map<string, string>()
    for (const [source, target] of targets) {
      const value = values[source]
      if (!Array.isArray(value)) continue
      try {
        serialized.set(target, JSON.stringify(value))
      } catch {
        // Skip malformed data and let the native site fetch its own value.
      }
    }

    const stats = serialized.get("lscache-tradestats")
    if (!stats) {
      try {
        if (sessionStorage.getItem(chineseTradePageStorage.rebuildGuard) === "1") return
        sessionStorage.setItem(chineseTradePageStorage.rebuildGuard, "1")
        if (await requestCacheBuild()) location.reload()
      } catch {
        // No cache build is better than an interrupted Trade page.
      }
      return
    }
    sessionStorage.removeItem(chineseTradePageStorage.rebuildGuard)

    const bootStats = localStorage.getItem("lscache-tradestats")
    const inject = () => {
      let wroteValue = false
      for (const [target, value] of serialized) {
        if (localStorage.getItem(target) !== value) localStorage.setItem(target, value)
        localStorage.removeItem(`${target}-cacheexpiration`)
        wroteValue = true
      }
      if (wroteValue) localStorage.setItem(chineseTradePageStorage.injected, "1")
    }

    try {
      inject()
      ;[80, 240, 600].forEach((delay) => setTimeout(inject, delay))
      if (
        bootStats !== stats &&
        sessionStorage.getItem(chineseTradePageStorage.reloadGuard) !== "1"
      ) {
        sessionStorage.setItem(chineseTradePageStorage.reloadGuard, "1")
        setTimeout(() => location.reload(), 50)
      } else if (bootStats === stats) {
        sessionStorage.removeItem(chineseTradePageStorage.reloadGuard)
      }
    } catch {
      // The native Trade cache remains available if page storage rejects writes.
    }
  }
})
