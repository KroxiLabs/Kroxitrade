export { }

const TRADE_URL_PATTERN = /^https:\/\/www\.pathofexile\.com\/trade(?:\/|$)/i
const SIDEPANEL_PATH = "sidepanel.html"

const syncSidePanelForTab = async (tabId: number, url?: string) => {
  if (!chrome.sidePanel?.setOptions) {
    return
  }

  const isTradePage = !!url && TRADE_URL_PATTERN.test(url)

  await chrome.sidePanel.setOptions({
    tabId,
    path: SIDEPANEL_PATH,
    enabled: isTradePage
  })

  const sidePanelApi = chrome.sidePanel as typeof chrome.sidePanel & {
    close?: (options: { tabId: number }) => Promise<void>
  }

  if (!isTradePage && sidePanelApi.close) {
    await sidePanelApi.close({
      tabId
    }).catch(() => undefined)
  }
}

const configureSidePanelBehavior = async () => {
  if (!chrome.sidePanel?.setPanelBehavior) {
    return
  }

  await chrome.sidePanel.setPanelBehavior({
    openPanelOnActionClick: true
  })
}

chrome.runtime.onInstalled.addListener(() => {
  void configureSidePanelBehavior()
})

chrome.runtime.onStartup.addListener(() => {
  void configureSidePanelBehavior()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  const nextUrl = changeInfo.url ?? tab.url
  if (!nextUrl) {
    return
  }

  void syncSidePanelForTab(tabId, nextUrl)
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
  void chrome.tabs.get(tabId).then((tab) => {
    void syncSidePanelForTab(tabId, tab.url)
  }).catch(() => undefined)
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.query === "poe-ninja") {
    fetch(`https://poe.ninja/api${request.resource}`)
      .then(r => r.json())
      .then(sendResponse)
      .catch(() => sendResponse(null))
    return true
  }

  if (request.query === "inject-trade-plus" && sender.tab?.id) {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      world: "MAIN",
      files: ["poe-trade-plus-main.js"] // Note: This will need to be correctly bundled by Plasmo
    }).then(() => sendResponse(true))
      .catch(() => sendResponse(false))
    return true
  }

  if (request.query === "open-side-panel" && sender.tab?.id) {
    void chrome.sidePanel.open({
      tabId: sender.tab.id
    }).then(() => sendResponse(true))
      .catch(() => sendResponse(false))
    return true
  }
})
