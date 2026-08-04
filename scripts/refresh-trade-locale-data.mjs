import { mkdir, writeFile } from "node:fs/promises"
import { resolve } from "node:path"

const OUTPUT_DIR = resolve("data/trade-locales")
const ENDPOINTS = ["stats", "static", "filters", "items"]

// Every UI locale has a snapshot. Locales without their own official Trade
// host deliberately fall back to the English schema; zh-cn is generated from
// the traditional-Chinese source by the extension's local conversion layer.
const LOCALES = {
  en: "https://www.pathofexile.com",
  pt: "https://br.pathofexile.com",
  ru: "https://ru.pathofexile.com",
  th: "https://th.pathofexile.com",
  de: "https://de.pathofexile.com",
  fr: "https://fr.pathofexile.com",
  es: "https://es.pathofexile.com",
  ja: "https://jp.pathofexile.com",
  ko: "https://poe.kakaogames.com",
  "zh-tw": "https://pathofexile.tw"
}

const fetchOfficial = async (origin, endpoint) => {
  const response = await fetch(`${origin}/api/trade/data/${endpoint}`, {
    headers: { "user-agent": "PoeTradePlus locale snapshot generator" }
  })
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
  return response.json()
}

const writeSnapshot = async (locale, origin, data, sourceLocale = locale) => {
  const snapshot = {
    format: 1,
    locale,
    sourceLocale,
    origin,
    generatedAt: new Date().toISOString(),
    data
  }
  await writeFile(
    resolve(OUTPUT_DIR, `${locale}.json`),
    `${JSON.stringify(snapshot)}\n`,
    "utf8"
  )
}

await mkdir(OUTPUT_DIR, { recursive: true })

const snapshots = new Map()
for (const [locale, origin] of Object.entries(LOCALES)) {
  try {
    const entries = await Promise.all(
      ENDPOINTS.map(async (endpoint) => [endpoint, await fetchOfficial(origin, endpoint)])
    )
    const data = Object.fromEntries(entries)
    snapshots.set(locale, { origin, data })
    await writeSnapshot(locale, origin, data)
    console.log(`Updated ${locale}`)
  } catch (error) {
    console.warn(`Skipped ${locale}: ${error.message}`)
  }
}

// Simplified Chinese has no public international Trade host. Keep a local
// snapshot with the same official Taiwan data; runtime conversion remains local.
const tw = snapshots.get("zh-tw")
if (tw) {
  await writeSnapshot("zh-cn", tw.origin, tw.data, "zh-tw")
  console.log("Updated zh-cn from zh-tw")
}
