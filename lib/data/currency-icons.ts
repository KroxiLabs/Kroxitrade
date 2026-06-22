export const currencyIconUrls = {
  chaos: "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyRerollRare.png?scale=1&w=1&h=1",
  divine: "https://web.poecdn.com/image/Art/2DItems/Currency/CurrencyModValues.png?scale=1&w=1&h=1"
} as const

export type CurrencyIconId = keyof typeof currencyIconUrls

export const getCurrencyIconUrl = (currency: CurrencyIconId) =>
  currencyIconUrls[currency]
