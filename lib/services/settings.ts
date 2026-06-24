import { writable } from 'svelte/store';
import { setLanguage, type AppLanguage } from './i18n';
import { storageService } from './storage';

export type SidebarSide = 'left' | 'right';
export type BookmarkTradeActionId = 'edit' | 'replace' | 'copy' | 'openLive' | 'toggle' | 'delete';

export interface AppSettings {
  sidebarSide: SidebarSide;
  showEquivalentPricing: boolean;
  showBulkSellers: boolean;
  showHistory: boolean;
  showFinerFilters: boolean;
  sidebarWidth: number;
  language: AppLanguage;
  compactActionsMenu: boolean;
  compactBookmarkTradeActions: BookmarkTradeActionId[];
}

const DEFAULT_SETTINGS: AppSettings = {
  sidebarSide: 'right',
  showEquivalentPricing: false,
  showBulkSellers: false,
  showHistory: true,
  showFinerFilters: true,
  sidebarWidth: 360,
  language: 'en',
  compactActionsMenu: false,
  compactBookmarkTradeActions: []
};

let currentSettings: AppSettings = DEFAULT_SETTINGS;

const { subscribe, set } = writable<AppSettings>(DEFAULT_SETTINGS);

subscribe((value) => {
  currentSettings = value;
});

// Load settings from storage
async function load() {
  const settings = await storageService.getValue<AppSettings>('app-settings');
  const next = { ...DEFAULT_SETTINGS, ...settings };
  set(next);
  setLanguage(next.language);
}

// Persist settings to storage
async function save(newSettings: AppSettings) {
  return storageService.setValue('app-settings', newSettings);
}

async function persistAndApply(next: AppSettings, onApplied?: () => void): Promise<boolean> {
  const saved = await save(next);
  if (!saved) {
    console.warn("[Poe Trade Plus] Failed to persist settings");
    return false;
  }

  set(next);
  onApplied?.();
  return true;
}

export const settings = {
  subscribe,
  load,
  getCurrent() {
    return currentSettings;
  },
  async updateSide(side: SidebarSide) {
    const next = { ...currentSettings, sidebarSide: side };
    return persistAndApply(next);
  },
  async updateEquivalentPricingVisibility(showEquivalentPricing: boolean) {
    const next = { ...currentSettings, showEquivalentPricing };
    return persistAndApply(next);
  },
  async updateBulkSellersVisibility(showBulkSellers: boolean) {
    const next = { ...currentSettings, showBulkSellers };
    return persistAndApply(next);
  },
  async updateHistoryVisibility(showHistory: boolean) {
    const next = { ...currentSettings, showHistory };
    return persistAndApply(next);
  },
  async updateFinerFiltersVisibility(showFinerFilters: boolean) {
    const next = { ...currentSettings, showFinerFilters };
    return persistAndApply(next);
  },
  async updateSidebarWidth(sidebarWidth: number) {
    const next = { ...currentSettings, sidebarWidth };
    return persistAndApply(next);
  },
  async updateLanguage(language: AppLanguage) {
    const next = { ...currentSettings, language };
    return persistAndApply(next, () => setLanguage(language));
  },
  async updateCompactActionsMenu(compactActionsMenu: boolean) {
    const next = { ...currentSettings, compactActionsMenu };
    return persistAndApply(next);
  },
  async updateCompactBookmarkTradeActions(compactBookmarkTradeActions: BookmarkTradeActionId[]) {
    const next = { ...currentSettings, compactBookmarkTradeActions };
    return persistAndApply(next);
  }
};
