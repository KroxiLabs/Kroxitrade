// Curated Mercenary Warrant skill labels. Mercenary skills can use different
// Chinese wording than regular gems, so they have a dedicated normalized-English
// map. Tiered support labels come from the Trade stat cache at runtime.
export const MERCENARY_SKILL_NAMES: Record<string, { tw: string; cn: string }> = {
  "absolution": { tw: "赦免", cn: "赦罪" }, // Absolution
  "abyssalcry": { tw: "深淵戰吼", cn: "深渊战吼" }, // Abyssal Cry
  "alchemistsmark": { tw: "煉金術士印記", cn: "炼金师印记" }, // Alchemist's Mark
  "altarofchaos": { tw: "混沌祭壇", cn: "混沌之祭坛" }, // Altar of Chaos
  "anger": { tw: "憤怒", cn: "愤怒" }, // Anger
  "arc": { tw: "電弧", cn: "电弧" }, // Arc
  "arcticarmour": { tw: "極地裝甲", cn: "极地装甲" }, // Arctic Armour
  "artilleryballista": { tw: "火砲砲塔", cn: "火力弩炮" }, // Artillery Ballista
  "aspectofthespider": { tw: "毒蛛祝福", cn: "蛛之势" }, // Aspect of the Spider
  "assassinsmark": { tw: "刺客印記", cn: "暗影印记" }, // Assassin's Mark
  "balllightningoforbitingtrap": { tw: "天雷之珠．軌跡陷阱", cn: "周转之天雷之珠陷阱" }, // Ball Lightning of Orbiting Trap
  "balllightningofstatic": { tw: "天雷之珠．靜電", cn: "静滞之天雷之珠" }, // Ball Lightning of Static
  "bane": { tw: "災厄", cn: "混沌之毒" }, // Bane
  "barrage": { tw: "彈幕", cn: "弹幕" }, // Barrage
  "barrageofvolleyfire": { tw: "彈幕．齊射", cn: "齐发之弹幕" }, // Barrage of Volley Fire
  "battlemagescry": { tw: "戰法戰吼", cn: "魔武战号" }, // Battlemage's Cry
  "beartrap": { tw: "捕熊陷阱", cn: "捕熊陷阱" }, // Bear Trap
  "bladetrap": { tw: "刀鋒陷阱", cn: "剑刃陷阱" }, // Blade Trap
  "bladevortex": { tw: "飛刃風暴", cn: "飞刃风暴" }, // Blade Vortex
  "bladefall": { tw: "虛空刀雨", cn: "虚空刀雨" }, // Bladefall
  "bladefalloftrarthus": { tw: "特拉特斯虛空刀雨", cn: "特拉特斯之虚空刀雨" }, // Bladefall of Trarthus
  "blasphemyenfeeble": { tw: "褻瀆衰弱", cn: "渎神衰弱" }, // Blasphemy Enfeeble
  "blasphemyflammability": { tw: "易燃．瀆神", cn: "渎神易燃" }, // Blasphemy Flammability
  "blastrainoftrarthus": { tw: "特拉特斯爆裂箭雨", cn: "特拉特斯之爆裂箭雨" }, // Blast Rain of Trarthus
  "blight": { tw: "萎滅", cn: "枯萎" }, // Blight
  "blinkarrow": { tw: "閃電射擊", cn: "闪现射击" }, // Blink Arrow
  "bloodywarp": { tw: "血腥傳送", cn: "赤红折跃" }, // Bloody Warp
  "bodyswap": { tw: "屍術傳送", cn: "灵体转换" }, // Bodyswap
  "boilingblood": { tw: "沸騰之血", cn: "沸血" }, // Boiling Blood
  "boneoffering": { tw: "骸骨奉獻", cn: "骸骨奉献" }, // Bone Offering
  "boneshatter": { tw: "碎骨", cn: "七伤破" }, // Boneshatter
  "burningarrow": { tw: "燃燒箭矢", cn: "燃烧箭矢" }, // Burning Arrow
  "causticarrow": { tw: "腐化箭矢", cn: "腐蚀箭矢" }, // Caustic Arrow
  "chainhookoftrarthus": { tw: "特拉特斯奪魂勾索", cn: "特拉特斯之钩链攻击" }, // Chain Hook of Trarthus
  "chaoticburst": { tw: "混沌爆發", cn: "混沌爆发" }, // Chaotic Burst
  "chaoticshot": { tw: "混沌射擊", cn: "混沌射击" }, // Chaotic Shot
  "chargeddashofthearcane": { tw: "雷霆衝鋒．秘術", cn: "秘法之蓄力疾风闪" }, // Charged Dash of the Arcane
  "clarity": { tw: "清晰", cn: "清晰" }, // Clarity
  "cleave": { tw: "劈砍", cn: "劈砍" }, // Cleave
  "cobralash": { tw: "毒蛇鞭笞", cn: "毒蛇鞭击" }, // Cobra Lash
  "conductivity": { tw: "導電", cn: "导电" }, // Conductivity
  "consecratedpath": { tw: "奉獻之路", cn: "奉献之路" }, // Consecrated Path
  "corruptedbladevortexofthescythe": { tw: "腐化飛刃風暴．鐮刀", cn: "巨镰之飞刃风暴" }, // Corrupted Blade Vortex of the Scythe
  "creepingfrosttrap": { tw: "霜寒滲透陷阱", cn: "电光寒霜陷阱" }, // Creeping Frost Trap
  "darkpact": { tw: "暗夜血契", cn: "黑暗交易" }, // Dark Pact
  "dash": { tw: "幻步", cn: "冲刺" }, // Dash
  "decoytotem": { tw: "誘餌圖騰", cn: "诱饵图腾" }, // Decoy Totem
  "desecrate": { tw: "褻瀆", cn: "亵渎" }, // Desecrate
  "despair": { tw: "絕望", cn: "绝望" }, // Despair
  "determination": { tw: "堅定", cn: "坚定" }, // Determination
  "discipline": { tw: "紀律", cn: "纪律" }, // Discipline
  "divineire": { tw: "聖怒", cn: "圣怨" }, // Divine Ire
  "divineretribution": { tw: "神聖制裁", cn: "神圣报应" }, // Divine Retribution
  "dominatingblow": { tw: "霸氣之擊", cn: "霸气之击" }, // Dominating Blow
  "dualstrike": { tw: "雙持打擊", cn: "双持打击" }, // Dual Strike
  "earthquakeofamplification": { tw: "震地．增幅", cn: "增幅之地震" }, // Earthquake of Amplification
  "earthquakeofwinter": { tw: "震地．寒冬", cn: "凛冬之震地" }, // Earthquake of Winter
  "elementalweakness": { tw: "元素要害", cn: "元素要害" }, // Elemental Weakness
  "enduringcry": { tw: "堅決戰吼", cn: "坚决战吼" }, // Enduring Cry
  "ensnaringarrow": { tw: "誘捕箭矢", cn: "诱捕之箭" }, // Ensnaring Arrow
  "envy": { tw: "忌妒", cn: "嫉妒" }, // Envy
  "essencedrainofwickedness": { tw: "靈魂吸取．陰暗", cn: "邪门之灵魂吸取" }, // Essence Drain of Wickedness
  "etherealknives": { tw: "虛空匕首", cn: "虚空匕首" }, // Ethereal Knives
  "explosivearrow": { tw: "爆炸箭矢", cn: "爆炸箭矢" }, // Explosive Arrow
  "exsanguinate": { tw: "抽血", cn: "赤炼魔光" }, // Exsanguinate
  "eyeofwinter": { tw: "凜冬之眼", cn: "凛冬之眼" }, // Eye of Winter
  "fireball": { tw: "火球", cn: "火球" }, // Fireball
  "fireballofimpact": { tw: "火球．衝擊", cn: "冲击之火球" }, // Fireball of Impact
  "flameaegis": { tw: "火焰神盾", cn: "烈焰护盾" }, // Flame Aegis
  "flamelink": { tw: "連結：烈焰", cn: "烈炎羁绊" }, // Flame Link
  "flamesurge": { tw: "怒焰奔騰", cn: "怒焰奔腾" }, // Flame Surge
  "flamewall": { tw: "烈焰之牆", cn: "烈焰之墙" }, // Flame Wall
  "flameblast": { tw: "烈焰爆破", cn: "烈焰爆破" }, // Flameblast
  "flameboltstrike": { tw: "炎彈打擊", cn: "火焰箭打击" }, // Flamebolt Strike
  "flammability": { tw: "易燃", cn: "易燃" }, // Flammability
  "fleshoffering": { tw: "血肉奉獻", cn: "血肉奉献" }, // Flesh Offering
  "forbiddenritetotem": { tw: "禁忌儀式圖騰", cn: "禁断典仪图腾" }, // Forbidden Rite Totem
  "frenzy": { tw: "狂怒", cn: "狂怒" }, // Frenzy
  "frigidforkshot": { tw: "分岔寒風彈", cn: "冰冽分叉射击" }, // Frigid Forkshot
  "frostbomb": { tw: "寒霜爆", cn: "寒霜爆" }, // Frost Bomb
  "frostshield": { tw: "寒霜護盾", cn: "冰霜护盾" }, // Frost Shield
  "frostwall": { tw: "冰霜之牆", cn: "冰墙" }, // Frost Wall
  "frostbite": { tw: "凍傷", cn: "冻伤" }, // Frostbite
  "frostblink": { tw: "霜漣之瞬", cn: "冰霜闪现" }, // Frostblink
  "frostbolt": { tw: "寒冰彈", cn: "寒冰弹" }, // Frostbolt
  "galvanicarrow": { tw: "電流箭矢", cn: "电光箭" }, // Galvanic Arrow
  "glacialhammer": { tw: "冰霜之錘", cn: "冰霜之锤" }, // Glacial Hammer
  "grace": { tw: "優雅", cn: "优雅" }, // Grace
  "greaterkineticblast": { tw: "高階力量爆破", cn: "高等力量爆破" }, // Greater Kinetic Blast
  "greaterlightningarrow": { tw: "高階閃電箭矢", cn: "高等闪电箭矢" }, // Greater Lightning Arrow
  "greatershocknova": { tw: "高階閃電新星", cn: "高等闪电新星" }, // Greater Shock Nova
  "greatersoulrend": { tw: "高階靈體撕裂", cn: "高等裂魂术" }, // Greater Soulrend
  "greatersplitarrow": { tw: "高階分裂箭矢", cn: "高等分裂箭矢" }, // Greater Split Arrow
  "greaterstormcall": { tw: "高階風暴呼喚", cn: "高等风暴呼唤" }, // Greater Stormcall
  "greatervortextrap": { tw: "高階漩渦陷阱", cn: "高等漩涡陷阱" }, // Greater Vortex Trap
  "groundslam": { tw: "裂地之擊", cn: "裂地之击" }, // Ground Slam
  "haste": { tw: "迅捷", cn: "迅捷" }, // Haste
  "hatred": { tw: "憎恨", cn: "憎恨" }, // Hatred
  "heavystrikeoftrarthus": { tw: "特拉特斯沉重之擊", cn: "特拉特斯之重击" }, // Heavy Strike of Trarthus
  "heavystrikeofvulnerability": { tw: "沉重之擊．脆弱", cn: "脆弱之重击" }, // Heavy Strike of Vulnerability
  "heraldofash": { tw: "灰燼之捷", cn: "灰烬之捷" }, // Herald of Ash
  "heraldofpurity": { tw: "純淨之捷", cn: "纯净之捷" }, // Herald of Purity
  "holyflametotem": { tw: "神聖火蛇圖騰", cn: "圣焰图腾" }, // Holy Flame Totem
  "holyrelic": { tw: "聖物", cn: "圣物" }, // Holy Relic
  "icecrash": { tw: "寒冰衝擊", cn: "寒冰冲击" }, // Ice Crash
  "icenova": { tw: "冰霜新星", cn: "冰霜新星" }, // Ice Nova
  "icenovaofprojection": { tw: "投射之冰霜新星", cn: "投射之冰霜新星" }, // Ice Nova of Projection
  "iceshot": { tw: "冰霜射擊", cn: "冰霜射击" }, // Ice Shot
  "icetrap": { tw: "冰凍陷阱", cn: "冰冻陷阱" }, // Ice Trap
  "icestorm": { tw: "冰風暴", cn: "冰风暴" }, // Icestorm
  "iciclerain": { tw: "冰柱之雨", cn: "冰锥之雨" }, // Icicle Rain
  "infernalblowofimmolation": { tw: "煉獄之擊．自焚", cn: "献祭之炼狱之击" }, // Infernal Blow of Immolation
  "infernalcry": { tw: "煉獄戰吼", cn: "炼狱战吼" }, // Infernal Cry
  "inspiringcry": { tw: "振奮戰吼", cn: "鼓舞战吼" }, // Inspiring Cry
  "intimidatingcry": { tw: "威嚇戰吼", cn: "威吓战吼" }, // Intimidating Cry
  "kineticblastofclustering": { tw: "力量爆破．聚集", cn: "集束之力量爆破" }, // Kinetic Blast of Clustering
  "kineticbolt": { tw: "力量穿引", cn: "念动飞箭" }, // Kinetic Bolt
  "lightningarrow": { tw: "閃電箭矢", cn: "闪电箭矢" }, // Lightning Arrow
  "lightningspiretrap": { tw: "鋒雷陷阱", cn: "电塔陷阱" }, // Lightning Spire Trap
  "lightningtrap": { tw: "閃電陷阱", cn: "闪电陷阱" }, // Lightning Trap
  "lightningwarp": { tw: "閃電傳送", cn: "闪电传送" }, // Lightning Warp
  "lightningwarptrap": { tw: "閃電傳送陷阱", cn: "闪电传送陷阱" }, // Lightning Warp Trap
  "malevolence": { tw: "惡意", cn: "怨毒光环" }, // Malevolence
  "mirrorarrow": { tw: "魅影射擊", cn: "镜像射击" }, // Mirror Arrow
  "moltenshell": { tw: "熔岩護盾", cn: "熔岩护盾" }, // Molten Shell
  "moltenstrike": { tw: "熔岩之擊", cn: "熔岩之击" }, // Molten Strike
  "moltenwell": { tw: "熔岩之井", cn: "熔岩之井" }, // Molten Well
  "orbofstorms": { tw: "風暴漩渦", cn: "风暴漩涡" }, // Orb of Storms
  "pestilentstrike": { tw: "瘟疫打擊", cn: "致疫打击" }, // Pestilent Strike
  "poachersmark": { tw: "盜獵者印記", cn: "盗猎者印记" }, // Poacher's Mark
  "powersiphon": { tw: "力量抽取", cn: "力量抽取" }, // Power Siphon
  "precision": { tw: "精準", cn: "精准" }, // Precision
  "pride": { tw: "驕傲", cn: "尊严" }, // Pride
  "profanecascade": { tw: "褻瀆爆發", cn: "渎神瀑流" }, // Profane Cascade
  "profanestrike": { tw: "褻瀆打擊", cn: "渎神打击" }, // Profane Strike
  "proximityshield": { tw: "靈能之盾", cn: "灵能盾" }, // Proximity Shield
  "puncture": { tw: "放血", cn: "放血" }, // Puncture
  "punishment": { tw: "懲戒", cn: "惩戒" }, // Punishment
  "purifyingflame": { tw: "淨化烈焰", cn: "净化烈焰" }, // Purifying Flame
  "purityoffire": { tw: "火焰淨化", cn: "火焰净化" }, // Purity of Fire
  "purityofice": { tw: "冰霜淨化", cn: "冰霜净化" }, // Purity of Ice
  "purityoflightning": { tw: "閃電淨化", cn: "闪电净化" }, // Purity of Lightning
  "rainofarrowsofsaturation": { tw: "箭雨．飽和", cn: "饱和之箭雨" }, // Rain of Arrows of Saturation
  "raisespectreoftransience": { tw: "喚醒幽魂．轉瞬", cn: "瞬息之召唤灵体" }, // Raise Spectre of Transience
  "raisezombieoffalling": { tw: "殭屍復甦．墜落", cn: "殒命之魔卫复苏" }, // Raise Zombie of Falling
  "raisezombieofgigantism": { tw: "殭屍復甦．巨大化", cn: "巨型之魔卫复苏" }, // Raise Zombie of Gigantism
  "reap": { tw: "收割", cn: "绝命之镰" }, // Reap
  "relicofbinding": { tw: "束縛聖物", cn: "束缚圣物" }, // Relic of Binding
  "rollingmagma": { tw: "熔岩翻騰", cn: "熔岩奔涌" }, // Rolling Magma
  "scorchingraytotem": { tw: "熾灼奔流圖騰", cn: "灼热光线图腾" }, // Scorching Ray Totem
  "scourgearrowofmenace": { tw: "天譴之箭．威脅", cn: "威胁之天灾之箭" }, // Scourge Arrow of Menace
  "scourstorm": { tw: "沖刷風暴", cn: "末日风暴" }, // Scourstorm
  "shockwavetotemofshocking": { tw: "震波圖騰．電震", cn: "导电之震波图腾" }, // Shockwave Totem of Shocking
  "shrapnelballista": { tw: "彈片砲塔", cn: "散射弩炮" }, // Shrapnel Ballista
  "siegeballistaoftrarthus": { tw: "特拉特斯攻城炮台", cn: "特拉特斯之攻城炮台" }, // Siege Ballista of Trarthus
  "sigilofpower": { tw: "咒符之力", cn: "威能法印" }, // Sigil of Power
  "smite": { tw: "雷鳴重擊", cn: "惩击" }, // Smite
  "smokemine": { tw: "煙霧地雷", cn: "烟雾地雷" }, // Smoke Mine
  "soulrendofreaping": { tw: "靈體撕裂．收割", cn: "收割之裂魂术" }, // Soulrend of Reaping
  "spark": { tw: "電球", cn: "电球" }, // Spark
  "spectralhelixoftrarthus": { tw: "特拉特斯靈體旋武", cn: "特拉特斯之灵幻旋斩" }, // Spectral Helix of Trarthus
  "spectralthrowoftrarthus": { tw: "特拉特斯靈體投擲", cn: "特拉特斯之灵体投掷" }, // Spectral Throw of Trarthus
  "splitarrow": { tw: "分裂箭矢", cn: "分裂箭矢" }, // Split Arrow
  "stormcalloftrarthus": { tw: "特拉特斯風暴呼喚", cn: "特拉特斯之风暴呼唤" }, // Storm Call of Trarthus
  "stormrain": { tw: "暴風雷雨", cn: "暴雨箭" }, // Storm Rain
  "stormcall": { tw: "風暴呼喚", cn: "风暴呼唤" }, // Stormcall
  "summonragingspirit": { tw: "召喚憤怒狂靈", cn: "召唤愤怒狂灵" }, // Summon Raging Spirit
  "summonseekingvoid": { tw: "召喚尋敵虛空", cn: "召唤追踪虚空" }, // Summon Seeking Void
  "summonskeletons": { tw: "召喚骷髏", cn: "召唤魔侍" }, // Summon Skeletons
  "summonskitterbots": { tw: "召喚探測機獸", cn: "召唤飞掠者" }, // Summon Skitterbots
  "sunderoftrarthus": { tw: "特拉特斯大地震擊", cn: "特拉特斯之震击" }, // Sunder of Trarthus
  "tectonicslam": { tw: "破體之擊", cn: "破釜一击" }, // Tectonic Slam
  "temporalchains": { tw: "時空鎖鏈", cn: "时空锁链" }, // Temporal Chains
  "tornadoofelementalturbulence": { tw: "龍捲風．元素紛亂", cn: "元素激变之龙卷旋风" }, // Tornado of Elemental Turbulence
  "tornadoshot": { tw: "龍捲射擊", cn: "龙卷射击" }, // Tornado Shot
  "touchofgod": { tw: "神之觸", cn: "天谴之拳" }, // Touch of God
  "toxicrain": { tw: "腐蝕毒雨", cn: "毒雨" }, // Toxic Rain
  "vaalancestralwarchief": { tw: "瓦爾．先祖戰士長", cn: "瓦尔：先祖战士长" }, // Vaal Ancestral Warchief
  "vaalarcticarmour": { tw: "瓦爾．極地裝甲", cn: "瓦尔：极地装甲" }, // Vaal Arctic Armour
  "vaalburningarrow": { tw: "瓦爾．燃燒箭矢", cn: "瓦尔：燃烧箭矢" }, // Vaal Burning Arrow
  "vaalcausticarrow": { tw: "瓦爾．腐化箭矢", cn: "瓦尔：腐蚀箭矢" }, // Vaal Caustic Arrow
  "vaalcleave": { tw: "瓦爾．劈砍", cn: "瓦尔：劈砍" }, // Vaal Cleave
  "vaalflameblast": { tw: "瓦爾．烈焰爆破", cn: "瓦尔：烈焰爆破" }, // Vaal Flameblast
  "vaalglacialhammer": { tw: "瓦爾．冰霜之錘", cn: "瓦尔：冰霜之锤" }, // Vaal Glacial Hammer
  "vaalgrace": { tw: "瓦爾．優雅", cn: "瓦尔：优雅" }, // Vaal Grace
  "vaalgroundslam": { tw: "瓦爾．裂地之擊", cn: "瓦尔：裂地之击" }, // Vaal Ground Slam
  "vaaliceshot": { tw: "瓦爾．冰霜射擊", cn: "瓦尔：冰霜射击" }, // Vaal Ice Shot
  "vaallightningarrow": { tw: "瓦爾．閃電箭矢", cn: "瓦尔：闪电箭矢" }, // Vaal Lightning Arrow
  "vaallightningtrap": { tw: "瓦爾．閃電陷阱", cn: "瓦尔：闪电陷阱" }, // Vaal Lightning Trap
  "vaalmoltenstrike": { tw: "瓦爾．熔岩之擊", cn: "瓦尔：熔岩之击" }, // Vaal Molten Strike
  "vaalreap": { tw: "瓦爾．收割", cn: "瓦尔：绝命之镰" }, // Vaal Reap
  "vaalvitality": { tw: "瓦爾．活力", cn: "瓦尔：活力" }, // Vaal Vitality
  "venomgyre": { tw: "猛毒迴旋", cn: "剧毒旋风" }, // Venom Gyre
  "vigilantstrike": { tw: "戒備打擊", cn: "戒备打击" }, // Vigilant Strike
  "viperstrike": { tw: "毒蛇打擊", cn: "毒蛇打击" }, // Viper Strike
  "vitality": { tw: "活力", cn: "活力" }, // Vitality
  "voidsphere": { tw: "虛無玉", cn: "虚空法球" }, // Void Sphere
  "volcanicfissureofsnaking": { tw: "炎火脈動．蜿蜒", cn: "蜿蜒之火山裂缝" }, // Volcanic Fissure of Snaking
  "voltaxicburst": { tw: "魔痕爆發", cn: "雷电魔爆" }, // Voltaxic Burst
  "vortex": { tw: "漩渦", cn: "漩涡" }, // Vortex
  "waveofconviction": { tw: "信念浪湧", cn: "定罪波" }, // Wave of Conviction
  "waveofconvictionoftrarthus": { tw: "特拉特斯信念浪湧", cn: "特拉特斯之定罪波" }, // Wave of Conviction of Trarthus
  "whirlingblades": { tw: "迴旋之刃", cn: "回旋之刃" }, // Whirling Blades
  "withertotem": { tw: "凋零圖騰", cn: "凋零图腾" }, // Wither Totem
  "witheringstep": { tw: "凋零之步", cn: "凋零步" }, // Withering Step
  "wrath": { tw: "暴怒", cn: "雷霆" }, // Wrath
  "zealotry": { tw: "狂熱", cn: "奋锐光环" }, // Zealotry
}

// Fallback support-quality labels (used only if the 傭兵 stat group hasn't loaded).
export const MERCENARY_SUPPORT_TW: Record<string, string> = {
  "Area of Effect": "效果範圍",
  "Increased Area of Effect": "增加效果範圍",
  "Faster Casting": "快速施放",
  "Faster Attacks": "快速攻擊",
  "Elemental Focus": "元素專注",
  "More Duration": "更多持續時間",
  "Elemental Damage with Attacks": "元素攻擊傷害",
  "Added Lightning": "附加閃電",
  "Added Cold": "附加冰冷",
  "Critical Damage": "暴擊傷害",
  "Critical Chance": "暴擊率",
  "Cooldown Recovery": "冷卻時間恢復",
}
