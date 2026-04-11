export { }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("[Poe Trade Plus-BG] Received message:", request.query, request);

  if (request.query === "poe-ninja") {
    const url = `https://poe.ninja/api${request.resource}`;
    console.log("[Poe Trade Plus-BG] Requesting poe.ninja:", url);

    fetch(url)
      .then(r => r.json())
      .then(response => {
        const lineCount = Array.isArray(response?.lines) ? response.lines.length : 0;
        console.log("[Poe Trade Plus-BG] Poe-ninja response received:", {
          url,
          success: !!response,
          lineCount
        });
        sendResponse(response);
      })
      .catch((err) => {
        console.error("[Poe Trade Plus-BG] Poe-ninja fetch failed:", { url, error: err });
        sendResponse(null);
      })
    return true
  }

  if (request.query === "trade-exchange-rate") {
    const url = request.url as string;
    console.log("[Poe Trade Plus-BG] Requesting official trade exchange:", {
      url,
      body: request.body
    });

    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request.body)
    })
      .then(async (response) => {
        const json = await response.json();
        const resultCount = json?.result ? Object.keys(json.result).length : 0;
        console.log("[Poe Trade Plus-BG] Official trade exchange response received:", {
          url,
          ok: response.ok,
          status: response.status,
          resultCount
        });
        sendResponse(json);
      })
      .catch((err) => {
        console.error("[Poe Trade Plus-BG] Official trade exchange fetch failed:", {
          url,
          error: err
        });
        sendResponse(null);
      });

    return true;
  }

})
