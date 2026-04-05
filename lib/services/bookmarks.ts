import { writable } from "svelte/store"

import type {
  BookmarksFolderStruct,
  BookmarksTradeStruct,
  PartialBookmarksTradeLocation
} from "../types/bookmarks"
import type { TradeSiteVersion } from "../types/trade-location"
import { uniqueId } from "../utilities/unique-id"
import {
  initializeFolderStruct as buildFolderStruct,
  initializeTradeStructFrom as buildTradeStruct,
  partiallyReorderFolders
} from "./bookmarks-models"
import {
  deserializeFolder as deserializeBookmarkFolder,
  serializeFolder as serializeBookmarkFolder
} from "./bookmarks-serialization"
import { storageService } from "./storage"

const FOLDERS_KEY = "bookmark-folders"
const TRADES_PREFIX_KEY = "bookmark-trades"
const SECTION_DELIMITER = "\n--------------------\n"
const LINE_DELIMITER = "\n"

export class BookmarksService {
  private foldersStore = writable<BookmarksFolderStruct[]>([])
  private listeners = new Set<() => void>()
  public subscribe = this.foldersStore.subscribe

  constructor() {
    this.refresh()
  }

  async refresh() {
    const folders = await this.fetchFolders()
    this.foldersStore.set(folders)
    this.notifyChange()
  }

  onChange(callback: () => void) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  private notifyChange() {
    this.listeners.forEach((listener) => listener())
  }

  // ─── STORAGE ──────────────────────────────────────────────

  async fetchFolders(): Promise<BookmarksFolderStruct[]> {
    const folders =
      await storageService.getValue<Partial<BookmarksFolderStruct>[]>(
        FOLDERS_KEY
      )
    return (folders || []).map((folder) =>
      this.initializeFolderStruct(folder.version || "1", folder)
    )
  }

  async fetchTradesByFolderId(
    folderId: string
  ): Promise<BookmarksTradeStruct[]> {
    const trades = await storageService.getValue<BookmarksTradeStruct[]>(
      `${TRADES_PREFIX_KEY}--${folderId}`
    )
    return (trades || []).map((trade) => ({
      ...trade,
      location: {
        ...trade.location,
        version: trade.location.version || "1",
        league: trade.location.league || null
      }
    }))
  }

  async fetchTradeByLocation(
    location: PartialBookmarksTradeLocation
  ): Promise<BookmarksTradeStruct | null> {
    const folders = await this.fetchFolders()

    const unarchivedFolders = folders.filter((folder) => !folder.archivedAt)
    const archivedFolders = folders.filter((folder) => folder.archivedAt)

    const matchLocation = (trade: BookmarksTradeStruct) =>
      trade.location.version === location.version &&
      trade.location.slug === location.slug &&
      trade.location.type === location.type &&
      (trade.location.league === null ||
        trade.location.league === location.league)

    const unarchivedResults = await Promise.all(
      unarchivedFolders.map((folder) => this.fetchTradesByFolderId(folder.id!))
    )

    for (const trades of unarchivedResults) {
      const match = trades.find(matchLocation)
      if (match) return match
    }

    const archivedResults = await Promise.all(
      archivedFolders.map((folder) => this.fetchTradesByFolderId(folder.id!))
    )

    for (const trades of archivedResults) {
      const match = trades.find(matchLocation)
      if (match) return match
    }

    return null
  }

  async persistFolder(
    folder: BookmarksFolderStruct,
    options?: { moveToEnd?: boolean }
  ): Promise<string> {
    const folders = await this.fetchFolders()
    let updated: BookmarksFolderStruct[]
    const id = folder.id || uniqueId()

    if (!folder.id) {
      updated = [...folders, { ...folder, id }]
    } else {
      updated = folders.map((existingFolder) =>
        existingFolder.id === folder.id
          ? { ...existingFolder, ...folder }
          : existingFolder
      )

      if (options?.moveToEnd) {
        updated = [
          ...updated.filter((existingFolder) => existingFolder.id !== id),
          ...updated.filter((existingFolder) => existingFolder.id === id)
        ]
      }
    }

    await this.persistFolders(updated)
    await this.refresh()
    return id
  }

  async persistFolders(folders: BookmarksFolderStruct[]) {
    await storageService.setValue(FOLDERS_KEY, folders)
  }

  async persistTrade(
    trade: BookmarksTradeStruct,
    folderId: string
  ): Promise<string> {
    const trades = await this.fetchTradesByFolderId(folderId)
    let updated: BookmarksTradeStruct[]
    const id = trade.id || uniqueId()

    if (!trade.id) {
      updated = [...trades, { ...trade, id }]
    } else {
      updated = trades.map((existingTrade) =>
        existingTrade.id === trade.id
          ? { ...existingTrade, ...trade }
          : existingTrade
      )
    }

    await this.persistTrades(updated, folderId)
    await this.refresh()
    return id
  }

  async persistTrades(trades: BookmarksTradeStruct[], folderId: string) {
    const safeTrades = trades.map((trade) => ({
      ...trade,
      id: trade.id || uniqueId()
    }))
    await storageService.setValue(
      `${TRADES_PREFIX_KEY}--${folderId}`,
      safeTrades
    )
  }

  async deleteTrade(tradeId: string, folderId: string) {
    const trades = await this.fetchTradesByFolderId(folderId)
    const updated = trades.filter((trade) => trade.id !== tradeId)
    await this.persistTrades(updated, folderId)
    await this.refresh()
  }

  async deleteFolder(folderId: string) {
    const folders = await this.fetchFolders()
    const updated = folders.filter((folder) => folder.id !== folderId)
    await this.persistFolders(updated)
    await storageService.deleteValue(`${TRADES_PREFIX_KEY}--${folderId}`)
    await this.refresh()
  }

  async duplicateTrade(trade: BookmarksTradeStruct, targetFolderId: string) {
    const newTrade = { ...trade, id: uniqueId() }
    await this.persistTrade(newTrade, targetFolderId)
  }

  async renameFolder(folder: BookmarksFolderStruct, title: string) {
    return this.persistFolder({ ...folder, title })
  }

  async duplicateFolder(folder: BookmarksFolderStruct) {
    if (!folder.id) throw new Error("Cannot duplicate a folder without an id")

    const newFolder = {
      ...folder,
      id: undefined,
      title: `${folder.title} (copy)`
    }

    const newFolderId = await this.persistFolder(newFolder)
    const trades = await this.fetchTradesByFolderId(folder.id)
    const duplicatedTrades = trades.map((trade) => {
      const { id, ...tradeWithoutId } = trade
      return { ...tradeWithoutId, id: undefined }
    })

    await this.persistTrades(duplicatedTrades, newFolderId)
    await this.refresh()
  }

  async renameTrade(
    trade: BookmarksTradeStruct,
    folderId: string,
    title: string
  ) {
    return this.persistTrade({ ...trade, title }, folderId)
  }

  async reorderTrade(
    tradeId: string,
    folderId: string,
    direction: "up" | "down"
  ) {
    const trades = await this.fetchTradesByFolderId(folderId)
    const index = trades.findIndex((trade) => trade.id === tradeId)
    if (index === -1) return

    const newIndex = direction === "up" ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= trades.length) return

    const updated = [...trades]
    ;[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]]
    await this.persistTrades(updated, folderId)
    await this.refresh()
  }

  async moveTrade(tradeId: string, folderId: string, newIndex: number) {
    const trades = await this.fetchTradesByFolderId(folderId)
    const index = trades.findIndex((trade) => trade.id === tradeId)
    if (index === -1) return

    const safeIndex = Math.max(0, Math.min(newIndex, trades.length - 1))
    if (index === safeIndex) return

    const updated = [...trades]
    const [movedElement] = updated.splice(index, 1)
    updated.splice(safeIndex, 0, movedElement)

    await this.persistTrades(updated, folderId)
    await this.refresh()
  }

  async moveFolder(
    folderId: string,
    newIndex: number,
    options: { version: TradeSiteVersion; archived: boolean }
  ) {
    const folders = await this.fetchFolders()
    const matchingFolders = folders.filter(
      (folder) =>
        folder.version === options.version &&
        !!folder.archivedAt === options.archived
    )
    const currentIndex = matchingFolders.findIndex(
      (folder) => folder.id === folderId
    )
    if (currentIndex === -1) return

    const safeIndex = Math.max(
      0,
      Math.min(newIndex, matchingFolders.length - 1)
    )
    if (currentIndex === safeIndex) return

    const reorderedFolders = [...matchingFolders]
    const [movedFolder] = reorderedFolders.splice(currentIndex, 1)
    reorderedFolders.splice(safeIndex, 0, movedFolder)

    const updatedFolders = partiallyReorderFolders(folders, reorderedFolders)
    await this.persistFolders(updatedFolders)
    await this.refresh()
  }

  // ─── LOGIC ────────────────────────────────────────────────

  async toggleTradeCompletion(trade: BookmarksTradeStruct, folderId: string) {
    return this.persistTrade(
      {
        ...trade,
        completedAt: trade.completedAt ? null : new Date().toISOString()
      },
      folderId
    )
  }

  async toggleFolderArchive(folder: BookmarksFolderStruct) {
    return this.persistFolder(
      {
        ...folder,
        archivedAt: folder.archivedAt ? null : new Date().toISOString()
      },
      { moveToEnd: true }
    )
  }

  // ─── EXPORT / IMPORT ──────────────────────────────────────

  serializeFolder(
    folder: BookmarksFolderStruct,
    trades: BookmarksTradeStruct[]
  ): string {
    return serializeBookmarkFolder(folder, trades)
  }

  deserializeFolder(
    serializedFolder: string
  ): [BookmarksFolderStruct, BookmarksTradeStruct[]] | null {
    return deserializeBookmarkFolder(serializedFolder)
  }

  // ─── BACKUP / RESTORE ─────────────────────────────────────

  async generateBackupDataString(): Promise<string> {
    const activeFolderStrings: string[] = []
    const archivedFolderStrings: string[] = []

    const folders = await this.fetchFolders()
    for (const folder of folders) {
      if (!folder.id) continue
      const trades = await this.fetchTradesByFolderId(folder.id)
      const serialized = this.serializeFolder(folder, trades)
      ;(folder.archivedAt ? archivedFolderStrings : activeFolderStrings).push(
        serialized
      )
    }

    return [
      activeFolderStrings.join(LINE_DELIMITER),
      archivedFolderStrings.join(LINE_DELIMITER)
    ].join(SECTION_DELIMITER)
  }

  async restoreFromDataString(dataString: string): Promise<boolean> {
    try {
      const [activeSection, archivedSection] =
        dataString.split(SECTION_DELIMITER)
      const activeFolderStrings = activeSection
        .split(LINE_DELIMITER)
        .filter(Boolean)
      const archivedFolderStrings = (archivedSection || "")
        .split(LINE_DELIMITER)
        .filter(Boolean)

      let restoredCount = 0
      restoredCount += await this.restoreFolders(activeFolderStrings)
      restoredCount += await this.restoreFolders(archivedFolderStrings, {
        archivedAt: new Date().toISOString()
      })

      await this.refresh()
      return restoredCount > 0
    } catch {
      return false
    }
  }

  private async restoreFolders(
    folderStrings: string[],
    overrides: Partial<BookmarksFolderStruct> = {}
  ): Promise<number> {
    let count = 0
    for (const folderString of folderStrings) {
      const deserialized = this.deserializeFolder(folderString)
      if (!deserialized) continue

      const [folder, trades] = deserialized
      const folderId = await this.persistFolder({ ...folder, ...overrides })
      await this.persistTrades(trades, folderId)
      count++
    }
    return count
  }

  // ─── HELPERS ──────────────────────────────────────────────

  initializeFolderStruct(
    version: TradeSiteVersion,
    partial?: Partial<BookmarksFolderStruct>
  ): BookmarksFolderStruct {
    return buildFolderStruct(version, partial)
  }

  initializeTradeStructFrom(location: {
    version: TradeSiteVersion
    type: string
    slug: string
    league: string | null
  }): BookmarksTradeStruct {
    return buildTradeStruct(location)
  }
}

export const bookmarksService = new BookmarksService()
