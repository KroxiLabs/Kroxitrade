import templatesUrl from "~/data/chinese-trade/stat-templates.json?url"

import type { ChineseStatTemplates } from "./stat-cache-transform"

let templatesPromise: Promise<ChineseStatTemplates> | undefined

/** Loads the reviewed local template dictionary only when Chinese Trade needs it. */
export const loadChineseStatTemplates = () => {
  templatesPromise ??= fetch(templatesUrl).then(async (response) => {
    if (!response.ok)
      throw new Error(
        `Could not load Chinese Trade templates: ${response.status}`
      )
    return response.json() as Promise<ChineseStatTemplates>
  })
  return templatesPromise
}
