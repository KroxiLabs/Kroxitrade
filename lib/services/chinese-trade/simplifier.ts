// Traditional -> Simplified conversion for localized Trade data.
//
// OpenCC changes characters while the phrase table below preserves the wording
// expected by the Simplified Chinese game variant. Phrase-level replacements
// avoid broad character substitutions; extend this list only for intentional
// terminology differences.

import * as OpenCC from "opencc-js"

const hasChinese = (value: string) => /[一-鿿]/.test(value)

// Applied after OpenCC. Keys are the converted Traditional terms and values are
// the intended Simplified Chinese terminology.
const OVERRIDES: Record<string, string> = {
  // Stat vocabulary
  冰冷抗性: "冰霜抗性",
  最大冰冷抗性: "最大冰霜抗性",
  魔法功能药剂: "魔法非恢复类药剂",
  头目: "首领",
  污染: "腐化",
  咒术: "魔蛊",
  附近: "周围",
  全部: "所有",
  不能: "无法",
  颗: "个",
  // Skill and gem names with intentionally different wording.
  力量穿引: "念动飞箭", // Kinetic Bolt
  // League and mechanic names used in map and reward filters.
  最后通牒: "致命贪婪",
  死境探险: "先祖秘藏",
  劫盗同盟: "夺宝奇兵",
  丰收忌劫: "庄园",
  谵妄异域: "惊悸迷雾",
  凋落禁地: "菌潮",
  战乱之殇: "军团",
  强袭宿敌: "罪恶枷锁",
  远古蜃景: "沙海幻境",
  居民们: "君锋城下",
  禁忌圣域: "圣地",
  掘狱联盟: "地心探索",
  时空穿越: "穿越",
  兽猎: "猎魔",
  精髓: "精华",
  祭祀: "驱灵仪式",
  反叛: "背叛者",
  裂痕: "裂隙"
}

// Longest keys first so multi-word phrases win over any shorter substrings.
const OVERRIDE_KEYS = Object.keys(OVERRIDES).sort((a, b) => b.length - a.length)

let convert: ((text: string) => string) | null = null
const getConverter = () => {
  if (!convert) convert = OpenCC.Converter({ from: "tw", to: "cn" })
  return convert
}

/** Convert a single string from Traditional (台服) to Simplified (国服). */
export const toSimplifiedChinese = (text: string): string => {
  if (!text || !hasChinese(text)) return text
  let out = getConverter()(text)
  for (const key of OVERRIDE_KEYS) {
    if (out.includes(key)) out = out.split(key).join(OVERRIDES[key])
  }
  return out
}

/**
 * Recursively convert every Chinese string in a JSON-like value. ASCII-only
 * fields (ids, English `type`, the "(English)" half of a bilingual label) are
 * left untouched because OpenCC does not alter ASCII, so this is safe to run
 * over an entire trade-data `result` array.
 */
export const convertDeep = <T>(value: T): T => {
  if (typeof value === "string") return toSimplifiedChinese(value) as unknown as T
  if (Array.isArray(value)) return value.map((v) => convertDeep(v)) as unknown as T
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = convertDeep(v)
    }
    return out as unknown as T
  }
  return value
}
