import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { chromium, expect, test } from "@playwright/test"

const extensionPath = resolve("build-e2e/chrome-mv3")

const tradeFixture = `<!doctype html>
  <html><body>
    <h1 id="search">Search Listed Items</h1>
    <input id="minimum" placeholder="Min">
    <div id="dynamic"></div>
  </body></html>`

const seedChineseSettings = async (extensionPage) => {
  await extensionPage.evaluate(async () => {
    const now = Date.now()
    await chrome.storage.local.set({
      "app-settings": {
        expiresAt: null,
        value: { language: "zh-tw", translateTradeSite: true }
      },
      "poeTradePlus.chineseTrade.updatedAt": now,
      "poeTradePlus.chineseTrade.traditional.stats": [],
      "poeTradePlus.chineseTrade.traditional.static": [],
      "poeTradePlus.chineseTrade.traditional.filters": [],
      "poeTradePlus.chineseTrade.traditional.modifiers": {}
    })
  })
}

const findExtensionId = async (context) => {
  const extensionsPage = await context.newPage()
  await extensionsPage.goto("chrome://extensions/")
  await extensionsPage.waitForTimeout(1_000)
  const extensions = await extensionsPage
    .locator("extensions-manager")
    .evaluate((manager) => {
      const visit = (root) =>
        [...root.querySelectorAll("extensions-item")].map((item) => ({
          id: item.id,
          extensionId: item.getAttribute("id"),
          name: item.data?.name ?? item.name,
          state: item.data?.state,
          disableReasons: item.data?.disableReasons
        }))
      const list = manager.shadowRoot?.querySelector("extensions-item-list")
      return {
        items: list ? visit(list.shadowRoot ?? list) : [],
        markup: manager.shadowRoot?.innerHTML.slice(0, 800) ?? ""
      }
    })
  await extensionsPage.close()
  const extension = extensions.items.find(
    (item) => item.name === "Poe Trade Plus"
  )
  if (!extension?.id)
    throw new Error(
      `PoeTradePlus was not loaded by Chrome: ${JSON.stringify(extensions)}`
    )
  if (extension.state !== "ENABLED")
    throw new Error(`PoeTradePlus is disabled: ${JSON.stringify(extension)}`)
  return extension.id
}

test("Chinese Trade localization runs in the built extension", async () => {
  const profile = await mkdtemp(join(tmpdir(), "poe-trade-plus-e2e-"))
  let context

  try {
    context = await chromium.launchPersistentContext(profile, {
      // Chrome only exposes chrome://extensions (used to seed real extension
      // storage) in headed mode.
      headless: false,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`
      ]
    })
    await context.route(
      /https:\/\/(?:pathofexile\.tw|www\.pathofexile\.com)\/api\/trade\/data\/.+/,
      (route) =>
        route.fulfill({
          contentType: "application/json",
          body: JSON.stringify({ result: [] })
        })
    )
    const extensionId = await findExtensionId(context)
    const extensionPage = await context.newPage()
    await extensionPage.goto(`chrome-extension://${extensionId}/popup.html`)
    await extensionPage.waitForTimeout(250)
    await seedChineseSettings(extensionPage)
    await expect
      .poll(() =>
        extensionPage.evaluate(async () => {
          const stored = await chrome.storage.local.get("app-settings")
          return stored["app-settings"]?.value?.language
        })
      )
      .toBe("zh-tw")
    await expect
      .poll(() =>
        extensionPage.evaluate(
          async () =>
            new Promise((resolve) => {
              chrome.runtime.sendMessage(
                {
                  type: "poeTradePlus.chineseTrade.rebuildCache",
                  language: "zh-tw"
                },
                (reply) => resolve(reply?.ok === true)
              )
            })
        )
      )
      .toBe(true)
    expect(
      await extensionPage.evaluate(() =>
        chrome.permissions.contains({
          origins: ["https://www.pathofexile.com/*"]
        })
      )
    ).toBe(true)
    await extensionPage.close()

    const page = await context.newPage()
    await page.route("https://www.pathofexile.com/trade/**", (route) =>
      route.fulfill({ contentType: "text/html", body: tradeFixture })
    )
    await page.goto("https://www.pathofexile.com/trade/search")
    await page.waitForTimeout(500)

    await expect(page.locator("#search")).toHaveText("搜尋道具")
    await expect(page.locator("#minimum")).toHaveAttribute(
      "placeholder",
      "最小"
    )

    await page.locator("#dynamic").evaluate((element) => {
      element.textContent = "Clear"
    })
    await expect(page.locator("#dynamic")).toHaveText("清除")
  } finally {
    await context?.close()
    await rm(profile, { recursive: true, force: true })
  }
})
