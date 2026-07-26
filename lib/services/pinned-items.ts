import { get, writable } from "svelte/store"

export interface PinnedItem {
  id: string
  title: string
  detailsHtml: string
  renderedHtml: string
  pricingHtml: string
}

const store = writable<PinnedItem[]>([])
const { subscribe, update } = store

export const pinnedItemsService = {
  subscribe,
  has(id: string) { return get(store).some((item) => item.id === id) },
  toggle(item: PinnedItem) {
    update((items) => {
      const next = items.some((current) => current.id === item.id) ? items.filter((current) => current.id !== item.id) : [item, ...items]
      return next
    })
  },
  unpin(id: string) { update((items) => items.filter((item) => item.id !== id)) },
  clear() { update(() => []) }
}
