import { writable } from "svelte/store"

import type { TradeSiteVersion } from "../types/trade-location"
import { setLanguage, type AppLanguage } from "./i18n"
import { storageService } from "./storage"

export type SidebarSide = "left" | "right"
export type BookmarkTradeActionId =
  | "edit"
  | "replace"
  | "copy"
  | "openLive"
  | "toggle"
  | "delete"
export type QuickFiltersPlacement = "page" | "sidebar"
export type TextSizePreference = "small" | "medium" | "large" | "extraLarge"

export interface VersionSettings {
  showEquivalentPricing: boolean
  showMagebloodLegacyDescriptions: boolean
  showBulkSellers: boolean
  showHistory: boolean
  showFinerFilters: boolean
  showQuickFilters: boolean
  quickFiltersPlacement: QuickFiltersPlacement
  compactActionsMenu: boolean
  ultraCompactBookmarks: boolean
  compactBookmarkTradeActions: BookmarkTradeActionId[]
  bookmarkCategoriesEnabled: boolean
}

export interface AppSettings extends VersionSettings {
  sidebarSide: SidebarSide
  sidebarWidth: number
  language: AppLanguage
  textSize: TextSizePreference
}

interface GlobalSettings {
  sidebarSide: SidebarSide
  sidebarWidth: number
  language: AppLanguage
  textSize: TextSizePreference
}

const GLOBAL_SETTINGS_KEY = "app-settings"
const versionSettingsKey = (version: TradeSiteVersion) =>
  `app-settings-poe${version}`

const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  sidebarSide: "right",
  sidebarWidth: 360,
  language: "en",
  textSize: "large"
}

const DEFAULT_VERSION_SETTINGS: VersionSettings = {
  showEquivalentPricing: false,
  showMagebloodLegacyDescriptions: false,
  showBulkSellers: false,
  showHistory: true,
  showFinerFilters: true,
  showQuickFilters: true,
  quickFiltersPlacement: "page",
  compactActionsMenu: false,
  ultraCompactBookmarks: false,
  compactBookmarkTradeActions: [],
  bookmarkCategoriesEnabled: false
}

function normalizeTextSize(textSize: unknown): TextSizePreference {
  return textSize === "small" ||
    textSize === "large" ||
    textSize === "extraLarge"
    ? textSize
    : "medium"
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
    compactBookmarkTradeActions: [...version.compactBookmarkTradeActions]
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
    compactBookmarkTradeActions: [
      ...(defined.compactBookmarkTradeActions ?? [])
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
    showHistory: value?.showHistory,
    showFinerFilters: value?.showFinerFilters,
    showQuickFilters: value?.showQuickFilters,
    quickFiltersPlacement: value?.quickFiltersPlacement,
    compactActionsMenu: value?.compactActionsMenu,
    ultraCompactBookmarks: value?.ultraCompactBookmarks,
    compactBookmarkTradeActions: value?.compactBookmarkTradeActions,
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
    window.dispatchEvent(
      new CustomEvent("poe-trade-plus:quick-filters-change", {
        detail: {
          key: quickFiltersStorageKey,
          value: currentSettings.showQuickFilters,
          placement: currentSettings.quickFiltersPlacement
        }
      })
    )
  }
  set(currentSettings)
}

async function loadVersionSettings(
  version: TradeSiteVersion,
  legacy?: Partial<AppSettings> | null
) {
  const cached = versionCache.get(version)
  if (cached) return cached

  const stored = await storageService.getValue<VersionSettings>(
    versionSettingsKey(version)
  )
  const next = stored
    ? normalizeVersionSettings(stored)
    : legacyVersionSettings(legacy)

  versionCache.set(version, next)

  if (!stored) {
    await storageService.setValue(versionSettingsKey(version), next)
  }

  return next
}

async function load() {
  const requestedVersion = inferTradeVersion()
  const requestId = ++versionRequestId
  const stored =
    await storageService.getValue<Partial<AppSettings>>(GLOBAL_SETTINGS_KEY)

  globalSettings = {
    sidebarSide: stored?.sidebarSide ?? DEFAULT_GLOBAL_SETTINGS.sidebarSide,
    sidebarWidth: stored?.sidebarWidth ?? DEFAULT_GLOBAL_SETTINGS.sidebarWidth,
    language: stored?.language ?? DEFAULT_GLOBAL_SETTINGS.language,
    textSize: normalizeTextSize(stored?.textSize)
  }

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
  const saved = await storageService.setValue(GLOBAL_SETTINGS_KEY, next)
  if (!saved) {
    console.warn("[Poe Trade Plus] Failed to persist global settings")
    return false
  }

  globalSettings = next
  publish()
  return true
}

async function saveVersion(next: VersionSettings) {
  const saved = await storageService.setValue(
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
  async updateBookmarkCategoriesVisibility(bookmarkCategoriesEnabled: boolean) {
    return saveVersion({ ...activeVersionSettings, bookmarkCategoriesEnabled })
  }
}
