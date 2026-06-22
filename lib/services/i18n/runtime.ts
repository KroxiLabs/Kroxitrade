import { writable } from "svelte/store"
import { extendedTranslations } from "./translations"
import type { TranslationParams } from "./types"

export type AppLanguage = keyof typeof extendedTranslations

export const languageStore = writable<AppLanguage>("en")

export const setLanguage = (language: AppLanguage) => {
  languageStore.set(language)
}

export const translate = (
  language: AppLanguage,
  key: string,
  params?: TranslationParams
) => {
  const dictionary = extendedTranslations[language] || extendedTranslations.en
  const fallback = extendedTranslations.en[key]
  const value = dictionary[key] ?? fallback ?? key

  if (typeof value === "function") {
    return value(params ?? {})
  }

  return value
}
