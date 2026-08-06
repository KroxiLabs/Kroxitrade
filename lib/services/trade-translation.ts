import { storageService } from "./storage"

export const TRADE_TRANSLATION_LANGS = new Set(["zh-tw", "zh-cn"])

export interface TradeTranslationState {
  language: string
  enabled: boolean
}

const getStoredTradeLanguage = async () => {
  const syncedSettings = await storageService.getValue<Record<string, unknown>>(
    "app-settings",
    null,
    "sync"
  )
  const settings = syncedSettings ?? await storageService.getValue<Record<string, unknown>>(
    "app-settings"
  )
  const language = String(settings?.language ?? "en")
  return { language, translateTradeSite: settings?.translateTradeSite === true }
}

export const getChineseTradeLanguage = async (): Promise<string | null> => {
  const { language } = await getStoredTradeLanguage()
  return TRADE_TRANSLATION_LANGS.has(language) ? language : null
}

export const getTradeTranslationState = async (): Promise<TradeTranslationState> => {
  const { language, translateTradeSite } = await getStoredTradeLanguage()
  const enabled =
    !isNativeChineseTradeSite() &&
    !isPoe2TradeSite() &&
    TRADE_TRANSLATION_LANGS.has(language) &&
    translateTradeSite

  return { language, enabled }
}

// The Taiwan trade site is already Chinese, but its Quick Filters are injected
// by our extension in English. Let the supplemental UI translator run there
// whenever the extension itself is using Chinese, without enabling the cache
// replacement intended for the international site.
export const getChineseSupplementState = async (): Promise<TradeTranslationState> => {
  const { language, translateTradeSite } = await getStoredTradeLanguage()
  const chinese = TRADE_TRANSLATION_LANGS.has(language)
  return {
    language,
    enabled:
      chinese &&
      (isNativeChineseTradeSite() || (!isPoe2TradeSite() && translateTradeSite))
  }
}

export const isTradeTranslationEnabled = async (): Promise<boolean> =>
  (await getTradeTranslationState()).enabled

function isNativeChineseTradeSite() {
  return typeof location !== "undefined" && location.hostname === "pathofexile.tw"
}

function isPoe2TradeSite() {
  return typeof location !== "undefined" && location.pathname.startsWith("/trade2/")
}
