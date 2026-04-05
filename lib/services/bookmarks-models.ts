import type {
  BookmarksFolderStruct,
  BookmarksTradeStruct
} from "../types/bookmarks"
import type { TradeSiteVersion } from "../types/trade-location"

export const initializeFolderStruct = (
  version: TradeSiteVersion,
  partial?: Partial<BookmarksFolderStruct>
): BookmarksFolderStruct => ({
  version,
  icon: null,
  title: "",
  archivedAt: null,
  ...partial
})

export const initializeTradeStructFrom = (location: {
  version: TradeSiteVersion
  type: string
  slug: string
  league: string | null
}): BookmarksTradeStruct => ({
  location,
  title: "",
  completedAt: null
})

export const partiallyReorderFolders = (
  allFolders: BookmarksFolderStruct[],
  reorderedFolders: BookmarksFolderStruct[]
): BookmarksFolderStruct[] => {
  const reorderedSet = new Set(reorderedFolders)
  const result = [...allFolders]
  let reorderedIndex = 0

  for (let i = 0; i < allFolders.length; i++) {
    if (reorderedSet.has(allFolders[i])) {
      result[i] = reorderedFolders[reorderedIndex]
      reorderedIndex++
    }
  }

  return result
}
