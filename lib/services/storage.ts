import {
  hasValidExtensionContext,
  isExtensionContextInvalidatedError
} from "../utilities/extension-context"

interface StoragePayload {
  value: unknown
  expiresAt: string | null
}

export type StorageArea = "local" | "sync"

const isStoragePayload = (value: unknown): value is StoragePayload =>
  typeof value === "object" &&
  value !== null &&
  "value" in value &&
  "expiresAt" in value &&
  (typeof value.expiresAt === "string" || value.expiresAt === null)

export class StorageService {
  private static instance: StorageService

  static getInstance() {
    if (!this.instance) this.instance = new StorageService()
    return this.instance
  }

  async setValue(
    key: string,
    value: unknown,
    league: string | null = null,
    area: StorageArea = "local"
  ): Promise<boolean> {
    return this.write(this.formatKey(key, league), {
      expiresAt: null,
      value
    }, area)
  }

  async setEphemeralValue(
    key: string,
    value: unknown,
    expirationDate: Date,
    league: string | null = null
  ): Promise<boolean> {
    return this.write(this.formatKey(key, league), {
      expiresAt: expirationDate.toUTCString(),
      value
    })
  }

  async getValue<T>(
    key: string,
    league: string | null = null,
    area: StorageArea = "local"
  ): Promise<T | null> {
    const payload = await this.read(this.formatKey(key, league), area)
    if (!payload) return null

    const { expiresAt, value } = payload
    if (!expiresAt) return value as T

    if (new Date().getTime() > new Date(expiresAt).getTime()) return null
    return value as T
  }

  async getStaleValue<T>(
    key: string,
    league: string | null = null
  ): Promise<T | null> {
    const payload = await this.read(this.formatKey(key, league))
    return payload ? (payload.value as T) : null
  }

  private formatKey(key: string, league: string | null) {
    return (league ? `${key}--${league}` : key).toLowerCase()
  }

  private getStorageArea(area: StorageArea): chrome.storage.StorageArea | null {
    if (!hasValidExtensionContext() || !chrome.storage?.[area]) {
      console.warn("Storage not available")
      return null
    }
    return chrome.storage[area]
  }

  private async read(
    key: string,
    area: StorageArea = "local"
  ): Promise<StoragePayload | null> {
    const storageArea = this.getStorageArea(area)
    if (!storageArea) return null
    try {
      const result = await storageArea.get([key])
      const payload = result[key]
      return isStoragePayload(payload) ? payload : null
    } catch (error) {
      if (!isExtensionContextInvalidatedError(error)) {
        console.warn("Storage read failed", error)
      }
      return null
    }
  }

  async deleteValue(
    key: string,
    league: string | null = null,
    area: StorageArea = "local"
  ): Promise<boolean> {
    return this.remove(this.formatKey(key, league), area)
  }

  setLocalValue(key: string, value: string, league: string | null = null) {
    window.localStorage.setItem(`bt-${this.formatKey(key, league)}`, value)
  }

  getLocalValue(key: string, league: string | null = null): string | null {
    return window.localStorage.getItem(`bt-${this.formatKey(key, league)}`)
  }

  deleteLocalValue(key: string, league: string | null = null) {
    window.localStorage.removeItem(`bt-${this.formatKey(key, league)}`)
  }

  private async write(
    key: string,
    value: StoragePayload,
    area: StorageArea = "local"
  ): Promise<boolean> {
    const storageArea = this.getStorageArea(area)
    if (!storageArea) return false
    try {
      await storageArea.set({ [key]: value })
      return true
    } catch (error) {
      if (!isExtensionContextInvalidatedError(error)) {
        console.warn("Storage write failed", error)
      }
      return false
    }
  }

  private async remove(
    keys: string | string[],
    area: StorageArea = "local"
  ): Promise<boolean> {
    const storageArea = this.getStorageArea(area)
    if (!storageArea) return false
    try {
      await storageArea.remove(keys)
      return true
    } catch (error) {
      if (!isExtensionContextInvalidatedError(error)) {
        console.warn("Storage remove failed", error)
      }
      return false
    }
  }
}

export const storageService = StorageService.getInstance()
