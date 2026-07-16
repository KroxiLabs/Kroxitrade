import "~/lib/styles/base.css"
import "~/lib/styles/enhancements.css"

import { mount, unmount } from "svelte"

import App from "~/contents/index.svelte"
import { tradeHosts } from "~/lib/config/trade-hosts"

export default defineContentScript({
  matches: tradeHosts,

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
        if (app) {
          unmount(app)
        }
      }
    })

    ui.mount()
  }
})
