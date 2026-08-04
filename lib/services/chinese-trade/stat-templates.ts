import type { ChineseStatTemplates } from "./stat-cache-transform"

let templatesPromise: Promise<ChineseStatTemplates> | undefined

/**
 * Loads the large reviewed template dictionary only when Chinese Trade is in
 * use. Keeping this import behind the background message boundary prevents
 * every matched Trade page from parsing it.
 */
export const loadChineseStatTemplates = () =>
  (templatesPromise ??= import("~/data/chinese-trade/stat-templates.json").then(
    ({ default: templates }) => templates as ChineseStatTemplates
  ))
