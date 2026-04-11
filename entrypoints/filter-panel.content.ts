import { initFilterPanel } from "~/contents/filter-panel"

export default defineContentScript({
  matches: ["https://www.pathofexile.com/trade*"],
  world: "MAIN",

  main() {
    initFilterPanel()
  }
})
