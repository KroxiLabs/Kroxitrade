import { writable } from 'svelte/store';
import { setLanguage, type AppLanguage } from './i18n';
import { storageService } from './storage';

export type SidebarSide = 'left' | 'right';

export interface AppSettings {
  sidebarSide: SidebarSide;
  showEquivalentPricing: boolean;
  sidebarWidth: number;
  language: AppLanguage;
}

const DEFAULT_SETTINGS: AppSettings = {
  sidebarSide: 'right',
  showEquivalentPricing: false,
  sidebarWidth: 360,
  language: 'en',
};

let currentSettings: AppSettings = DEFAULT_SETTINGS;

const { subscribe, set, update } = writable<AppSettings>(DEFAULT_SETTINGS);

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
  await storageService.setValue('app-settings', newSettings);
}

export const settings = {
  subscribe,
  load,
  getCurrent() {
    return currentSettings;
  },
  async updateSide(side: SidebarSide) {
    update(s => {
      const next = { ...s, sidebarSide: side };
      save(next);
      return next;
    });
  },
  async updateEquivalentPricingVisibility(showEquivalentPricing: boolean) {
    update(s => {
      const next = { ...s, showEquivalentPricing };
      save(next);
      return next;
    });
  },
  async updateSidebarWidth(sidebarWidth: number) {
    update(s => {
      const next = { ...s, sidebarWidth };
      save(next);
      return next;
    });
  },
  async updateLanguage(language: AppLanguage) {
    update(s => {
      const next = { ...s, language };
      save(next);
      setLanguage(language);
      return next;
    });
  }
};
