export type FinerFiltersAction = "global-plus" | "global-minus"

export type FinerFiltersActionDetail = {
  action: FinerFiltersAction
  types: string
  prefix: string
}

const BRIDGE_SOURCE = "poe-trade-plus:finer-filters"
const BRIDGE_TYPE = "krox-finer-action"

type FinerFiltersBridgeMessage = {
  source: typeof BRIDGE_SOURCE
  type: typeof BRIDGE_TYPE
  detail: FinerFiltersActionDetail
}

export const emitFinerFiltersAction = (detail: FinerFiltersActionDetail) => {
  if (typeof window === "undefined") {
    return
  }

  try {
    window.postMessage(
      {
        source: BRIDGE_SOURCE,
        type: BRIDGE_TYPE,
        detail
      } satisfies FinerFiltersBridgeMessage,
      "*"
    )
  } catch {
    // Ignore bridge errors so the sidebar stays responsive.
  }
}

export const isFinerFiltersActionMessage = (
  event: MessageEvent<unknown>
): event is MessageEvent<FinerFiltersBridgeMessage> => {
  const data = event.data as
    | Partial<FinerFiltersBridgeMessage>
    | null
    | undefined

  return (
    !!data &&
    data.source === BRIDGE_SOURCE &&
    data.type === BRIDGE_TYPE &&
    !!data.detail &&
    typeof data.detail.action === "string" &&
    typeof data.detail.types === "string" &&
    typeof data.detail.prefix === "string"
  )
}
