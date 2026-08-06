const VALDO_REWARD_PREFIX = /^(?:foil(?:ed)?\s+|celestial\s+(?:quartz|ruby|emerald|aureate|pearl|amethyst)\s+)/i

export const normalizeValdoRewardName = (rewardName: string) =>
  rewardName.replace(VALDO_REWARD_PREFIX, "").trim()
