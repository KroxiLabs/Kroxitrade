import { shouldRefreshChineseTradeCache } from "./cache-lifecycle"
import { chineseTradeStorage } from "./contract"
import { convertDeep } from "./simplifier"
import {
  buildLocalizedStatCache,
  buildModifierTranslationMap,
  type ChineseStatTemplates,
  type TradeStatGroup
} from "./stat-cache-transform"

const TAIWAN_TRADE_API = "https://pathofexile.tw/api/trade/data/"
const INTERNATIONAL_TRADE_API = "https://www.pathofexile.com/api/trade/data/"
const CACHE_MAX_AGE_MS = 8 * 60 * 60 * 1000

let templatesPromise: Promise<ChineseStatTemplates> | undefined
const loadStatTemplates = () =>
  (templatesPromise ??= import("~/data/chinese-trade/stat-templates.json").then(
    ({ default: templates }) => templates as ChineseStatTemplates
  ))

const readCacheTimestamp = (): Promise<number> =>
  new Promise((resolve) =>
    chrome.storage.local.get([chineseTradeStorage.updatedAt], (stored) =>
      resolve(Number(stored[chineseTradeStorage.updatedAt]) || 0)
    )
  )

const writeCache = (payload: Record<string, unknown>): Promise<void> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.set(payload, () => {
      const error = chrome.runtime.lastError
      if (error) {
        reject(new Error(error.message))
        return
      }
      resolve()
    })
  )

const removeSupersededCache = (): Promise<void> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.remove(
      [
        "poeTradePlus.chineseTrade.traditional.static",
        "poeTradePlus.chineseTrade.simplified.static",
        "poeTradePlus.chineseTrade.traditional.filters",
        "poeTradePlus.chineseTrade.simplified.filters",
        "poeTradePlus.chineseTrade.traditional.items",
        "poeTradePlus.chineseTrade.simplified.items",
        "poeTradePlus.chineseTrade.traditional.templates",
        "poeTradePlus.chineseTrade.simplified.templates"
      ],
      () => {
        const error = chrome.runtime.lastError
        if (error) reject(new Error(error.message))
        else resolve()
      }
    )
  )

const fetchTradeResult = async (url: string): Promise<TradeStatGroup[] | null> => {
  const response = await fetch(url, { credentials: "omit" })
  if (!response.ok) throw new Error(`${url} -> ${response.status}`)
  const value = await response.json()
  return Array.isArray(value?.result) ? (value.result as TradeStatGroup[]) : null
}

const readSimplifiedItemNames = (): Promise<Record<string, string>> =>
  new Promise((resolve) =>
    chrome.storage.local.get([chineseTradeStorage.simplified.itemNames], (stored) =>
      resolve(
        (stored[chineseTradeStorage.simplified.itemNames] as Record<string, string>) || {}
      )
    )
  )

/** Use verified simplified names when an item name differs beyond OpenCC. */
const applySimplifiedMercenaryNames = (
  groups: TradeStatGroup[],
  itemNames: Record<string, string>
) => {
  for (const group of groups) {
    if (group.id !== "mercenary") continue
    for (const entry of group.entries ?? []) {
      const match = entry.text?.match(/^(.+) \(([^()]+)\)$/)
      if (!match) continue
      const normalized = match[2].toLowerCase().replace(/[^a-z0-9]/g, "")
      const replacement = itemNames[normalized]
      if (replacement && replacement !== match[1]) {
        entry.text = `${replacement} (${match[2]})`
      }
    }
  }
}

/**
 * Rebuild the disposable Chinese Trade cache from official metadata and local
 * reviewed dictionaries. Stored ids are never translated, only display text.
 */
export const refreshChineseTradeCache = async (force = false): Promise<void> => {
  try {
    if (
      !force &&
      !shouldRefreshChineseTradeCache(await readCacheTimestamp(), Date.now(), CACHE_MAX_AGE_MS)
    ) {
      return
    }

    const [taiwanStats, internationalStats, templates] = await Promise.all([
      fetchTradeResult(`${TAIWAN_TRADE_API}stats`),
      fetchTradeResult(`${INTERNATIONAL_TRADE_API}stats`).catch(() => null),
      loadStatTemplates()
    ])
    if (!taiwanStats) return

    const traditionalStats = buildLocalizedStatCache(
      taiwanStats,
      internationalStats,
      templates,
      "tw"
    )
    const simplifiedStats = convertDeep(
      buildLocalizedStatCache(taiwanStats, internationalStats, templates, "cn")
    )
    applySimplifiedMercenaryNames(simplifiedStats, await readSimplifiedItemNames())

    const payload: Record<string, unknown> = {
      [chineseTradeStorage.updatedAt]: Date.now(),
      [chineseTradeStorage.traditional.stats]: traditionalStats,
      [chineseTradeStorage.simplified.stats]: simplifiedStats,
      [chineseTradeStorage.traditional.modifiers]: buildModifierTranslationMap(
        taiwanStats,
        internationalStats
      ),
      [chineseTradeStorage.simplified.modifiers]: {}
    }
    payload[chineseTradeStorage.simplified.modifiers] = convertDeep(
      payload[chineseTradeStorage.traditional.modifiers]
    )

    await removeSupersededCache()
    await writeCache(payload)
  } catch (error) {
    console.error("[PoeTradePlus] Failed to refresh the Chinese Trade cache", error)
  }
}
