import { registerBackgroundHandlers } from "~/lib/background"
import { refreshChineseTradeCache } from "~/lib/services/chinese-trade/cache-builder"
import { buildChineseItemNameCache } from "~/lib/services/chinese-trade/item-name-cache"
import { loadChineseStatTemplates } from "~/lib/services/chinese-trade/stat-templates"
import { getTradeTranslationState } from "~/lib/services/trade-translation"
import { chineseTradeMessage } from "~/lib/services/chinese-trade/contract"

const getStorageUsage = async () => {
  const measure = async (
    area: (chrome.storage.StorageArea & {
      QUOTA_BYTES?: number
      QUOTA_BYTES_PER_ITEM?: number
    }) | undefined
  ) => {
    if (!area) return { available: false }
    try {
      const usedBytes = await area.getBytesInUse(null)
      return {
        available: true,
        usedBytes,
        quotaBytes: area.QUOTA_BYTES,
        quotaBytesPerItem: area.QUOTA_BYTES_PER_ITEM
      }
    } catch (error) {
      return {
        available: false,
        error: getErrorMessage(error)
      }
    }
  }

  const [local, sync, session, managed] = await Promise.all([
    measure(chrome.storage.local),
    measure(chrome.storage.sync),
    measure(chrome.storage.session),
    measure(chrome.storage.managed)
  ])
  return { local, sync, session, managed }
}

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error)

const prepareChineseTradeCaches = async (
  force = false,
  requestedLanguage?: unknown
) => {
  const state = await getTradeTranslationState()
  const language = requestedLanguage === "zh-cn" || requestedLanguage === "zh-tw"
    ? requestedLanguage
    : state.language
  if (language !== "zh-cn" && language !== "zh-tw") return
  if (!force && !state.enabled) return
  const [cacheReady] = await Promise.all([
    refreshChineseTradeCache(force, language),
    buildChineseItemNameCache(force, language)
  ])
  if (!cacheReady) throw new Error("Chinese Trade cache could not be prepared")
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
    chrome.runtime.onInstalled.addListener(() => {
      void prepareChineseTradeCaches()
    })
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request?.type === chineseTradeMessage.rebuildCache) {
        prepareChineseTradeCaches(true, request.language)
          .then(async () => {
            const storage = await getStorageUsage()
            console.info("[PoeTradePlus] Chrome storage usage", storage)
            sendResponse({ ok: true, storage })
          })
          .catch(async (error) =>
            sendResponse({
              ok: false,
              error: getErrorMessage(error),
              storage: await getStorageUsage().catch(() => undefined)
            })
          )
        return true
      }

      if (request?.type === chineseTradeMessage.getTemplates) {
        getTradeTranslationState()
          .then(async (state) => {
            if (!state.enabled) return {}
            const templates = await loadChineseStatTemplates()
            return state.language === "zh-cn"
              ? templates.cn ?? {}
              : templates.tw ?? {}
          })
          .then((templates) => sendResponse({ templates }))
          .catch(() => sendResponse({ templates: {} }))
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
