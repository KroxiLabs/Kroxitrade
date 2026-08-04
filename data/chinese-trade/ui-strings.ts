// Trade-site interface strings (buttons, tabs, result labels). These are the
// site's own hard-coded UI text — not in any trade API — so they are curated
// here. Keys are the exact English text; they are normalized before matching
// (lowercase, punctuation/space stripped), so "Search Listed Items" also
// matches its uppercase CSS display.
//
// Wording follows the official Traditional-Chinese trade site as closely as
// possible; adjust any entry freely.
export const UI_STRINGS: Record<string, string> = {
  // Top tabs / actions (wording per the official pathofexile.tw site)
  "Search Listed Items": "搜尋道具",
  "Bulk Item Exchange": "以物易物",
  "Activate Live Search": "啟用即時搜尋",
  "Search": "搜尋",
  "Clear": "清除",
  "Show Filters": "顯示篩選",
  "Hide Filters": "隱藏篩選",
  "Live Search": "即時搜尋",

  // Filter groups / stat filter controls
  "Filters": "篩選器",
  "Stat Filters": "篩選器",
  "Add Stat Filter": "新增數值過濾",
  "Add Stat Group": "新增屬性組合",
  "Stat Groups": "項目群組",
  // Poe Trade Plus quick-filter panel
  "Quick filter presets": "快速篩選預設",
  "Pseudo Res/Life": "偽屬性 抗性/生命",
  "Explicit Res/Life": "顯性 抗性/生命",
  "Attack Weapon": "攻擊武器",
  "Spell Weapon": "法術武器",
  "Buyout Price": "直購價",
  "Chaos": "混沌",
  "Exalted": "崇高",
  "Divine": "神聖",
  "And": "和",
  "Not": "不",
  "If": "如果",
  "Count": "總計",
  "Weighted Sum": "權重總計",
  "Weighted Sum v2": "加權總和版本2",
  "Crucible Passive Tree Path": "熔火天賦樹徑",
  "Mercenary Skill Group": "傭兵技能組",
  "Min": "最小",
  "Max": "最大",

  // Result / listing labels
  "Item Level": "物品等級",
  "Requires Level": "需求等級",
  "Requires": "需求",
  "Asking Price": "開價",
  "Fee": "手續費",
  "Note": "備註",
  "Price": "價格",
  "Corrupted": "已汙染",
  "Verified": "已驗證",
  "Unverified": "未驗證",
  "Travel to Hideout": "前往藏身處",
  "Whisper": "密語",
  "Direct Whisper": "直接密語",
  "Ignore Player": "忽略玩家",
  "Sort": "排序",
  "Copy": "複製",

  // Bulk exchange
  "I want": "我想要",
  "I have": "我擁有",
  "Want": "想要",
  "Have": "擁有",
  "Minimum Stock": "最低庫存",
  "Exchange": "兌換"
}
