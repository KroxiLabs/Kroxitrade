<script lang="ts">
  import type { PlasmoCSConfig, PlasmoGetRootContainer, PlasmoGetStyle } from "plasmo"
  import Layout from "~components/Layout.svelte"
  import cssText from "data-text:~lib/styles/base.scss"
  import enhancementsCss from "data-text:~lib/styles/enhancements.scss"
  import { pageTitleService } from "~lib/services/page-title"
  import { itemResultsService } from "~lib/services/item-results"
  import { onMount } from "svelte"

  const EXTENSION_WIDTH = "360px"

  export const config: PlasmoCSConfig = {
    matches: ["https://www.pathofexile.com/trade*"]
  }

  export const getStyle: PlasmoGetStyle = () => {
    const style = document.createElement("style")
    style.textContent = cssText
    return style
  }

  export const getRootContainer: PlasmoGetRootContainer = async () => {
    const existingRoot = document.getElementById("better-trading-root")
    if (existingRoot) {
      return existingRoot
    }

    const root = document.createElement("div")
    root.id = "better-trading-root"
    root.style.position = "fixed"
    root.style.left = "0"
    root.style.right = "auto"
    root.style.top = "0"
    root.style.bottom = "0"
    root.style.width = EXTENSION_WIDTH
    root.style.minWidth = EXTENSION_WIDTH
    root.style.maxWidth = EXTENSION_WIDTH
    root.style.height = "100vh"
    root.style.minHeight = "100vh"
    root.style.margin = "0"
    root.style.padding = "0"
    root.style.overflow = "hidden"
    root.style.boxSizing = "border-box"
    root.style.zIndex = "2147483647"
    root.style.pointerEvents = "none"

    const mountTarget = document.body ?? document.documentElement
    mountTarget.appendChild(root)

    return root
  }

  onMount(() => {
    if (!document.body) {
      return
    }

    const styleEl = document.createElement("style")
    styleEl.id = "bt-enhancement-styles"
    styleEl.textContent = enhancementsCss
    document.head.appendChild(styleEl)
    document.documentElement.style.setProperty("--bt-sidebar-width", EXTENSION_WIDTH)
    document.documentElement.classList.add("bt-has-kroxitrade-sidebar")
    document.body.classList.add("bt-has-kroxitrade-sidebar")

    pageTitleService.initialize()
    void itemResultsService.initialize()

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

    chrome.runtime.onMessage.addListener(handleMessage)

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage)
      document.documentElement.style.removeProperty("--bt-sidebar-width")
      document.documentElement.classList.remove("bt-has-kroxitrade-sidebar")
      document.body.classList.remove("bt-has-kroxitrade-sidebar")
      document.getElementById("bt-enhancement-styles")?.remove()
    }
  })
</script>

<Layout />
