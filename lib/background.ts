import { storageService } from "./services/storage"
import type { TradeLocationHistoryStruct } from "./types/trade-location"

let registered = false
let historyWriteChain: Promise<void> = Promise.resolve()

type PoeNinjaRequest = {
  query: "poe-ninja-exchange";
  game: "poe1" | "poe2";
  resource: string;
};

type LogHistoryRequest = {
  query: "log-trade-history";
  key: string;
  entry: TradeLocationHistoryStruct;
  max: number;
};

type BackgroundRequest = PoeNinjaRequest | LogHistoryRequest;

const isSameHistoryLocation = (
  a: TradeLocationHistoryStruct | undefined,
  b: TradeLocationHistoryStruct
) =>
  !!a &&
  a.version === b.version &&
  a.league === b.league &&
  a.slug === b.slug &&
  a.type === b.type

const isBackgroundRequest = (request: unknown): request is BackgroundRequest => {
  if (!request || typeof request !== "object") {
    return false;
  }

  const candidate = request as Record<string, unknown>;
  if (candidate.query === "poe-ninja-exchange") {
    return (
      (candidate.game === "poe1" || candidate.game === "poe2") &&
      typeof candidate.resource === "string" &&
      candidate.resource.startsWith("/exchange/current/overview?")
    );
  }

  return candidate.query === "log-trade-history"
    && typeof candidate.key === "string"
    && candidate.key.startsWith("trade-history")
    && typeof candidate.max === "number"
    && Number.isInteger(candidate.max)
    && candidate.max > 0
    && candidate.max <= 100
    && !!candidate.entry
    && typeof candidate.entry === "object";
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

    if (request.query === "log-trade-history") {
      historyWriteChain = historyWriteChain
        .then(async () => {
          const history =
            (await storageService.getValue<TradeLocationHistoryStruct[]>(
              request.key
            )) || []
          if (!isSameHistoryLocation(history[0], request.entry)) {
            history.unshift(request.entry)
            await storageService.setValue(
              request.key,
              history.slice(0, request.max)
            )
          }
          sendResponse({ logged: true })
        })
        .catch((error) => {
          console.error("[Poe Trade Plus-BG] history write failed:", error)
          sendResponse({ logged: false })
        })
      return true
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
