import assert from "node:assert/strict"
import test from "node:test"

const { extractValdoRewardName } = await import(
  "../lib/utilities/extract-valdo-reward-name.ts"
)
const { normalizeValdoRewardName: normalizeRewardName } = await import(
  "../lib/utilities/normalize-valdo-reward-name.ts"
)

test("normalizes Valdo foil and celestial reward variants", () => {
  assert.equal(normalizeRewardName("Foiled Headhunter"), "Headhunter")
  assert.equal(normalizeRewardName("FOIL MAGEBLOOD"), "MAGEBLOOD")
  assert.equal(
    normalizeRewardName("Celestial Ruby Mageblood"),
    "Mageblood"
  )
  assert.equal(normalizeRewardName("Headhunter"), "Headhunter")
})

test("finds a Valdo reward from its stable property type when compact layout hides it", () => {
  const rewardProperty = { textContent: "Reward: Foil Mageblood" }
  const itemRoot = {
    textContent: "Hidden Rubble Valdo Map Reward: Foil Mageblood",
    querySelector: (selector) =>
      selector === '.item-property .lc[type="76"]' ? rewardProperty : null
  }
  const row = {
    textContent: itemRoot.textContent,
    querySelector: () => itemRoot
  }

  assert.equal(extractValdoRewardName(row), "Foil Mageblood")
})
