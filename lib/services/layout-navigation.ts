import bookmarkIcon from "data-text:lucide-static/icons/bookmark.svg"
import clockIcon from "data-text:lucide-static/icons/history.svg"
import infoIcon from "data-text:lucide-static/icons/info.svg"
import layersIcon from "data-text:lucide-static/icons/layers-3.svg"
import settingsIcon from "data-text:lucide-static/icons/settings-2.svg"

export type LayoutPage = "bookmarks" | "bulk" | "history" | "about" | "settings"

export interface LayoutNavItem {
  id: LayoutPage
  labelKey: string
  icon: string
  iconOnly?: boolean
}

const normalizeNavIcon = (svg: string) =>
  svg
    .replace(/<svg\b([^>]*)>/, (_match, attrs) => {
      const cleaned = attrs
        .replace(/\s(width|height|stroke-width|class|aria-hidden)="[^"]*"/g, "")
        .trim()
      const nextAttrs = cleaned ? `${cleaned} ` : ""
      return `<svg ${nextAttrs} viewBox="-2 -2 28 28" class="nav-svg" aria-hidden="true">`
    })
    .replace(/stroke-width="[^"]*"/g, 'stroke-width="1.75"')

export const layoutNavItems: LayoutNavItem[] = [
  {
    id: "bookmarks",
    labelKey: "layout.nav.bookmarks",
    icon: normalizeNavIcon(bookmarkIcon)
  },
  {
    id: "bulk",
    labelKey: "layout.nav.bulk",
    icon: normalizeNavIcon(layersIcon)
  },
  {
    id: "history",
    labelKey: "layout.nav.history",
    icon: normalizeNavIcon(clockIcon)
  },
  {
    id: "settings",
    labelKey: "layout.nav.settings",
    icon: normalizeNavIcon(settingsIcon)
  },
  {
    id: "about",
    labelKey: "layout.nav.about",
    icon: normalizeNavIcon(infoIcon),
    iconOnly: true
  }
]
