<script lang="ts">
  import Layout from "~components/Layout.svelte"
  import { bulkSellersService } from "~lib/services/bulk-sellers"
  import { pageTitleService } from "~lib/services/page-title"
  import { itemResultsService } from "~lib/services/item-results"
  import { settings } from "~lib/services/settings"
  import { hasValidExtensionContext, isExtensionContextInvalidatedError } from "~lib/utilities/extension-context"
  import { onMount } from "svelte"

  const EXTENSION_WIDTH = "360px"

  onMount(async () => {
    if (!document.body) {
      return
    }

    await settings.load()
    document.documentElement.style.setProperty("--bt-sidebar-width", EXTENSION_WIDTH)
    document.documentElement.classList.add("bt-has-kroxitrade-sidebar")
    document.body.classList.add("bt-has-kroxitrade-sidebar")

    pageTitleService.initialize()
    void itemResultsService.initialize()
    if (settings.getCurrent().showBulkSellers) {
      bulkSellersService.initialize()
    }

    const unsubscribeSettings = settings.subscribe((value) => {
      if (value.showBulkSellers) {
        bulkSellersService.initialize()
        return
      }

      bulkSellersService.teardown()
    })

    const handleMessage = (request: { query?: string; itemId?: string }) => {
      if (request.query !== "scroll-to-item" || !request.itemId) {
        return
      }

      const el = document.querySelector<HTMLElement>(`.row[data-id="${request.itemId}"]`)
      if (!el) {
        return
      }

      el.scrollIntoView({ block: "center", behavior: "smooth" })
      el.classList.add("bt-pinned-glow")
      window.setTimeout(() => el.classList.remove("bt-pinned-glow"), 2000)
    }

    if (hasValidExtensionContext()) {
      try {
        chrome.runtime.onMessage.addListener(handleMessage)
      } catch (error) {
        if (!isExtensionContextInvalidatedError(error)) {
          console.warn("[Poe Trade Plus] Failed to attach runtime listener", error)
        }
      }
    }

    return () => {
      unsubscribeSettings()
      bulkSellersService.teardown()
      if (hasValidExtensionContext()) {
        try {
          chrome.runtime.onMessage.removeListener(handleMessage)
        } catch (error) {
          if (!isExtensionContextInvalidatedError(error)) {
            console.warn("[Poe Trade Plus] Failed to detach runtime listener", error)
          }
        }
      }
      document.documentElement.style.removeProperty("--bt-sidebar-width")
      document.documentElement.classList.remove("bt-has-kroxitrade-sidebar")
      document.body.classList.remove("bt-has-kroxitrade-sidebar")
    }
  })
</script>

<Layout />
