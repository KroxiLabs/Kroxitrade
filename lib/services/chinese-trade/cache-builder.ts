import { shouldRefreshChineseTradeCache } from "./cache-lifecycle"
import { chineseTradeStorage } from "./contract"
import { convertDeep } from "./simplifier"
import {
  buildLocalizedStatCache,
  buildModifierTranslationMap,
  type TradeStatGroup
} from "./stat-cache-transform"
import { loadChineseStatTemplates } from "./stat-templates"

const TAIWAN_TRADE_API = "https://pathofexile.tw/api/trade/data/"
const INTERNATIONAL_TRADE_API = "https://www.pathofexile.com/api/trade/data/"
const CACHE_MAX_AGE_MS = 8 * 60 * 60 * 1000

const readCache = (language: "zh-tw" | "zh-cn"): Promise<Record<string, unknown>> =>
  new Promise((resolve) =>
    chrome.storage.local.get(
      (() => {
        const active = language === "zh-cn"
          ? chineseTradeStorage.simplified
          : chineseTradeStorage.traditional
        return [
          chineseTradeStorage.updatedAt,
          active.stats,
          active.static,
          active.filters
        ]
      })(),
      (stored) => resolve(stored as Record<string, unknown>)
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

/** Keep only the active locale and discard cache formats from older releases. */
const pruneChineseTradeCache = (language: "zh-tw" | "zh-cn"): Promise<void> =>
  new Promise((resolve, reject) =>
    chrome.storage.local.remove(
      (() => {
        const inactive = language === "zh-cn"
          ? chineseTradeStorage.traditional
          : chineseTradeStorage.simplified
        return [
          "poeTradePlus.chineseTrade.traditional.items",
          "poeTradePlus.chineseTrade.simplified.items",
          "poeTradePlus.chineseTrade.traditional.templates",
          "poeTradePlus.chineseTrade.simplified.templates",
          inactive.stats,
          inactive.modifiers,
          inactive.static,
          inactive.filters
        ]
      })(),
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
export const refreshChineseTradeCache = async (
  force = false,
  language: "zh-tw" | "zh-cn" = "zh-tw"
): Promise<boolean> => {
  try {
    const cache = await readCache(language)
    const active = language === "zh-cn"
      ? chineseTradeStorage.simplified
      : chineseTradeStorage.traditional
    const statsKey = active.stats
    if (
      !force &&
      Array.isArray(cache[statsKey]) &&
      Array.isArray(cache[active.static]) &&
      Array.isArray(cache[active.filters]) &&
      !shouldRefreshChineseTradeCache(
        Number(cache[chineseTradeStorage.updatedAt]) || 0,
        Date.now(),
        CACHE_MAX_AGE_MS
      )
    ) {
      await pruneChineseTradeCache(language)
      return true
    }

    const [taiwanStats, internationalStats, templates, taiwanStatic, taiwanFilters] = await Promise.all([
      fetchTradeResult(`${TAIWAN_TRADE_API}stats`),
      fetchTradeResult(`${INTERNATIONAL_TRADE_API}stats`).catch(() => null),
      loadChineseStatTemplates(),
      fetchTradeResult(`${TAIWAN_TRADE_API}static`).catch(() => null),
      fetchTradeResult(`${TAIWAN_TRADE_API}filters`).catch(() => null)
    ])
    if (!taiwanStats) {
      throw new Error("Taiwan Trade returned no stat data")
    }

    const localizedStats = language === "zh-cn"
      ? convertDeep(
          buildLocalizedStatCache(taiwanStats, internationalStats, templates, "cn")
        )
      : buildLocalizedStatCache(taiwanStats, internationalStats, templates, "tw")
    if (language === "zh-cn") {
      applySimplifiedMercenaryNames(localizedStats, await readSimplifiedItemNames())
    }

    const modifiers = buildModifierTranslationMap(taiwanStats, internationalStats)
    const modifierKey = language === "zh-cn"
      ? chineseTradeStorage.simplified.modifiers
      : chineseTradeStorage.traditional.modifiers
    const staticKey = language === "zh-cn"
      ? chineseTradeStorage.simplified.static
      : chineseTradeStorage.traditional.static
    const filtersKey = language === "zh-cn"
      ? chineseTradeStorage.simplified.filters
      : chineseTradeStorage.traditional.filters

    const payload: Record<string, unknown> = {
      [chineseTradeStorage.updatedAt]: Date.now(),
      [statsKey]: localizedStats,
      [modifierKey]: language === "zh-cn" ? convertDeep(modifiers) : modifiers
    }
    if (taiwanStatic) {
      payload[staticKey] = language === "zh-cn"
        ? convertDeep(taiwanStatic)
        : taiwanStatic
    }
    if (taiwanFilters) {
      payload[filtersKey] = language === "zh-cn"
        ? convertDeep(taiwanFilters)
        : taiwanFilters
    }

    await pruneChineseTradeCache(language)
    await writeCache(payload)
    return true
  } catch (error) {
    console.error("[PoeTradePlus] Failed to refresh the Chinese Trade cache", error)
    throw error
  }
}
