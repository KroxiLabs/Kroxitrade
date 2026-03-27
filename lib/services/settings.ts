import { writable } from 'svelte/store';
import { storageService } from './storage';

export type SidebarSide = 'left' | 'right';

export interface AppSettings {
  sidebarSide: SidebarSide;
  showEquivalentPricing: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  sidebarSide: 'right',
  showEquivalentPricing: false,
};

let currentSettings: AppSettings = DEFAULT_SETTINGS;

const { subscribe, set, update } = writable<AppSettings>(DEFAULT_SETTINGS);

subscribe((value) => {
  currentSettings = value;
});

// Load settings from storage
async function load() {
  const settings = await storageService.getValue<AppSettings>('app-settings');
  set({ ...DEFAULT_SETTINGS, ...settings });
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
  }
};
