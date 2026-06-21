let registered = false

export const registerBackgroundHandlers = () => {
  if (registered) {
    return
  }

  registered = true

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.query === "poe-ninja") {
      const url = `https://poe.ninja/api${request.resource}`

      fetch(url)
        .then(async (r) => {
          if (!r.ok) {
            throw new Error(`poe.ninja responded with status ${r.status}`)
          }
          return r.json()
        })
        .then((response) => {
          sendResponse(response)
        })
        .catch((err) => {
          console.error("[Poe Trade Plus-BG] Poe-ninja fetch failed:", {
            url,
            error: err
          })
          sendResponse(null)
        })
      return true
    }

    if (request.query === "trade-exchange-rate") {
      const url = request.url as string

      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request.body)
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`trade exchange responded with status ${response.status}`)
          }
          const json = await response.json()
          sendResponse(json)
        })
        .catch((err) => {
          console.error("[Poe Trade Plus-BG] Official trade exchange fetch failed:", {
            url,
            error: err
          })
          sendResponse(null)
        })

      return true
    }

    return false
  })
}
