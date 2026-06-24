let registered = false

type PoeNinjaRequest = {
  query: "poe-ninja-exchange";
  game: "poe1" | "poe2";
  resource: string;
};

type BackgroundRequest = PoeNinjaRequest;

const isBackgroundRequest = (request: unknown): request is BackgroundRequest => {
  if (!request || typeof request !== "object") {
    return false;
  }

  const candidate = request as Partial<PoeNinjaRequest>;
  return candidate.query === "poe-ninja-exchange"
    && (candidate.game === "poe1" || candidate.game === "poe2")
    && typeof candidate.resource === "string"
    && candidate.resource.startsWith("/exchange/current/overview?");
};

export const registerBackgroundHandlers = () => {
  if (registered) {
    return
  }

  registered = true

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (!isBackgroundRequest(request)) {
      return false;
    }

    if (request.query === "poe-ninja-exchange") {
      const url = `https://poe.ninja/${request.game}/api/economy${request.resource}`

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
          console.error("[Poe Trade Plus-BG] poe.ninja exchange fetch failed:", {
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
