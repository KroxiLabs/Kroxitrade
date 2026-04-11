import { resolve } from "node:path"

import { defineConfig } from "wxt"

const tradeMatches = [
  "https://www.pathofexile.com/*",
  "https://br.pathofexile.com/*",
  "https://ru.pathofexile.com/*",
  "https://th.pathofexile.com/*",
  "https://de.pathofexile.com/*",
  "https://fr.pathofexile.com/*",
  "https://es.pathofexile.com/*",
  "https://jp.pathofexile.com/*",
  "https://poe.game.daum.net/*"
]

const iconMap = {
  16: "/icon.png",
  32: "/icon.png",
  48: "/icon.png",
  128: "/icon.png"
}

const firefoxBinary = process.env.FIREFOX_BINARY
const useManualFirefoxRunner = process.env.WXT_FIREFOX_MANUAL === "1"

export default defineConfig({
  modules: ["@wxt-dev/module-svelte"],
  srcDir: ".",
  outDir: "build",
  manifestVersion: 3,
  webExt: {
    disabled: useManualFirefoxRunner,
    binaries: firefoxBinary
      ? {
          firefox: firefoxBinary
        }
      : undefined
  },
  manifest: ({ browser }) => ({
    name: "Poe Trade Plus",
    description:
      "Poe Trade Plus enhances the Path of Exile trade site with bookmarks, history and result tools.",
    permissions: ["storage", "tabs"],
    host_permissions: [...tradeMatches, "https://poe.ninja/*"],
    icons: iconMap,
    action: {
      default_title: "Poe Trade Plus",
      default_icon: iconMap
    },
    browser_specific_settings:
      browser === "firefox"
        ? {
            gecko: {
              id: "poe-trade-plus@kroxilabs.com",
              data_collection_permissions: {
                required: ["none"]
              }
            }
          }
        : undefined
  }),
  vite: () => ({
    optimizeDeps: {
      entries: ["entrypoints/popup.html"]
    },
    resolve: {
      alias: {
        "~": resolve(__dirname),
        "~assets": resolve(__dirname, "assets"),
        "~components": resolve(__dirname, "components"),
        "~lib": resolve(__dirname, "lib")
      }
    }
  })
})
