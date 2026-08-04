import bundledGemNames from "~/data/chinese-trade/gem-names.json"
import bundledUniqueNames from "~/data/chinese-trade/unique-names.json"
import { BASE_NAMES_CN, BASE_NAMES_TW } from "~/data/chinese-trade/base-names"
import { BEAST_NAMES_CN } from "~/data/chinese-trade/beast-names-cn"
import {
  SCRYING_MAP_NAMES_CN,
  SCRYING_MAP_NAMES_TW,
  SCRYING_ORB_BASE_CN,
  SCRYING_ORB_BASE_TW
} from "~/data/chinese-trade/scrying-map-names"
import { shouldRefreshChineseTradeCache } from "./cache-lifecycle"
import { chineseTradeStorage } from "./contract"
import { toSimplifiedChinese } from "./simplifier"

const tradeDataEndpoint = {
  international: "https://www.pathofexile.com/api/trade/data/",
  taiwan: "https://pathofexile.tw/api/trade/data/"
}
const CACHE_AGE = 8 * 60 * 60 * 1000

type TradeItem = {
  id?: string
  name?: string
  text?: string
  type?: string
  disc?: string
  flags?: { unique?: boolean }
}
type TradeGroup = { id?: string; label?: string; entries?: TradeItem[] }
type TradeResponse = { result?: TradeGroup[] }
type Dictionary = { tw?: Record<string, string>; cn?: Record<string, string> }

const uniqueNames = bundledUniqueNames as Dictionary
const gemNames = bundledGemNames as Dictionary
const normalized = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "")
const hasChinese = (value: string) => /[一-鿿]/.test(value)

const getTradeData = async (region: keyof typeof tradeDataEndpoint, resource: string) => {
  const response = await fetch(`${tradeDataEndpoint[region]}${resource}`, {
    credentials: "omit"
  })
  if (!response.ok) throw new Error(`${region}/${resource}: ${response.status}`)
  return response.json() as Promise<TradeResponse>
}

const readLocal = (keys: string[]) =>
  new Promise<Record<string, unknown>>((resolve) =>
    chrome.storage.local.get(keys, (values) =>
      resolve(values as Record<string, unknown>)
    )
  )

const writeLocal = (value: Record<string, unknown>) =>
  new Promise<void>((resolve, reject) =>
    chrome.storage.local.set(value, () => {
      const error = chrome.runtime.lastError
      if (error) reject(new Error(error.message))
      else resolve()
    })
  )

const itemLabel = (item: TradeItem) =>
  (item.name || item.text || item.type || "").trim()

const groupIndex = (groups: TradeGroup[]) => {
  const index = new Map<string, TradeGroup>()
  groups.forEach((group, position) =>
    index.set(String(group.id || group.label || position), group)
  )
  return index
}

/**
 * Adds translations only from pairs with an identical structure. The cache
 * remains conservative when regional Trade snapshots temporarily differ.
 */
const addAlignedEntries = (
  international: TradeItem[],
  taiwan: TradeItem[],
  map: Record<string, string>
) => {
  if (international.length !== taiwan.length) return
  for (let index = 0; index < international.length; index++) {
    const english = itemLabel(international[index])
    const chinese = itemLabel(taiwan[index])
    if (!english || !chinese || hasChinese(english) || !hasChinese(chinese)) continue
    map[normalized(english)] ||= chinese
  }
}

const addStaticPairs = (
  international: TradeGroup[],
  taiwan: TradeGroup[],
  map: Record<string, string>
) => {
  const byId = new Map<string, string>()
  for (const group of taiwan) {
    for (const item of group.entries ?? []) {
      if (item.id && item.text && hasChinese(item.text)) byId.set(item.id, item.text)
    }
  }
  for (const group of international) {
    for (const item of group.entries ?? []) {
      const chinese = item.id ? byId.get(item.id) : undefined
      if (item.text && chinese && !hasChinese(item.text)) {
        map[normalized(item.text)] ||= chinese
      }
    }
  }
}

const seedNames = (
  target: Record<string, string>,
  values: Record<string, string> | undefined
) => {
  for (const [key, value] of Object.entries(values ?? {})) {
    if (value) target[key] ||= value
  }
}

const createSimplifiedMap = (traditional: Record<string, string>) => {
  const simplified: Record<string, string> = {}
  for (const [key, value] of Object.entries(traditional)) {
    simplified[key] = toSimplifiedChinese(value)
  }
  seedNames(simplified, uniqueNames.cn)
  seedNames(simplified, gemNames.cn)
  seedNames(simplified, BEAST_NAMES_CN)
  seedNames(simplified, BASE_NAMES_CN)
  return simplified
}

const resolveItemName = (
  item: TradeItem,
  map: Record<string, string>,
  unique: Record<string, string>
) => {
  const preferred = item.name ? unique[normalized(item.name)] : undefined
  const label = itemLabel(item)
  return preferred || map[normalized(label)] || (item.type ? map[normalized(item.type)] : undefined)
}

const localizeItems = (
  groups: TradeGroup[],
  map: Record<string, string>,
  unique: Record<string, string>
) => {
  const reverse: Record<string, string> = {}
  const addReverse = (chinese: string, english: string) => {
    if (chinese && english) reverse[chinese] ||= english
  }

  const result = groups.map((group) => ({
    ...group,
    entries: (group.entries ?? []).map((item) => {
      const english = (item.text || "").trim()
      if (english && hasChinese(english)) return item

      const chinese = resolveItemName(item, map, unique)
      if (!chinese) return item

      const apiValue = english || (item.type || "").trim()
      if (!apiValue || hasChinese(apiValue)) return item
      addReverse(chinese, item.name || apiValue)

      if (item.name) {
        const base = item.type ? map[normalized(item.type)] : undefined
        const display = base && base !== chinese ? `${chinese} ${base}` : chinese
        addReverse(display, apiValue)
        return { ...item, text: `${display} (${apiValue})` }
      }
      return { ...item, text: `${chinese} (${apiValue})` }
    })
  }))
  return { result, reverse }
}

const addScryingOrbNames = (
  groups: TradeGroup[],
  map: Record<string, string>,
  names: Record<string, string>,
  base: string
) => {
  for (const group of groups) {
    for (const item of group.entries ?? []) {
      if (item.disc !== "scrying_orb" || !item.text) continue
      const match = item.text.match(/\(([^)]+)\)\s*$/)
      const chineseMap = match ? names[normalized(match[1])] : undefined
      if (chineseMap) map[normalized(item.text)] = `${base} (${chineseMap})`
    }
  }
}

const buildTraditionalMap = (
  international: TradeGroup[],
  taiwan: TradeGroup[],
  staticInternational: TradeGroup[],
  staticTaiwan: TradeGroup[]
) => {
  const translations: Record<string, string> = {}
  const byTaiwanGroup = groupIndex(taiwan)
  international.forEach((group, position) => {
    const key = String(group.id || group.label || position)
    const localized = byTaiwanGroup.get(key) ?? taiwan[position]
    if (!localized) return
    const source = (group.entries ?? []).filter((item) => !item.name)
    const target = (localized.entries ?? []).filter((item) => !item.name)
    addAlignedEntries(source, target, translations)
  })
  addStaticPairs(staticInternational, staticTaiwan, translations)
  seedNames(translations, uniqueNames.tw)
  seedNames(translations, BASE_NAMES_TW)
  seedNames(translations, gemNames.tw)
  addScryingOrbNames(international, translations, SCRYING_MAP_NAMES_TW, SCRYING_ORB_BASE_TW)
  return translations
}

export const buildChineseItemNameCache = async (force = false): Promise<void> => {
  const timestampKey = chineseTradeStorage.itemNamesUpdatedAt
  try {
    const stored = await readLocal([timestampKey])
    if (
      !force &&
      !shouldRefreshChineseTradeCache(Number(stored[timestampKey]) || 0, Date.now(), CACHE_AGE)
    ) {
      return
    }

    const [usItems, twItems, usStatic, twStatic] = await Promise.all([
      getTradeData("international", "items"),
      getTradeData("taiwan", "items"),
      getTradeData("international", "static"),
      getTradeData("taiwan", "static")
    ])
    const international = usItems.result ?? []
    const taiwan = twItems.result ?? []
    const traditionalMap = buildTraditionalMap(
      international,
      taiwan,
      usStatic.result ?? [],
      twStatic.result ?? []
    )
    const simplifiedMap = createSimplifiedMap(traditionalMap)
    addScryingOrbNames(international, simplifiedMap, SCRYING_MAP_NAMES_CN, SCRYING_ORB_BASE_CN)

    const traditional = localizeItems(
      international,
      traditionalMap,
      uniqueNames.tw ?? {}
    )
    const simplified = localizeItems(
      international,
      simplifiedMap,
      uniqueNames.cn ?? {}
    )

    await writeLocal({
      [timestampKey]: Date.now(),
      [chineseTradeStorage.traditional.itemNames]: traditionalMap,
      [chineseTradeStorage.simplified.itemNames]: simplifiedMap,
      [chineseTradeStorage.traditional.reverseNames]: traditional.reverse,
      [chineseTradeStorage.simplified.reverseNames]: simplified.reverse
    })
  } catch (error) {
    console.error("[PoeTradePlus] Failed to build the Chinese Trade item cache", error)
  }
}
