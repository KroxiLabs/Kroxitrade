import { writable } from "svelte/store"

import type { TradeSiteVersion } from "../types/trade-location"
import { setLanguage, type AppLanguage } from "./i18n"
import { storageService, type StorageArea } from "./storage"

export type SidebarSide = "left" | "right"
export type BookmarkTradeActionId =
  | "edit"
  | "replace"
  | "copy"
  | "openNewTab"
  | "duplicate"
  | "openLive"
  | "archive"
  | "toggle"
  | "delete"
export type QuickFiltersPlacement = "page" | "sidebar"
export type TextSizePreference = "small" | "medium" | "large" | "extraLarge"
export const DEFAULT_TEXT_SIZE: TextSizePreference = "large"
export type BookmarkLayout = "classic" | "compact" | "ultra"

const DEFAULT_CLASSIC_BOOKMARK_TRADE_ACTIONS: BookmarkTradeActionId[] = [
  "edit",
  "openNewTab",
  "toggle",
  "delete"
]

export interface VersionSettings {
  showEquivalentPricing: boolean
  showMagebloodLegacyDescriptions: boolean
  showBulkSellers: boolean
  showPinnedItems: boolean
  showHistory: boolean
  showFinerFilters: boolean
  showQuickFilters: boolean
  quickFiltersPlacement: QuickFiltersPlacement
  autoFuzzySearch: boolean
  compactActionsMenu: boolean
  ultraCompactBookmarks: boolean
  classicBookmarkTradeActions: BookmarkTradeActionId[]
  compactBookmarkTradeActions: BookmarkTradeActionId[]
  ultraCompactBookmarkTradeActions: BookmarkTradeActionId[]
  bookmarkCategoriesEnabled: boolean
}

export interface AppSettings extends VersionSettings {
  sidebarSide: SidebarSide
  sidebarWidth: number
  language: AppLanguage
  textSize: TextSizePreference
  translateTradeSite: boolean
}

interface GlobalSettings {
  sidebarSide: SidebarSide
  sidebarWidth: number
  language: AppLanguage
  textSize: TextSizePreference
  translateTradeSite: boolean
}

const GLOBAL_SETTINGS_KEY = "app-settings"
const SETTINGS_STORAGE_AREA: StorageArea = "sync"
const LANGUAGE_SESSION_KEY = "poe-trade-plus-language"
export const DEFAULT_SIDEBAR_WIDTH = 450
const versionSettingsKey = (version: TradeSiteVersion) =>
  `app-settings-poe${version}`

function getInitialLanguage(): AppLanguage {
  if (typeof window === "undefined") return "en"

  const stored =
    window.sessionStorage.getItem(LANGUAGE_SESSION_KEY) ??
    window.localStorage.getItem("bt-language")
  return stored === "en" ||
    stored === "es" ||
    stored === "pt" ||
    stored === "ru" ||
    stored === "th" ||
    stored === "de" ||
    stored === "fr" ||
    stored === "ja" ||
    stored === "ko" ||
    stored === "zh-cn" ||
    stored === "zh-tw"
    ? stored
    : "en"
}

const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  sidebarSide: "right",
  sidebarWidth: DEFAULT_SIDEBAR_WIDTH,
  language: getInitialLanguage(),
  textSize: DEFAULT_TEXT_SIZE,
  translateTradeSite: false
}

const DEFAULT_VERSION_SETTINGS: VersionSettings = {
  showEquivalentPricing: false,
  showMagebloodLegacyDescriptions: true,
  showBulkSellers: false,
  showPinnedItems: false,
  showHistory: true,
  showFinerFilters: true,
  showQuickFilters: true,
  quickFiltersPlacement: "page",
  autoFuzzySearch: true,
  compactActionsMenu: false,
  ultraCompactBookmarks: false,
  classicBookmarkTradeActions: DEFAULT_CLASSIC_BOOKMARK_TRADE_ACTIONS,
  compactBookmarkTradeActions: [],
  ultraCompactBookmarkTradeActions: [],
  bookmarkCategoriesEnabled: false
}

function normalizeTextSize(textSize: unknown): TextSizePreference {
  return textSize === "small" ||
    textSize === "medium" ||
    textSize === "large" ||
    textSize === "extraLarge"
    ? textSize
    : DEFAULT_TEXT_SIZE
}

function getStorageChangeValue<T>(
  change: chrome.storage.StorageChange | undefined
): T | undefined {
  const payload = change?.newValue
  if (
    typeof payload !== "object" ||
    payload === null ||
    !("value" in payload)
  ) {
    return undefined
  }

  return payload.value as T
}

let activeVersion: TradeSiteVersion = inferTradeVersion()
let globalSettings: GlobalSettings = DEFAULT_GLOBAL_SETTINGS
let activeVersionSettings: VersionSettings = DEFAULT_VERSION_SETTINGS
const versionCache = new Map<TradeSiteVersion, VersionSettings>()
let currentSettings: AppSettings = combineSettings(
  globalSettings,
  activeVersionSettings
)
let versionRequestId = 0

const { subscribe, set } = writable<AppSettings>(currentSettings)

function normalizeGlobalSettings(
  value?: Partial<AppSettings> | null
): GlobalSettings {
  return {
    sidebarSide: value?.sidebarSide ?? DEFAULT_GLOBAL_SETTINGS.sidebarSide,
    sidebarWidth: value?.sidebarWidth ?? DEFAULT_GLOBAL_SETTINGS.sidebarWidth,
    language: value?.language ?? DEFAULT_GLOBAL_SETTINGS.language,
    textSize: normalizeTextSize(value?.textSize),
    translateTradeSite: value?.translateTradeSite === true
  }
}

function inferTradeVersion(): TradeSiteVersion {
  if (typeof window === "undefined") return "1"
  return window.location.pathname.startsWith("/trade2/") ? "2" : "1"
}

function combineSettings(
  global: GlobalSettings,
  version: VersionSettings
): AppSettings {
  return {
    ...global,
    ...version,
    classicBookmarkTradeActions: [...version.classicBookmarkTradeActions],
    compactBookmarkTradeActions: [...version.compactBookmarkTradeActions],
    ultraCompactBookmarkTradeActions: [
      ...version.ultraCompactBookmarkTradeActions
    ]
  }
}

function normalizeVersionSettings(
  value?: Partial<VersionSettings> | null
): VersionSettings {
  const defined = Object.fromEntries(
    Object.entries(value ?? {}).filter(([, setting]) => setting !== undefined)
  ) as Partial<VersionSettings>

  return {
    ...DEFAULT_VERSION_SETTINGS,
    ...defined,
    classicBookmarkTradeActions: [
      ...(defined.classicBookmarkTradeActions ??
        DEFAULT_CLASSIC_BOOKMARK_TRADE_ACTIONS)
    ],
    compactBookmarkTradeActions: [
      ...(defined.compactBookmarkTradeActions ?? [])
    ],
    ultraCompactBookmarkTradeActions: [
      ...(defined.ultraCompactBookmarkTradeActions ?? [])
    ]
  }
}

function legacyVersionSettings(
  value?: Partial<AppSettings> | null
): VersionSettings {
  return normalizeVersionSettings({
    showEquivalentPricing: value?.showEquivalentPricing,
    showMagebloodLegacyDescriptions: value?.showMagebloodLegacyDescriptions,
    showBulkSellers: value?.showBulkSellers,
    showPinnedItems: value?.showPinnedItems,
    showHistory: value?.showHistory,
    showFinerFilters: value?.showFinerFilters,
    showQuickFilters: value?.showQuickFilters,
    quickFiltersPlacement: value?.quickFiltersPlacement,
    autoFuzzySearch: value?.autoFuzzySearch,
    compactActionsMenu: value?.compactActionsMenu,
    ultraCompactBookmarks: value?.ultraCompactBookmarks,
    classicBookmarkTradeActions: value?.classicBookmarkTradeActions,
    compactBookmarkTradeActions: value?.compactBookmarkTradeActions,
    ultraCompactBookmarkTradeActions: value?.ultraCompactBookmarkTradeActions,
    bookmarkCategoriesEnabled: value?.bookmarkCategoriesEnabled
  })
}

function publish() {
  currentSettings = combineSettings(globalSettings, activeVersionSettings)
  if (typeof window !== "undefined") {
    const quickFiltersStorageKey = `bt-quick-filters-visible-poe${activeVersion}`
    window.localStorage.setItem(
      quickFiltersStorageKey,
      String(currentSettings.showQuickFilters)
    )
    window.localStorage.setItem(
      `bt-quick-filters-placement-poe${activeVersion}`,
      currentSettings.quickFiltersPlacement
    )
    window.localStorage.setItem("bt-language", currentSettings.language)
    window.sessionStorage.setItem(
      LANGUAGE_SESSION_KEY,
      currentSettings.language
    )
    window.dispatchEvent(
      new CustomEvent("poe-trade-plus:quick-filters-change", {
        detail: {
          key: quickFiltersStorageKey,
          value: currentSettings.showQuickFilters,
          placement: currentSettings.quickFiltersPlacement,
          language: currentSettings.language
        }
      })
    )
  }
  set(currentSettings)
}

function bindStorageSync() {
  if (typeof chrome === "undefined" || !chrome.storage?.onChanged) return

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== SETTINGS_STORAGE_AREA) return

    const globalChange = changes[GLOBAL_SETTINGS_KEY]
    if (globalChange) {
      globalSettings = normalizeGlobalSettings(
        getStorageChangeValue<Partial<AppSettings>>(globalChange)
      )
      setLanguage(globalSettings.language)
      publish()
    }

    for (const version of ["1", "2"] as const) {
      const change = changes[versionSettingsKey(version)]
      if (!change) continue

      const next = normalizeVersionSettings(
        getStorageChangeValue<Partial<VersionSettings>>(change)
      )
      versionCache.set(version, next)
      if (version === activeVersion) {
        activeVersionSettings = next
        publish()
      }
    }
  })
}

async function fetchSynced<T>(key: string): Promise<T | null> {
  const local = await storageService.getValue<T>(key)
  const synced = await storageService.getValue<T>(
    key,
    null,
    SETTINGS_STORAGE_AREA
  )
  if (synced !== null) return synced

  if (local === null) return null

  const migrated = await storageService.setValue(
    key,
    local,
    null,
    SETTINGS_STORAGE_AREA
  )
  if (migrated) {
    await storageService.deleteValue(key)
  }

  return local
}

async function persistSynced(key: string, value: unknown): Promise<boolean> {
  const persisted = await storageService.setValue(
    key,
    value,
    null,
    SETTINGS_STORAGE_AREA
  )
  if (!persisted) return false

  await storageService.deleteValue(key)
  return true
}

async function loadVersionSettings(
  version: TradeSiteVersion,
  legacy?: Partial<AppSettings> | null
) {
  const cached = versionCache.get(version)
  if (cached) return cached

  const stored = await fetchSynced<VersionSettings>(
    versionSettingsKey(version)
  )
  const next = stored
    ? normalizeVersionSettings(stored)
    : legacyVersionSettings(legacy)

  versionCache.set(version, next)

  if (!stored) {
    await persistSynced(versionSettingsKey(version), next)
  }

  return next
}

async function load() {
  const requestedVersion = inferTradeVersion()
  const requestId = ++versionRequestId
  const stored = await fetchSynced<Partial<AppSettings>>(GLOBAL_SETTINGS_KEY)

  globalSettings = normalizeGlobalSettings(stored)

  const [poe1Settings, poe2Settings] = await Promise.all([
    loadVersionSettings("1", stored),
    loadVersionSettings("2", stored)
  ])
  if (requestId !== versionRequestId) return

  activeVersion = requestedVersion
  activeVersionSettings = requestedVersion === "2" ? poe2Settings : poe1Settings
  publish()
  setLanguage(globalSettings.language)
}

async function saveGlobal(next: GlobalSettings) {
  const saved = await persistSynced(GLOBAL_SETTINGS_KEY, next)
  if (!saved) {
    console.warn("[Poe Trade Plus] Failed to persist global settings")
    return false
  }

  globalSettings = next
  publish()
  return true
}

async function saveGlobalForReload(next: GlobalSettings) {
  const saved = await persistSynced(GLOBAL_SETTINGS_KEY, next)
  if (!saved) {
    console.warn("[Poe Trade Plus] Failed to persist global settings")
    return false
  }

  globalSettings = next
  if (typeof window !== "undefined") {
    window.localStorage.setItem("bt-language", next.language)
    window.sessionStorage.setItem(LANGUAGE_SESSION_KEY, next.language)
  }
  return true
}

async function saveVersion(next: VersionSettings) {
  const saved = await persistSynced(
    versionSettingsKey(activeVersion),
    next
  )
  if (!saved) {
    console.warn(
      `[Poe Trade Plus] Failed to persist PoE ${activeVersion} settings`
    )
    return false
  }

  activeVersionSettings = next
  versionCache.set(activeVersion, next)
  publish()
  return true
}

bindStorageSync()

export const settings = {
  subscribe,
  load,
  getCurrent() {
    return currentSettings
  },
  getActiveVersion() {
    return activeVersion
  },
  async useVersion(version: TradeSiteVersion) {
    if (activeVersion === version) return

    const requestId = ++versionRequestId
    const next = await loadVersionSettings(version)
    if (requestId !== versionRequestId) return

    activeVersion = version
    activeVersionSettings = next
    publish()
  },
  async updateSide(sidebarSide: SidebarSide) {
    return saveGlobal({ ...globalSettings, sidebarSide })
  },
  async updateEquivalentPricingVisibility(showEquivalentPricing: boolean) {
    return saveVersion({ ...activeVersionSettings, showEquivalentPricing })
  },
  async updateMagebloodLegacyDescriptionsVisibility(
    showMagebloodLegacyDescriptions: boolean
  ) {
    return saveVersion({
      ...activeVersionSettings,
      showMagebloodLegacyDescriptions
    })
  },
  async updateBulkSellersVisibility(showBulkSellers: boolean) {
    return saveVersion({ ...activeVersionSettings, showBulkSellers })
  },
  async updatePinnedItemsVisibility(showPinnedItems: boolean) {
    return saveVersion({ ...activeVersionSettings, showPinnedItems })
  },
  async updateHistoryVisibility(showHistory: boolean) {
    return saveVersion({ ...activeVersionSettings, showHistory })
  },
  async updateFinerFiltersVisibility(showFinerFilters: boolean) {
    return saveVersion({ ...activeVersionSettings, showFinerFilters })
  },
  async updateQuickFiltersVisibility(showQuickFilters: boolean) {
    return saveVersion({ ...activeVersionSettings, showQuickFilters })
  },
  async updateQuickFiltersPlacement(
    quickFiltersPlacement: QuickFiltersPlacement
  ) {
    return saveVersion({ ...activeVersionSettings, quickFiltersPlacement })
  },
  async updateAutoFuzzySearch(autoFuzzySearch: boolean) {
    return saveVersion({ ...activeVersionSettings, autoFuzzySearch })
  },
  async updateSidebarWidth(sidebarWidth: number) {
    return saveGlobal({ ...globalSettings, sidebarWidth })
  },
  async updateTextSize(textSize: TextSizePreference) {
    return saveGlobal({
      ...globalSettings,
      textSize: normalizeTextSize(textSize)
    })
  },
  async updateLanguage(language: AppLanguage) {
    const saved = await saveGlobal({ ...globalSettings, language })
    if (saved) setLanguage(language)
    return saved
  },
  async updateLanguageForReload(language: AppLanguage) {
    return saveGlobalForReload({ ...globalSettings, language })
  },
  async updateTradeSiteTranslation(translateTradeSite: boolean) {
    return saveGlobal({ ...globalSettings, translateTradeSite })
  },
  async updateCompactActionsMenu(compactActionsMenu: boolean) {
    return saveVersion({ ...activeVersionSettings, compactActionsMenu })
  },
  async updateBookmarkLayout(
    compactActionsMenu: boolean,
    ultraCompactBookmarks: boolean
  ) {
    return saveVersion({
      ...activeVersionSettings,
      compactActionsMenu,
      ultraCompactBookmarks: compactActionsMenu && ultraCompactBookmarks
    })
  },
  async updateCompactBookmarkTradeActions(
    compactBookmarkTradeActions: BookmarkTradeActionId[]
  ) {
    return saveVersion({
      ...activeVersionSettings,
      compactBookmarkTradeActions: [...compactBookmarkTradeActions]
    })
  },
  async updateBookmarkTradeActions(
    layout: BookmarkLayout,
    actionIds: BookmarkTradeActionId[]
  ) {
    const orderedActions = [...actionIds]
    const key =
      layout === "classic"
        ? "classicBookmarkTradeActions"
        : layout === "compact"
          ? "compactBookmarkTradeActions"
          : "ultraCompactBookmarkTradeActions"

    return saveVersion({ ...activeVersionSettings, [key]: orderedActions })
  },
  async updateBookmarkCategoriesVisibility(bookmarkCategoriesEnabled: boolean) {
    return saveVersion({ ...activeVersionSettings, bookmarkCategoriesEnabled })
  }
}
