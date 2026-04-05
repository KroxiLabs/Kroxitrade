import type { SidebarSide } from "./settings"

const MINIMIZED_STORAGE_KEY = "layout-minimized"
const MIN_SIDEBAR_WIDTH = 300
const MAX_SIDEBAR_WIDTH = 560
const MINIMIZED_WIDTH = 0

export const clampSidebarWidth = (value: number) =>
  Math.max(MIN_SIDEBAR_WIDTH, Math.min(MAX_SIDEBAR_WIDTH, Math.round(value)))

export const getExpandedSidebarWidth = (
  sidebarWidth: number | null | undefined
) => clampSidebarWidth(sidebarWidth || 450)

export const getRenderedSidebarWidth = (
  liveSidebarWidth: number | null,
  sidebarWidth: number | null | undefined
) =>
  clampSidebarWidth(liveSidebarWidth ?? getExpandedSidebarWidth(sidebarWidth))

export const getMinimizedStorageKey = (version: string) =>
  `${MINIMIZED_STORAGE_KEY}-${version}`

export const loadMinimizedState = (
  getLocalValue: (key: string) => string | null,
  storageKey: string
) => getLocalValue(storageKey) === "true"

export const persistMinimizedState = (
  setLocalValue: (key: string, value: string) => void,
  storageKey: string,
  minimized: boolean
) => {
  setLocalValue(storageKey, minimized ? "true" : "false")
}

export const getResizeWidthFromPointer = (
  clientX: number,
  windowWidth: number,
  sidebarSide: SidebarSide
) => (sidebarSide === "right" ? windowWidth - clientX : clientX)

export const applySidebarWidthCssVar = (
  root: HTMLElement,
  isMinimized: boolean,
  renderedWidth: number
) => {
  root.style.setProperty(
    "--bt-sidebar-width",
    isMinimized ? `${MINIMIZED_WIDTH}px` : `${renderedWidth}px`
  )
}

export const syncSidebarDomState = ({
  documentRef,
  sidebarSide,
  isMinimized,
  isResizing,
  renderedWidth
}: {
  documentRef: Document
  sidebarSide: SidebarSide
  isMinimized: boolean
  isResizing: boolean
  renderedWidth: number
}) => {
  const isRight = sidebarSide === "right"
  const root = documentRef.documentElement
  const body = documentRef.body

  applySidebarWidthCssVar(root, isMinimized, renderedWidth)

  body.classList.toggle("is-side-right", isRight)
  body.classList.toggle("is-side-left", !isRight)
  root.classList.toggle("bt-side-right", isRight)
  body.classList.toggle("bt-sidebar-minimized", isMinimized)
  root.classList.toggle("bt-sidebar-minimized", isMinimized)
  body.classList.toggle("bt-is-resizing-sidebar", isResizing)

  const hosts = documentRef.querySelectorAll<HTMLElement>(
    "plasmo-csui, #plasmo-shadow-container"
  )
  hosts.forEach((host) => {
    host.classList.toggle("is-side-right", isRight)
    host.classList.toggle("is-side-left", !isRight)

    if (isRight) {
      host.style.setProperty("left", "auto", "important")
      host.style.setProperty("right", "0", "important")
      return
    }

    host.style.setProperty("left", "0", "important")
    host.style.setProperty("right", "auto", "important")
  })
}
