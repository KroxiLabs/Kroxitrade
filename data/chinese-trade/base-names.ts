/**
 * Curated base-item names for both Chinese variants.
 *
 * Some item bases — Torment talismans, and newer bases such as Simplex /
 * Focused Amulet — are not present in Taiwan Trade data. The runtime pairing
 * cannot derive them, so this map provides the bilingual item-search fallback.
 *
 * Keys are normalized English names (lowercase alphanumerics only).
 */
export const BASE_NAMES_TW: Record<string, string> = {
  "sanctumarchivesresearch": "聖域文檔研究", // Sanctum Archives Research
  "sanctumvaultsresearch": "聖域寶庫研究", // Sanctum Vaults Research
  "sanctumcathedralresearch": "聖域教堂研究", // Sanctum Cathedral Research
  "sanctumnecropolisresearch": "聖域墓場研究", // Sanctum Necropolis Research
  "forbiddentome": "禁忌之書", // Forbidden Tome
  "assembledeyejewel": "拼湊之眼珠寶", // Assembled Eye Jewel
  "chronicleofatzoatl": "阿茲瓦特史記", // Chronicle of Atzoatl
  "mirroredtablet": "鏡像碑牌", // Mirrored Tablet
  "chayulasbreachstone": "夏烏拉裂痕石", // Chayula's Breachstone
  "chayulasflawlessbreachstone": "夏烏拉無暇裂痕石", // Chayula's Flawless Breachstone
  "tulsbreachstone": "托沃裂痕石", // Tul's Breachstone
  "tulsflawlessbreachstone": "托沃無暇裂痕石", // Tul's Flawless Breachstone
  "xophsbreachstone": "索伏裂痕石", // Xoph's Breachstone
  "xophsflawlessbreachstone": "索伏無暇裂痕石", // Xoph's Flawless Breachstone
  "eshsbreachstone": "艾許裂痕石", // Esh's Breachstone
  "eshsflawlessbreachstone": "艾許無暇裂痕石", // Esh's Flawless Breachstone
  "uulnetolsbreachstone": "烏爾尼多裂痕石", // Uul-Netol's Breachstone
  "uulnetolsflawlessbreachstone": "烏爾尼多無暇裂痕石", // Uul-Netol's Flawless Breachstone
  "eberskey": "希伯之鑰", // Eber's Key
  "yrielskey": "伊瑞之鑰", // Yriel's Key
  "inyaskey": "茵雅之鑰", // Inya's Key
  "volkuurskey": "福庫爾之鑰", // Volkuur's Key
  "mercenarywarrant": "傭兵契約書", // Mercenary Warrant
  "bloodfilledvessel": "浸血碑器", // Blood-filled Vessel
  "farriclure": "費爾羅誘餌", // Farric Lure
  "saqawinelure": "斯卡沃誘餌", // Saqawine Lure
  "fenumallure": "菲恩絲誘餌", // Fenumal Lure
  "craiciclure": "奎爾珊誘餌", // Craicic Lure
  "gouger": "穿體鑿", // Gouger
  "tigerspaw": "虎爪刃", // Tiger's Paw
  "prehistoricclaw": "史前戰爪", // Prehistoric Claw
  "nobleclaw": "貴族戰爪", // Noble Claw
  "eagleclaw": "鷹爪刃", // Eagle Claw
  "greatwhiteclaw": "白靈之爪", // Great White Claw
  "sharktoothclaw": "鯊顎爪", // Sharktooth Claw
  "catspaw": "貓爪刃", // Cat's Paw
  "sparklingclaw": "眩目爪刃", // Sparkling Claw
  "shadowfangs": "暗影獠牙", // Shadow Fangs
  "malignfangs": "邪惡獠牙", // Malign Fangs
  "voidfangs": "虛空獠牙", // Void Fangs
  "doubleclaw": "雙刃爪", // Double Claw
  "twinclaw": "重刃爪", // Twin Claw
  "geminiclaw": "雙子戰爪", // Gemini Claw
  "butcherknife": "屠夫刀", // Butcher Knife
  "poignard": "奪命刺", // Poignard
  "goldenkris": "金耀波刃", // Golden Kris
  "guttingknife": "重傷短刀", // Gutting Knife
  "carvingknife": "雕刻刀", // Carving Knife
  "copperkris": "銅器波刃", // Copper Kris
  "skean": "雙刃匕", // Skean
  "impdagger": "妖邪短匕", // Imp Dagger
  "hollowpointdagger": "簍空短匕", // Hollowpoint Dagger
  "pressuriseddagger": "高壓短匕", // Pressurised Dagger
  "pneumaticdagger": "魂靈短匕", // Pneumatic Dagger
  "prongdagger": "尖耙短匕", // Prong Dagger
  "trisula": "三叉短匕", // Trisula
  "sai": "戰叉", // Sai
  "flickerflameblade": "閃火之刃", // Flickerflame Blade
  "flashfireblade": "瞬炎之刃", // Flashfire Blade
  "infernalblade": "煉獄之刃", // Infernal Blade
  "wristchopper": "斷腕之刃", // Wrist Chopper
  "waraxe": "行軍斧", // War Axe
  "chestsplitter": "開膛利刃", // Chest Splitter
  "ceremonialaxe": "血儀之斧", // Ceremonial Axe
  "wraithaxe": "凶靈之斧", // Wraith Axe
  "karuiaxe": "卡魯古斧", // Karui Axe
  "reaveraxe": "殘暴之斧", // Reaver Axe
  "boardingaxe": "萬用手斧", // Boarding Axe
  "broadaxe": "闊斧", // Broad Axe
  "armingaxe": "長柄斧", // Arming Axe
  "jasperaxe": "靈玉斧", // Jasper Axe
  "maltreatmentaxe": "肆虐之斧", // Maltreatment Axe
  "disapprobationaxe": "駁斥之斧", // Disapprobation Axe
  "psychoticaxe": "神亂之斧", // Psychotic Axe
  "etchedhatchet": "蝕刻戰斧", // Etched Hatchet
  "engravedhatchet": "雕文戰斧", // Engraved Hatchet
  "runichatchet": "密文之斧", // Runic Hatchet
  "barbedclub": "銳刺木棒", // Barbed Club
  "battlehammer": "強化戰錘", // Battle Hammer
  "flangedmace": "護體之錘", // Flanged Mace
  "ancestralclub": "祖靈之杵", // Ancestral Club
  "tenderizer": "裂肉之錘", // Tenderizer
  "legionhammer": "軍團之錘", // Legion Hammer
  "tribalclub": "祭儀之杵", // Tribal Club
  "pernach": "鋒刃重錘", // Pernach
  "stonehammer": "石錘", // Stone Hammer

  "bladedmace": "多刃錘", // Bladed Mace
  "ceremonialmace": "祭禮之錘", // Ceremonial Mace
  "petrifiedclub": "堅石木棒", // Petrified Club
  "flaremace": "閃耀之錘", // Flare Mace
  "crackmace": "碎裂之錘", // Crack Mace
  "boommace": "爆裂之錘", // Boom Mace
  "wyrmmace": "古龍之錘", // Wyrm Mace
  "dragonmace": "龍之錘", // Dragon Mace
  "behemothmace": "巴哈姆特", // Behemoth Mace
  "driftwoodsceptre": "朽木權杖", // Driftwood Sceptre
  "sekhem": "威能權杖", // Sekhem
  "leadsceptre": "鉛鑄權杖", // Lead Sceptre
  "abyssalsceptre": "深淵權杖", // Abyssal Sceptre
  "darkwoodsceptre": "烏木權杖", // Darkwood Sceptre
  "quartzsceptre": "石英權杖", // Quartz Sceptre
  "ochresceptre": "赤色權杖", // Ochre Sceptre
  "oscillatingsceptre": "猶疑權杖", // Oscillating Sceptre
  "stabilisingsceptre": "安定權杖", // Stabilising Sceptre
  "alternatingsceptre": "輪迴權杖", // Alternating Sceptre
  "hornedsceptre": "犄角權杖", // Horned Sceptre
  "stagsceptre": "靈鹿權杖", // Stag Sceptre
  "sambarsceptre": "惡魔權杖", // Sambar Sceptre
  "baselard": "冷光長劍", // Baselard
  "battlesword": "士兵長劍", // Battle Sword
  "coppersword": "青銅短劍", // Copper Sword
  "broadsword": "闊劍", // Broad Sword
  "ancientsword": "遠古之劍", // Ancient Sword
  "ficklespiritblade": "非命魂刃", // Fickle Spiritblade
  "capriciousspiritblade": "怪談魂刃", // Capricious Spiritblade
  "anarchicspiritblade": "翻天魂刃", // Anarchic Spiritblade
  "hooksword": "鉤爪劍", // Hook Sword
  "grappler": "抓鉤", // Grappler
  "tigerhook": "虎鉤", // Tiger Hook
  "rustedspike": "鏽刺劍", // Rusted Spike
  "burnishedfoil": "冷芒刺劍", // Burnished Foil
  "serratedfoil": "鋸齒細劍", // Serrated Foil
  "primevalrapier": "古典刺劍", // Primeval Rapier
  "fancyfoil": "華麗陪襯", // Fancy Foil
  "apexrapier": "銳鋒細劍", // Apex Rapier
  "dragonbonerapier": "龍骨細劍", // Dragonbone Rapier
  "temperedfoil": "強化細劍", // Tempered Foil
  "pecoraro": "寒光刺劍", // Pecoraro
  "spiraledfoil": "螺紋細劍", // Spiraled Foil
  "harpyrapier": "魔喙細劍", // Harpy Rapier
  "batteredfoil": "鈍刃細劍", // Battered Foil
  "thornrapier": "棘刺細劍", // Thorn Rapier
  "wyrmbonerapier": "龍骨細劍", // Wyrmbone Rapier
  "smallsword": "小劍", // Smallsword
  "courtesansword": "花魁之劍", // Courtesan Sword
  "dragoonsword": "騎兵軍刀", // Dragoon Sword
  "coiledwand": "纏繞法杖", // Coiled Wand
  "assemblerwand": "拼裝法杖", // Assembler Wand
  "congregatorwand": "匯能法杖", // Congregator Wand
  "accumulatorwand": "蓄能法杖", // Accumulator Wand
  "heathenwand": "異徒法杖", // Heathen Wand
  "profanewand": "褻瀆法杖", // Profane Wand
  "conveningwand": "召集法杖", // Convening Wand
  "decurvebow": "直弓", // Decurve Bow
  "compoundbow": "複合弓", // Compound Bow
  "sniperbow": "狙殺弓", // Sniper Bow
  "ivorybow": "象牙弓", // Ivory Bow
  "highbornbow": "貴族之弓", // Highborn Bow
  "thicketbow": "林野獵弓", // Thicket Bow
  "compositebow": "合成弓", // Composite Bow
  "grovebow": "叢林獵弓", // Grove Bow
  "hedronbow": "海德隆之弓", // Hedron Bow
  "foundrybow": "鑄造之弓", // Foundry Bow
  "solarinebow": "日耀之弓", // Solarine Bow
  "reflexbow": "反射弓", // Reflex Bow
  "primitivestaff": "粗製長杖", // Primitive Staff
  "woodfulstaff": "堅木長杖", // Woodful Staff
  "transformerstaff": "變形長杖", // Transformer Staff
  "reciprocationstaff": "鐘擺長杖", // Reciprocation Staff
  "batterystaff": "蓄能長杖", // Battery Staff
  "crescentstaff": "新月長杖", // Crescent Staff
  "moonstaff": "月神長杖", // Moon Staff
  "eclipsestaff": "月蝕長杖", // Eclipse Staff
  "capacityrod": "才能長桿", // Capacity Rod
  "potentialityrod": "潛能長桿", // Potentiality Rod
  "eventualityrod": "萬能長桿", // Eventuality Rod
  "stoneaxe": "石斧", // Stone Axe
  "nobleaxe": "權貴巨斧", // Noble Axe
  "jadechopper": "碎玉大斧", // Jade Chopper
  "doubleaxe": "雙刃巨斧", // Double Axe
  "gildedaxe": "金柄之斧", // Gilded Axe
  "timberaxe": "裂木巨斧", // Timber Axe
  "primecleaver": "原始砍斧", // Prime Cleaver
  "honedcleaver": "珩磨砍斧", // Honed Cleaver
  "apexcleaver": "巔峰砍斧", // Apex Cleaver
  "daggeraxe": "匕斧", // Dagger Axe
  "talonaxe": "猛禽爪斧", // Talon Axe
  "driftwoodmaul": "朽木巨錘", // Driftwood Maul
  "spinymaul": "凶刺巨錘", // Spiny Maul
  "platedmaul": "華麗重錘", // Plated Maul
  "colossusmallet": "巨型重錘", // Colossus Mallet
  "tribalmaul": "祭儀巨錘", // Tribal Maul
  "mallet": "千斤錘", // Mallet
  "frightmaul": "恐懼重錘", // Fright Maul
  "totemicmaul": "圖騰巨錘", // Totemic Maul
  "bluntforcecondenser": "鈍擊力凝聚錘", // Blunt Force Condenser

  "crushingforcemagnifier": "粉碎力增幅錘", // Crushing Force Magnifier
  "impactforcepropagator": "衝擊力擴散錘", // Impact Force Propagator
  "morningstar": "晨星", // Morning Star
  "solarmaul": "日光錘", // Solar Maul
  "wraithsword": "凶靈巨劍", // Wraith Sword
  "headmanssword": "行刑巨劍", // Headman's Sword
  "vaalgreatsword": "瓦爾巨劍", // Vaal Greatsword
  "longsword": "大劍", // Longsword
  "twohandedsword": "雙手劍", // Two-Handed Sword
  "spectralsword": "幽魂巨劍", // Spectral Sword
  "butchersword": "殺戮巨劍", // Butcher Sword
  "footmansword": "士兵巨劍", // Footman Sword
  "rebukingblade": "鞭策之刃", // Rebuking Blade
  "blastingblade": "爆破之刃", // Blasting Blade
  "banishingblade": "放逐之刃", // Banishing Blade
  "curvedblade": "彎刃", // Curved Blade
  "litheblade": "細刃", // Lithe Blade
  "goldenmantle": "黃金戰甲", // Golden Mantle
  "shabbyjerkin": "破舊外套", // Shabby Jerkin
  "gloriousleather": "榮耀皮甲", // Glorious Leather
  "supremeleather": "至高皮甲", // Supreme Leather
  "astralleather": "星際皮甲", // Astral Leather
  "syndicatesgarb": "密教束衣", // Syndicate's Garb
  "fullleather": "連身皮甲", // Full Leather
  "thiefsgarb": "竊賊之裝", // Thief's Garb
  "eelskintunic": "鰻皮之衣", // Eelskin Tunic
  "frontierleather": "邊戍皮甲", // Frontier Leather
  "paddedvest": "薄襯衣", // Padded Vest
  "crimsonraiment": "緋紅之衣", // Crimson Raiment
  "cryptarmour": "地穴戰甲", // Crypt Armour
  "sanguineraiment": "樂觀之衣", // Sanguine Raiment
  "oiledvest": "防水背心", // Oiled Vest
  "necroticarmour": "亡者護甲", // Necrotic Armour
  "paddedjacket": "長袖棉襖", // Padded Jacket
  "oiledcoat": "防水外衣", // Oiled Coat
  "scarletraiment": "熾紅之衣", // Scarlet Raiment
  "quiltedjacket": "菱紋外衣", // Quilted Jacket
  "sleekcoat": "滑布外套", // Sleek Coat
  "conjurersvestment": "咒者長衣", // Conjurer's Vestment
  "arcanevestment": "奧術長衣", // Arcane Vestment
  "nightweaverobe": "夜織之袍", // Nightweave Robe
  "twilightregalia": "暮光法衣", // Twilight Regalia
  "silkengarb": "絲綢之衣", // Silken Garb
  "magesvestment": "博學長衣", // Mage's Vestment
  "silkrobe": "絲質之袍", // Silk Robe
  "silkenwrap": "絲絨背心", // Silken Wrap
  "sunplate": "日光之鎧", // Sun Plate
  "titanplate": "泰坦之鎧", // Titan Plate
  "legionplate": "戰亂之鎧", // Legion Plate
  "chestplate": "胸甲", // Chestplate
  "royalplate": "皇家之鎧", // Royal Plate
  "warplate": "戰爭之鎧", // War Plate
  "fullplate": "連身鎧甲", // Full Plate
  "arenaplate": "鬥者之鎧", // Arena Plate
  "lordlyplate": "領主護鎧", // Lordly Plate
  "bronzeplate": "青銅鎧甲", // Bronze Plate
  "battleplate": "戰鎧", // Battle Plate
  "scalevest": "細鱗背心", // Scale Vest
  "commandersbrigandine": "指揮者鎖甲", // Commander's Brigandine
  "battlelamellar": "爭戰鱗甲", // Battle Lamellar
  "dragonscaledoublet": "龍鱗護甲", // Dragonscale Doublet
  "fullwyvernscale": "全套龍鱗甲", // Full Wyvernscale
  "marshallsbrigandine": "元帥鎧甲", // Marshall's Brigandine
  "lightbrigandine": "輕鎖甲", // Light Brigandine
  "conquestlamellar": "征戰薄甲", // Conquest Lamellar
  "scaledoublet": "合身鱗甲", // Scale Doublet
  "infantrybrigandine": "步兵鎖甲", // Infantry Brigandine
  "soldiersbrigandine": "戰士鎖甲", // Soldier's Brigandine
  "fieldlamellar": "野戰薄甲", // Field Lamellar
  "hussarbrigandine": "輕騎鎖甲", // Hussar Brigandine
  "graspingmail": "貪婪鎧甲", // Grasping Mail
  "chainmailvest": "鎖鏈背心", // Chainmail Vest
  "chainhauberk": "鎖子長甲", // Chain Hauberk
  "grandringmail": "宏偉環甲", // Grand Ringmail
  "paladinshauberk": "聖騎士長甲", // Paladin's Hauberk
  "chainmailtunic": "鏈甲外衣", // Chainmail Tunic
  "sacredchainmail": "神聖鎖甲", // Sacred Chainmail
  "ringmailcoat": "環甲外套", // Ringmail Coat
  "chainmaildoublet": "護體鎖甲", // Chainmail Doublet
  "fullringmail": "連身環甲", // Full Ringmail
  "fullchainmail": "連身鎖甲", // Full Chainmail
  "goldencaligae": "黃金纏鞋", // Golden Caligae
  "harpyskinboots": "妖羽皮短靴", // Harpyskin Boots
  "wrappedboots": "裹趾涼鞋", // Wrapped Boots
  "infiltratorboots": "滲透者長靴", // Infiltrator Boots
  "phantomboots": "魅影長靴", // Phantom Boots
  "ambushboots": "伏擊之靴", // Ambush Boots
  "cloudwhisperboots": "雲語短靴", // Cloudwhisper Boots
  "windbreakboots": "風帳短靴", // Windbreak Boots
  "stormriderboots": "風暴者短靴", // Stormrider Boots
  "runicgreaves": "魔符脛甲", // Runic Greaves
  "sageslippers": "哲人便鞋", // Sage Slippers
  "samiteslippers": "繡布便鞋", // Samite Slippers
  "duskwalkslippers": "暮色之行便鞋", // Duskwalk Slippers
  "nightwindslippers": "黑夜之風便鞋", // Nightwind Slippers
  "dreamquestslippers": "幻夢之尋便鞋", // Dreamquest Slippers
  "irongreaves": "鐵鍛脛甲", // Iron Greaves
  "precursorgreaves": "先行者脛甲", // Precursor Greaves
  "steelgreaves": "冷鋼脛甲", // Steel Greaves
  "wyvernscaleboots": "飛龍鱗長靴", // Wyvernscale Boots

  "steelscaleboots": "鋼影長靴", // Steelscale Boots
  "chimerascaleboots": "龍蜥鱗長靴", // Chimerascale Boots
  "chainboots": "鏈甲長靴", // Chain Boots
  "paladinboots": "聖騎士長靴", // Paladin Boots
  "ringmailboots": "環甲筒靴", // Ringmail Boots
  "zealotboots": "狂熱者長靴", // Zealot Boots
  "martyrboots": "烈士長靴", // Martyr Boots
  "basemetaltreads": "金屬鐵靴", // Basemetal Treads
  "darksteeltreads": "暗鋼鐵靴", // Darksteel Treads
  "brimstonetreads": "硫磺鐵靴", // Brimstone Treads
  "grippedgloves": "擒拿手套", // Gripped Gloves
  "apothecarysgloves": "靈藥手套", // Apothecary's Gloves
  "goldenbracers": "黃金臂甲", // Golden Bracers
  "rawhidegloves": "生皮手套", // Rawhide Gloves
  "harpyskingloves": "妖羽皮手套", // Harpyskin Gloves
  "velourgloves": "絲絨手套", // Velour Gloves
  "sharkskingloves": "鯊皮手套", // Sharkskin Gloves
  "stealthgloves": "匿蹤手套", // Stealth Gloves
  "phantommitts": "魅影護手", // Phantom Mitts
  "trappermitts": "獵人護手", // Trapper Mitts
  "infiltratormitts": "滲透者護手", // Infiltrator Mitts
  "tinkergloves": "修補匠手套", // Tinker Gloves
  "apprenticegloves": "學徒手套", // Apprentice Gloves
  "trapsettergloves": "設陷者手套", // Trapsetter Gloves
  "runicgloves": "魔符手套", // Runic Gloves
  "sagegloves": "哲人手套", // Sage Gloves
  "leylinegloves": "荒野手套", // Leyline Gloves
  "aetherwindgloves": "乙太之風手套", // Aetherwind Gloves
  "nexusgloves": "核心手套", // Nexus Gloves
  "precursorgauntlets": "先行者護手", // Precursor Gauntlets
  "leviathangauntlets": "海獸護手", // Leviathan Gauntlets
  "platedgauntlets": "堅鐵護手", // Plated Gauntlets
  "fishscalegauntlets": "魚鱗手套", // Fishscale Gauntlets
  "wyvernscalegauntlets": "飛龍鱗護手", // Wyvernscale Gauntlets
  "chimerascalegauntlets": "龍蜥鱗護手", // Chimerascale Gauntlets
  "paladingloves": "聖騎士手套", // Paladin Gloves
  "ringmailgloves": "環甲手套", // Ringmail Gloves
  "preservinggauntlets": "庇護手套", // Preserving Gauntlets
  "guardinggauntlets": "保衛手套", // Guarding Gauntlets
  "thwartinggauntlets": "阻擾手套", // Thwarting Gauntlets
  "goldenvisage": "黃金頭飾", // Golden Visage
  "direpelt": "恐懼皮盔", // Dire Pelt
  "grizzlypelt": "灰熊皮盔", // Grizzly Pelt
  "majesticpelt": "莊嚴皮盔", // Majestic Pelt
  "hunterhood": "獵者之兜", // Hunter Hood
  "nobletricorne": "貴族三角帽", // Noble Tricorne
  "scaremask": "幽懼之面", // Scare Mask
  "jestermask": "小丑面具", // Jester Mask
  "ancientmask": "遠古面具", // Ancient Mask
  "torturersmask": "刑求面具", // Torturer's Mask
  "galecrown": "颶風之冠", // Gale Crown
  "wintercrown": "凜冬之冠", // Winter Crown
  "blizzardcrown": "暴雪之冠", // Blizzard Crown
  "runiccrest": "魔符之冠", // Runic Crest
  "moonlitcirclet": "月光之冠", // Moonlit Circlet
  "sunfirecirclet": "陽炎之冠", // Sunfire Circlet
  "torturecage": "刑罰頭籠", // Torture Cage
  "generalshelmet": "將軍的頭盔", // General's Helmet
  "conquerorshelmet": "征服者的頭盔", // Conqueror's Helmet
  "giantslayerhelmet": "巨人殺手頭盔", // Giantslayer Helmet
  "conehelmet": "錐頂盔", // Cone Helmet
  "gladiatorhelmet": "角鬥者之盔", // Gladiator Helmet
  "batteredhelm": "殘破之盔", // Battered Helm
  "knighthelm": "騎士之盔", // Knight Helm
  "conquesthelmet": "征戰頭盔", // Conquest Helmet
  "hauntedbascinet": "鬧鬼戰盔", // Haunted Bascinet
  "sallet": "輕鐵護盔", // Sallet
  "sorrowmask": "悲鳴面具", // Sorrow Mask
  "atonementmask": "贖罪面具", // Atonement Mask
  "penitentmask": "懺悔面具", // Penitent Mask
  "rustedcoif": "鏽鐵鏈盔", // Rusted Coif
  "divinecrown": "神聖之冠", // Divine Crown
  "impcrown": "妖怪邪冠", // Imp Crown
  "demoncrown": "惡魔邪冠", // Demon Crown
  "archdemoncrown": "罪魔邪冠", // Archdemon Crown
  "goldenwreath": "金黃花環", // Golden Wreath
  "goldenflame": "黃金聖炎", // Golden Flame
  "battlebuckler": "鬥者輕盾", // Battle Buckler
  "crusaderbuckler": "聖戰輕盾", // Crusader Buckler
  "imperialbuckler": "帝國輕盾", // Imperial Buckler
  "hammeredbuckler": "鉚釘輕盾", // Hammered Buckler
  "gildedbuckler": "金面輕盾", // Gilded Buckler
  "oakbuckler": "橡木輕盾", // Oak Buckler
  "endothermicbuckler": "熱力輕盾", // Endothermic Buckler
  "polarbuckler": "極地輕盾", // Polar Buckler
  "coldattunedbuckler": "冷調輕盾", // Cold-attuned Buckler
  "spikedbundle": "尖木刺盾", // Spiked Bundle
  "alderspikedshield": "榿木刺盾", // Alder Spiked Shield
  "driftwoodspikedshield": "朽木刺盾", // Driftwood Spiked Shield
  "alloyedspikedshield": "合金刺盾", // Alloyed Spiked Shield
  "ornatespikedshield": "華麗刺盾", // Ornate Spiked Shield
  "redwoodspikedshield": "紅木刺盾", // Redwood Spiked Shield
  "twigspiritshield": "殘枝魔盾", // Twig Spirit Shield
  "yewspiritshield": "紫衫魔盾", // Yew Spirit Shield
  "walnutspiritshield": "桃木魔盾", // Walnut Spirit Shield
  "exhaustingspiritshield": "力竭魔盾", // Exhausting Spirit Shield
  "subsumingspiritshield": "靈吸魔盾", // Subsuming Spirit Shield
  "transferattunedspiritshield": "調和魔盾", // Transfer-attuned Spirit Shield
  "splinteredtowershield": "朽木塔盾", // Splintered Tower Shield
  "bronzetowershield": "青銅塔盾", // Bronze Tower Shield

  "crestedtowershield": "榮冠塔盾", // Crested Tower Shield
  "shagreentowershield": "粗革塔盾", // Shagreen Tower Shield
  "corrodedtowershield": "斑駁塔盾", // Corroded Tower Shield
  "coppertowershield": "銅鍛塔盾", // Copper Tower Shield
  "buckskintowershield": "鹿皮塔盾", // Buckskin Tower Shield
  "mahoganytowershield": "桃木塔盾", // Mahogany Tower Shield
  "firroundshield": "杉木圓盾", // Fir Round Shield
  "scarletroundshield": "熾紅圓盾", // Scarlet Round Shield
  "splendidroundshield": "光輝圓盾", // Splendid Round Shield
  "spikedroundshield": "尖刺圓盾", // Spiked Round Shield
  "exothermictowershield": "熱氣塔盾", // Exothermic Tower Shield
  "magmatictowershield": "熔岩塔盾", // Magmatic Tower Shield
  "heatattunedtowershield": "熱調塔盾", // Heat-attuned Tower Shield
  "lindenkiteshield": "椴木鳶盾", // Linden Kite Shield
  "reinforcedkiteshield": "強化鳶盾", // Reinforced Kite Shield
  "layeredkiteshield": "層板鳶盾", // Layered Kite Shield
  "ceremonialkiteshield": "祭儀鳶盾", // Ceremonial Kite Shield
  "etchedkiteshield": "刻文鳶盾", // Etched Kite Shield
  "angelickiteshield": "天使鳶盾", // Angelic Kite Shield
  "artilleryquiver": "火炮箭袋", // Artillery Quiver
  "simplexamulet": "簡純護身符", // Simplex Amulet
  "focusedamulet": "專注護身符", // Focused Amulet
  "mandibletalisman": "巨顎魔符", // Mandible Talisman
  "chrysalistalisman": "蟲蛹魔符", // Chrysalis Talisman
  "writhingtalisman": "狂癲魔符", // Writhing Talisman
  "bonespiretalisman": "脊骨魔符", // Bonespire Talisman
  "ashscaletalisman": "灰燼魔符", // Ashscale Talisman
  "loneantlertalisman": "孤角魔符", // Lone Antler Talisman
  "deeponetalisman": "深淵魔符", // Deep One Talisman
  "breakribtalisman": "碎骨魔符", // Breakrib Talisman
  "deadhandtalisman": "亡手魔符", // Deadhand Talisman
  "undyingfleshtalisman": "不朽魔符", // Undying Flesh Talisman
  "rotheadtalisman": "腐首魔符", // Rot Head Talisman
  "hexclawtalisman": "幻爪魔符", // Hexclaw Talisman
  "primalskulltalisman": "皇骨魔符", // Primal Skull Talisman
  "splitnewttalisman": "斷螈魔符", // Splitnewt Talisman
  "aviantwinstalisman": "雙子魔符", // Avian Twins Talisman
  "fangjawtalisman": "齒鯊魔符", // Fangjaw Talisman
  "hornedtalisman": "尖角魔符", // Horned Talisman
  "spinefusetalisman": "潛能魔符", // Spinefuse Talisman
  "threerattalisman": "三鼠魔符", // Three Rat Talisman
  "monkeytwinstalisman": "雙猴魔符", // Monkey Twins Talisman
  "longtoothtalisman": "長牙魔符", // Longtooth Talisman
  "monkeypawtalisman": "猴掌魔符", // Monkey Paw Talisman
  "threehandstalisman": "三手魔符", // Three Hands Talisman
  "gargantuantalisman": "龐然魔符", // Gargantuan Talisman
  "saqawinetalisman": "斯卡沃魔符", // Saqawine Talisman
  "craicictalisman": "奎爾珊魔符", // Craicic Talisman
  "fenumaltalisman": "菲恩絲魔符", // Fenumal Talisman
  "farrictalisman": "費爾羅魔符", // Farric Talisman
  "taurustalisman": "金牛人魔符", // Taurus Talisman
  "carrionqueentalisman": "食腐蟲后魔符", // Carrion Queen Talisman
  "chieftaintalisman": "酋長魔符", // Chieftain Talisman
  "savagecrabtalisman": "殘暴蟹魔符", // Savage Crab Talisman
  "spidercrabtalisman": "蛛蛛蟹魔符", // Spider Crab Talisman
  "devourertalisman": "吞噬者魔符", // Devourer Talisman
  "cobratalisman": "眼鏡蛇魔符", // Cobra Talisman
  "greatmawtalisman": "巨口魔符", // Great Maw Talisman
  "croakertalisman": "鳴蛙魔符", // Croaker Talisman
  "goatmantalisman": "羊人魔符", // Goatman Talisman
  "flamehelliontalisman": "烈炎地獄犬魔符", // Flame Hellion Talisman
  "frosthelliontalisman": "冰霜犬魔符", // Frost Hellion Talisman
  "magmahoundtalisman": "熔犬魔符", // Magma Hound Talisman
  "chimeraltalisman": "龍蜥魔符", // Chimeral Talisman
  "retchtalisman": "反芻鳥魔符", // Retch Talisman
  "lynxtalisman": "山貓魔符", // Lynx Talisman
  "apetalisman": "靈猴魔符", // Ape Talisman
  "octopustalisman": "章魚魔符", // Octopus Talisman
  "pitbulltalisman": "鬥牛犬魔符", // Pitbull Talisman
  "plaguedarachnidtalisman": "瘟疫毒蛛魔符", // Plagued Arachnid Talisman
  "hybridarachnidtalisman": "混血蜘蛛魔符", // Hybrid Arachnid Talisman
  "rhoatalisman": "恐喙鳥魔符", // Rhoa Talisman
  "scrabblertalisman": "搗亂者魔符", // Scrabbler Talisman
  "bloodvipertalisman": "血蛇魔符", // Blood Viper Talisman
  "sandspittertalisman": "噴砂爪蟹魔符", // Sand Spitter Talisman
  "scorpiontalisman": "毒蠍魔符", // Scorpion Talisman
  "squidtalisman": "烏賊魔符", // Squid Talisman
  "blackwidowtalisman": "黑寡婦魔符", // Black Widow Talisman
  "goliathtalisman": "巨人魔符", // Goliath Talisman
  "watchertalisman": "觀察者魔符", // Watcher Talisman
  "tigertalisman": "猛虎魔符", // Tiger Talisman
  "ursatalisman": "墮落之爪魔符", // Ursa Talisman
  "vulturetalisman": "禿鷹魔符", // Vulture Talisman
  "goldenobi": "金羽腰帶", // Golden Obi
  "microdistillerybelt": "微釀腰帶", // Micro-Distillery Belt
  "mechalarmbelt": "機械腰帶", // Mechalarm Belt
  "cordbelt": "繩帶", // Cord Belt
  "breachring": "裂痕戒指", // Breach Ring
  "ceruleanring": "碧藍戒指", // Cerulean Ring
  "iolitering": "混青石戒指", // Iolite Ring
  "goldenhoop": "金環", // Golden Hoop
  "cogworkring": "齒輪戒指", // Cogwork Ring
  "geodesicring": "大地戒指", // Geodesic Ring
  "compositering": "複合戒指", // Composite Ring
  "manifoldring": "孔洞戒指", // Manifold Ring
  "ratchetingring": "荊棘戒指", // Ratcheting Ring
  "helicalring": "螺旋戒指", // Helical Ring
  "duskring": "幽暗戒指", // Dusk Ring
  "penumbraring": "半影戒指", // Penumbra Ring
  "gloamring": "黃昏戒指", // Gloam Ring

  "tenebrousring": "黑暗戒指", // Tenebrous Ring
  "shadowedring": "暗影戒指", // Shadowed Ring
}

export const BASE_NAMES_CN: Record<string, string> = {
  "sanctumarchivesresearch": "禁域档案室研究", // Sanctum Archives Research
  "sanctumvaultsresearch": "禁域宝库研究", // Sanctum Vaults Research
  "sanctumcathedralresearch": "禁域教堂研究", // Sanctum Cathedral Research
  "sanctumnecropolisresearch": "禁域墓场研究", // Sanctum Necropolis Research
  "forbiddentome": "禁域典籍", // Forbidden Tome
  "assembledeyejewel": "聚合之凝珠宝", // Assembled Eye Jewel
  "chronicleofatzoatl": "阿佐亚特编年史", // Chronicle of Atzoatl
  "mirroredtablet": "镜像桌台", // Mirrored Tablet
  "chayulasbreachstone": "夏乌拉裂隙石", // Chayula's Breachstone
  "chayulasflawlessbreachstone": "夏乌拉的无暇裂隙石", // Chayula's Flawless Breachstone
  "tulsbreachstone": "托沃裂隙石", // Tul's Breachstone
  "tulsflawlessbreachstone": "托沃的无暇裂隙石", // Tul's Flawless Breachstone
  "xophsbreachstone": "索伏裂隙石", // Xoph's Breachstone
  "xophsflawlessbreachstone": "索伏的无暇裂隙石", // Xoph's Flawless Breachstone
  "eshsbreachstone": "艾许裂隙石", // Esh's Breachstone
  "eshsflawlessbreachstone": "艾许的无暇裂隙石", // Esh's Flawless Breachstone
  "uulnetolsbreachstone": "乌尔尼多裂隙石", // Uul-Netol's Breachstone
  "uulnetolsflawlessbreachstone": "乌尔尼多的无暇裂隙石", // Uul-Netol's Flawless Breachstone
  "eberskey": "依波之钥", // Eber's Key
  "yrielskey": "亚瑞尔之钥", // Yriel's Key
  "inyaskey": "尹亚之钥", // Inya's Key
  "volkuurskey": "福库尔之钥", // Volkuur's Key
  "mercenarywarrant": "佣兵凭证", // Mercenary Warrant
  "bloodfilledvessel": "浸血法器", // Blood-filled Vessel
  "farriclure": "大地之诱", // Farric Lure
  "saqawinelure": "苍空之诱", // Saqawine Lure
  "fenumallure": "暗夜之诱", // Fenumal Lure
  "craiciclure": "深海之诱", // Craicic Lure
  "gouger": "穿体凿", // Gouger
  "tigerspaw": "虎爪刃", // Tiger's Paw
  "prehistoricclaw": "史前战爪", // Prehistoric Claw
  "nobleclaw": "贵族战爪", // Noble Claw
  "eagleclaw": "鹰爪刃", // Eagle Claw
  "greatwhiteclaw": "白灵之爪", // Great White Claw
  "sharktoothclaw": "鲨颚爪", // Sharktooth Claw
  "catspaw": "猫爪刃", // Cat's Paw
  "sparklingclaw": "眩目爪刃", // Sparkling Claw
  "shadowfangs": "暗影之牙", // Shadow Fangs
  "malignfangs": "恶毒之牙", // Malign Fangs
  "voidfangs": "虚空之牙", // Void Fangs
  "doubleclaw": "双刃爪", // Double Claw
  "twinclaw": "重刃爪", // Twin Claw
  "geminiclaw": "双子战爪", // Gemini Claw
  "butcherknife": "屠兽利刃", // Butcher Knife
  "poignard": "夺命刺", // Poignard
  "goldenkris": "金光波刃", // Golden Kris
  "guttingknife": "重伤短刀", // Gutting Knife
  "carvingknife": "刻骨刀", // Carving Knife
  "copperkris": "铜锻波刃", // Copper Kris
  "skean": "双刃匕", // Skean
  "impdagger": "魔性之刃", // Imp Dagger
  "hollowpointdagger": "折叠匕首", // Hollowpoint Dagger
  "pressuriseddagger": "冲压匕首", // Pressurised Dagger
  "pneumaticdagger": "气动匕首", // Pneumatic Dagger
  "prongdagger": "尖耙短匕", // Prong Dagger
  "trisula": "三叉短匕", // Trisula
  "sai": "战叉", // Sai
  "flickerflameblade": "火焰刀", // Flickerflame Blade
  "flashfireblade": "闪火刀", // Flashfire Blade
  "infernalblade": "炼狱刀", // Infernal Blade
  "wristchopper": "断腕之刃", // Wrist Chopper
  "waraxe": "行军斧", // War Axe
  "chestsplitter": "开膛利刃", // Chest Splitter
  "ceremonialaxe": "血仪之斧", // Ceremonial Axe
  "wraithaxe": "凶灵之斧", // Wraith Axe
  "karuiaxe": "卡鲁古斧", // Karui Axe
  "reaveraxe": "残暴之斧", // Reaver Axe
  "boardingaxe": "万用手斧", // Boarding Axe
  "broadaxe": "阔斧", // Broad Axe
  "armingaxe": "长柄斧", // Arming Axe
  "jasperaxe": "灵玉斧", // Jasper Axe
  "maltreatmentaxe": "凌虐斧", // Maltreatment Axe
  "disapprobationaxe": "否认斧", // Disapprobation Axe
  "psychoticaxe": "癫狂斧", // Psychotic Axe
  "etchedhatchet": "蚀刻战斧", // Etched Hatchet
  "engravedhatchet": "雕文战斧", // Engraved Hatchet
  "runichatchet": "密文之斧", // Runic Hatchet
  "barbedclub": "锐刺木棒", // Barbed Club
  "battlehammer": "强化战锤", // Battle Hammer
  "flangedmace": "护体之锤", // Flanged Mace
  "ancestralclub": "祖灵之杵", // Ancestral Club
  "tenderizer": "裂肉之锤", // Tenderizer
  "legionhammer": "军团之锤", // Legion Hammer
  "tribalclub": "祭仪之杵", // Tribal Club
  "pernach": "锋刃重锤", // Pernach
  "stonehammer": "石锤", // Stone Hammer
  "bladedmace": "多刃锤", // Bladed Mace
  "ceremonialmace": "祭礼之锤", // Ceremonial Mace
  "petrifiedclub": "坚石木棒", // Petrified Club
  "flaremace": "明亮锤", // Flare Mace
  "crackmace": "开裂锤", // Crack Mace
  "boommace": "风雷锤", // Boom Mace
  "wyrmmace": "古龙之锤", // Wyrm Mace
  "dragonmace": "龙之锤", // Dragon Mace
  "behemothmace": "巴哈姆特", // Behemoth Mace

  "driftwoodsceptre": "朽木短杖", // Driftwood Sceptre
  "sekhem": "威能短杖", // Sekhem
  "leadsceptre": "铅铸短杖", // Lead Sceptre
  "abyssalsceptre": "深渊短杖", // Abyssal Sceptre
  "darkwoodsceptre": "乌木短杖", // Darkwood Sceptre
  "quartzsceptre": "石英短杖", // Quartz Sceptre
  "ochresceptre": "赤色短杖", // Ochre Sceptre
  "oscillatingsceptre": "摇摆短杖", // Oscillating Sceptre
  "stabilisingsceptre": "平稳短杖", // Stabilising Sceptre
  "alternatingsceptre": "变化短杖", // Alternating Sceptre
  "hornedsceptre": "犄角短杖", // Horned Sceptre
  "stagsceptre": "灵鹿短杖", // Stag Sceptre
  "sambarsceptre": "恶魔短杖", // Sambar Sceptre
  "baselard": "冷光长剑", // Baselard
  "battlesword": "士兵长剑", // Battle Sword
  "coppersword": "青铜短剑", // Copper Sword
  "broadsword": "阔剑", // Broad Sword
  "ancientsword": "远古之剑", // Ancient Sword
  "ficklespiritblade": "无常魂刃", // Fickle Spiritblade
  "capriciousspiritblade": "莫测魂刃", // Capricious Spiritblade
  "anarchicspiritblade": "无序魂刃", // Anarchic Spiritblade
  "hooksword": "钩爪剑", // Hook Sword
  "grappler": "缠斗", // Grappler
  "tigerhook": "虎钩", // Tiger Hook
  "rustedspike": "锈刺剑", // Rusted Spike
  "burnishedfoil": "冷芒刺剑", // Burnished Foil
  "serratedfoil": "锯齿细剑", // Serrated Foil
  "primevalrapier": "古典刺剑", // Primeval Rapier
  "fancyfoil": "华丽细剑", // Fancy Foil
  "apexrapier": "锐锋细剑", // Apex Rapier
  "dragonbonerapier": "龙骨细剑", // Dragonbone Rapier
  "temperedfoil": "强化细剑", // Tempered Foil
  "pecoraro": "寒光刺剑", // Pecoraro
  "spiraledfoil": "螺纹细剑", // Spiraled Foil
  "harpyrapier": "魔喙细剑", // Harpy Rapier
  "batteredfoil": "钝刃细剑", // Battered Foil
  "thornrapier": "棘刺细剑", // Thorn Rapier
  "wyrmbonerapier": "龙骨细剑", // Wyrmbone Rapier
  "smallsword": "小剑", // Smallsword
  "courtesansword": "花魁之剑", // Courtesan Sword
  "dragoonsword": "骑兵军刀", // Dragoon Sword
  "coiledwand": "盘曲法杖", // Coiled Wand
  "assemblerwand": "装配法杖", // Assembler Wand
  "congregatorwand": "集合法杖", // Congregator Wand
  "accumulatorwand": "蓄能法杖", // Accumulator Wand
  "heathenwand": "异徒法杖", // Heathen Wand
  "profanewand": "亵渎法杖", // Profane Wand
  "conveningwand": "召集法杖", // Convening Wand
  "decurvebow": "直弓", // Decurve Bow
  "compoundbow": "复合弓", // Compound Bow
  "sniperbow": "狙击弓", // Sniper Bow
  "ivorybow": "象牙弓", // Ivory Bow
  "highbornbow": "贵族之弓", // Highborn Bow
  "thicketbow": "林野猎弓", // Thicket Bow
  "compositebow": "合成弓", // Composite Bow
  "grovebow": "丛林猎弓", // Grove Bow
  "hedronbow": "多面弓", // Hedron Bow
  "foundrybow": "铸造弓", // Foundry Bow
  "solarinebow": "日裔弓", // Solarine Bow
  "reflexbow": "反射弓", // Reflex Bow
  "primitivestaff": "粗制长杖", // Primitive Staff
  "woodfulstaff": "坚木长杖", // Woodful Staff
  "transformerstaff": "变形长杖", // Transformer Staff
  "reciprocationstaff": "交换长杖", // Reciprocation Staff
  "batterystaff": "蓄能长杖", // Battery Staff
  "crescentstaff": "新月长杖", // Crescent Staff
  "moonstaff": "月神长杖", // Moon Staff
  "eclipsestaff": "月蚀长杖", // Eclipse Staff
  "capacityrod": "载荷之杖", // Capacity Rod
  "potentialityrod": "潜力之杖", // Potentiality Rod
  "eventualityrod": "潜能之杖", // Eventuality Rod
  "stoneaxe": "石斧", // Stone Axe
  "nobleaxe": "权贵巨斧", // Noble Axe
  "jadechopper": "碎玉大斧", // Jade Chopper
  "doubleaxe": "双刃巨斧", // Double Axe
  "gildedaxe": "金柄之斧", // Gilded Axe
  "timberaxe": "裂木巨斧", // Timber Axe
  "primecleaver": "首要砍刀", // Prime Cleaver
  "honedcleaver": "磨利砍刀", // Honed Cleaver
  "apexcleaver": "锋锐砍刀", // Apex Cleaver
  "daggeraxe": "匕斧", // Dagger Axe
  "talonaxe": "猛禽爪斧", // Talon Axe
  "driftwoodmaul": "朽木巨锤", // Driftwood Maul
  "spinymaul": "凶刺巨锤", // Spiny Maul
  "platedmaul": "华丽重锤", // Plated Maul
  "colossusmallet": "巨型重锤", // Colossus Mallet
  "tribalmaul": "祭仪巨锤", // Tribal Maul
  "mallet": "千斤锤", // Mallet
  "frightmaul": "恐惧重锤", // Fright Maul
  "totemicmaul": "图腾巨锤", // Totemic Maul
  "bluntforcecondenser": "钝击之力凝聚器", // Blunt Force Condenser
  "crushingforcemagnifier": "破坏之力放大器", // Crushing Force Magnifier
  "impactforcepropagator": "冲击之力扩散器", // Impact Force Propagator
  "morningstar": "晨星", // Morning Star
  "solarmaul": "日光锤", // Solar Maul
  "wraithsword": "凶灵巨剑", // Wraith Sword
  "headmanssword": "行刑巨剑", // Headman's Sword
  "vaalgreatsword": "瓦尔巨剑", // Vaal Greatsword
  "longsword": "大剑", // Longsword
  "twohandedsword": "双手剑", // Two-Handed Sword

  "spectralsword": "幽魂巨剑", // Spectral Sword
  "butchersword": "冷血巨剑", // Butcher Sword
  "footmansword": "士兵巨剑", // Footman Sword
  "rebukingblade": "责难刀", // Rebuking Blade
  "blastingblade": "爆破刀", // Blasting Blade
  "banishingblade": "放逐刀", // Banishing Blade
  "curvedblade": "弯刃", // Curved Blade
  "litheblade": "细刃", // Lithe Blade
  "goldenmantle": "黄金战甲", // Golden Mantle
  "shabbyjerkin": "破旧外套", // Shabby Jerkin
  "gloriousleather": "荣耀皮甲", // Glorious Leather
  "supremeleather": "至尊皮甲", // Supreme Leather
  "astralleather": "星界皮甲", // Astral Leather
  "syndicatesgarb": "辛迪加之装", // Syndicate's Garb
  "fullleather": "连身皮甲", // Full Leather
  "thiefsgarb": "窃贼之装", // Thief's Garb
  "eelskintunic": "鳗皮之衣", // Eelskin Tunic
  "frontierleather": "边戍皮甲", // Frontier Leather
  "paddedvest": "薄衬衣", // Padded Vest
  "crimsonraiment": "绯红之衣", // Crimson Raiment
  "cryptarmour": "地穴战甲", // Crypt Armour
  "sanguineraiment": "血痕之衣", // Sanguine Raiment
  "oiledvest": "防水背心", // Oiled Vest
  "necroticarmour": "幽魂之甲", // Necrotic Armour
  "paddedjacket": "长袖棉袄", // Padded Jacket
  "oiledcoat": "防水外衣", // Oiled Coat
  "scarletraiment": "炽红之衣", // Scarlet Raiment
  "quiltedjacket": "菱纹外衣", // Quilted Jacket
  "sleekcoat": "滑布外套", // Sleek Coat
  "conjurersvestment": "咒者长衣", // Conjurer's Vestment
  "arcanevestment": "秘法长衣", // Arcane Vestment
  "nightweaverobe": "夜纹之袍", // Nightweave Robe
  "twilightregalia": "暮光法衣", // Twilight Regalia
  "silkengarb": "丝绸之衣", // Silken Garb
  "magesvestment": "博学长衣", // Mage's Vestment
  "silkrobe": "丝质之袍", // Silk Robe
  "silkenwrap": "丝绒背心", // Silken Wrap
  "sunplate": "日光之铠", // Sun Plate
  "titanplate": "泰坦战铠", // Titan Plate
  "legionplate": "军团战铠", // Legion Plate
  "chestplate": "胸甲", // Chestplate
  "royalplate": "皇家战铠", // Royal Plate
  "warplate": "战争之铠", // War Plate
  "fullplate": "连身铠甲", // Full Plate
  "arenaplate": "斗者之铠", // Arena Plate
  "lordlyplate": "领主护铠", // Lordly Plate
  "bronzeplate": "青铜铠甲", // Bronze Plate
  "battleplate": "战铠", // Battle Plate
  "scalevest": "细鳞背心", // Scale Vest
  "commandersbrigandine": "指挥者锁甲", // Commander's Brigandine
  "battlelamellar": "争战鳞甲", // Battle Lamellar
  "dragonscaledoublet": "龙鳞护甲", // Dragonscale Doublet
  "fullwyvernscale": "连身腾龙鳞甲", // Full Wyvernscale
  "marshallsbrigandine": "元帅锁铠", // Marshall's Brigandine
  "lightbrigandine": "轻锁甲", // Light Brigandine
  "conquestlamellar": "征服盔甲", // Conquest Lamellar
  "scaledoublet": "合身鳞甲", // Scale Doublet
  "infantrybrigandine": "步兵锁甲", // Infantry Brigandine
  "soldiersbrigandine": "战士锁甲", // Soldier's Brigandine
  "fieldlamellar": "野战薄甲", // Field Lamellar
  "hussarbrigandine": "轻骑锁甲", // Hussar Brigandine
  "graspingmail": "扼杀链甲", // Grasping Mail
  "chainmailvest": "锁链背心", // Chainmail Vest
  "chainhauberk": "锁子长甲", // Chain Hauberk
  "grandringmail": "雄壮环甲", // Grand Ringmail
  "paladinshauberk": "圣骑士链甲", // Paladin's Hauberk
  "chainmailtunic": "链甲外衣", // Chainmail Tunic
  "sacredchainmail": "神圣锁甲", // Sacred Chainmail
  "ringmailcoat": "环甲外套", // Ringmail Coat
  "chainmaildoublet": "护体锁甲", // Chainmail Doublet
  "fullringmail": "连身环甲", // Full Ringmail
  "fullchainmail": "连身锁甲", // Full Chainmail
  "goldencaligae": "黄金缠鞋", // Golden Caligae
  "harpyskinboots": "鹰妖皮靴", // Harpyskin Boots
  "wrappedboots": "裹趾凉鞋", // Wrapped Boots
  "infiltratorboots": "渗透者长靴", // Infiltrator Boots
  "phantomboots": "幻影长靴", // Phantom Boots
  "ambushboots": "伏击之靴", // Ambush Boots
  "cloudwhisperboots": "唤云之靴", // Cloudwhisper Boots
  "windbreakboots": "破风之靴", // Windbreak Boots
  "stormriderboots": "御风之靴", // Stormrider Boots
  "runicgreaves": "符文胫甲", // Runic Greaves
  "sageslippers": "贤者便鞋", // Sage Slippers
  "samiteslippers": "绣布便鞋", // Samite Slippers
  "duskwalkslippers": "踏暮之鞋", // Duskwalk Slippers
  "nightwindslippers": "夜风之鞋", // Nightwind Slippers
  "dreamquestslippers": "探梦之鞋", // Dreamquest Slippers
  "irongreaves": "铁锻胫甲", // Iron Greaves
  "precursorgreaves": "先驱胫甲", // Precursor Greaves
  "steelgreaves": "冷钢胫甲", // Steel Greaves
  "wyvernscaleboots": "腾龙鳞长靴", // Wyvernscale Boots
  "steelscaleboots": "钢影长靴", // Steelscale Boots
  "chimerascaleboots": "奇美拉鳞长靴", // Chimerascale Boots
  "chainboots": "链甲长靴", // Chain Boots
  "paladinboots": "圣骑士长靴", // Paladin Boots
  "ringmailboots": "环甲筒靴", // Ringmail Boots
  "zealotboots": "狂热者长靴", // Zealot Boots
  "martyrboots": "先烈长靴", // Martyr Boots
  "basemetaltreads": "劣金之履", // Basemetal Treads
  "darksteeltreads": "乌钢之履", // Darksteel Treads

  "brimstonetreads": "踏烟之履", // Brimstone Treads
  "grippedgloves": "擒拿手套", // Gripped Gloves
  "apothecarysgloves": "药剂师手套", // Apothecary's Gloves
  "goldenbracers": "黄金臂甲", // Golden Bracers
  "rawhidegloves": "生皮手套", // Rawhide Gloves
  "harpyskingloves": "鹰妖皮手套", // Harpyskin Gloves
  "velourgloves": "丝绒手套", // Velour Gloves
  "sharkskingloves": "鲨皮手套", // Sharkskin Gloves
  "stealthgloves": "匿踪手套", // Stealth Gloves
  "phantommitts": "幻影护手", // Phantom Mitts
  "trappermitts": "猎人护手", // Trapper Mitts
  "infiltratormitts": "渗透者护手", // Infiltrator Mitts
  "tinkergloves": "工匠手套", // Tinker Gloves
  "apprenticegloves": "学徒手套", // Apprentice Gloves
  "trapsettergloves": "布陷者手套", // Trapsetter Gloves
  "runicgloves": "符文手套", // Runic Gloves
  "sagegloves": "贤者手套", // Sage Gloves
  "leylinegloves": "雷线手套", // Leyline Gloves
  "aetherwindgloves": "灵风手套", // Aetherwind Gloves
  "nexusgloves": "枢纽手套", // Nexus Gloves
  "precursorgauntlets": "先驱护手", // Precursor Gauntlets
  "leviathangauntlets": "海怪护手", // Leviathan Gauntlets
  "platedgauntlets": "坚铁护手", // Plated Gauntlets
  "fishscalegauntlets": "鱼鳞手套", // Fishscale Gauntlets
  "wyvernscalegauntlets": "腾龙鳞手套", // Wyvernscale Gauntlets
  "chimerascalegauntlets": "奇美拉鳞手套", // Chimerascale Gauntlets
  "paladingloves": "圣骑士手套", // Paladin Gloves
  "ringmailgloves": "环甲手套", // Ringmail Gloves
  "preservinggauntlets": "历战手甲", // Preserving Gauntlets
  "guardinggauntlets": "护卫手甲", // Guarding Gauntlets
  "thwartinggauntlets": "御敌护手", // Thwarting Gauntlets
  "goldenvisage": "金色面具", // Golden Visage
  "direpelt": "恐兽皮盔", // Dire Pelt
  "grizzlypelt": "灰熊皮盔", // Grizzly Pelt
  "majesticpelt": "威武皮盔", // Majestic Pelt
  "hunterhood": "猎者之兜", // Hunter Hood
  "nobletricorne": "贵族三角帽", // Noble Tricorne
  "scaremask": "幽惧之面", // Scare Mask
  "jestermask": "弄臣之面", // Jester Mask
  "ancientmask": "上古之面", // Ancient Mask
  "torturersmask": "刑罚者之面", // Torturer's Mask
  "galecrown": "飓风之冠", // Gale Crown
  "wintercrown": "寒冬之冠", // Winter Crown
  "blizzardcrown": "暴雪之冠", // Blizzard Crown
  "runiccrest": "符文之冠", // Runic Crest
  "moonlitcirclet": "月辉之冠", // Moonlit Circlet
  "sunfirecirclet": "阳炎之冠", // Sunfire Circlet
  "torturecage": "刑罚头笼", // Torture Cage
  "generalshelmet": "将军战盔", // General's Helmet
  "conquerorshelmet": "霸王战盔", // Conqueror's Helmet
  "giantslayerhelmet": "巨人屠夫战盔", // Giantslayer Helmet
  "conehelmet": "锥顶盔", // Cone Helmet
  "gladiatorhelmet": "角斗者之盔", // Gladiator Helmet
  "batteredhelm": "残破之盔", // Battered Helm
  "knighthelm": "骑士之盔", // Knight Helm
  "conquesthelmet": "征服之盔", // Conquest Helmet
  "hauntedbascinet": "魂萦战盔", // Haunted Bascinet
  "sallet": "轻铁护盔", // Sallet
  "sorrowmask": "悲伤面具", // Sorrow Mask
  "atonementmask": "赎罪面具", // Atonement Mask
  "penitentmask": "忏悔面具", // Penitent Mask
  "rustedcoif": "锈铁链盔", // Rusted Coif
  "divinecrown": "神启头冠", // Divine Crown
  "impcrown": "小鬼之冠", // Imp Crown
  "demoncrown": "恶魔之冠", // Demon Crown
  "archdemoncrown": "大恶魔之冠", // Archdemon Crown
  "goldenwreath": "金黄花环", // Golden Wreath
  "goldenflame": "黄金圣炎", // Golden Flame
  "battlebuckler": "斗者轻盾", // Battle Buckler
  "crusaderbuckler": "圣战轻盾", // Crusader Buckler
  "imperialbuckler": "帝国轻盾", // Imperial Buckler
  "hammeredbuckler": "铆钉轻盾", // Hammered Buckler
  "gildedbuckler": "金面轻盾", // Gilded Buckler
  "oakbuckler": "橡木轻盾", // Oak Buckler
  "endothermicbuckler": "吸热型轻盾", // Endothermic Buckler
  "polarbuckler": "极地轻盾", // Polar Buckler
  "coldattunedbuckler": "适寒型轻盾", // Cold-attuned Buckler
  "spikedbundle": "尖木刺盾", // Spiked Bundle
  "alderspikedshield": "桤木刺盾", // Alder Spiked Shield
  "driftwoodspikedshield": "朽木刺盾", // Driftwood Spiked Shield
  "alloyedspikedshield": "合金刺盾", // Alloyed Spiked Shield
  "ornatespikedshield": "华丽刺盾", // Ornate Spiked Shield
  "redwoodspikedshield": "红木刺盾", // Redwood Spiked Shield
  "twigspiritshield": "残枝魔盾", // Twig Spirit Shield
  "yewspiritshield": "紫衫魔盾", // Yew Spirit Shield
  "walnutspiritshield": "桃木魔盾", // Walnut Spirit Shield
  "exhaustingspiritshield": "力竭魔盾", // Exhausting Spirit Shield
  "subsumingspiritshield": "归纳魔盾", // Subsuming Spirit Shield
  "transferattunedspiritshield": "适应型魔盾", // Transfer-attuned Spirit Shield
  "splinteredtowershield": "朽木塔盾", // Splintered Tower Shield
  "bronzetowershield": "青铜塔盾", // Bronze Tower Shield
  "crestedtowershield": "荣冠塔盾", // Crested Tower Shield
  "shagreentowershield": "粗革塔盾", // Shagreen Tower Shield
  "corrodedtowershield": "斑驳塔盾", // Corroded Tower Shield
  "coppertowershield": "铜锻塔盾", // Copper Tower Shield
  "buckskintowershield": "鹿皮塔盾", // Buckskin Tower Shield
  "mahoganytowershield": "桃木塔盾", // Mahogany Tower Shield
  "firroundshield": "杉木圆盾", // Fir Round Shield
  "scarletroundshield": "炽红圆盾", // Scarlet Round Shield
  "splendidroundshield": "光辉圆盾", // Splendid Round Shield

  "spikedroundshield": "尖刺圆盾", // Spiked Round Shield
  "exothermictowershield": "排热型塔盾", // Exothermic Tower Shield
  "magmatictowershield": "熔岩塔盾", // Magmatic Tower Shield
  "heatattunedtowershield": "适热型塔盾", // Heat-attuned Tower Shield
  "lindenkiteshield": "椴木鸢盾", // Linden Kite Shield
  "reinforcedkiteshield": "强化鸢盾", // Reinforced Kite Shield
  "layeredkiteshield": "层板鸢盾", // Layered Kite Shield
  "ceremonialkiteshield": "祭仪鸢盾", // Ceremonial Kite Shield
  "etchedkiteshield": "刻文鸢盾", // Etched Kite Shield
  "angelickiteshield": "天使鸢盾", // Angelic Kite Shield
  "artilleryquiver": "火炮箭袋", // Artillery Quiver
  "simplexamulet": "朴实项链", // Simplex Amulet
  "focusedamulet": "聚焦项链", // Focused Amulet
  "mandibletalisman": "巨颚魔符", // Mandible Talisman
  "chrysalistalisman": "虫蛹魔符", // Chrysalis Talisman
  "writhingtalisman": "狂癫魔符", // Writhing Talisman
  "bonespiretalisman": "脊骨魔符", // Bonespire Talisman
  "ashscaletalisman": "灰烬魔符", // Ashscale Talisman
  "loneantlertalisman": "孤角魔符", // Lone Antler Talisman
  "deeponetalisman": "深渊魔符", // Deep One Talisman
  "breakribtalisman": "碎骨魔符", // Breakrib Talisman
  "deadhandtalisman": "亡手魔符", // Deadhand Talisman
  "undyingfleshtalisman": "不朽魔符", // Undying Flesh Talisman
  "rotheadtalisman": "腐首魔符", // Rot Head Talisman
  "hexclawtalisman": "幻爪魔符", // Hexclaw Talisman
  "primalskulltalisman": "皇骨魔符", // Primal Skull Talisman
  "splitnewttalisman": "断螈魔符", // Splitnewt Talisman
  "aviantwinstalisman": "双子魔符", // Avian Twins Talisman
  "fangjawtalisman": "齿鲨魔符", // Fangjaw Talisman
  "hornedtalisman": "尖角魔符", // Horned Talisman
  "spinefusetalisman": "潜能魔符", // Spinefuse Talisman
  "threerattalisman": "三鼠魔符", // Three Rat Talisman
  "monkeytwinstalisman": "双猴魔符", // Monkey Twins Talisman
  "longtoothtalisman": "长牙魔符", // Longtooth Talisman
  "monkeypawtalisman": "猴掌魔符", // Monkey Paw Talisman
  "threehandstalisman": "三手魔符", // Three Hands Talisman
  "gargantuantalisman": "巨像魔符", // Gargantuan Talisman
  "saqawinetalisman": "苍空魔符", // Saqawine Talisman
  "craicictalisman": "深海魔符", // Craicic Talisman
  "fenumaltalisman": "暗夜魔符", // Fenumal Talisman
  "farrictalisman": "大地魔符", // Farric Talisman
  "taurustalisman": "金牛魔符", // Taurus Talisman
  "carrionqueentalisman": "食腐虫后魔符", // Carrion Queen Talisman
  "chieftaintalisman": "酋长魔符", // Chieftain Talisman
  "savagecrabtalisman": "野蛮巨蟹魔符", // Savage Crab Talisman
  "spidercrabtalisman": "蜘蛛蟹魔符", // Spider Crab Talisman
  "devourertalisman": "吞噬者魔符", // Devourer Talisman
  "cobratalisman": "眼镜蛇魔符", // Cobra Talisman
  "greatmawtalisman": "巨大裂齿兽魔符", // Great Maw Talisman
  "croakertalisman": "鸣蛙魔符", // Croaker Talisman
  "goatmantalisman": "羊人魔符", // Goatman Talisman
  "flamehelliontalisman": "烈炎地狱犬魔符", // Flame Hellion Talisman
  "frosthelliontalisman": "冰霜地狱犬魔符", // Frost Hellion Talisman
  "magmahoundtalisman": "熔岩猎犬魔符", // Magma Hound Talisman
  "chimeraltalisman": "龙蜥魔符", // Chimeral Talisman
  "retchtalisman": "反刍鸟魔符", // Retch Talisman
  "lynxtalisman": "猞猁魔符", // Lynx Talisman
  "apetalisman": "猿猴魔符", // Ape Talisman
  "octopustalisman": "章鱼魔符", // Octopus Talisman
  "pitbulltalisman": "斗牛犬魔符", // Pitbull Talisman
  "plaguedarachnidtalisman": "瘟疫异蛛魔符", // Plagued Arachnid Talisman
  "hybridarachnidtalisman": "混血异蛛魔符", // Hybrid Arachnid Talisman
  "rhoatalisman": "恐喙鸟魔符", // Rhoa Talisman
  "scrabblertalisman": "爬虫魔符", // Scrabbler Talisman
  "bloodvipertalisman": "毒血蛇魔符", // Blood Viper Talisman
  "sandspittertalisman": "喷砂爪蟹魔符", // Sand Spitter Talisman
  "scorpiontalisman": "毒蝎魔符", // Scorpion Talisman
  "squidtalisman": "乌贼魔符", // Squid Talisman
  "blackwidowtalisman": "黑寡妇魔符", // Black Widow Talisman
  "goliathtalisman": "巨人魔符", // Goliath Talisman
  "watchertalisman": "守望者魔符", // Watcher Talisman
  "tigertalisman": "猛虎魔符", // Tiger Talisman
  "ursatalisman": "熊战士魔符", // Ursa Talisman
  "vulturetalisman": "秃鹫魔符", // Vulture Talisman
  "goldenobi": "金羽腰带", // Golden Obi
  "microdistillerybelt": "低酿腰带", // Micro-Distillery Belt
  "mechalarmbelt": "警戒腰带", // Mechalarm Belt
  "mechanicalbelt": "机关腰带", // Mechanical Belt
  "cordbelt": "细线腰带", // Cord Belt
  "breachring": "裂隙戒指", // Breach Ring
  "ceruleanring": "天蓝之戒", // Cerulean Ring
  "iolitering": "青石戒指", // Iolite Ring
  "goldenhoop": "金环", // Golden Hoop
  "cogworkring": "齿轮戒指", // Cogwork Ring
  "geodesicring": "地线戒指", // Geodesic Ring
  "compositering": "复合戒指", // Composite Ring
  "manifoldring": "集成戒指", // Manifold Ring
  "ratchetingring": "渐变戒指", // Ratcheting Ring
  "helicalring": "螺纹戒指", // Helical Ring
  "duskring": "戒指：暮色", // Dusk Ring
  "penumbraring": "戒指：半影", // Penumbra Ring
  "gloamring": "戒指：薄暮", // Gloam Ring
  "tenebrousring": "戒指：暗黑", // Tenebrous Ring
  "shadowedring": "戒指：暗影", // Shadowed Ring
}
