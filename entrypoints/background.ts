import { registerBackgroundHandlers } from "~/lib/background"
import { buildChineseItemNameCache } from "~/lib/services/chinese-trade/item-name-cache"
import { refreshChineseTradeCache } from "~/lib/services/chinese-trade/cache-builder"
import {
  getChineseTradeLanguage,
  getTradeTranslationState
} from "~/lib/services/trade-translation"
import { chineseTradeMessage } from "~/lib/services/chinese-trade/contract"

const SUPPLEMENT_FILE = "content-scripts/chinese-trade-supplement.js"

const prepareChineseTradeCaches = async (force = false) => {
  if (!force && !(await getTradeTranslationState()).enabled) return
  await Promise.all([refreshChineseTradeCache(force), buildChineseItemNameCache(force)])
}

const isInternationalPoe1Trade = (url: string | undefined) => {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return (
      /^(?:(?:www|br|ru|th|de|fr|es|jp)\.)?pathofexile\.com$/i.test(
        parsed.hostname
      ) &&
      parsed.pathname.startsWith("/trade") &&
      !parsed.pathname.startsWith("/trade2/")
    )
  } catch {
    return false
  }
}

const isTaiwanPoe1Trade = (url: string | undefined) => {
  if (!url) return false
  try {
    const parsed = new URL(url)
    return (
      parsed.hostname === "pathofexile.tw" &&
      parsed.pathname.startsWith("/trade") &&
      !parsed.pathname.startsWith("/trade2/")
    )
  } catch {
    return false
  }
}

const injectChineseSupplement = async (tabId: number, url?: string) => {
  const nativeTaiwan = isTaiwanPoe1Trade(url)
  if (!nativeTaiwan && !isInternationalPoe1Trade(url)) return
  if (!(await getChineseTradeLanguage())) return
  const state = await getTradeTranslationState()
  if (!nativeTaiwan && !state.enabled) return
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: [SUPPLEMENT_FILE]
    })
  } catch {
    // The tab may have navigated away while the settings read was pending.
  }
}

const reloadPoe1TradeTabs = async () => {
  const tabs = await chrome.tabs.query({})
  await Promise.all(
    tabs
      .filter(
        (tab) =>
          typeof tab.id === "number" &&
          (isInternationalPoe1Trade(tab.url) || isTaiwanPoe1Trade(tab.url))
      )
      .map(async (tab) => {
        const tabId = tab.id
        if (typeof tabId !== "number") return
        try {
          await chrome.tabs.reload(tabId)
        } catch {
          // A tab may close or navigate while the reload is being scheduled.
        }
      })
  )
}

export default defineBackground({
  type: "module",
  main() {
    registerBackgroundHandlers()
    void prepareChineseTradeCaches()
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === "loading") {
        void injectChineseSupplement(tabId, tab.url)
      }
    })
    chrome.runtime.onInstalled.addListener(() => {
      void prepareChineseTradeCaches()
    })
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request?.type === chineseTradeMessage.rebuildCache) {
        prepareChineseTradeCaches(true)
          .then(() => sendResponse({ ok: true }))
          .catch(() => sendResponse({ ok: false }))
        return true
      }

      if (request?.type === chineseTradeMessage.reloadTradeTabs) {
        reloadPoe1TradeTabs()
          .then(() => sendResponse({ ok: true }))
          .catch(() => sendResponse({ ok: false }))
        return true
      }

      return false
    })
  }
})
