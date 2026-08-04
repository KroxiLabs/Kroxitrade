import assert from "node:assert/strict"
import test from "node:test"

import {
  applyTradeTemplate,
  normalizeEnglishTradeText,
  resolveTradeDisplayText
} from "../lib/services/chinese-trade/text-transform.ts"

test("normalizes Trade labels for bundled dictionary lookups", () => {
  assert.equal(
    normalizeEnglishTradeText("+[12—24] to [Fire|火焰] Resistance"),
    "##tofireresistance"
  )
  assert.equal(normalizeEnglishTradeText("{0} increased Damage"), "#increaseddamage")
})

test("resolves Trade inline display labels without exposing internal tokens", () => {
  assert.equal(resolveTradeDisplayText("[ContainsAbyss|深淵]"), "深淵")
  assert.equal(resolveTradeDisplayText("[深淵]"), "深淵")
})

test("fills every available numeric value while preserving unfilled placeholders", () => {
  assert.equal(
    applyTradeTemplate("增加 +# 至 # 火焰抗性", "+12 to 24 Fire Resistance"),
    "增加 +12 至 24 火焰抗性"
  )
  assert.equal(applyTradeTemplate("# / #", "10"), "10 / #")
})
