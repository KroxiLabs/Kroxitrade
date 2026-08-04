/**
 * Internal contract for the optional Chinese localization of PoE1 Trade.
 *
 * These keys belong to PoeTradePlus only. Cached data is disposable and is
 * rebuilt from bundled dictionaries plus the official Trade endpoints.
 */
export const chineseTradeStorage = {
  updatedAt: "poeTradePlus.chineseTrade.updatedAt",
  itemNamesUpdatedAt: "poeTradePlus.chineseTrade.itemNamesUpdatedAt",
  traditional: {
    stats: "poeTradePlus.chineseTrade.traditional.stats",
    modifiers: "poeTradePlus.chineseTrade.traditional.modifiers",
    itemNames: "poeTradePlus.chineseTrade.traditional.itemNames",
    reverseNames: "poeTradePlus.chineseTrade.traditional.reverseNames"
  },
  simplified: {
    stats: "poeTradePlus.chineseTrade.simplified.stats",
    modifiers: "poeTradePlus.chineseTrade.simplified.modifiers",
    itemNames: "poeTradePlus.chineseTrade.simplified.itemNames",
    reverseNames: "poeTradePlus.chineseTrade.simplified.reverseNames"
  }
} as const

export const chineseTradePageStorage = {
  injected: "poeTradePlus.chineseTrade.injected",
  reloadGuard: "poeTradePlus.chineseTrade.reloaded",
  rebuildGuard: "poeTradePlus.chineseTrade.rebuildRequested"
} as const

export const chineseTradeMessage = {
  rebuildCache: "poeTradePlus.chineseTrade.rebuildCache",
  reloadTradeTabs: "poeTradePlus.chineseTrade.reloadTradeTabs"
} as const
