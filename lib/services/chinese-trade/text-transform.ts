/** Convert a Trade label into the stable lookup key used by local dictionaries. */
export const normalizeEnglishTradeText = (value: string): string =>
  value
    .replace(/\[([^\]|]+)(?:\|[^\]]*)?\]/g, "$1")
    .replace(/\{[^}]*\}/g, "#")
    .replace(/[+\-]?\d+(?:\.\d+)?/g, "#")
    .toLowerCase()
    .replace(/[^a-z#]/g, "")

/** Resolve the display part of Trade's optional `[internal|label]` syntax. */
export const resolveTradeDisplayText = (value: string): string =>
  value
    .replace(/\[([^[\]|]*)\|([^[\]]*)\]/g, "$2")
    .replace(/\[([^[\]]*)\]/g, "$1")

/** Fill a translated `#` template with the numbers rendered by the Trade page. */
export const applyTradeTemplate = (template: string, rendered: string): string => {
  const values = rendered.match(/[+\-]?\d+(?:\.\d+)?/g) ?? []
  let index = 0
  return template.replace(/[+\-]?#/g, () => values[index++] ?? "#")
}
