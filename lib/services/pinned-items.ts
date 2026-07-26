import { writable } from "svelte/store"

export interface PinnedItem {
  id: string
  title: string
  detailsHtml: string
  renderedHtml: string
  pricingHtml: string
}

const STORAGE_KEY = "poe-trade-plus:pinned-items"
const read = (): PinnedItem[] => {
  try { return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "[]") } catch { return [] }
}
const { subscribe, update } = writable<PinnedItem[]>(typeof window === "undefined" ? [] : read())
const save = (items: PinnedItem[]) => window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))

export const pinnedItemsService = {
  subscribe,
  has(id: string) { return read().some((item) => item.id === id) },
  toggle(item: PinnedItem) {
    update((items) => {
      const next = items.some((current) => current.id === item.id) ? items.filter((current) => current.id !== item.id) : [item, ...items]
      save(next)
      return next
    })
  },
  unpin(id: string) { update((items) => { const next = items.filter((item) => item.id !== id); save(next); return next }) },
  clear() { save([]); update(() => []) }
}
