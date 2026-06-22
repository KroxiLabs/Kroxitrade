import { englishTranslations } from "./en"
import { spanishTranslations } from "./es"
import { portugueseTranslations } from "./pt"
import { germanTranslations } from "./de"
import { frenchTranslations } from "./fr"
import { russianTranslations } from "./ru"
import { thaiTranslations } from "./th"
import { japaneseTranslations } from "./ja"
import { koreanTranslations } from "./ko"
import type { TranslationValue } from "./types"

export const translations = {
  en: englishTranslations,
  es: spanishTranslations
} as Record<"en" | "es", Record<string, TranslationValue>>

export const englishFallback = englishTranslations

export const extendedTranslations: Record<
  "en" | "es" | "pt" | "ru" | "th" | "de" | "fr" | "ja" | "ko",
  Record<string, TranslationValue>
> = {
  ...translations,
  pt: { ...englishFallback, ...portugueseTranslations },
  ru: { ...englishFallback, ...russianTranslations },
  th: { ...englishFallback, ...thaiTranslations },
  de: { ...englishFallback, ...germanTranslations },
  fr: { ...englishFallback, ...frenchTranslations },
  ja: { ...englishFallback, ...japaneseTranslations },
  ko: { ...englishFallback, ...koreanTranslations }
}
