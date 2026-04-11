import "~/lib/styles/base.scss"
import "~/lib/styles/enhancements.scss"

import { mount, unmount } from "svelte"

import App from "~/contents/index.svelte"

const tradeMatches = [
  "https://www.pathofexile.com/trade*",
  "https://br.pathofexile.com/trade*",
  "https://ru.pathofexile.com/trade*",
  "https://th.pathofexile.com/trade*",
  "https://de.pathofexile.com/trade*",
  "https://fr.pathofexile.com/trade*",
  "https://es.pathofexile.com/trade*",
  "https://jp.pathofexile.com/trade*",
  "https://poe.game.daum.net/trade*"
]

export default defineContentScript({
  matches: tradeMatches,

  async main(ctx) {
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor: "body",
      onMount: (container) => {
        container.id = "kroxitrade-root"
        container.classList.add("kroxitrade-wxt-host")
        return mount(App, { target: container })
      },
      onRemove: (app) => {
        unmount(app)
      }
    })

    ui.mount()
  }
})
