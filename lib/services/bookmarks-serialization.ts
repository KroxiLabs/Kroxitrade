import { Base64 } from "js-base64"

import type {
  BookmarksFolderIcon,
  BookmarksFolderStruct,
  BookmarksTradeStruct
} from "../types/bookmarks"
import type { TradeSiteVersion } from "../types/trade-location"

type ExportVersion = 1 | 2 | 3 | 4

interface ExportedFolderStruct {
  icn: string
  tit: string
  ver?: TradeSiteVersion
  trs: Array<{ tit: string; loc: string }>
}

export const serializeFolder = (
  folder: BookmarksFolderStruct,
  trades: BookmarksTradeStruct[]
): string => {
  const payload: ExportedFolderStruct = {
    icn: folder.icon as string,
    tit: folder.title,
    ver: folder.version,
    trs: trades.map((trade) => ({
      tit: trade.title,
      loc: `${trade.location.version}:${trade.location.type}:${trade.location.league || ""}:${trade.location.slug}`
    }))
  }

  return `4:${Base64.encode(JSON.stringify(payload))}`
}

export const deserializeFolder = (
  serializedFolder: string
): [BookmarksFolderStruct, BookmarksTradeStruct[]] | null => {
  try {
    const exportVersion = parseExportVersion(serializedFolder)
    const json = jsonFromExportString(exportVersion, serializedFolder)
    const payload: ExportedFolderStruct = JSON.parse(json)

    const folder: BookmarksFolderStruct = {
      version: "1",
      icon: payload.icn as BookmarksFolderIcon,
      title: payload.tit,
      archivedAt: null
    }

    if (exportVersion >= 3 && payload.ver) {
      folder.version = payload.ver
    }

    const trades: BookmarksTradeStruct[] = payload.trs.map((trade) => {
      let version: string
      let type: string
      let slug: string
      let league: string | null

      if (exportVersion >= 4) {
        ;[version, type, league, slug] = trade.loc.split(":")
      } else if (exportVersion >= 3) {
        ;[version, type, slug] = trade.loc.split(":")
        league = null
      } else {
        version = "1"
        ;[type, slug] = trade.loc.split(":")
        league = null
      }

      return {
        title: trade.tit,
        completedAt: null,
        location: { version: version as TradeSiteVersion, type, slug, league }
      }
    })

    return [folder, trades]
  } catch {
    return null
  }
}

const parseExportVersion = (exportString: string): ExportVersion => {
  if (exportString.startsWith("4:")) return 4
  if (exportString.startsWith("3:")) return 3
  if (exportString.startsWith("2:")) return 2
  return 1
}

const jsonFromExportString = (
  version: ExportVersion,
  exportString: string
): string => {
  if (version >= 2) {
    return Base64.decode(exportString.slice(2))
  }

  return atob(exportString)
}
