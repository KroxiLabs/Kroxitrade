import assert from "node:assert/strict"
import test from "node:test"

const { normalizeValdoRewardName } = await import(
  "../lib/utilities/normalize-valdo-reward-name.ts"
)

test("normalizes Valdo foil and celestial reward variants", () => {
  assert.equal(normalizeValdoRewardName("Foiled Headhunter"), "Headhunter")
  assert.equal(normalizeValdoRewardName("FOIL MAGEBLOOD"), "MAGEBLOOD")
  assert.equal(
    normalizeValdoRewardName("Celestial Ruby Mageblood"),
    "Mageblood"
  )
  assert.equal(normalizeValdoRewardName("Headhunter"), "Headhunter")
})
