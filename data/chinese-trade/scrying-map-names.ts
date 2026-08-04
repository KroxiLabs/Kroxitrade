/**
 * Map-area names for the "Scrying Orb (<Map>)" currency variants whose map the
 * Taiwan Trade data does not always contain these map variants, so the
 * language-independent `type` + `disc` pairing cannot derive them. The maps
 * below provide reviewed Traditional and Simplified labels where needed.
 *
 * Keys are normalized English map names. When Taiwan Trade data gains an entry,
 * its live value naturally takes precedence.
 */
export const SCRYING_ORB_BASE_TW = "占卜寶珠"
export const SCRYING_ORB_BASE_CN = "占卜宝珠"

export const SCRYING_MAP_NAMES_TW: Record<string, string> = {
  pit: "巨坑",
  shipyard: "熾炎船塢",
  primordialblocks: "血腥陣地",
  colosseum: "大決鬥場",
  lavalake: "岩漿熔湖",
  channel: "秘密通道",
  silo: "儲物倉",
  arsenal: "古兵工廠",
  forbiddenwoods: "禁忌之森",
  colonnade: "激戰柱廊",
  excavation: "挖掘場",
  core: "核心",
  cells: "幽魂監牢",
  orchard: "密林果園",
  chateau: "古堡",
  estuary: "熔火岩灘",
  factory: "鐵鏽工廠",
  marshes: "惡臭沼地",
  terrace: "露台花園",
  alleyways: "危城巷弄",
  courthouse: "失序教院",
  vault: "魔金寶庫",
  geode: "詭譎晶洞",
  spiderlair: "巨蛛巢穴",
  sulphurvents: "硫磺蝕岸",
  caldera: "火山炎口",
  shrine: "奇術秘殿",
  lair: "餓獸巢穴"
}

export const SCRYING_MAP_NAMES_CN: Record<string, string> = {
  pit: "巨坑",
  shipyard: "炽炎船坞",
  primordialblocks: "远古街区",
  colosseum: "大决斗场",
  lavalake: "熔岩之湖",
  channel: "秘密通道",
  silo: "圆形秘窖",
  arsenal: "古兵工厂",
  forbiddenwoods: "禁断之林",
  colonnade: "激战柱廊",
  excavation: "挖掘场",
  core: "核心",
  cells: "幽魂监牢",
  orchard: "密林果园",
  chateau: "古堡",
  estuary: "赤寒河岸",
  factory: "工厂遗迹",
  marshes: "绝望沼泽",
  terrace: "海滨台地",
  alleyways: "危城巷弄",
  courthouse: "失序教院",
  vault: "机关宝库",
  geode: "水晶洞穴",
  spiderlair: "巨蛛巢穴",
  sulphurvents: "硫磺蚀岸",
  caldera: "寂灵之渊",
  shrine: "奇术秘殿",
  lair: "巢穴"
}
