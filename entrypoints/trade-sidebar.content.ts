import "~/lib/styles/base.css"
import "~/lib/styles/enhancements.css"

import { mount, unmount } from "svelte"

import App from "~/contents/index.svelte"
import { tradeHosts } from "~/lib/config/trade-hosts"
import { settings } from "~/lib/services/settings"

export default defineContentScript({
  matches: tradeHosts,

  async main(ctx) {
    // Do not mount with the default language and then replace it once storage
    // resolves. This is especially noticeable after switching into Chinese,
    // because that navigation deliberately reloads the trade page.
    await settings.load()

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
