import tiersData from "~/lib/data/tiers.json"

export interface TierInfo {
  tier: number
  name: string
  min: number | number[]
  max: number | number[]
  avgMin: number
  ilvl: number
}

interface StatTiers {
  text: string
  tiers: Record<string, TierInfo[]>
}

type TiersData = Record<string, StatTiers>

const tiers = tiersData as TiersData

export const getTiersForStat = (
  statId: string,
  itemClass?: string
): TierInfo[] | null => {
  const statTiers = tiers[statId]
  if (!statTiers) return null

  if (itemClass && statTiers.tiers[itemClass]) {
    return statTiers.tiers[itemClass]
  }

  const firstClass = Object.keys(statTiers.tiers)[0]
  return firstClass ? statTiers.tiers[firstClass] : null
}

export const hasStatTiers = (statId: string) => statId in tiers

export const findTierForValue = (
  statId: string,
  value: number,
  itemClass?: string
): number | null => {
  const tierList = getTiersForStat(statId, itemClass)
  if (!tierList?.length) return null

  for (const tier of tierList) {
    if (value >= tier.avgMin) {
      return tier.tier
    }
  }

  return null
}
