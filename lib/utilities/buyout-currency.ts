export type BuyoutCurrencyPreset = {
  label: string
  currency: string
}

export const BUYOUT_CURRENCY_PRESETS: BuyoutCurrencyPreset[] = [
  { label: "Chaos", currency: "Chaos Orb" },
  { label: "Exalted", currency: "Exalted Orb" },
  { label: "Divine", currency: "Divine Orb" }
]

const setNativeInputValue = (input: HTMLInputElement, value: string) => {
  const descriptor = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  )
  descriptor?.set?.call(input, value)
}

const findBuyoutCurrencySelect = () => {
  return findBuyoutFilter()?.querySelector<HTMLElement>(".multiselect") || null
}

const findBuyoutFilter = () => {
  const filters = Array.from(
    document.querySelectorAll<HTMLElement>(".filter.filter-property")
  )

  return (
    filters.find((filter) => {
      const title = filter
        .querySelector(".filter-title")
        ?.textContent?.replace(/\s+/g, " ")
        .trim()
      return title === "Buyout Price"
    }) || null
  )
}

export const setBuyoutCurrencyPreset = (currency: string) => {
  const multiselect = findBuyoutCurrencySelect()
  const input =
    multiselect?.querySelector<HTMLInputElement>("input.multiselect__input")

  if (!multiselect || !input) return

  input.focus()
  input.click()
  setNativeInputValue(input, currency)
  input.setSelectionRange(currency.length, currency.length)
  input.dispatchEvent(new Event("input", { bubbles: true }))

  queueMicrotask(() => {
    const option = Array.from(
      multiselect.querySelectorAll<HTMLElement>(".multiselect__option")
    ).find(
      (candidate) =>
        candidate.textContent?.replace(/\s+/g, " ").trim() === currency
    )

    option?.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
      })
    )
    input.dispatchEvent(new Event("change", { bubbles: true }))
  })
}

export const clearBuyoutPrice = () => {
  setBuyoutCurrencyPreset("Chaos Orb Equivalent")
}
