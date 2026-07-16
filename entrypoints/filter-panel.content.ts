import "~/lib/styles/enhancements.css"

import { initFilterPanel } from "~/contents/filter-panel"
import { tradeHosts } from "~/lib/config/trade-hosts"

export default defineContentScript({
  matches: tradeHosts,
  world: "MAIN",

  main() {
    initFilterPanel()
  }
})
