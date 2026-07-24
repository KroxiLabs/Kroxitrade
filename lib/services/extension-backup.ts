import { hasValidExtensionContext, isExtensionContextInvalidatedError } from "../utilities/extension-context";
import { bookmarksService } from "./bookmarks";

const BACKUP_SCHEMA = 1;
const APP_NAME = "Poe Trade Plus";
const STORAGE_KEYS = new Set([
  "app-settings",
  "app-settings-poe1",
  "app-settings-poe2",
  "bookmark-folders",
  "bookmark-folders-manifest"
]);
const STORAGE_PREFIXES = [
  "bookmark-trades--",
  "bookmark-trades-manifest--",
  "bookmark-trades-chunk--",
  "bookmark-folders-chunk--"
];
const LOCAL_STORAGE_PREFIX = "bt-";
const LOCAL_STORAGE_EXCLUDED_PREFIXES = [
  "bt-bulk-sellers-",
  "bt-bulk-visited-"
];

interface StoragePayload {
  value: unknown;
  expiresAt: string | null;
}

interface ExtensionBackup {
  schema: typeof BACKUP_SCHEMA;
  app: typeof APP_NAME;
  exportedAt: string;
  version: string;
  data: {
    storage: Record<string, StoragePayload>;
    localStorage: Record<string, string>;
  };
}

const isManagedStorageKey = (key: string) =>
  STORAGE_KEYS.has(key) || STORAGE_PREFIXES.some((prefix) => key.startsWith(prefix));

const isManagedLocalStorageKey = (key: string) =>
  key.startsWith(LOCAL_STORAGE_PREFIX) &&
  !LOCAL_STORAGE_EXCLUDED_PREFIXES.some((prefix) => key.startsWith(prefix));

const getAppVersion = () => {
  if (hasValidExtensionContext() && chrome.runtime?.getManifest) {
    return chrome.runtime.getManifest().version;
  }

  return "dev";
};

const readAllStorage = async () => {
  if (!hasValidExtensionContext() || !chrome.storage?.local || !chrome.storage?.sync) return {};

  try {
    const [local, sync] = await Promise.all([
      chrome.storage.local.get(null),
      chrome.storage.sync.get(null)
    ]);
    return {...sync, ...local} as Record<string, StoragePayload>;
  } catch (error) {
    if (!isExtensionContextInvalidatedError(error)) {
      console.warn("[Poe Trade Plus] Backup storage read failed", error);
    }
    return {};
  }
};

const writeStorage = async (values: Record<string, StoragePayload>) => {
  if (!hasValidExtensionContext() || !chrome.storage?.local || !chrome.storage?.sync) return false;

  try {
    const [local, sync] = await Promise.all([
      chrome.storage.local.get(null),
      chrome.storage.sync.get(null)
    ]);
    const keysToRemove = [...new Set([
      ...Object.keys(local),
      ...Object.keys(sync)
    ])].filter(isManagedStorageKey);
    if (keysToRemove.length > 0) {
      await Promise.all([
        chrome.storage.local.remove(keysToRemove),
        chrome.storage.sync.remove(keysToRemove)
      ]);
    }
    await chrome.storage.sync.set(values);
    return true;
  } catch (error) {
    if (!isExtensionContextInvalidatedError(error)) {
      console.warn("[Poe Trade Plus] Backup storage restore failed", error);
    }
    return false;
  }
};

const readManagedLocalStorage = () => {
  const values: Record<string, string> = {};
  if (typeof window === "undefined") return values;

  for (let index = 0; index < window.localStorage.length; index++) {
    const key = window.localStorage.key(index);
    if (!key || !isManagedLocalStorageKey(key)) continue;
    const value = window.localStorage.getItem(key);
    if (value !== null) values[key] = value;
  }

  return values;
};

const writeManagedLocalStorage = (values: Record<string, string>) => {
  if (typeof window === "undefined") return;

  const keysToRemove: string[] = [];
  for (let index = 0; index < window.localStorage.length; index++) {
    const key = window.localStorage.key(index);
    if (key && isManagedLocalStorageKey(key)) keysToRemove.push(key);
  }

  keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  Object.entries(values).forEach(([key, value]) => {
    if (isManagedLocalStorageKey(key)) {
      window.localStorage.setItem(key, value);
    }
  });
};

const parseBackup = (dataString: string): ExtensionBackup | null => {
  try {
    const parsed = JSON.parse(dataString) as Partial<ExtensionBackup>;
    if (
      parsed.schema !== BACKUP_SCHEMA ||
      parsed.app !== APP_NAME ||
      !parsed.data ||
      typeof parsed.data !== "object"
    ) {
      return null;
    }

    return parsed as ExtensionBackup;
  } catch {
    return null;
  }
};

export const extensionBackupService = {
  async generateBackupDataString() {
    const allStorage = await readAllStorage();
    const storage = Object.fromEntries(
      Object.entries(allStorage).filter(([key]) => isManagedStorageKey(key))
    ) as Record<string, StoragePayload>;

    const backup: ExtensionBackup = {
      schema: BACKUP_SCHEMA,
      app: APP_NAME,
      exportedAt: new Date().toISOString(),
      version: getAppVersion(),
      data: {
        storage,
        localStorage: readManagedLocalStorage()
      }
    };

    return JSON.stringify(backup, null, 2);
  },

  async restoreFromDataString(dataString: string) {
    const parsed = parseBackup(dataString);
    if (!parsed) {
      return bookmarksService.restoreFromDataString(dataString);
    }

    const restored = await writeStorage(parsed.data.storage || {});
    if (!restored) return false;

    writeManagedLocalStorage(parsed.data.localStorage || {});
    await bookmarksService.refresh();
    return true;
  }
};
